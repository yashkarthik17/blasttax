'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RELIEF_OPTIONS = [
  {
    title: 'Currently Not Collectible',
    description: 'Temporarily stop all IRS collection activity. The IRS acknowledges you cannot afford to pay and suspends enforcement actions like levies and garnishments.',
    accentColor: '#D97706',
    icon: 'fa-pause-circle',
    iconBg: '#FEF3C7',
    tags: [
      { icon: 'fa-coins', label: 'MDI $0 requirement', bg: '#FFFBEB', color: '#92400E' },
      { icon: 'fa-file-lines', label: 'Form 433-F', bg: '#FFFBEB', color: '#92400E' },
      { icon: 'fa-clock', label: 'Debt continues accruing', bg: '#FFFBEB', color: '#92400E' },
    ],
    href: '/relief/cnc-guidance',
  },
  {
    title: 'Innocent Spouse Relief',
    description: 'If your spouse (or former spouse) improperly reported items or omitted items on a joint return, you may be relieved of responsibility for the tax, interest, and penalties.',
    accentColor: '#E63946',
    icon: 'fa-shield-halved',
    iconBg: '#FFF0F1',
    tags: [
      { icon: 'fa-file-signature', label: 'Form 8857', bg: '#FFF0F1', color: '#9F1239' },
      { icon: 'fa-list-ol', label: '3 types available', bg: '#FFF0F1', color: '#9F1239' },
      { icon: 'fa-calendar', label: '2-year filing deadline', bg: '#FFF0F1', color: '#9F1239' },
    ],
    href: '/relief/spouse-hub',
  },
  {
    title: 'CDP Hearing',
    description: 'A Collection Due Process hearing gives you the right to challenge IRS collection actions. It pauses enforcement while your case is reviewed by an independent appeals officer.',
    accentColor: '#4F46E5',
    icon: 'fa-gavel',
    iconBg: '#EEF2FF',
    tags: [
      { icon: 'fa-file-lines', label: 'Form 12153', bg: '#EEF2FF', color: '#3730A3' },
      { icon: 'fa-clock', label: 'Within 30 days of notice', bg: '#EEF2FF', color: '#3730A3' },
      { icon: 'fa-ban', label: 'Stops levies', bg: '#EEF2FF', color: '#3730A3' },
    ],
    href: '#',
  },
  {
    title: 'Bankruptcy Discharge',
    description: 'In certain circumstances, tax debts can be discharged through Chapter 7 bankruptcy. Strict timing rules must be met before the debt qualifies for discharge.',
    accentColor: '#5C5C7A',
    icon: 'fa-scale-balanced',
    iconBg: '#E8E8F0',
    tags: [
      { icon: 'fa-calendar-days', label: '3-year rule', bg: '#E8E8F0', color: '#2D2B3D' },
      { icon: 'fa-calendar-check', label: '2-year rule', bg: '#E8E8F0', color: '#2D2B3D' },
      { icon: 'fa-hourglass-end', label: '240-day rule', bg: '#E8E8F0', color: '#2D2B3D' },
    ],
    href: '#',
  },
]

export default function OtherReliefPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <div
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 12, background: '#FAFAFF', border: '1px solid #D5D5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </div>
          <div style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>Other Relief Options</div>
          <div style={{ width: 36, flexShrink: 0 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px', paddingBottom: 90 }}>
          {/* Intro text */}
          <div style={{ textAlign: 'center', padding: '2px 0 6px' }}>
            <div style={{ fontSize: '0.82rem', color: '#5C5C7A', lineHeight: 1.5 }}>
              Beyond standard payment plans and offers, these relief options may apply to your situation.
            </div>
          </div>

          {/* Relief Cards */}
          {RELIEF_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              style={{ textDecoration: 'none', display: 'block', background: 'white', border: '1px solid #D5D5E0', borderRadius: 18, padding: 18, boxShadow: '0 1px 2px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: option.accentColor }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: option.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`fas ${option.icon}`} style={{ fontSize: 20, color: option.accentColor }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1A1A2E' }}>{option.title}</div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#5C5C7A', lineHeight: 1.55, marginBottom: 12 }}>
                    {option.description}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {option.tags.map((tag) => (
                      <div key={tag.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, fontSize: '0.65rem', fontWeight: 600, background: tag.bg, color: tag.color }}>
                        <i className={`fas ${tag.icon}`} style={{ fontSize: 8 }} /> {tag.label}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', fontWeight: 700, color: option.accentColor, cursor: 'pointer' }}>
                    Learn More <i className="fas fa-arrow-right" style={{ fontSize: 10 }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
