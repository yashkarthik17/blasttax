'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]

type PayFrequency = 'Weekly' | 'Bi-weekly' | 'Semi-monthly' | 'Monthly'

interface EmploymentData {
  employerName: string; employerStreet: string; employerCity: string; employerState: string; employerZip: string
  employerPhone: string; yearsEmployed: string; monthsEmployed: string; payFrequency: PayFrequency; occupation: string
  spouseEmployed: boolean; spouseEmployerName: string; spouseEmployerAddress: string; spouseEmployerPhone: string
  spouseHowLong: string; spousePayFrequency: string; spouseOccupation: string
  selfEmployed: boolean; businessName: string; businessType: string; ein: string; numEmployees: string; howLongInBusiness: string
}

const initial: EmploymentData = {
  employerName: '', employerStreet: '', employerCity: '', employerState: '', employerZip: '',
  employerPhone: '', yearsEmployed: '', monthsEmployed: '', payFrequency: 'Bi-weekly', occupation: '',
  spouseEmployed: false, spouseEmployerName: '', spouseEmployerAddress: '', spouseEmployerPhone: '',
  spouseHowLong: '', spousePayFrequency: '', spouseOccupation: '',
  selfEmployed: false, businessName: '', businessType: '', ein: '', numEmployees: '', howLongInBusiness: '',
}

const PAY_FREQS: PayFrequency[] = ['Weekly', 'Bi-weekly', 'Semi-monthly', 'Monthly']

const fieldLabelStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 600,
  color: '#5C5C7A',
  marginBottom: 6,
}

const fieldInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: '#FAFAFF',
  border: '1.5px solid #F0F0F5',
  borderRadius: 12,
  fontFamily: 'inherit',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#1A1A2E',
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

const sectionDividerStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#B0B0C8',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 12,
  paddingTop: 4,
}

const sectionCardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: 16,
  padding: 18,
  border: '1px solid #E8E8F0',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
}

const toggleCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px',
  background: 'white',
  border: '1px solid #E8E8F0',
  borderRadius: 14,
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
}

