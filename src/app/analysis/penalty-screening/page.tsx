'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

export default function PenaltyScreeningPage() {
  const router = useRouter()
  const setAnswers = useWizard((s) => s.setAnswers)

  // Penalty data state (editable amounts)
  const [ftf2022, setFtf2022] = useState('$3,200')
  const [ftp2022, setFtp2022] = useState('$2,100')
  const [ftp2023, setFtp2023] = useState('$800')

  // Checkbox state for penalty selection
  const [checked, setChecked] = useState<Record<string, boolean>>({
    '2022-ftf': true,
    '2022-ftp': true,
    '2023-ftp': true,
    'form843-2022-ftf': true,
    'form843-2022-ftp': true,
    'form843-2023-ftp': true,
  })

  function toggleCheck(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleContinue() {
    setAnswers({ penaltyScreeningComplete: true })
    router.push('/analysis/compliance-check')
  }

  const checkboxStyle = (isChecked: boolean): React.CSSProperties => ({
    width: 20, height: 20,
    border: `2px solid ${isChecked ? '#2563EB' : '#E2E8F0'}`,
    borderRadius: 6, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, background: isChecked ? '#2563EB' : 'white',
    transition: 'all 0.2s ease',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            marginTop: 4, height: 4, width: '100%', borderRadius: 9999,
            background: '#E2E8F0', overflow: 'hidden',
          }}>
            <div style={{ height: '100%', width: '25%', borderRadius: 9999, background: '#00A651' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Step 2 of 6</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>Penalty Analysis</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column' }}>
          {/* Heading */}
          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, margin: 0 }}>
              Let&apos;s check your penalty history
            </h1>
            <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4, lineHeight: 1.5 }}>
              Edit amounts if needed. Select penalties to request abatement for.
            </p>
          </div>

          {/* 2022 Penalty Card */}
          <div style={{
            background: 'white', border: '1px solid #F1F5F9', borderRadius: 16,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', background: '#EFF4FF', color: '#2563EB',
                borderRadius: 9999, fontSize: 12, fontWeight: 700,
              }}>
                <i className="fa-solid fa-calendar" style={{ fontSize: 10 }} /> 2022
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>Penalties Only</span>
            </div>

            {/* FTF Penalty */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div onClick={() => toggleCheck('2022-ftf')} style={checkboxStyle(checked['2022-ftf'])}>
                  {checked['2022-ftf'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>TC 166</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to File</span>
              </div>
              <input
                type="text"
                value={ftf2022}
                onChange={(e) => setFtf2022(e.target.value)}
                style={{
                  maxWidth: 90, padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 700, color: '#0A1628', textAlign: 'right',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* FTP Penalty */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0',
              borderTop: '1px solid #F1F5F9',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div onClick={() => toggleCheck('2022-ftp')} style={checkboxStyle(checked['2022-ftp'])}>
                  {checked['2022-ftp'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>TC 170</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to Pay</span>
              </div>
              <input
                type="text"
                value={ftp2022}
                onChange={(e) => setFtp2022(e.target.value)}
                style={{
                  maxWidth: 90, padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 700, color: '#0A1628', textAlign: 'right',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Interest row (not abatable) */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0',
              borderTop: '1px solid #F1F5F9', opacity: 0.6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-ban" style={{ fontSize: 12, color: '#94A3B8' }} />
                </div>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>TC 276</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>Interest</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>$1,890</span>
            </div>
            <div style={{ padding: '4px 0 0 28px' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontStyle: 'italic' }}>Interest is not abatable</span>
            </div>

            {/* Penalty Assessment Dates */}
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 8 }}>
                Penalty Assessment Dates
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', minWidth: 90 }}>FTF (TC 166)</label>
                <input type="date" defaultValue="2023-04-18" style={{
                  width: '100%', padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 600, color: '#0A1628', outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', minWidth: 90 }}>FTP (TC 170)</label>
                <input type="date" defaultValue="2023-04-18" style={{
                  width: '100%', padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 600, color: '#0A1628', outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
            </div>
          </div>

          {/* 2023 Penalty Card */}
          <div style={{
            background: 'white', border: '1px solid #F1F5F9', borderRadius: 16,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', background: '#EFF4FF', color: '#2563EB',
                borderRadius: 9999, fontSize: 12, fontWeight: 700,
              }}>
                <i className="fa-solid fa-calendar" style={{ fontSize: 10 }} /> 2023
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>Penalties Only</span>
            </div>

            {/* FTP Penalty */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div onClick={() => toggleCheck('2023-ftp')} style={checkboxStyle(checked['2023-ftp'])}>
                  {checked['2023-ftp'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>TC 170</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to Pay</span>
              </div>
              <input
                type="text"
                value={ftp2023}
                onChange={(e) => setFtp2023(e.target.value)}
                style={{
                  maxWidth: 90, padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 13, fontWeight: 700, color: '#0A1628', textAlign: 'right',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Interest row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0',
              borderTop: '1px solid #F1F5F9', opacity: 0.6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-ban" style={{ fontSize: 12, color: '#94A3B8' }} />
                </div>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>TC 276</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>Interest</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>$650</span>
            </div>
            <div style={{ padding: '4px 0 0 28px' }}>
              <span style={{ fontSize: 11, color: '#94A3B8', fontStyle: 'italic' }}>Interest is not abatable</span>
            </div>

            {/* Penalty Assessment Dates */}
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 8 }}>
                Penalty Assessment Dates
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', minWidth: 90 }}>FTP (TC 170)</label>
                <input type="date" defaultValue="2024-04-16" style={{
                  width: '100%', padding: '8px 10px', background: '#F8FAFC',
                  border: '1.5px solid #F1F5F9', borderRadius: 8, fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 600, color: '#0A1628', outline: 'none', boxSizing: 'border-box',
                }} />
              </div>
            </div>
          </div>

          {/* FTA Eligibility Check */}
          <div style={{
            background: 'white', border: '1px solid #F1F5F9', borderRadius: 16,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: '#EFF4FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: 14, color: '#2563EB' }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>FTA Eligibility Check</span>
            </div>

            {/* 3-Year Clean History */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0',
            }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>3-Year Clean History?</span>
                <div style={{ fontSize: 11, color: '#00A651', fontWeight: 600, marginTop: 2 }}>
                  <i className="fa-solid fa-check" style={{ fontSize: 10 }} /> No penalties in 2019-2021
                </div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: '#00A651', background: '#E6F9EE',
                padding: '2px 8px', borderRadius: 9999,
              }}>Yes</span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>All Returns Filed?</span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: '#00A651', background: '#E6F9EE',
                padding: '2px 8px', borderRadius: 9999,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <i className="fa-solid fa-check" style={{ fontSize: 9 }} /> Yes
              </span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Current on Payments?</span>
              <span style={{
                fontSize: 11, fontWeight: 700, color: '#00A651', background: '#E6F9EE',
                padding: '2px 8px', borderRadius: 9999,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                <i className="fa-solid fa-check" style={{ fontSize: 9 }} /> Yes
              </span>
            </div>

            {/* Interest note */}
            <div style={{
              marginTop: 8, padding: '10px 12px', background: '#FEF3C7',
              borderRadius: 10, borderLeft: '3px solid #F59E0B',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>
                <i className="fa-solid fa-circle-info" style={{ fontSize: 10 }} /> Note: Interest cannot be abated through FTA
              </div>
            </div>
          </div>

          {/* FTA Results -- Per-Year Savings */}
          <div style={{
            background: '#ECFDF5', border: '1.5px solid #BBF7D0', borderRadius: 16,
            padding: 18, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', background: '#00A651',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}>
                <i className="fa-solid fa-party-horn" style={{ fontSize: 18, color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#065F46' }}>You qualify for First-Time Abatement!</div>
                <div style={{ fontSize: 11, color: '#059669' }}>Based on your clean compliance history</div>
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: '#065F46', textTransform: 'uppercase' as const, letterSpacing: '0.04em', marginBottom: 8 }}>
              Eligible Savings Per Year
            </div>

            {/* 2022 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', background: 'white', border: '1px solid #BBF7D0',
              borderRadius: 10, marginBottom: 8,
            }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>2022</span>
                <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 4 }}>FTF + FTP</span>
              </div>
              <span style={{
                fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em',
                background: 'linear-gradient(#00A651, #00A651)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>$3,200</span>
            </div>

            {/* 2023 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', background: 'white', border: '1px solid #BBF7D0',
              borderRadius: 10, marginBottom: 8,
            }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>2023</span>
                <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 4 }}>FTP</span>
              </div>
              <span style={{
                fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em',
                background: 'linear-gradient(#00A651, #00A651)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>$800</span>
            </div>

            {/* FTA application note */}
            <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#065F46', fontWeight: 600 }}>
                <i className="fa-solid fa-lightbulb" style={{ fontSize: 10, color: '#F59E0B' }} /> FTA applies to the most recent eligible year first
              </div>
            </div>

            {/* Total */}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #BBF7D0', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#059669', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                Total Potential Savings
              </div>
              <div style={{
                fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.02em',
                background: 'linear-gradient(#00A651, #00A651)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>$4,000</div>
            </div>
          </div>

          {/* Form 843 Penalty Selection */}
          <div style={{
            background: 'white', border: '1px solid #F1F5F9', borderRadius: 16,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: '#EFF4FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fa-solid fa-file-pen" style={{ fontSize: 14, color: '#2563EB' }} />
              </div>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>Form 843 Penalty Selection</span>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Select which penalties to request abatement for</div>
              </div>
            </div>

            {/* 2022 */}
            <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>2022</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div onClick={() => toggleCheck('form843-2022-ftf')} style={checkboxStyle(checked['form843-2022-ftf'])}>
                  {checked['form843-2022-ftf'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to File (TC 166) - $3,200</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div onClick={() => toggleCheck('form843-2022-ftp')} style={checkboxStyle(checked['form843-2022-ftp'])}>
                  {checked['form843-2022-ftp'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to Pay (TC 170) - $2,100</span>
              </div>
            </div>

            {/* 2023 */}
            <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>2023</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div onClick={() => toggleCheck('form843-2023-ftp')} style={checkboxStyle(checked['form843-2023-ftp'])}>
                  {checked['form843-2023-ftp'] && (
                    <div style={{ width: 6, height: 10, border: '2px solid white', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', marginTop: -2 }} />
                  )}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0A1628' }}>Failure to Pay (TC 170) - $800</span>
              </div>
            </div>
          </div>

          {/* TC Code References */}
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', marginBottom: 6 }}>Transaction Codes Referenced</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {['TC 160', 'TC 166', 'TC 170', 'TC 171', 'TC 270', 'TC 276'].map((tc) => (
                <span key={tc} style={{
                  display: 'inline-flex', padding: '2px 8px', background: '#F8FAFC',
                  borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: '0.02em',
                }}>{tc}</span>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: 16 }} />

          {/* Continue */}
          <div style={{ padding: '12px 0 20px' }}>
            <button
              onClick={handleContinue}
              style={{
                width: '100%', padding: '16px 28px', fontSize: 15, fontWeight: 700,
                background: '#00A651', color: 'white', border: 'none', borderRadius: 9999,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'inherit',
                transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              Continue
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
