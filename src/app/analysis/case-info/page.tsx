'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const FILING_STATUSES = ['Single', 'MFJ', 'MFS', 'HOH', 'QSS']
const TAX_FORMS = ['1040', '1120', '941', '940', '944', '1065']
const ASSESSMENT_TYPES = ['Self-assessed', 'IRS-assessed', 'Audit-assessed']

interface TaxYearEntry {
  id: string; taxYear: string; balance: string; taxForm: string; filingStatus: string
  assessmentDate: string; lastPaymentDate: string; isSfr: boolean; assessmentType: string
  showPenalties: boolean; totalPenalty: string; interest: string
  ftfPenalty: string; ftpPenalty: string; accuracyPenalty: string; estimatedTaxPenalty: string
}

const taxYears = Array.from({ length: 8 }, (_, i) => String(2025 - i))

const emptyEntry = (): TaxYearEntry => ({
  id: crypto.randomUUID(), taxYear: '', balance: '', taxForm: '1040', filingStatus: 'Single',
  assessmentDate: '', lastPaymentDate: '', isSfr: false, assessmentType: 'Self-assessed',
  showPenalties: false, totalPenalty: '', interest: '',
  ftfPenalty: '', ftpPenalty: '', accuracyPenalty: '', estimatedTaxPenalty: '',
})

function parseMoney(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}
function formatCurrency(v: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v)
}

const fieldInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: '#F8FAFC',
  border: '1.5px solid #F1F5F9',
  borderRadius: 10,
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 600,
  color: '#0A1628',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box' as const,
}

const fieldSelectStyle: React.CSSProperties = {
  ...fieldInputStyle,
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238585A0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: 32,
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8',
  textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5,
}

