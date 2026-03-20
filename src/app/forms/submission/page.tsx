'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

export default function SubmissionPage() {
  const router = useRouter()
  const { answers } = useWizard()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: 20, paddingBottom: 40, gap: 0, background: 'white',
        margin: '-16px -20px 0', minHeight: '80vh', padding: '20px 20px 40px',
      }}>
        {/* Confetti Container */}
        <div style={{ position: 'relative', width: '100%', height: 0 }}>
          {[
            { color: '#0A1628', size: 8, br: '50%', left: '15%', top: 0 },
            { color: '#00A651', size: 6, br: '2px', left: '30%', top: 10 },
            { color: '#7C3AED', size: 7, br: '50%', left: '50%', top: -5 },
            { color: '#2563EB', size: 5, br: '1px', left: '70%', top: 5 },
            { color: '#E63946', size: 6, br: '50%', left: '80%', top: 0 },
            { color: '#F5A623', size: 7, br: '2px', left: '25%', top: 15 },
            { color: '#0D9488', size: 5, br: '50%', left: '60%', top: 10 },
            { color: '#0A1628', size: 6, br: '50%', left: '40%', top: -10 },
            { color: '#00A651', size: 8, br: '2px', left: '85%', top: 15 },
            { color: '#7C3AED', size: 5, br: '50%', left: '10%', top: 20 },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute', width: c.size, height: c.size, borderRadius: c.br,
                background: c.color, left: c.left, top: c.top, opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Animated Checkmark */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%', background: '#00A651',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 20, marginBottom: 24,
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M12 24L20 32L36 16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0A1628', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Submission Complete!</div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '0.88rem', color: '#64748B', fontWeight: 500, lineHeight: 1.5 }}>Your Form 656 has been submitted to the IRS</div>
        </div>

        {/* Summary Card */}
        <div style={{ width: '100%', background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', marginBottom: 20 }}>
          {[
            { label: 'Case', value: '#1042' },
            { label: 'Resolution', value: 'Offer in Compromise' },
            { label: 'Offer Amount', value: '$8,500', highlight: true },
            { label: 'Submitted', value: 'March 15, 2026' },
            { label: 'Expected Response', value: '6-12 months' },
          ].map((row, idx, arr) => (
            <div
              key={idx}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: idx < arr.length - 1 ? 12 : 0,
                borderBottom: idx < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                marginBottom: idx < arr.length - 1 ? 12 : 0,
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8' }}>{row.label}</span>
              <span style={{
                fontSize: row.highlight ? '0.88rem' : '0.82rem',
                fontWeight: row.highlight ? 800 : 700,
                color: row.highlight ? '#00A651' : '#0A1628',
              }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* What Happens Next */}
        <div style={{ width: '100%', marginBottom: 16 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>What happens next?</div>
          <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            {[
              { num: '1', title: 'IRS will acknowledge receipt', sub: 'Within 30 days of submission' },
              { num: '2', title: 'Examiner reviews your financials', sub: 'Detailed review of assets and income' },
              { num: '3', title: "You'll receive a decision letter", sub: 'Accept, reject, or counter-offer' },
            ].map((step, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px',
                borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: '#EBF0FF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0A1628' }}>{step.num}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A1628' }}>{step.title}</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 2 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance */}
        <div style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
          background: '#E6F9EE', borderRadius: 12, border: '1px solid rgba(0,166,81,0.12)', marginBottom: 20,
        }}>
          <i className="fas fa-shield-check" style={{ fontSize: 16, color: '#00A651', flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 500, lineHeight: 1.5 }}>
            We&apos;ll notify you of any updates and guide you through every step.
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white',
              fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            <i className="fas fa-house" style={{ marginRight: 8 }} /> Go to Dashboard
          </button>
          <button
            style={{
              padding: 12, textAlign: 'center', color: '#0A1628', fontSize: '0.82rem', fontWeight: 600,
              cursor: 'pointer', background: 'none', border: 'none',
            }}
          >
            View Case Details <i className="fas fa-arrow-right" style={{ marginLeft: 4, fontSize: 11 }} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8, paddingBottom: 20 }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.3, margin: 0 }}>Submission Review</h1>
        <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 6, lineHeight: 1.5, margin: '6px 0 0 0' }}>Review everything before submitting.</p>
      </div>

      {/* Summary Card */}
      <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        {[
          { label: 'Case', value: '#1042' },
          { label: 'Resolution', value: 'Offer in Compromise' },
          { label: 'Offer Amount', value: '$8,500', highlight: true },
        ].map((row, idx, arr) => (
          <div
            key={idx}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: idx < arr.length - 1 ? 12 : 0,
              borderBottom: idx < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
              marginBottom: idx < arr.length - 1 ? 12 : 0,
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8' }}>{row.label}</span>
            <span style={{
              fontSize: row.highlight ? '0.88rem' : '0.82rem',
              fontWeight: row.highlight ? 800 : 700,
              color: row.highlight ? '#00A651' : '#0A1628',
            }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Reassurance */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: '#E6F9EE', borderRadius: 12, border: '1px solid rgba(0,166,81,0.12)',
      }}>
        <i className="fas fa-shield-check" style={{ fontSize: 16, color: '#00A651', flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 500, lineHeight: 1.5 }}>
          We&apos;ll notify you of any updates and guide you through every step.
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
        <button
          onClick={() => setSubmitted(true)}
          style={{
            padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white',
            fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Submit to IRS <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
        </button>
      </div>
    </div>
  )
}
