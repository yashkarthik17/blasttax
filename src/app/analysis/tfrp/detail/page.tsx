'use client'

import { useRouter } from 'next/navigation'

const RESOLUTION_OPTIONS = [
  { num: 1, title: 'Dispute TFRP', description: 'Appeal within 60 days of Letter 1153' },
  { num: 2, title: 'Pay and Claim Refund', description: 'Pay partial amount, then file Form 843' },
  { num: 3, title: 'Installment Agreement', description: 'IA on personal 1040 account' },
  { num: 4, title: 'Offer in Compromise', description: 'Include TFRP in your Offer' },
]

export default function TFRPDetailPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '12px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <button onClick={() => router.back()} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #F1F5F9', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ color: '#64748B' }} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0A1628' }}>Trust Fund Recovery Penalty</span>
          <div style={{ width: '40px' }} />
        </div>

        <div style={{ padding: '20px', paddingBottom: '120px' }}>

          {/* Title */}
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E63946', lineHeight: 1.3 }}>Personal Liability for Payroll Taxes</h1>
          </div>

          {/* Warning Card */}
          <div style={{ background: '#FFF0F1', border: '1.5px solid #FECACA', borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#E63946', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ color: 'white', fontSize: '14px' }} />
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#0A1628', fontWeight: 600, lineHeight: 1.5 }}>TFRP makes you <span style={{ color: '#E63946', fontWeight: 800 }}>PERSONALLY</span> liable for the trust fund portion of unpaid payroll taxes</p>
            </div>
          </div>

          {/* What Is Trust Fund */}
          <div style={{ background: 'white', border: '1.5px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <i className="fa-solid fa-vault" style={{ color: '#0A1628', fontSize: '14px' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0A1628' }}>What Is Trust Fund?</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.6 }}>The employee&apos;s share of Social Security, Medicare, and withheld income tax &mdash; money held <em>in trust</em> for the government.</p>
          </div>

          {/* TC 246 Indicator */}
          <div style={{ background: '#FFFBFB', border: '1.5px solid rgba(230,57,70,0.2)', borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '8px', fontSize: '0.6875rem', fontWeight: 700, fontFamily: "'Geist', monospace", background: '#FFF0F1', color: '#E63946' }}>TC 246</span>
              <p style={{ fontSize: '0.75rem', color: '#0A1628', fontWeight: 500 }}>This TC on your personal transcript means TFRP has been assessed</p>
            </div>
          </div>

          {/* Responsible Person Determination */}
          <div style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0A1628' }}>Responsible Person Determination</h2>
          </div>

          <div style={{ background: 'white', border: '1.5px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A1628', marginBottom: '6px' }}>Who qualifies:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                {[
                  { icon: 'fa-user-tie', label: 'Officers' },
                  { icon: 'fa-users', label: 'Directors' },
                  { icon: 'fa-pen-fancy', label: 'Check-signing authority' },
                ].map((p) => (
                  <span key={p.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600, background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                    <i className={`fa-solid ${p.icon}`} style={{ fontSize: '11px', color: '#0A1628' }} /> {p.label}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '10px' }}>
              <i className="fa-solid fa-clipboard-question" style={{ fontSize: '13px', color: '#7C3AED', marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A1628', marginBottom: '2px' }}>Form 4180 Interview</p>
                <p style={{ fontSize: '0.6875rem', color: '#64748B' }}>The IRS interviews potential responsible persons to determine liability</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px', background: '#FFFBEB', borderRadius: '8px' }}>
              <i className="fa-solid fa-users-gear" style={{ fontSize: '12px', color: '#F5A623' }} />
              <p style={{ fontSize: '0.6875rem', color: '#0A1628', fontWeight: 500 }}>Multiple responsible persons may be assessed</p>
            </div>
          </div>

          {/* TFRP Calculation */}
          <div style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0A1628' }}>TFRP Calculation</h2>
          </div>

          <div style={{ background: 'white', border: '1.5px solid rgba(0,61,165,0.15)', borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Gross Payroll Taxes</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0A1628' }}>$120,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Employee Share (Trust Fund)</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628' }}>$60,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: 'none' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Employer Share (Non-Trust)</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B' }}>$60,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '2px solid #0A1628', marginTop: '4px' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#E63946' }}>YOUR TFRP LIABILITY</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#E63946' }}>$60,000</span>
            </div>
          </div>

          {/* Resolution Options */}
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0A1628' }}>Resolution Options for TFRP</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px', marginBottom: '18px' }}>
            {RESOLUTION_OPTIONS.map((opt) => (
              <div key={opt.num} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: 'white', border: '1.5px solid #F1F5F9', borderRadius: '14px', cursor: 'pointer', transition: 'all 0.5s ease' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, color: '#0A1628' }}>{opt.num}</div>
                <div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0A1628', marginBottom: '2px' }}>{opt.title}</p>
                  <p style={{ fontSize: '0.6875rem', color: '#64748B', lineHeight: 1.5 }}>{opt.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bankruptcy Warning */}
          <div style={{ background: '#FFF0F1', border: '1.5px solid #FECACA', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-ban" style={{ color: '#E63946', fontSize: '16px' }} />
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#E63946' }}>TFRP is NOT dischargeable in bankruptcy</p>
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div style={{ position: 'sticky' as const, bottom: 0, padding: '16px 20px', paddingBottom: '28px', background: '#FFFFFF', zIndex: 10 }}>
          <button
            onClick={() => router.push('/analysis/tfrp/persons')}
            style={{ width: '100%', height: '52px', borderRadius: '16px', background: '#E63946', color: 'white', fontSize: '0.9375rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'inherit' }}
          >
            <i className="fa-solid fa-gavel" />
            Dispute TFRP
          </button>
          <p style={{ textAlign: 'center' as const, marginTop: '10px' }}>
            <a href="#" style={{ fontSize: '0.8125rem', color: '#0A1628', fontWeight: 600, textDecoration: 'none' }}>Talk to Expert <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }} /></a>
          </p>
        </div>
      </div>
    </div>
  )
}
