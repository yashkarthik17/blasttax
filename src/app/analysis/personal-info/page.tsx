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

interface PersonalInfo {
  firstName: string; middleName: string; lastName: string
  ssn: string; dob: string
  street: string; apt: string; city: string; state: string; zip: string
  prevStreet: string; prevCity: string; prevState: string; prevZip: string
  phoneHome: string; phoneCell: string; phoneWork: string; email: string
  spouseFirstName: string; spouseMiddleName: string; spouseLastName: string
  spouseSsn: string; spouseDob: string
}

const initial: PersonalInfo = {
  firstName: '', middleName: '', lastName: '',
  ssn: '', dob: '',
  street: '', apt: '', city: '', state: '', zip: '',
  prevStreet: '', prevCity: '', prevState: '', prevZip: '',
  phoneHome: '', phoneCell: '', phoneWork: '', email: '',
  spouseFirstName: '', spouseMiddleName: '', spouseLastName: '',
  spouseSsn: '', spouseDob: '',
}

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

export default function PersonalInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<PersonalInfo>(() => ({
    ...initial,
    ...(answers.personalInfo ?? {}),
  }))
  const [showPrevAddress, setShowPrevAddress] = useState(false)
  const [showSpouse, setShowSpouse] = useState(false)

  function update(field: keyof PersonalInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ personalInfo: form })
    router.push('/analysis/employment')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#D5D5E0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8585A0' }}>Step 2 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Personal Info</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '14px 20px 20px' }}>
          {/* Heading */}
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
              Tell us about yourself
            </div>
            <div style={{ fontSize: '0.78rem', color: '#8585A0', marginTop: 4, lineHeight: 1.5 }}>
              This information is required by every IRS form
            </div>
          </div>

          {/* Info note */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#EBF0FF', border: '1px solid rgba(37,99,235,0.1)', borderRadius: 12 }}>
            <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#2563EB', flexShrink: 0 }} />
            <span style={{ fontSize: '0.72rem', color: '#1E40AF', lineHeight: 1.4 }}>
              Your data is encrypted and only used for IRS form generation.
            </span>
          </div>

          {/* Your Legal Name */}
          <div>
            <div style={sectionDividerStyle}>Your Legal Name</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 2 }}>
                <div style={fieldLabelStyle}>First Name</div>
                <input type="text" style={fieldInputStyle} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First name" />
              </div>
              <div style={{ width: 60 }}>
                <div style={fieldLabelStyle}>M.I.</div>
                <input type="text" style={{ ...fieldInputStyle, textAlign: 'center' }} value={form.middleName} onChange={(e) => update('middleName', e.target.value)} maxLength={1} placeholder="M" />
              </div>
              <div style={{ flex: 2 }}>
                <div style={fieldLabelStyle}>Last Name</div>
                <input type="text" style={fieldInputStyle} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last name" />
              </div>
            </div>
          </div>

          {/* SSN & DOB */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={fieldLabelStyle}>Social Security Number</div>
              <input type="text" style={fieldInputStyle} value={form.ssn} onChange={(e) => update('ssn', e.target.value)} placeholder="XXX-XX-XXXX" maxLength={11} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={fieldLabelStyle}>Date of Birth</div>
              <input type="date" style={fieldInputStyle} value={form.dob} onChange={(e) => update('dob', e.target.value)} />
            </div>
          </div>

          {/* Current Address */}
          <div>
            <div style={sectionDividerStyle}>Current Address</div>
            <div style={{ marginBottom: 10 }}>
              <div style={fieldLabelStyle}>Street Address</div>
              <input type="text" style={fieldInputStyle} value={form.street} onChange={(e) => update('street', e.target.value)} placeholder="Street address" />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={fieldLabelStyle}>Apartment / Suite / Unit</div>
              <input type="text" style={fieldInputStyle} value={form.apt} onChange={(e) => update('apt', e.target.value)} placeholder="Apt, Suite, Unit (optional)" />
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 2 }}>
                <div style={fieldLabelStyle}>City</div>
                <input type="text" style={fieldInputStyle} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" />
              </div>
              <div style={{ width: 70 }}>
                <div style={fieldLabelStyle}>State</div>
                <select style={fieldSelectStyle} value={form.state} onChange={(e) => update('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ width: 90 }}>
                <div style={fieldLabelStyle}>ZIP</div>
                <input type="text" style={fieldInputStyle} value={form.zip} onChange={(e) => update('zip', e.target.value)} maxLength={10} placeholder="ZIP" />
              </div>
            </div>
          </div>

          {/* Previous Address Toggle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'white', border: '1px solid #E8E8F0', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Previous address?</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>Required if &lt; 3 years at current</div>
              </div>
              <button
                onClick={() => setShowPrevAddress(!showPrevAddress)}
                style={{ width: 40, height: 22, borderRadius: 11, background: showPrevAddress ? '#1A1A2E' : '#D5D5E0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', border: 'none', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 2, left: showPrevAddress ? 20 : 2, width: 18, height: 18, background: 'white', borderRadius: '50%', transition: 'left 0.2s ease' }} />
              </button>
            </div>
            {showPrevAddress && (
              <div style={{ paddingTop: 12, overflow: 'hidden', transition: 'all 0.4s ease' }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={fieldLabelStyle}>Previous Street Address</div>
                  <input type="text" style={fieldInputStyle} value={form.prevStreet} onChange={(e) => update('prevStreet', e.target.value)} placeholder="Previous street address" />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 2 }}>
                    <div style={fieldLabelStyle}>City</div>
                    <input type="text" style={fieldInputStyle} value={form.prevCity} onChange={(e) => update('prevCity', e.target.value)} placeholder="City" />
                  </div>
                  <div style={{ width: 70 }}>
                    <div style={fieldLabelStyle}>State</div>
                    <select style={fieldSelectStyle} value={form.prevState} onChange={(e) => update('prevState', e.target.value)}>
                      <option value="">--</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ width: 90 }}>
                    <div style={fieldLabelStyle}>ZIP</div>
                    <input type="text" style={fieldInputStyle} value={form.prevZip} onChange={(e) => update('prevZip', e.target.value)} maxLength={10} placeholder="ZIP" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div style={sectionDividerStyle}>Contact Information</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Home Phone</div>
                <input type="tel" style={fieldInputStyle} value={form.phoneHome} onChange={(e) => update('phoneHome', e.target.value)} placeholder="(000) 000-0000" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Cell Phone</div>
                <input type="tel" style={fieldInputStyle} value={form.phoneCell} onChange={(e) => update('phoneCell', e.target.value)} placeholder="(000) 000-0000" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Work Phone</div>
                <input type="tel" style={fieldInputStyle} value={form.phoneWork} onChange={(e) => update('phoneWork', e.target.value)} placeholder="(000) 000-0000" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Email Address</div>
                <input type="email" style={fieldInputStyle} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" />
              </div>
            </div>
          </div>

          {/* Filing Jointly (MFJ) Toggle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'white', border: '1px solid #E8E8F0', borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Filing jointly (MFJ)?</div>
                <div style={{ fontSize: '0.68rem', color: '#8585A0' }}>Add spouse information</div>
              </div>
              <button
                onClick={() => setShowSpouse(!showSpouse)}
                style={{ width: 40, height: 22, borderRadius: 11, background: showSpouse ? '#1A1A2E' : '#D5D5E0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s ease', border: 'none', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: 2, left: showSpouse ? 20 : 2, width: 18, height: 18, background: 'white', borderRadius: '50%', transition: 'left 0.2s ease' }} />
              </button>
            </div>
            {showSpouse && (
              <div style={{ paddingTop: 14, overflow: 'hidden', transition: 'all 0.4s ease' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i className="fas fa-user-group" style={{ fontSize: 10 }} /> Spouse Information
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 2 }}>
                    <div style={fieldLabelStyle}>First Name</div>
                    <input type="text" style={fieldInputStyle} value={form.spouseFirstName} onChange={(e) => update('spouseFirstName', e.target.value)} placeholder="Spouse first name" />
                  </div>
                  <div style={{ width: 60 }}>
                    <div style={fieldLabelStyle}>M.I.</div>
                    <input type="text" style={{ ...fieldInputStyle, textAlign: 'center' }} value={form.spouseMiddleName} onChange={(e) => update('spouseMiddleName', e.target.value)} maxLength={1} placeholder="M" />
                  </div>
                  <div style={{ flex: 2 }}>
                    <div style={fieldLabelStyle}>Last Name</div>
                    <input type="text" style={fieldInputStyle} value={form.spouseLastName} onChange={(e) => update('spouseLastName', e.target.value)} placeholder="Spouse last name" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={fieldLabelStyle}>Spouse SSN</div>
                    <input type="text" style={fieldInputStyle} value={form.spouseSsn} onChange={(e) => update('spouseSsn', e.target.value)} placeholder="XXX-XX-XXXX" maxLength={11} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={fieldLabelStyle}>Spouse Date of Birth</div>
                    <input type="date" style={fieldInputStyle} value={form.spouseDob} onChange={(e) => update('spouseDob', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
            <button
              onClick={handleNext}
              style={{ padding: 16, background: '#00A651', borderRadius: 9999, textAlign: 'center', color: 'white', fontSize: '0.88rem', fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
              Continue <i className="fas fa-arrow-right" style={{ marginLeft: 6, fontSize: 12 }} />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              style={{ padding: 12, textAlign: 'center', color: '#8585A0', fontSize: '0.82rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fas fa-bookmark" style={{ marginRight: 6, fontSize: 11 }} /> Save &amp; Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
