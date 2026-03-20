'use client'

import Link from 'next/link'

const payments = [
  { name: 'Pro Plan \u2014 Monthly', date: 'Mar 15, 2026', amount: '$49.00', status: 'Paid', iconBg: '#E6F9EE', iconColor: '#00A651', badgeBg: '#E6F9EE', badgeColor: '#00A651', icon: 'fa-check' },
  { name: 'Pro Plan \u2014 Monthly', date: 'Feb 15, 2026', amount: '$49.00', status: 'Paid', iconBg: '#E6F9EE', iconColor: '#00A651', badgeBg: '#E6F9EE', badgeColor: '#00A651', icon: 'fa-check' },
  { name: 'Pro Plan \u2014 Monthly', date: 'Jan 15, 2026', amount: '$49.00', status: 'Paid', iconBg: '#E6F9EE', iconColor: '#00A651', badgeBg: '#E6F9EE', badgeColor: '#00A651', icon: 'fa-check' },
  { name: 'Pro Plan \u2014 Monthly', date: 'Apr 15, 2026', amount: '$49.00', status: 'Pending', iconBg: '#FEF3C7', iconColor: '#D97706', badgeBg: '#FEF3C7', badgeColor: '#D97706', icon: 'fa-clock' },
]

export default function BillingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A1628' }}>Billing</div>
          <button style={{ width: 40, height: 40, borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}>
            <i className="fas fa-gear" style={{ fontSize: 14, color: '#64748B' }} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '0 20px', paddingBottom: 20 }}>
          {/* Current Plan Card */}
          <div style={{ background: '#FFFFFF', border: '1.5px solid #0A1628', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#0A1628' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Plan</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A1628', marginTop: 2 }}>Pro Plan</div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 12px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 700, color: '#00A651' }}>
                <i className="fas fa-circle" style={{ fontSize: 5 }} /> Active
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0A1628' }}>$49</span>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500 }}>/month</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
              <i className="far fa-calendar" style={{ fontSize: 11, color: '#94A3B8' }} />
              Next billing: April 15, 2026
            </div>
          </div>

          {/* Quick Stats Row */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Paid</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A1628', marginTop: 4 }}>$294</div>
            </div>
            <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Upcoming</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563EB', marginTop: 4 }}>$49</div>
            </div>
            <div style={{ flex: 1, background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Method</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A1628', marginTop: 4 }}>
                <i className="fab fa-cc-visa" style={{ color: '#1A1F71' }} />
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Payment History</div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '4px 16px' }}>
              {payments.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: i < payments.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: p.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fas ${p.icon}`} style={{ fontSize: 12, color: p.iconColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>{p.name}</div>
                    <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: 1 }}>{p.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628' }}>{p.amount}</div>
                    <div style={{ display: 'inline-flex', padding: '2px 8px', background: p.badgeBg, borderRadius: 9999, fontSize: '0.6rem', fontWeight: 600, color: p.badgeColor, marginTop: 2 }}>{p.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Payment Method</div>
            <div style={{ background: '#0A1628', borderRadius: 16, padding: 20, color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                <i className="fab fa-cc-visa" style={{ fontSize: 28, color: 'white', opacity: 0.9 }} />
                <div style={{ display: 'flex', gap: 3 }}>
                  <div style={{ width: 24, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                  <div style={{ width: 24, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', marginLeft: -10 }} />
                </div>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                <span style={{ opacity: 0.5 }}>****</span>
                <span style={{ opacity: 0.5, marginLeft: 8 }}>****</span>
                <span style={{ opacity: 0.5, marginLeft: 8 }}>****</span>
                <span style={{ marginLeft: 8 }}>4242</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Card Holder</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, marginTop: 2 }}>Jane Doe</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expires</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, marginTop: 2 }}>08/28</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <a href="#" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}>Change payment method</a>
            </div>
          </div>

          {/* View Plans Button */}
          <div style={{ paddingTop: 4 }}>
            <Link href="/billing/plans" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '14px 28px', background: 'white', color: '#0A1628', border: '1.5px solid #E2E8F0', borderRadius: 9999, fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', boxSizing: 'border-box' }}>
              <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 12 }} />
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
