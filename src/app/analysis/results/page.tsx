'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const programLabels: Record<string, string> = {
  ShortTermPlan: 'Short-Term Payment Plan',
  GuaranteedIA: 'Guaranteed Installment Agreement',
  StreamlinedIA: 'Streamlined Installment Agreement',
  ExpandedStreamlinedIA: 'Expanded Streamlined IA',
  NonStreamlinedIA: 'Non-Streamlined IA',
  RegularIA: 'Regular Installment Agreement',
  PPIA: 'Partial Pay Installment Agreement',
  OIC_DATC: 'Offer in Compromise (DATC)',
  OIC_DATL: 'Offer in Compromise (DATL)',
  OIC_ETA: 'Offer in Compromise (ETA)',
  CNC: 'Currently Not Collectible',
  PenaltyAbatement_FTA: 'Penalty Abatement (FTA)',
  PenaltyAbatement_RC: 'Penalty Abatement (Reasonable Cause)',
  InnocentSpouse: 'Innocent Spouse Relief',
}

function programDetailSlug(program: string): string {
  if (program.startsWith('OIC')) return 'oic'
  if (program === 'CNC') return 'cnc'
  if (program.startsWith('PenaltyAbatement')) return 'penalty'
  return 'ia'
}

function eligibilityBadge(eligible: boolean, confidence: number) {
  if (eligible && confidence >= 80) {
    return (
      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
        Eligible
      </span>
    )
  }
  if (eligible) {
    return (
      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400">
        May Qualify
      </span>
    )
  }
  return (
    <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-400">
      Not Eligible
    </span>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ResultsPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    nre: { totalNRE: number }
    mdi: { totalIncome: number; totalAllowableExpenses: number; mdi: number }
    rcp: { nre: number; futureIncomeLumpSum: number; futureIncomePeriodic: number; rcpLumpSum: number; rcpPeriodic: number }
    eligibility: { program: string; eligible: boolean; confidence: number; reasons: string[]; advantages: string[]; disadvantages: string[]; monthlyPayment?: number; totalPayment?: number; termMonths?: number }[]
    isLowIncome: boolean
    totalDebt: number
  } | undefined

  const [rcpView, setRCPView] = useState<'lumpSum' | 'periodic'>('lumpSum')

  // Sort eligibility by: eligible first, then by confidence desc
  const sortedPrograms = useMemo(() => {
    if (!result?.eligibility) return []
    return [...result.eligibility].sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1
      return b.confidence - a.confidence
    })
  }, [result])

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">No Results Available</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Please complete the analysis first.
          </p>
          <button
            onClick={() => router.push('/analysis/verification')}
            className="mt-6 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Go to Verification
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Your Resolution Options
          </h1>
          <p className="mt-2 text-base text-zinc-400">
            Total Tax Debt:{' '}
            <span className="font-bold text-white">{fmt(result.totalDebt)}</span>
          </p>
        </div>

        {/* ── RCP Breakdown Card ── */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">RCP Breakdown</h2>
            <div className="flex rounded-lg bg-zinc-800 p-0.5">
              <button
                onClick={() => setRCPView('lumpSum')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  rcpView === 'lumpSum'
                    ? 'bg-emerald-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Lump Sum
              </button>
              <button
                onClick={() => setRCPView('periodic')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  rcpView === 'periodic'
                    ? 'bg-emerald-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Periodic
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Net Realizable Equity (NRE)</span>
              <span className="text-white">{fmt(result.rcp.nre)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">
                Future Income ({rcpView === 'lumpSum' ? '12 mo' : '24 mo'})
              </span>
              <span className="text-white">
                {fmt(
                  rcpView === 'lumpSum'
                    ? result.rcp.futureIncomeLumpSum
                    : result.rcp.futureIncomePeriodic,
                )}
              </span>
            </div>
            <div className="border-t border-zinc-800 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Total RCP</span>
                <span className="text-lg font-bold text-emerald-400">
                  {fmt(
                    rcpView === 'lumpSum'
                      ? result.rcp.rcpLumpSum
                      : result.rcp.rcpPeriodic,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MDI Card ── */}
        <div
          className={`mb-6 rounded-xl border p-5 ${
            result.mdi.mdi > 0
              ? 'border-zinc-800 bg-zinc-900'
              : 'border-red-500/30 bg-red-500/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Monthly Disposable Income</span>
            <span
              className={`text-xl font-bold ${
                result.mdi.mdi > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {fmt(result.mdi.mdi)}
            </span>
          </div>
        </div>

        {/* ── Low-Income Certification ── */}
        {result.isLowIncome && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-400">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div>
              <p className="text-sm font-medium text-emerald-300">
                Low-Income Certification
              </p>
              <p className="text-xs text-emerald-400/70">
                You qualify for reduced OIC fees and waived initial payment requirements.
              </p>
            </div>
          </div>
        )}

        {/* ── Resolution Cards ── */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-white">Resolution Programs</h2>
          <div className="space-y-3">
            {sortedPrograms.map((prog) => (
              <div
                key={prog.program}
                className={`rounded-xl border p-5 transition-colors ${
                  prog.eligible
                    ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
                    : 'border-zinc-800/50 bg-zinc-900/50 opacity-60'
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {programLabels[prog.program] ?? prog.program}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      {eligibilityBadge(prog.eligible, prog.confidence)}
                      <span className="text-xs text-zinc-500">
                        {prog.confidence}% confidence
                      </span>
                    </div>
                  </div>

                  {/* Payment info */}
                  {prog.eligible && prog.monthlyPayment != null && prog.monthlyPayment > 0 && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {fmt(prog.monthlyPayment)}
                      </p>
                      <p className="text-xs text-zinc-500">/month</p>
                    </div>
                  )}
                  {prog.eligible && prog.totalPayment != null && prog.totalPayment > 0 && prog.program.startsWith('OIC') && (
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {fmt(prog.totalPayment)}
                      </p>
                      <p className="text-xs text-zinc-500">settlement</p>
                    </div>
                  )}
                </div>

                {/* Advantages */}
                {prog.eligible && prog.advantages.length > 0 && (
                  <ul className="mb-3 space-y-1">
                    {prog.advantages.slice(0, 3).map((adv) => (
                      <li key={adv} className="flex items-start gap-2 text-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-400">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-zinc-400">{adv}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {prog.eligible && (
                  <button
                    onClick={() =>
                      router.push(`/analysis/detail/${programDetailSlug(prog.program)}`)
                    }
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    View Details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="space-y-3 pb-8">
          <button
            onClick={() => router.push('/analysis/compare')}
            className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
          >
            Compare Options
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/analysis/strategic-plays')}
              className="rounded-xl border border-zinc-700 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Strategic Plays
            </button>
            <button
              onClick={() => router.push('/analysis/methodology')}
              className="rounded-xl border border-zinc-700 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            >
              How We Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
