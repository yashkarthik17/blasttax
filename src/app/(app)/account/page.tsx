'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface OnboardingData {
  firstName: string
  lastName: string
  email: string
}

export default function AccountPage() {
  const [userData, setUserData] = useState<OnboardingData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [notificationsOn, setNotificationsOn] = useState(true)
  const [darkModeOn, setDarkModeOn] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('blasttax_onboarding')
      if (stored) {
        setUserData(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#FAFAFF' }}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1A1A2E] border-t-transparent" />
      </div>
    )
  }

  const initials = userData
    ? `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`
    : 'JD'

  const displayName =
    userData?.firstName || userData?.lastName
      ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
      : 'Jane Doe'

  const email = userData?.email || 'jane.doe@email.com'

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFF' }}>
      <div className="mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>My Account</div>
          <Link href="/account/edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, color: '#1A1A2E', textDecoration: 'none' }}>
            <i className="fas fa-pen-to-square" style={{ fontSize: 16 }} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '0 20px 20px' }}>
          {/* Desktop: 2-column layout for profile + menu */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* Left column: Profile Card + Active Cases */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              {/* Profile Card */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', background: 'white', borderRadius: 20, border: '1px solid #D5D5E0' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: '#1A1A2E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  {initials.toUpperCase()}
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1A2E' }}>{displayName}</div>
                <div style={{ fontSize: '0.8rem', color: '#8585A0', fontWeight: 500, marginTop: 3 }}>{email}</div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 10,
                    padding: '4px 12px',
                    background: '#FAFAFF',
                    borderRadius: 9999,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: '#5C5C7A',
                  }}
                >
                  <i className="far fa-calendar" style={{ fontSize: 10 }} />
                  Member since Oct 2025
                </div>
              </div>

              {/* Active Cases */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Active Cases</div>

                {/* Case 1 */}
                <Link
                  href="/cases/1042"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    background: 'white',
                    border: '1px solid #E8E8F0',
                    borderRadius: 14,
                    marginBottom: 8,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-handshake" style={{ fontSize: 14, color: '#1A1A2E' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>Case #1042 — OIC</div>
                    <div style={{ fontSize: '0.68rem', color: '#5C5C7A' }}>Under IRS Review</div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '3px 8px', background: '#EFF4FF', color: '#1A1A2E', borderRadius: 9999 }}>Active</span>
                </Link>

                {/* View All */}
                <Link
                  href="/cases"
                  style={{ display: 'block', textAlign: 'center', fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E', padding: 8, textDecoration: 'none' }}
                >
                  View All Cases →
                </Link>
              </div>
            </div>

            {/* Right column: Account Menu + Personal Information + Tax Info + Preferences + Support */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Account Menu */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid #D5D5E0', padding: '4px 16px' }}>
                {/* Billing & Subscription */}
                <Link
                  href="/billing"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: '1px solid #F0F0F5',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-credit-card" style={{ fontSize: 13, color: '#00A651' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Billing & Subscription</div>
                    <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Pro Plan — $49/mo</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                </Link>
                {/* Settings */}
                <Link
                  href="/account/settings"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: '1px solid #F0F0F5',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-gear" style={{ fontSize: 13, color: '#5C5C7A' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Settings</div>
                    <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Notifications, privacy, connections</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                </Link>
                {/* Edit Profile */}
                <Link
                  href="/account/edit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: '1px solid #F0F0F5',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-pen-to-square" style={{ fontSize: 13, color: '#2563EB' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Edit Profile</div>
                    <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Update your personal info</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                </Link>
                {/* IRS Payments */}
                <Link
                  href="/billing/payment-methods"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FFF0F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-landmark" style={{ fontSize: 13, color: '#E63946' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>IRS Payments</div>
                    <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Track and make IRS payments</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                </Link>
              </div>

              {/* Personal + Tax Info: 2-col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Personal Information */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Personal Information</div>
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #D5D5E0', padding: '4px 16px' }}>
                    {[
                      { icon: 'fa-user', label: 'Name', value: displayName },
                      { icon: 'fa-envelope', label: 'Email', value: email },
                      { icon: 'fa-phone', label: 'Phone', value: '(555) 123-4567' },
                      { icon: 'fa-location-dot', label: 'Address', value: '123 Main St, Austin, TX' },
                    ].map((item, i, arr) => (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '14px 0',
                          borderBottom: i < arr.length - 1 ? '1px solid #F0F0F5' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className={`fas ${item.icon}`} style={{ fontSize: 13, color: '#1A1A2E' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.7rem', color: '#8585A0', fontWeight: 500 }}>{item.label}</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{item.value}</div>
                        </div>
                        <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Information */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Tax Information</div>
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #D5D5E0', padding: '4px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F0F5', cursor: 'pointer' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-file-invoice" style={{ fontSize: 13, color: '#7C3AED' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: '#8585A0', fontWeight: 500 }}>Filing Status</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Single</div>
                      </div>
                      <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F0F5', cursor: 'pointer' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-id-card" style={{ fontSize: 13, color: '#7C3AED' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: '#8585A0', fontWeight: 500 }}>SSN</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>***-**-6789</div>
                      </div>
                      <i className="fas fa-eye-slash" style={{ fontSize: 11, color: '#B0B0C8' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', cursor: 'pointer' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F5F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-users" style={{ fontSize: 13, color: '#7C3AED' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: '#8585A0', fontWeight: 500 }}>Dependents</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>2</div>
                      </div>
                      <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences + Support: 2-col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferences */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Preferences</div>
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #D5D5E0', padding: '4px 16px' }}>
                    {/* Notifications Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F0F5' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E6F9EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-bell" style={{ fontSize: 13, color: '#00A651' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Notifications</div>
                        <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Push & email alerts</div>
                      </div>
                      <button
                        onClick={() => setNotificationsOn(!notificationsOn)}
                        style={{
                          position: 'relative',
                          width: 46,
                          height: 26,
                          borderRadius: 13,
                          background: notificationsOn ? '#1A1A2E' : '#D5D5E0',
                          border: 'none',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            top: 2,
                            left: notificationsOn ? 22 : 2,
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: '0 1px 4px rgba(10,22,40,0.15)',
                            transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        />
                      </button>
                    </div>
                    {/* Dark Mode Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid #F0F0F5' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#FAFAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-moon" style={{ fontSize: 13, color: '#5C5C7A' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Dark Mode</div>
                        <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>Reduce eye strain</div>
                      </div>
                      <button
                        onClick={() => setDarkModeOn(!darkModeOn)}
                        style={{
                          position: 'relative',
                          width: 46,
                          height: 26,
                          borderRadius: 13,
                          background: darkModeOn ? '#1A1A2E' : '#D5D5E0',
                          border: 'none',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            top: 2,
                            left: darkModeOn ? 22 : 2,
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: 'white',
                            boxShadow: '0 1px 4px rgba(10,22,40,0.15)',
                            transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        />
                      </button>
                    </div>
                    {/* Language */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', cursor: 'pointer' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="fas fa-globe" style={{ fontSize: 13, color: '#4F46E5' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>Language</div>
                        <div style={{ fontSize: '0.68rem', color: '#8585A0', marginTop: 1 }}>English (US)</div>
                      </div>
                      <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, padding: '0 4px' }}>Support</div>
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #D5D5E0', padding: '4px 16px' }}>
                    {[
                      { icon: 'fa-circle-question', label: 'Help Center' },
                      { icon: 'fa-headset', label: 'Contact Us' },
                      { icon: 'fa-book-open', label: 'FAQ' },
                    ].map((item, i, arr) => (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '14px 0',
                          borderBottom: i < arr.length - 1 ? '1px solid #F0F0F5' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className={`fas ${item.icon}`} style={{ fontSize: 13, color: '#0D9488' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{item.label}</div>
                        </div>
                        <i className="fas fa-chevron-right" style={{ fontSize: 11, color: '#D5D5E0' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out Button */}
          <div style={{ paddingTop: 4, paddingBottom: 8 }}>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('blasttax_onboarding')
                  window.location.href = '/login'
                }
              }}
              style={{
                width: '100%',
                padding: '14px 28px',
                background: 'transparent',
                color: '#E63946',
                border: '1.5px solid #FFF0F1',
                borderRadius: 9999,
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <i className="fas fa-right-from-bracket" style={{ fontSize: 14 }} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
