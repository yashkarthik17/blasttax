'use client'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#FAFAFF' }}>
      {/* Left branding panel - desktop only */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[540px] lg:flex-col lg:items-center lg:justify-center lg:shrink-0 lg:relative lg:overflow-hidden"
        style={{ background: '#1A1A2E' }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute', top: -80, right: -80,
            width: 300, height: 300, borderRadius: '50%',
            background: 'rgba(37, 99, 235, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: -60, left: -60,
            width: 250, height: 250, borderRadius: '50%',
            background: 'rgba(230, 57, 70, 0.06)',
          }}
        />

        <div className="relative z-10 px-12 text-center">
          {/* Logo */}
          <div style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
            <span style={{ color: '#E63946' }}>Blast</span>
            <span style={{ color: '#FFFFFF' }}>Tax</span>
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#5C5C7A',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            DEBT
          </div>

          {/* Tagline */}
          <p
            style={{
              color: '#8585A0',
              fontSize: '1.05rem',
              fontWeight: 500,
              marginTop: 40,
              lineHeight: 1.6,
            }}
          >
            Your path to tax freedom
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div style={{ display: 'flex' }}>
                <i className="fas fa-star" style={{ fontSize: 12, color: '#F59E0B' }} />
                <i className="fas fa-star" style={{ fontSize: 12, color: '#F59E0B' }} />
                <i className="fas fa-star" style={{ fontSize: 12, color: '#F59E0B' }} />
                <i className="fas fa-star" style={{ fontSize: 12, color: '#F59E0B' }} />
                <i className="fas fa-star-half-stroke" style={{ fontSize: 12, color: '#F59E0B' }} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#5C5C7A', fontWeight: 500 }}>
                4.8/5 from 15,000+ taxpayers
              </span>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-1.5" style={{ fontSize: '0.72rem', color: '#5C5C7A', fontWeight: 500 }}>
                <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ fontSize: '0.72rem', color: '#5C5C7A', fontWeight: 500 }}>
                <i className="fas fa-lock" style={{ fontSize: 12, color: '#00A651' }} />
                <span>256-bit encryption</span>
              </div>
            </div>

            <div
              className="mt-4 rounded-xl px-5 py-3"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p style={{ fontSize: '0.8rem', color: '#8585A0', fontWeight: 600 }}>
                $127M+ in tax debt resolved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>
    </div>
  )
}
