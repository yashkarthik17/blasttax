'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEPOSIT_DATA = [
  { date: '01/15/2026', amount: '$4,250', status: 'Timely' },
  { date: '02/15/2026', amount: '$4,250', status: 'Timely' },
  { date: '03/15/2026', amount: '$0', status: 'Missing' },
]

export default function BusinessDepositsPage() {
  const router = useRouter()
  const [eftpsEnrolled, setEftpsEnrolled] = useState(false)
  const [schedule, setSchedule] = useState<'monthly' | 'semiweekly'>('monthly')
  const [nextDayRule, setNextDayRule] = useState(false)

  const toggleSwitchStyle = (checked: boolean): React.CSSProperties => ({
    width: '36px', height: '20px', appearance: 'none' as const, background: checked ? '#2563EB' : '#E2E8F0',
    borderRadius: '10px', position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0, border: 'none',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#E2E8F0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '22%', borderRadius: '9999px', background: '#0A1628', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>Step 2 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Deposit Compliance</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25 }}>Deposit Compliance</h1>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px', lineHeight: 1.5 }}>Operating businesses must be current on federal tax deposits.</p>
          </div>

          {/* Warning Alert */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#FEF2F2', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '14px', marginBottom: '14px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E63946' }} />
            <span style={{ fontSize: '12px', color: '#991B1B' }}>IRS will REJECT resolution if deposits are not current. This prevents &quot;pyramiding&quot; of new debt.</span>
          </div>

          {/* EFTPS Enrollment */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '12px' }}>
              <i className="fa-solid fa-building-columns" style={{ fontSize: '12px', color: '#2563EB' }} /> EFTPS Enrollment
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={eftpsEnrolled}
                onChange={() => setEftpsEnrolled(!eftpsEnrolled)}
                style={toggleSwitchStyle(eftpsEnrolled)}
              />
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>Enrolled in EFTPS (Electronic Federal Tax Payment System)?</span>
            </label>
            <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '8px', padding: '8px', background: '#F8FAFC', borderRadius: '8px' }}>If not enrolled, enroll at EFTPS.gov. PIN arrives by mail in 5-7 business days.</div>
          </div>

          {/* Depositor Schedule */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '12px' }}>
              <i className="fa-solid fa-calendar-check" style={{ fontSize: '12px', color: '#2563EB' }} /> Depositor Schedule
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                onClick={() => setSchedule('monthly')}
                style={{
                  flex: 1, justifyContent: 'center', padding: '10px', display: 'inline-flex', alignItems: 'center',
                  background: schedule === 'monthly' ? '#EFF4FF' : '#F8FAFC',
                  border: schedule === 'monthly' ? '1.5px solid #2563EB' : '1.5px solid #F1F5F9',
                  borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                  color: schedule === 'monthly' ? '#2563EB' : '#64748B', cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >Monthly</div>
              <div
                onClick={() => setSchedule('semiweekly')}
                style={{
                  flex: 1, justifyContent: 'center', padding: '10px', display: 'inline-flex', alignItems: 'center',
                  background: schedule === 'semiweekly' ? '#EFF4FF' : '#F8FAFC',
                  border: schedule === 'semiweekly' ? '1.5px solid #2563EB' : '1.5px solid #F1F5F9',
                  borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                  color: schedule === 'semiweekly' ? '#2563EB' : '#64748B', cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >Semi-Weekly</div>
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '8px', padding: '8px', background: '#F8FAFC', borderRadius: '8px' }}>Based on lookback period: If total 941 tax &gt; $50,000 (Jul 1 - Jun 30 two years prior), semi-weekly depositor.</div>
          </div>

          {/* Current Quarter Deposits */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0A1628', marginBottom: '12px' }}>
              <i className="fa-solid fa-table" style={{ fontSize: '12px', color: '#2563EB' }} /> Current Quarter Deposits
            </div>
            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  <th style={{ padding: '8px', textAlign: 'left' as const, fontWeight: 600, color: '#94A3B8' }}>Date</th>
                  <th style={{ padding: '8px', textAlign: 'right' as const, fontWeight: 600, color: '#94A3B8' }}>Amount</th>
                  <th style={{ padding: '8px', textAlign: 'center' as const, fontWeight: 600, color: '#94A3B8' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {DEPOSIT_DATA.map((d, i) => (
                  <tr key={i} style={{ borderBottom: i < DEPOSIT_DATA.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{d.date}</td>
                    <td style={{ padding: '8px', textAlign: 'right' as const, fontWeight: 600 }}>{d.amount}</td>
                    <td style={{ padding: '8px', textAlign: 'center' as const }}>
                      <span style={{
                        padding: '2px 8px',
                        background: d.status === 'Timely' ? '#E6F9EE' : '#FEF2F2',
                        color: d.status === 'Timely' ? '#00A651' : '#E63946',
                        borderRadius: '20px', fontSize: '10px', fontWeight: 700,
                      }}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '12px', padding: '10px', background: '#FEF2F2', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>Deposit Shortfall: $4,250</div>
              <div style={{ fontSize: '11px', color: '#991B1B', marginTop: '2px' }}>March deposit missing. Must be made before resolution can proceed.</div>
            </div>
          </div>

          {/* $100K Rule */}
          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-bolt" style={{ fontSize: '14px', color: '#F59E0B' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0A1628' }}>$100,000 Next-Day Rule</span>
                <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>If accumulated tax reaches $100,000+ on any day, deposit must be made by the next business day (IRC 6302).</p>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={nextDayRule}
                onChange={() => setNextDayRule(!nextDayRule)}
                style={toggleSwitchStyle(nextDayRule)}
              />
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>$100,000 next-day rule applies?</span>
            </label>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/business/trust-fund')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#0A1628', color: 'white', fontSize: '15px', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
