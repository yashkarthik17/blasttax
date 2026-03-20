'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()
  const [showTap, setShowTap] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTap(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function handleContinue() {
    router.push('/login')
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: '#0A1628' }}
      onClick={showTap ? handleContinue : undefined}
    >
      <div className="relative flex w-full max-w-md sm:max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
        {/* Logo */}
        <div
          className="animate-[logoEntrance_1.4s_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
          style={{ opacity: 0, transform: 'translateY(30px) scale(0.95)' }}
        >
          <div
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#E63946' }}>Blast</span>
            <span style={{ color: '#FFFFFF' }}>Tax</span>
          </div>
          <div
            className="animate-[debtEntrance_1s_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
            style={{
              opacity: 0,
              transform: 'translateY(15px)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '0.35em',
              textTransform: 'uppercase' as const,
              marginTop: 4,
            }}
          >
            DEBT
          </div>
        </div>

        {/* Tagline */}
        <div
          className="animate-[taglineEntrance_1s_1.8s_cubic-bezier(0.4,0,0.2,1)_forwards]"
          style={{
            opacity: 0,
            transform: 'translateY(12px)',
            color: '#94A3B8',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginTop: 40,
          }}
        >
          Your path to tax freedom
        </div>

        {/* Stars + trust line */}
        <div
          className="animate-[fadeIn_1s_2s_ease_forwards]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16,
            opacity: 0,
          }}
        >
          <div style={{ display: 'flex' }}>
            <i className="fas fa-star" style={{ fontSize: 11, color: '#F59E0B' }} />
            <i className="fas fa-star" style={{ fontSize: 11, color: '#F59E0B' }} />
            <i className="fas fa-star" style={{ fontSize: 11, color: '#F59E0B' }} />
            <i className="fas fa-star" style={{ fontSize: 11, color: '#F59E0B' }} />
            <i className="fas fa-star-half-stroke" style={{ fontSize: 11, color: '#F59E0B' }} />
          </div>
          <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
            Trusted by 15,000+ taxpayers
          </span>
        </div>

        {/* Bouncing dots */}
        <div
          className="animate-[dotsEntrance_0.5s_2s_ease-out_forwards]"
          style={{ display: 'flex', gap: 8, marginTop: 32, opacity: 0 }}
        >
          <div className="animate-[dotBounce_1.4s_ease-in-out_infinite]" style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <div className="animate-[dotBounce_1.4s_0.16s_ease-in-out_infinite]" style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
          <div className="animate-[dotBounce_1.4s_0.32s_ease-in-out_infinite]" style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
        </div>

        {/* Tap to continue */}
        {showTap && (
          <button
            onClick={handleContinue}
            className="animate-[gentlePulse_2.5s_ease-in-out_infinite]"
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Tap to continue
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes logoEntrance {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes debtEntrance {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes taglineEntrance {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes dotsEntrance {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
