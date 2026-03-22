'use client'

import { useState, useMemo } from 'react'
import { useWizard } from '@/hooks/useWizard'

const FPL_THRESHOLDS: Record<number, number> = { 1: 39900, 2: 54100, 3: 68300, 4: 82500, 5: 96700, 6: 110900 }
const FPL_PER_ADDITIONAL = 14200

function getFPL(size: number) {
  if (size <= 6) return FPL_THRESHOLDS[size]
  return FPL_THRESHOLDS[6] + (size - 6) * FPL_PER_ADDITIONAL
}

export default function Form656APage() {
  const { answers, caseId } = useWizard()

  const [householdSize, setHouseholdSize] = useState(answers.familySize ?? 1)
  const [incomes, setIncomes] = useState<string[]>(['$6,250'])
  const [certify, setCertify] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [generating, setGenerating] = useState(false)

  function adjustHousehold(delta: number) {
    const newSize = Math.max(1, Math.min(10, householdSize + delta))
    setHouseholdSize(newSize)
    if (newSize > incomes.length) {
      setIncomes([...incomes, ...Array(newSize - incomes.length).fill('$0')])
    } else {
      setIncomes(incomes.slice(0, newSize))
    }
  }

  const totalMonthly = useMemo(() => {
    return incomes.reduce((sum, val) => sum + (parseInt(val.replace(/[^0-9]/g, '')) || 0), 0)
  }, [incomes])

  const annualIncome = totalMonthly * 12
  const threshold = getFPL(householdSize)
  const qualified = annualIncome <= threshold

  function updateIncome(idx: number, val: string) {
    setIncomes(prev => prev.map((v, i) => i === idx ? val : v))
  }

  const memberLabels = ['You (Taxpayer)', 'Spouse', 'Member 3', 'Member 4', 'Member 5', 'Member 6', 'Member 7', 'Member 8', 'Member 9', 'Member 10']
  const memberIcons = ['fa-user', 'fa-user-group', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user', 'fa-user']
  const memberIconBgs = ['#EFF4FF', '#F5F0FF', '#F0FDFA', '#F0FDFA', '#F0FDFA', '#F0FDFA', '#F0FDFA', '#F0FDFA', '#F0FDFA', '#F0FDFA']
  const memberIconColors = ['#2563EB', '#7C3AED', '#0D9488', '#0D9488', '#0D9488', '#0D9488', '#0D9488', '#0D9488', '#0D9488', '#0D9488']

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-656a' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-656A-Income-Certification.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px', paddingBottom: '20px' }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Income Certification</div>
        <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: '4px', lineHeight: 1.5 }}>OIC Application Fee &amp; Payment Waiver</div>
      </div>

      {/* Info banner */}
      <div onClick={() => setInfoOpen(!infoOpen)} style={{ background: '#F5F0FF', borderRadius: '14px', border: '1px solid rgba(124,58,237,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-lightbulb" style={{ fontSize: '12px', color: '#7C3AED' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.78rem', fontWeight: 600, color: '#5C5C7A' }}>What is this form for?</div>
          <i className="fas fa-chevron-down" style={{ fontSize: '10px', color: '#B0B0C8', transition: 'transform 0.3s ease', transform: infoOpen ? 'rotate(180deg)' : 'none' }} />
        </div>
        {infoOpen && (
          <div style={{ padding: '0 14px 12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#8585A0', lineHeight: 1.6 }}>
              If your household income is at or below <strong style={{ color: '#5C5C7A' }}>250% of the Federal Poverty Level</strong>, the IRS waives the $205 application fee and the 20% initial payment requirement. Form 656-A certifies your eligibility.
            </div>
          </div>
        )}
      </div>

      {/* Household Size */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Household Size</div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Number of people in household</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => adjustHousehold(-1)} type="button" style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <i className="fas fa-minus" style={{ fontSize: '10px', color: '#5C5C7A' }} />
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1A1A2E', minWidth: '20px', textAlign: 'center' }}>{householdSize}</span>
              <button onClick={() => adjustHousehold(1)} type="button" style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#1A1A2E', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <i className="fas fa-plus" style={{ fontSize: '10px', color: 'white' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gross Monthly Income */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Gross Monthly Income</div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {incomes.map((val, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: idx < incomes.length - 1 ? '1px solid #FAFAFF' : 'none' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: memberIconBgs[idx], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={`fas ${memberIcons[idx]}`} style={{ fontSize: '10px', color: memberIconColors[idx] }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{memberLabels[idx]}</div>
              </div>
              <div style={{ width: '100px' }}>
                <input type="text" value={val} onChange={(e) => updateIncome(idx, e.target.value)} style={{ width: '100%', textAlign: 'right', padding: '8px 10px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          ))}
          {/* Total */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0 0', marginTop: '8px', borderTop: '1.5px solid #F0F0F5' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Total Gross Monthly</span>
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#1A1A2E' }}>${totalMonthly.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0 0' }}>
            <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Annual Income</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A2E' }}>${annualIncome.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* FPL Comparison Table */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>250% Federal Poverty Level (2026)</div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '14px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {[1,2,3,4,5,6].map(size => {
            const isActive = size === Math.min(householdSize, 6)
            const displaySize = isActive && householdSize > 6 ? householdSize : size
            const displayThreshold = getFPL(displaySize)
            return (
              <div key={size} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px',
                background: isActive ? '#EBF0FF' : 'transparent',
                borderRadius: isActive ? '10px' : '0',
                borderBottom: isActive ? 'none' : '1px solid #FAFAFF',
                margin: isActive ? '4px 0' : '0',
              }}>
                {isActive ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB' }}>{displaySize} person{displaySize > 1 ? 's' : ''}</span>
                    <i className="fas fa-arrow-left" style={{ fontSize: '8px', color: '#2563EB' }} />
                  </div>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: '#5C5C7A' }}>{size} person{size > 1 ? 's' : ''}</span>
                )}
                <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 700 : 600, color: '#1A1A2E' }}>${displayThreshold.toLocaleString()}</span>
              </div>
            )
          })}
          <div style={{ padding: '8px 14px', fontSize: '0.65rem', color: '#8585A0' }}>
            Each additional person: +$14,200
          </div>
        </div>
      </div>

      {/* Determination Result */}
      <div style={{
        borderRadius: '16px', padding: '20px', textAlign: 'center', transition: 'all 0.5s ease',
        background: qualified ? 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' : '#FAFAFF',
        border: qualified ? '1.5px solid rgba(0,166,81,0.2)' : '1.5px solid #E8E8F0',
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: qualified ? '#E6F9EE' : '#F0F0F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
        }}>
          <i className={`fas ${qualified ? 'fa-check' : 'fa-times'}`} style={{ fontSize: '20px', color: qualified ? '#00A651' : '#8585A0' }} />
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: qualified ? '#00A651' : '#1A1A2E', marginBottom: '6px' }}>
          {qualified ? 'You qualify for fee waiver!' : 'You do not qualify for fee waiver'}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#8585A0', lineHeight: 1.5 }}>
          Your annual income of <strong style={{ color: '#1A1A2E' }}>${annualIncome.toLocaleString()}</strong> {qualified ? 'is at or below' : 'exceeds'} the 250% FPL threshold of <strong style={{ color: '#1A1A2E' }}>${threshold.toLocaleString()}</strong> for {householdSize} person{householdSize > 1 ? 's' : ''}.
        </div>
      </div>

      {/* Fees / Waivers */}
      {!qualified ? (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Fees Due with OIC Submission</div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>Application fee</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>$205</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: '#5C5C7A' }}>20% initial payment (Lump Sum)</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>$1,700</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>Waivers Applied</div>
          {[{ label: '$205 application fee waived', amount: '$205' }, { label: '20% initial payment waived', amount: '$1,700' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'white', borderRadius: '12px', marginBottom: '8px', border: '1px solid #D1FAE5' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-check" style={{ fontSize: '10px', color: '#00A651' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{item.label}</div>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00A651', textDecoration: 'line-through' }}>{item.amount}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certification */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #E8E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
          <input type="checkbox" id="certify656a" checked={certify} onChange={(e) => setCertify(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#1A1A2E', flexShrink: 0, marginTop: '2px' }} />
          <label htmlFor="certify656a" style={{ fontSize: '0.75rem', color: '#5C5C7A', lineHeight: 1.6, cursor: 'pointer' }}>
            I certify under penalties of perjury that the information provided above regarding my household income and size is true and correct. I understand that providing false information on this form may result in a $5,000 penalty.
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Signature</div>
            <div style={{ height: '44px', background: '#FAFAFF', border: '1.5px dashed #B0B0C8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#B0B0C8' }}>Tap to sign</span>
            </div>
          </div>
          <div style={{ width: '90px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#5C5C7A', marginBottom: '6px' }}>Date</div>
            <div style={{ background: '#FAFAFF', border: '1.5px solid #E8E8F0', borderRadius: '10px', padding: '10px 10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1A1A2E' }}>03/17/26</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
        <button onClick={handleGeneratePdf} disabled={generating || !certify} style={{
          padding: '16px', background: '#00A651', borderRadius: '9999px', textAlign: 'center', color: 'white',
          fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', border: 'none',
          cursor: (generating || !certify) ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
          opacity: (generating || !certify) ? 0.5 : 1,
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          {generating ? 'Generating...' : 'Continue'} {!generating && <i className="fas fa-arrow-right" style={{ marginLeft: '6px', fontSize: '12px' }} />}
        </button>
        <button style={{ padding: '12px', textAlign: 'center', color: '#8585A0', fontSize: '0.82rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
          <i className="fas fa-bookmark" style={{ marginRight: '6px', fontSize: '11px' }} /> Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
