'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

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

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#F8FAFC' }}>
      <div className="w-full max-w-md mx-auto px-6 flex flex-col min-h-screen" style={{ background: '#FFFFFF' }}>
        <div className="flex-1 flex flex-col pt-4">
          {/* Back button */}
          <div className="mb-4">
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

          {/* Heading */}
          <h1 className="mb-1" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0A1628', letterSpacing: '-0.01em' }}>
            Create your account
          </h1>
          <p className="mb-6" style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}>
            Start your journey to tax freedom
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{ background: '#FFF0F1', border: '1px solid #FECDD3', color: '#E63946' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pr-4 pl-[44px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
              />
              <i className="fas fa-user" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, pointerEvents: 'none' }} />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pr-4 pl-[44px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
              />
              <i className="fas fa-envelope" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, pointerEvents: 'none' }} />
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pr-4 pl-[44px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
              />
              <i className="fas fa-phone" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, pointerEvents: 'none' }} />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-[14px] border-[1.5px] py-[14px] pl-[44px] pr-[44px] text-[0.875rem] font-medium outline-none transition-colors"
                  style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
                />
                <i className="fas fa-lock" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, pointerEvents: 'none' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
            <div className="relative" style={{ marginTop: 2 }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-[14px] border-[1.5px] py-[14px] pl-[44px] pr-[44px] text-[0.875rem] font-medium outline-none transition-colors"
                style={{ background: '#F8FAFC', borderColor: '#E2E8F0', color: '#0A1628' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#0A1628'; e.currentTarget.style.background = '#FFFFFF' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC' }}
              />
              <i className="fas fa-lock" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, pointerEvents: 'none' }} />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-[10px] cursor-pointer mb-2" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <div
                className="flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  width: 20, height: 20, borderRadius: 6,
                  border: `2px solid ${termsAccepted ? '#0A1628' : '#E2E8F0'}`,
                  background: termsAccepted ? '#0A1628' : '#FFFFFF',
                  marginTop: 1,
                }}
                onClick={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && <i className="fas fa-check" style={{ fontSize: 10, color: '#FFFFFF' }} />}
              </div>
              <input type="checkbox" className="hidden" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
              <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, fontWeight: 400 }}>
                I agree to the{' '}
                <a href="#" style={{ color: '#0A1628', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#0A1628', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
              </span>
            </label>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-[15px] px-7 text-center font-bold transition-opacity disabled:opacity-50"
              style={{ background: '#0A1628', color: '#FFFFFF', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign in link */}
          <div className="text-center my-4">
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 400 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ fontWeight: 700, color: '#0A1628', textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Reassurance */}
          <div className="flex items-center justify-center gap-[6px] pb-5" style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>
            <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
            <span>We never share your information</span>
          </div>
        </div>
      </div>
    </div>
  )
}
