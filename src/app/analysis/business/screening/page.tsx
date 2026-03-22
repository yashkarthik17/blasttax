'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEBT_TYPES = [
  { id: '941', label: '941 Employment Tax', sub: 'Most common business tax debt' },
  { id: '940', label: '940 Federal Unemployment Tax', sub: '' },
  { id: '720', label: '720 Excise Tax', sub: '' },
  { id: '1120', label: '1120 Corporate Income Tax', sub: '' },
]

export default function BusinessScreeningPage() {
  const router = useRouter()
  const [operating, setOperating] = useState<boolean | null>(null)
  const [debtTypes, setDebtTypes] = useState<string[]>([])
  const [hasTFRP, setHasTFRP] = useState<boolean | null>(null)
  const [employeeCount, setEmployeeCount] = useState(0)
  const [depositsUpToDate, setDepositsUpToDate] = useState<boolean | null>(null)
  const [revenueOfficer, setRevenueOfficer] = useState<boolean | null>(null)

  function toggleDebtType(id: string) {
    setDebtTypes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px', flexShrink: 0 }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#D5D5E0', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '22%', borderRadius: '9999px', background: '#1A1A2E', transition: 'all 0.3s' }} />
          </div>
          <p style={{ fontSize: '0.6875rem', color: '#8585A0', fontWeight: 600, marginTop: '6px' }}>Step 4 of 15</p>
        </div>

        <div style={{ padding: '0 20px', paddingBottom: '20px' }}>
          {/* Title */}
          <div style={{ marginTop: '16px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fa-solid fa-briefcase" style={{ fontSize: '13px', color: '#1A1A2E' }} />
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25 }}>Business Tax Information</h1>
            </div>
          </div>
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '0.8125rem', color: '#5C5C7A' }}>Additional questions for business tax debt</p>
          </div>

          {/* Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Q1: Business still operating? */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>Is your business still operating?</p>
              <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', marginBottom: '10px' }}>Affects which IA types are available</p>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid #F0F0F5', borderRadius: '10px', overflow: 'hidden', background: '#FAFAFF' }}>
                <button
                  onClick={() => setOperating(true)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: operating === true ? '#00A651' : '#5C5C7A', background: operating === true ? '#E6F9EE' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease', borderRight: '1px solid #F0F0F5' }}
                >Yes</button>
                <button
                  onClick={() => setOperating(false)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: operating === false ? '#E63946' : '#5C5C7A', background: operating === false ? '#FFF0F1' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease' }}
                >No</button>
              </div>
            </div>

            {/* Q2: Type of business tax debt */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>What type of business tax debt?</p>
              <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', marginBottom: '10px' }}>Select all that apply</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {DEBT_TYPES.map((dt) => (
                  <div
                    key={dt.id}
                    onClick={() => toggleDebtType(dt.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.25s ease' }}
                  >
                    <div style={{
                      width: '22px', height: '22px', border: debtTypes.includes(dt.id) ? '2px solid #1A1A2E' : '2px solid #F0F0F5',
                      borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      background: debtTypes.includes(dt.id) ? '#1A1A2E' : 'transparent', transition: 'all 0.25s ease'
                    }}>
                      {debtTypes.includes(dt.id) && <i className="fa-solid fa-check" style={{ fontSize: '10px', color: 'white' }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A2E' }}>{dt.label}</p>
                      {dt.sub && <p style={{ fontSize: '0.6875rem', color: '#5C5C7A' }}>{dt.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q3: TFRP */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>Do you have Trust Fund Recovery Penalty (TFRP)?</p>
              <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', marginBottom: '10px' }}>TC 246 on your personal transcript?</p>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid #F0F0F5', borderRadius: '10px', overflow: 'hidden', background: '#FAFAFF', marginBottom: '10px' }}>
                <button
                  onClick={() => setHasTFRP(true)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: hasTFRP === true ? '#00A651' : '#5C5C7A', background: hasTFRP === true ? '#E6F9EE' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease', borderRight: '1px solid #F0F0F5' }}
                >Yes</button>
                <button
                  onClick={() => setHasTFRP(false)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: hasTFRP === false ? '#E63946' : '#5C5C7A', background: hasTFRP === false ? '#FFF0F1' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease' }}
                >No</button>
              </div>
              {hasTFRP === true && (
                <div style={{ padding: '10px 12px', background: '#FFF0F1', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '10px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E63946', fontSize: '13px', marginTop: '2px' }} />
                    <p style={{ fontSize: '0.75rem', color: '#991B1B', fontWeight: 500 }}>TFRP makes you <strong>PERSONALLY</strong> liable for trust fund portion</p>
                  </div>
                </div>
              )}
            </div>

            {/* Q4: Number of employees */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '10px' }}>Number of employees currently?</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setEmployeeCount(Math.max(0, employeeCount - 1))}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #F0F0F5', background: 'white', color: '#1A1A2E', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', transition: 'all 0.2s ease' }}
                >
                  <i className="fa-solid fa-minus" style={{ fontSize: '12px' }} />
                </button>
                <input
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '80px', padding: '8px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.875rem', fontWeight: 600, color: '#1A1A2E', textAlign: 'center', outline: 'none' }}
                />
                <button
                  onClick={() => setEmployeeCount(employeeCount + 1)}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid #F0F0F5', background: 'white', color: '#1A1A2E', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', transition: 'all 0.2s ease' }}
                >
                  <i className="fa-solid fa-plus" style={{ fontSize: '12px' }} />
                </button>
              </div>
            </div>

            {/* Q5: Payroll deposits */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>Are current payroll deposits up to date?</p>
              <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', marginBottom: '10px' }}>Required for OIC and most IAs</p>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid #F0F0F5', borderRadius: '10px', overflow: 'hidden', background: '#FAFAFF' }}>
                <button
                  onClick={() => setDepositsUpToDate(true)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: depositsUpToDate === true ? '#00A651' : '#5C5C7A', background: depositsUpToDate === true ? '#E6F9EE' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease', borderRight: '1px solid #F0F0F5' }}
                >Yes</button>
                <button
                  onClick={() => setDepositsUpToDate(false)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: depositsUpToDate === false ? '#E63946' : '#5C5C7A', background: depositsUpToDate === false ? '#FFF0F1' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease' }}
                >No</button>
              </div>
            </div>

            {/* Q6: Revenue Officer */}
            <div style={{ padding: '16px', background: '#FFFFFF', border: '1.5px solid #F0F0F5', borderRadius: '14px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>Has a Revenue Officer been assigned?</p>
              <p style={{ fontSize: '0.6875rem', color: '#5C5C7A', marginBottom: '10px' }}>TC 971 AC 044 on transcript. If yes: &gt;$250K or complex case</p>
              <div style={{ display: 'flex', gap: 0, border: '1.5px solid #F0F0F5', borderRadius: '10px', overflow: 'hidden', background: '#FAFAFF' }}>
                <button
                  onClick={() => setRevenueOfficer(true)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: revenueOfficer === true ? '#00A651' : '#5C5C7A', background: revenueOfficer === true ? '#E6F9EE' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease', borderRight: '1px solid #F0F0F5' }}
                >Yes</button>
                <button
                  onClick={() => setRevenueOfficer(false)}
                  style={{ flex: 1, padding: '8px 16px', fontSize: '0.8125rem', fontWeight: 600, color: revenueOfficer === false ? '#E63946' : '#5C5C7A', background: revenueOfficer === false ? '#FFF0F1' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.25s ease' }}
                >No</button>
              </div>
            </div>

          </div>

          {/* Info Banner */}
          <div style={{ marginTop: '18px', marginBottom: '20px' }}>
            <div style={{ padding: '12px 14px', background: '#EFF4FF', border: '1px solid rgba(10,22,40,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <i className="fa-solid fa-info-circle" style={{ color: '#1A1A2E', fontSize: '14px', marginTop: '2px' }} />
              <p style={{ fontSize: '0.75rem', color: '#1A1A2E', fontWeight: 500 }}>Business debt requires <strong>Form 433-B</strong> in addition to Form 433-A</p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => router.push('/analysis/business/entity-type')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#1A1A2E', color: 'white', fontSize: '0.9375rem', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Continue
            <i className="fa-solid fa-arrow-right" style={{ fontSize: '12px' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
