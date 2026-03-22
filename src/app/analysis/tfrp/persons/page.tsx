'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ResponsiblePerson {
  id: string
  name: string
  ssn: string
  title: string
  ownership: string
  period: string
  checkSigning: boolean
  financialDecision: boolean
  hireFire: boolean
  madeDeposits: boolean
  isPrimary: boolean
}

let nextId = 3

export default function TFRPPersonsPage() {
  const router = useRouter()
  const [persons, setPersons] = useState<ResponsiblePerson[]>([
    { id: '1', name: 'John Smith', ssn: '****1234', title: 'President / CEO', ownership: '60', period: '2020 - Present', checkSigning: true, financialDecision: true, hireFire: true, madeDeposits: false, isPrimary: true },
    { id: '2', name: 'Jane Smith', ssn: '', title: 'Secretary / Treasurer', ownership: '40', period: '2021 - Present', checkSigning: true, financialDecision: false, hireFire: false, madeDeposits: false, isPrimary: false },
  ])
  const [letter1153, setLetter1153] = useState(false)
  const [letter1153Date, setLetter1153Date] = useState('')

  function addPerson() {
    setPersons((prev) => [...prev, {
      id: String(nextId++), name: '', ssn: '', title: '', ownership: '', period: '',
      checkSigning: false, financialDecision: false, hireFire: false, madeDeposits: false, isPrimary: false,
    }])
  }

  function updatePerson(id: string, field: keyof ResponsiblePerson, value: string | boolean) {
    setPersons((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p))
  }

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5',
    borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
    color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' as const,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0',
    textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '5px',
  }

  const toggleSwitchStyle = (checked: boolean): React.CSSProperties => ({
    width: '36px', height: '20px', appearance: 'none' as const, background: checked ? '#2563EB' : '#D5D5E0',
    borderRadius: '10px', position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s ease', flexShrink: 0, border: 'none',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#D5D5E0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '33%', borderRadius: '9999px', background: '#1A1A2E', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8585A0' }}>Step 1 of 3</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>TFRP Track</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25 }}>Responsible Person Identification</h1>
            <p style={{ fontSize: '13px', color: '#8585A0', marginTop: '4px' }}>Identify all persons with TFRP exposure under IRC 6672.</p>
          </div>

          {/* Warning Alert */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#FEF2F2', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '14px', marginBottom: '14px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E63946' }} />
            <span style={{ fontSize: '12px', color: '#991B1B' }}>Each responsible person is liable for the FULL trust fund amount ($29,260). There is no pro-rata sharing.</span>
          </div>

          {/* Person Cards */}
          {persons.map((person, pi) => (
            <div key={person.id} style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '18px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#FEF2F2', color: '#991B1B', borderRadius: '9999px', fontSize: '12px', fontWeight: 700 }}>
                  <i className="fa-solid fa-user-shield" style={{ fontSize: '10px' }} /> Person {pi + 1}
                </span>
                {person.isPrimary && <span style={{ fontSize: '11px', color: '#8585A0' }}>Primary</span>}
              </div>

              {/* Person 1 fields */}
              {person.isPrimary ? (
                <>
                  <div style={{ display: 'flex', gap: '10px', marginTop: 0 }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" value={person.name} onChange={(e) => updatePerson(person.id, 'name', e.target.value)} style={fieldInputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>SSN (Last 4)</label>
                      <input type="text" value={person.ssn} onChange={(e) => updatePerson(person.id, 'ssn', e.target.value)} maxLength={9} style={fieldInputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Title / Role</label>
                      <input type="text" value={person.title} onChange={(e) => updatePerson(person.id, 'title', e.target.value)} style={fieldInputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Ownership %</label>
                      <input type="number" value={person.ownership} onChange={(e) => updatePerson(person.id, 'ownership', e.target.value)} max={100} style={fieldInputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Period of Authority</label>
                      <input type="text" value={person.period} onChange={(e) => updatePerson(person.id, 'period', e.target.value)} style={fieldInputStyle} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '10px', marginTop: 0 }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Full Name</label>
                      <input type="text" value={person.name} onChange={(e) => updatePerson(person.id, 'name', e.target.value)} style={fieldInputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Title / Role</label>
                      <input type="text" value={person.title} onChange={(e) => updatePerson(person.id, 'title', e.target.value)} style={fieldInputStyle} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Ownership %</label>
                      <input type="number" value={person.ownership} onChange={(e) => updatePerson(person.id, 'ownership', e.target.value)} max={100} style={fieldInputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Period of Authority</label>
                      <input type="text" value={person.period} onChange={(e) => updatePerson(person.id, 'period', e.target.value)} style={fieldInputStyle} />
                    </div>
                  </div>
                </>
              )}

              {/* Toggle switches */}
              {(person.isPrimary ? [
                { field: 'checkSigning' as const, label: 'Check-signing authority?' },
                { field: 'financialDecision' as const, label: 'Financial decision authority?' },
                { field: 'hireFire' as const, label: 'Hire/fire authority?' },
                { field: 'madeDeposits' as const, label: 'Made federal tax deposits?' },
              ] : [
                { field: 'checkSigning' as const, label: 'Check-signing authority?' },
                { field: 'financialDecision' as const, label: 'Financial decision authority?' },
              ]).map((sw) => (
                <label key={sw.field} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={person[sw.field]}
                    onChange={() => updatePerson(person.id, sw.field, !person[sw.field])}
                    style={toggleSwitchStyle(person[sw.field])}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#5C5C7A' }}>{sw.label}</span>
                </label>
              ))}

              <div style={{ marginTop: '10px', padding: '10px', background: '#FEF2F2', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>TFRP Exposure: $29,260</div>
                {person.isPrimary && <div style={{ fontSize: '10.5px', color: '#991B1B', marginTop: '2px' }}>100% of trust fund amount</div>}
              </div>
            </div>
          ))}

          {/* Add Person Button */}
          <button
            onClick={addPerson}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#EFF4FF', color: '#2563EB', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}
          >
            <i className="fa-solid fa-plus" style={{ fontSize: '10px' }} /> Add Responsible Person
          </button>

          {/* Form 4180 */}
          <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>
              <i className="fa-solid fa-gavel" style={{ fontSize: '12px', color: '#2563EB' }} /> Form 4180 Interview
            </div>
            <div style={{ fontSize: '12px', color: '#5C5C7A', lineHeight: 1.6, marginBottom: '8px' }}>The IRS will interview each potential responsible person using Form 4180. Prepare thoroughly before the interview.</div>
            <button
              onClick={() => router.push('/analysis/tfrp/form-4180')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '12px', border: '1.5px solid #D5D5E0', background: 'white', padding: '12px 20px', fontSize: '13px', fontWeight: 600, color: '#1A1A2E', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Prepare for Form 4180 <i className="fa-solid fa-arrow-right" style={{ fontSize: '11px' }} />
            </button>
          </div>

          {/* Letter 1153 */}
          <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-envelope" style={{ fontSize: '14px', color: '#E63946' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>Letter 1153 Received?</span>
                <p style={{ fontSize: '11.5px', color: '#5C5C7A', marginTop: '2px' }}>If yes, you have 60 days to appeal. Missing this deadline means automatic assessment.</p>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={letter1153}
                onChange={() => setLetter1153(!letter1153)}
                style={toggleSwitchStyle(letter1153)}
              />
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#5C5C7A' }}>Letter 1153 received?</span>
            </label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Date Received</label>
                <input type="date" value={letter1153Date} onChange={(e) => setLetter1153Date(e.target.value)} style={fieldInputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Appeal Deadline</label>
                <div style={{ padding: '10px 12px', background: '#FEF2F2', border: '1.5px solid #FEE2E2', borderRadius: '10px', fontSize: '14px', fontWeight: 700, color: '#991B1B' }}>--</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/tfrp/form-4180')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '16px', background: '#1A1A2E', color: 'white', fontSize: '15px', fontWeight: 700, padding: '16px 28px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Continue <i className="fa-solid fa-arrow-right" style={{ fontSize: '13px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