export default function CaseInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [entries, setEntries] = useState<TaxYearEntry[]>(() => {
    const saved = answers.taxDebts as TaxYearEntry[] | undefined
    return saved && saved.length > 0 ? saved : [emptyEntry()]
  })

  function updateEntry(index: number, field: keyof TaxYearEntry, value: string | boolean) {
    setEntries((prev) => {
      const arr = [...prev]
      arr[index] = { ...arr[index], [field]: value }
      return arr
    })
  }

  function addEntry() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  const totalDebt = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)
  const yearCount = entries.filter((e) => e.taxYear).length

  function handleNext() {
    setAnswers({ taxDebts: entries })
    router.push('/analysis/case-review')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Step 3 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Tax Debt Inventory</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Heading */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, margin: 0 }}>Tell us about your tax debt</h1>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4, margin: '4px 0 0' }}>Add each tax year you owe</p>
          </div>

          {/* Pre-populated banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#EFF4FF', border: '1px solid #BFDBFE', borderRadius: 12, marginBottom: 16, fontSize: 13, color: '#0A1628' }}>
            <i className="fa-solid fa-sparkles" />
            <span>Pre-populated from your IRS transcript. Verify and adjust if needed.</span>
          </div>

          {/* Year Cards */}
          {entries.map((entry, idx) => (
            <div key={entry.id} style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: 16, padding: 18, marginBottom: 12 }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#EFF4FF', color: '#2563EB', borderRadius: 9999, fontSize: 12, fontWeight: 700 }}>
                  <i className="fa-solid fa-calendar" style={{ fontSize: 10 }} />
                  {entry.taxYear || 'New Year'}
                </span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Income Tax</span>
              </div>

              {/* Year + Balance */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tax Year</label>
                  <select style={fieldSelectStyle} value={entry.taxYear} onChange={(e) => updateEntry(idx, 'taxYear', e.target.value)}>
                    <option value="">Select</option>
                    {taxYears.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Balance Owed</label>
                  <input type="text" style={fieldInputStyle} value={entry.balance} onChange={(e) => updateEntry(idx, 'balance', e.target.value)} placeholder="$0" />
                </div>
              </div>

              {/* Form + Filing */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Tax Form Type</label>
                  <select style={fieldSelectStyle} value={entry.taxForm} onChange={(e) => updateEntry(idx, 'taxForm', e.target.value)}>
                    {TAX_FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Filing Status</label>
                  <select style={fieldSelectStyle} value={entry.filingStatus} onChange={(e) => updateEntry(idx, 'filingStatus', e.target.value)}>
                    {FILING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Assessment Date */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Original Assessment Date (TC 150)</label>
                  <input type="date" style={fieldInputStyle} value={entry.assessmentDate} onChange={(e) => updateEntry(idx, 'assessmentDate', e.target.value)} />
                </div>
              </div>

              {/* Last Payment */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Date of Last Payment</label>
                  <input type="date" style={fieldInputStyle} value={entry.lastPaymentDate} onChange={(e) => updateEntry(idx, 'lastPaymentDate', e.target.value)} />
                </div>
              </div>

              {/* SFR Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <input
                  type="checkbox"
                  checked={entry.isSfr}
                  onChange={(e) => updateEntry(idx, 'isSfr', e.target.checked)}
                  style={{ width: 36, height: 20, appearance: 'none', background: entry.isSfr ? '#2563EB' : '#E2E8F0', borderRadius: 10, position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0, border: 'none' }}
                />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#64748B' }}>Substitute for Return (SFR / IRS-prepared)?</span>
              </div>

              {/* Assessment Type */}
              <div style={{ marginTop: 10 }}>
                <label style={labelStyle}>Assessment Type</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {ASSESSMENT_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateEntry(idx, 'assessmentType', type)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '6px 10px',
                        background: entry.assessmentType === type ? '#EFF4FF' : '#F8FAFC',
                        border: entry.assessmentType === type ? '1.5px solid #2563EB' : '1.5px solid #F1F5F9',
                        borderRadius: 8,
                        fontSize: 11, fontWeight: 600,
                        color: entry.assessmentType === type ? '#2563EB' : '#64748B',
                        cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Penalty Toggle */}
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => updateEntry(idx, 'showPenalties', !entry.showPenalties)}
                  style={{ fontSize: 11.5, color: '#2563EB', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <i className={`fa-solid ${entry.showPenalties ? 'fa-minus' : 'fa-plus'}`} style={{ fontSize: 9 }} />
                  {entry.showPenalties ? ' Hide penalty & interest' : ' Penalty & interest breakdown'}
                </button>
                {entry.showPenalties && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Total Penalty</label>
                        <input type="text" style={fieldInputStyle} value={entry.totalPenalty} onChange={(e) => updateEntry(idx, 'totalPenalty', e.target.value)} placeholder="$0" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Interest</label>
                        <input type="text" style={fieldInputStyle} value={entry.interest} onChange={(e) => updateEntry(idx, 'interest', e.target.value)} placeholder="$0" />
                      </div>
                    </div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6, marginTop: 10 }}>Penalty Breakdown</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                      <div>
                        <label style={labelStyle}>FTF (Failure to File)</label>
                        <input type="text" style={fieldInputStyle} value={entry.ftfPenalty} onChange={(e) => updateEntry(idx, 'ftfPenalty', e.target.value)} placeholder="$0" />
                      </div>
                      <div>
                        <label style={labelStyle}>FTP (Failure to Pay)</label>
                        <input type="text" style={fieldInputStyle} value={entry.ftpPenalty} onChange={(e) => updateEntry(idx, 'ftpPenalty', e.target.value)} placeholder="$0" />
                      </div>
                      <div>
                        <label style={labelStyle}>Accuracy-Related</label>
                        <input type="text" style={fieldInputStyle} value={entry.accuracyPenalty} onChange={(e) => updateEntry(idx, 'accuracyPenalty', e.target.value)} placeholder="$0" />
                      </div>
                      <div>
                        <label style={labelStyle}>Estimated Tax</label>
                        <input type="text" style={fieldInputStyle} value={entry.estimatedTaxPenalty} onChange={(e) => updateEntry(idx, 'estimatedTaxPenalty', e.target.value)} placeholder="$0" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Add Year */}
          <button
            onClick={addEntry}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, border: '2px dashed #F1F5F9', borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s ease', color: '#64748B', fontSize: 13, fontWeight: 600, background: 'transparent', width: '100%', fontFamily: 'inherit' }}
          >
            <i className="fa-solid fa-plus" />
            Add another tax year
          </button>

          {/* Summary Bar */}
          {totalDebt > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Debt</span>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginTop: 2 }}>{formatCurrency(totalDebt)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>across</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{yearCount} year{yearCount !== 1 ? 's' : ''}</div>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div style={{ minHeight: 16 }} />

          {/* Continue */}
          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={handleNext}
              style={{ width: '100%', padding: '16px 28px', background: '#00A651', borderRadius: 9999, fontSize: 15, fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
