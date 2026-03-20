'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface MethodSection {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  iconColor: string
  formula?: string
  content: string
  afterContent?: string
  bullets?: { icon: string; iconColor: string; text: string; iconSize?: number }[]
  standards?: { icon: string; title: string; description: string }[]
  tolling?: string[]
}

const SECTIONS: MethodSection[] = [
  {
    id: 'rcp', title: 'RCP Formula', subtitle: 'Reasonable Collection Potential',
    icon: 'fa-calculator', iconBg: '#EEF2FF', iconColor: '#4F46E5',
    formula: 'NRE + Future Income = RCP',
    content: 'Your Reasonable Collection Potential (RCP) is the total amount the IRS believes it can collect. It combines:',
    afterContent: 'Your offer amount must equal or exceed your RCP for the IRS to accept your OIC.',
    bullets: [
      { icon: 'fa-circle', iconColor: '#4F46E5', text: 'NRE (Net Realizable Equity) -- what your assets are worth after debts', iconSize: 5 },
      { icon: 'fa-circle', iconColor: '#4F46E5', text: 'Future Income -- your MDI multiplied by months remaining (12 for lump sum, 24 for periodic)', iconSize: 5 },
    ],
  },
  {
    id: 'qsv', title: 'QSV Explanation', subtitle: 'Quick Sale Value',
    icon: 'fa-tag', iconBg: '#FFFBEB', iconColor: '#D97706',
    formula: 'QSV = FMV x 80%',
    content: 'The Quick Sale Value is 80% of Fair Market Value (FMV). This reflects what an asset would realistically sell for in a forced or quick sale.',
    bullets: [
      { icon: 'fa-home', iconColor: '#D97706', text: 'Real estate and property', iconSize: 11 },
      { icon: 'fa-car', iconColor: '#D97706', text: 'Vehicles', iconSize: 11 },
      { icon: 'fa-building-columns', iconColor: '#D97706', text: 'Bank accounts and investments', iconSize: 11 },
      { icon: 'fa-piggy-bank', iconColor: '#D97706', text: 'Retirement accounts (with penalties)', iconSize: 11 },
      { icon: 'fa-gem', iconColor: '#D97706', text: 'Personal property and valuables', iconSize: 11 },
    ],
  },
  {
    id: 'mdi', title: 'MDI Calculation', subtitle: 'Monthly Disposable Income',
    icon: 'fa-money-bill-trend-up', iconBg: '#F5F0FF', iconColor: '#7C3AED',
    formula: 'Income - IRS Allowed Expenses = MDI',
    content: 'Your Monthly Disposable Income is what the IRS considers your ability to pay each month. It uses your gross income minus only the expenses the IRS allows.',
    afterContent: 'If MDI is negative or very low, you may qualify for CNC status or a lower OIC offer amount.',
  },
  {
    id: 'standards', title: 'IRS Standards Used', subtitle: 'Allowable Living Expenses',
    icon: 'fa-landmark', iconBg: '#EFF4FF', iconColor: '#0A1628',
    content: 'The IRS sets maximum allowable amounts for living expenses. We use the most current published standards:',
    standards: [
      { icon: 'fa-utensils', title: 'National Standards', description: 'Food, clothing, housekeeping, personal care, misc.' },
      { icon: 'fa-house', title: 'Local Standards', description: 'Housing/utilities based on county and family size' },
      { icon: 'fa-heart-pulse', title: 'Healthcare', description: 'Out-of-pocket medical expenses by age' },
      { icon: 'fa-car', title: 'Transportation', description: 'Vehicle ownership, operating costs by region' },
    ],
  },
  {
    id: 'csed', title: 'CSED Calculation', subtitle: 'Collection Statute Expiration',
    icon: 'fa-clock', iconBg: '#FFF0F1', iconColor: '#E63946',
    formula: 'Assessment Date + 10 Years + Tolling = CSED',
    content: 'The IRS generally has 10 years from the date of assessment to collect a tax debt. However, certain actions "toll" (pause) this clock:',
    tolling: [
      'Filing an OIC (during review + 30 days)',
      'CDP hearing requests',
      'Bankruptcy proceedings',
      'Time spent living outside the US',
    ],
  },
]

