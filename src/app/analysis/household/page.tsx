'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

type HousingType = 'rent' | 'own' | 'other'

interface HouseholdData {
  memberCount: number; under17Count: number; over65Count: number
  county: string; state: string
  incomeBracket: string; vehicleCount: number; housingType: HousingType | ''
  hasInsurance: boolean; insuranceType: string
}

const initial: HouseholdData = {
  memberCount: 1, under17Count: 0, over65Count: 0,
  county: '', state: '',
  incomeBracket: '', vehicleCount: 1, housingType: '',
  hasInsurance: true, insuranceType: '',
}

const sectionCardStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid #F1F5F9',
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
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

const counterBtnStyle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: 12,
  border: '1.5px solid #F1F5F9', background: 'white',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', fontSize: 16, color: '#0A1628',
  transition: 'all 0.2s ease', fontFamily: 'inherit',
}

const counterSmBtnStyle: React.CSSProperties = {
  ...counterBtnStyle,
  width: 32, height: 32, borderRadius: 8, fontSize: 14,
}

function Counter({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <button style={counterBtnStyle} onClick={() => onChange(Math.max(min, value - 1))}>
        <i className="fa-solid fa-minus" style={{ fontSize: 12 }} />
      </button>
      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0A1628', minWidth: 40, textAlign: 'center' }}>{value}</span>
      <button style={counterBtnStyle} onClick={() => onChange(Math.min(10, value + 1))}>
        <i className="fa-solid fa-plus" style={{ fontSize: 12 }} />
      </button>
    </div>
  )
}

function SmallCounter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={counterSmBtnStyle} onClick={() => onChange(Math.max(0, value - 1))}>
        <i className="fa-solid fa-minus" style={{ fontSize: 10 }} />
      </button>
      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0A1628', minWidth: 28, textAlign: 'center' }}>{value}</span>
      <button style={counterSmBtnStyle} onClick={() => onChange(Math.min(10, value + 1))}>
        <i className="fa-solid fa-plus" style={{ fontSize: 10 }} />
      </button>
    </div>
  )
}

