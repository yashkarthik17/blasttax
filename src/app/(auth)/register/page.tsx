'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AuthLayout from '@/components/layout/AuthLayout'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Password strength
  function getStrength(val: string) {
    if (!val) return { width: '0%', color: '#E2E8F0', label: '' }
    let score = 0
    if (val.length >= 6) score++
    if (val.length >= 10) score++
    if (/[A-Z]/.test(val)) score++
    if (/[0-9]/.test(val)) score++
    if (/[^A-Za-z0-9]/.test(val)) score++

    if (score <= 1) return { width: '25%', color: '#E63946', label: 'Weak' }
    if (score <= 3) return { width: '55%', color: '#F59E0B', label: 'Medium' }
    return { width: '100%', color: '#00A651', label: 'Strong' }
  }

  const strength = getStrength(password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, phone },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/verify-email')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px 14px 44px',
    background: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    borderRadius: 12,
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#0A1628',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = '#0A1628'
    e.currentTarget.style.background = '#FFFFFF'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)'
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = '#E2E8F0'
    e.currentTarget.style.background = '#F8FAFC'
    e.currentTarget.style.boxShadow = 'none'
  }

  const iconStyle: React.CSSProperties = {
    position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
    color: '#CBD5E1', fontSize: 14, pointerEvents: 'none',
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen lg:min-h-0 lg:py-8 lg:max-h-[90vh] lg:overflow-y-auto" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col" style={{ paddingTop: 8 }}>
          {/* Back button */}
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/login"
              className="flex items-center justify-center"
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#FFFFFF', border: '1.5px solid #E2E8F0',
                color: '#0A1628', fontSize: 16, textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <i className="fas fa-arrow-left" />
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
              Create your account
            </h1>
          </div>
          <div style={{ marginBottom: 26 }}>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>
              Start your journey to tax freedom
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginBottom: 16, borderRadius: 14, padding: '12px 16px', fontSize: '0.875rem', background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Full Name */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type="text" placeholder="Full name" value={name}
                onChange={(e) => setName(e.target.value)} required
                style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
              />
              <i className="fas fa-user" style={iconStyle} />
            </div>

            {/* Email */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type="email" placeholder="Email address" value={email}
                onChange={(e) => setEmail(e.target.value)} required
                style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
              />
              <i className="fas fa-envelope" style={iconStyle} />
            </div>

            {/* Phone */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type="tel" placeholder="Phone number" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
              />
              <i className="fas fa-phone" style={iconStyle} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 2 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={handleFocus} onBlur={handleBlur}
                />
                <i className="fas fa-lock" style={iconStyle} />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
              {/* Strength bar */}
              <div style={{ height: 4, borderRadius: 9999, background: '#E2E8F0', marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 9999, transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)', width: strength.width, background: strength.color }} />
              </div>
              {strength.label && (
                <div style={{ fontSize: '0.7rem', fontWeight: 600, marginTop: 4, color: strength.color }}>
                  {strength.label}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ position: 'relative', marginTop: 14, marginBottom: 12 }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={handleFocus} onBlur={handleBlur}
              />
              <i className="fas fa-lock" style={iconStyle} />
              <button
                type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>

            {/* Terms checkbox */}
            <div style={{ marginBottom: 22 }}>
              <label className="flex items-start cursor-pointer" style={{ gap: 10, WebkitTapHighlightColor: 'transparent' }}>
                <input type="checkbox" className="hidden" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 20, height: 20, borderRadius: 6,
                    border: `2px solid ${termsAccepted ? '#0A1628' : '#E2E8F0'}`,
                    background: termsAccepted ? '#0A1628' : '#FFFFFF',
                    marginTop: 1,
                    transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {termsAccepted && <i className="fas fa-check" style={{ fontSize: 10, color: '#FFFFFF' }} />}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, fontWeight: 400 }}>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#0A1628', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#0A1628', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <div style={{ marginBottom: 20 }}>
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
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 400 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ fontWeight: 700, color: '#0A1628', textDecoration: 'none' }}>
                Sign in
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
              paddingBottom: 14,
              fontSize: '0.72rem',
              color: '#94A3B8',
              fontWeight: 500,
            }}
          >
            <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
            <span>We never share your information</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
