'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form843Page() {
  const { answers } = useWizard()

  const [phone, setPhone] = useState(answers.phone ?? '(512) 555-0198')
  const [taxPeriod, setTaxPeriod] = useState('2023')
  const [quarter, setQuarter] = useState('Annual')
  const [formNumber, setFormNumber] = useState('1040')
  const [refundAmount, setRefundAmount] = useState('$5,300')
  const [ftfDate, setFtfDate] = useState('2024-08-15')
  const [ftpDate, setFtpDate] = useState('2024-04-16')
  const [interestAbatement, setInterestAbatement] = useState(false)
  const [abatementType, setAbatementType] = useState<'fta' | 'reasonable'>('fta')
  const [reasonChecks, setReasonChecks] = useState<boolean[]>([false, false, false, false, false])
  const [explanation, setExplanation] = useState('')

  const reasons = ['Death or serious illness', 'Natural disaster', 'Unable to obtain records', 'IRS error or incorrect advice', 'Other']

  function toggleReason(idx: number) {
    setReasonChecks(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  const selectArrow = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8, paddingBottom: 20 }}>
      {/* Heading */}
      <div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em', lineHeight: 1.3 }}>Request Penalty Abatement</div>
        <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: 6, lineHeight: 1.5 }}>Select the type of abatement that best fits your situation.</div>
      </div>

      {/* Taxpayer Identification (Form 843 Lines 1-2) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Taxpayer Identification (Lines 1-2)</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Name (as shown on return)</div>
            <div style={{ padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600, color: '#0A1628', position: 'relative' }}>
              Jane M. Doe
              <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 11 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>SSN / EIN</div>
              <div style={{ padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600, color: '#0A1628', letterSpacing: '0.03em' }}>
                ***-**-4589
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Daytime Phone</div>
              <input
                type="tel"
                style={{ width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628', outline: 'none', boxSizing: 'border-box' }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Address</div>
            <div style={{ padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 10, fontSize: '0.85rem', fontWeight: 600, color: '#0A1628', position: 'relative' }}>
              1234 Elm Street, Austin, TX 78701
              <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 11 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tax Period & Form Info (Line 3) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Tax Period &amp; Form (Line 3)</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Tax Period(s)</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <select
                  style={{
                    flex: 1, padding: '10px 28px 10px 10px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
                    borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
                    outline: 'none', appearance: 'none' as const, backgroundImage: selectArrow,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                  }}
                  value={taxPeriod}
                  onChange={(e) => setTaxPeriod(e.target.value)}
                >
                  <option>2023</option><option>2022</option><option>2021</option><option>2020</option><option>2019</option>
                </select>
                <select
                  style={{
                    width: 70, padding: '10px 28px 10px 10px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
                    borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
                    outline: 'none', appearance: 'none' as const, backgroundImage: selectArrow,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
                  }}
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                >
                  <option>Annual</option><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Tax Form Number</div>
            <select
              style={{
                width: '100%', padding: '10px 28px 10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
                borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628',
                outline: 'none', boxSizing: 'border-box', appearance: 'none' as const, backgroundImage: selectArrow,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
              }}
              value={formNumber}
              onChange={(e) => setFormNumber(e.target.value)}
            >
              <option value="1040">1040 &mdash; Individual Income Tax</option>
              <option value="941">941 &mdash; Employer&apos;s Quarterly Federal Tax</option>
              <option value="940">940 &mdash; Employer&apos;s Annual FUTA Tax</option>
              <option value="1120">1120 &mdash; Corporation Income Tax</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B', marginBottom: 5 }}>Amount of Refund/Credit Claimed</div>
              <input
                type="text"
                style={{ width: '100%', padding: '10px 14px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 10, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, color: '#0A1628', outline: 'none', boxSizing: 'border-box' }}
                placeholder="$0"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dates Penalties Were Assessed */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Penalty Assessment Dates</div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          {[
            { label: 'Failure to File', color: '#E63946', date: ftfDate, setDate: setFtfDate, disabled: false },
            { label: 'Failure to Pay', color: '#F59E0B', date: ftpDate, setDate: setFtpDate, disabled: false },
            { label: 'Accuracy-Related', color: '#D5D5E0', date: '', setDate: () => {}, disabled: true },
          ].map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0',
              borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: p.disabled ? '#94A3B8' : '#0A1628' }}>{p.label}</span>
              </div>
              <input
                type="date"
                style={{
                  padding: '6px 10px', background: '#F8FAFC', border: '1.5px solid #F3F4F6', borderRadius: 8,
                  fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 600, color: p.disabled ? '#94A3B8' : '#0A1628', outline: 'none',
                }}
                value={p.date}
                onChange={(e) => p.setDate(e.target.value)}
                disabled={p.disabled}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interest Abatement Option */}
      <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Interest Abatement (IRC 6404(e))</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0' }}>
          <input type="checkbox" checked={interestAbatement} onChange={(e) => setInterestAbatement(e.target.checked)} style={{ width: 20, height: 20, marginTop: 2, flexShrink: 0, accentColor: '#0A1628' }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628', marginBottom: 4 }}>Request interest abatement</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.5 }}>Interest may be abated if it resulted from an IRS ministerial or managerial act (e.g., unreasonable delay in processing). Applies under IRC Section 6404(e).</div>
          </div>
        </div>
      </div>

      {/* Abatement Type Selection */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Abatement Type</div>

        {/* FTA */}
        <button
          type="button"
          onClick={() => setAbatementType('fta')}
          style={{
            padding: 18, background: abatementType === 'fta' ? '#EBF0FF' : 'white',
            border: abatementType === 'fta' ? '1.5px solid #0A1628' : '1.5px solid #F3F4F6',
            borderRadius: 16, marginBottom: 10, position: 'relative', overflow: 'hidden', width: '100%',
            textAlign: 'left' as const, cursor: 'pointer',
            boxShadow: abatementType === 'fta' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{
              width: 22, height: 22, border: `2px solid ${abatementType === 'fta' ? '#0A1628' : '#D5D5E0'}`,
              borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 2, background: abatementType === 'fta' ? '#0A1628' : 'transparent', transition: 'all 0.3s ease',
            }}>
              {abatementType === 'fta' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A1628' }}>First-Time Abatement (FTA)</span>
                <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.6rem', fontWeight: 700, color: '#00A651' }}>RECOMMENDED</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5 }}>Automatic if you have a clean 3-year compliance history. No additional documentation needed.</div>
            </div>
          </div>
        </button>

        {/* Reasonable Cause */}
        <button
          type="button"
          onClick={() => setAbatementType('reasonable')}
          style={{
            padding: 18, background: abatementType === 'reasonable' ? '#EBF0FF' : 'white',
            border: abatementType === 'reasonable' ? '1.5px solid #0A1628' : '1.5px solid #F3F4F6',
            borderRadius: 16, position: 'relative', width: '100%',
            textAlign: 'left' as const, cursor: 'pointer',
            boxShadow: abatementType === 'reasonable' ? '0 0 0 3px rgba(0,61,165,0.1)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{
              width: 22, height: 22, border: `2px solid ${abatementType === 'reasonable' ? '#0A1628' : '#D5D5E0'}`,
              borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 2, background: abatementType === 'reasonable' ? '#0A1628' : 'transparent', transition: 'all 0.3s ease',
            }}>
              {abatementType === 'reasonable' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0A1628' }}>Reasonable Cause</span>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5, marginTop: 4 }}>Provide evidence for why penalties should be removed due to circumstances beyond your control.</div>
            </div>
          </div>
        </button>
      </div>

      {/* Penalty Breakdown Card */}
      <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Penalty Breakdown</div>

        {[
          { label: 'Failure to File', color: '#E63946', amount: '$3,200', amountColor: '#E63946', muted: false },
          { label: 'Failure to Pay', color: '#F59E0B', amount: '$2,100', amountColor: '#F5A623', muted: false },
          { label: 'Accuracy-Related', color: '#D5D5E0', amount: '$0', amountColor: '#94A3B8', muted: true },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: p.muted ? '#94A3B8' : '#0A1628' }}>{p.label}</span>
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: p.amountColor }}>{p.amount}</span>
          </div>
        ))}

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0 4px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0A1628' }}>Total Penalties</span>
          <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#E63946', letterSpacing: '-0.01em' }}>$5,300</span>
        </div>
      </div>

      {/* Reasonable Cause Section (expandable) */}
      {abatementType === 'reasonable' && (
        <>
          {/* Reason Checkboxes */}
          <div style={{ background: 'white', borderRadius: 20, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Reason for Abatement</div>

            {reasons.map((reason, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleReason(idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px',
                  borderBottom: idx < reasons.length - 1 ? '1px solid #F1F5F9' : 'none',
                  width: '100%', textAlign: 'left' as const, background: 'none', border: 'none',
                  borderBottomStyle: idx < reasons.length - 1 ? 'solid' : undefined,
                  borderBottomWidth: idx < reasons.length - 1 ? 1 : undefined,
                  borderBottomColor: idx < reasons.length - 1 ? '#F1F5F9' : undefined,
                  cursor: 'pointer', transition: 'background 0.25s ease',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6, border: `2px solid ${reasonChecks[idx] ? '#0A1628' : '#D5D5E0'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: reasonChecks[idx] ? '#0A1628' : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                  {reasonChecks[idx] && <i className="fas fa-check" style={{ fontSize: 10, color: 'white' }} />}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0A1628' }}>{reason}</span>
              </button>
            ))}
          </div>

          {/* Explanation textarea */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Explanation</div>
            <textarea
              style={{
                width: '100%', minHeight: 100, padding: '14px 16px', background: '#F8FAFC', border: '1.5px solid #F3F4F6',
                borderRadius: 12, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 500, color: '#0A1628',
                resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              }}
              placeholder="Describe your circumstances and why penalties should be abated..."
              value={explanation}
              onChange={(e) => { if (e.target.value.length <= 500) setExplanation(e.target.value) }}
            />
            <div style={{ fontSize: '0.68rem', color: '#CBD5E1', marginTop: 6, textAlign: 'right' }}>{explanation.length} / 500 characters</div>
          </div>
        </>
      )}

      {/* Continue Button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
        <button
          style={{
            padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white',
            fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
        </button>
      </div>
    </div>
  )
}
