'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SwitchCard {
  id: string
  fromLabel: string
  fromBg: string
  fromColor: string
  toLabel: string
  toBg: string
  toColor: string
  iconBg: string
  iconColor: string
  subtitle: string
  detail: string
  steps?: { num: number; text: string }[]
  tip?: { icon: string; color: string; bg: string; text: string }
}

const SWITCH_CARDS: SwitchCard[] = [
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
    tip: { icon: 'fa-lightbulb', color: '#065F46', bg: '#E6F9EE', text: 'Proactively setting up an IA shows good faith and avoids enforcement' },
  },
  {
    id: 'oic-to-ia',
    fromLabel: 'OIC Rejected', fromBg: '#FFF0F1', fromColor: '#E63946',
    toLabel: 'IA', toBg: '#EBF0FF', toColor: '#0A1628',
    iconBg: '#FFF0F1', iconColor: '#E63946',
    subtitle: 'IA is always available, no waiting period',
    detail: 'If offer denied, you can immediately set up an installment agreement',
    tip: { icon: 'fa-circle-check', color: '#065F46', bg: '#E6F9EE', text: 'No waiting period required between OIC rejection and IA setup' },
  },
  {
    id: 'any-to-cdp',
    fromLabel: 'Any', fromBg: '#F8FAFC', fromColor: '#64748B',
    toLabel: 'CDP', toBg: '#FEF3C7', toColor: '#D97706',
    iconBg: '#FEF3C7', iconColor: '#D97706',
    subtitle: 'If you receive a collection notice',
    detail: '30-day window to file Form 12153',
    steps: [
      { num: 1, text: 'Receive collection notice (levy/lien)' },
      { num: 2, text: 'File Form 12153 within 30 days' },
      { num: 3, text: 'Propose alternative resolution at hearing' },
    ],
    tip: { icon: 'fa-clock', color: '#92400E', bg: '#FFFBEB', text: '30-day deadline is strict — do not miss it' },
  },
]

export default function SwitchingPage() {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function toggleCard(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">Change Resolution</span>
          <div className="w-10" />
        </div>

        <div className="px-5 py-5 pb-8">
          {/* Title */}
          <div className="mb-1">
            <h1 className="text-xl font-extrabold text-[#0A1628] leading-tight">Switching Your Resolution Path</h1>
          </div>
          <p className="text-[13px] text-[#64748B] mb-5">Sometimes circumstances change and a different resolution makes sense</p>

          {/* Switch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SWITCH_CARDS.map((card) => {
              const isExpanded = expandedId === card.id
              return (
                <div
                  key={card.id}
                  className={`rounded-2xl bg-white border-[1.5px] overflow-hidden cursor-pointer transition-all duration-500 ${
                    isExpanded ? 'border-[#0A1628] shadow-[0_1px_2px_rgba(0,0,0,0.03)]' : 'border-[#F1F5F9] hover:border-[rgba(0,61,165,0.2)]'
                  }`}
                  onClick={() => toggleCard(card.id)}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: card.iconBg }}>
                      <i className="fa-solid fa-arrows-rotate text-base" style={{ color: card.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold" style={{ background: card.fromBg, color: card.fromColor }}>
                          {card.fromLabel}
                        </span>
                        <i className="fa-solid fa-arrow-right text-[10px] text-[#CBD5E1]" />
                        <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold" style={{ background: card.toBg, color: card.toColor }}>
                          {card.toLabel}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B]">{card.subtitle}</p>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-xs text-[#CBD5E1] transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Body */}
                  <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[400px]' : 'max-h-0'}`}>
                    <div className="border-t border-[#F1F5F9] px-4 pb-4 pt-3.5">
                      <p className="text-xs text-[#64748B] mb-3">{card.detail}</p>
                      {card.steps && card.steps.map((step) => (
                        <div key={step.num} className="flex items-center gap-2.5 py-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-[11px] font-bold text-[#0A1628]">
                            {step.num}
                          </div>
                          <p className="text-[13px] font-semibold text-[#0A1628]">{step.text}</p>
                        </div>
                      ))}
                      {card.tip && (
                        <div className="flex items-start gap-2 rounded-[10px] p-2.5 mt-2.5" style={{ background: card.tip.bg, border: card.tip.bg === '#FFFBEB' ? '1px solid rgba(245,166,35,0.2)' : 'none' }}>
                          <i className={`fa-solid ${card.tip.icon} text-[13px] mt-0.5`} style={{ color: card.tip.color === '#065F46' ? '#00A651' : '#D97706' }} />
                          <p className="text-xs font-medium" style={{ color: card.tip.color }}>{card.tip.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Warning Card */}
          <div className="mt-[18px] mb-5 rounded-[14px] bg-[#FFF0F1] border border-[rgba(230,57,70,0.15)] p-3.5 flex items-start gap-2.5">
            <i className="fa-solid fa-exclamation-triangle text-[#E63946] text-sm mt-0.5" />
            <div>
              <p className="text-[13px] font-bold text-[#991B1B] mb-0.5">Prior Defaults Matter</p>
              <p className="text-xs text-[#B91C1C]">Prior defaults (TC 971 AC 073) = extra scrutiny on new applications</p>
            </div>
          </div>

          {/* CTAs */}
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white">
            <i className="fa-solid fa-comments" />
            Talk to Expert About Options
          </button>
          <div className="mt-3 text-center">
            <a href="#" className="text-[13px] font-semibold text-[#64748B]">
              <i className="fa-solid fa-arrow-left text-[10px] mr-1" />
              Back to Results
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
