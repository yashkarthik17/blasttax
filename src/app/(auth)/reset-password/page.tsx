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
        <div className="flex-1 flex flex-col" style={{ paddingTop: 8 }}>
          {/* Back button */}
          <div style={{ marginBottom: 40 }}>
            <Link
              href="/login"
              className="flex items-center justify-center"
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#FFFFFF', border: '1.5px solid #E2E8F0',
                color: '#0A1628', fontSize: 16, textDecoration: 'none',
                boxShadow: 'none', transition: 'all 0.25s ease',
              }}
            >
              <i className="fas fa-arrow-left" />
            </Link>
          </div>

          {!success ? (
            /* Form State */
            <div>
              {/* Icon circle */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto' }}>
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 88, height: 88, borderRadius: '50%',
                      background: '#EFF4FF', position: 'relative', zIndex: 2,
                    }}
                  >
                    <i className="fas fa-lock" style={{ fontSize: 28, color: '#0A1628', position: 'relative', zIndex: 2 }} />
                    {/* Shield badge */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 32, height: 32, borderRadius: '50%',
                        background: '#00A651', zIndex: 3, boxShadow: 'none',
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
              <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
                  Reset your password
                </h1>
              </div>

              {/* Subtitle */}
              <div style={{ textAlign: 'center', marginBottom: 36, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.6 }}>
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              {/* Error */}
              {error && (
                <div style={{ marginBottom: 16, borderRadius: 14, padding: '12px 16px', fontSize: '0.875rem', background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email input */}
                <div style={{ position: 'relative', marginBottom: 28 }}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px 14px 46px',
                      background: '#F8FAFC',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: 12,
                      fontFamily: 'inherit',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      color: '#0A1628',
                      outline: 'none',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0A1628'
                      e.currentTarget.style.background = '#FFFFFF'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0'
                      e.currentTarget.style.background = '#F8FAFC'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <i className="fas fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, pointerEvents: 'none' }} />
                </div>

                {/* Send Reset Link */}
                <div style={{ marginBottom: 28 }}>
                  <button
                    type="submit"
                    disabled={loading}
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
                      opacity: loading ? 0.8 : 1,
                      pointerEvents: loading ? 'none' : 'auto',
                      transition: 'opacity 0.15s ease, transform 0.15s ease',
                    }}
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
                </div>
              </form>

              {/* Sign in link */}
              <div style={{ textAlign: 'center' }}>
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
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <div
                className="flex items-center justify-center mx-auto"
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#E6F9EE', marginBottom: 20,
                }}
              >
                <i className="fas fa-check" style={{ fontSize: 28, color: '#00A651' }} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>
                Check your inbox
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: 32, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>
                We&apos;ve sent a password reset link to your email address
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center"
                style={{
                  fontSize: '0.9rem', fontWeight: 700, padding: '14px 28px',
                  border: '1.5px solid #E2E8F0', color: '#0A1628',
                  background: '#FFFFFF', textDecoration: 'none', minWidth: 200,
                  borderRadius: 9999, transition: 'all 0.25s ease',
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
