'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AuthLayout from '@/components/layout/AuthLayout'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen lg:min-h-0 lg:py-10" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col" style={{ paddingTop: 24 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#E63946' }}>Blast</span>
              <span style={{ color: '#0A1628' }}>Tax</span>
            </div>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
              Welcome back
            </h1>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.5 }}>
              Sign in to continue your tax resolution journey
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{ marginBottom: 16, borderRadius: 14, padding: '12px 16px', fontSize: '0.875rem', background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Email input */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
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
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none' }}
              />
              <i className="fas fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, pointerEvents: 'none' }} />
            </div>

            {/* Password input */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 46px 14px 46px',
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
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none' }}
              />
              <i className="fas fa-lock" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, pointerEvents: 'none' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 24 }}>
              <Link href="/reset-password" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0A1628', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
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
                  opacity: loading ? 0.5 : 1,
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center" style={{ gap: 16, marginBottom: 24 }}>
            <div className="flex-1" style={{ height: 1, background: '#E2E8F0' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              or continue with
            </span>
            <div className="flex-1" style={{ height: 1, background: '#E2E8F0' }} />
          </div>

          {/* Social auth */}
          <div className="flex" style={{ gap: 12, marginBottom: 28 }}>
            <button
              type="button"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '13px 16px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 9999,
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0A1628',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '13px 16px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 9999,
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0A1628',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <i className="fab fa-apple" style={{ fontSize: 20, color: '#0A1628' }} />
              Apple
            </button>
          </div>

          {/* Sign up link */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 400 }}>
              Don&apos;t have an account?{' '}
              <Link href="/register" style={{ fontWeight: 700, color: '#0A1628', textDecoration: 'none' }}>
                Sign up
              </Link>
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1 lg:hidden" />

          {/* Reassurance */}
          <div
            className="flex items-center justify-center"
            style={{
              gap: 6,
              marginBottom: 16,
              paddingBottom: 10,
              fontSize: '0.72rem',
              color: '#94A3B8',
              fontWeight: 500,
            }}
          >
            <i className="fas fa-lock" style={{ fontSize: 11, color: '#00A651' }} />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
