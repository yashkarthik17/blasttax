'use client'

import { useState, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

/* ---------- shared styles ---------- */
const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'
const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'
const pillClass = (active: boolean) =>
  `flex-1 rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all cursor-pointer ${
    active
      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
  }`

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}
function num(s: string) {
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ''))
  return isNaN(n) ? 0 : n
}

/* ---------- category ordering for prev/next ---------- */
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

const CATEGORY_LABELS: Record<Category, string> = {
  'bank-accounts': 'Bank Accounts',
  investments: 'Investment Accounts',
  retirement: 'Retirement Accounts',
  'real-estate': 'Real Estate',
  vehicles: 'Vehicles',
  'life-insurance': 'Life Insurance',
  crypto: 'Cryptocurrency',
  other: 'Other Valuable Assets',
}

const CATEGORY_QUESTIONS: Record<Category, string> = {
  'bank-accounts': 'Do you have any bank accounts?',
  investments: 'Do you have any investment accounts?',
  retirement: 'Do you have any retirement accounts?',
  'real-estate': 'Do you own any real estate?',
  vehicles: 'Do you own any vehicles?',
  'life-insurance': 'Do you have life insurance with cash value?',
  crypto: 'Do you own any cryptocurrency?',
  other: 'Do you have other valuable assets?',
}

/* ---------- money input helper ---------- */
function MoneyInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0.00',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pl-7`}
        />
      </div>
    </div>
  )
}

/* ===================================================================
   PER-CATEGORY ITEM TYPES
   =================================================================== */
interface BankItem { id: string; institution: string; accountType: string; last4: string; balance: string; isJoint: boolean }
interface InvestmentItem { id: string; type: string; institution: string; currentValue: string; loanBalance: string; isLiquid: boolean }
interface RetirementItem { id: string; type: string; institution: string; balance: string; loanBalance: string; ownerAge: string }
interface RealEstateItem { id: string; propertyType: string; address: string; fmv: string; mortgageBalance: string; helocBalance: string; datePurchased: string; homesteadFiled: boolean; isJoint: boolean }
interface VehicleItem { id: string; year: string; make: string; model: string; fmv: string; loanBalance: string; mileage: string; leaseOrOwn: string }
interface LifeInsuranceItem { id: string; company: string; type: string; csv: string; faceValue: string; policyLoans: string }
interface CryptoItem { id: string; exchangeName: string; estimatedValue: string }
interface OtherItem { id: string; description: string; estimatedValue: string; loanBalance: string }

