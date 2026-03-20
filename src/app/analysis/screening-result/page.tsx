'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface QuestionMeta {
  key: string
  yesLabel: string
  noLabel: string
  category: 'compliance' | 'urgency' | 'residency' | 'special'
  warnIfYes?: boolean
  warnIfNo?: boolean
  subNote?: string
}

const QUESTION_META: QuestionMeta[] = [
  { key: 'allReturnsFiled', yesLabel: 'All federal returns filed', noLabel: 'Unfiled federal returns', category: 'compliance', warnIfNo: true },
  { key: 'estimatedPaymentsCurrent', yesLabel: 'Current on estimated tax payments', noLabel: 'Behind on estimated payments', category: 'compliance', warnIfNo: true },
  { key: 'stateReturns', yesLabel: 'State tax return issues', noLabel: 'No state tax issues', category: 'compliance', warnIfYes: true },
  { key: 'hasNFTL', yesLabel: 'Notice of Federal Tax Lien filed', noLabel: 'No Federal Tax Lien', category: 'urgency', warnIfYes: true },
  { key: 'levyNotice', yesLabel: 'Levy notice received', noLabel: 'No levy notices', category: 'urgency', warnIfYes: true },
  { key: 'activeGarnishment', yesLabel: 'Active wage garnishment', noLabel: 'No wage garnishment', category: 'urgency', warnIfYes: true },
  { key: 'bankLevy', yesLabel: 'Bank levy issued', noLabel: 'No bank levy', category: 'urgency', warnIfYes: true },
  { key: 'hasActiveIA', yesLabel: 'Prior installment agreement', noLabel: 'No prior IA', category: 'urgency', warnIfYes: true },
  { key: 'oicPending', yesLabel: 'Prior OIC pending/rejected', noLabel: 'No prior OIC issues', category: 'urgency', warnIfYes: true },
  { key: 'usCitizen', yesLabel: 'US citizen or resident alien', noLabel: 'Not a US citizen or resident alien', category: 'residency', warnIfNo: true },
  { key: 'livingAbroad', yesLabel: 'Living outside the US', noLabel: 'Residing in the US', category: 'residency', warnIfYes: true },
  { key: 'inBankruptcy', yesLabel: 'Active bankruptcy', noLabel: 'Not in active bankruptcy', category: 'residency', warnIfYes: true },
  { key: 'auditOpen', yesLabel: 'Open audit', noLabel: 'No open audit', category: 'residency', warnIfYes: true },
  { key: 'hasPriorPenalties', yesLabel: 'IRS penalties charged', noLabel: 'No IRS penalties', category: 'special', warnIfYes: true },
  { key: 'cncStatus', yesLabel: 'In Currently Not Collectible status', noLabel: 'Not in CNC status', category: 'special' },
  { key: 'assetTransfers', yesLabel: 'Asset transfers in past 2 years', noLabel: 'No large asset transfers', category: 'special', warnIfYes: true },
]

const CATEGORIES = [
  { id: 'compliance' as const, label: 'Compliance', icon: 'fa-solid fa-file-lines', color: '#2563EB' },
  { id: 'urgency' as const, label: 'Urgency / Collection Status', icon: 'fa-solid fa-triangle-exclamation', color: '#E63946' },
  { id: 'residency' as const, label: 'Residency & Eligibility', icon: 'fa-solid fa-shield-halved', color: '#00A651' },
  { id: 'special' as const, label: 'Special Circumstances', icon: 'fa-solid fa-star', color: '#F59E0B' },
]

