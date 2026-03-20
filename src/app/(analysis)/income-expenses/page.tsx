'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import {
  getNationalStandard,
  getHealthcareStandard,
  getTransportationOwnership,
  getTransportationOperating,
  getPublicTransportation,
} from '@/lib/calculations/standards'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PersonIncome {
  wages: number
  selfEmployment: number
  socialSecurity: number
  pension: number
  rentalIncome: number
  interestDividends: number
  alimonyChildSupport: number
  otherIncome: number
  federalWithholding: number
  stateWithholding: number
  ficaWithholding: number
}

interface ExpenseRow {
  key: string
  label: string
  yourAmount: number
  irsAllows: number
  allowable: number
  uncapped: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const emptyIncome = (): PersonIncome => ({
  wages: 0,
  selfEmployment: 0,
  socialSecurity: 0,
  pension: 0,
  rentalIncome: 0,
  interestDividends: 0,
  alimonyChildSupport: 0,
  otherIncome: 0,
  federalWithholding: 0,
  stateWithholding: 0,
  ficaWithholding: 0,
})

function totalGross(p: PersonIncome): number {
  return (
    p.wages +
    p.selfEmployment +
    p.socialSecurity +
    p.pension +
    p.rentalIncome +
    p.interestDividends +
    p.alimonyChildSupport +
    p.otherIncome
  )
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const incomeFields: { key: keyof PersonIncome; label: string; group: 'income' | 'withholding' }[] = [
  { key: 'wages', label: 'Wages (gross monthly)', group: 'income' },
  { key: 'selfEmployment', label: 'Self-employment income (net)', group: 'income' },
  { key: 'socialSecurity', label: 'Social Security benefits', group: 'income' },
  { key: 'pension', label: 'Pension / retirement income', group: 'income' },
  { key: 'rentalIncome', label: 'Rental income (net)', group: 'income' },
  { key: 'interestDividends', label: 'Interest & dividends', group: 'income' },
  { key: 'alimonyChildSupport', label: 'Alimony / child support received', group: 'income' },
  { key: 'otherIncome', label: 'Other income', group: 'income' },
  { key: 'federalWithholding', label: 'Federal withholding', group: 'withholding' },
  { key: 'stateWithholding', label: 'State withholding', group: 'withholding' },
  { key: 'ficaWithholding', label: 'FICA withholding', group: 'withholding' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function IncomeExpensesPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  const isMFJ = answers.filingStatus === 'MFJ'
  const familySize: number = answers.familySize ?? 1
  const members65Plus: number = answers.members65Plus ?? 0
  const membersUnder65 = familySize - members65Plus
  const numVehicles: number = answers.numVehicles ?? 0
  const censusRegion: string = answers.censusRegion ?? 'south'

  // ---- State ----
  const [taxpayer, setTaxpayer] = useState<PersonIncome>(
    answers.taxpayerIncome ?? emptyIncome(),
  )
  const [spouse, setSpouse] = useState<PersonIncome>(
    answers.spouseIncome ?? emptyIncome(),
  )

  // Expense actual amounts (keyed by category)
  const [expenseAmounts, setExpenseAmounts] = useState<Record<string, number>>(
    answers.expenseAmounts ?? {},
  )

  const setExpense = useCallback((key: string, value: number) => {
    setExpenseAmounts((prev) => ({ ...prev, [key]: value }))
  }, [])

  // ---- Derived values ----
  const totalMonthlyIncome = useMemo(
    () => totalGross(taxpayer) + (isMFJ ? totalGross(spouse) : 0),
    [taxpayer, spouse, isMFJ],
  )

  // Build expense rows with IRS standard lookups
  const expenseRows: ExpenseRow[] = useMemo(() => {
    const rows: ExpenseRow[] = []

    const add = (
      key: string,
      label: string,
      irsAllows: number,
      uncapped = false,
    ) => {
      const yourAmount = expenseAmounts[key] ?? 0
      const allowable = uncapped ? yourAmount : Math.min(yourAmount, irsAllows)
      rows.push({ key, label, yourAmount, irsAllows, allowable, uncapped })
    }

    // 1. Food, Clothing & Misc
    const foodStandard = getNationalStandard(familySize, totalMonthlyIncome)
    add('foodClothingMisc', 'Food, Clothing & Misc', foodStandard)

    // 2. Housing & Utilities (uncapped — local standard would need county)
    add('housingUtilities', 'Housing & Utilities', expenseAmounts['housingUtilities'] ?? 0, true)

    // 3. Vehicle Ownership
    const vehicleOwnership = getTransportationOwnership(numVehicles)
    add('vehicleOwnership', 'Vehicle Ownership', vehicleOwnership)

    // 4. Vehicle Operating
    const vehicleOperating = getTransportationOperating(censusRegion, numVehicles)
    add('vehicleOperating', 'Vehicle Operating', vehicleOperating)

    // 5. Public Transportation (only if 0 vehicles)
    if (numVehicles === 0) {
      const publicTransport = getPublicTransportation(censusRegion)
      add('publicTransportation', 'Public Transportation', publicTransport)
    }

    // 6. Health Insurance Premiums (uncapped)
    add('healthInsurance', 'Health Insurance Premiums', expenseAmounts['healthInsurance'] ?? 0, true)

    // 7. Out-of-Pocket Healthcare
    const oopStandard = getHealthcareStandard(membersUnder65, members65Plus)
    add('oopHealthcare', 'Out-of-Pocket Healthcare', oopStandard)

    // 8-15: Uncapped categories
    add('courtOrdered', 'Court-Ordered Payments', expenseAmounts['courtOrdered'] ?? 0, true)
    add('childDependentCare', 'Child / Dependent Care', expenseAmounts['childDependentCare'] ?? 0, true)
    add('termLifeInsurance', 'Term Life Insurance', expenseAmounts['termLifeInsurance'] ?? 0, true)
    add('currentYearTaxes', 'Current Year Taxes', expenseAmounts['currentYearTaxes'] ?? 0, true)
    add('securedDebt', 'Secured Debt Payments', expenseAmounts['securedDebt'] ?? 0, true)
    add('studentLoans', 'Student Loans', expenseAmounts['studentLoans'] ?? 0, true)
    add('unionDues', 'Union Dues', expenseAmounts['unionDues'] ?? 0, true)
    add('mandatoryRetirement', 'Mandatory Retirement', expenseAmounts['mandatoryRetirement'] ?? 0, true)

    return rows
  }, [expenseAmounts, familySize, totalMonthlyIncome, numVehicles, censusRegion, membersUnder65, members65Plus])

  const totalAllowable = useMemo(
    () => expenseRows.reduce((s, r) => s + r.allowable, 0),
    [expenseRows],
  )
  const mdi = totalMonthlyIncome - totalAllowable

  // ---- Persistence ----
  function handleContinue() {
    setAnswers({
      taxpayerIncome: taxpayer,
      spouseIncome: isMFJ ? spouse : undefined,
      expenseAmounts,
      totalMonthlyIncome,
      totalAllowableExpenses: totalAllowable,
      monthlyDisposableIncome: mdi,
    })
    router.push('/analysis/csed-review')
  }

  function handleBack() {
    router.back()
  }

  // ---- Render helpers ----
  function renderIncomeSection(
    label: string,
    data: PersonIncome,
    setter: React.Dispatch<React.SetStateAction<PersonIncome>>,
  ) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">{label}</h3>

        <div className="space-y-3">
          {incomeFields
            .filter((f) => f.group === 'income')
            .map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-4">
                <label className="text-sm text-zinc-400">{f.label}</label>
                <div className="relative w-36">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={data[f.key] || ''}
                    onChange={(e) =>
                      setter((prev) => ({ ...prev, [f.key]: Number(e.target.value) || 0 }))
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-7 pr-3 text-right text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Withholding sub-section */}
        <div className="mt-5 border-t border-zinc-800 pt-4">
          <h4 className="mb-3 text-sm font-medium text-zinc-300">Monthly Withholding</h4>
          <div className="space-y-3">
            {incomeFields
              .filter((f) => f.group === 'withholding')
              .map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-4">
                  <label className="text-sm text-zinc-400">{f.label}</label>
                  <div className="relative w-36">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                      $
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={data[f.key] || ''}
                      onChange={(e) =>
                        setter((prev) => ({ ...prev, [f.key]: Number(e.target.value) || 0 }))
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-7 pr-3 text-right text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
          <span className="text-sm font-medium text-zinc-300">Total Gross Monthly Income</span>
          <span className="text-base font-bold text-white">{fmt(totalGross(data))}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Monthly Income & Expenses
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Enter your household&apos;s monthly income and living expenses. We&apos;ll compare your
            expenses against IRS Collection Financial Standards in real time.
          </p>
        </div>

        {/* ── Income Section ── */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Income
          </h2>
          <div className="space-y-4">
            {renderIncomeSection('Taxpayer', taxpayer, setTaxpayer)}
            {isMFJ && renderIncomeSection('Spouse', spouse, setSpouse)}
          </div>

          {/* Combined income total */}
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-emerald-300">
                Combined Monthly Income
              </span>
              <span className="text-xl font-bold text-emerald-400">
                {fmt(totalMonthlyIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Expenses Section ── */}
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Expenses
          </h2>

          {/* Column headers */}
          <div className="mb-2 grid grid-cols-[1fr_7rem_7rem_7rem] items-end gap-2 px-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            <span>Category</span>
            <span className="text-right">Your Amt</span>
            <span className="text-right">IRS Allows</span>
            <span className="text-right">Allowable</span>
          </div>

          <div className="space-y-1">
            {expenseRows.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[1fr_7rem_7rem_7rem] items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5"
              >
                <div>
                  <span className="text-sm text-zinc-300">{row.label}</span>
                  {row.uncapped && (
                    <span className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-500">
                      Actual
                    </span>
                  )}
                </div>

                {/* Your Amount input */}
                <div className="relative">
                  <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={expenseAmounts[row.key] || ''}
                    onChange={(e) => setExpense(row.key, Number(e.target.value) || 0)}
                    className="w-full rounded border border-zinc-700 bg-zinc-800 py-1.5 pl-5 pr-2 text-right text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                {/* IRS Allows */}
                <span className="text-right text-sm text-zinc-400">
                  {row.uncapped ? '--' : fmt(row.irsAllows)}
                </span>

                {/* Allowable */}
                <span
                  className={`text-right text-sm font-medium ${
                    row.yourAmount > row.irsAllows && !row.uncapped
                      ? 'text-amber-400'
                      : 'text-white'
                  }`}
                >
                  {fmt(row.allowable)}
                </span>
              </div>
            ))}
          </div>

          {/* Expense total */}
          <div className="mt-3 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-300">Total Allowable Expenses</span>
              <span className="text-lg font-bold text-white">{fmt(totalAllowable)}</span>
            </div>
          </div>
        </div>

        {/* ── MDI Summary Card ── */}
        <div
          className={`mb-8 rounded-xl border p-5 ${
            mdi > 0
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : 'border-red-500/30 bg-red-500/5'
          }`}
        >
          <h3 className="mb-4 text-lg font-bold text-white">Monthly Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Total Monthly Income</span>
              <span className="text-white">{fmt(totalMonthlyIncome)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Total Allowable Expenses</span>
              <span className="text-white">{fmt(totalAllowable)}</span>
            </div>
            <div className="border-t border-zinc-700 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">
                  Monthly Disposable Income (MDI)
                </span>
                <span
                  className={`text-xl font-bold ${
                    mdi > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {fmt(mdi)}
                </span>
              </div>
            </div>
          </div>

          {mdi <= 0 && (
            <div className="mt-4 flex items-start gap-3 rounded-lg bg-red-500/10 p-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-400">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm leading-relaxed text-red-300">
                You may qualify for Currently Not Collectible (CNC) status. Your allowable expenses
                meet or exceed your income, which means the IRS may temporarily pause collection.
              </p>
            </div>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={handleBack}
            className="flex-1 rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
