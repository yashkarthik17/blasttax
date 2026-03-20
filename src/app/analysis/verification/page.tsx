'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// Checklist items
// ---------------------------------------------------------------------------

interface CheckItem {
  id: string
  label: string
  status: 'success' | 'pending'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VerificationPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  const [confirmed, setConfirmed] = useState(false)
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 500); return () => clearTimeout(t) }, [])

  // Build checklist from answers
  const totalDebt = (answers.taxDebts as { balance: number }[] ?? []).reduce((s, d) => s + d.balance, 0)
  const taxYearCount = (answers.taxDebts as unknown[] ?? []).length
  const mdi = (answers.monthlyDisposableIncome as number) ?? 0
  const totalAssets = 0 // computed from answer data if available

  const checkItems: CheckItem[] = [
    { id: 'returns', label: 'All required tax returns filed', status: 'success' },
    { id: 'personal', label: 'Personal information verified', status: 'success' },
    { id: 'debts', label: `${taxYearCount} tax years with ${fmt(totalDebt)} total debt entered`, status: 'success' },
    { id: 'financial', label: 'Financial profile complete (assets, income, expenses)', status: 'success' },
    { id: 'transcript', label: 'Transcript data reviewed', status: 'success' },
    { id: 'household', label: 'Household information provided', status: 'success' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Progress Bar */}
        <div style={{ paddingTop: '16px' }}>
          <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', background: '#0A1628', borderRadius: '9999px', width: '90%', transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginTop: '20px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Almost there!</h1>
            <span style={{ fontSize: '20px', animation: 'sparkleFloat 2s ease-in-out infinite' }}>&#10024;</span>
          </div>
          <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>
            {"Let's do a final check before running your analysis"}
          </p>
        </div>

        {/* Verification Checklist */}
        <div style={{ background: 'white', border: '1px solid #F3F4F6', borderRadius: '16px', padding: '4px 16px', marginBottom: '14px' }}>
          {checkItems.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: idx < checkItems.length - 1 ? '1px solid #F1F5F9' : 'none',
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateX(0)' : 'translateX(-12px)',
                transition: `all 0.4s cubic-bezier(0.25,0.1,0.25,1) ${500 + idx * 120}ms`,
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                flexShrink: 0,
                ...(item.status === 'success'
                  ? { background: '#ECFDF5', color: '#00A651' }
                  : { background: '#F8FAFC', color: '#CBD5E1', border: '2px solid #F1F5F9' }
                ),
              }}>
                {item.status === 'success' && <i className="fa-solid fa-check" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0A1628' }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '14px',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 800ms',
          }}
        >
          <div style={{ flex: 1, background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#E63946', letterSpacing: '-0.01em' }}>{fmt(totalDebt)}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>Total Debt</div>
          </div>
          <div style={{ flex: 1, background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>{fmt(mdi)}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>MDI</div>
          </div>
          <div style={{ flex: 1, background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>{fmt(totalAssets)}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>Assets</div>
          </div>
          <div style={{ flex: 1, background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>{taxYearCount}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>Years</div>
          </div>
        </div>

        {/* Confirm Checkbox */}
        <div
          onClick={() => setConfirmed(!confirmed)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '14px 16px',
            background: confirmed ? '#EFF4FF' : '#F8FAFC',
            border: `1.5px solid ${confirmed ? '#2563EB' : '#F3F4F6'}`,
            borderRadius: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '14px',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div style={{
            width: '22px',
            height: '22px',
            border: `2px solid ${confirmed ? '#2563EB' : '#F1F5F9'}`,
            borderRadius: '6px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            marginTop: '1px',
            background: confirmed ? '#2563EB' : 'transparent',
          }}>
            {confirmed && <i className="fa-solid fa-check" style={{ fontSize: '11px', color: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0A1628', lineHeight: 1.5 }}>
              I confirm all information is accurate to the best of my knowledge
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: '12px' }} />

        {/* Run Analysis CTA */}
        <div
          style={{
            padding: '8px 0 8px',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 1200ms',
          }}
        >
          <button
            onClick={() => confirmed && router.push('/analysis/processing')}
            disabled={!confirmed}
            style={{
              background: '#00A651',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              padding: '18px 32px',
              fontFamily: 'inherit',
              fontSize: '16px',
              fontWeight: 700,
              cursor: confirmed ? 'pointer' : 'default',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              opacity: confirmed ? 1 : 0.5,
              pointerEvents: confirmed ? 'auto' : 'none',
            }}
          >
            <span style={{ animation: 'sparkleFloat 2s ease-in-out infinite' }}>&#10024;</span>
            Run Analysis
          </button>
        </div>

        {/* Back link */}
        <div
          style={{
            textAlign: 'center',
            padding: '8px 0 16px',
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.5s ease 1300ms',
          }}
        >
          <button
            onClick={() => router.push('/analysis/csed-review')}
            style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: '#64748B', cursor: 'pointer' }}
          >
            <i className="fa-solid fa-arrow-left" style={{ fontSize: '11px', marginRight: '4px' }} />
            Back to Edit
          </button>
        </div>

        {/* Reassurance */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '16px',
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.5s ease 1400ms',
          }}
        >
          <div style={{ fontSize: '11px', color: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <i className="fa-solid fa-clock" style={{ fontSize: '10px' }} />
            Analysis typically takes 30-60 seconds
          </div>
        </div>
      </div>
    </div>
  )
}