export default function ScreeningResultPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  const hasBankruptcy = answers.inBankruptcy === true
  const hasLevyOrLien = answers.hasNFTL === true || answers.levyNotice === true
  const hasCollectionActions = answers.activeGarnishment === true || answers.bankLevy === true

  let eligible = 13
  if (hasBankruptcy) eligible -= 3
  if (answers.allReturnsFiled === false) eligible -= 2
  if (answers.assetTransfers === true) eligible -= 1

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            marginTop: 4, height: 4, width: '100%', borderRadius: 9999,
            background: '#E2E8F0', overflow: 'hidden',
          }}>
            <div style={{ height: '100%', width: '30%', borderRadius: 9999, background: '#00A651' }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 20px 20px' }}>
          {/* Animated Checkmark */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: '#00A651',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              position: 'relative',
            }}>
              <i className="fa-solid fa-check" style={{ color: 'white', fontSize: 28 }} />
            </div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', margin: 0 }}>
              Screening Complete
            </h1>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
              Here&apos;s a summary of your answers
            </p>
          </div>

          {/* Conditional Banners */}
          <div style={{ marginTop: 16 }}>
            {hasBankruptcy && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '14px 16px', borderRadius: 12, marginBottom: 12,
                fontSize: 13, lineHeight: 1.45,
                background: '#FFF0F1', border: '1.5px solid #FECACA', color: '#991B1B',
              }}>
                <i className="fa-solid fa-gavel" style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Bankruptcy Detected</div>
                  <div style={{ fontSize: 12 }}>Active bankruptcy limits available resolution options. Consult with your tax professional before proceeding.</div>
                </div>
              </div>
            )}
            {hasLevyOrLien && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '14px 16px', borderRadius: 12, marginBottom: 12,
                fontSize: 13, lineHeight: 1.45,
                background: '#FEF3C7', border: '1.5px solid #FDE68A', color: '#92400E',
              }}>
                <i className="fa-solid fa-clock" style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>URGENT: Possible CDP Deadline</div>
                  <div style={{ fontSize: 12 }}>You may have a 30-day deadline to request a Collection Due Process (CDP) hearing. Act immediately.</div>
                </div>
              </div>
            )}
            {hasCollectionActions && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '14px 16px', borderRadius: 12, marginBottom: 12,
                fontSize: 13, lineHeight: 1.45,
                background: '#FEF3C7', border: '1.5px solid #FDE68A', color: '#92400E',
              }}>
                <i className="fa-solid fa-hand" style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Active Collection Actions</div>
                  <div style={{ fontSize: 12 }}>You have active garnishment or levy actions. Expedited resolution may be needed.</div>
                </div>
              </div>
            )}
          </div>

          {/* Result Categories */}
          {CATEGORIES.map((cat) => {
            const items = QUESTION_META.filter((q) => q.category === cat.id)
            const answeredCount = items.filter((q) => answers[q.key] !== undefined).length
            return (
              <div key={cat.id} style={{
                background: 'white', border: '1px solid #F1F5F9', borderRadius: 16,
                padding: 16, marginBottom: 12,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em', marginBottom: 6,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <i className={cat.icon} style={{ fontSize: 12, color: cat.color }} />
                  {cat.label} ({answeredCount} questions)
                </div>
                {items.map((q) => {
                  const val = answers[q.key]
                  const isYes = val === true
                  const isNo = val === false
                  const isWarning = (isYes && q.warnIfYes) || (isNo && q.warnIfNo)
                  const label = isYes ? q.yesLabel : q.noLabel
                  return (
                    <div
                      key={q.key}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '10px 0',
                        borderBottom: '1px solid #F1F5F9',
                      }}
                    >
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, flexShrink: 0, marginTop: 2,
                        background: isWarning ? '#FEF3C7' : '#E6F9EE',
                        color: isWarning ? '#F59E0B' : '#00A651',
                      }}>
                        <i className={isWarning ? 'fa-solid fa-exclamation' : 'fa-solid fa-check'} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#0A1628' }}>{label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}

          {/* Stat Highlight */}
          <div style={{
            marginTop: 8, textAlign: 'center', padding: 20,
            background: 'white', borderRadius: 16, border: '1px solid rgba(10,22,40,0.1)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#2563EB', letterSpacing: '-0.02em' }}>{eligible}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>of</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#2563EB', letterSpacing: '-0.02em' }}>13</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginTop: 4, display: 'block' }}>
              resolution types you may qualify for
            </span>
            <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, display: 'block' }}>
              Based on your screening answers
            </span>
          </div>

          {/* Spacer */}
          <div style={{ minHeight: 16 }} />

          {/* CTA */}
          <div style={{ padding: '8px 0 8px' }}>
            <button
              onClick={() => router.push('/analysis/penalty-screening')}
              style={{
                width: '100%', padding: '16px 28px', fontSize: 15, fontWeight: 700,
                background: '#00A651', color: 'white', border: 'none', borderRadius: 9999,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'inherit',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              Continue to Penalty Analysis
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>

          {/* Save & Come Back */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                width: '100%', padding: '14px 28px', fontSize: 14, fontWeight: 600,
                background: 'white', color: '#0A1628', border: '1.5px solid #E2E8F0',
                borderRadius: 9999, cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8, fontFamily: 'inherit',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <i className="fa-solid fa-bookmark" style={{ marginRight: 6 }} />
              Save & Come Back Later
            </button>
          </div>

          {/* Reassurance */}
          <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <i className="fa-solid fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Your screening results have been saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
