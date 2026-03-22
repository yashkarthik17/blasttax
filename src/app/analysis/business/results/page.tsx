'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ResultCard {
  rank: number
  recommended: boolean
  title: string
  amount: string
  amountSub: string
  amountColor: string
  description: string
  confidence: number
  confidenceLabel: string
  confidenceColor: string
  barColor: string
}

const RESULTS: ResultCard[] = [
  {
    rank: 1, recommended: true,
    title: 'In-Business Trust Fund Express IA',
    amount: '$607', amountSub: '/month for 72 months', amountColor: '#2563EB',
    description: 'No 433-B required for trust fund balance under $25,000. Streamlined approval.',
    confidence: 92, confidenceLabel: 'Very high', confidenceColor: '#00A651', barColor: '#00A651',
  },
  {
    rank: 2, recommended: false,
    title: 'Business OIC',
    amount: '$43,700', amountSub: 'minimum offer (RCP-based)', amountColor: '#00A651',
    description: 'Requires Form 433-B(OIC). 6-12 month process. $205 application fee.',
    confidence: 55, confidenceLabel: 'Medium', confidenceColor: '#F59E0B', barColor: '#F59E0B',
  },
  {
    rank: 3, recommended: false,
    title: 'Non-Streamlined Business IA',
    amount: '$729', amountSub: '/month (433-B required)', amountColor: '#2563EB',
    description: 'Full financial disclosure. Higher payment but guaranteed acceptance if compliant.',
    confidence: 80, confidenceLabel: 'High', confidenceColor: '#00A651', barColor: '#00A651',
  },
  {
    rank: 4, recommended: false,
    title: 'Business Penalty Abatement',
    amount: '$6,400', amountSub: 'in penalties', amountColor: '#00A651',
    description: 'FTA + reasonable cause for FTF, FTP, and FTD penalties.',
    confidence: 75, confidenceLabel: 'High', confidenceColor: '#00A651', barColor: '#00A651',
  },
]

export default function BusinessResultsPage() {
  const router = useRouter()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#D5D5E0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '85%', borderRadius: '9999px', background: '#1A1A2E', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8585A0' }}>Step 7 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Results</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center' as const, padding: '20px 0 16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#2563EB', background: '#EFF4FF', padding: '4px 12px', borderRadius: '9999px', marginBottom: '12px' }}>
              <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '10px' }} /> Business Analysis Complete
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.2 }}>Business Resolution Options</h1>
            <p style={{ fontSize: '12.5px', color: '#8585A0', marginTop: '6px', lineHeight: 1.4 }}>Based on entity type, debt composition, and financial profile</p>
          </div>

          {/* Result Cards */}
          {RESULTS.map((r) => (
            <div key={r.rank} style={{
              background: 'white', border: r.recommended ? '2px solid #2563EB' : '1px solid #F0F0F5',
              borderRadius: '18px', padding: 0, marginBottom: '14px', overflow: 'hidden',
              position: 'relative' as const,
            }}>
              {r.recommended && <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '4px', background: '#1A1A2E', zIndex: 1 }} />}
              <div style={{ padding: '18px', position: 'relative' as const }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 800, flexShrink: 0,
                      background: r.recommended ? '#2563EB' : '#FAFAFF',
                      color: r.recommended ? 'white' : '#5C5C7A',
                    }}>{r.rank}</div>
                    {r.recommended && (
                      <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'white', background: '#1A1A2E', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Recommended</span>
                    )}
                  </div>
                </div>
                {r.recommended ? (
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1A1A2E', marginBottom: '10px' }}>{r.title}</h3>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E', flex: 1 }}>{r.title}</h3>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                  {r.rank === 4 ? (
                    <>
                      <span style={{ fontSize: '12px', color: '#5C5C7A' }}>Remove</span>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: r.amountColor }}>{r.amount}</span>
                      <span style={{ fontSize: '12px', color: '#5C5C7A' }}>{r.amountSub}</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '22px', fontWeight: 900, color: r.amountColor }}>{r.amount}</span>
                      <span style={{ fontSize: '13px', color: '#5C5C7A', fontWeight: 500 }}>{r.amountSub}</span>
                    </>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#8585A0', marginBottom: '12px', lineHeight: 1.4 }}>{r.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: r.confidenceColor }}>{r.confidenceLabel}</span>
                  <div style={{ flex: 1, height: '6px', background: '#F0F0F5', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '3px', transition: 'width 1.5s ease', width: animated ? `${r.confidence}%` : '0%', background: r.barColor }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: r.confidenceColor }}>{r.confidence}%</span>
                </div>
              </div>
            </div>
          ))}

          {/* CNC Not Available */}
          <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '14px', padding: '14px 16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <i className="fa-solid fa-ban" style={{ fontSize: '14px', color: '#E63946' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#991B1B' }}>CNC Not Available for Businesses</span>
            </div>
            <div style={{ fontSize: '12px', color: '#991B1B', lineHeight: 1.5 }}>
              Businesses CANNOT be placed in Currently Not Collectible (CNC) status. If the business cannot pay, the IRS expects it to close/dissolve. Remaining trust fund liability is pursued against responsible persons via TFRP.
            </div>
          </div>

          {/* TFRP Warning */}
          <div style={{ marginTop: '8px', padding: '12px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400E' }}>
              <i className="fa-solid fa-user-shield" style={{ fontSize: '11px' }} /> TFRP Personal Liability Warning
            </div>
            <div style={{ fontSize: '11.5px', color: '#92400E', marginTop: '4px' }}>Responsible persons may be personally assessed $29,260 (trust fund portion) regardless of business resolution outcome. See TFRP screens for defense strategies.</div>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/business/plan')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#1A1A2E', color: 'white', fontSize: '15px', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <i className="fa-solid fa-check-circle" style={{ marginRight: '6px' }} /> Choose Resolution
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
