'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import AuthLayout from '@/components/layout/AuthLayout'

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
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen lg:min-h-0 lg:py-10" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ paddingTop: 60, paddingBottom: 40 }}>
          {/* Envelope icon with pulse rings */}
          <div style={{ position: 'relative', width: 88, height: 88, marginBottom: 28, margin: '0 auto 28px' }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 88, height: 88, borderRadius: '50%',
                background: '#EFF4FF', position: 'relative', zIndex: 2,
              }}
            >
              <i className="fas fa-envelope" style={{ fontSize: 34, color: '#1A1A2E' }} />
            </div>
            {/* Pulse rings */}
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
          <div style={{ marginBottom: 8 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.01em' }}>
              Check your email
            </h1>
          </div>

          {/* Subtitle */}
          <div style={{ marginBottom: 36, maxWidth: 280 }}>
            <p style={{ fontSize: '0.85rem', color: '#8585A0', fontWeight: 400, lineHeight: 1.6 }}>
              We&apos;ve sent a verification link to{' '}
              <span style={{ color: '#1A1A2E', fontWeight: 600 }}>jane@example.com</span>
            </p>
          </div>

          {/* OTP inputs */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
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
                style={{
                  width: 48,
                  height: 56,
                  textAlign: 'center',
                  fontFamily: 'inherit',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#1A1A2E',
                  background: digit ? '#EFF4FF' : '#FAFAFF',
                  border: `2px solid ${digit ? '#1A1A2E' : '#D5D5E0'}`,
                  borderRadius: 14,
                  outline: 'none',
                  caretColor: '#1A1A2E',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              />
            ))}
          </div>

          {/* Resend code */}
          <div style={{ marginBottom: 36 }}>
            <button
              onClick={handleResend}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: canResend ? '#1A1A2E' : '#B0B0C8',
                cursor: canResend ? 'pointer' : 'default',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                transition: 'color 0.3s ease',
              }}
            >
              Resend code{!canResend && ` (00:${countdown.toString().padStart(2, '0')})`}
            </button>
          </div>

          {/* Verify button */}
          <div style={{ width: '100%', maxWidth: 320, marginBottom: 32 }}>
            <button
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                borderRadius: 9999,
                padding: '15px 28px',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: '#00A651',
                color: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
            >
              Verify Email
            </button>
          </div>

          {/* Reassurance */}
          <div className="flex items-center justify-center" style={{ gap: 6, fontSize: '0.75rem', color: '#8585A0', fontWeight: 500 }}>
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
    </AuthLayout>
  )
}
