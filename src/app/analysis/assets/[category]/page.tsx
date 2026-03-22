'use client'

import { useState, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ---------- shared helpers ---------- */
function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}
function num(s: string) {
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ''))
  return isNaN(n) ? 0 : n
}

/* ---------- category config ---------- */
const CATEGORIES = [
  'bank-accounts',
  'investments',
  'retirement',
  'real-estate',
  'vehicles',
  'life-insurance',
  'crypto',
  'other',
] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_META: Record<Category, { label: string; icon: string; desc: string; question: string; whyText: string; formDesc: string }> = {
  'bank-accounts': {
    label: 'Bank Accounts',
    icon: 'fa-solid fa-building-columns',
    desc: 'Checking, savings, money market, and CD accounts',
    question: 'Do you have any bank accounts?',
    whyText: 'The IRS uses your bank balances to calculate your Reasonable Collection Potential (RCP). Balances are typically assessed as of the date you submit your offer. Joint accounts may be split 50/50.',
    formDesc: 'For each account: account type (checking/savings/money market/CD), bank name, last 4 digits of account number, current balance, and whether it is a joint account.',
  },
  investments: {
    label: 'Investment Accounts',
    icon: 'fa-solid fa-chart-line',
    desc: 'Stocks, bonds, mutual funds, and brokerage accounts',
    question: 'Do you have any investment accounts?',
    whyText: 'Investment accounts are considered liquid assets. The IRS uses their current market value to determine your ability to pay. Loans against investments reduce the net equity.',
    formDesc: 'For each account: investment type, institution, current value, loan balance, and whether the asset is liquid.',
  },
  retirement: {
    label: 'Retirement Accounts',
    icon: 'fa-solid fa-piggy-bank',
    desc: '401(k), IRA, Roth IRA, pension plans',
    question: 'Do you have any retirement accounts?',
    whyText: 'Retirement accounts are included in asset calculations. If you are under 59.5, the IRS applies a 10% early withdrawal penalty and 25% estimated tax when calculating Quick Sale Value.',
    formDesc: 'For each account: account type, institution, current balance, loan balance, and account owner age.',
  },
  'real-estate': {
    label: 'Real Estate',
    icon: 'fa-solid fa-house',
    desc: 'Homes, rental properties, land, commercial property',
    question: 'Do you own any real estate?',
    whyText: 'Real estate equity is calculated at 80% of Fair Market Value (Quick Sale Value) minus outstanding mortgages and liens. Primary residences may have homestead exemptions.',
    formDesc: 'For each property: type, address, fair market value, mortgage balance, HELOC balance, and whether homestead is filed.',
  },
  vehicles: {
    label: 'Vehicles',
    icon: 'fa-solid fa-car',
    desc: 'Cars, trucks, motorcycles, boats, RVs',
    question: 'Do you own any vehicles?',
    whyText: 'Vehicle equity is calculated at 80% of trade-in value minus loan balance. The IRS typically allows one vehicle per taxpayer/spouse for commuting purposes.',
    formDesc: 'For each vehicle: year, make, model, trade-in value (FMV), loan balance, mileage, and lease vs own.',
  },
  'life-insurance': {
    label: 'Life Insurance',
    icon: 'fa-solid fa-shield-halved',
    desc: 'Whole life, universal life, and term life policies',
    question: 'Do you have life insurance with cash value?',
    whyText: 'Only whole life and universal life policies have cash surrender value (CSV). Term life policies have no cash value. CSV minus policy loans equals the net equity the IRS considers.',
    formDesc: 'For each policy: insurance company, policy type, cash surrender value, face value, and policy loans.',
  },
  crypto: {
    label: 'Cryptocurrency',
    icon: 'fa-solid fa-bitcoin-sign',
    desc: 'Bitcoin, Ethereum, and other digital assets',
    question: 'Do you own any cryptocurrency?',
    whyText: 'Cryptocurrency is treated as property by the IRS. The current market value of all holdings on exchanges or in wallets is included in your asset calculation.',
    formDesc: 'For each holding: exchange or wallet name and estimated current value.',
  },
  other: {
    label: 'Other Valuable Assets',
    icon: 'fa-solid fa-gem',
    desc: 'Art, jewelry, equipment, collections, other property',
    question: 'Do you have other valuable assets?',
    whyText: 'Any asset with significant value that does not fit into the other categories should be reported here. The IRS calculates equity at 80% of estimated value minus any loans.',
    formDesc: 'For each asset: description, estimated value, and any loan balance against it.',
  },
}

