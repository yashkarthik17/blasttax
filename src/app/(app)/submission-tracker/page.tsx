'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  { question: 'Will the IRS contact me directly?', answer: 'The IRS may request additional information through your representative. We\'ll handle all communications and notify you if action is needed.' },
  { question: 'Do I need to make payments?', answer: 'For a lump sum OIC, no additional payments are due during review. Your 20% initial payment was included with the submission.' },
  { question: 'What if my offer is rejected?', answer: 'You have 30 days to appeal. We\'ll guide you through alternative options including a revised offer or installment agreement.' },
]

const milestones = [
  { label: 'Submitted', date: 'Mar 12, 2026', status: 'complete' as const, badge: null },
  { label: 'Processability Check', date: 'Mar 18, 2026', status: 'complete' as const, badge: 'Letter 3756 received' },
  { label: 'Assigned to Examiner', date: null, status: 'current' as const, badge: null },
  { label: 'Financial Review', date: null, status: 'upcoming' as const, badge: null },
  { label: 'Decision', date: 'Expected ~Sep 2026', status: 'upcoming' as const, badge: null },
]

export default function SubmissionTrackerPage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Submission Tracker</div>
          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '0 20px 20px' }}>
          {/* Animated Progress Circle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ position: 'relative', width: 180, height: 180 }}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle cx="90" cy="90" r="75" fill="none" stroke="#F0F0F5" strokeWidth="10" />
                {/* Progress arc */}
                <circle
                  cx="90" cy="90" r="75"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="282.74"
                  strokeDashoffset="113.1"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A1A2E" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center text */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Step</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1A1A2E', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  3 <span style={{ fontSize: '1rem', fontWeight: 600, color: '#B0B0C8' }}>of 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Card */}
          <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid rgba(0,61,165,0.1)', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                background: 'white',
                borderRadius: 9999,
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#1A1A2E',
                marginBottom: 10,
              }}
            >
              <i className="fas fa-sync-alt" style={{ fontSize: 10 }} /> Under IRS Review
            </div>
            <div style={{ fontSize: '0.82rem', color: '#5C5C7A', lineHeight: 1.6, marginTop: 6 }}>
              Your Offer in Compromise has been assigned to an IRS examiner who is reviewing your financial information.
            </div>
            <div
              style={{
                marginTop: 12,
                padding: '8px 14px',
                background: 'rgba(245,166,35,0.08)',
                border: '1px solid rgba(245,166,35,0.15)',
                borderRadius: 10,
                fontSize: '0.75rem',
                color: '#92400E',
                fontWeight: 500,
              }}
            >
              <i className="fas fa-clock" style={{ fontSize: 10, marginRight: 4 }} />
              Processing typically takes 6-12 months for OIC
            </div>
          </div>

          {/* Milestone List */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Milestones</div>
            <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F0F0F5' }}>
              {milestones.map((m, i) => (
                <div key={m.label} style={{ display: 'flex', gap: 14, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    {m.status === 'complete' ? (
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-check" style={{ fontSize: 10, color: 'white' }} />
                      </div>
                    ) : m.status === 'current' ? (
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                      </div>
                    ) : (
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FAFAFF', border: '2px solid #D5D5E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D5D5E0' }} />
                      </div>
                    )}
                    {i < milestones.length - 1 && (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          margin: '4px 0',
                          minHeight: 16,
                          background:
                            m.status === 'complete'
                              ? '#00A651'
                              : m.status === 'current'
                              ? 'linear-gradient(to bottom, #2563EB, #F0F0F5)'
                              : '#D5D5E0',
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingBottom: 18 }}>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: m.status === 'current' ? '#2563EB' : m.status === 'complete' ? '#1A1A2E' : '#8585A0',
                      }}
                    >
                      {m.label}
                    </div>
                    {m.status === 'current' ? (
                      <div style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 500, marginTop: 2 }}>Current</div>
                    ) : m.date ? (
                      <div style={{ fontSize: '0.7rem', color: '#8585A0', marginTop: 2 }}>{m.date}</div>
                    ) : m.status === 'upcoming' ? (
                      <div style={{ fontSize: '0.7rem', color: '#B0B0C8', marginTop: 2 }}>Upcoming</div>
                    ) : null}
                    {m.badge && (
                      <div
                        style={{
                          marginTop: 4,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '3px 8px',
                          background: '#E6F9EE',
                          borderRadius: 6,
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          color: '#065F46',
                        }}
                      >
                        <i className="fas fa-envelope" style={{ fontSize: 8 }} /> {m.badge}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpful Info Card (FAQ) */}
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #F0F0F5', overflow: 'hidden' }}>
            <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F0F0F5' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-lightbulb" style={{ fontSize: 14, color: '#1A1A2E' }} />
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E' }}>What to expect during review</div>
            </div>

            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: i < faqs.length - 1 ? '1px solid #F0F0F5' : 'none',
                    background: 'none',
                    border: 'none',
                    borderBottomWidth: i < faqs.length - 1 ? 1 : 0,
                    borderBottomStyle: 'solid',
                    borderBottomColor: '#F0F0F5',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5C5C7A' }}>{faq.question}</span>
                  <i
                    className="fas fa-chevron-down"
                    style={{
                      fontSize: 10,
                      color: '#B0B0C8',
                      flexShrink: 0,
                      transition: 'transform 0.3s ease',
                      transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: openFaq === i ? 200 : 0,
                    padding: openFaq === i ? '0 16px 14px' : '0 16px',
                    transition: 'max-height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), padding 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#8585A0', lineHeight: 1.6 }}>{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Expert Button */}
          <div
            style={{
              padding: 16,
              background: '#1A1A2E',
              borderRadius: 9999,
              textAlign: 'center',
              color: 'white',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
          >
            <i className="fas fa-headset" style={{ marginRight: 8 }} /> Contact Your Expert
          </div>
        </div>
      </div>
    </div>
  )
}
