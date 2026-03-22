'use client'

import { useRouter } from 'next/navigation'

export default function OICPostSubmissionPage() {
  const router = useRouter()

  const timeline = [
    { label: 'Day 0: OIC Submitted', desc: 'Mar 15 \u2014 Certified mail', done: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Wk 1-3: Processability Review', desc: 'Passed \u2014 Mar 28', done: true, current: false, pending: false, icon: 'fa-check', descGreen: true },
    { label: 'TC 480 Posted \u2014 CSED Tolled', desc: 'Mar 28 \u2014 Collection statute paused', done: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Letter 3756 Received', desc: 'Apr 5 \u2014 24-month clock started', done: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Routed to COIC', desc: 'Apr 20 \u2014 Brookhaven, NY', done: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Mo 2-6: Examiner Assignment', desc: 'Letter 4450 expected', done: false, current: true, pending: false, icon: 'fa-hourglass-half' },
    { label: 'Mo 3-12: Investigation Phase', desc: 'Examiner reviews financials', done: false, current: false, pending: true, icon: 'fa-magnifying-glass' },
    { label: 'Mo 6-18: Decision', desc: 'Accept, reject, or counteroffer', done: false, current: false, pending: true, icon: 'fa-gavel' },
  ]

  const reminders = [
    { text: 'Stay current on all tax filings', warning: true, muted: false },
    { text: 'Continue periodic payments (not refunded if rejected)', warning: true, muted: false },
    { text: 'Respond to all IRS requests within deadlines', warning: true, muted: false },
    { text: 'Refunds will be offset (TC 826)', warning: true, muted: true },
    { text: 'No levy while TC 480 active', success: true, muted: false },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '14px 20px', borderBottom: '1px solid #F0F0F5' }}>
          <button onClick={() => router.back()} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FAFAFF', border: '1px solid #F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ color: '#5C5C7A' }} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A2E' }}>OIC Status</span>
          <div style={{ width: '40px' }} />
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '20px', paddingBottom: '24px' }}>
          {/* Title */}
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', margin: 0, marginBottom: '6px' }}>Your Offer in Compromise</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '9999px', background: '#EFF4FF', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: '#2563EB' }}>
                <i className="fa-solid fa-clock" style={{ fontSize: '8px' }} /> In Review
              </span>
              <span style={{ fontSize: '12px', color: '#5C5C7A' }}>DATC &mdash; $8,500</span>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ borderRadius: '16px', background: 'white', border: '1px solid #F0F0F5', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>Lifecycle Timeline</div>
            {timeline.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', position: 'relative', paddingBottom: i < timeline.length - 1 ? '14px' : 0 }}>
                {i < timeline.length - 1 && (
                  <div style={{ position: 'absolute', left: '14px', top: '32px', bottom: 0, width: '2px', background: step.done ? '#00A651' : '#F0F0F5' }} />
                )}
                <div style={{
                  position: 'relative', zIndex: 1, width: '30px', height: '30px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: step.done ? '#00A651' : step.current ? '#2563EB' : '#FAFAFF',
                  color: step.done || step.current ? 'white' : '#B0B0C8',
                  border: step.pending ? '2px solid #F0F0F5' : 'none',
                  fontSize: '11px',
                }}>
                  <i className={`fa-solid ${step.icon}`} style={{ fontSize: '10px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: step.pending ? 600 : 700, color: step.current ? '#2563EB' : step.pending ? '#8585A0' : '#1A1A2E' }}>{step.label}</div>
                  <div style={{ fontSize: '10px', color: step.descGreen ? '#00A651' : step.pending ? '#B0B0C8' : '#5C5C7A', fontWeight: step.descGreen ? 600 : 400 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Status Pulse */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
            background: '#EFF4FF', border: '1.5px solid rgba(37, 99, 235, 0.15)', borderRadius: '14px', width: '100%',
            boxSizing: 'border-box',
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="fa-solid fa-satellite-dish" style={{ color: 'white', fontSize: '16px' }} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>Awaiting Examiner Assignment</div>
              <div style={{ fontSize: '11px', color: '#5C5C7A', marginTop: '2px' }}>24-month deadline: <strong>Apr 5, 2028</strong></div>
              <div style={{ fontSize: '10px', color: '#2563EB', fontWeight: 600, marginTop: '2px' }}>
                If no decision by then: Deemed Accepted (IRC &sect; 7122(f))
              </div>
            </div>
          </div>

          {/* During Review Reminders */}
          <div style={{ borderRadius: '16px', background: 'white', border: '1px solid #F0F0F5', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              <i className="fa-solid fa-bell" style={{ fontSize: '10px', marginRight: '4px' }} />
              During Review Reminders
            </div>
            {reminders.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '7px 0', fontSize: '12px', lineHeight: 1.5 }}>
                <i className={`fa-solid ${item.success ? 'fa-circle-check' : 'fa-triangle-exclamation'}`} style={{ color: item.success ? '#00A651' : '#F59E0B', fontSize: '13px', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontWeight: 500, color: item.muted ? '#5C5C7A' : '#1A1A2E' }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', background: '#2563EB', borderRadius: '16px', border: 'none',
              color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: '13px' }} />
              View Documents
            </button>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '16px', background: 'white', borderRadius: '16px', border: '1.5px solid #D5D5E0',
              color: '#1A1A2E', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <i className="fa-solid fa-comment-dots" style={{ fontSize: '13px' }} />
              Message Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