/* ---------- item types ---------- */
interface BankItem { id: string; institution: string; accountType: string; last4: string; balance: string; isJoint: boolean }
interface InvestmentItem { id: string; type: string; institution: string; currentValue: string; loanBalance: string; isLiquid: boolean }
interface RetirementItem { id: string; type: string; institution: string; balance: string; loanBalance: string; ownerAge: string }
interface RealEstateItem { id: string; propertyType: string; address: string; fmv: string; mortgageBalance: string; helocBalance: string; datePurchased: string; homesteadFiled: boolean; isJoint: boolean }
interface VehicleItem { id: string; year: string; make: string; model: string; fmv: string; loanBalance: string; mileage: string; leaseOrOwn: string }
interface LifeInsuranceItem { id: string; company: string; type: string; csv: string; faceValue: string; policyLoans: string }
interface CryptoItem { id: string; exchangeName: string; estimatedValue: string }
interface OtherItem { id: string; description: string; estimatedValue: string; loanBalance: string }
type AnyItem = BankItem | InvestmentItem | RetirementItem | RealEstateItem | VehicleItem | LifeInsuranceItem | CryptoItem | OtherItem

/* ---------- QSV computation ---------- */
function computeQSV(cat: Category, item: AnyItem): number {
  switch (cat) {
    case 'bank-accounts': return num((item as BankItem).balance)
    case 'investments': { const i = item as InvestmentItem; return i.isLiquid ? num(i.currentValue) : num(i.currentValue) * 0.8 }
    case 'retirement': { const i = item as RetirementItem; const age = num(i.ownerAge); const bal = num(i.balance); const loans = num(i.loanBalance); if (age > 0 && age < 59.5) { return Math.max(0, bal - loans - bal * 0.10 - bal * 0.25) } return Math.max(0, bal - loans) }
    case 'real-estate': { const i = item as RealEstateItem; return Math.max(0, num(i.fmv) * 0.80 - num(i.mortgageBalance) - num(i.helocBalance)) }
    case 'vehicles': { const i = item as VehicleItem; return Math.max(0, num(i.fmv) * 0.80 - num(i.loanBalance)) }
    case 'life-insurance': { const i = item as LifeInsuranceItem; if (i.type === 'Term') return 0; return Math.max(0, num(i.csv) - num(i.policyLoans)) }
    case 'crypto': return num((item as CryptoItem).estimatedValue)
    case 'other': { const i = item as OtherItem; return Math.max(0, num(i.estimatedValue) * 0.80 - num(i.loanBalance)) }
  }
}

function createEmpty(cat: Category): AnyItem {
  const id = crypto.randomUUID()
  switch (cat) {
    case 'bank-accounts': return { id, institution: '', accountType: 'Checking', last4: '', balance: '', isJoint: false } as BankItem
    case 'investments': return { id, type: 'Stocks', institution: '', currentValue: '', loanBalance: '', isLiquid: true } as InvestmentItem
    case 'retirement': return { id, type: '401k', institution: '', balance: '', loanBalance: '', ownerAge: '' } as RetirementItem
    case 'real-estate': return { id, propertyType: 'Primary Residence', address: '', fmv: '', mortgageBalance: '', helocBalance: '', datePurchased: '', homesteadFiled: false, isJoint: false } as RealEstateItem
    case 'vehicles': return { id, year: '', make: '', model: '', fmv: '', loanBalance: '', mileage: '', leaseOrOwn: 'Own' } as VehicleItem
    case 'life-insurance': return { id, company: '', type: 'Whole', csv: '', faceValue: '', policyLoans: '' } as LifeInsuranceItem
    case 'crypto': return { id, exchangeName: '', estimatedValue: '' } as CryptoItem
    case 'other': return { id, description: '', estimatedValue: '', loanBalance: '' } as OtherItem
  }
}

/* ===================================================================
   MAIN COMPONENT
   =================================================================== */
