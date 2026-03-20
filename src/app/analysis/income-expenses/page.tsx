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
  unemployment: number
  disability: number
  trustEstate: number
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
  wages: 0, selfEmployment: 0, socialSecurity: 0, unemployment: 0,
  disability: 0, trustEstate: 0, otherIncome: 0,
  federalWithholding: 0, stateWithholding: 0, ficaWithholding: 0,
})

function totalGross(p: PersonIncome): number {
  return p.wages + p.selfEmployment + p.socialSecurity + p.unemployment + p.disability + p.trustEstate + p.otherIncome
}

function totalWithholding(p: PersonIncome): number {
  return p.federalWithholding + p.stateWithholding + p.ficaWithholding
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const taxpayerIncomeFields: { key: keyof PersonIncome; label: string }[] = [
  { key: 'wages', label: 'Gross monthly wages' },
  { key: 'selfEmployment', label: 'Self-employment' },
  { key: 'socialSecurity', label: 'Social Security' },
  { key: 'unemployment', label: 'Unemployment' },
  { key: 'disability', label: 'Disability' },
  { key: 'trustEstate', label: 'Trust / Estate' },
  { key: 'otherIncome', label: 'Other income' },
]

const withholdingFields: { key: keyof PersonIncome; label: string }[] = [
  { key: 'federalWithholding', label: 'Federal withholding' },
  { key: 'stateWithholding', label: 'State withholding' },
  { key: 'ficaWithholding', label: 'FICA (Social Security + Medicare)' },
]

const spouseIncomeFields: { key: keyof PersonIncome; label: string }[] = [
  { key: 'wages', label: 'Spouse gross wages' },
  { key: 'selfEmployment', label: 'Spouse self-employment' },
  { key: 'socialSecurity', label: 'Spouse Social Security' },
  { key: 'otherIncome', label: 'Spouse other income' },
]

const spouseWithholdingFields: { key: keyof PersonIncome; label: string }[] = [
  { key: 'federalWithholding', label: 'Spouse federal withholding' },
  { key: 'stateWithholding', label: 'Spouse state withholding' },
  { key: 'ficaWithholding', label: 'Spouse FICA' },
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

  const [taxpayer, setTaxpayer] = useState<PersonIncome>(answers.taxpayerIncome ?? emptyIncome())
  const [spouse, setSpouse] = useState<PersonIncome>(answers.spouseIncome ?? emptyIncome())
  const [expenseAmounts, setExpenseAmounts] = useState<Record<string, number>>(answers.expenseAmounts ?? {})

  const setExpense = useCallback((key: string, value: number) => {
    setExpenseAmounts((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Net income = gross - withholding for both parties
  const taxpayerNet = totalGross(taxpayer) - totalWithholding(taxpayer)
  const spouseNet = isMFJ ? totalGross(spouse) - totalWithholding(spouse) : 0
  const totalMonthlyIncome = taxpayerNet + spouseNet

  // Build expense rows with IRS standard lookups
  const expenseRows: ExpenseRow[] = useMemo(() => {
    const rows: ExpenseRow[] = []
    const add = (key: string, label: string, irsAllows: number, uncapped = false) => {
      const yourAmount = expenseAmounts[key] ?? 0
      const allowable = uncapped ? yourAmount : Math.min(yourAmount, irsAllows)
      rows.push({ key, label, yourAmount, irsAllows, allowable, uncapped })
    }

    add('housingUtilities', 'Housing & utilities', expenseAmounts['housingUtilities'] ?? 0, true)

    const foodStandard = getNationalStandard(familySize, totalMonthlyIncome)
    add('foodClothingMisc', 'Food/clothing/misc', foodStandard)

    const vehicleOwnership = getTransportationOwnership(numVehicles)
    add('vehicleOwnership', 'Transport (own)', vehicleOwnership)

    const vehicleOperating = getTransportationOperating(censusRegion, numVehicles)
    add('vehicleOperating', 'Transport (oper)', vehicleOperating)

    if (numVehicles === 0) {
      const publicTransport = getPublicTransportation(censusRegion)
      add('publicTransportation', 'Public transportation', publicTransport)
    }

    const oopStandard = getHealthcareStandard(membersUnder65, members65Plus)
    add('oopHealthcare', 'Healthcare OOP', oopStandard)

    add('courtOrdered', 'Court-ordered / childcare', expenseAmounts['courtOrdered'] ?? 0, true)
    add('hsaContributions', 'HSA contributions', expenseAmounts['hsaContributions'] ?? 0, true)
    add('mandatoryRetirement', 'Req. retirement contrib.', expenseAmounts['mandatoryRetirement'] ?? 0, true)
    add('unionDues', 'Union dues', expenseAmounts['unionDues'] ?? 0, true)
    add('studentLoans', 'Student loan pmts', expenseAmounts['studentLoans'] ?? 0, true)
    add('securedDebt', 'Secured debt (non-housing)', expenseAmounts['securedDebt'] ?? 0, true)
    add('unsecuredDebt', 'Unsecured debt min. pmts', expenseAmounts['unsecuredDebt'] ?? 0, true)

    return rows
  }, [expenseAmounts, familySize, totalMonthlyIncome, numVehicles, censusRegion, membersUnder65, members65Plus])

  const totalExpenses = useMemo(() => expenseRows.reduce((s, r) => s + r.allowable, 0), [expenseRows])
  const mdi = totalMonthlyIncome - totalExpenses

  function handleContinue() {
    setAnswers({
      taxpayerIncome: taxpayer,
      spouseIncome: isMFJ ? spouse : undefined,
      expenseAmounts,
      totalMonthlyIncome,
      totalAllowableExpenses: totalExpenses,
      monthlyDisposableIncome: mdi,
    })
    router.push('/analysis/csed-review')
  }

  // Shared input class for income lines
  const lineInputClass = 'w-[90px] rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2.5 py-1.5 text-right text-sm font-bold text-[#0A1628] outline-none transition-all focus:border-[#2563EB] focus:bg-white focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
  const expInputClass = 'w-[72px] shrink-0 rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2 py-1.5 text-right text-xs font-bold text-[#0A1628] outline-none transition-all focus:border-[#2563EB] focus:bg-white'

  function renderIncomeLineItem(label: string, value: number, onChange: (v: number) => void, muted = false) {
    return (
      <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2.5 last:border-b-0">
        <span className={`text-[13px] font-medium ${muted ? 'text-[#64748B]' : 'text-[#0A1628]'}`}>{label}</span>
        <input
          type="text"
          inputMode="decimal"
          value={value ? `$${value.toLocaleString()}` : '$0'}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9.-]/g, '')
            onChange(Number(raw) || 0)
          }}
          className={lineInputClass}
          style={muted ? { color: '#CBD5E1' } : undefined}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md px-5 pb-8">
        {/* Progress Bar */}
        <div className="pt-4">
          <div className="h-1 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all duration-500" style={{ width: '70%' }} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 5 of 6</span>
            <span className="text-xs font-semibold text-[#2563EB]">Income & Expenses</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-3.5">
          <h1 className="text-xl font-extrabold leading-tight text-[#0A1628]">Monthly Income & Expenses</h1>
          <p className="mt-1 text-xs leading-snug text-[#94A3B8]">
            {"We'll use IRS allowable expense standards to calculate your disposable income"}
          </p>
        </div>

        {/* ── Income Section ── */}
        <div className="mt-3 rounded-2xl border border-[#F1F5F9] bg-white p-4.5">
          <div className="mb-3.5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6F9EE] text-xs text-[#00A651]">
              <i className="fa-solid fa-arrow-down" />
            </div>
            <span className="text-sm font-bold text-[#0A1628]">Income</span>
          </div>

          {/* Taxpayer Income */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            <i className="fa-solid fa-user mr-1 text-[9px]" /> Taxpayer Income
          </div>
          {taxpayerIncomeFields.map((f) => renderIncomeLineItem(
            f.label, taxpayer[f.key],
            (v) => setTaxpayer((prev) => ({ ...prev, [f.key]: v }))
          ))}

          {/* Taxpayer Withholding */}
          <div className="mt-1 border-t border-[#F1F5F9] pt-2.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            <i className="fa-solid fa-file-invoice-dollar mr-1 text-[9px]" /> Taxpayer Withholding
            <span className="ml-1 text-[9px] font-medium normal-case tracking-normal text-[#94A3B8]">(deducted from gross)</span>
          </div>
          {withholdingFields.map((f) => renderIncomeLineItem(
            f.label, taxpayer[f.key],
            (v) => setTaxpayer((prev) => ({ ...prev, [f.key]: v }))
          ))}

          {/* Spouse Income (if MFJ) */}
          {isMFJ && (
            <>
              <div className="mt-1 border-t border-[#F1F5F9] pt-2.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                <i className="fa-solid fa-user-plus mr-1 text-[9px]" /> Spouse Income
                <span className="ml-1 text-[9px] font-medium normal-case tracking-normal text-[#94A3B8]">(if filing jointly)</span>
              </div>
              {spouseIncomeFields.map((f) => renderIncomeLineItem(
                f.label, spouse[f.key],
                (v) => setSpouse((prev) => ({ ...prev, [f.key]: v })),
                true
              ))}

              <div className="mt-1 border-t border-[#F1F5F9] pt-2.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                <i className="fa-solid fa-file-invoice-dollar mr-1 text-[9px]" /> Spouse Withholding
                <span className="ml-1 text-[9px] font-medium normal-case tracking-normal text-[#94A3B8]">(if filing jointly)</span>
              </div>
              {spouseWithholdingFields.map((f) => renderIncomeLineItem(
                f.label, spouse[f.key],
                (v) => setSpouse((prev) => ({ ...prev, [f.key]: v })),
                true
              ))}
            </>
          )}

          {/* Withholding info note */}
          <div className="mt-2 rounded-md bg-[#F8FAFC] px-2 py-1.5 text-[10px] text-[#64748B]">
            <i className="fa-solid fa-info-circle mr-1 text-[9px] text-[#2563EB]" />
            Withholding (Federal, State, FICA) is deducted from gross before calculating net disposable income.
          </div>

          {/* Total Income Row */}
          <div className="mt-1 flex items-center justify-between border-t-2 border-[#F1F5F9] pt-3.5">
            <span className="text-[13px] font-bold text-[#0A1628]">Total Monthly Income</span>
            <span className="text-base font-extrabold text-[#00A651]">{fmt(totalMonthlyIncome)}</span>
          </div>
        </div>

        {/* ── Expenses Section ── */}
        <div className="mt-3 rounded-2xl border border-[#F1F5F9] bg-white p-4.5">
          <div className="mb-3.5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F1] text-xs text-[#E63946]">
              <i className="fa-solid fa-arrow-up" />
            </div>
            <span className="text-sm font-bold text-[#0A1628]">Expenses</span>
          </div>

          {/* Column headers */}
          <div className="mb-0.5 flex items-center gap-1.5 border-b border-[#F1F5F9] pb-1.5">
            <span className="flex-1 text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Category</span>
            <span className="w-[72px] text-right text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Your Amt</span>
            <span className="w-[72px] text-right text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">IRS Allows</span>
            <span className="w-[42px] text-center text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Status</span>
          </div>

          {/* Expense rows */}
          {expenseRows.map((row) => {
            const isOver = !row.uncapped && row.yourAmount > row.irsAllows && row.irsAllows > 0
            return (
              <div key={row.key} className="flex items-center gap-1.5 border-b border-[#F1F5F9] py-2 last:border-b-0">
                <span className="min-w-0 flex-1 text-xs font-medium text-[#0A1628]">{row.label}</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={row.yourAmount ? `$${row.yourAmount.toLocaleString()}` : '$0'}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.-]/g, '')
                    setExpense(row.key, Number(raw) || 0)
                  }}
                  className={expInputClass}
                />
                <span className="w-[72px] shrink-0 text-right text-[11px] font-semibold text-[#94A3B8]">
                  {row.uncapped ? (
                    <span className="text-[#94A3B8]">Actual</span>
                  ) : (
                    <span className="text-[9px] text-[#2563EB]">{fmt(row.irsAllows)}</span>
                  )}
                </span>
                <span className={`flex w-[42px] shrink-0 items-center justify-center rounded px-1.5 py-0.5 text-[9px] font-bold ${
                  row.uncapped
                    ? 'bg-[#F8FAFC] text-[#64748B]'
                    : isOver
                      ? 'bg-[#FFF0F1] text-[#E63946]'
                      : 'bg-[#E6F9EE] text-[#00A651]'
                }`}>
                  {row.uncapped ? 'N/A' : isOver ? 'Over' : 'Within'}
                </span>
              </div>
            )
          })}

          {/* Total Expenses Row */}
          <div className="mt-1 flex items-center justify-between border-t-2 border-[#F1F5F9] pt-3.5">
            <span className="text-[13px] font-bold text-[#0A1628]">Total Monthly Expenses</span>
            <span className="text-base font-extrabold text-[#E63946]">{fmt(totalExpenses)}</span>
          </div>
        </div>

        {/* ── IRS Standards Reference ── */}
        <div className="mt-3 rounded-xl border border-[#BFDBFE] bg-[#EFF4FF] px-3.5 py-2.5">
          <div className="mb-1.5 text-[11px] font-bold text-[#0A1628]">
            <i className="fa-solid fa-scale-balanced mr-1 text-[10px]" /> 2026 IRS Standards Reference
          </div>
          <div className="space-y-0.5 text-[10px] leading-relaxed text-[#64748B]">
            <div><strong>Healthcare OOP:</strong> $84/person under 65, $149/person 65+</div>
            <div><strong>Transport Ownership:</strong> $662/car (2026)</div>
            <div><strong>Food/Clothing:</strong> National Standard by family size + income</div>
            <div><strong>Housing:</strong> Local Standard by state/county</div>
            <div><strong>Transport Operating:</strong> By census region</div>
          </div>
          <div className="mt-1.5 rounded-md bg-[#FFFBEB] px-2 py-1 text-[10px] text-[#92400E]">
            Allowable = lesser of your actual expense or IRS standard for capped categories
          </div>
        </div>

        {/* ── MDI Summary Card ── */}
        <div className="mt-3 overflow-hidden rounded-2xl border-[1.5px] border-[rgba(10,22,40,0.12)] bg-white p-5 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0A1628]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#64748B]">
            Monthly Disposable Income (MDI)
          </span>
          <div className="mt-1.5 text-[2rem] font-black tracking-tight text-[#2563EB]">
            {fmt(mdi)}
          </div>
          <div className="mt-2.5 rounded-lg bg-[rgba(255,255,255,0.7)] px-3.5 py-2.5">
            <span className="text-xs text-[#64748B] leading-snug">
              This is what the IRS expects you can pay each month toward your tax debt
            </span>
          </div>
        </div>

        {/* ── Continue Button ── */}
        <div className="mt-4 pb-5">
          <button
            onClick={handleContinue}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00A651] py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#008C44]"
          >
            Calculate My Options
            <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
