'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RELIEF_OPTIONS = [
  {
    title: 'Currently Not Collectible',
    description: 'Temporarily stop all IRS collection activity. The IRS acknowledges you cannot afford to pay and suspends enforcement actions like levies and garnishments.',
    accentColor: '#D97706',
    icon: 'fa-pause-circle',
    iconBg: 'bg-[#FEF3C7]',
    tags: [
      { icon: 'fa-coins', label: 'MDI $0 requirement', bg: 'bg-[#FFFBEB]', color: 'text-[#92400E]' },
      { icon: 'fa-file-lines', label: 'Form 433-F', bg: 'bg-[#FFFBEB]', color: 'text-[#92400E]' },
      { icon: 'fa-clock', label: 'Debt continues accruing', bg: 'bg-[#FFFBEB]', color: 'text-[#92400E]' },
    ],
    href: '/relief/cnc-guidance',
  },
  {
    title: 'Innocent Spouse Relief',
    description: 'If your spouse (or former spouse) improperly reported items or omitted items on a joint return, you may be relieved of responsibility for the tax, interest, and penalties.',
    accentColor: '#E63946',
    icon: 'fa-shield-halved',
    iconBg: 'bg-[#FFF0F1]',
    tags: [
      { icon: 'fa-file-signature', label: 'Form 8857', bg: 'bg-[#FFF0F1]', color: 'text-[#9F1239]' },
      { icon: 'fa-list-ol', label: '3 types available', bg: 'bg-[#FFF0F1]', color: 'text-[#9F1239]' },
      { icon: 'fa-calendar', label: '2-year filing deadline', bg: 'bg-[#FFF0F1]', color: 'text-[#9F1239]' },
    ],
    href: '/relief/spouse-hub',
  },
  {
    title: 'CDP Hearing',
    description: 'A Collection Due Process hearing gives you the right to challenge IRS collection actions. It pauses enforcement while your case is reviewed by an independent appeals officer.',
    accentColor: '#4F46E5',
    icon: 'fa-gavel',
    iconBg: 'bg-[#EEF2FF]',
    tags: [
      { icon: 'fa-file-lines', label: 'Form 12153', bg: 'bg-[#EEF2FF]', color: 'text-[#3730A3]' },
      { icon: 'fa-clock', label: 'Within 30 days of notice', bg: 'bg-[#EEF2FF]', color: 'text-[#3730A3]' },
      { icon: 'fa-ban', label: 'Stops levies', bg: 'bg-[#EEF2FF]', color: 'text-[#3730A3]' },
    ],
    href: '#',
  },
  {
    title: 'Bankruptcy Discharge',
    description: 'In certain circumstances, tax debts can be discharged through Chapter 7 bankruptcy. Strict timing rules must be met before the debt qualifies for discharge.',
    accentColor: '#6B7280',
    icon: 'fa-scale-balanced',
    iconBg: 'bg-[#F3F4F6]',
    tags: [
      { icon: 'fa-calendar-days', label: '3-year rule', bg: 'bg-[#F3F4F6]', color: 'text-[#374151]' },
      { icon: 'fa-calendar-check', label: '2-year rule', bg: 'bg-[#F3F4F6]', color: 'text-[#374151]' },
      { icon: 'fa-hourglass-end', label: '240-day rule', bg: 'bg-[#F3F4F6]', color: 'text-[#374151]' },
    ],
    href: '#',
  },
]

export default function OtherReliefPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
            <i className="fas fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Other Relief Options</div>
          <div className="w-9" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-24">
          {/* Intro text */}
          <div className="py-0.5 pb-1.5 text-center">
            <p className="text-[0.82rem] leading-relaxed text-[#64748B]">
              Beyond standard payment plans and offers, these relief options may apply to your situation.
            </p>
          </div>

          {/* Relief Cards */}
          {RELIEF_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="relative block overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] no-underline shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px]" style={{ background: option.accentColor }} />
              <div className="flex items-start gap-3.5">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] ${option.iconBg}`}>
                  <i className={`fas ${option.icon} text-xl`} style={{ color: option.accentColor }} />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 text-[0.92rem] font-extrabold text-[#0A1628]">{option.title}</div>
                  <p className="mb-3 text-[0.78rem] leading-relaxed text-[#64748B]">{option.description}</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {option.tags.map((tag) => (
                      <span key={tag.label} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold ${tag.bg} ${tag.color}`}>
                        <i className={`fas ${tag.icon} text-[8px]`} /> {tag.label}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold" style={{ color: option.accentColor }}>
                    Learn More <i className="fas fa-arrow-right text-[10px]" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
