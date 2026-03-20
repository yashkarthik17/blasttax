'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const starterFeatures = ['Full analysis', 'Form generation', 'AI chat', 'Email support']
const proFeatures = ['Everything in Starter', 'Expert consultation', 'IRS representation', 'Priority support', 'Unlimited analyses']
const enterpriseFeatures = ['Bulk client management', 'API access', 'Dedicated account manager']

const comparisonRows = [
  { label: 'Analyses/mo', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Form generation', starter: true, pro: true, enterprise: true },
  { label: 'Expert consult', starter: false, pro: true, enterprise: true },
  { label: 'IRS representation', starter: false, pro: true, enterprise: true },
]

export default function PlansPage() {
  const router = useRouter()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [showComparison, setShowComparison] = useState(false)

  const starterPrice = billing === 'monthly' ? '$19' : '$15'
  const proPrice = billing === 'monthly' ? '$49' : '$39'

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#64748B' }} />
          </button>
          <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#0A1628', textAlign: 'center' }}>Plans</span>
          <div style={{ width: 36 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '0 20px', paddingBottom: 20 }}>
          {/* Billing Toggle */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 12, padding: 4 }}>
            <button
              onClick={() => setBilling('monthly')}
              style={{ flex: 1, padding: '10px 16px', border: 'none', background: billing === 'monthly' ? 'white' : 'transparent', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, color: billing === 'monthly' ? '#0A1628' : '#94A3B8', cursor: 'pointer', borderRadius: 10, boxShadow: billing === 'monthly' ? '0 1px 2px rgba(0,0,0,0.03)' : 'none' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              style={{ flex: 1, padding: '10px 16px', border: 'none', background: billing === 'annual' ? 'white' : 'transparent', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, color: billing === 'annual' ? '#0A1628' : '#94A3B8', cursor: 'pointer', borderRadius: 10, boxShadow: billing === 'annual' ? '0 1px 2px rgba(0,0,0,0.03)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
            >
              Annual
              <span style={{ display: 'inline-flex', marginLeft: 4, padding: '2px 6px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#00A651' }}>Save 20%</span>
            </button>
          </div>

          {/* Starter Plan */}
          <div style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Starter</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 14 }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0A1628' }}>{starterPrice}</span>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {starterFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <i className="fas fa-check" style={{ fontSize: 11, color: '#00A651' }} />
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan (Recommended) */}
          <div style={{ background: '#FFFFFF', border: '2px solid #0A1628', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#0A1628' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#0A1628', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro</div>
              <span style={{ padding: '4px 10px', background: '#0A1628', borderRadius: 9999, fontSize: '0.6rem', fontWeight: 700, color: 'white' }}>RECOMMENDED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 14 }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0A1628' }}>{proPrice}</span>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500 }}>/mo</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {proFeatures.map((f, i) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <i className="fas fa-check" style={{ fontSize: 11, color: i === 0 ? '#00A651' : '#0A1628' }} />
                  <span style={{ fontSize: '0.78rem', color: i === 0 ? '#64748B' : '#0A1628', fontWeight: i === 0 ? 500 : 600 }}>{f}</span>
                </div>
              ))}
            </div>
            {/* Current plan indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 14, padding: '8px 12px', background: 'rgba(10,22,40,0.06)', borderRadius: 10 }}>
              <i className="fas fa-circle-check" style={{ fontSize: 12, color: '#0A1628' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0A1628' }}>Your current plan</span>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div style={{ background: '#0A1628', border: '1.5px solid transparent', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Enterprise</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 14 }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>Custom</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginBottom: 14 }}>For tax professionals</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {enterpriseFeatures.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <i className="fas fa-check" style={{ fontSize: 11, color: '#00A651' }} />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: 16, padding: 12, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 12, fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, color: 'white', cursor: 'pointer' }}>Contact Sales</button>
          </div>

          {/* Feature Comparison (Expandable) */}
          <div>
            <div
              onClick={() => setShowComparison(!showComparison)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, cursor: 'pointer' }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628' }}>Feature Comparison</span>
              <i className="fas fa-chevron-down" style={{ fontSize: 11, color: '#94A3B8', transition: 'transform 0.3s ease', transform: showComparison ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            {showComparison && (
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderTop: 'none', borderRadius: '0 0 14px 14px', padding: '8px 16px', marginTop: -4 }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', alignItems: 'center', padding: '10px 0', borderBottom: '2px solid #E2E8F0', fontSize: '0.72rem' }}>
                  <div style={{ fontWeight: 600, color: '#CBD5E1', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Feature</div>
                  <div style={{ textAlign: 'center', fontWeight: 600, color: '#CBD5E1', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Starter</div>
                  <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pro</div>
                  <div style={{ textAlign: 'center', fontWeight: 600, color: '#CBD5E1', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Enter.</div>
                </div>
                {comparisonRows.map((row, i) => (
                  <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', alignItems: 'center', padding: '10px 0', borderBottom: i < comparisonRows.length - 1 ? '1px solid #F1F5F9' : 'none', fontSize: '0.72rem' }}>
                    <div style={{ fontWeight: 600, color: '#64748B' }}>{row.label}</div>
                    {[row.starter, row.pro, row.enterprise].map((val, j) => (
                      <div key={j} style={{ textAlign: 'center', fontWeight: 600, color: '#0A1628' }}>
                        {typeof val === 'boolean' ? (
                          val ? (
                            <i className="fas fa-check" style={{ fontSize: 11, color: '#00A651' }} />
                          ) : (
                            <i className="fas fa-xmark" style={{ fontSize: 11, color: '#D5D5E0' }} />
                          )
                        ) : (
                          <span>{val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upgrade CTA */}
          <div style={{ paddingTop: 4 }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 28px', background: '#00A651', color: 'white', border: 'none', borderRadius: 9999, fontFamily: 'inherit', fontSize: '0.92rem', fontWeight: 700, cursor: 'pointer' }}>
              <i className="fas fa-arrow-up" style={{ fontSize: 13 }} />
              Upgrade to Pro
            </button>
          </div>

          {/* Trial note */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#F8FAFC', borderRadius: 9999 }}>
              <i className="fas fa-shield-check" style={{ fontSize: 11, color: '#00A651' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B' }}>All plans include 7-day free trial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
