'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RESOLUTION_OPTIONS = [
  {
    href: '/analysis/type',
    title: 'Tax Relief Analyzer',
    desc: 'Analyze your eligibility for IRS relief programs and settlement options',
    icon: 'fa-magnifying-glass-dollar',
    iconColor: '#003DA5',
    gradient: 'linear-gradient(135deg, #EBF0FF, #C5D5F7)',
  },
  {
    href: '/tax-filing',
    title: 'Tax Filing',
    desc: 'File or amend your federal tax returns',
    icon: 'fa-file-lines',
    iconColor: '#00A651',
    gradient: 'linear-gradient(135deg, #E6F9EE, #B8F0D3)',
  },
  {
    href: '/cases',
    title: 'Active Cases',
    desc: 'Track your ongoing tax resolutions',
    icon: 'fa-folder-open',
    iconColor: '#7C3AED',
    gradient: 'linear-gradient(135deg, #F5F0FF, #E0D4FC)',
    badge: '3',
  },
  {
    href: '/submission-tracker',
    title: 'Submission Tracker',
    desc: 'Check status of forms submitted to the IRS',
    icon: 'fa-clipboard-check',
    iconColor: '#D97706',
    gradient: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
  },
  {
    href: '/penalty',
    title: 'Penalty Abatement',
    desc: 'Remove penalties from your balance',
    icon: 'fa-eraser',
    iconColor: '#7C3AED',
    gradient: 'linear-gradient(135deg, #F5F0FF, #E0D4FC)',
  },
  {
    href: '/relief',
    title: 'Other Relief Options',
    desc: 'CNC, Innocent Spouse, and more',
    icon: 'fa-shield-halved',
    iconColor: '#E63946',
    gradient: 'linear-gradient(135deg, #FFF0F1, #FECDD3)',
  },
]

export default function ResolutionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFF' }}>
      <div className="mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Header */}
        <div className="screen-header">
          <button
            onClick={() => router.push('/dashboard')}
            className="lg:hidden"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A1A2E',
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 16 }} />
          </button>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1A1A2E' }}>Resolution Center</span>
        </div>

        <div style={{ padding: '0 20px 24px' }}>
          {/* Subtitle */}
          <div style={{ marginBottom: 16, padding: '0 4px' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#5C5C7A', lineHeight: 1.5 }}>
              Choose your path to resolve your tax debt
            </p>
          </div>

          {/* Resolution cards */}
          <div className="flex flex-col" style={{ gap: 12 }}>
            {RESOLUTION_OPTIONS.map((opt) => (
              <Link
                key={opt.href}
                href={opt.href}
                className="resolution-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: opt.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className={`fas ${opt.icon}`} style={{ fontSize: 18, color: opt.iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A2E' }}>{opt.title}</p>
                    {opt.badge && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 20,
                          height: 20,
                          padding: '0 6px',
                          background: '#F5F3FF',
                          color: '#7C3AED',
                          borderRadius: 9999,
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                        }}
                      >
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#8585A0', marginTop: 2, lineHeight: 1.4 }}>
                    {opt.desc}
                  </p>
                </div>
                <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#D5D5E0', flexShrink: 0 }} />
              </Link>
            ))}
          </div>

          {/* AI link */}
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link
              href="/chat"
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#2563EB',
                textDecoration: 'none',
              }}
            >
              <i className="fas fa-sparkles" style={{ fontSize: 12, marginRight: 6 }} />
              Not sure? Ask our AI assistant
            </Link>
          </div>

          {/* Info Banner */}
          <div style={{ marginTop: 16 }}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: 14,
                background: '#EBF0FF',
                borderRadius: 12,
                alignItems: 'flex-start',
                border: '1px solid rgba(0,61,165,0.08)',
              }}
            >
              <i className="fas fa-circle-info" style={{ fontSize: 16, color: '#003DA5', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.75rem', color: '#2D2B3D', lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600 }}>Did you know?</span> The IRS accepted 33% of OIC applications in 2024. Start your analysis to check your eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
