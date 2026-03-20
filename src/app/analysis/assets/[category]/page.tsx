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
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Progress bar */}
        <div className="pt-4">
          <div className="h-1 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Asset Intake</span>
            <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">
              Category {catIndex + 1} of {CATEGORIES.length}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF4FF] text-[#2563EB]">
            <i className={`${meta.icon} text-xl`} />
          </div>
          <div>
            <h1 className="text-[1.4rem] font-extrabold leading-tight text-[#0A1628]">{meta.label}</h1>
            <p className="mt-0.5 text-[13px] leading-snug text-[#64748B]">{meta.desc}</p>
          </div>
        </div>

        {/* Gate cards */}
        <div className="mt-4 space-y-2.5 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          <button
            onClick={() => setHasAsset(true)}
            className={`flex w-full items-center gap-3.5 rounded-2xl border-2 p-5 text-left transition-all ${
              hasAsset === true
                ? 'border-[#00A651] bg-[#E6F9EE]'
                : 'border-[#E2E8F0] bg-white hover:border-[#2563EB] hover:-translate-y-px'
            }`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${
              hasAsset === true ? 'bg-[#E6F9EE] text-[#00A651]' : 'bg-[#E6F9EE] text-[#00A651]'
            }`}>
              <i className="fa-solid fa-check" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#0A1628]">Yes, I have these</div>
              <div className="mt-0.5 text-xs text-[#94A3B8]">{meta.question}</div>
            </div>
          </button>

          <button
            onClick={() => {
              setHasAsset(false)
              setAnswers({ [`${storeKey}_has`]: false, [storeKey]: [] })
              router.push(nextPath)
            }}
            className={`flex w-full items-center gap-3.5 rounded-2xl border-2 p-5 text-left transition-all ${
              hasAsset === false
                ? 'border-[#94A3B8] bg-[#F8FAFC]'
                : 'border-[#E2E8F0] bg-white hover:border-[#2563EB] hover:-translate-y-px'
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] text-lg text-[#64748B]">
              <i className="fa-solid fa-xmark" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#0A1628]">No, skip this</div>
              <div className="mt-0.5 text-xs text-[#94A3B8]">I do not have any {meta.label.toLowerCase()}</div>
            </div>
          </button>
        </div>

        {/* Form area - visible when hasAsset === true */}
        {hasAsset === true && (
          <div className="mt-4 rounded-[14px] border border-[#F1F5F9] bg-[#F8FAFC] p-4">
            <div className="text-[13px] font-bold text-[#0A1628]">Add {meta.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-[#94A3B8]">{meta.formDesc}</div>

            {/* Item entries */}
            <div className="mt-3 space-y-2.5">
              {items.map((item, idx) => (
                <div key={item.id} className="rounded-xl border border-[#F1F5F9] bg-white p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0A1628]">
                      {meta.label.replace(/s$/, '')} {items.length > 1 ? idx + 1 : ''}
                    </span>
                    <div className="flex gap-2">
                      {items.length > 1 && (
                        <button
                          onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                          className="rounded-md px-2 py-1 text-[#E63946] hover:bg-[#FFF0F1]"
                        >
                          <i className="fa-solid fa-trash text-xs" />
                        </button>
                      )}
                    </div>
                  </div>
                  {renderCategoryForm(category, item, idx, (updated) => {
                    setItems((prev) => { const arr = [...prev]; arr[idx] = updated; return arr })
                  })}
                  {computeQSV(category, item) > 0 && (
                    <div className="mt-3 flex items-center justify-between rounded-lg bg-[#EFF4FF] px-3 py-2">
                      <span className="text-xs font-bold text-[#2563EB]">Quick Sale Value</span>
                      <span className="text-sm font-bold text-[#2563EB]">{fmt(computeQSV(category, item))}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add entry button */}
            <button
              onClick={() => setItems((prev) => [...prev, createEmpty(category)])}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#F1F5F9] bg-transparent py-3 text-[13px] font-semibold text-[#64748B] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB]"
            >
              <i className="fa-solid fa-plus text-[11px]" />
              Add entry
            </button>

            {/* Running total */}
            {totalQSV > 0 && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-[#EFF4FF] px-3.5 py-2.5 text-[13px] font-bold text-[#2563EB]">
                <span>Category Total</span>
                <span>{fmt(totalQSV)}</span>
              </div>
            )}
          </div>
        )}

        {/* Why does the IRS need this? */}
        <div className="mt-4">
          <button
            onClick={() => setWhyOpen(!whyOpen)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB]"
          >
            <i className="fa-solid fa-circle-question text-sm" />
            Why does the IRS need this?
            <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${whyOpen ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-400 ${whyOpen ? 'mt-2.5 max-h-[300px]' : 'max-h-0'}`}>
            <p className="text-[13px] leading-relaxed text-[#64748B]">{meta.whyText}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleBack}
            className="flex shrink-0 items-center gap-2 rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-5 py-4 text-[15px] font-semibold text-[#64748B] transition-all hover:border-[#2563EB] hover:text-[#0A1628]"
          >
            <i className="fa-solid fa-arrow-left text-[13px]" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={hasAsset === null}
            className={`flex flex-1 items-center justify-center gap-2 rounded-[14px] py-4 text-[15px] font-semibold transition-all ${
              hasAsset !== null
                ? 'bg-[#00A651] text-white hover:bg-[#008C44]'
                : 'pointer-events-none bg-[#00A651] text-white opacity-50'
            }`}
          >
            Continue
            <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ===================================================================
   SHARED FORM COMPONENTS
   =================================================================== */
const fieldLabelClass = 'mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#64748B]'
const fieldInputClass = 'w-full rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-white px-3 py-2.5 text-sm font-semibold text-[#0A1628] outline-none transition-all placeholder:font-normal placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'

function MoneyInput({ label, value, onChange, placeholder = '0.00' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className={fieldLabelClass}>{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#CBD5E1]">$</span>
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
          <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-white px-3 py-2.5 transition-colors hover:border-[#2563EB]">
            <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
            <span className="text-xs font-medium text-[#0A1628]">Joint</span>
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
          <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-white px-3 py-2.5">
            <input type="checkbox" checked={item.isLiquid} onChange={(e) => set('isLiquid', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
            <span className="text-xs font-medium text-[#0A1628]">Liquid</span>
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
        <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-white px-3 py-2.5">
          <input type="checkbox" checked={item.homesteadFiled} onChange={(e) => set('homesteadFiled', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
          <span className="text-xs font-medium text-[#0A1628]">Homestead Filed</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-white px-3 py-2.5">
          <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded accent-[#2563EB]" />
          <span className="text-xs font-medium text-[#0A1628]">Joint Ownership</span>
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
            <button key={opt} type="button" onClick={() => set('leaseOrOwn', opt)} className={`flex-1 rounded-xl border-[1.5px] px-4 py-2.5 text-center text-sm font-semibold transition-all ${item.leaseOrOwn === opt ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]' : 'border-[#F1F5F9] bg-white text-[#64748B] hover:border-[#E2E8F0]'}`}>
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
        <div className="rounded-lg bg-[#F8FAFC] p-3 text-xs text-[#64748B]">Term life policies have no cash surrender value. QSV = $0</div>
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
