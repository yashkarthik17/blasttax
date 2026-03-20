'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form12153Page() {
  const { answers } = useWizard()

  const [phone, setPhone] = useState(answers.phone ?? '(512) 555-0198')
  const [hearingType, setHearingType] = useState<'cdp' | 'equivalent'>('cdp')
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022'])
  const [quarter, setQuarter] = useState('Annual (1040)')
  const [taxType, setTaxType] = useState('Income Tax')
  const [noticeNumber, setNoticeNumber] = useState('LT11')
  const [noticeType, setNoticeType] = useState('LT11 — Final Notice of Intent to Levy')
  const [noticeDate, setNoticeDate] = useState('2026-03-01')
  const [issues, setIssues] = useState([true, false, false, false, false, false, false])
  const [otherText, setOtherText] = useState('')

  const issueLabels = [
    'I want to set up an installment agreement',
    'I want to make an offer in compromise',
    'I am currently not collectible',
    'The statute of limitations has expired',
    'I received a substitute return (SFR) and want to file my own',
    'I want to raise an innocent spouse claim',
    'Other',
  ]

  function toggleYear(year: string) {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year])
  }

  function toggleIssue(idx: number) {
    setIssues(prev => prev.map((v, i) => i === idx ? !v : v))
  }

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1.5px solid #F1F5F9',
    borderRadius: 10, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: '#0A1628',
    outline: 'none', boxSizing: 'border-box',
  }

  const selectArrow = "url(\"data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8, paddingBottom: 20 }}>
      {/* Progress Steps */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 24, height: 8, borderRadius: 9999, background: '#2563EB' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F1F5F9' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F1F5F9' }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>Step 1 of 3</span>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 6 }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.3, margin: 0 }}>
          Request a Collection Due Process Hearing
        </h1>
        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 6, lineHeight: 1.5, margin: '6px 0 0 0' }}>
          You have 30 days from the date of your notice to request a CDP hearing
        </p>
      </div>

      {/* Taxpayer Information (Lines 1-3) */}
      <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-user" style={{ fontSize: 14, color: '#2563EB' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Taxpayer Information</span>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Full Name (Line 1)</label>
          <div style={{ ...fieldInputStyle, background: '#F8FAFC', borderColor: '#F3F4F6', position: 'relative' }}>
            Jane M. Doe
            <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 11 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>SSN / EIN (Line 2)</label>
            <div style={{ ...fieldInputStyle, background: '#F8FAFC', borderColor: '#F3F4F6', letterSpacing: '0.03em' }}>
              ***-**-4589
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Phone Number</label>
            <input type="tel" style={fieldInputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Address (Line 3)</label>
          <div style={{ ...fieldInputStyle, background: '#F8FAFC', borderColor: '#F3F4F6', position: 'relative' }}>
            1234 Elm Street, Austin, TX 78701
            <i className="fas fa-lock" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 11 }} />
          </div>
        </div>
      </div>

      {/* CDP vs. Equivalent Hearing */}
      <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-scale-balanced" style={{ fontSize: 14, color: '#2563EB' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Hearing Type</span>
        </div>

        {/* CDP Option */}
        <button
          type="button"
          onClick={() => setHearingType('cdp')}
          style={{
            display: 'flex', gap: 12, padding: 14,
            background: hearingType === 'cdp' ? '#EBF0FF' : 'white',
            border: hearingType === 'cdp' ? '1.5px solid #0A1628' : '1.5px solid #F1F5F9',
            borderRadius: 14, marginBottom: 8, cursor: 'pointer', width: '100%', textAlign: 'left' as const,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${hearingType === 'cdp' ? '#0A1628' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1, background: hearingType === 'cdp' ? '#0A1628' : 'transparent',
          }}>
            {hearingType === 'cdp' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>
              CDP Hearing <span style={{ display: 'inline-flex', padding: '2px 6px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#00A651', marginLeft: 4 }}>WITHIN 30 DAYS</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.5 }}>
              <div style={{ marginBottom: 2 }}><i className="fa-solid fa-check" style={{ fontSize: 8, color: '#00A651', marginRight: 4 }} /> Collection <strong>suspended</strong> during hearing</div>
              <div style={{ marginBottom: 2 }}><i className="fa-solid fa-check" style={{ fontSize: 8, color: '#00A651', marginRight: 4 }} /> CSED <strong>tolled</strong> (clock pauses)</div>
              <div><i className="fa-solid fa-check" style={{ fontSize: 8, color: '#00A651', marginRight: 4 }} /> <strong>Tax Court rights</strong> if you disagree</div>
            </div>
          </div>
        </button>

        {/* Equivalent Hearing Option */}
        <button
          type="button"
          onClick={() => setHearingType('equivalent')}
          style={{
            display: 'flex', gap: 12, padding: 14,
            background: hearingType === 'equivalent' ? '#EBF0FF' : 'white',
            border: hearingType === 'equivalent' ? '1.5px solid #0A1628' : '1.5px solid #F1F5F9',
            borderRadius: 14, cursor: 'pointer', width: '100%', textAlign: 'left' as const,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{
            width: 22, height: 22, border: `2px solid ${hearingType === 'equivalent' ? '#0A1628' : '#D5D5E0'}`,
            borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 1, background: hearingType === 'equivalent' ? '#0A1628' : 'transparent',
          }}>
            {hearingType === 'equivalent' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>
              Equivalent Hearing <span style={{ display: 'inline-flex', padding: '2px 6px', background: '#FFF0F1', borderRadius: 9999, fontSize: '0.58rem', fontWeight: 700, color: '#E63946', marginLeft: 4 }}>AFTER 30 DAYS</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.5 }}>
              <div style={{ marginBottom: 2 }}><i className="fa-solid fa-xmark" style={{ fontSize: 8, color: '#E63946', marginRight: 4 }} /> Collection <strong>NOT suspended</strong></div>
              <div style={{ marginBottom: 2 }}><i className="fa-solid fa-xmark" style={{ fontSize: 8, color: '#E63946', marginRight: 4 }} /> CSED <strong>NOT tolled</strong></div>
              <div><i className="fa-solid fa-xmark" style={{ fontSize: 8, color: '#E63946', marginRight: 4 }} /> <strong>No Tax Court rights</strong></div>
            </div>
          </div>
        </button>
      </div>

      {/* Tax Periods & Type (Line 4) */}
      <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-calendar-days" style={{ fontSize: 14, color: '#00A651' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Tax Periods (Line 4)</span>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Tax Year(s)</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['2023', '2022', '2021', '2020'].map(year => (
              <button
                key={year}
                type="button"
                onClick={() => toggleYear(year)}
                style={{
                  padding: '6px 12px',
                  background: selectedYears.includes(year) ? '#0A1628' : '#F8FAFC',
                  color: selectedYears.includes(year) ? 'white' : '#0A1628',
                  border: `1.5px solid ${selectedYears.includes(year) ? '#0A1628' : '#F3F4F6'}`,
                  borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >{year}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Quarter (if applicable)</label>
            <select
              style={{
                ...fieldInputStyle, appearance: 'none' as const, backgroundImage: selectArrow,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32,
              }}
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              <option>Annual (1040)</option><option>Q1 (Jan-Mar)</option><option>Q2 (Apr-Jun)</option><option>Q3 (Jul-Sep)</option><option>Q4 (Oct-Dec)</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Tax Type</label>
            <select
              style={{
                ...fieldInputStyle, appearance: 'none' as const, backgroundImage: selectArrow,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32,
              }}
              value={taxType}
              onChange={(e) => setTaxType(e.target.value)}
            >
              <option>Income Tax</option><option>Employment Tax</option><option>Excise Tax</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Notice Number / Letter</label>
          <input type="text" style={fieldInputStyle} placeholder="e.g., LT11, Letter 1058, CP504" value={noticeNumber} onChange={(e) => setNoticeNumber(e.target.value)} />
        </div>
      </div>

      {/* Notice Information */}
      <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-envelope-open-text" style={{ fontSize: 14, color: '#F59E0B' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Notice Information</span>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Notice Type</label>
          <select
            style={{
              ...fieldInputStyle, appearance: 'none' as const, backgroundImage: selectArrow,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 32,
            }}
            value={noticeType}
            onChange={(e) => setNoticeType(e.target.value)}
          >
            <option>LT11 &mdash; Final Notice of Intent to Levy</option>
            <option>Letter 1058 &mdash; Final Notice</option>
            <option>CP504 &mdash; Intent to Levy</option>
            <option>Letter 3172 &mdash; Notice of Federal Tax Lien</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Date of Notice</label>
            <input type="date" style={fieldInputStyle} value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 9999,
              fontSize: 13, fontWeight: 700, background: '#FFFBEB', color: '#92400E', border: '1px solid rgba(245,166,35,0.15)',
            }}>
              <i className="fa-solid fa-clock" style={{ fontSize: 12 }} />
              <span>15 days remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Issues to Raise */}
      <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-list-check" style={{ fontSize: 14, color: '#2563EB' }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Issues to Raise at Hearing</span>
        </div>

        {issueLabels.map((label, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleIssue(idx)}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0',
              borderBottom: idx < issueLabels.length - 1 ? '1px solid #F1F5F9' : 'none',
              width: '100%', textAlign: 'left' as const, background: 'none', border: 'none',
              borderBottomStyle: idx < issueLabels.length - 1 ? 'solid' : undefined,
              borderBottomWidth: idx < issueLabels.length - 1 ? 1 : undefined,
              borderBottomColor: idx < issueLabels.length - 1 ? '#F1F5F9' : undefined,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 22, height: 22, border: `2px solid ${issues[idx] ? '#2563EB' : '#F1F5F9'}`,
              borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 1, background: issues[idx] ? '#2563EB' : 'transparent', transition: 'all 0.2s ease',
            }}>
              {issues[idx] && <i className="fas fa-check" style={{ fontSize: 11, color: 'white' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>{label}</div>
              {idx === 6 && issues[6] && (
                <textarea
                  style={{
                    marginTop: 8, width: '100%', padding: '10px 12px', background: '#F8FAFC',
                    border: '1.5px solid #F1F5F9', borderRadius: 10, fontFamily: 'inherit', fontSize: 13,
                    color: '#0A1628', outline: 'none', resize: 'vertical', minHeight: 60, boxSizing: 'border-box',
                  }}
                  placeholder="Describe the issue you want to raise..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Important Notice */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#E6F9EE', border: '1px solid rgba(0,166,81,0.15)', borderRadius: 14 }}>
        <i className="fa-solid fa-shield-halved" style={{ fontSize: 14, color: '#00A651', flexShrink: 0 }} />
        <span style={{ fontSize: '0.78rem', color: '#065F46' }}><strong>Important:</strong> Filing a CDP request stops levy action while your hearing is pending</span>
      </div>

      {/* Continue */}
      <div style={{ padding: '12px 0 20px' }}>
        <button
          style={{
            width: '100%', padding: '16px 28px', background: '#00A651', borderRadius: 9999,
            color: 'white', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 13, marginLeft: 4 }} />
        </button>
      </div>
    </div>
  )
}
