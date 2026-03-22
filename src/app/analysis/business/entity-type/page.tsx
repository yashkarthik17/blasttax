'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EntityOption {
  id: string
  label: string
  sub: string
  iconBg: string
  iconColor: string
  icon: string
}

const ENTITIES: EntityOption[] = [
  { id: 'sole-prop', label: 'Sole Proprietor', sub: 'Schedule C on 1040 + 941/940 if employees', iconBg: '#FEF3C7', iconColor: '#D97706', icon: 'fa-user' },
  { id: 'partnership', label: 'Partnership', sub: 'Form 1065 + K-1s to partners', iconBg: '#F0FDFA', iconColor: '#0D9488', icon: 'fa-handshake' },
  { id: 's-corp', label: 'S-Corporation', sub: 'Form 1120-S + K-1s to shareholders', iconBg: '#EFF4FF', iconColor: '#2563EB', icon: 'fa-building' },
  { id: 'c-corp', label: 'C-Corporation', sub: 'Form 1120 + 21% flat corporate rate', iconBg: '#F5F3FF', iconColor: '#7C3AED', icon: 'fa-city' },
  { id: 'llc', label: 'LLC', sub: 'Tax classification depends on election', iconBg: '#FDF2F8', iconColor: '#DB2777', icon: 'fa-shield-halved' },
]

const LLC_TYPES = [
  { id: 'sole-prop', label: 'Single-Member (Sole Prop)' },
  { id: 'partnership', label: 'Multi-Member (Partnership)' },
  { id: 's-corp', label: 'S-Corp Election' },
  { id: 'c-corp', label: 'C-Corp Election' },
]

const RT_MAP: Record<string, string> = {
  'sole-prop': 'Schedule C (1040)',
  'partnership': 'Form 1065',
  's-corp': 'Form 1120-S',
  'c-corp': 'Form 1120',
}

const STATES = ['AZ', 'CA', 'DE', 'FL', 'NV', 'NY', 'TX', 'WA', 'Other']

