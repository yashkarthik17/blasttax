'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ResolutionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Header */}
        <div
          className="flex items-center gap-3"
          style={{ padding: '14px 20px 12px' }}
        >
          <button
            onClick={() => router.push('/dashboard')}
            className="lg:hidden"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A1628',
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 18 }} />
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A1628' }}>Resolution Center</span>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          {/* Subtitle */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5 }}>
              Your Tax Resolution Hub
            </p>
          </div>

          {/* Cards grid: 1 col mobile, 2 col on sm+/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Card 1: Tax Relief Analyzer */}
            <Link
              href="/analysis/type"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 16,
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 16,
                borderLeft: '4px solid #0A1628',
                textDecoration: 'none',
                color: 'inherit',
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, background: '#EFF4FF' }}
              >
                <i className="fas fa-magnifying-glass-dollar" style={{ fontSize: 18, color: '#0A1628' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1F2937', marginBottom: 2 }}>Tax Relief Analyzer</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4 }}>Analyze your eligibility for IRS relief programs and settlement options</p>
              </div>
              <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#D1D5DB', flexShrink: 0 }} />
            </Link>

            {/* Card 2: Tax Filing */}
            <Link
              href="/resolution/filing"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 16,
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 16,
                borderLeft: '4px solid #00A651',
                textDecoration: 'none',
                color: 'inherit',
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, background: '#ECFDF5' }}
              >
                <i className="fas fa-file-lines" style={{ fontSize: 18, color: '#00A651' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1F2937', marginBottom: 2 }}>Tax Filing</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4 }}>File or amend your federal tax returns</p>
              </div>
              <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#D1D5DB', flexShrink: 0 }} />
            </Link>

            {/* Card 3: Active Cases */}
            <Link
              href="/cases"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 16,
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 16,
                borderLeft: '4px solid #7C3AED',
                textDecoration: 'none',
                color: 'inherit',
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, background: '#F5F3FF' }}
              >
                <i className="fas fa-folder-open" style={{ fontSize: 18, color: '#7C3AED' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1F2937' }}>Active Cases</p>
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
                    3
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4 }}>Track your ongoing tax resolutions</p>
              </div>
              <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#D1D5DB', flexShrink: 0 }} />
            </Link>

            {/* Card 4: Submission Tracker */}
            <Link
              href="/submission-tracker"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 16,
                background: '#FFFFFF',
                border: '1px solid #F3F4F6',
                borderRadius: 16,
                borderLeft: '4px solid #D97706',
                textDecoration: 'none',
                color: 'inherit',
                marginBottom: 12,
                cursor: 'pointer',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF3C7' }}
              >
                <i className="fas fa-clipboard-check" style={{ fontSize: 18, color: '#D97706' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1F2937', marginBottom: 2 }}>Submission Tracker</p>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4 }}>Check status of forms submitted to the IRS</p>
              </div>
              <i className="fas fa-chevron-right" style={{ fontSize: 12, color: '#D1D5DB', flexShrink: 0 }} />
            </Link>
          </div>

          {/* Info Banner */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: 14,
                background: '#EFF4FF',
                borderRadius: 12,
                alignItems: 'flex-start',
              }}
            >
              <i className="fas fa-circle-info" style={{ fontSize: 16, color: '#0A1628', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600 }}>Did you know?</span> The IRS accepted 33% of OIC applications in 2024. Start your analysis to check your eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
