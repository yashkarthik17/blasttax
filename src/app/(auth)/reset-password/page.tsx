'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AuthLayout from '@/components/layout/AuthLayout'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/update-password` }
    )

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen lg:min-h-0 lg:py-10" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col pt-4 lg:pt-0">
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/login"
              className="flex items-center justify-center transition-all"
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#FFFFFF', border: '1.5px solid #E2E8F0',
                color: '#0A1628', fontSize: 16, textDecoration: 'none',
              }}
            >
              <i className="fas fa-arrow-left" />
            </Link>
          </div>

          {!success ? (
            /* Form State */
            <div>
              {/* Icon circle */}
              <div className="flex justify-center mb-6">
                <div className="relative" style={{ width: 88, height: 88 }}>
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 88, height: 88, background: '#EFF4FF', position: 'relative', zIndex: 2 }}
                  >
                    <i className="fas fa-lock" style={{ fontSize: 28, color: '#0A1628' }} />
                    {/* Shield badge */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 32, height: 32, borderRadius: '50%',
                        background: '#00A651', zIndex: 3,
                      }}
                    >
                      <i className="fas fa-shield-halved" style={{ fontSize: 14, color: '#FFFFFF' }} />
                    </div>
                  </div>
                  {/* Breathing ring */}
                  <div
                    className="animate-[breatheRing_3s_ease-in-out_infinite]"
                    style={{
                      position: 'absolute', inset: -8, borderRadius: '50%',
                      border: '2px solid rgba(10, 22, 40, 0.08)',
                    }}
                  />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-2">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
                  Reset your password
                </h1>
              </div>

              {/* Subtitle */}
              <div className="text-center mb-9 mx-auto" style={{ maxWidth: 300 }}>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.6 }}>
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="relative mb-7">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-[14px] border-[1.5px] py-[14px] pr-4 pl-[46px] text-[0.875rem] font-medium outline-none transition-colors"
                    style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
                  />
                  <i className="fas fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, pointerEvents: 'none' }} />
                </div>

                {/* Send Reset Link */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full py-[15px] px-7 text-center font-bold transition-opacity disabled:opacity-50 mb-7"
                  style={{ background: '#0A1628', color: '#FFFFFF', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin" style={{ marginRight: 8 }} />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              {/* Sign in link */}
              <div className="text-center">
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 400 }}>
                  Remember your password?{' '}
                  <Link href="/login" style={{ fontWeight: 700, color: '#0A1628', textDecoration: 'none' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="text-center pt-10">
              <div
                className="flex items-center justify-center mx-auto mb-5"
                style={{ width: 72, height: 72, borderRadius: '50%', background: '#E6F9EE' }}
              >
                <i className="fas fa-check" style={{ fontSize: 28, color: '#00A651' }} />
              </div>
              <h2 className="mb-2" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0A1628' }}>
                Check your inbox
              </h2>
              <p className="mx-auto mb-8" style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: 260 }}>
                We&apos;ve sent a password reset link to your email address
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full transition-all"
                style={{
                  fontSize: '0.9rem', fontWeight: 700, padding: '14px 28px',
                  border: '1.5px solid #E2E8F0', color: '#0A1628',
                  background: '#FFFFFF', textDecoration: 'none', minWidth: 200,
                }}
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes breatheRing {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.06); opacity: 0.3; }
        }
      `}</style>
    </AuthLayout>
  )
}
