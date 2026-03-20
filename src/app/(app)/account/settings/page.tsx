'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [pushNotifs, setPushNotifs] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [caseAlerts, setCaseAlerts] = useState(true)
  const [marketing, setMarketing] = useState(false)

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        style={{
          position: 'relative',
          width: 46,
          height: 26,
          borderRadius: 9999,
          background: on ? '#00A651' : '#D5D5E0',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: on ? 'translateX(22px)' : 'translateX(3px)',
          }}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 12px' }}>
          <button
            onClick={() => router.back()}
            style={{ color: '#0A1628', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 18 }} />
          </button>
          <span style={{ marginLeft: 12, fontSize: '0.95rem', fontWeight: 800, color: '#0A1628' }}>Settings</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '0 20px 20px' }}>
          {/* Connected Services */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, padding: '0 4px' }}>Connected Services</div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)' }}>
              {/* IRS e-Services */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-landmark" style={{ fontSize: 15, color: '#0A1628' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>IRS e-Services</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3, padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, color: '#00A651' }}>
                    <i className="fas fa-circle" style={{ fontSize: 5 }} /> Connected
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', cursor: 'pointer' }}>Disconnect</span>
              </div>
              {/* Plaid */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-building-columns" style={{ fontSize: 15, color: '#0D9488' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Plaid (Chase Bank)</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3, padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, color: '#00A651' }}>
                    <i className="fas fa-circle" style={{ fontSize: 5 }} /> Connected
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0A1628', cursor: 'pointer' }}>Manage</span>
              </div>
              {/* Google Account */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fab fa-google" style={{ fontSize: 15, color: '#E63946' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Google Account</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3, padding: '2px 8px', background: '#E6F9EE', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, color: '#00A651' }}>
                    <i className="fas fa-circle" style={{ fontSize: 5 }} /> Connected
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', cursor: 'pointer' }}>Disconnect</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, padding: '0 4px' }}>Notifications</div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)' }}>
              {[
                { icon: 'fa-bell', label: 'Push Notifications', on: pushNotifs, toggle: () => setPushNotifs(!pushNotifs), iconColor: '#64748B' },
                { icon: 'fa-envelope', label: 'Email Updates', on: emailUpdates, toggle: () => setEmailUpdates(!emailUpdates), iconColor: '#64748B' },
                { icon: 'fa-circle-exclamation', label: 'Case Status Alerts', on: caseAlerts, toggle: () => setCaseAlerts(!caseAlerts), iconColor: '#64748B' },
                { icon: 'fa-bullhorn', label: 'Marketing', on: marketing, toggle: () => setMarketing(!marketing), iconColor: '#CBD5E1' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <i className={`fas ${item.icon}`} style={{ fontSize: 15, color: item.iconColor }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>{item.label}</span>
                  </div>
                  <Toggle on={item.on} onToggle={item.toggle} />
                </div>
              ))}
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, padding: '0 4px' }}>Data & Privacy</div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)' }}>
              {/* Download My Data */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-download" style={{ fontSize: 15, color: '#64748B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Download My Data</span>
                </div>
                <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </div>
              {/* Delete Account */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-trash-can" style={{ fontSize: 15, color: '#E63946' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E63946' }}>Delete Account</span>
                </div>
                <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </div>
              {/* Privacy Policy */}
              <Link
                href="/privacy"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: '1px solid #F1F5F9',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-shield-halved" style={{ fontSize: 15, color: '#64748B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Privacy Policy</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </Link>
              {/* Terms of Service */}
              <Link
                href="/terms"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-file-contract" style={{ fontSize: 15, color: '#64748B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Terms of Service</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, padding: '0 4px' }}>About</div>
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)' }}>
              {/* Version */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-code-branch" style={{ fontSize: 15, color: '#64748B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Version</span>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#94A3B8' }}>3.0.0</span>
              </div>
              {/* Rate the App */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-star" style={{ fontSize: 15, color: '#F59E0B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Rate the App</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </div>
              {/* Send Feedback */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <i className="fas fa-message" style={{ fontSize: 15, color: '#64748B' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628' }}>Send Feedback</span>
                </div>
                <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
