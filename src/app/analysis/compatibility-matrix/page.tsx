'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SIMULTANEOUS = [
  'IA + Penalty Abatement',
  'IA + Innocent Spouse (pending)',
  'IA + Amended Return',
  'CNC + Penalty Abatement',
  'CDP + Any collection alternative',
]

const EXCLUSIVE = [
  { combo: 'IA + OIC', reason: 'Must terminate IA first' },
  { combo: 'IA + CNC', reason: "Paying vs. can't pay conflict" },
  { combo: 'OIC + CNC', reason: 'Both address inability to pay' },
  { combo: 'OIC + Bankruptcy', reason: 'TC 520 blocks OIC processing' },
]

const SEQUENTIAL = [
  { combo: 'Penalty Abatement', arrow: true, target: 'OIC', reason: 'Reduce balance first, then offer' },
  { combo: 'Amended Return', arrow: true, target: 'OIC', reason: 'Wait for processing before filing' },
  { combo: 'Innocent Spouse', arrow: true, target: 'IA/OIC', reason: 'Resolve allocation first' },
]

const SPECIAL = [
  { text: 'Different resolutions for different tax years', detail: 'CNC for 2020, IA for 2023 -- allowed', allowed: true },
  { text: 'Business 941 + Individual 1040', detail: 'Separate tracks, separate resolutions', allowed: true },
  { text: 'Cannot have two IAs for same tax type', detail: 'Only one active IA per entity type', allowed: false },
]

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function CompatibilityMatrixPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 16, color: '#0A1628' }} />
          </button>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem', fontWeight: 800, color: '#0A1628' }}>Can I Combine?</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          {/* Title */}
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, marginBottom: 4 }}>Resolution Compatibility</h1>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: 22 }}>Not all resolutions can run together</p>

          {/* SIMULTANEOUS Section */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00A651', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00A651', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Simultaneous</span>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 500 }}>Can coexist</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SIMULTANEOUS.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'white', border: '1px solid #F1F5F9', borderRadius: 12, transition: 'all 0.3s' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fa-solid fa-check" style={{ fontSize: 11, color: '#00A651' }} />
                  </div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628', margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MUTUALLY EXCLUSIVE Section */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E63946', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E63946', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mutually Exclusive</span>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 500 }}>Cannot coexist</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {EXCLUSIVE.map((item) => (
                <div key={item.combo} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'white', border: '1px solid rgba(230,57,70,0.12)', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fa-solid fa-xmark" style={{ fontSize: 12, color: '#E63946' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628', margin: 0 }}>{item.combo}</p>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', margin: 0 }}>{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEQUENTIAL Section */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sequential</span>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 500 }}>Do one, then the other</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SEQUENTIAL.map((item) => (
                <div key={item.combo} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'white', border: '1px solid rgba(37,99,235,0.12)', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: 11, color: '#2563EB' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628', margin: 0 }}>
                      {item.combo} <i className="fa-solid fa-arrow-right" style={{ fontSize: 9, color: '#CBD5E1', margin: '0 2px' }} /> {item.target}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', margin: 0 }}>{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SPECIAL CASES Section */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED', flexShrink: 0 }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Special Cases</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SPECIAL.map((item) => (
                <div key={item.text} style={{ padding: 14, background: 'white', border: '1px solid #F1F5F9', borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <i className={`fa-solid ${item.allowed ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ fontSize: 14, color: item.allowed ? '#00A651' : '#E63946', marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628', margin: 0 }}>{item.text}</p>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', margin: '2px 0 0' }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link href="/analysis/strategic-plays" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', textDecoration: 'none' }}>
              <i className="fa-solid fa-arrow-left" style={{ fontSize: 10, marginRight: 4 }} />
              Back to Strategy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