export default function MethodologyPage() {
  const router = useRouter()
  const [openSection, setOpenSection] = useState<string | null>(null)

  function toggleSection(id: string) {
    setOpenSection(openSection === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#0A1628' }} />
          </button>
          <span style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem', fontWeight: 800, color: '#0A1628' }}>How We Calculate</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Heading */}
          <div style={{ padding: '4px 0 8px' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>How Your Results Are Calculated</div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5 }}>We use the same methodology and formulas that the IRS uses to evaluate your case.</div>
          </div>

          {/* Expandable Sections */}
          {SECTIONS.map((section) => {
            const isOpen = openSection === section.id
            return (
              <div
                key={section.id}
                style={{ background: 'white', border: `1px solid ${isOpen ? '#E2E8F0' : '#F1F5F9'}`, borderRadius: 14, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer' }}
                onClick={() => toggleSection(section.id)}
              >
                {/* Section Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: section.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fas ${section.icon}`} style={{ fontSize: 14, color: section.iconColor }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A1628' }}>{section.title}</div>
                      <div style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{section.subtitle}</div>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-down`} style={{ fontSize: 11, color: '#CBD5E1', transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                </div>

                {/* Section Detail */}
                <div style={{ maxHeight: isOpen ? 600 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease', padding: isOpen ? '0 16px 16px' : '0 16px' }}>
                  {section.formula && (
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px', fontFamily: "'DM Sans', monospace", fontSize: '0.82rem', fontWeight: 700, color: '#0A1628', textAlign: 'center', letterSpacing: '0.01em', marginBottom: 12 }}>
                      {section.formula}
                    </div>
                  )}
                  <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.6, marginBottom: 10 }}>{section.content}</p>

                  {section.bullets && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.bullets.map((b) => (
                        <div key={b.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <i className={`fas ${b.icon}`} style={{ fontSize: b.iconSize || 5, color: b.iconColor, marginTop: 7 }} />
                          <span style={{ fontSize: '0.78rem', color: '#1F2937', lineHeight: 1.5 }}><strong>{b.text.split(' -- ')[0]}</strong>{b.text.includes(' -- ') ? ` -- ${b.text.split(' -- ')[1]}` : ''}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.standards && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.standards.map((s) => (
                        <div key={s.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: '#F8FAFC', borderRadius: 8 }}>
                          <i className={`fas ${s.icon}`} style={{ fontSize: 12, color: '#0A1628', marginTop: 2 }} />
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0A1628' }}>{s.title}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{s.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.tolling && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {section.tolling.map((t) => (
                        <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <i className="fas fa-pause" style={{ fontSize: 10, color: '#E63946', marginTop: 5 }} />
                          <span style={{ fontSize: '0.78rem', color: '#1F2937', lineHeight: 1.5 }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.afterContent && (
                    <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.6, marginTop: 10 }}>{section.afterContent}</p>
                  )}
                </div>
              </div>
            )
          })}

          {/* IRS Methodology Reassurance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#ECFDF5', borderRadius: 12 }}>
            <i className="fas fa-shield-halved" style={{ fontSize: 14, color: '#10B981' }} />
            <span style={{ fontSize: '0.78rem', color: '#065F46', fontWeight: 500 }}>This matches the IRS&apos;s own methodology</span>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push('/expert')}
            style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1.5px solid #E2E8F0', background: 'white', borderRadius: 9999, padding: '14px 28px', fontSize: '0.88rem', fontWeight: 700, color: '#0A1628', cursor: 'pointer' }}
          >
            <i className="fas fa-user-tie" style={{ fontSize: 13 }} />
            Questions? Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  )
}
