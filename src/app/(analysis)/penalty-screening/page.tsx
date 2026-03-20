'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface YearPenalty {
  taxYear: number
  balance: number
  penaltyAmount: number
  ftaEligible: boolean
}

const REASONABLE_CAUSES = [
  { id: 'illness', label: 'Serious illness or hospitalization' },
  { id: 'natural_disaster', label: 'Natural disaster (flood, fire, hurricane, etc.)' },
  { id: 'death_family', label: 'Death of an immediate family member' },
  { id: 'fire_casualty', label: 'Fire, casualty, or other property loss' },
  { id: 'records', label: 'Unable to obtain necessary records' },
  { id: 'irs_error', label: 'IRS error or incorrect advice' },
  { id: 'military', label: 'Military service / deployment' },
  { id: 'incarceration', label: 'Incarceration' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PenaltyScreeningPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  const taxDebts: { taxYear: number; balance: number; penaltyAmount: number }[] =
    answers.taxDebts ?? []

  // Build per-year penalty data
  const yearPenalties: YearPenalty[] = useMemo(() => {
    const yearsWithPenalties = new Set(
      taxDebts.filter((d) => d.penaltyAmount > 0).map((d) => d.taxYear),
    )

    return taxDebts
      .filter((d) => d.penaltyAmount > 0)
      .map((d) => {
        // FTA: no penalties of same type in prior 3 years
        const hasPrior = [1, 2, 3].some((offset) =>
          yearsWithPenalties.has(d.taxYear - offset),
        )
        return {
          taxYear: d.taxYear,
          balance: d.balance,
          penaltyAmount: d.penaltyAmount,
          ftaEligible: !hasPrior,
        }
      })
      .sort((a, b) => a.taxYear - b.taxYear)
  }, [taxDebts])

  // FTA question
  const [noPriorPenalties, setNoPriorPenalties] = useState<boolean | null>(
    answers.noPriorPenaltiesConfirmed ?? null,
  )

  // Reasonable cause checkboxes
  const [reasonableCauses, setReasonableCauses] = useState<Set<string>>(
    new Set((answers.reasonableCauses as string[]) ?? []),
  )

  // Penalty types to request abatement for
  const [penaltyTypes, setPenaltyTypes] = useState<Set<string>>(
    new Set((answers.penaltyAbatementTypes as string[]) ?? []),
  )

  function toggleCause(id: string) {
    setReasonableCauses((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function togglePenaltyType(type: string) {
    setPenaltyTypes((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  const totalPenalties = yearPenalties.reduce((s, p) => s + p.penaltyAmount, 0)
  const anyFTAEligible = yearPenalties.some((p) => p.ftaEligible)

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  function handleContinue() {
    setAnswers({
      noPriorPenaltiesConfirmed: noPriorPenalties,
      reasonableCauses: Array.from(reasonableCauses),
      penaltyAbatementTypes: Array.from(penaltyTypes),
      penaltyScreeningComplete: true,
    })
    router.push('/analysis/verification')
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Penalty Screening</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            We&apos;ve identified penalties on your account. Let&apos;s determine if you qualify
            for penalty abatement through First-Time Abatement or reasonable cause.
          </p>
        </div>

        {/* ── Per-Year Penalty Breakdown ── */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-lg font-bold text-white">Penalty Breakdown</h2>

          {yearPenalties.length === 0 ? (
            <p className="text-sm text-zinc-400">No penalty amounts found in your tax debts.</p>
          ) : (
            <>
              <div className="space-y-2">
                {yearPenalties.map((yp) => (
                  <div
                    key={yp.taxYear}
                    className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3"
                  >
                    <div>
                      <span className="font-medium text-white">Tax Year {yp.taxYear}</span>
                      {yp.ftaEligible && (
                        <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                          FTA Eligible
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-red-400">{fmt(yp.penaltyAmount)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
                <span className="font-medium text-zinc-300">Total Penalties</span>
                <span className="text-lg font-bold text-red-400">{fmt(totalPenalties)}</span>
              </div>
            </>
          )}
        </div>

        {/* ── FTA Eligibility Check ── */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-lg font-bold text-white">First-Time Abatement (FTA)</h2>
          <p className="mb-4 text-sm text-zinc-400">
            The IRS may waive penalties if you had no penalties of the same type in the prior 3
            tax years and have filed all required returns.
          </p>

          {anyFTAEligible && (
            <div className="mb-4 flex items-start gap-3 rounded-lg bg-emerald-500/5 p-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-sm text-emerald-300">
                Based on your data, one or more tax years appear eligible for FTA.
              </p>
            </div>
          )}

          <div className="rounded-lg border border-zinc-700 p-4">
            <p className="mb-3 text-sm font-medium text-zinc-300">
              Can you confirm: No penalties of the same type in the prior 3 tax years?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setNoPriorPenalties(true)}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  noPriorPenalties === true
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                Yes, no prior penalties
              </button>
              <button
                onClick={() => setNoPriorPenalties(false)}
                className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  noPriorPenalties === false
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                No, I had penalties
              </button>
            </div>
          </div>
        </div>

        {/* ── Reasonable Cause Assessment ── */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-lg font-bold text-white">Reasonable Cause Assessment</h2>
          <p className="mb-4 text-sm text-zinc-400">
            If FTA does not apply, you may be able to get penalties removed by demonstrating
            reasonable cause. Select any that apply to your situation.
          </p>

          <div className="space-y-2">
            {REASONABLE_CAUSES.map((cause) => (
              <label
                key={cause.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700/50 p-3 transition-colors hover:bg-zinc-800/50"
              >
                <input
                  type="checkbox"
                  checked={reasonableCauses.has(cause.id)}
                  onChange={() => toggleCause(cause.id)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-sm text-zinc-300">{cause.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Penalty Type Selection ── */}
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-3 text-lg font-bold text-white">Penalty Types to Abate</h2>
          <p className="mb-4 text-sm text-zinc-400">
            Select which penalty type(s) you want to request abatement for.
          </p>

          <div className="space-y-2">
            {[
              { id: 'FTF', label: 'Failure to File (FTF)', desc: 'Penalty for filing late' },
              { id: 'FTP', label: 'Failure to Pay (FTP)', desc: 'Penalty for paying late' },
              { id: 'Both', label: 'Both FTF and FTP', desc: 'Request abatement for both penalty types' },
            ].map((pt) => (
              <label
                key={pt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  penaltyTypes.has(pt.id)
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-zinc-700/50 hover:bg-zinc-800/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={penaltyTypes.has(pt.id)}
                  onChange={() => togglePenaltyType(pt.id)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <div>
                  <span className="text-sm font-medium text-white">{pt.label}</span>
                  <p className="text-xs text-zinc-500">{pt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => router.back()}
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