export default function AssetCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const category = params.category as Category
  const { answers, setAnswers } = useWizard()

  const catIndex = CATEGORIES.indexOf(category)
  const prevPath = catIndex === 0 ? '/analysis/case-review' : `/analysis/assets/${CATEGORIES[catIndex - 1]}`
  const nextPath = catIndex === CATEGORIES.length - 1 ? '/analysis/income-expenses' : `/analysis/assets/${CATEGORIES[catIndex + 1]}`
  const meta = CATEGORY_META[category]
  const progressPercent = Math.round(((catIndex + 1) / CATEGORIES.length) * 100)

  const storeKey = `assets_${category.replace(/-/g, '_')}`
  const savedGate = answers[`${storeKey}_has`]
  const [hasAsset, setHasAsset] = useState<boolean | null>(
    savedGate === true ? true : savedGate === false ? false : null,
  )
  const [whyOpen, setWhyOpen] = useState(false)

  const [items, setItems] = useState<AnyItem[]>(() => {
    const saved = answers[storeKey] as AnyItem[] | undefined
    return saved && saved.length > 0 ? saved : [createEmpty(category)]
  })

  function save() {
    setAnswers({ [`${storeKey}_has`]: hasAsset, [storeKey]: hasAsset ? items : [] })
  }
  function handleNext() { save(); router.push(nextPath) }
  function handleBack() { save(); router.push(prevPath) }

  const totalQSV = useMemo(() => {
    if (!hasAsset) return 0
    return items.reduce((sum, item) => sum + computeQSV(category, item), 0)
  }, [items, category, hasAsset])

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Progress bar */}
        <div style={{ padding: '16px 0 0' }}>
          <div style={{ height: '4px', background: '#F0F0F5', borderRadius: '9999px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', background: '#1A1A2E', borderRadius: '9999px', width: `${progressPercent}%`, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8585A0' }}>Asset Intake</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', background: '#EFF4FF', padding: '2px 8px', borderRadius: '20px' }}>
              Category {catIndex + 1} of {CATEGORIES.length}
            </span>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', marginBottom: '12px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF4FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            <i className={meta.icon} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.2 }}>{meta.label}</h1>
            <p style={{ fontSize: '13px', color: '#5C5C7A', marginTop: '4px', lineHeight: 1.5 }}>{meta.desc}</p>
          </div>
        </div>

        {/* Gate cards */}
        <div>
          <button
            onClick={() => setHasAsset(true)}
            style={{
              padding: '20px',
              background: hasAsset === true ? '#ECFDF5' : '#fff',
              border: `2px solid ${hasAsset === true ? '#00A651' : '#D5D5E0'}`,
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '10px',
              width: '100%',
              textAlign: 'left' as const,
              fontFamily: 'inherit',
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, background: '#ECFDF5', color: '#00A651' }}>
              <i className="fa-solid fa-check" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>Yes, I have these</div>
              <div style={{ fontSize: '12px', color: '#8585A0', marginTop: '2px' }}>{meta.question}</div>
            </div>
          </button>

          <button
            onClick={() => {
              setHasAsset(false)
              setAnswers({ [`${storeKey}_has`]: false, [storeKey]: [] })
              router.push(nextPath)
            }}
            style={{
              padding: '20px',
              background: hasAsset === false ? '#FAFAFF' : '#fff',
              border: `2px solid ${hasAsset === false ? '#8585A0' : '#D5D5E0'}`,
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '10px',
              width: '100%',
              textAlign: 'left' as const,
              fontFamily: 'inherit',
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, background: '#FAFAFF', color: '#5C5C7A' }}>
              <i className="fa-solid fa-xmark" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>No, skip this</div>
              <div style={{ fontSize: '12px', color: '#8585A0', marginTop: '2px' }}>I do not have any {meta.label.toLowerCase()}</div>
            </div>
          </button>
        </div>

        {/* Form area - visible when hasAsset === true */}
        {hasAsset === true && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#FAFAFF', borderRadius: '14px', border: '1px solid #F0F0F5' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>Add {meta.label}</div>
            <div style={{ fontSize: '12px', color: '#8585A0', marginBottom: '12px', lineHeight: 1.5 }}>{meta.formDesc}</div>

            {/* Item entries */}
            <div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ padding: '12px', background: '#fff', border: '1px solid #F0F0F5', borderRadius: '12px', marginTop: '10px' }}>
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>
                      {meta.label.replace(/s$/, '')} {items.length > 1 ? idx + 1 : ''}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {items.length > 1 && (
                        <button
                          onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                          style={{ background: 'none', border: 'none', color: '#E63946', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px' }}
                        >
                          <i className="fa-solid fa-trash" style={{ fontSize: '12px' }} />
                        </button>
                      )}
                    </div>
                  </div>
                  {renderCategoryForm(category, item, idx, (updated) => {
                    setItems((prev) => { const arr = [...prev]; arr[idx] = updated; return arr })
                  })}
                  {computeQSV(category, item) > 0 && (
                    <div style={{ marginTop: '12px', padding: '10px 14px', background: '#EFF4FF', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                      <span>Quick Sale Value</span>
                      <span>{fmt(computeQSV(category, item))}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add entry button */}
            <button
              onClick={() => setItems((prev) => [...prev, createEmpty(category)])}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                border: '2px dashed #F0F0F5',
                borderRadius: '12px',
                cursor: 'pointer',
                color: '#5C5C7A',
                fontSize: '13px',
                fontWeight: 600,
                background: 'none',
                width: '100%',
                fontFamily: 'inherit',
                marginTop: '12px',
                transition: 'all 0.3s',
              }}
            >
              <i className="fa-solid fa-plus" style={{ fontSize: '11px' }} />
              Add entry
            </button>

            {/* Running total */}
            {totalQSV > 0 && (
              <div style={{ marginTop: '12px', padding: '10px 14px', background: '#EFF4FF', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 700, color: '#2563EB' }}>
                <span>Category Total</span>
                <span>{fmt(totalQSV)}</span>
              </div>
            )}
          </div>
        )}

        {/* Why does the IRS need this? */}
        <div style={{ marginTop: '16px' }}>
          <button
            onClick={() => setWhyOpen(!whyOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: '#2563EB',
              background: 'none',
              border: 'none',
              fontFamily: 'inherit',
              padding: 0,
            }}
          >
            <i className="fa-solid fa-circle-question" style={{ fontSize: '14px' }} />
            Why does the IRS need this?
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', transition: 'transform 0.3s', transform: whyOpen ? 'rotate(180deg)' : 'none' }} />
          </button>
          <div style={{ maxHeight: whyOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
            <div style={{ paddingTop: '10px' }}>
              <p style={{ fontSize: '13px', color: '#5C5C7A', lineHeight: 1.6 }}>{meta.whyText}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '12px 0 20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleBack}
              style={{
                flex: '0 0 auto',
                padding: '16px 20px',
                borderRadius: '14px',
                border: '1.5px solid #D5D5E0',
                background: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                color: '#5C5C7A',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
            >
              <i className="fa-solid fa-arrow-left" style={{ fontSize: '13px' }} />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={hasAsset === null}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                borderRadius: '9999px',
                padding: '16px 28px',
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                cursor: hasAsset !== null ? 'pointer' : 'default',
                background: '#00A651',
                color: 'white',
                boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
                opacity: hasAsset !== null ? 1 : 0.5,
                pointerEvents: hasAsset !== null ? 'auto' : 'none',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
            >
              Continue
              <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   SHARED FORM COMPONENTS
   =================================================================== */
const fieldLabelClass = 'mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#5C5C7A]'
const fieldInputClass = 'w-full rounded-[10px] border-[1.5px] border-[#F0F0F5] bg-white px-3 py-2.5 text-sm font-semibold text-[#1A1A2E] outline-none transition-all placeholder:font-normal placeholder:text-[#B0B0C8] focus:border-[#2563EB] focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'

function MoneyInput({ label, value, onChange, placeholder = '0.00' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className={fieldLabelClass}>{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#B0B0C8]">$</span>
        <input type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${fieldInputClass} pl-7`} />
      </div>
    </div>
  )
}

/* ===================================================================
   PER-CATEGORY FORM RENDERS
   =================================================================== */
function renderCategoryForm(cat: Category, item: AnyItem, idx: number, onChange: (updated: AnyItem) => void) {
  switch (cat) {
    case 'bank-accounts': return <BankForm item={item as BankItem} idx={idx} onChange={onChange} />
    case 'investments': return <InvestmentForm item={item as InvestmentItem} idx={idx} onChange={onChange} />
    case 'retirement': return <RetirementForm item={item as RetirementItem} idx={idx} onChange={onChange} />
    case 'real-estate': return <RealEstateForm item={item as RealEstateItem} idx={idx} onChange={onChange} />
    case 'vehicles': return <VehicleForm item={item as VehicleItem} idx={idx} onChange={onChange} />
    case 'life-insurance': return <LifeInsuranceForm item={item as LifeInsuranceItem} idx={idx} onChange={onChange} />
    case 'crypto': return <CryptoForm item={item as CryptoItem} idx={idx} onChange={onChange} />
    case 'other': return <OtherForm item={item as OtherItem} idx={idx} onChange={onChange} />
  }
}

function BankForm({ item, idx, onChange }: { item: BankItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof BankItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={fieldLabelClass}>Institution</label>
          <input type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Chase, Wells Fargo" className={fieldInputClass} />
        </div>
        <div>
          <label className={fieldLabelClass}>Account Type</label>
          <select value={item.accountType} onChange={(e) => set('accountType', e.target.value)} className={fieldInputClass}>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Money Market">Money Market</option>
            <option value="CD">CD</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className={fieldLabelClass}>Last 4</label>
          <input type="text" maxLength={4} inputMode="numeric" value={item.last4} onChange={(e) => set('last4', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="1234" className={fieldInputClass} />
        </div>
        <MoneyInput label="Balance" value={item.balance} onChange={(v) => set('balance', v)} />
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F0F0F5] bg-white px-3 py-2.5 transition-colors hover:border-[#2563EB]">
            <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
            <span className="text-xs font-medium text-[#1A1A2E]">Joint</span>
          </label>
        </div>
      </div>
    </div>
  )
}

function InvestmentForm({ item, idx, onChange }: { item: InvestmentItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof InvestmentItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={fieldLabelClass}>Type</label>
          <select value={item.type} onChange={(e) => set('type', e.target.value)} className={fieldInputClass}>
            <option value="Stocks">Stocks</option><option value="Bonds">Bonds</option><option value="Mutual Funds">Mutual Funds</option><option value="ETFs">ETFs</option>
          </select>
        </div>
        <div>
          <label className={fieldLabelClass}>Institution</label>
          <input type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Fidelity, Schwab" className={fieldInputClass} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MoneyInput label="Current Value" value={item.currentValue} onChange={(v) => set('currentValue', v)} />
        <MoneyInput label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F0F0F5] bg-white px-3 py-2.5">
            <input type="checkbox" checked={item.isLiquid} onChange={(e) => set('isLiquid', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
            <span className="text-xs font-medium text-[#1A1A2E]">Liquid</span>
          </label>
        </div>
      </div>
    </div>
  )
}

function RetirementForm({ item, idx, onChange }: { item: RetirementItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof RetirementItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={fieldLabelClass}>Account Type</label>
          <select value={item.type} onChange={(e) => set('type', e.target.value)} className={fieldInputClass}>
            <option value="401k">401(k)</option><option value="IRA">IRA</option><option value="Roth IRA">Roth IRA</option><option value="403b">403(b)</option><option value="Pension">Pension</option>
          </select>
        </div>
        <div>
          <label className={fieldLabelClass}>Institution</label>
          <input type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Vanguard, Fidelity" className={fieldInputClass} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MoneyInput label="Balance" value={item.balance} onChange={(v) => set('balance', v)} />
        <MoneyInput label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div>
          <label className={fieldLabelClass}>Owner Age</label>
          <input type="number" min={18} max={100} step={0.5} value={item.ownerAge} onChange={(e) => set('ownerAge', e.target.value)} placeholder="45" className={fieldInputClass} />
        </div>
      </div>
    </div>
  )
}

function RealEstateForm({ item, idx, onChange }: { item: RealEstateItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof RealEstateItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={fieldLabelClass}>Property Type</label>
          <select value={item.propertyType} onChange={(e) => set('propertyType', e.target.value)} className={fieldInputClass}>
            <option value="Primary Residence">Primary Residence</option><option value="Investment Property">Investment Property</option><option value="Vacation Home">Vacation Home</option><option value="Commercial">Commercial</option><option value="Land">Land</option>
          </select>
        </div>
        <div>
          <label className={fieldLabelClass}>Date Purchased</label>
          <input type="date" value={item.datePurchased} onChange={(e) => set('datePurchased', e.target.value)} className={fieldInputClass} />
        </div>
      </div>
      <div>
        <label className={fieldLabelClass}>Address</label>
        <input type="text" value={item.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Main St, City, State ZIP" className={fieldInputClass} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MoneyInput label="Fair Market Value" value={item.fmv} onChange={(v) => set('fmv', v)} />
        <MoneyInput label="Mortgage Bal." value={item.mortgageBalance} onChange={(v) => set('mortgageBalance', v)} />
        <MoneyInput label="HELOC Bal." value={item.helocBalance} onChange={(v) => set('helocBalance', v)} />
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F0F0F5] bg-white px-3 py-2.5">
          <input type="checkbox" checked={item.homesteadFiled} onChange={(e) => set('homesteadFiled', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
          <span className="text-xs font-medium text-[#1A1A2E]">Homestead Filed</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F0F0F5] bg-white px-3 py-2.5">
          <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
          <span className="text-xs font-medium text-[#1A1A2E]">Joint Ownership</span>
        </label>
      </div>
    </div>
  )
}

function VehicleForm({ item, idx, onChange }: { item: VehicleItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof VehicleItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div><label className={fieldLabelClass}>Year</label><input type="text" inputMode="numeric" maxLength={4} value={item.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="2022" className={fieldInputClass} /></div>
        <div><label className={fieldLabelClass}>Make</label><input type="text" value={item.make} onChange={(e) => set('make', e.target.value)} placeholder="Toyota" className={fieldInputClass} /></div>
        <div><label className={fieldLabelClass}>Model</label><input type="text" value={item.model} onChange={(e) => set('model', e.target.value)} placeholder="Camry" className={fieldInputClass} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MoneyInput label="Trade-in Value" value={item.fmv} onChange={(v) => set('fmv', v)} />
        <MoneyInput label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div><label className={fieldLabelClass}>Mileage</label><input type="text" inputMode="numeric" value={item.mileage} onChange={(e) => set('mileage', e.target.value.replace(/\D/g, ''))} placeholder="45000" className={fieldInputClass} /></div>
      </div>
      <div>
        <label className={fieldLabelClass}>Lease or Own</label>
        <div className="flex gap-2">
          {['Own', 'Lease'].map((opt) => (
            <button key={opt} type="button" onClick={() => set('leaseOrOwn', opt)} className={`flex-1 rounded-xl border-[1.5px] px-4 py-2.5 text-center text-sm font-semibold transition-all ${item.leaseOrOwn === opt ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]' : 'border-[#F0F0F5] bg-white text-[#5C5C7A] hover:border-[#D5D5E0]'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function LifeInsuranceForm({ item, idx, onChange }: { item: LifeInsuranceItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof LifeInsuranceItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className={fieldLabelClass}>Company</label><input type="text" value={item.company} onChange={(e) => set('company', e.target.value)} placeholder="State Farm, MetLife" className={fieldInputClass} /></div>
        <div><label className={fieldLabelClass}>Policy Type</label><select value={item.type} onChange={(e) => set('type', e.target.value)} className={fieldInputClass}><option value="Whole">Whole Life</option><option value="Universal">Universal Life</option><option value="Term">Term Life</option></select></div>
      </div>
      {item.type === 'Term' && (
        <div className="rounded-lg bg-[#FAFAFF] p-3 text-xs text-[#5C5C7A]">Term life policies have no cash surrender value. QSV = $0</div>
      )}
      <div className="grid grid-cols-3 gap-3">
        <MoneyInput label="Cash Surrender Value" value={item.csv} onChange={(v) => set('csv', v)} />
        <MoneyInput label="Face Value" value={item.faceValue} onChange={(v) => set('faceValue', v)} />
        <MoneyInput label="Policy Loans" value={item.policyLoans} onChange={(v) => set('policyLoans', v)} />
      </div>
    </div>
  )
}

function CryptoForm({ item, idx, onChange }: { item: CryptoItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof CryptoItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="grid grid-cols-2 gap-3">
      <div><label className={fieldLabelClass}>Exchange / Wallet</label><input type="text" value={item.exchangeName} onChange={(e) => set('exchangeName', e.target.value)} placeholder="Coinbase, Ledger" className={fieldInputClass} /></div>
      <MoneyInput label="Estimated Value" value={item.estimatedValue} onChange={(v) => set('estimatedValue', v)} />
    </div>
  )
}

function OtherForm({ item, idx, onChange }: { item: OtherItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof OtherItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-3">
      <div><label className={fieldLabelClass}>Description</label><input type="text" value={item.description} onChange={(e) => set('description', e.target.value)} placeholder="Art, equipment, jewelry" className={fieldInputClass} /></div>
      <div className="grid grid-cols-2 gap-3">
        <MoneyInput label="Estimated Value" value={item.estimatedValue} onChange={(v) => set('estimatedValue', v)} />
        <MoneyInput label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
      </div>
    </div>
  )
}
