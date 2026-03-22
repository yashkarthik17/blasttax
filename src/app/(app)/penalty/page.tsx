'use client'

import { useRouter } from 'next/navigation'

export default function PenaltyReliefPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 12, background: '#FAFAFF', border: '1px solid #D5D5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Penalty Relief</div>
          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 20px', paddingBottom: 32 }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', padding: '4px 0' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', background: '#FFF0F1', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700, color: '#E63946', marginBottom: 10 }}>
              <i className="fas fa-percent" style={{ fontSize: 9 }} /> PENALTY REDUCTION
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0 }}>
              Reduce Your Tax Penalties
            </h1>
          </div>

          {/* Penalty Totals Card */}
          <div style={{ background: 'white', border: '1px solid #D5D5E0', borderRadius: 18, padding: 18, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Current Penalties</div>

            {/* Penalty row 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0F0F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-file-circle-xmark" style={{ fontSize: 12, color: '#EF4444' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Failure to File</div>
                  <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>IRC 6651(a)(1)</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#EF4444' }}>$3,200</div>
            </div>

            {/* Penalty row 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0F0F5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-hand-holding-dollar" style={{ fontSize: 12, color: '#EF4444' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Failure to Pay</div>
                  <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>IRC 6651(a)(2)</div>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#EF4444' }}>$2,100</div>
            </div>

            {/* Total row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0 2px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A2E' }}>Total Penalties</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#E63946', letterSpacing: '-0.01em' }}>$5,300</div>
            </div>
          </div>

          {/* Section Label */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 4px', marginTop: 2 }}>
            Relief Strategies
          </div>

          {/* Strategy Card 1: FTA (Recommended) */}
          <div style={{ background: 'white', border: '2px solid #1A1A2E', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', position: 'relative' }}>
            <div style={{ height: 4, background: '#1A1A2E' }} />
            <div style={{ padding: 18 }}>
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-shield-halved" style={{ fontSize: 16, color: '#1A1A2E' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1A1A2E' }}>First-Time Abatement</div>
                    <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Administrative waiver</div>
                  </div>
                </div>
                <div style={{ padding: '4px 10px', background: '#1A1A2E', borderRadius: 8, fontSize: '0.6rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Recommended
                </div>
              </div>

              {/* Eligibility checklist */}
              <div style={{ background: '#FAFAFF', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Eligibility Check</div>
                {['No prior penalties in last 3 years', 'All required returns filed', 'Current on payment agreement (or paid)'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: '#00A651', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="fas fa-check" style={{ fontSize: 10, color: 'white' }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#1A1A2E' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Estimated savings */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 12, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="fas fa-piggy-bank" style={{ fontSize: 13, color: '#10B981' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#065F46' }}>Estimated Savings</span>
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#10B981' }}>$5,300</span>
              </div>

              {/* Apply button */}
              <div style={{ padding: 13, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white', fontSize: '0.85rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                <i className="fas fa-paper-plane" style={{ marginRight: 6, fontSize: 12 }} /> Apply for FTA
              </div>
            </div>
          </div>

          {/* Strategy Card 2: Reasonable Cause */}
          <div style={{ background: 'white', border: '1px solid #D5D5E0', borderRadius: 18, padding: 18, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-scale-balanced" style={{ fontSize: 16, color: '#7C3AED' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1A1A2E' }}>Reasonable Cause</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Circumstance-based relief</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '0.78rem', color: '#5C5C7A', lineHeight: 1.6, marginBottom: 14 }}>
              If you can demonstrate that your failure to file or pay was due to circumstances beyond your control, the IRS may abate your penalties.
            </div>

            {/* Qualifying reasons */}
            <div style={{ background: '#FAFAFF', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Qualifying Reasons</div>
              {[
                { icon: 'fa-hospital', label: 'Serious illness or incapacitation' },
                { icon: 'fa-house-crack', label: 'Natural disaster or casualty' },
                { icon: 'fa-user-slash', label: 'Death of immediate family member' },
                { icon: 'fa-file-circle-question', label: 'Inability to obtain records' },
                { icon: 'fa-user-tie', label: 'Erroneous advice from tax professional' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
                  <i className={`fas ${item.icon}`} style={{ fontSize: 11, color: '#7C3AED' }} />
                  <span style={{ fontSize: '0.75rem', color: '#1A1A2E', fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Apply button */}
            <div style={{ padding: 13, background: 'white', border: '1.5px solid #D5D5E0', borderRadius: 9999, textAlign: 'center', color: '#5C5C7A', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <i className="fas fa-file-pen" style={{ marginRight: 6, fontSize: 12, color: '#7C3AED' }} /> Apply for Reasonable Cause
            </div>
          </div>

          {/* Continue Button */}
          <div style={{ marginTop: 4 }}>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 28px', background: '#1A1A2E', color: 'white', border: 'none', borderRadius: 9999, fontSize: '0.9rem', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
              Continue
              <i className="fas fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