export default function EntityTypePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [llcClass, setLlcClass] = useState<string | null>(null)
  const [numOwners, setNumOwners] = useState('1')
  const [stateInc, setStateInc] = useState('')
  const [dateInc, setDateInc] = useState('')
  const [ein, setEin] = useState('')
  const [numEmployees, setNumEmployees] = useState('0')
  const [naics, setNaics] = useState('')
  const [opStatus, setOpStatus] = useState<'operating' | 'oob' | null>(null)
  const [dateCeased, setDateCeased] = useState('')

  const effectiveEntity = selected === 'llc' ? llcClass : selected
  const showDetails = selected && (selected !== 'llc' || llcClass)

  const fieldInputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', background: '#FAFAFF', border: '1.5px solid #F0F0F5',
    borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
    color: '#1A1A2E', outline: 'none', boxSizing: 'border-box' as const,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, color: '#8585A0',
    textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '5px',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ height: '6px', width: '100%', borderRadius: '9999px', background: '#D5D5E0', overflow: 'hidden', marginTop: '4px' }}>
            <div style={{ height: '100%', width: '10%', borderRadius: '9999px', background: '#1A1A2E', transition: 'all 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8585A0' }}>Step 1 of 8</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>Business Track</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ marginBottom: '6px' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.25 }}>Business Entity Classification</h1>
            <p style={{ fontSize: '13px', color: '#8585A0', marginTop: '4px', lineHeight: 1.5 }}>Select your entity type to determine tax obligations and resolution options.</p>
          </div>

          {/* Entity Cards */}
          <div>
            {ENTITIES.map((ent) => (
              <div
                key={ent.id}
                onClick={() => { setSelected(ent.id); if (ent.id !== 'llc') setLlcClass(null) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
                  background: selected === ent.id ? '#EFF4FF' : 'white',
                  border: selected === ent.id ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
                  borderRadius: '14px', cursor: 'pointer', transition: 'all 0.3s ease', marginBottom: '10px',
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, background: ent.iconBg, color: ent.iconColor }}>
                  <i className={`fa-solid ${ent.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1A1A2E', display: 'block' }}>{ent.label}</span>
                  <span style={{ fontSize: '11px', color: '#8585A0' }}>{ent.sub}</span>
                </div>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '9999px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto',
                  border: selected === ent.id ? '2px solid #2563EB' : '2px solid #D5D5E0',
                  background: selected === ent.id ? '#2563EB' : 'transparent',
                }}>
                  {selected === ent.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />}
                </div>
              </div>
            ))}
          </div>

          {/* LLC Sub-selection */}
          {selected === 'llc' && (
            <div style={{ padding: '12px', background: '#FAFAFF', borderRadius: '12px', marginTop: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#8585A0', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: '8px' }}>LLC Tax Classification</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
                {LLC_TYPES.map((lt) => (
                  <div
                    key={lt.id}
                    onClick={() => setLlcClass(lt.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px',
                      background: llcClass === lt.id ? '#EFF4FF' : '#FAFAFF',
                      border: llcClass === lt.id ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
                      borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                      color: llcClass === lt.id ? '#2563EB' : '#5C5C7A', cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >{lt.label}</div>
                ))}
              </div>
              {llcClass && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: '#EFF4FF', borderRadius: '20px', fontSize: '10px', fontWeight: 700, color: '#2563EB', marginTop: '6px' }}>
                  <i className="fa-solid fa-file-lines" style={{ fontSize: '9px' }} /> Taxed as: {RT_MAP[llcClass]}
                </div>
              )}
            </div>
          )}

          {/* Return type tags */}
          {effectiveEntity && (
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px', marginTop: '12px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: '#EFF4FF', borderRadius: '20px', fontSize: '10px', fontWeight: 700, color: '#2563EB' }}>
                <i className="fa-solid fa-file-lines" style={{ fontSize: '9px' }} /> {RT_MAP[effectiveEntity] || '--'}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: '#FFFBEB', borderRadius: '20px', fontSize: '10px', fontWeight: 700, color: '#92400E' }}>
                <i className="fa-solid fa-users" style={{ fontSize: '9px' }} /> 941/940 if employees
              </div>
            </div>
          )}

          {/* Business Details */}
          {showDetails && (
            <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginTop: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' }}>
                <i className="fa-solid fa-building" style={{ fontSize: '12px', color: '#2563EB' }} /> Business Details
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: 0 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Owners / Shareholders</label>
                  <input type="number" value={numOwners} onChange={(e) => setNumOwners(e.target.value)} min={1} style={fieldInputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>State of Incorporation</label>
                  <select value={stateInc} onChange={(e) => setStateInc(e.target.value)} style={{ ...fieldInputStyle, appearance: 'none' as const, paddingRight: '32px' }}>
                    <option value="">Select...</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Date of Incorporation</label>
                  <input type="date" value={dateInc} onChange={(e) => setDateInc(e.target.value)} style={fieldInputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Business EIN</label>
                  <input type="text" placeholder="XX-XXXXXXX" maxLength={10} value={ein} onChange={(e) => setEin(e.target.value)} style={fieldInputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Number of Employees</label>
                  <input type="number" value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} min={0} style={fieldInputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>NAICS Code (optional)</label>
                  <input type="text" placeholder="e.g. 541110" value={naics} onChange={(e) => setNaics(e.target.value)} style={fieldInputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* Operating Status */}
          {showDetails && (
            <div style={{ background: 'white', border: '1px solid #F0F0F5', borderRadius: '16px', padding: '16px', marginBottom: '12px', marginTop: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' }}>
                <i className="fa-solid fa-power-off" style={{ fontSize: '12px', color: '#2563EB' }} /> Business Operating Status
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  onClick={() => setOpStatus('operating')}
                  style={{
                    flex: 1, justifyContent: 'center', padding: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: opStatus === 'operating' ? '#EFF4FF' : '#FAFAFF',
                    border: opStatus === 'operating' ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
                    borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                    color: opStatus === 'operating' ? '#2563EB' : '#5C5C7A', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '11px' }} /> Operating
                </div>
                <div
                  onClick={() => setOpStatus('oob')}
                  style={{
                    flex: 1, justifyContent: 'center', padding: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: opStatus === 'oob' ? '#EFF4FF' : '#FAFAFF',
                    border: opStatus === 'oob' ? '1.5px solid #2563EB' : '1.5px solid #F0F0F5',
                    borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                    color: opStatus === 'oob' ? '#2563EB' : '#5C5C7A', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  <i className="fa-solid fa-circle-xmark" style={{ fontSize: '11px' }} /> Out of Business
                </div>
              </div>
              {opStatus === 'operating' && (
                <div style={{ display: 'block', marginTop: '12px', padding: '14px', borderRadius: '12px', border: '1.5px solid rgba(0,166,81,0.15)', background: '#E6F9EE' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: '14px', color: '#00A651' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#065F46' }}>Business is Operating</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#065F46', lineHeight: 1.5 }}>Operating businesses must be current on tax deposits. Deposit compliance checked next.</p>
                </div>
              )}
              {opStatus === 'oob' && (
                <div style={{ display: 'block', marginTop: '12px', padding: '14px', borderRadius: '12px', border: '1.5px solid rgba(245,166,35,0.2)', background: '#FFFBEB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '14px', color: '#92400E' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400E' }}>Business is Closed</span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#92400E', lineHeight: 1.5, marginBottom: '10px' }}>Final returns must be filed. Trust fund liability transfers to responsible persons via TFRP.</p>
                  <div>
                    <label style={{ ...labelStyle, color: '#92400E' }}>Date Ceased Operations</label>
                    <input type="date" value={dateCeased} onChange={(e) => setDateCeased(e.target.value)} style={fieldInputStyle} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: '#EFF4FF', border: '1px solid rgba(37,99,235,0.15)', borderRadius: '14px' }}>
              <i className="fa-solid fa-circle-info" style={{ color: '#2563EB', marginTop: '2px' }} />
              <span style={{ fontSize: '12px', color: '#1A1A2E' }}>Your entity type determines which tax returns are required and which resolution paths are available.</span>
            </div>
          </div>

          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={() => router.push('/analysis/business/compliance')}
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
