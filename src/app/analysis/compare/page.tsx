'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const programLabels: Record<string, string> = {
  ShortTermPlan: 'Short-Term Plan',
  GuaranteedIA: 'Guaranteed IA',
  StreamlinedIA: 'Streamlined IA',
  ExpandedStreamlinedIA: 'Expanded Streamlined IA',
  NonStreamlinedIA: 'Non-Streamlined IA',
  RegularIA: 'Regular IA',
  PPIA: 'PPIA',
  OIC_DATC: 'OIC (DATC)',
  OIC_DATL: 'OIC (DATL)',
  OIC_ETA: 'OIC (ETA)',
  CNC: 'CNC',
  PenaltyAbatement_FTA: 'FTA Abatement',
  PenaltyAbatement_RC: 'RC Abatement',
  InnocentSpouse: 'Innocent Spouse',
}

interface CompareRow {
  label: string
  values: (string | undefined)[]
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ComparePage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    eligibility: {
      program: string
      eligible: boolean
      confidence: number
      advantages: string[]
      disadvantages: string[]
      monthlyPayment?: number
      totalPayment?: number
      termMonths?: number
    }[]
    totalDebt: number
  } | undefined

  const eligiblePrograms = useMemo(() => {
    if (!result?.eligibility) return []
    return result.eligibility.filter((p) => p.eligible).sort((a, b) => b.confidence - a.confidence)
  }, [result])

  const rows: CompareRow[] = useMemo(() => {
    if (eligiblePrograms.length === 0) return []

    return [
      {
        label: 'Monthly Payment',
        values: eligiblePrograms.map((p) =>
          p.monthlyPayment != null && p.monthlyPayment > 0 ? fmt(p.monthlyPayment) : 'N/A',
        ),
      },
      {
        label: 'Total Cost',
        values: eligiblePrograms.map((p) => {
          if (p.totalPayment != null && p.totalPayment > 0) return fmt(p.totalPayment)
          if (p.monthlyPayment && p.termMonths)
            return fmt(p.monthlyPayment * p.termMonths)
          return 'N/A'
        }),
      },
      {
        label: 'Term',
        values: eligiblePrograms.map((p) =>
          p.termMonths ? `${p.termMonths} months` : 'N/A',
        ),
      },
      {
        label: 'Confidence',
        values: eligiblePrograms.map((p) => `${p.confidence}%`),
      },
      {
        label: 'Complexity',
        values: eligiblePrograms.map((p) => {
          const prog = p.program
          if (prog === 'CNC' || prog === 'ShortTermPlan' || prog === 'GuaranteedIA')
            return 'Low'
          if (prog === 'StreamlinedIA' || prog.startsWith('PenaltyAbatement'))
            return 'Low-Medium'
          if (prog === 'ExpandedStreamlinedIA' || prog === 'NonStreamlinedIA')
            return 'Medium'
          if (prog.startsWith('OIC') || prog === 'PPIA' || prog === 'RegularIA')
            return 'High'
          return 'Medium'
        }),
      },
      {
        label: 'Timeline',
        values: eligiblePrograms.map((p) => {
          const prog = p.program
          if (prog === 'CNC') return '1-3 months'
          if (prog === 'ShortTermPlan') return '1-2 weeks'
          if (
            prog === 'GuaranteedIA' ||
            prog === 'StreamlinedIA' ||
            prog === 'ExpandedStreamlinedIA'
          )
            return '2-4 weeks'
          if (prog.startsWith('OIC')) return '6-24 months'
          if (prog.startsWith('PenaltyAbatement')) return '2-6 months'
          return '4-8 weeks'
        }),
      },
      {
        label: 'Pros',
        values: eligiblePrograms.map((p) =>
          p.advantages.length > 0 ? p.advantages.slice(0, 2).join('; ') : '--',
        ),
      },
      {
        label: 'Cons',
        values: eligiblePrograms.map((p) =>
          p.disadvantages.length > 0 ? p.disadvantages.slice(0, 2).join('; ') : '--',
        ),
      },
    ]
  }, [eligiblePrograms])

  if (!result || eligiblePrograms.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">No Eligible Options to Compare</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Run your analysis to see eligible resolution options.
          </p>
          <button
            onClick={() => router.push('/analysis/results')}
            className="mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            Back to Results
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        {/* Back link */}
        <button
          onClick={() => router.push('/analysis/results')}
          className="mb-6 flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Results
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Compare Options</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Side-by-side comparison of your {eligiblePrograms.length} eligible resolution
            options.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="sticky left-0 bg-zinc-900 px-4 py-3 text-xs uppercase tracking-wider text-zinc-500">
                  Criteria
                </th>
                {eligiblePrograms.map((p) => (
                  <th
                    key={p.program}
                    className="min-w-[160px] px-4 py-3 text-center"
                  >
                    <span className="text-sm font-semibold text-white">
                      {programLabels[p.program] ?? p.program}
                    </span>
                    <div className="mt-1">
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        {p.confidence}% match
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-zinc-800/50">
                  <td className="sticky left-0 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300">
                    {row.label}
                  </td>
                  {row.values.map((val, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      className="px-4 py-3 text-center text-sm text-zinc-400"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back button */}
        <div className="mt-8 pb-4">
          <button
            onClick={() => router.push('/analysis/results')}
            className="w-full rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back to Results
          </button>
        </div>
      </div>
    </div>
  )
}
