'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

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

  const csedData = (answers.csedData as { taxYear: number; remainingMonths: number; adjustedCSED: string; isExpired: boolean }[]) ?? []
  const earliest = csedData.filter(c => !c.isExpired).sort((a, b) => a.remainingMonths - b.remainingMonths)[0]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0 16px', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#EFF4FF', padding: '4px 12px', borderRadius: 9999, marginBottom: 12, letterSpacing: '0.02em' }}>
            <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: 10 }} />
            Analysis Complete
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0 }}>
            Your Resolution Options
          </h1>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: 6, lineHeight: 1.4 }}>
            Based on your financial profile, here are your best paths forward
          </p>
        </div>

        {/* CSED Countdown */}
        {earliest && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#F5F3FF', border: '1px solid #E0E7FF', borderRadius: 12, marginBottom: 14 }}>
            <i className="fa-solid fa-hourglass-half" style={{ fontSize: 12, color: '#7C3AED' }} />
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#0A1628' }}>Earliest debt expires: {earliest.adjustedCSED ? new Date(earliest.adjustedCSED).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
              <span style={{ fontSize: 10, color: '#64748B', display: 'block' }}>{earliest.remainingMonths} months remaining (Tax Year {earliest.taxYear})</span>
            </div>
          </div>
        )}

        {/* RCP Breakdown Card */}
        <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>
            <i className="fa-solid fa-calculator" style={{ fontSize: 10, color: '#2563EB', marginRight: 4 }} />
            Your Reasonable Collection Potential
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
            <span style={{ color: '#64748B' }}>Net Realizable Equity (NRE)</span>
            <span style={{ fontWeight: 700, color: '#0A1628' }}>{fmt(result.rcp.nre)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
            <span style={{ color: '#64748B' }}>Future Income (MDI x 12)</span>
            <span style={{ fontWeight: 700, color: '#0A1628' }}>{fmt(result.rcp.futureIncomeLumpSum)}</span>
          </div>
          <div style={{ borderTop: '2px solid #F1F5F9', marginTop: 4, paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#0A1628', fontSize: 12 }}>Total RCP</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: '#2563EB' }}>{fmt(result.rcp.rcpLumpSum)}</span>
          </div>
          <div style={{ fontSize: 10, color: '#64748B', marginTop: 6 }}>
            Minimum OIC Offer = {fmt(result.rcp.rcpLumpSum)} (your RCP). Application fee: $205 (separate).
          </div>
        </div>

        {/* Compare Link */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <button onClick={() => router.push('/analysis/compare')} style={{ fontSize: 12, fontWeight: 600, color: '#0A1628', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <i className="fa-solid fa-table-columns" style={{ fontSize: 11 }} />
            Compare All Options Side by Side
          </button>
        </div>

        {/* Resolution Cards */}
        <div className="md:grid md:grid-cols-2 md:gap-3.5">
          {sortedPrograms.map((prog, idx) => {
            const isRecommended = idx === 0
            const conf = getConfidenceLabel(prog.confidence)
            const isExpanded = expandedCards[idx]

            return (
              <div key={prog.program} style={{
                background: 'white',
                border: isRecommended ? '2px solid #2563EB' : '1px solid #F1F5F9',
                borderRadius: 18,
                padding: 0,
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                marginBottom: 14,
                overflow: 'hidden',
                position: 'relative',
              }}>
                {isRecommended && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#0A1628', zIndex: 1 }} />}
                <div style={{ padding: 18, position: 'relative' }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, flexShrink: 0,
                        background: isRecommended ? '#2563EB' : '#F8FAFC',
                        color: isRecommended ? 'white' : '#64748B',
                      }}>
                        {idx + 1}
                      </div>
                      {isRecommended && (
                        <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'white', background: '#0A1628', padding: '3px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Recommended</span>
                      )}
                    </div>
                    {isRecommended && savings > 0 && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', background: '#E6F9EE', color: '#00A651', borderRadius: 9999, fontSize: 11, fontWeight: 700 }}>
                        <i className="fa-solid fa-arrow-down" style={{ fontSize: 9 }} />
                        Save {savingsPct}%
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: isRecommended ? 16 : 15, fontWeight: isRecommended ? 800 : 700, color: '#0A1628', marginBottom: 10 }}>
                    {programLabels[prog.program] ?? prog.program}
                  </h3>

                  {/* Payment amount */}
                  {isRecommended && prog.totalPayment != null && prog.totalPayment > 0 && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 28, fontWeight: 900, color: '#00A651', letterSpacing: '-0.02em' }}>{fmt(prog.totalPayment)}</span>
                        <span style={{ fontSize: 14, color: '#CBD5E1', textDecoration: 'line-through', fontWeight: 500 }}>{fmt(result.totalDebt)}</span>
                      </div>
                      {savings > 0 && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#E6F9EE', borderRadius: 8, marginBottom: 12 }}>
                          <i className="fa-solid fa-piggy-bank" style={{ fontSize: 11, color: '#00A651' }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>Save {fmt(savings)}</span>
                        </div>
                      )}
                      <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.45, marginBottom: 14 }}>
                        Lump sum: {fmt(prog.totalPayment)} or {prog.termMonths ? `${prog.termMonths} monthly payments of ${fmt(Math.ceil(prog.totalPayment / prog.termMonths))}` : ''}
                      </p>
                    </>
                  )}

                  {!isRecommended && prog.monthlyPayment != null && prog.monthlyPayment > 0 && prog.program !== 'CNC' && !prog.program.startsWith('PenaltyAbatement') && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#2563EB', letterSpacing: '-0.01em' }}>{fmt(prog.monthlyPayment)}</span>
                        <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>/month{prog.termMonths ? ` for ${prog.termMonths} months` : ''}</span>
                      </div>
                      {prog.advantages.length > 0 && (
                        <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12, lineHeight: 1.4 }}>{prog.advantages[0]}</p>
                      )}
                    </>
                  )}

                  {prog.program === 'CNC' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#7C3AED', letterSpacing: '-0.01em' }}>Pause payments</span>
                      </div>
                      {prog.advantages.length > 0 && (
                        <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4, lineHeight: 1.4 }}>{prog.advantages[0]}</p>
                      )}
                    </>
                  )}

                  {prog.program.startsWith('PenaltyAbatement') && prog.totalPayment != null && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Remove</span>
                        <span style={{ fontSize: 20, fontWeight: 900, color: '#00A651', letterSpacing: '-0.01em' }}>{fmt(prog.totalPayment)}</span>
                        <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>in penalties</span>
                      </div>
                      {prog.advantages.length > 0 && (
                        <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4, lineHeight: 1.4 }}>{prog.advantages[0]}</p>
                      )}
                    </>
                  )}

                  {/* Confidence bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: isRecommended ? 0 : 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: conf.color }}>{conf.label}</span>
                    <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden', flex: 1 }}>
                      <div style={{ height: '100%', borderRadius: 3, background: conf.color, transition: 'width 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)', width: animated ? `${prog.confidence}%` : '0%' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: conf.color }}>{prog.confidence}%</span>
                  </div>

                  {/* View details toggle */}
                  <div style={{ marginTop: 12 }}>
                    <button onClick={() => toggleDetails(idx)} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {isExpanded ? 'Hide details' : 'View details'} <i className={`fa-solid fa-chevron-down`} style={{ fontSize: 9, transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                  </div>
                </div>

                {/* Expandable details */}
                {isExpanded && (
                  <div style={{ display: 'block', padding: '0 18px 16px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ paddingTop: 14 }}>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
                        {prog.advantages.join('. ')}{prog.advantages.length > 0 ? '.' : ''}
                        {prog.reasons.length > 0 && ` ${prog.reasons.join('. ')}.`}
                      </p>
                      {prog.disadvantages.length > 0 && (
                        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {prog.disadvantages.map(d => (
                            <span key={d} style={{ fontSize: 10, fontWeight: 600, padding: '4px 8px', background: '#F8FAFC', borderRadius: 6, color: '#64748B' }}>{d}</span>
                          ))}
                        </div>
                      )}
                      <div style={{ marginTop: 14 }}>
                        <button
                          onClick={() => router.push(`/analysis/detail/${programDetailSlug(prog.program)}`)}
                          style={{ width: '100%', padding: '12px 20px', borderRadius: 12, background: '#00A651', color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-arrow-right" style={{ fontSize: 11, marginRight: 6 }} />
                          {prog.program.startsWith('OIC') ? 'Start OIC Application' : prog.program === 'CNC' ? 'Request CNC Status' : prog.program.startsWith('PenaltyAbatement') ? 'Start Penalty Review' : 'Set Up Payment Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Do Nothing Card */}
        <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 14, color: '#E63946' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#991B1B' }}>If You Take No Action</span>
          </div>
          <div style={{ fontSize: 12, color: '#991B1B', lineHeight: 1.5 }}>
            Full balance: <strong>{fmt(result.totalDebt)}</strong> + continued interest (~{fmt(Math.round(result.totalDebt * 0.074))}/yr) + potential wage levies, bank levies, and federal tax lien filing. Total cost over 6 years could exceed <strong>{fmt(Math.round(result.totalDebt * 1.44))}</strong>.
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <button
            onClick={() => router.push('/analysis/plan')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 14, background: '#00A651', padding: '16px 28px', color: 'white', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            <i className="fa-solid fa-check-circle" style={{ marginRight: 6 }} />Choose Resolution Now
          </button>
          <div style={{ textAlign: 'center', color: '#CBD5E1', fontSize: 12, margin: '10px 0' }}>or</div>
          <button
            onClick={() => router.push('/cases')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: 14, border: '1.5px solid #E2E8F0', background: 'white', padding: '14px 28px', color: '#0A1628', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            <i className="fa-solid fa-bookmark" style={{ marginRight: 6 }} />Save as Case
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 6 }}>Decide later from your Cases</p>

          {/* Combined Approaches / Compatibility */}
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button onClick={() => router.push('/analysis/strategic-plays')} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: '#F5F3FF', borderRadius: 12, textDecoration: 'none', border: '1px solid #E2E8F0', cursor: 'pointer', textAlign: 'left' }}>
              <i className="fa-solid fa-chess" style={{ fontSize: 14, color: '#7C3AED' }} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0A1628', display: 'block' }}>Combined Approaches</span>
                <span style={{ fontSize: 10, color: '#6B7280' }}>Multi-strategy options</span>
              </div>
            </button>
            <button onClick={() => router.push('/analysis/compatibility-matrix')} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: '#EFF4FF', borderRadius: 12, textDecoration: 'none', border: '1px solid #E2E8F0', cursor: 'pointer', textAlign: 'left' }}>
              <i className="fa-solid fa-table-cells" style={{ fontSize: 14, color: '#0A1628' }} />
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0A1628', display: 'block' }}>Compatibility</span>
                <span style={{ fontSize: 10, color: '#6B7280' }}>What works together</span>
              </div>
            </button>
          </div>
        </div>

        {/* Reassurance */}
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <i className="fa-solid fa-shield-halved" style={{ fontSize: 11, color: '#94A3B8' }} />
            <span style={{ fontSize: '11.5px', color: '#94A3B8', lineHeight: 1.4 }}>
              Based on current IRS guidelines and your financial profile
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
