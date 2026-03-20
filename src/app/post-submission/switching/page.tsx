'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SwitchCardData {
  id: string
  fromLabel: string
  fromBg: string
  fromColor: string
  toLabel: string
  toBg: string
  toColor: string
  iconBg: string
  iconColor: string
  iconType?: string
  subtitle: string
  detail: string
  steps?: { num: number; text: string }[]
  tip?: { icon: string; iconColor: string; bg: string; border?: string; textColor: string; text: string }
}

const SWITCH_CARDS: SwitchCardData[] = [
  {
    id: 'ia-to-oic',
    fromLabel: 'IA', fromBg: '#EBF0FF', fromColor: '#0A1628',
    toLabel: 'OIC', toBg: '#F5F0FF', toColor: '#7C3AED',
    iconBg: '#EBF0FF', iconColor: '#0A1628',
    subtitle: 'Must terminate IA first',
    detail: 'TC 971 AC 043/063 must close before TC 480 posts',
    steps: [
      { num: 1, text: 'Call IRS to terminate current IA' },
      { num: 2, text: 'Wait for IA closure to process' },
      { num: 3, text: 'File Form 656 (OIC application)' },
    ],
  },
  {
    id: 'ia-to-cnc',
    fromLabel: 'IA', fromBg: '#EBF0FF', fromColor: '#0A1628',
    toLabel: 'CNC', toBg: '#F0FDFA', toColor: '#0D9488',
    iconBg: '#EBF0FF', iconColor: '#0D9488',
    subtitle: 'If you can no longer afford payments',
    detail: 'Demonstrate $0 monthly disposable income (MDI)',
    steps: [
      { num: 1, text: 'Call IRS, explain financial hardship' },
      { num: 2, text: 'Submit Form 433-F with financials' },
      { num: 3, text: 'Request CNC status' },
    ],
  },
  {
    id: 'cnc-to-ia',
    fromLabel: 'CNC', fromBg: '#F0FDFA', fromColor: '#0D9488',
    toLabel: 'IA', toBg: '#EBF0FF', toColor: '#0A1628',
    iconBg: '#F0FDFA', iconColor: '#0A1628',
    subtitle: 'If your financial situation improves',
    detail: 'Better to self-initiate than wait for IRS to revoke',
    tip: { icon: 'fa-lightbulb', iconColor: '#00A651', bg: '#E6F9EE', textColor: '#065F46', text: 'Proactively setting up an IA shows good faith and avoids enforcement' },
  },
  {
    id: 'oic-to-ia',
    fromLabel: 'OIC Rejected', fromBg: '#FFF0F1', fromColor: '#E63946',
    toLabel: 'IA', toBg: '#EBF0FF', toColor: '#0A1628',
    iconBg: '#FFF0F1', iconColor: '#E63946',
    subtitle: 'IA is always available, no waiting period',
    detail: 'If offer denied, you can immediately set up an installment agreement',
    tip: { icon: 'fa-circle-check', iconColor: '#00A651', bg: '#E6F9EE', textColor: '#065F46', text: 'No waiting period required between OIC rejection and IA setup' },
  },
  {
    id: 'any-to-cdp',
    fromLabel: 'Any', fromBg: '#F8FAFC', fromColor: '#64748B',
    toLabel: 'CDP', toBg: '#FEF3C7', toColor: '#D97706',
    iconBg: '#FEF3C7', iconColor: '#D97706',
    iconType: 'fa-gavel',
    subtitle: 'If you receive a collection notice',
    detail: '30-day window to file Form 12153',
    steps: [
      { num: 1, text: 'Receive collection notice (levy/lien)' },
      { num: 2, text: 'File Form 12153 within 30 days' },
      { num: 3, text: 'Propose alternative resolution at hearing' },
    ],
    tip: { icon: 'fa-clock', iconColor: '#D97706', bg: '#FFFBEB', border: '1px solid rgba(245,166,35,0.2)', textColor: '#92400E', text: '30-day deadline is strict \u2014 do not miss it' },
  },
]

export default function SwitchingPage() {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleCard(id: string) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}>
          <button onClick={() => router.back()} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fa-solid fa-arrow-left" style={{ color: '#64748B' }} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0A1628' }}>Change Resolution</span>
          <div style={{ width: '40px' }} />
        </div>

        <div style={{ padding: '20px', paddingBottom: '20px' }}>
          {/* Title */}
          <div style={{ marginBottom: '4px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A1628', lineHeight: 1.25, margin: 0 }}>Switching Your Resolution Path</h1>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '22px', marginTop: '4px' }}>Sometimes circumstances change and a different resolution makes sense</p>

          {/* Switch Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SWITCH_CARDS.map((card) => {
              const isExpanded = expandedId === card.id
              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  style={{
                    background: 'white', border: isExpanded ? '1.5px solid #0A1628' : '1.5px solid #F1F5F9',
                    borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    boxShadow: isExpanded ? '0 1px 2px rgba(0,0,0,0.03)' : 'none',
                  }}
                >
                  {/* Header */}
                  <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${card.iconType || 'fa-arrows-rotate'}`} style={{ fontSize: '16px', color: card.iconColor }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, background: card.fromBg, color: card.fromColor }}>{card.fromLabel}</span>
                        <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px', color: '#CBD5E1' }} />
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, background: card.toBg, color: card.toColor }}>{card.toLabel}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>{card.subtitle}</p>
                    </div>
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '12px', color: '#CBD5E1', transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)', transform: isExpanded ? 'rotate(180deg)' : 'none' }} />
                  </div>

                  {/* Body */}
                  <div style={{ maxHeight: isExpanded ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '12px', margin: '0 0 12px 0' }}>{card.detail}</p>
                      {card.steps && card.steps.map((step) => (
                        <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6875rem', fontWeight: 700, color: '#0A1628' }}>{step.num}</div>
                          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0A1628', margin: 0 }}>{step.text}</p>
                        </div>
                      ))}
                      {card.tip && (
                        <div style={{ padding: '10px 12px', background: card.tip.bg, border: card.tip.border || 'none', borderRadius: '10px', marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <i className={`fa-solid ${card.tip.icon}`} style={{ color: card.tip.iconColor, fontSize: '13px', marginTop: '2px' }} />
                          <p style={{ fontSize: '0.75rem', color: card.tip.textColor, fontWeight: 500, margin: 0 }}>{card.tip.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Warning Card */}
          <div style={{ marginTop: '18px', marginBottom: '20px', padding: '14px 16px', background: '#FFF0F1', border: '1px solid rgba(230,57,70,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <i className="fa-solid fa-exclamation-triangle" style={{ color: '#E63946', fontSize: '14px', marginTop: '2px' }} />
            <div>
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#991B1B', marginBottom: '2px', margin: '0 0 2px 0' }}>Prior Defaults Matter</p>
              <p style={{ fontSize: '0.75rem', color: '#B91C1C', margin: 0 }}>Prior defaults (TC 971 AC 073) = extra scrutiny on new applications</p>
            </div>
          </div>

          {/* CTAs */}
          <button style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '16px', background: '#0A1628', borderRadius: '16px', border: 'none',
            color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <i className="fa-solid fa-comments" />
            Talk to Expert About Options
          </button>
          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <a href="#" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', textDecoration: 'none' }}>
              <i className="fa-solid fa-arrow-left" style={{ fontSize: '10px', marginRight: '4px' }} />
              Back to Results
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
