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
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0A1628] border-t-transparent" />
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <h1 className="text-[1.2rem] font-extrabold text-[#0A1628]">My Account</h1>
          <Link href="/account/edit" className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A1628]">
            <i className="fas fa-pen-to-square text-base" />
          </Link>
        </div>

        <div className="flex flex-col gap-5 px-5 pb-8">
          {/* Profile Card */}
          <div className="flex flex-col items-center rounded-[20px] border border-[#E2E8F0] bg-white px-4 py-6">
            <div className="mb-3.5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#0A1628] text-[1.5rem] font-extrabold text-white">
              {initials.toUpperCase()}
            </div>
            <div className="text-[1.15rem] font-extrabold text-[#0A1628]">{displayName}</div>
            <div className="mt-0.5 text-[0.8rem] font-medium text-[#94A3B8]">{email}</div>
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#F8FAFC] px-3 py-1 text-[0.68rem] font-semibold text-[#64748B]">
              <i className="far fa-calendar text-[10px]" />
              Member since Oct 2025
            </div>
          </div>

          {/* Active Cases */}
          <div>
            <div className="mb-2.5 text-[0.75rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Active Cases</div>
            <Link href="/cases/1042" className="mb-2 flex items-center gap-3 rounded-[14px] border border-[#F3F4F6] bg-white p-3.5 no-underline">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
                <i className="fas fa-handshake text-sm text-[#0A1628]" />
              </div>
              <div className="flex-1">
                <div className="text-[0.82rem] font-semibold text-[#1F2937]">Case #1042 — OIC</div>
                <div className="text-[0.68rem] text-[#6B7280]">Under IRS Review</div>
              </div>
              <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[0.65rem] font-semibold text-[#0A1628]">Active</span>
            </Link>
            <Link href="/cases" className="block py-2 text-center text-[0.78rem] font-semibold text-[#0A1628] no-underline">
              View All Cases →
            </Link>
          </div>

          {/* Account Menu */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-1">
            {/* Billing & Subscription */}
            <Link href="/billing" className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5 no-underline transition hover:bg-[#F8FAFC]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F9EE]">
                <i className="fas fa-credit-card text-[13px] text-[#00A651]" />
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">Billing & Subscription</div>
                <div className="mt-px text-[0.68rem] text-[#94A3B8]">Pro Plan — $49/mo</div>
              </div>
              <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
            </Link>
            {/* Settings */}
            <Link href="/account/settings" className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5 no-underline transition hover:bg-[#F8FAFC]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F1F5F9]">
                <i className="fas fa-gear text-[13px] text-[#64748B]" />
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">Settings</div>
                <div className="mt-px text-[0.68rem] text-[#94A3B8]">Notifications, privacy, connections</div>
              </div>
              <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
            </Link>
            {/* Edit Profile */}
            <Link href="/account/edit" className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5 no-underline transition hover:bg-[#F8FAFC]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
                <i className="fas fa-pen-to-square text-[13px] text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">Edit Profile</div>
                <div className="mt-px text-[0.68rem] text-[#94A3B8]">Update your personal info</div>
              </div>
              <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
            </Link>
            {/* IRS Payments */}
            <Link href="/billing/payments" className="flex items-center gap-3.5 py-3.5 no-underline transition hover:bg-[#F8FAFC]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#FFF0F1]">
                <i className="fas fa-landmark text-[13px] text-[#E63946]" />
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">IRS Payments</div>
                <div className="mt-px text-[0.68rem] text-[#94A3B8]">Track and make IRS payments</div>
              </div>
              <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
            </Link>
          </div>

          {/* Personal Information */}
          <div>
            <div className="mb-3 px-1 text-[0.75rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Personal Information</div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-1">
              {[
                { icon: 'fa-user', label: 'Name', value: displayName },
                { icon: 'fa-envelope', label: 'Email', value: email },
                { icon: 'fa-phone', label: 'Phone', value: '(555) 123-4567' },
                { icon: 'fa-location-dot', label: 'Address', value: '123 Main St, Austin, TX' },
              ].map((item, i, arr) => (
                <div key={item.label} className={`flex items-center gap-3.5 py-3.5 ${i < arr.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
                    <i className={`fas ${item.icon} text-[13px] text-[#0A1628]`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[0.7rem] font-medium text-[#94A3B8]">{item.label}</div>
                    <div className="text-[0.85rem] font-semibold text-[#0A1628]">{item.value}</div>
                  </div>
                  <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
                </div>
              ))}
            </div>
          </div>

          {/* Tax Information */}
          <div>
            <div className="mb-3 px-1 text-[0.75rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Tax Information</div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-1">
              <div className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
                  <i className="fas fa-file-invoice text-[13px] text-[#7C3AED]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.7rem] font-medium text-[#94A3B8]">Filing Status</div>
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Single</div>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
              <div className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
                  <i className="fas fa-id-card text-[13px] text-[#7C3AED]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.7rem] font-medium text-[#94A3B8]">SSN</div>
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">***-**-6789</div>
                </div>
                <i className="fas fa-eye-slash text-[11px] text-[#CBD5E1]" />
              </div>
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
                  <i className="fas fa-users text-[13px] text-[#7C3AED]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.7rem] font-medium text-[#94A3B8]">Dependents</div>
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">2</div>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <div className="mb-3 px-1 text-[0.75rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Preferences</div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-1">
              {/* Notifications Toggle */}
              <div className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F9EE]">
                  <i className="fas fa-bell text-[13px] text-[#00A651]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Notifications</div>
                  <div className="mt-px text-[0.68rem] text-[#94A3B8]">Push & email alerts</div>
                </div>
                <button
                  onClick={() => setNotificationsOn(!notificationsOn)}
                  className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${notificationsOn ? 'bg-[#0A1628]' : 'bg-[#D5D5E0]'}`}
                >
                  <span className={`absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform ${notificationsOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                </button>
              </div>
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-3.5 border-b border-[#F1F5F9] py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#F8FAFC]">
                  <i className="fas fa-moon text-[13px] text-[#64748B]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Dark Mode</div>
                  <div className="mt-px text-[0.68rem] text-[#94A3B8]">Reduce eye strain</div>
                </div>
                <button
                  onClick={() => setDarkModeOn(!darkModeOn)}
                  className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${darkModeOn ? 'bg-[#0A1628]' : 'bg-[#D5D5E0]'}`}
                >
                  <span className={`absolute top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform ${darkModeOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
                </button>
              </div>
              {/* Language */}
              <div className="flex items-center gap-3.5 py-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF2FF]">
                  <i className="fas fa-globe text-[13px] text-[#4F46E5]" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Language</div>
                  <div className="mt-px text-[0.68rem] text-[#94A3B8]">English (US)</div>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <div className="mb-3 px-1 text-[0.75rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Support</div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white px-4 py-1">
              {[
                { icon: 'fa-circle-question', label: 'Help Center', color: 'text-[#0D9488]', bg: 'bg-[#F0FDFA]' },
                { icon: 'fa-headset', label: 'Contact Us', color: 'text-[#0D9488]', bg: 'bg-[#F0FDFA]' },
                { icon: 'fa-book-open', label: 'FAQ', color: 'text-[#0D9488]', bg: 'bg-[#F0FDFA]' },
              ].map((item, i, arr) => (
                <div key={item.label} className={`flex items-center gap-3.5 py-3.5 cursor-pointer transition hover:bg-[#F8FAFC] ${i < arr.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${item.bg}`}>
                    <i className={`fas ${item.icon} text-[13px] ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[0.85rem] font-semibold text-[#0A1628]">{item.label}</div>
                  </div>
                  <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
                </div>
              ))}
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="py-1">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('blasttax_onboarding')
                  window.location.href = '/login'
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#FFF0F1] bg-transparent px-7 py-3.5 text-[0.875rem] font-semibold text-[#E63946] transition hover:bg-[#FFF0F1] active:scale-[0.98]"
            >
              <i className="fas fa-right-from-bracket text-sm" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
