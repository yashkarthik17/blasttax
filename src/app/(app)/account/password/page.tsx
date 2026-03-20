'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)

  const hasLength = newPw.length >= 8
  const hasUpper = /[A-Z]/.test(newPw)
  const hasNumber = /[0-9]/.test(newPw)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPw)

  const score = [hasLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length
  const strengthLabels = ['Password strength', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['#94A3B8', '#EF4444', '#F59E0B', '#2563EB', '#10B981']
  const barColors = ['#E2E8F0', '#EF4444', '#F59E0B', '#2563EB', '#10B981']

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF5]">
            <svg className="h-8 w-8 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-extrabold text-[#0A1628]">Password Updated</h2>
          <p className="max-w-[260px] text-[0.88rem] leading-relaxed text-[#94A3B8]">
            Your password has been successfully changed. Use your new password next time you sign in.
          </p>
          <Link
            href="/account"
            className="mt-8 rounded-full border border-[#E2E8F0] px-7 py-3.5 text-[0.9rem] font-semibold text-[#0A1628] transition hover:bg-[#F8FAFC]"
          >
            Back to Account
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
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
          <h1 className="text-2xl font-bold">Change Password</h1>
        </div>

        {/* Current Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              placeholder="Enter current password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3 pl-12 pr-12 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-[#64748B]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {showCurrent ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="h-px bg-[#F1F5F9]" />

        {/* New Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">New Password</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="Create new password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3 pl-12 pr-12 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <button onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-[#64748B]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {showNew ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                )}
              </svg>
            </button>
          </div>

          {/* Strength Bars */}
          <div className="mt-2.5 flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-colors"
                style={{ backgroundColor: i <= score ? barColors[score] : '#E2E8F0' }}
              />
            ))}
          </div>
          <div className="mt-1.5 text-[0.7rem] font-semibold" style={{ color: strengthColors[score] }}>
            {strengthLabels[score]}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-3 pl-12 pr-12 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CBD5E1] hover:text-[#64748B]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {showConfirm ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-2.5 rounded-[14px] bg-[#F8FAFC] p-4">
          <div className="text-[0.72rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Requirements</div>
          {[
            { met: hasLength, label: 'At least 8 characters' },
            { met: hasUpper, label: 'One uppercase letter' },
            { met: hasNumber, label: 'One number' },
            { met: hasSpecial, label: 'One special character (!@#$%)' },
          ].map((req) => (
            <div key={req.label} className={`flex items-center gap-2 text-[0.78rem] font-medium ${req.met ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
              {req.met ? (
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              ) : (
                <div className="h-3 w-3 rounded-full border-2 border-current" />
              )}
              <span>{req.label}</span>
            </div>
          ))}
        </div>

        {/* Update Button */}
        <button
          onClick={() => setSuccess(true)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Update Password
        </button>
      </div>
    </div>
  )
}
