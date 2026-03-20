'use client'

import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          textAlign: 'center', padding: '20px 28px', minHeight: '100vh',
        }}>

          {/* Illustration */}
          <div style={{
            width: 140, height: 140, borderRadius: '50%', background: '#F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <i className="fa-solid fa-magnifying-glass" style={{ fontSize: 48, color: '#0A1628' }} />
            {/* Dashed rings */}
            <div style={{
              position: 'absolute', inset: -8, borderRadius: '50%',
              border: '2px dashed rgba(10,22,40,0.1)',
              animation: 'spin 20s linear infinite', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: -20, borderRadius: '50%',
              border: '1px dashed rgba(124,58,237,0.08)',
              animation: 'spin 30s linear infinite reverse', pointerEvents: 'none',
            }} />
          </div>

          {/* Heading */}
          <div style={{ marginTop: 32 }}>
            <h1 style={{
              fontSize: '1.6rem', fontWeight: 800, color: '#0A1628',
              lineHeight: 1.2, letterSpacing: '-0.01em',
            }}>
              Let&apos;s find your best<br />resolution path
            </h1>
          </div>

          {/* Steps */}
          <div style={{ marginTop: 32, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, flexShrink: 0, color: 'white', background: '#0A1628',
              }}>
                <i className="fa-solid fa-clipboard-list" style={{ fontSize: 14 }} />
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', display: 'block' }}>Answer a few questions</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>Simple, guided questions about your situation</span>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, flexShrink: 0, color: 'white', background: '#7C3AED',
              }}>
                <i className="fa-solid fa-microchip" style={{ fontSize: 14 }} />
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', display: 'block' }}>We&apos;ll analyze your eligibility</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>AI-powered assessment against IRS criteria</span>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, flexShrink: 0, color: 'white', background: '#00A651',
              }}>
                <i className="fa-solid fa-star" style={{ fontSize: 14 }} />
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', display: 'block' }}>Get your personalized plan</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>Ranked options with savings estimates</span>
              </div>
            </div>
          </div>

          {/* Time estimate */}
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>
              <i className="fa-regular fa-clock" style={{ marginRight: 4 }} />
              This usually takes about 10 minutes
            </span>
          </div>

          {/* Reassurance */}
          <div style={{ marginTop: 20, width: '100%' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
              background: '#F8FAFC', borderRadius: 12, border: '1px solid #F1F5F9',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: '#E6F9EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <i className="fa-solid fa-lock" style={{ color: '#00A651', fontSize: 13 }} />
              </div>
              <span style={{ fontSize: 12.5, color: '#64748B', textAlign: 'left', lineHeight: 1.4 }}>
                Everything you share is confidential and encrypted
              </span>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 28, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => router.push('/analysis/pre-qualifier/1')}
              style={{
                width: '100%', padding: '16px 28px', fontSize: 15, fontWeight: 700,
                background: '#00A651', color: 'white', border: 'none', borderRadius: 9999,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              Let&apos;s Begin
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                fontSize: 13, color: '#94A3B8', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit', padding: '8px 16px',
              }}
            >
              I&apos;ll do this later
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
