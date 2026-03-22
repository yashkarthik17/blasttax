'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type Method = 'sms' | 'auth'
type Step = 1 | 2 | 3

export default function TwoFactorSetupPage() {
  const [method, setMethod] = useState<Method>('sms')
  const [step, setStep] = useState<Step>(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF5]">
            <svg className="h-8 w-8 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-extrabold text-[#1A1A2E]">2FA Enabled</h2>
          <p className="max-w-[260px] text-[0.88rem] leading-relaxed text-[#8585A0]">
            Your account is now protected with two-factor authentication. You&apos;ll be asked for a code when signing in.
          </p>
          <Link
            href="/account"
            className="mt-8 rounded-full border border-[#D5D5E0] px-7 py-3.5 text-[0.9rem] font-semibold text-[#1A1A2E] transition hover:bg-[#FAFAFF]"
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
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
          </div>

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF4FF]">
              <svg className="h-6 w-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="mb-1.5 text-lg font-extrabold text-[#1A1A2E]">Enter Verification Code</h2>
            <p className="text-[0.82rem] text-[#8585A0]">
              {method === 'sms'
                ? 'We sent a 6-digit code to your phone number.'
                : 'Enter the 6-digit code from your authenticator app.'}
            </p>
          </div>

          <div className="mb-6 flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                className="h-14 w-12 rounded-xl border-[1.5px] border-[#F0F0F5] bg-[#FAFAFF] text-center text-xl font-bold text-[#1A1A2E] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[rgba(37,99,235,0.12)]"
              />
            ))}
          </div>

          <div className="mb-7 text-center">
            <span className="text-[0.8rem] text-[#8585A0]">Didn&apos;t receive a code? </span>
            <button className="text-[0.8rem] font-semibold text-[#2563EB]">Resend</button>
          </div>

          <button
            onClick={() => setStep(3)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Enable 2FA
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="flex items-center gap-3">
          <Link href="/account" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
        </div>

        <div className="mb-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#EFF4FF]">
            <svg className="h-7 w-7 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mb-1.5 text-xl font-extrabold text-[#1A1A2E]">Add Extra Security</h2>
          <p className="text-[0.82rem] leading-relaxed text-[#8585A0]">
            Protect your account with two-factor authentication. Choose your preferred method.
          </p>
        </div>

        {/* SMS Method */}
        <button
          onClick={() => setMethod('sms')}
          className={`flex w-full items-center gap-3.5 rounded-2xl border-[1.5px] p-4 text-left transition ${
            method === 'sms' ? 'border-[#2563EB] bg-[#EFF4FF]' : 'border-[#F0F0F5] bg-white hover:border-[#D5D5E0]'
          }`}
        >
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5]">
            <svg className="h-4 w-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Text Message (SMS)</div>
            <div className="text-[0.75rem] text-[#8585A0]">Get a code sent to your phone</div>
          </div>
          <div className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${method === 'sms' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D5D5E0]'}`}>
            {method === 'sms' && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
        </button>

        {/* Auth Method */}
        <button
          onClick={() => setMethod('auth')}
          className={`flex w-full items-center gap-3.5 rounded-2xl border-[1.5px] p-4 text-left transition ${
            method === 'auth' ? 'border-[#2563EB] bg-[#EFF4FF]' : 'border-[#F0F0F5] bg-white hover:border-[#D5D5E0]'
          }`}
        >
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
            <svg className="h-4 w-4 text-[#6366F1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Authenticator App</div>
            <div className="text-[0.75rem] text-[#8585A0]">Use Google or Microsoft Authenticator</div>
          </div>
          <div className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${method === 'auth' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#D5D5E0]'}`}>
            {method === 'auth' && <div className="h-2 w-2 rounded-full bg-white" />}
          </div>
        </button>

        {/* SMS Phone Number */}
        {method === 'sms' && (
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#8585A0]">Phone Number</label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#D5D5E0] bg-white px-4 py-3 text-sm text-[#1A1A2E] outline-none transition focus:border-[#1A1A2E] placeholder:text-[#B0B0C8]"
            />
          </div>
        )}

        {/* QR Code for Auth */}
        {method === 'auth' && (
          <div className="text-center">
            <p className="mb-4 text-[0.82rem] leading-relaxed text-[#5C5C7A]">Scan this QR code with your authenticator app</p>
            <div className="mx-auto flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#D5D5E0] bg-[#FAFAFF]">
              <svg className="h-16 w-16 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              </svg>
              <span className="text-[0.68rem] font-medium text-[#B0B0C8]">QR Code</span>
            </div>
            <div className="mt-3 inline-block rounded-[10px] bg-[#FAFAFF] px-3.5 py-2">
              <span className="text-[0.72rem] font-medium text-[#8585A0]">Or enter: </span>
              <span className="font-mono text-[0.72rem] font-bold text-[#1A1A2E]">BTAX-XKCD-7J2F-9RWQ</span>
            </div>
          </div>
        )}

        {/* Continue */}
        <button
          onClick={() => setStep(2)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90"
        >
          Continue
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
