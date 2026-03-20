'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type Step = 1 | 2 | 3

export default function ChangeEmailPage() {
  const [step, setStep] = useState<Step>(1)
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const displayEmail = newEmail || 'newemail@email.com'

  function handleCodeChange(index: number, value: string) {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
    if (index === 5 && value) {
      const full = newCode.join('')
      if (full.length === 6) setStep(3)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#00A651] shadow-lg shadow-[rgba(0,166,81,0.25)]">
              <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mb-2 text-xl font-extrabold text-[#0A1628]">Email Updated!</div>
            <div className="text-[0.88rem] leading-relaxed text-[#64748B]">
              Your email has been changed to<br />
              <strong className="text-[#0A1628]">{displayEmail}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#ECFDF5] px-4 py-3">
            <svg className="h-3.5 w-3.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[0.78rem] text-[#065F46]">All your data and cases remain secure</span>
          </div>

          <Link
            href="/account"
            className="flex w-full items-center justify-center rounded-full bg-[#0A1628] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:opacity-90"
          >
            Back to Account
          </Link>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Change Email</h1>
          </div>

          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#EFF4FF]">
              <svg className="h-7 w-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19V5a2 2 0 012-2h14a2 2 0 012 2v14M3 19l6.75-4.5M21 19l-6.75-4.5M3 5l9 6 9-6" />
              </svg>
            </div>
            <div className="mb-1.5 text-lg font-extrabold text-[#0A1628]">Check Your Email</div>
            <div className="text-[0.82rem] leading-relaxed text-[#94A3B8]">
              We sent a 6-digit code to<br />
              <strong className="text-[#0A1628]">{displayEmail}</strong>
            </div>
          </div>

          <div className="flex justify-center gap-2 py-2">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                className="h-[52px] w-11 rounded-xl border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] text-center text-xl font-bold text-[#0A1628] outline-none transition focus:border-[#0A1628] focus:bg-white focus:ring-2 focus:ring-[rgba(37,99,235,0.12)]"
              />
            ))}
          </div>

          <div className="py-2 text-center">
            <span className="text-[0.78rem] text-[#94A3B8]">Didn&apos;t receive it? </span>
            <button className="text-[0.78rem] font-semibold text-[#2563EB]">Resend Code</button>
          </div>

          <button
            onClick={() => setStep(3)}
            className="flex w-full items-center justify-center rounded-full bg-[#0A1628] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:opacity-90"
          >
            Verify Email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/account" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Change Email</h1>
        </div>

        {/* Current Email */}
        <div className="rounded-[14px] border border-[#F1F5F9] bg-white p-4">
          <div className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-wider text-[#94A3B8]">Current Email</div>
          <div className="flex items-center gap-2.5">
            <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-[0.9rem] font-semibold text-[#0A1628]">jane.doe@email.com</span>
          </div>
        </div>

        {/* New Email */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">New Email Address</label>
          <input
            type="email"
            placeholder="Enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
          />
        </div>

        {/* Info */}
        <div className="flex items-start gap-2.5 rounded-xl bg-[#EFF4FF] px-3.5 py-3">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <span className="text-[0.78rem] leading-relaxed text-[#4338CA]">
            We&apos;ll send a verification code to your new email address to confirm the change.
          </span>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Confirm Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 pr-11 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#CBD5E1] hover:text-[#64748B]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {showPw ? (
                  <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Update Button */}
        <div className="pt-2">
          <button
            onClick={() => setStep(2)}
            className="flex w-full items-center justify-center rounded-full bg-[#0A1628] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:opacity-90"
          >
            Update Email
          </button>
        </div>
      </div>
    </div>
  )
}