export default function EmploymentPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<EmploymentData>(() => ({
    ...initial,
    ...(answers.employment ?? {}),
  }))

  function update<K extends keyof EmploymentData>(field: K, value: EmploymentData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ employment: form })
    router.push('/analysis/household')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#D5D5E0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '40%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8585A0' }}>Step 3 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Employment Info</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '14px 20px 20px' }}>
          {/* Heading */}
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
              Employment details
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: 4, lineHeight: 1.5 }}>
              Required for Form 9465, Form 433-A, and other IRS forms
            </div>
          </div>

          {/* Your Employment */}
          <div>
            <div style={{ ...sectionDividerStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-user" style={{ fontSize: 9, color: '#2563EB' }} />
              </div>
              Your Employment
            </div>

            <div style={sectionCardStyle}>
              <div style={{ marginBottom: 12 }}>
                <div style={fieldLabelStyle}>Current Employer Name</div>
                <input type="text" style={fieldInputStyle} value={form.employerName} onChange={(e) => update('employerName', e.target.value)} placeholder="Employer name" />
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={fieldLabelStyle}>Employer Address</div>
                <input type="text" style={fieldInputStyle} value={form.employerStreet} onChange={(e) => update('employerStreet', e.target.value)} placeholder="Street address" />
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 2 }}>
                  <div style={fieldLabelStyle}>City</div>
                  <input type="text" style={fieldInputStyle} value={form.employerCity} onChange={(e) => update('employerCity', e.target.value)} placeholder="City" />
                </div>
                <div style={{ width: 70 }}>
                  <div style={fieldLabelStyle}>State</div>
                  <select style={fieldSelectStyle} value={form.employerState} onChange={(e) => update('employerState', e.target.value)}>
                    <option value="">--</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ width: 90 }}>
                  <div style={fieldLabelStyle}>ZIP</div>
                  <input type="text" style={fieldInputStyle} value={form.employerZip} onChange={(e) => update('employerZip', e.target.value)} maxLength={10} placeholder="ZIP" />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={fieldLabelStyle}>Employer Phone Number</div>
                <input type="tel" style={fieldInputStyle} value={form.employerPhone} onChange={(e) => update('employerPhone', e.target.value)} placeholder="(000) 000-0000" />
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={fieldLabelStyle}>How Long Employed</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input type="number" style={{ ...fieldInputStyle, width: 60, textAlign: 'center' }} value={form.yearsEmployed} onChange={(e) => update('yearsEmployed', e.target.value)} placeholder="0" />
                    <span style={{ fontSize: '0.72rem', color: '#8585A0', alignSelf: 'center' }}>yrs</span>
                    <input type="number" style={{ ...fieldInputStyle, width: 60, textAlign: 'center' }} value={form.monthsEmployed} onChange={(e) => update('monthsEmployed', e.target.value)} placeholder="0" />
                    <span style={{ fontSize: '0.72rem', color: '#8585A0', alignSelf: 'center' }}>mos</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={fieldLabelStyle}>Pay Frequency</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {PAY_FREQS.map((freq) => (
                    <button
                      key={freq}
                      onClick={() => update('payFrequency', freq)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '8px 14px',
                        background: form.payFrequency === freq ? '#EBF0FF' : '#FAFAFF',
                        border: form.payFrequency === freq ? '1.5px solid #1A1A2E' : '1.5px solid #F0F0F5',
                        borderRadius: 10,
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: form.payFrequency === freq ? '#1A1A2E' : '#5C5C7A',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit',
                      }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={fieldLabelStyle}>Occupation</div>
                <input type="text" style={fieldInputStyle} value={form.occupation} onChange={(e) => update('occupation', e.target.value)} placeholder="Your occupation / job title" />
              </div>
            </div>
          </div>

          {/* Spouse Employment Toggle */}
          <div>
            <div style={toggleCardStyle}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Spouse is employed?</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>If filing jointly (MFJ)</div>
              </div>
              <button
                onClick={() => update('spouseEmployed', !form.spouseEmployed)}
                style={{ width: 40, height: 22, borderRadius: 11, background: form.spouseEmployed ? '#1A1A2E' : '#D5D5E0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', border: 'none', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 2, left: form.spouseEmployed ? 20 : 2, width: 18, height: 18, background: 'white', borderRadius: '50%', transition: 'left 0.2s ease' }} />
              </button>
            </div>
            {form.spouseEmployed && (
              <div style={{ paddingTop: 14, overflow: 'hidden', transition: 'all 0.4s ease' }}>
                <div style={{ ...sectionDividerStyle, display: 'flex', alignItems: 'center', gap: 8, color: '#7C3AED' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-user-group" style={{ fontSize: 9, color: '#7C3AED' }} />
                  </div>
                  Spouse Employment
                </div>
                <div style={sectionCardStyle}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={fieldLabelStyle}>Spouse&apos;s Employer Name</div>
                    <input type="text" style={fieldInputStyle} value={form.spouseEmployerName} onChange={(e) => update('spouseEmployerName', e.target.value)} placeholder="Employer name" />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={fieldLabelStyle}>Employer Address</div>
                    <input type="text" style={fieldInputStyle} value={form.spouseEmployerAddress} onChange={(e) => update('spouseEmployerAddress', e.target.value)} placeholder="Street, City, State, ZIP" />
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>Employer Phone</div>
                      <input type="tel" style={fieldInputStyle} value={form.spouseEmployerPhone} onChange={(e) => update('spouseEmployerPhone', e.target.value)} placeholder="(000) 000-0000" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>How Long Employed</div>
                      <input type="text" style={fieldInputStyle} value={form.spouseHowLong} onChange={(e) => update('spouseHowLong', e.target.value)} placeholder="e.g., 2 years" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>Pay Frequency</div>
                      <select style={fieldSelectStyle} value={form.spousePayFrequency} onChange={(e) => update('spousePayFrequency', e.target.value)}>
                        <option value="">Select...</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="semimonthly">Semi-monthly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>Occupation</div>
                      <input type="text" style={fieldInputStyle} value={form.spouseOccupation} onChange={(e) => update('spouseOccupation', e.target.value)} placeholder="Job title" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Self-Employment Toggle */}
          <div>
            <div style={toggleCardStyle}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Self-employed?</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>Business or freelance income</div>
              </div>
              <button
                onClick={() => update('selfEmployed', !form.selfEmployed)}
                style={{ width: 40, height: 22, borderRadius: 11, background: form.selfEmployed ? '#1A1A2E' : '#D5D5E0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', border: 'none', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 2, left: form.selfEmployed ? 20 : 2, width: 18, height: 18, background: 'white', borderRadius: '50%', transition: 'left 0.2s ease' }} />
              </button>
            </div>
            {form.selfEmployed && (
              <div style={{ paddingTop: 14, overflow: 'hidden', transition: 'all 0.4s ease' }}>
                <div style={{ ...sectionDividerStyle, display: 'flex', alignItems: 'center', gap: 8, color: '#D97706' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-store" style={{ fontSize: 9, color: '#D97706' }} />
                  </div>
                  Self-Employment
                </div>
                <div style={sectionCardStyle}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={fieldLabelStyle}>Business Name</div>
                    <input type="text" style={fieldInputStyle} value={form.businessName} onChange={(e) => update('businessName', e.target.value)} placeholder="Your business name" />
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>Business Type</div>
                      <select style={fieldSelectStyle} value={form.businessType} onChange={(e) => update('businessType', e.target.value)}>
                        <option value="">Select...</option>
                        <option value="sole">Sole Proprietorship</option>
                        <option value="llc-single">LLC (Single Member)</option>
                        <option value="llc-multi">LLC (Multi Member)</option>
                        <option value="scorp">S-Corporation</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>EIN</div>
                      <input type="text" style={fieldInputStyle} value={form.ein} onChange={(e) => update('ein', e.target.value)} placeholder="XX-XXXXXXX" maxLength={10} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>Number of Employees</div>
                      <input type="number" style={fieldInputStyle} value={form.numEmployees} onChange={(e) => update('numEmployees', e.target.value)} placeholder="0" min={0} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabelStyle}>How Long in Business</div>
                      <input type="text" style={fieldInputStyle} value={form.howLongInBusiness} onChange={(e) => update('howLongInBusiness', e.target.value)} placeholder="e.g., 5 years" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info note */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#FFFBEB', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 14 }}>
            <i className="fas fa-info-circle" style={{ fontSize: 12, color: '#D97706', flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.72rem', color: '#92400E', lineHeight: 1.5 }}>
              <strong>Required for Form 9465, Form 433-A, and Form 433-F.</strong> The IRS will return forms without employment information. Self-employment details are also needed for Form 433-B if applicable.
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
            <button
              onClick={handleNext}
              style={{ padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white', fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
            </button>
            <button
              onClick={() => router.push('/analysis/personal-info')}
              style={{ padding: 12, textAlign: 'center', color: '#8585A0', fontSize: '0.82rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-arrow-left" style={{ marginRight: 6, fontSize: 11 }} /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