export default function HouseholdPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<HouseholdData>(() => ({
    ...initial,
    ...(answers.household ?? {}),
  }))

  function update<K extends keyof HouseholdData>(field: K, value: HouseholdData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ household: form })
    router.push('/analysis/transcript')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ marginTop: 4, height: 4, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '30%', height: '100%', background: '#00A651', borderRadius: 9999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Step 3 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Household</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Heading */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, margin: 0 }}>Tell us about your household</h1>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4, lineHeight: 1.5, margin: '4px 0 0' }}>The IRS uses your household size to determine allowable living expenses</p>
          </div>

          {/* Total Household Members */}
          <div style={sectionCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Total Household Members</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Including yourself</div>
              </div>
              <Counter value={form.memberCount} onChange={(v) => update('memberCount', v)} min={1} />
            </div>
          </div>

          {/* Household Members List */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>Household Members</div>
            {/* Taxpayer row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#F8FAFC', borderRadius: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF4FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                <i className="fa-solid fa-user" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>Taxpayer</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Primary</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>Age</label>
                <input type="number" style={{ ...fieldInputStyle, width: 56, padding: '6px 8px', fontSize: 13, textAlign: 'center' }} placeholder="0" />
              </div>
            </div>
            {/* Add member button */}
            <button
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, border: '2px dashed #F1F5F9', borderRadius: 12, cursor: 'pointer', transition: 'all 0.3s ease', color: '#64748B', fontSize: 13, fontWeight: 600, background: 'transparent', width: '100%', fontFamily: 'inherit', marginTop: 8 }}
            >
              <i className="fa-solid fa-plus" style={{ fontSize: 11 }} />
              Add family member
            </button>
          </div>

          {/* Age Group Counts */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>Household Age Breakdown</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>Used for IRS National Standards calculations</div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Members under 17</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>Child-related deductions</div>
              </div>
              <SmallCounter value={form.under17Count} onChange={(v) => update('under17Count', v)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Members age 65+</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>Healthcare OOP: $149/mo vs $84/mo</div>
              </div>
              <SmallCounter value={form.over65Count} onChange={(v) => update('over65Count', v)} />
            </div>
          </div>

          {/* Income Bracket */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>Approximate Gross Monthly Household Income</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>Matches IRS National Standards income brackets</div>
            <select style={fieldSelectStyle} value={form.incomeBracket} onChange={(e) => update('incomeBracket', e.target.value)}>
              <option value="">Select income range...</option>
              <option value="0-1666">Under $1,667/month</option>
              <option value="1667-2499">$1,667 - $2,499/month</option>
              <option value="2500-3332">$2,500 - $3,332/month</option>
              <option value="3333-4166">$3,333 - $4,166/month</option>
              <option value="4167-5832">$4,167 - $5,832/month</option>
              <option value="5833-7499">$5,833 - $7,499/month</option>
              <option value="7500-8332">$7,500 - $8,332/month</option>
              <option value="8333+">$8,333+/month</option>
            </select>
          </div>

          {/* Location */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>Location</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 0 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>County</label>
                <input type="text" style={fieldInputStyle} value={form.county} onChange={(e) => update('county', e.target.value)} placeholder="e.g. Los Angeles" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>State</label>
                <select style={fieldSelectStyle} value={form.state} onChange={(e) => update('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Health Insurance */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>Health Insurance</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Do you have health insurance?</span>
              <button
                onClick={() => update('hasInsurance', !form.hasInsurance)}
                style={{ width: 48, height: 28, borderRadius: 14, background: form.hasInsurance ? '#00A651' : '#F1F5F9', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', border: 'none' }}
              >
                <div style={{ position: 'absolute', width: 22, height: 22, background: 'white', borderRadius: '50%', top: 3, left: form.hasInsurance ? 23 : 3, transition: 'left 0.3s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }} />
              </button>
            </div>
            {form.hasInsurance && (
              <div style={{ marginTop: 8 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 5 }}>Insurance Type</label>
                <select style={fieldSelectStyle} value={form.insuranceType} onChange={(e) => update('insuranceType', e.target.value)}>
                  <option value="">Select...</option>
                  <option value="employer">Employer-provided</option>
                  <option value="marketplace">Marketplace / ACA</option>
                  <option value="medicare">Medicare</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="va">VA / Military</option>
                  <option value="private">Private / Individual</option>
                  <option value="none">No Insurance</option>
                </select>
              </div>
            )}
            <div style={{ marginTop: 8, padding: '8px 12px', background: '#EFF4FF', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#4338CA', fontWeight: 600, lineHeight: 1.4 }}>
                <i className="fa-solid fa-circle-info" style={{ fontSize: 10 }} />{' '}
                IRS allows OOP healthcare: <strong>$84/mo</strong> per person under 65, <strong>$149/mo</strong> per person 65+. Actual expenses are collected on the Income &amp; Expenses screen.
              </div>
            </div>
          </div>

          {/* Vehicles */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>Vehicles in Household</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 10 }}>How many vehicles does your household own or lease? (Details collected later)</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[0, 1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => update('vehicleCount', n)}
                  style={{
                    flex: 1,
                    padding: '14px 10px',
                    border: form.vehicleCount === n ? '1.5px solid #2563EB' : '1.5px solid #F1F5F9',
                    borderRadius: 12,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: form.vehicleCount === n ? '#EFF4FF' : 'white',
                    boxShadow: form.vehicleCount === n ? '0 0 0 2px rgba(10, 22, 40, 0.06)' : 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{n === 2 ? '2+' : n}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>{n === 0 ? 'None' : n === 1 ? 'Vehicle' : 'Vehicles'}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 10, padding: '8px 12px', background: '#EFF4FF', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#4338CA', fontWeight: 600, lineHeight: 1.4 }}>
                <i className="fa-solid fa-circle-info" style={{ fontSize: 10 }} />{' '}
                IRS allows: <strong>$662/mo</strong> ownership per vehicle (max 2). Operating cost varies by region. No vehicle = public transit allowance.
              </div>
            </div>
          </div>

          {/* Housing */}
          <div style={sectionCardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>Housing</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {([
                { type: 'rent' as HousingType, icon: 'fa-solid fa-building', color: '#2563EB', label: 'Rent' },
                { type: 'own' as HousingType, icon: 'fa-solid fa-house', color: '#00A651', label: 'Own' },
                { type: 'other' as HousingType, icon: 'fa-solid fa-people-roof', color: '#64748B', label: 'Other' },
              ]).map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => update('housingType', opt.type)}
                  style={{
                    flex: 1,
                    padding: '14px 10px',
                    border: form.housingType === opt.type ? '1.5px solid #2563EB' : '1.5px solid #F1F5F9',
                    borderRadius: 12,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: form.housingType === opt.type ? '#EFF4FF' : 'white',
                    boxShadow: form.housingType === opt.type ? '0 0 0 2px rgba(10, 22, 40, 0.06)' : 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  <i className={opt.icon} style={{ fontSize: 16, color: opt.color, marginBottom: 4, display: 'block' }} />
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0A1628' }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Alert */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#EFF4FF', border: '1px solid #BFDBFE', borderRadius: 12, fontSize: 13, color: '#0A1628', marginBottom: 12 }}>
            <i className="fa-solid fa-circle-info" style={{ flexShrink: 0, color: '#2563EB' }} />
            <span>These details determine your IRS National and Local Standards allowances</span>
          </div>

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
