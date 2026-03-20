'use client'

import { useRouter } from 'next/navigation'

export default function PaywallPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 20px 40px' }}>
          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => router.back()}
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,22,40,0.06)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <i className="fas fa-xmark" style={{ fontSize: 16, color: '#64748B' }} />
            </button>
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', padding: '0 10px' }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <i className="fas fa-crown" style={{ fontSize: 22, color: 'white' }} />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em', marginBottom: 6, marginTop: 0 }}>Unlock Full Access</h1>
            <p style={{ fontSize: '0.84rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.5, margin: 0 }}>Choose the plan that fits your needs</p>
          </div>

          {/* Plans */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Free Plan */}
            <div style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A1628' }}>Free</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 400, color: '#94A3B8', marginLeft: 4 }}>$0</span>
                </div>
                <span style={{ padding: '3px 10px', background: '#E2E8F0', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, color: '#64748B' }}>Current Plan</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['Basic tax screening', '1 resolution analysis', 'Learn articles'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    <i className="fas fa-check" style={{ fontSize: 10, color: '#00A651' }} />
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Plan */}
            <div style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A1628' }}>Starter</span>
                </div>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628' }}>$19</span>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 400 }}>/mo</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['Full resolution analysis', 'IRS form preparation', 'AI chat assistant'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    <i className="fas fa-check" style={{ fontSize: 10, color: '#00A651' }} />
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Plan (Recommended) */}
            <div style={{ background: 'white', border: '2px solid transparent', borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* Most Popular Badge */}
              <div style={{ position: 'absolute', top: 0, right: 16 }}>
                <div style={{ padding: '4px 12px', background: '#0A1628', borderRadius: '0 0 10px 10px', fontSize: '0.65rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Most Popular</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A1628' }}>Pro</span>
                  <span style={{ padding: '3px 8px', background: '#EFF4FF', borderRadius: 9999, fontSize: '0.6rem', fontWeight: 700, color: '#0A1628', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recommended</span>
                </div>
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A1628' }}>$49</span>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 400 }}>/mo</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['Everything in Starter', 'Expert consultation included', 'IRS representation', 'Priority support'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: 12, color: '#0A1628' }} />
                    <span style={{ fontSize: '0.8rem', color: '#0A1628', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Plan */}
            <div style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 18, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A1628' }}>Enterprise</span>
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#7C3AED' }}>Custom</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {['For tax professionals', 'Multi-client management', 'Custom integrations & API'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    <i className="fas fa-check" style={{ fontSize: 10, color: '#00A651' }} />
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7C3AED', textDecoration: 'none' }}>Contact Sales <i className="fas fa-arrow-right" style={{ fontSize: 10 }} /></a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 9999, fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>
              <i className="fas fa-bolt" style={{ fontSize: 14 }} />
              Start Pro Trial &mdash; 7 days free
            </button>
          </div>

          {/* Compare all features */}
          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
              Compare all features
              <i className="fas fa-chevron-down" style={{ fontSize: 10 }} />
            </a>
          </div>

          {/* Reassurance */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '4px 0' }}>
            <i className="fas fa-shield-check" style={{ fontSize: 11, color: '#00A651' }} />
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>No commitment, cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
