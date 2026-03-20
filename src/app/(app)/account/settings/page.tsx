'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [pushNotifs, setPushNotifs] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [caseAlerts, setCaseAlerts] = useState(true)
  const [marketing, setMarketing] = useState(false)

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${on ? 'bg-[#00A651]' : 'bg-[#D5D5E0]'}`}
      >
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Connected Services */}
        <div>
          <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Connected Services</div>
          <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-card">
            <div className="flex items-center gap-3 border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
                <svg className="h-4 w-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">IRS e-Services</div>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                  <span className="h-1 w-1 rounded-full bg-current" /> Connected
                </span>
              </div>
              <span className="text-[0.75rem] font-semibold text-[#94A3B8] cursor-pointer hover:opacity-70">Disconnect</span>
            </div>

            <div className="flex items-center gap-3 border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#F0FDFA]">
                <svg className="h-4 w-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">Plaid (Chase Bank)</div>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                  <span className="h-1 w-1 rounded-full bg-current" /> Connected
                </span>
              </div>
              <span className="text-[0.75rem] font-semibold text-[#0A1628] cursor-pointer hover:opacity-70">Manage</span>
            </div>

            <div className="flex items-center gap-3 p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#FFF0F1]">
                <svg className="h-4 w-4 text-[#E63946]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[0.85rem] font-semibold text-[#0A1628]">Google Account</div>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                  <span className="h-1 w-1 rounded-full bg-current" /> Connected
                </span>
              </div>
              <span className="text-[0.75rem] font-semibold text-[#94A3B8] cursor-pointer hover:opacity-70">Disconnect</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Notifications</div>
          <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Push Notifications</span>
              </div>
              <Toggle on={pushNotifs} onToggle={() => setPushNotifs(!pushNotifs)} />
            </div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Email Updates</span>
              </div>
              <Toggle on={emailUpdates} onToggle={() => setEmailUpdates(!emailUpdates)} />
            </div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Case Status Alerts</span>
              </div>
              <Toggle on={caseAlerts} onToggle={() => setCaseAlerts(!caseAlerts)} />
            </div>
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Marketing</span>
              </div>
              <Toggle on={marketing} onToggle={() => setMarketing(!marketing)} />
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div>
          <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Data &amp; Privacy</div>
          <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-card">
            <div className="flex cursor-pointer items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Download My Data</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <Link href="/account/delete" className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#E63946]">Delete Account</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/privacy" className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Privacy Policy</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link href="/terms" className="flex items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Terms of Service</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>

        {/* About */}
        <div>
          <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">About</div>
          <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Version</span>
              </div>
              <span className="text-[0.8rem] font-medium text-[#94A3B8]">3.0.0</span>
            </div>
            <div className="flex cursor-pointer items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Rate the App</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <Link href="/support" className="flex items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-[0.85rem] font-semibold text-[#0A1628]">Send Feedback</span>
              </div>
              <svg className="h-3 w-3 text-[#D5D5E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
