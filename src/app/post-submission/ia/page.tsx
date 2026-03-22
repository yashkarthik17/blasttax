'use client'

import { useRouter } from 'next/navigation'

export default function IAPostSubmissionPage() {
  const router = useRouter()

  const timeline = [
    { label: 'Application Submitted', desc: 'Mar 15 \u2014 Online via IRS.gov', done: true, current: false, icon: 'fa-check' },
    { label: 'TC 971 AC 043 Posted', desc: 'Mar 15 \u2014 Pending status confirmed', done: true, current: false, icon: 'fa-check' },
    { label: 'Levy Protection Active', desc: 'IRC \u00A7 6331(k) \u2014 Protected from levies', done: true, current: false, icon: 'fa-check' },
    { label: 'Approved \u2014 TC 971 AC 063', desc: 'Mar 16 \u2014 Online = immediate approval', done: true, current: false, icon: 'fa-check' },
    { label: 'First Payment Due', desc: 'Apr 28 \u2014 $657 via Direct Debit', done: false, current: true, icon: 'fa-arrow-right' },
  ]

  const details = [
    { label: 'Monthly Payment', value: '$657', bold: true },
    { label: 'Payment Method', value: 'Direct Debit (DDIA)' },
    { label: 'Payment Date', value: '28th of each month' },
    { label: 'Remaining Balance', value: '$46,593', accent: true },
    { label: 'Payments Made', value: '1 of 72' },
  ]

  const compliance = [
    'File all future returns on time',
    'Pay current-year taxes on time',
    'Make all IA payments on time',
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '14px 20px', borderBottom: '1px solid #F0F0F5' }}>
          <button onClick={() => router.back()} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FAFAFF', border: '1px solid #F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ color: '#5C5C7A' }} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>IA Status</span>
          <div style={{ width: '40px' }} />
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', paddingBottom: '24px' }}>
          {/* Title + Status */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', margin: 0 }}>Your Installment Agreement</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '9999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, background: '#E6F9EE', color: '#00A651' }}>
                <i className="fa-solid fa-circle" style={{ fontSize: '6px' }} /> Active
              </span>
              <span style={{ fontSize: '12px', color: '#5C5C7A' }}>Streamlined DDIA</span>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ borderRadius: '16px', background: 'white', border: '1px solid #F0F0F5', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Timeline</div>
            {timeline.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', position: 'relative', paddingBottom: i < timeline.length - 1 ? '16px' : 0 }}>
                {/* Connector line */}
                {i < timeline.length - 1 && (
                  <div style={{ position: 'absolute', left: '15px', top: '34px', bottom: 0, width: '2px', background: step.done ? '#00A651' : '#F0F0F5' }} />
                )}
                {/* Dot */}
                <div style={{
                  position: 'relative', zIndex: 1, width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: step.done ? '#00A651' : step.current ? '#2563EB' : '#FAFAFF',
                  color: step.done || step.current ? 'white' : '#B0B0C8',
                  border: !step.done && !step.current ? '2px solid #F0F0F5' : 'none',
                  fontSize: '12px',
                }}>
                  <i className={`fa-solid ${step.icon}`} style={{ fontSize: '11px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: step.current ? '#2563EB' : '#1A1A2E' }}>{step.label}</div>
                  <div style={{ fontSize: '11px', color: '#5C5C7A' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Agreement Details */}
          <div style={{ borderRadius: '16px', background: 'white', border: '1px solid #F0F0F5', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Agreement Details</div>
            {details.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: '12px', borderTop: i > 0 ? '1px solid #F0F0F5' : 'none' }}>
                <span style={{ color: '#5C5C7A' }}>{row.label}</span>
                <span style={{ fontWeight: row.accent || row.bold ? 700 : 600, color: row.accent ? '#E63946' : '#1A1A2E' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: '12px', borderTop: '1px solid #F0F0F5' }}>
              <span style={{ color: '#5C5C7A' }}>FTP Penalty Rate</span>
              <div>
                <span style={{ fontWeight: 600, color: '#00A651' }}>0.25%/mo</span>
                <span style={{ fontSize: '10px', color: '#5C5C7A', textDecoration: 'line-through', marginLeft: '4px' }}>0.5%</span>
              </div>
            </div>
          </div>

          {/* NFTL Status */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', borderRadius: '14px', background: '#E6F9EE', border: '1px solid rgba(0,166,81,0.15)', padding: '14px' }}>
            <i className="fa-solid fa-shield-check" style={{ color: '#00A651', fontSize: '16px', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#065F46', marginBottom: '2px' }}>No Lien Filed</div>
              <div style={{ fontSize: '12px', color: '#065F46', lineHeight: 1.4 }}>Balance under $25K DDIA threshold. NFTL will not be filed.</div>
            </div>
          </div>

          {/* Compliance Requirements */}
          <div style={{ borderRadius: '16px', background: 'white', border: '1px solid #F0F0F5', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '10px', marginRight: '4px', color: '#F59E0B' }} />
              Compliance Requirements
            </div>
            {compliance.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', fontSize: '12px', lineHeight: 1.5 }}>
                <i className="fa-solid fa-triangle-exclamation" style={{ color: '#F59E0B', fontSize: '14px', marginTop: '1px', flexShrink: 0 }} />
                <span style={{ color: '#1A1A2E', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(245, 166, 35, 0.06)', borderRadius: '10px', fontSize: '11px', color: '#92400E', lineHeight: 1.5 }}>
              <i className="fa-solid fa-info-circle" style={{ fontSize: '10px', marginRight: '4px' }} />
              Default triggers CP523 notice with a 30-day cure period before termination.
            </div>
          </div>

          {/* CTAs */}
          <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', background: '#1A1A2E', borderRadius: '16px', border: 'none',
              color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fa-solid fa-credit-card" style={{ fontSize: '13px' }} />
              Make a Payment
            </button>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', background: 'white', borderRadius: '16px', border: '1.5px solid #D5D5E0',
              color: '#1A1A2E', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '13px' }} />
              View Payment History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
