'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

export default function Form8857Page() {
  const { answers, caseId } = useWizard()

  const [reliefType, setReliefType] = useState<'innocent' | 'separation' | 'equitable'>('innocent')
  const [spouseName, setSpouseName] = useState('')
  const [spouseSsn, setSpouseSsn] = useState('')
  const [marriageDate, setMarriageDate] = useState('')
  const [separationDate, setSeparationDate] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>(['2021', '2022'])
  const [reason, setReason] = useState('')
  const [benefited, setBenefited] = useState<'yes' | 'no'>('no')
  const [generating, setGenerating] = useState(false)

  function toggleYear(year: string) {
    setSelectedYears(prev => prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year])
  }

  const reliefOptions = [
    { key: 'innocent' as const, title: 'Innocent Spouse Relief', irc: 'IRC 6015(b)', desc: "You didn't know about the error", detail: 'You may qualify if you filed a joint return with an understatement of tax that is attributable to erroneous items of your spouse.' },
    { key: 'separation' as const, title: 'Separation of Liability', irc: 'IRC 6015(c)', desc: 'Divide the tax between spouses', detail: 'Allocates the understatement of tax between you and your former spouse, assigning each person their share.' },
    { key: 'equitable' as const, title: 'Equitable Relief', irc: 'IRC 6015(f)', desc: 'Other circumstances warrant relief', detail: "If you don't qualify under (b) or (c), you may still get relief if it would be unfair to hold you liable." },
  ]

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caseId, formType: 'form-8857' }) })
      if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'Form-8857-Innocent-Spouse.pdf'; a.click(); URL.revokeObjectURL(url) }
    } finally { setGenerating(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
      {/* Step Dots */}
      <div style={{ padding: '0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '24px', height: '8px', borderRadius: '9999px', background: '#2563EB' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0F0F5' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0F0F5' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0F0F5' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0F0F5' }} />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#8585A0' }}>Step 1 of 5</span>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.3 }}>
          Request Innocent Spouse Relief
        </h1>
      </div>

      {/* Relief Type Label */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Relief Type</div>
      </div>

      {/* Relief Cards */}
      {reliefOptions.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => setReliefType(opt.key)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '16px',
            background: reliefType === opt.key ? '#EFF4FF' : 'white',
            border: reliefType === opt.key ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
            borderRadius: '14px',
            cursor: 'pointer',
            marginBottom: '8px',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: reliefType === opt.key ? '0 0 0 3px rgba(0, 61, 165, 0.1)' : 'none',
            fontFamily: 'inherit',
          }}
        >
          {/* Radio Circle */}
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            border: reliefType === opt.key ? '2px solid #2563EB' : '2px solid #F0F0F5',
            background: reliefType === opt.key ? '#2563EB' : 'transparent',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2px',
            transition: 'all 0.2s ease',
          }}>
            {reliefType === opt.key && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E', marginBottom: '3px' }}>{opt.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#FAFAFF', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: '#5C5C7A', fontFamily: 'monospace' }}>{opt.irc}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#8585A0', lineHeight: 1.4 }}>{opt.desc}</div>
            {reliefType === opt.key && (
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(0,61,165,0.1)' }}>
                <div style={{ fontSize: '11px', color: '#5C5C7A', lineHeight: 1.5 }}>{opt.detail}</div>
              </div>
            )}
          </div>
        </button>
      ))}

      {/* Spouse Information */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>Spouse Information</div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '5px' }}>Spouse Name</label>
            <input type="text" placeholder="Full name" value={spouseName} onChange={(e) => setSpouseName(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '5px' }}>SSN</label>
            <input type="text" placeholder="***-**-****" value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '5px' }}>Date of Marriage</label>
            <input type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '5px' }}>Separation/Divorce</label>
            <input type="date" value={separationDate} onChange={(e) => setSeparationDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      {/* Tax Years */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Tax Years Requesting Relief</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['2020','2021','2022','2023'].map(year => (
            <button key={year} type="button" onClick={() => toggleYear(year)} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              border: selectedYears.includes(year) ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              color: selectedYears.includes(year) ? '#2563EB' : '#5C5C7A',
              cursor: 'pointer',
              background: selectedYears.includes(year) ? '#EFF4FF' : 'white',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}>{year}</button>
          ))}
        </div>
      </div>

      {/* Reason */}
      <div style={{ marginTop: '16px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '5px' }}>Why are you requesting relief?</label>
        <textarea placeholder="Describe your situation..." value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: '100%', minHeight: '70px', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: '#1A1A2E', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
      </div>

      {/* Benefit Question */}
      <div style={{ marginTop: '4px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>Did you benefit from the understatement?</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => setBenefited('yes')} style={{
            flex: 1, padding: '12px', border: benefited === 'yes' ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
            borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: benefited === 'yes' ? '#EFF4FF' : 'white',
            fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: benefited === 'yes' ? '#2563EB' : '#1A1A2E',
            transition: 'all 0.25s ease',
          }}>Yes</button>
          <button type="button" onClick={() => setBenefited('no')} style={{
            flex: 1, padding: '12px', border: benefited === 'no' ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
            borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: benefited === 'no' ? '#EFF4FF' : 'white',
            fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: benefited === 'no' ? '#2563EB' : '#1A1A2E',
            transition: 'all 0.25s ease',
          }}>No</button>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1, minHeight: '16px' }} />

      {/* Continue */}
      <div style={{ padding: '12px 0 20px' }}>
        <button onClick={handleGeneratePdf} disabled={generating} style={{
          width: '100%', padding: '16px 28px', background: '#00A651', border: 'none', borderRadius: '9999px',
          color: 'white', fontSize: '15px', fontWeight: 700, fontFamily: 'inherit',
          cursor: generating ? 'not-allowed' : 'pointer', opacity: generating ? 0.5 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          {generating ? 'Generating...' : 'Continue'}
          {!generating && <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />}
        </button>
      </div>
    </div>
  )
}
