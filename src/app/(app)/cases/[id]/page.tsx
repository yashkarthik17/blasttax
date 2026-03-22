'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

type TabKey = 'timeline' | 'documents' | 'notes' | 'alerts'

const TABS: { key: TabKey; label: string; icon: string; badge?: number }[] = [
  { key: 'timeline', label: 'Timeline', icon: 'fa-timeline' },
  { key: 'documents', label: 'Documents', icon: 'fa-file-lines' },
  { key: 'notes', label: 'Notes', icon: 'fa-sticky-note' },
  { key: 'alerts', label: 'Alerts', icon: 'fa-bell', badge: 2 },
]

const TIMELINE_STEPS = [
  { label: 'Analysis Complete', date: 'Mar 3, 2026', status: 'complete' as const, icon: 'fa-check' },
  { label: 'Documents Prepared', date: 'Mar 8, 2026', status: 'complete' as const, icon: 'fa-check' },
  { label: 'OIC Submitted (Day 0)', date: 'Mar 12, 2026', status: 'complete' as const, icon: 'fa-check' },
  { label: 'Processability Review Passed', date: 'Mar 28', status: 'complete' as const, icon: 'fa-check' },
  { label: 'TC 480 Posted \u2014 CSED Now Tolled', date: 'Mar 28', status: 'complete' as const, icon: 'fa-check' },
  { label: 'Letter 3756 Received', date: 'Apr 5 (24-month clock started)', status: 'complete' as const, icon: 'fa-check' },
  { label: 'Routed to COIC (Brookhaven)', date: 'Apr 20', status: 'complete' as const, icon: 'fa-check' },
  { label: 'Examiner Assignment', date: 'Letter 4450 expected', status: 'current' as const, icon: 'fa-sync-alt' },
  { label: 'Investigation Phase', date: 'Mo 3-12', status: 'upcoming' as const, icon: 'fa-hourglass-half' },
  { label: 'Decision Expected', date: 'Mo 6-18', status: 'upcoming' as const, icon: 'fa-hourglass-half' },
  { label: 'Resolution', date: 'Pending', status: 'upcoming' as const, icon: 'fa-flag-checkered' },
]

