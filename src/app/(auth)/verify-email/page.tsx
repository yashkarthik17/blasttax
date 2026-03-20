'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const startTimer = useCallback(() => {
    setCountdown(59)
    setCanResend(false)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  useEffect(() => {
    // Auto-focus first input
    setTimeout(() => inputRefs.current[0]?.focus(), 800)
  }, [])

  function handleOtpChange(index: number, value: string) {
    const cleaned = value.replace(/[^0-9]/g, '')
    const newOtp = [...otp]
    newOtp[index] = cleaned.slice(0, 1)
    setOtp(newOtp)

    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    const newOtp = [...otp]
    pasteData.split('').forEach((char, i) => {
      newOtp[i] = char
    })
    setOtp(newOtp)
    if (pasteData.length > 0) {
      const focusIdx = Math.min(pasteData.length, 5)
      inputRefs.current[focusIdx]?.focus()
    }
  }

  function handleResend() {
    if (!canResend) return
    startTimer()
    // In production, call Supabase resend here
  }

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#F8FAFC' }}>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ paddingTop: 60, paddingBottom: 40 }}>
          {/* Envelope icon with pulse rings */}
          <div className="mb-7 relative" style={{ width: 88, height: 88 }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 88, height: 88, background: '#EFF4FF', position: 'relative', zIndex: 2 }}
            >
              <i className="fas fa-envelope" style={{ fontSize: 34, color: '#0A1628' }} />
            </div>
            {/* Pulse rings via CSS */}
            <div
              className="animate-[iconPulse_2.5s_ease-in-out_infinite]"
              style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(10, 22, 40, 0.1)' }}
            />
            <div
              className="animate-[iconPulse_2.5s_0.4s_ease-in-out_infinite]"
              style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: '2px solid rgba(10, 22, 40, 0.05)' }}
            />
          </div>

          {/* Heading */}
          <h1 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
            Check your email
          </h1>

          {/* Subtitle */}
          <p className="mb-9" style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.6, maxWidth: 280 }}>
            We&apos;ve sent a verification link to{' '}
            <span style={{ color: '#0A1628', fontWeight: 600 }}>jane@example.com</span>
          </p>

          {/* OTP inputs */}
          <div className="flex gap-[10px] justify-center mb-5">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                onFocus={(e) => e.target.select()}
                className="transition-all outline-none"
                style={{
                  width: 48,
                  height: 56,
                  textAlign: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#0A1628',
                  background: digit ? '#EFF4FF' : '#F8FAFC',
                  border: `2px solid ${digit ? '#0A1628' : '#E2E8F0'}`,
                  borderRadius: 14,
                  caretColor: '#0A1628',
                }}
              />
            ))}
          </div>

          {/* Resend code */}
          <div className="mb-9">
            <button
              onClick={handleResend}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: canResend ? '#0A1628' : '#CBD5E1',
                cursor: canResend ? 'pointer' : 'default',
                background: 'none',
                border: 'none',
              }}
            >
              Resend code{!canResend && ` (00:${countdown.toString().padStart(2, '0')})`}
            </button>
          </div>

          {/* Verify button */}
          <div className="w-full mb-8" style={{ maxWidth: 320 }}>
            <button
              className="w-full rounded-full py-[15px] px-7 text-center font-bold"
              style={{ background: '#0A1628', color: '#FFFFFF', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
            >
              Verify Email
            </button>
          </div>

          {/* Reassurance */}
          <div className="flex items-center justify-center gap-[6px]" style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
            <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
            <span>This step keeps your account secure</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
