'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

// ---------------------------------------------------------------------------
// Section config
// ---------------------------------------------------------------------------

interface SectionDef {
  id: string
  title: string
  editPath: string
  render: (answers: Record<string, unknown>) => { label: string; value: string }[]
}

const sections: SectionDef[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    editPath: '/analysis/personal-info',
    render: (a) => [
      { label: 'Name', value: `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim() || 'Not entered' },
      { label: 'Filing Status', value: (a.filingStatus as string) ?? 'Not set' },
      { label: 'SSN (last 4)', value: a.ssnLast4 ? `***-**-${a.ssnLast4}` : 'Not entered' },
    ],
  },
  {
    id: 'employment',
    title: 'Employment',
    editPath: '/analysis/employment',
    render: (a) => [
      { label: 'Employment Status', value: (a.employmentStatus as string) ?? 'Not set' },
      { label: 'Employer', value: (a.employerName as string) ?? 'Not entered' },
    ],
  },
  {
    id: 'household',
    title: 'Household',
    editPath: '/analysis/household',
    render: (a) => [
      { label: 'Family Size', value: String(a.familySize ?? 'Not set') },
      { label: 'State', value: (a.state as string) ?? 'Not set' },
      { label: 'Vehicles', value: String(a.numVehicles ?? 0) },
    ],
  },
  {
    id: 'taxDebts',
    title: 'Tax Debts',
    editPath: '/analysis/case-info',
    render: (a) => {
      const debts = (a.taxDebts as { taxYear: number; balance: number }[]) ?? []
      if (debts.length === 0) return [{ label: 'Tax Debts', value: 'None entered' }]
      const total = debts.reduce((s, d) => s + d.balance, 0)
      return [
        { label: 'Periods', value: `${debts.length} tax year(s)` },
        { label: 'Total Balance', value: fmt(total) },
        {
          label: 'Years',
          value: debts.map((d) => d.taxYear).join(', '),
        },
      ]
    },
  },
  {
    id: 'assets',
    title: 'Assets',
    editPath: '/analysis/assets/bank-accounts',
    render: (a) => {
      const rows: { label: string; value: string }[] = []
      const bankTotal = ((a.bankAccounts as { balance: number }[]) ?? []).reduce(
        (s, b) => s + b.balance,
        0,
      )
      rows.push({ label: 'Bank Accounts', value: fmt(bankTotal) })
      const vehicleCount = ((a.vehicles as unknown[]) ?? []).length
      rows.push({ label: 'Vehicles', value: String(vehicleCount) })
      const realEstateCount = ((a.realEstate as unknown[]) ?? []).length
      rows.push({ label: 'Real Estate', value: String(realEstateCount) })
      return rows
    },
  },
  {
    id: 'incomeExpenses',
    title: 'Income & Expenses',
    editPath: '/analysis/income-expenses',
    render: (a) => [
      { label: 'Monthly Income', value: fmt(a.totalMonthlyIncome as number) },
      { label: 'Allowable Expenses', value: fmt(a.totalAllowableExpenses as number) },
      {
        label: 'MDI',
        value: fmt(a.monthlyDisposableIncome as number),
      },
    ],
  },
  {
    id: 'csed',
    title: 'CSED',
    editPath: '/analysis/csed-review',
    render: (a) => {
      const csed =
        (a.csedData as { taxYear: number; remainingMonths: number; isExpired: boolean }[]) ?? []
      if (csed.length === 0) return [{ label: 'CSED Data', value: 'Not reviewed' }]
      const earliest = csed
        .filter((c) => !c.isExpired)
        .sort((x, y) => x.remainingMonths - y.remainingMonths)[0]
      return [
        { label: 'Tax Periods Reviewed', value: String(csed.length) },
        {
          label: 'Earliest CSED',
          value: earliest ? `${earliest.remainingMonths} months remaining` : 'All expired',
        },
      ]
    },
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VerificationPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [confirmed, setConfirmed] = useState(false)

  function toggleSection(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Final Verification</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Review all the information you&apos;ve provided before we run your analysis. You can
            edit any section by clicking the Edit button.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = expanded[section.id] ?? false
            const items = section.render(answers as Record<string, unknown>)

            return (
              <div
                key={section.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden"
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    <span className="font-semibold text-white">{section.title}</span>
                  </div>

                  {/* Quick preview when collapsed */}
                  {!isOpen && items.length > 0 && (
                    <span className="text-xs text-zinc-500">{items[0].value}</span>
                  )}
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-zinc-800 px-5 py-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.label} className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">{item.label}</span>
                          <span className="text-sm font-medium text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => router.push(section.editPath)}
                      className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
            />
            <span className="text-sm leading-relaxed text-zinc-400">
              By proceeding, you confirm that the information provided is accurate to the best of
              your knowledge. The analysis is based on the data entered and IRS guidelines
              current as of the date shown. This is not legal or tax advice.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 pb-4">
          <button
            onClick={() => router.back()}
            className="flex-1 rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={() => router.push('/analysis/processing')}
            disabled={!confirmed}
            className={`flex-[2] rounded-xl py-4 text-base font-semibold transition-colors ${
              confirmed
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700'
                : 'cursor-not-allowed bg-zinc-800 text-zinc-600'
            }`}
          >
            Run Analysis
          </button>
        </div>
      </div>
    </div>
  )
}
