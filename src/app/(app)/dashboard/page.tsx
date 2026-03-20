'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [name, setName] = useState('')
  const [mounted, setMounted] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('blasttax_onboarding')
      if (stored) {
        const data = JSON.parse(stored)
        setName(data.firstName || '')
      }
    } catch {
      // ignore
    }
  }, [])

  // Animated counter
  useEffect(() => {
    if (!mounted || !counterRef.current) return
    const el = counterRef.current
    const target = 47250
    const duration = 1800
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(target * eased)
      el.textContent = '$' + current.toLocaleString()
      if (progress < 1) requestAnimationFrame(update)
    }

    const timer = setTimeout(() => requestAnimationFrame(update), 600)
    return () => clearTimeout(timer)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2" style={{ borderColor: '#0A1628', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl" style={{ padding: '0 20px 24px' }}>
        <div className="flex flex-col" style={{ gap: 20 }}>

          {/* Header */}
          <div className="flex items-center justify-between" style={{ paddingTop: 4 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 500 }}>Good morning</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1F2937', letterSpacing: '-0.01em' }}>
                {name || 'Jane'} <span style={{ display: 'inline-block' }}>&#128075;</span>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: 14 }}>
              <Link href="/notifications" style={{ position: 'relative', cursor: 'pointer' }}>
                <i className="far fa-bell" style={{ fontSize: 20, color: '#64748B' }} />
                <div
                  style={{
                    position: 'absolute', top: -2, right: -2,
                    width: 9, height: 9, background: '#E63946',
                    borderRadius: '50%', border: '2px solid #F8FAFC',
                  }}
                />
              </Link>
              <Link
                href="/account"
                className="flex items-center justify-center lg:hidden"
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#0A1628', color: '#FFFFFF',
                  fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none',
                  boxShadow: 'none',
                }}
              >
                {name ? name.charAt(0).toUpperCase() : 'J'}D
              </Link>
            </div>
          </div>

          {/* Next Step + Debt Card: side by side on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Next Step Card */}
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #2563EB 100%)',
                borderRadius: 20, padding: 20,
              }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -15, left: -15, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
              <div className="relative z-10">
                <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
                  <div className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.15)' }}>
                    <i className="fas fa-route" style={{ fontSize: 12, color: '#FFFFFF' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Your Next Step
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                  Run Your Tax Analysis
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 16 }}>
                  Find out which IRS resolution options you qualify for and how much you could save.
                </p>
                <Link
                  href="/analysis/type"
                  className="inline-flex items-center"
                  style={{
                    gap: 8,
                    background: '#FFFFFF', color: '#0A1628',
                    fontSize: '0.82rem', fontWeight: 700,
                    padding: '12px 24px', borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                >
                  <i className="fas fa-play" style={{ fontSize: 10 }} />
                  Start Analysis
                </Link>
              </div>
            </div>

            {/* Total Tax Debt Card */}
            <div
              className="relative overflow-hidden"
              style={{
                background: '#EFF4FF', borderRadius: 20, padding: 24,
                border: '1px solid rgba(10,22,40,0.08)',
              }}
            >
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(230,57,70,0.06)' }} />
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(10,22,40,0.05)' }} />

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Total Tax Debt
              </div>
              <div
                ref={counterRef}
                style={{
                  fontSize: '2.2rem', fontWeight: 900, color: '#E63946',
                  letterSpacing: '-0.02em', lineHeight: 1, marginTop: 8,
                }}
              >
                $0
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 6, fontWeight: 500 }}>
                across <strong style={{ color: '#1F2937' }}>3 tax years</strong>
              </div>

              {/* CSED Warning */}
              <div
                className="inline-flex items-center"
                style={{
                  gap: 6, marginTop: 14,
                  padding: '6px 12px', background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.2)', borderRadius: 9999,
                  fontSize: '0.7rem', fontWeight: 600, color: '#D97706',
                }}
              >
                <i className="fas fa-clock" style={{ fontSize: 10 }} />
                Nearest expiration: Aug 2028
              </div>

              {/* Sparkline */}
              <div className="relative" style={{ marginTop: 16, height: 40 }}>
                <svg width="100%" height="40" viewBox="0 0 280 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E63946" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#E63946" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d="M0,30 Q30,28 60,25 T120,20 T180,15 T240,18 T280,12" fill="none" stroke="#E63946" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  <path d="M0,30 Q30,28 60,25 T120,20 T180,15 T240,18 T280,12 L280,40 L0,40 Z" fill="url(#sparkGrad)" />
                </svg>
                <div
                  className="animate-pulse"
                  style={{
                    position: 'absolute', right: 0, top: 6,
                    width: 8, height: 8, background: '#E63946',
                    borderRadius: '50%', boxShadow: '0 0 8px rgba(230,57,70,0.4)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>
              Quick Actions
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 12 }}>
              {/* New Analysis */}
              <Link href="/analysis/type" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px 16px', border: '1px solid #F3F4F6', boxShadow: 'none', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', cursor: 'pointer' }}>
                  <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: 14, background: '#EFF4FF', marginBottom: 12 }}>
                    <i className="fas fa-chart-line" style={{ fontSize: 16, color: '#0A1628' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>New Analysis</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.4 }}>Start a new resolution analysis</div>
                </div>
              </Link>
              {/* My Cases */}
              <Link href="/cases" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px 16px', border: '1px solid #F3F4F6', boxShadow: 'none', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', cursor: 'pointer' }}>
                  <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: 14, background: '#F5F0FF', marginBottom: 12 }}>
                    <i className="fas fa-folder-open" style={{ fontSize: 16, color: '#7C3AED' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>My Cases</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.4 }}>Track your active cases</div>
                </div>
              </Link>
              {/* Tax Filing */}
              <Link href="/resolution" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px 16px', border: '1px solid #F3F4F6', boxShadow: 'none', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', cursor: 'pointer' }}>
                  <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: 14, background: '#F0FDFA', marginBottom: 12 }}>
                    <i className="fas fa-file-lines" style={{ fontSize: 16, color: '#0D9488' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>Tax Filing</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.4 }}>File or amend returns</div>
                </div>
              </Link>
              {/* AI Assistant */}
              <Link href="/chat" className="block" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '18px 16px', border: '1px solid #F3F4F6', boxShadow: 'none', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)', cursor: 'pointer' }}>
                  <div className="flex items-center justify-center" style={{ width: 42, height: 42, borderRadius: 14, background: '#EEF2FF', marginBottom: 12 }}>
                    <i className="fas fa-sparkles" style={{ fontSize: 16, color: '#4F46E5' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>AI Assistant</div>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.4 }}>Get instant help</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity + AI Assistant Preview: side by side on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent Activity */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>
                Recent Activity
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: 'none' }}>
                {/* Activity 1 */}
                <div className="flex items-center" style={{ gap: 12, padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF4FF' }}>
                    <i className="fas fa-arrow-rotate-right" style={{ fontSize: 13, color: '#0A1628' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Case #1042 — Status updated
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: 1 }}>Moved to &quot;In Review&quot;</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#CBD5E1', fontWeight: 500, whiteSpace: 'nowrap' }}>2h ago</div>
                </div>
                {/* Activity 2 */}
                <div className="flex items-center" style={{ gap: 12, padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F9EE' }}>
                    <i className="fas fa-file-check" style={{ fontSize: 13, color: '#00A651' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      OIC Form 656 — Ready
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: 1 }}>Ready for submission</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#CBD5E1', fontWeight: 500, whiteSpace: 'nowrap' }}>5h ago</div>
                </div>
                {/* Activity 3 */}
                <div className="flex items-center" style={{ gap: 12, padding: '14px 16px' }}>
                  <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F0FF' }}>
                    <i className="fas fa-credit-card" style={{ fontSize: 13, color: '#7C3AED' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1F2937' }}>Payment of $250</div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: 1 }}>Processed successfully</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#CBD5E1', fontWeight: 500, whiteSpace: 'nowrap' }}>1d ago</div>
                </div>
              </div>
            </div>

            {/* AI Assistant Preview Card */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>
                AI Assistant
              </div>
              <div style={{ background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div className="flex items-center" style={{ gap: 10, marginBottom: 14 }}>
                  <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 10, background: '#2563EB' }}>
                    <i className="fas fa-sparkles" style={{ fontSize: 14, color: '#FFFFFF' }} />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1F2937' }}>BlastTax AI</div>
                  <div
                    className="inline-flex items-center"
                    style={{
                      gap: 4, padding: '3px 8px', background: 'rgba(99,102,241,0.1)',
                      borderRadius: 9999, fontSize: '0.6rem', fontWeight: 600, color: '#4F46E5',
                    }}
                  >
                    <i className="fas fa-bolt" style={{ fontSize: 8 }} /> SMART
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: 14 }}>
                  How can I help you today?
                </div>

                {/* Quick prompt chips */}
                <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 14 }}>
                  <div style={{ padding: '7px 14px', background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, color: '#64748B', cursor: 'pointer', transition: 'all 0.25s ease' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: 10, color: '#2563EB', marginRight: 2 }} /> Check my eligibility
                  </div>
                  <div style={{ padding: '7px 14px', background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, color: '#64748B', cursor: 'pointer', transition: 'all 0.25s ease' }}>
                    <i className="fas fa-handshake" style={{ fontSize: 10, color: '#7C3AED', marginRight: 2 }} /> Explain OIC
                  </div>
                  <div style={{ padding: '7px 14px', background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 600, color: '#64748B', cursor: 'pointer', transition: 'all 0.25s ease' }}>
                    <i className="fas fa-arrow-right" style={{ fontSize: 10, color: '#0D9488', marginRight: 2 }} /> Next steps
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center" style={{ gap: 10, background: '#FFFFFF', border: '1px solid #F3F4F6', borderRadius: 9999, padding: '8px 12px 8px 16px' }}>
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    disabled
                    style={{
                      flex: 1, border: 'none', outline: 'none',
                      fontFamily: 'inherit', fontSize: '0.8rem', color: '#1F2937',
                      background: 'transparent',
                    }}
                  />
                  <Link
                    href="/chat"
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: '#0A1628', textDecoration: 'none',
                    }}
                  >
                    <i className="fas fa-arrow-up" style={{ fontSize: 12, color: '#FFFFFF' }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div
            className="flex items-center"
            style={{
              gap: 10,
              padding: '14px 16px', background: '#ECFDF5',
              borderRadius: 14, border: '1px solid #D1FAE5',
            }}
          >
            <i className="fas fa-chart-line" style={{ fontSize: 16, color: '#10B981' }} />
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#065F46' }}>$127M+ in tax debt resolved</span>
              <span style={{ fontSize: '0.68rem', color: '#6B7280', display: 'block' }}>Trusted by 15,000+ taxpayers nationwide</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
