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
        <div className="flex-1 flex flex-col pt-6 lg:pt-0">
          {/* Logo */}
          <div className="text-center mb-2">
            <div style={{ fontSize: '1.7rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#E63946' }}>Blast</span>
              <span style={{ color: '#0A1628' }}>Tax</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-1">
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
              Welcome back
            </h1>
          </div>

          <div className="text-center mb-8">
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400, lineHeight: 1.5 }}>
              Sign in to continue your tax resolution journey
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Email input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pr-4 pl-[46px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{
                  background: '#F8FAFC',
                  borderColor: '#E2E8F0',
                  color: '#0A1628',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
              />
              <i className="fas fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 15, pointerEvents: 'none' }} />
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pl-[46px] pr-[46px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{
                  background: '#F8FAFC',
                  borderColor: '#E2E8F0',
                  color: '#0A1628',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
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
            <div className="text-right" style={{ marginTop: -4, marginBottom: 16 }}>
              <Link href="/reset-password" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0A1628', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-[15px] px-7 text-center font-bold transition-opacity disabled:opacity-50"
              style={{ background: '#0A1628', color: '#FFFFFF', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              or continue with
            </span>
            <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
          </div>

          {/* Social auth */}
          <div className="flex gap-3 mb-7">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-[10px] py-[13px] px-4 rounded-full transition-all"
              style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', fontSize: '0.875rem', fontWeight: 600, color: '#0A1628', cursor: 'pointer' }}
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
              className="flex-1 flex items-center justify-center gap-[10px] py-[13px] px-4 rounded-full transition-all"
              style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', fontSize: '0.875rem', fontWeight: 600, color: '#0A1628', cursor: 'pointer' }}
            >
              <i className="fab fa-apple" style={{ fontSize: 20, color: '#0A1628' }} />
              Apple
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center mb-5">
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
          <div className="flex items-center justify-center gap-[6px] pb-6 lg:pb-0 lg:mt-4" style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>
            <i className="fas fa-lock" style={{ fontSize: 11, color: '#00A651' }} />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
