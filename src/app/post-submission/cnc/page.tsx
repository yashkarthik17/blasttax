'use client'

import { useRouter } from 'next/navigation'

export default function CNCPostSubmissionPage() {
  const router = useRouter()

  const timelineItems = [
    { label: 'CNC Request Made', date: 'Mar 15', completed: true },
    { label: 'IRS Reviewed Financials (Form 433-F)', date: 'Mar 22', completed: true },
    { label: 'TC 530 Posted (Closing Code 03: Hardship)', date: 'Mar 25', completed: true },
    { label: 'Letter 4223 Mailed (Confirmation)', date: 'Mar 28', completed: true },
    { label: 'Next Annual Review', date: 'Mar 2027', completed: false },
  ]

  const effects = [
    { icon: 'fa-circle-check', color: '#00A651', label: 'Collection activity stopped', sub: null },
    { icon: 'fa-circle-check', color: '#00A651', label: 'CSED running', sub: 'Debt expires 2028-2031' },
    { icon: 'fa-triangle-exclamation', color: '#F59E0B', label: 'Interest accruing', sub: '~$150/month still adding up' },
    { icon: 'fa-triangle-exclamation', color: '#F59E0B', label: 'Tax refunds will be offset', sub: null },
    { icon: 'fa-triangle-exclamation', color: '#F59E0B', label: 'NFTL may be on file', sub: null },
  ]

  const warnings = [
    { icon: 'fa-exclamation-circle', text: 'If your income increases significantly, IRS may revoke CNC' },
    { icon: 'fa-eye', text: 'Annual review via W-2/1099 data matching' },
    { icon: 'fa-rotate-left', text: 'If revoked (TC 531): back to active collection' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '14px 20px', borderBottom: '1px solid #F0F0F5' }}>
          <button onClick={() => router.back()} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FAFAFF', border: '1px solid #F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ color: '#5C5C7A' }} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>CNC Status</span>
          <button style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FAFAFF', border: '1px solid #F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fa-solid fa-ellipsis-vertical" style={{ color: '#8585A0' }} />
          </button>
        </div>

        <div style={{ padding: '20px', paddingBottom: '20px' }}>
          {/* Title + Badge */}
          <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25, margin: 0 }}>Currently Not Collectible</h1>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'white', background: '#00A651', padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>Active</span>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            {timelineItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', position: 'relative', paddingBottom: i < timelineItems.length - 1 ? '20px' : 0 }}>
                {/* Connector */}
                {i < timelineItems.length - 1 && (
                  <div style={{ position: 'absolute', left: '15px', top: '32px', bottom: 0, width: '2px', background: item.completed ? '#00A651' : '#F0F0F5' }} />
                )}
                {/* Dot */}
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '13px', zIndex: 1,
                  background: item.completed ? '#E6F9EE' : '#EFF4FF',
                  color: item.completed ? '#00A651' : '#2563EB',
                }}>
                  <i className={`fa-solid ${item.completed ? 'fa-check' : 'fa-hourglass-half'}`} style={{ fontSize: item.completed ? '13px' : '11px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>{item.label}</p>
                  <p style={{ fontSize: '0.75rem', color: !item.completed ? '#2563EB' : '#5C5C7A', fontWeight: !item.completed ? 500 : 400, margin: 0, marginTop: '2px' }}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Effects Card */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', margin: '0 0 10px 0' }}>Active Effects</p>
              {effects.map((eff, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 0', borderBottom: i < effects.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                  <i className={`fa-solid ${eff.icon}`} style={{ color: eff.color, fontSize: '14px', marginTop: '2px' }} />
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: '#1A1A2E', fontWeight: 500, margin: 0 }}>{eff.label}</p>
                    {eff.sub && <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', margin: 0, marginTop: '2px' }}>{eff.sub}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSED Countdown */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ background: '#F0FDFA', border: '1px solid rgba(13,148,136,0.15)', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <i className="fa-solid fa-clock" style={{ color: '#0D9488', fontSize: '16px' }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>CSED Countdown</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0D9488' }}>2 yrs, 6 mo</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#5C5C7A', marginBottom: '12px', margin: '0 0 12px 0' }}>Nearest expiration: <span style={{ fontWeight: 600 }}>Sep 2028</span></p>
              <div style={{ width: '100%', height: '8px', background: '#D5D5E0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '4px', background: '#00A651', width: '75%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '0.625rem', color: '#8585A0' }}>Assessment</span>
                <span style={{ fontSize: '0.625rem', color: '#8585A0' }}>Expiration</span>
              </div>
              <div style={{ marginTop: '14px', padding: '10px 12px', background: 'white', borderRadius: '10px', border: '1px solid #F0F0F5' }}>
                <p style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 500, margin: 0 }}>
                  <i className="fa-solid fa-sparkles" style={{ color: '#0D9488', marginRight: '4px' }} />
                  When CSED expires: TC 608 posts, debt is legally gone
                </p>
              </div>
            </div>
          </div>

          {/* Risk Warnings */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5C5C7A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', margin: '0 0 10px 0' }}>Important Warnings</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {warnings.map((w, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: '#FFFBEB', border: '1px solid rgba(245, 166, 35, 0.2)', borderRadius: '12px' }}>
                  <i className={`fa-solid ${w.icon}`} style={{ color: '#D97706', fontSize: '14px', marginTop: '2px' }} />
                  <p style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 500, margin: 0 }}>{w.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ marginTop: '8px' }}>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', background: '#1A1A2E', borderRadius: '16px', border: 'none',
              color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fa-solid fa-pen-to-square" />
              Update Financial Info
            </button>
          </div>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <a href="#" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A2E', textDecoration: 'none' }}>
              <i className="fa-solid fa-clock" style={{ fontSize: '11px', marginRight: '4px' }} />
              Check CSED Status
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
