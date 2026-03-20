'use client'

import { useState, useMemo, useEffect } from 'react'
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
  OIC_DATC: 'Offer in Compromise',
  OIC_DATL: 'Offer in Compromise (DATL)',
  OIC_ETA: 'Offer in Compromise (ETA)',
  CNC: 'Currently Not Collectible',
  PenaltyAbatement_FTA: 'Penalty Abatement',
  PenaltyAbatement_RC: 'Penalty Abatement (Reasonable Cause)',
  InnocentSpouse: 'Innocent Spouse Relief',
}

function programDetailSlug(program: string): string {
  if (program.startsWith('OIC')) return 'oic'
  if (program === 'CNC') return 'cnc'
  if (program.startsWith('PenaltyAbatement')) return 'penalty'
  return 'ia'
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

  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
  const [animated, setAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setAnimated(true), 800) }, [])

  const sortedPrograms = useMemo(() => {
    if (!result?.eligibility) return []
    return [...result.eligibility].sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1
      return b.confidence - a.confidence
    }).filter(p => p.eligible).slice(0, 4)
  }, [result])

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <h1 className="text-2xl font-extrabold text-[#0A1628]">No Results Available</h1>
        <p className="mt-2 text-sm text-[#64748B]">Please complete the analysis first.</p>
        <button onClick={() => router.push('/analysis/verification')} className="mt-6 rounded-[14px] bg-[#00A651] px-8 py-3 text-sm font-semibold text-white hover:bg-[#008C44]">Go to Verification</button>
      </div>
    )
  }

  const savings = result.totalDebt - result.rcp.rcpLumpSum
  const savingsPct = Math.round((savings / result.totalDebt) * 100)

  function toggleDetails(idx: number) {
    setExpandedCards(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  function getConfidenceLabel(c: number) {
    if (c >= 80) return { label: 'High eligibility', color: '#00A651' }
    if (c >= 60) return { label: 'Medium', color: '#F59E0B' }
    return { label: 'Low', color: '#E63946' }
  }

  // CSED data from answers
  const csedData = (answers.csedData as { taxYear: number; remainingMonths: number; adjustedCSED: string; isExpired: boolean }[]) ?? []
  const earliest = csedData.filter(c => !c.isExpired).sort((a, b) => a.remainingMonths - b.remainingMonths)[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md px-5 pb-8">
        {/* Header */}
        <div className="pt-5 pb-4 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-[11px] font-bold tracking-wide text-[#2563EB]">
            <i className="fa-solid fa-wand-magic-sparkles text-[10px]" />
            Analysis Complete
          </div>
          <h1 className="text-[1.45rem] font-extrabold leading-tight tracking-tight text-[#0A1628]">
            Your Resolution Options
          </h1>
          <p className="mt-1.5 text-[12.5px] leading-snug text-[#94A3B8]">
            Based on your financial profile, here are your best paths forward
          </p>
        </div>

        {/* CSED Countdown */}
        {earliest && (
          <div className="mb-3.5 flex items-center gap-2 rounded-xl border border-[#E0E7FF] bg-[#F5F3FF] px-3.5 py-2.5">
            <i className="fa-solid fa-hourglass-half text-xs text-[#7C3AED]" />
            <div>
              <span className="text-[11px] font-bold text-[#0A1628]">Earliest debt expires: {earliest.adjustedCSED ? new Date(earliest.adjustedCSED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
              <span className="block text-[10px] text-[#64748B]">{earliest.remainingMonths} months remaining (Tax Year {earliest.taxYear})</span>
            </div>
          </div>
        )}

        {/* RCP Breakdown Card */}
        <div className="mb-3.5 rounded-[14px] border border-[#F1F5F9] bg-white px-4 py-3.5">
          <div className="mb-2 text-xs font-bold text-[#0A1628]">
            <i className="fa-solid fa-calculator mr-1 text-[10px] text-[#2563EB]" />
            Your Reasonable Collection Potential
          </div>
          <div className="flex items-center justify-between py-1.5 text-xs">
            <span className="text-[#64748B]">Net Realizable Equity (NRE)</span>
            <span className="font-bold text-[#0A1628]">{fmt(result.rcp.nre)}</span>
          </div>
          <div className="flex items-center justify-between py-1.5 text-xs">
            <span className="text-[#64748B]">Future Income (MDI x 12)</span>
            <span className="font-bold text-[#0A1628]">{fmt(result.rcp.futureIncomeLumpSum)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between border-t-2 border-[#F1F5F9] pt-2">
            <span className="text-xs font-bold text-[#0A1628]">Total RCP</span>
            <span className="text-base font-black text-[#2563EB]">{fmt(result.rcp.rcpLumpSum)}</span>
          </div>
          <div className="mt-1.5 text-[10px] text-[#64748B]">
            Minimum OIC Offer = {fmt(result.rcp.rcpLumpSum)} (your RCP). Application fee: $205 (separate).
          </div>
        </div>

        {/* Compare Link */}
        <div className="mb-3.5 text-center">
          <button onClick={() => router.push('/analysis/compare')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1628]">
            <i className="fa-solid fa-table-columns text-[11px]" />
            Compare All Options Side by Side
          </button>
        </div>

        {/* Resolution Cards */}
        {sortedPrograms.map((prog, idx) => {
          const isRecommended = idx === 0
          const conf = getConfidenceLabel(prog.confidence)
          const isExpanded = expandedCards[idx]

          return (
            <div key={prog.program} className={`mb-3.5 overflow-hidden rounded-[18px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${isRecommended ? 'border-2 border-[#2563EB] relative' : 'border border-[#F1F5F9]'}`}>
              {isRecommended && <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A1628] z-10" />}
              <div className="p-4.5">
                {/* Header row */}
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-extrabold ${isRecommended ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#64748B]'}`}>
                      {idx + 1}
                    </div>
                    {isRecommended && (
                      <span className="rounded-md bg-[#0A1628] px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.06em] text-white">Recommended</span>
                    )}
                  </div>
                  {isRecommended && savings > 0 && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2.5 py-0.5 text-[11px] font-bold text-[#00A651]">
                      <i className="fa-solid fa-arrow-down text-[9px]" />
                      Save {savingsPct}%
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className={`mb-2.5 font-extrabold text-[#0A1628] ${isRecommended ? 'text-base' : 'text-[15px]'}`}>
                  {programLabels[prog.program] ?? prog.program}
                </h3>

                {/* Payment amount */}
                {isRecommended && prog.totalPayment != null && prog.totalPayment > 0 && (
                  <>
                    <div className="mb-1.5 flex items-baseline gap-2.5">
                      <span className="text-[28px] font-black tracking-tight text-[#00A651]">{fmt(prog.totalPayment)}</span>
                      <span className="text-sm font-medium text-[#CBD5E1] line-through">{fmt(result.totalDebt)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-[#E6F9EE] px-2.5 py-1">
                        <i className="fa-solid fa-piggy-bank text-[11px] text-[#00A651]" />
                        <span className="text-xs font-bold text-[#065F46]">Save {fmt(savings)}</span>
                      </div>
                    )}
                    <p className="mb-3.5 text-[12.5px] leading-snug text-[#64748B]">
                      Lump sum: {fmt(prog.totalPayment)} or {prog.termMonths ? `${prog.termMonths} monthly payments of ${fmt(prog.totalPayment / prog.termMonths)}` : ''}
                    </p>
                  </>
                )}

                {!isRecommended && prog.monthlyPayment != null && prog.monthlyPayment > 0 && (
                  <div className="mb-1.5 flex items-baseline gap-1.5">
                    <span className="text-[22px] font-black tracking-tight text-[#2563EB]">{fmt(prog.monthlyPayment)}</span>
                    <span className="text-[13px] font-medium text-[#64748B]">/month{prog.termMonths ? ` for ${prog.termMonths} months` : ''}</span>
                  </div>
                )}

                {prog.program === 'CNC' && (
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-lg font-extrabold tracking-tight text-[#7C3AED]">Pause payments</span>
                  </div>
                )}

                {prog.program.startsWith('PenaltyAbatement') && prog.totalPayment != null && (
                  <div className="mb-1.5 flex items-baseline gap-1.5">
                    <span className="text-xs font-medium text-[#64748B]">Remove</span>
                    <span className="text-xl font-black tracking-tight text-[#00A651]">{fmt(prog.totalPayment)}</span>
                    <span className="text-xs font-medium text-[#64748B]">in penalties</span>
                  </div>
                )}

                {/* Advantages snippet */}
                {prog.advantages.length > 0 && !isRecommended && (
                  <p className="mb-1 text-xs leading-snug text-[#94A3B8]">
                    {prog.advantages[0]}
                  </p>
                )}

                {/* Confidence bar */}
                <div className="mt-2.5 flex items-center gap-2.5">
                  <span className="text-[11px] font-semibold" style={{ color: conf.color }}>{conf.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                    <div className="h-full rounded-full transition-all duration-[1500ms]" style={{ background: conf.color, width: animated ? `${prog.confidence}%` : '0%' }} />
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: conf.color }}>{prog.confidence}%</span>
                </div>

                {/* View details toggle */}
                <div className="mt-3">
                  <button onClick={() => toggleDetails(idx)} className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] transition-all hover:gap-1.5">
                    {isExpanded ? 'Hide details' : 'View details'}
                    <i className={`fa-solid fa-chevron-down text-[9px] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className="border-t border-[#F1F5F9] px-4.5 py-3.5">
                  <p className="text-xs leading-relaxed text-[#64748B]">
                    {prog.advantages.join('. ')}{prog.advantages.length > 0 ? '.' : ''}
                    {prog.reasons.length > 0 && ` ${prog.reasons.join('. ')}.`}
                  </p>
                  {prog.disadvantages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {prog.disadvantages.map((d) => (
                        <span key={d} className="rounded-md bg-[#F8FAFC] px-2 py-1 text-[10px] font-semibold text-[#64748B]">{d}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3.5">
                    <button
                      onClick={() => router.push(`/analysis/detail/${programDetailSlug(prog.program)}`)}
                      className="w-full rounded-xl bg-[#00A651] py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#008C44]"
                    >
                      <i className="fa-solid fa-arrow-right mr-1.5 text-[11px]" />
                      {prog.program.startsWith('OIC') ? 'Start OIC Application' : prog.program === 'CNC' ? 'Request CNC Status' : prog.program.startsWith('PenaltyAbatement') ? 'Start Penalty Review' : 'Set Up Payment Plan'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Do Nothing Card */}
        <div className="mb-3.5 rounded-[14px] border border-[#FEE2E2] bg-[#FEF2F2] px-4 py-3.5">
          <div className="mb-2 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-sm text-[#E63946]" />
            <span className="text-[13px] font-bold text-[#991B1B]">If You Take No Action</span>
          </div>
          <div className="text-xs leading-snug text-[#991B1B]">
            Full balance: <strong>{fmt(result.totalDebt)}</strong> + continued interest (~{fmt(result.totalDebt * 0.074)}/yr) + potential wage levies, bank levies, and federal tax lien filing. Total cost over 6 years could exceed <strong>{fmt(result.totalDebt * 1.44)}</strong>.
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-2 space-y-0">
          <button
            onClick={() => router.push('/analysis/plan')}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00A651] py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#008C44]"
          >
            <i className="fa-solid fa-check-circle" />
            Choose Resolution Now
          </button>
          <div className="py-2.5 text-center text-xs text-[#CBD5E1]">or</div>
          <button
            onClick={() => router.push('/cases')}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white py-3.5 text-sm font-semibold text-[#0A1628] transition-all hover:border-[#2563EB]"
          >
            <i className="fa-solid fa-bookmark" />
            Save as Case
          </button>
          <p className="mt-1.5 text-center text-[11px] text-[#94A3B8]">Decide later from your Cases</p>

          {/* Combined Approaches / Compatibility */}
          <div className="mt-3 flex gap-2.5">
            <button onClick={() => router.push('/analysis/strategic-plays')} className="flex flex-1 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F5F3FF] p-3 text-left">
              <i className="fa-solid fa-chess text-sm text-[#7C3AED]" />
              <div>
                <span className="block text-xs font-semibold text-[#0A1628]">Combined Approaches</span>
                <span className="text-[10px] text-[#6B7280]">Multi-strategy options</span>
              </div>
            </button>
            <button onClick={() => router.push('/analysis/compatibility')} className="flex flex-1 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#EFF4FF] p-3 text-left">
              <i className="fa-solid fa-table-cells text-sm text-[#0A1628]" />
              <div>
                <span className="block text-xs font-semibold text-[#0A1628]">Compatibility</span>
                <span className="text-[10px] text-[#6B7280]">What works together</span>
              </div>
            </button>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-4 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-[11px] text-[#94A3B8]" />
            <span className="text-[11.5px] leading-snug text-[#94A3B8]">
              Based on current IRS guidelines and your financial profile
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
