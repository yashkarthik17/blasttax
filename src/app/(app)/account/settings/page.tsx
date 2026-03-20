'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ToggleSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

export default function SettingsPage() {
  const [notifSettings, setNotifSettings] = useState<ToggleSetting[]>([
    {
      id: 'email_updates',
      label: 'Email Updates',
      description: 'Receive email notifications for case updates and analysis results',
      enabled: true,
    },
    {
      id: 'payment_reminders',
      label: 'Payment Reminders',
      description: 'Get notified before upcoming payment deadlines',
      enabled: true,
    },
    {
      id: 'marketing',
      label: 'Product Updates',
      description: 'Receive news about new features and improvements',
      enabled: false,
    },
  ])

  const [darkMode, setDarkMode] = useState(true)

  function toggleNotif(id: string) {
    setNotifSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Manage your preferences and account settings.
          </p>
        </div>

        {/* Notifications */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {notifSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleNotif(setting.id)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    setting.enabled ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      setting.enabled ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-[var(--muted-foreground)]">Use dark theme across the application</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  darkMode ? 'bg-[var(--primary)]' : 'bg-[var(--secondary)]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    darkMode ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Security</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Change Password</p>
                <p className="text-xs text-[var(--muted-foreground)]">Update your account password</p>
              </div>
              <button className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]">
                Update
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-[var(--muted-foreground)]">Add an extra layer of security to your account</p>
              </div>
              <button className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]">
                Enable
              </button>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Privacy</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-xs text-[var(--muted-foreground)]">Download all your data in a portable format</p>
              </div>
              <button className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]">
                Export
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-[var(--destructive)]">Delete Account</p>
                <p className="text-xs text-[var(--muted-foreground)]">Permanently remove your account and all associated data</p>
              </div>
              <button className="rounded-lg border border-[var(--destructive)]/30 px-4 py-2 text-sm font-medium text-[var(--destructive)] transition hover:bg-[var(--destructive)]/10">
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Legal</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            <Link href="#" className="flex items-center justify-between p-4 transition hover:bg-[var(--secondary)]/50">
              <p className="text-sm font-medium">Terms of Service</p>
              <svg className="h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 transition hover:bg-[var(--secondary)]/50">
              <p className="text-sm font-medium">Privacy Policy</p>
              <svg className="h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 transition hover:bg-[var(--secondary)]/50">
              <p className="text-sm font-medium">Disclaimer</p>
              <svg className="h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