type AnyItem = BankItem | InvestmentItem | RetirementItem | RealEstateItem | VehicleItem | LifeInsuranceItem | CryptoItem | OtherItem

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

  const storeKey = `assets_${category.replace(/-/g, '_')}`

  /* ---------- gate: has this asset? ---------- */
  const savedGate = answers[`${storeKey}_has`]
  const [hasAsset, setHasAsset] = useState<boolean | null>(
    savedGate === true ? true : savedGate === false ? false : null,
  )

  /* ---------- items state ---------- */
  const [items, setItems] = useState<AnyItem[]>(() => {
    const saved = answers[storeKey] as AnyItem[] | undefined
    return saved && saved.length > 0 ? saved : [createEmpty(category)]
  })

  function save() {
    setAnswers({
      [`${storeKey}_has`]: hasAsset,
      [storeKey]: hasAsset ? items : [],
    })
  }

  function handleNext() {
    save()
    router.push(nextPath)
  }

  function handleBack() {
    save()
    router.push(prevPath)
  }

  /* ---------- QSV computation ---------- */
  const totalQSV = useMemo(() => {
    if (!hasAsset) return 0
    return items.reduce((sum, item) => sum + computeQSV(category, item), 0)
  }, [items, category, hasAsset])

  /* ---------- gate screen ---------- */
  if (hasAsset === null) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <h2 className="mb-8 text-center text-2xl font-bold leading-tight text-white">
            {CATEGORY_QUESTIONS[category]}
          </h2>
          <div className="flex w-full max-w-sm gap-4">
            <button
              onClick={() => setHasAsset(true)}
              className="flex-1 rounded-full bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setHasAsset(false)
                setAnswers({ [`${storeKey}_has`]: false, [storeKey]: [] })
                router.push(nextPath)
              }}
              className="flex-1 rounded-full bg-zinc-700 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-600 active:bg-zinc-800"
            >
              No
            </button>
          </div>
        </div>
        {/* Back button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleBack}
            className="w-full rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  /* ---------- form for this category ---------- */
  return (
    <FormScreen
      title={CATEGORY_LABELS[category]}
      description={`Enter details for each ${CATEGORY_LABELS[category].toLowerCase()} you have.`}
      onNext={handleNext}
      onBack={handleBack}
      isValid={true}
    >
      {items.map((item, idx) => (
        <div key={item.id} className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {CATEGORY_LABELS[category].replace(/s$/, '')} {items.length > 1 ? idx + 1 : ''}
            </h3>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                className="flex items-center gap-1 text-xs text-red-400 transition-colors hover:text-red-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                </svg>
                Remove
              </button>
            )}
          </div>

          {/* Render the right form for this category */}
          {renderCategoryForm(category, item, idx, (updated) => {
            setItems((prev) => {
              const arr = [...prev]
              arr[idx] = updated
              return arr
            })
          })}

          {/* QSV preview */}
          {computeQSV(category, item) > 0 && (
            <div className="mt-4 rounded-lg border border-zinc-700/50 bg-zinc-800/40 px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Quick Sale Value</span>
                <span className="text-sm font-bold text-emerald-400">{fmt(computeQSV(category, item))}</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Another */}
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, createEmpty(category)])}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-4 text-sm font-medium text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" /><path d="M5 12h14" />
        </svg>
        Add Another
      </button>

      {/* Running Total QSV */}
      {totalQSV > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Total QSV - {CATEGORY_LABELS[category]}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{fmt(totalQSV)}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </FormScreen>
  )
}

/* ===================================================================
   CREATE EMPTY ITEMS
   =================================================================== */
function createEmpty(cat: Category): AnyItem {
  const id = crypto.randomUUID()
  switch (cat) {
    case 'bank-accounts':
      return { id, institution: '', accountType: 'Checking', last4: '', balance: '', isJoint: false } as BankItem
    case 'investments':
      return { id, type: 'Stocks', institution: '', currentValue: '', loanBalance: '', isLiquid: true } as InvestmentItem
    case 'retirement':
      return { id, type: '401k', institution: '', balance: '', loanBalance: '', ownerAge: '' } as RetirementItem
    case 'real-estate':
      return { id, propertyType: 'Primary Residence', address: '', fmv: '', mortgageBalance: '', helocBalance: '', datePurchased: '', homesteadFiled: false, isJoint: false } as RealEstateItem
    case 'vehicles':
      return { id, year: '', make: '', model: '', fmv: '', loanBalance: '', mileage: '', leaseOrOwn: 'Own' } as VehicleItem
    case 'life-insurance':
      return { id, company: '', type: 'Whole', csv: '', faceValue: '', policyLoans: '' } as LifeInsuranceItem
    case 'crypto':
      return { id, exchangeName: '', estimatedValue: '' } as CryptoItem
    case 'other':
      return { id, description: '', estimatedValue: '', loanBalance: '' } as OtherItem
  }
}

/* ===================================================================
   QSV COMPUTATION
   =================================================================== */
function computeQSV(cat: Category, item: AnyItem): number {
  switch (cat) {
    case 'bank-accounts': {
      const i = item as BankItem
      return num(i.balance)
    }
    case 'investments': {
      const i = item as InvestmentItem
      return (i as InvestmentItem).isLiquid ? num(i.currentValue) : num(i.currentValue) * 0.8
    }
    case 'retirement': {
      const i = item as RetirementItem
      const age = num(i.ownerAge)
      const bal = num(i.balance)
      const loans = num(i.loanBalance)
      if (age > 0 && age < 59.5) {
        const penalty = bal * 0.10
        const tax = bal * 0.25
        return Math.max(0, bal - loans - penalty - tax)
      }
      return Math.max(0, bal - loans)
    }
    case 'real-estate': {
      const i = item as RealEstateItem
      return Math.max(0, num(i.fmv) * 0.80 - num(i.mortgageBalance) - num(i.helocBalance))
    }
    case 'vehicles': {
      const i = item as VehicleItem
      return Math.max(0, num(i.fmv) * 0.80 - num(i.loanBalance))
    }
    case 'life-insurance': {
      const i = item as LifeInsuranceItem
      if (i.type === 'Term') return 0
      return Math.max(0, num(i.csv) - num(i.policyLoans))
    }
    case 'crypto': {
      const i = item as CryptoItem
      return num(i.estimatedValue)
    }
    case 'other': {
      const i = item as OtherItem
      return Math.max(0, num(i.estimatedValue) * 0.80 - num(i.loanBalance))
    }
  }
}