export default function CaseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const caseId = params.id as string
  const [activeTab, setActiveTab] = useState<TabKey>('timeline')

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFF' }}>
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center' }}>
          <div
            onClick={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: '#FAFAFF',
              border: '1px solid #F0F0F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Case #{caseId}</div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: '#FAFAFF',
              border: '1px solid #F0F0F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <i className="fas fa-share-nodes" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
        </div>

        <div style={{ padding: '0 20px', paddingBottom: 0 }}>
          {/* Status Badge Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              background: '#ECFDF5',
              borderRadius: 14,
              border: '1px solid rgba(0,166,81,0.12)',
              marginBottom: 14,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00A651' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065F46' }}>Active</span>
            <span style={{ fontSize: '0.82rem', color: '#5C5C7A', fontWeight: 500 }}> &mdash; Offer in Compromise</span>
          </div>

          {/* Alert Banner */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ padding: '12px 14px', background: '#EFF4FF', borderRadius: 14, border: '1px solid rgba(37,99,235,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'rgba(37,99,235,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <i className="fas fa-clock" style={{ fontSize: 12, color: '#2563EB' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E40AF', marginBottom: 3 }}>Awaiting Examiner Assignment</div>
                  <div style={{ fontSize: '0.7rem', color: '#3B82F6', lineHeight: 1.4 }}>24-month deadline: Apr 2028</div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setActiveTab('timeline')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#1A1A2E',
                    color: 'white',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-timeline" style={{ fontSize: 9, marginRight: 4 }} /> View Timeline
                </button>
              </div>
            </div>
          </div>

          {/* Hero Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
            {/* Original Debt */}
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 10px', border: '1px solid #F0F0F5', textAlign: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Original Debt</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#8585A0', letterSpacing: '-0.01em' }}>$47,250</div>
            </div>
            {/* Offer Amount */}
            <div style={{ background: '#ECFDF5', borderRadius: 16, padding: '14px 10px', border: '1px solid rgba(0,166,81,0.15)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Offer Amount</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#00A651', letterSpacing: '-0.02em' }}>$8,500</div>
            </div>
            {/* Savings */}
            <div style={{ background: 'white', borderRadius: 16, padding: '14px 10px', border: '1px solid #F0F0F5', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Savings</div>
              <div style={{ display: 'inline-flex', padding: '4px 12px', background: '#00A651', borderRadius: 9999, fontSize: '1rem', fontWeight: 800, color: 'white' }}>82%</div>
            </div>
          </div>

          {/* Tab Bar */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 15,
              background: 'white',
              margin: '0 -20px',
              padding: '0 20px',
              borderBottom: '1px solid #D5D5E0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    position: 'relative',
                    padding: '10px 0',
                    fontSize: '0.78rem',
                    fontWeight: activeTab === tab.key ? 700 : 600,
                    color: activeTab === tab.key ? '#1A1A2E' : '#8585A0',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  <i className={`fas ${tab.icon}`} style={{ fontSize: 10, marginRight: 4 }} />
                  {tab.label}
                  {tab.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 8,
                        width: 16,
                        height: 16,
                        background: '#E63946',
                        borderRadius: '50%',
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #FAFAFF',
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {activeTab === tab.key && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2.5,
                        background: '#1A1A2E',
                        borderRadius: 9999,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ paddingTop: 16, paddingBottom: 32 }}>
            {activeTab === 'timeline' && (
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>OIC Lifecycle</div>
                <div style={{ background: 'white', borderRadius: 18, padding: '20px 16px', border: '1px solid #F0F0F5' }}>
                  {TIMELINE_STEPS.map((step, i) => (
                    <div key={step.label} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        {step.status === 'complete' ? (
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-check" style={{ fontSize: 10, color: 'white' }} />
                          </div>
                        ) : step.status === 'current' ? (
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className={`fas ${step.icon}`} style={{ fontSize: 9, color: 'white' }} />
                          </div>
                        ) : (
                          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#F0F0F5', border: '2px solid #D5D5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className={`fas ${step.icon}`} style={{ fontSize: 9, color: '#B0B0C8' }} />
                          </div>
                        )}
                        {i < TIMELINE_STEPS.length - 1 && (
                          <div
                            style={{
                              width: 2,
                              flex: 1,
                              margin: '3px 0',
                              minHeight: 16,
                              background:
                                step.status === 'complete'
                                  ? '#00A651'
                                  : step.status === 'current'
                                  ? 'linear-gradient(to bottom, #2563EB, #F0F0F5)'
                                  : '#D5D5E0',
                            }}
                          />
                        )}
                      </div>
                      <div style={{ paddingBottom: 14 }}>
                        <div
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: step.status === 'upcoming' ? 600 : 700,
                            color: step.status === 'current' ? '#2563EB' : step.status === 'complete' ? '#1A1A2E' : '#8585A0',
                          }}
                        >
                          {step.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.68rem',
                            marginTop: 1,
                            color: step.status === 'current' ? '#3B82F6' : step.status === 'upcoming' ? '#B0B0C8' : '#8585A0',
                            ...(step.status === 'current' ? { fontWeight: 500 } : {}),
                          }}
                        >
                          {step.date}
                        </div>
                        {step.status === 'current' && (
                          <div
                            style={{
                              marginTop: 5,
                              padding: '5px 9px',
                              background: '#EFF4FF',
                              borderRadius: 8,
                              fontSize: '0.65rem',
                              color: '#1A1A2E',
                              fontWeight: 600,
                              display: 'inline-block',
                            }}
                          >
                            <i className="fas fa-circle" style={{ fontSize: 5, marginRight: 3, color: '#2563EB', verticalAlign: 'middle' }} /> ACTIVE
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* During Review Card */}
                <div style={{ marginTop: 14, background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F0F0F5' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="fas fa-shield-halved" style={{ fontSize: 11, color: '#2563EB' }} /> During Review
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { emoji: '\u26A0\uFE0F', text: 'Stay current on all filings', color: '#5C5C7A' },
                      { emoji: '\u26A0\uFE0F', text: 'Continue periodic payments (not refunded if rejected)', color: '#5C5C7A' },
                      { emoji: '\u26A0\uFE0F', text: 'Respond to IRS requests within deadlines', color: '#5C5C7A' },
                      { emoji: '\u2713', text: 'No levy while TC 480 active', color: '#065F46', bold: true, emojiColor: '#00A651' },
                      { emoji: '\u26A0\uFE0F', text: 'Refunds will be offset (TC 826)', color: '#5C5C7A' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ fontSize: '0.72rem', flexShrink: 0, color: item.emojiColor }}>{item.emoji}</span>
                        <span style={{ fontSize: '0.72rem', color: item.color, lineHeight: 1.4, fontWeight: item.bold ? 600 : undefined }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 18, border: '1px solid #F0F0F5', background: 'white', padding: '64px 0', textAlign: 'center' }}>
                <div style={{ marginBottom: 12, width: 48, height: 48, borderRadius: 16, background: '#FAFAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-file-lines" style={{ fontSize: 20, color: '#B0B0C8' }} />
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#5C5C7A' }}>No documents yet</div>
                <div style={{ marginTop: 4, fontSize: '0.75rem', color: '#B0B0C8' }}>Upload tax documents and IRS notices here</div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 18, border: '1px solid #F0F0F5', background: 'white', padding: '64px 0', textAlign: 'center' }}>
                <div style={{ marginBottom: 12, width: 48, height: 48, borderRadius: 16, background: '#FAFAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-sticky-note" style={{ fontSize: 20, color: '#B0B0C8' }} />
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#5C5C7A' }}>No notes yet</div>
                <div style={{ marginTop: 4, fontSize: '0.75rem', color: '#B0B0C8' }}>Add notes to track important details</div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 18, border: '1px solid #F0F0F5', background: 'white', padding: '64px 0', textAlign: 'center' }}>
                <div style={{ marginBottom: 12, width: 48, height: 48, borderRadius: 16, background: '#FAFAFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-bell" style={{ fontSize: 20, color: '#B0B0C8' }} />
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#5C5C7A' }}>No new alerts</div>
                <div style={{ marginTop: 4, fontSize: '0.75rem', color: '#B0B0C8' }}>Case alerts will appear here</div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <Link
                href="/submission-tracker"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 16px',
                  background: '#1A1A2E',
                  borderRadius: 9999,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <i className="fas fa-location-arrow" style={{ fontSize: 12 }} /> Track Submission
              </Link>
              <button
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 16px',
                  background: 'white',
                  border: '1.5px solid #D5D5E0',
                  borderRadius: 9999,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#1A1A2E',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <i className="fas fa-headset" style={{ fontSize: 12, color: '#7C3AED' }} /> Contact Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