/* ===================================================================
   PER-CATEGORY FORM RENDERS
   =================================================================== */
function renderCategoryForm(
  cat: Category,
  item: AnyItem,
  idx: number,
  onChange: (updated: AnyItem) => void,
) {
  switch (cat) {
    case 'bank-accounts':
      return <BankForm item={item as BankItem} idx={idx} onChange={onChange} />
    case 'investments':
      return <InvestmentForm item={item as InvestmentItem} idx={idx} onChange={onChange} />
    case 'retirement':
      return <RetirementForm item={item as RetirementItem} idx={idx} onChange={onChange} />
    case 'real-estate':
      return <RealEstateForm item={item as RealEstateItem} idx={idx} onChange={onChange} />
    case 'vehicles':
      return <VehicleForm item={item as VehicleItem} idx={idx} onChange={onChange} />
    case 'life-insurance':
      return <LifeInsuranceForm item={item as LifeInsuranceItem} idx={idx} onChange={onChange} />
    case 'crypto':
      return <CryptoForm item={item as CryptoItem} idx={idx} onChange={onChange} />
    case 'other':
      return <OtherForm item={item as OtherItem} idx={idx} onChange={onChange} />
  }
}

/* ---- Bank Accounts ---- */
function BankForm({ item, idx, onChange }: { item: BankItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof BankItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`bank-inst-${idx}`} className={labelClass}>Financial Institution</label>
          <input id={`bank-inst-${idx}`} type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Chase, Wells Fargo, etc." className={inputClass} />
        </div>
        <div>
          <label htmlFor={`bank-type-${idx}`} className={labelClass}>Account Type</label>
          <select id={`bank-type-${idx}`} value={item.accountType} onChange={(e) => set('accountType', e.target.value)} className={inputClass}>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Money Market">Money Market</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`bank-last4-${idx}`} className={labelClass}>Last 4 Digits</label>
          <input id={`bank-last4-${idx}`} type="text" maxLength={4} inputMode="numeric" value={item.last4} onChange={(e) => set('last4', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="1234" className={inputClass} />
        </div>
        <MoneyInput id={`bank-bal-${idx}`} label="Current Balance" value={item.balance} onChange={(v) => set('balance', v)} />
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600">
            <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 accent-emerald-500" />
            <span className="text-sm text-zinc-300">Joint Account</span>
          </label>
        </div>
      </div>
    </div>
  )
}

/* ---- Investments ---- */
function InvestmentForm({ item, idx, onChange }: { item: InvestmentItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof InvestmentItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`inv-type-${idx}`} className={labelClass}>Investment Type</label>
          <select id={`inv-type-${idx}`} value={item.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
            <option value="Stocks">Stocks</option>
            <option value="Bonds">Bonds</option>
            <option value="Mutual Funds">Mutual Funds</option>
            <option value="ETFs">ETFs</option>
          </select>
        </div>
        <div>
          <label htmlFor={`inv-inst-${idx}`} className={labelClass}>Institution</label>
          <input id={`inv-inst-${idx}`} type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Fidelity, Schwab, etc." className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MoneyInput id={`inv-val-${idx}`} label="Current Value" value={item.currentValue} onChange={(v) => set('currentValue', v)} />
        <MoneyInput id={`inv-loan-${idx}`} label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600">
            <input type="checkbox" checked={item.isLiquid} onChange={(e) => set('isLiquid', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 accent-emerald-500" />
            <span className="text-sm text-zinc-300">Liquid</span>
          </label>
        </div>
      </div>
    </div>
  )
}

/* ---- Retirement ---- */
function RetirementForm({ item, idx, onChange }: { item: RetirementItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof RetirementItem, v: string) => onChange({ ...item, [f]: v })
  const age = num(item.ownerAge)
  const bal = num(item.balance)
  const loans = num(item.loanBalance)

  let qsvBreakdown = ''
  if (age > 0 && bal > 0) {
    if (age < 59.5) {
      qsvBreakdown = `Balance ${fmt(bal)} - Loans ${fmt(loans)} - 10% Penalty ${fmt(bal * 0.10)} - 25% Tax ${fmt(bal * 0.25)}`
    } else {
      qsvBreakdown = `Balance ${fmt(bal)} - Loans ${fmt(loans)}`
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`ret-type-${idx}`} className={labelClass}>Account Type</label>
          <select id={`ret-type-${idx}`} value={item.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
            <option value="401k">401(k)</option>
            <option value="IRA">IRA</option>
            <option value="Roth IRA">Roth IRA</option>
            <option value="403b">403(b)</option>
            <option value="Pension">Pension</option>
          </select>
        </div>
        <div>
          <label htmlFor={`ret-inst-${idx}`} className={labelClass}>Institution</label>
          <input id={`ret-inst-${idx}`} type="text" value={item.institution} onChange={(e) => set('institution', e.target.value)} placeholder="Vanguard, Fidelity, etc." className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MoneyInput id={`ret-bal-${idx}`} label="Current Balance" value={item.balance} onChange={(v) => set('balance', v)} />
        <MoneyInput id={`ret-loan-${idx}`} label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div>
          <label htmlFor={`ret-age-${idx}`} className={labelClass}>Owner Age</label>
          <input id={`ret-age-${idx}`} type="number" min="18" max="100" step="0.5" value={item.ownerAge} onChange={(e) => set('ownerAge', e.target.value)} placeholder="45" className={inputClass} />
        </div>
      </div>
      {qsvBreakdown && (
        <p className="text-xs text-zinc-500">{qsvBreakdown}</p>
      )}
    </div>
  )
}

/* ---- Real Estate ---- */
function RealEstateForm({ item, idx, onChange }: { item: RealEstateItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof RealEstateItem, v: string | boolean) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`re-type-${idx}`} className={labelClass}>Property Type</label>
          <select id={`re-type-${idx}`} value={item.propertyType} onChange={(e) => set('propertyType', e.target.value)} className={inputClass}>
            <option value="Primary Residence">Primary Residence</option>
            <option value="Investment Property">Investment Property</option>
            <option value="Vacation Home">Vacation Home</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div>
          <label htmlFor={`re-date-${idx}`} className={labelClass}>Date Purchased</label>
          <input id={`re-date-${idx}`} type="date" value={item.datePurchased} onChange={(e) => set('datePurchased', e.target.value)} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor={`re-addr-${idx}`} className={labelClass}>Property Address</label>
        <input id={`re-addr-${idx}`} type="text" value={item.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Main St, City, State ZIP" className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MoneyInput id={`re-fmv-${idx}`} label="Fair Market Value" value={item.fmv} onChange={(v) => set('fmv', v)} />
        <MoneyInput id={`re-mort-${idx}`} label="Mortgage Balance" value={item.mortgageBalance} onChange={(v) => set('mortgageBalance', v)} />
        <MoneyInput id={`re-heloc-${idx}`} label="HELOC Balance" value={item.helocBalance} onChange={(v) => set('helocBalance', v)} />
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600">
          <input type="checkbox" checked={item.homesteadFiled} onChange={(e) => set('homesteadFiled', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 accent-emerald-500" />
          <span className="text-sm text-zinc-300">Homestead Filed</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 transition-colors hover:border-zinc-600">
          <input type="checkbox" checked={item.isJoint} onChange={(e) => set('isJoint', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 accent-emerald-500" />
          <span className="text-sm text-zinc-300">Joint Ownership</span>
        </label>
      </div>
    </div>
  )
}

/* ---- Vehicles ---- */
function VehicleForm({ item, idx, onChange }: { item: VehicleItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof VehicleItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`veh-year-${idx}`} className={labelClass}>Year</label>
          <input id={`veh-year-${idx}`} type="text" inputMode="numeric" maxLength={4} value={item.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="2022" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`veh-make-${idx}`} className={labelClass}>Make</label>
          <input id={`veh-make-${idx}`} type="text" value={item.make} onChange={(e) => set('make', e.target.value)} placeholder="Toyota" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`veh-model-${idx}`} className={labelClass}>Model</label>
          <input id={`veh-model-${idx}`} type="text" value={item.model} onChange={(e) => set('model', e.target.value)} placeholder="Camry" className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MoneyInput id={`veh-fmv-${idx}`} label="Trade-in Value (FMV)" value={item.fmv} onChange={(v) => set('fmv', v)} />
        <MoneyInput id={`veh-loan-${idx}`} label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
        <div>
          <label htmlFor={`veh-miles-${idx}`} className={labelClass}>Mileage</label>
          <input id={`veh-miles-${idx}`} type="text" inputMode="numeric" value={item.mileage} onChange={(e) => set('mileage', e.target.value.replace(/\D/g, ''))} placeholder="45000" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Lease or Own</label>
        <div className="flex gap-3">
          {['Own', 'Lease'].map((opt) => (
            <button key={opt} type="button" onClick={() => set('leaseOrOwn', opt)} className={pillClass(item.leaseOrOwn === opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- Life Insurance ---- */
function LifeInsuranceForm({ item, idx, onChange }: { item: LifeInsuranceItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof LifeInsuranceItem, v: string) => onChange({ ...item, [f]: v })
  const isTerm = item.type === 'Term'
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`li-co-${idx}`} className={labelClass}>Insurance Company</label>
          <input id={`li-co-${idx}`} type="text" value={item.company} onChange={(e) => set('company', e.target.value)} placeholder="State Farm, MetLife, etc." className={inputClass} />
        </div>
        <div>
          <label htmlFor={`li-type-${idx}`} className={labelClass}>Policy Type</label>
          <select id={`li-type-${idx}`} value={item.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
            <option value="Whole">Whole Life</option>
            <option value="Universal">Universal Life</option>
            <option value="Term">Term Life</option>
          </select>
        </div>
      </div>
      {isTerm && (
        <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/40 px-4 py-3">
          <p className="text-sm text-zinc-400">Term life policies have no cash surrender value. QSV = $0</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MoneyInput id={`li-csv-${idx}`} label="Cash Surrender Value" value={item.csv} onChange={(v) => set('csv', v)} />
        <MoneyInput id={`li-face-${idx}`} label="Face Value" value={item.faceValue} onChange={(v) => set('faceValue', v)} />
        <MoneyInput id={`li-loans-${idx}`} label="Policy Loans" value={item.policyLoans} onChange={(v) => set('policyLoans', v)} />
      </div>
    </div>
  )
}

/* ---- Crypto ---- */
function CryptoForm({ item, idx, onChange }: { item: CryptoItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof CryptoItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`cry-name-${idx}`} className={labelClass}>Exchange / Wallet Name</label>
        <input id={`cry-name-${idx}`} type="text" value={item.exchangeName} onChange={(e) => set('exchangeName', e.target.value)} placeholder="Coinbase, Binance, Ledger, etc." className={inputClass} />
      </div>
      <MoneyInput id={`cry-val-${idx}`} label="Estimated Value" value={item.estimatedValue} onChange={(v) => set('estimatedValue', v)} />
    </div>
  )
}

/* ---- Other Assets ---- */
function OtherForm({ item, idx, onChange }: { item: OtherItem; idx: number; onChange: (u: AnyItem) => void }) {
  const set = (f: keyof OtherItem, v: string) => onChange({ ...item, [f]: v })
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={`oth-desc-${idx}`} className={labelClass}>Description</label>
        <input id={`oth-desc-${idx}`} type="text" value={item.description} onChange={(e) => set('description', e.target.value)} placeholder="Art collection, equipment, jewelry, etc." className={inputClass} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MoneyInput id={`oth-val-${idx}`} label="Estimated Value" value={item.estimatedValue} onChange={(v) => set('estimatedValue', v)} />
        <MoneyInput id={`oth-loan-${idx}`} label="Loan Balance" value={item.loanBalance} onChange={(v) => set('loanBalance', v)} />
      </div>
    </div>
  )
}
