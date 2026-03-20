'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RELIEF_OPTIONS = [
  {
    title: 'Currently Not Collectible',
    description: 'Temporarily stop all IRS collection activity. The IRS acknowledges you cannot afford to pay and suspends enforcement actions like levies and garnishments.',
    accentColor: '#D97706',
    iconBg: 'bg-[#FEF3C7]',
    tagBg: 'bg-[#FFFBEB]',
    tagColor: 'text-[#92400E]',
    tags: [
      { icon: 'coins', label: 'MDI $0 requirement' },
      { icon: 'form', label: 'Form 433-F' },
      { icon: 'clock', label: 'Debt continues accruing' },
    ],
    href: '/relief/cnc-guidance',
  },
  {
    title: 'Innocent Spouse Relief',
    description: 'If your spouse (or former spouse) improperly reported items or omitted items on a joint return, you may be relieved of responsibility for the tax, interest, and penalties.',
    accentColor: '#E63946',
    iconBg: 'bg-[#FFF0F1]',
    tagBg: 'bg-[#FFF0F1]',
    tagColor: 'text-[#9F1239]',
    tags: [
      { icon: 'form', label: 'Form 8857' },
      { icon: 'list', label: '3 types available' },
      { icon: 'calendar', label: '2-year filing deadline' },
    ],
    href: '/relief/spouse-hub',
  },
  {
    title: 'CDP Hearing',
    description: 'A Collection Due Process hearing gives you the right to challenge IRS collection actions. It pauses enforcement while your case is reviewed by an independent appeals officer.',
    accentColor: '#4F46E5',
    iconBg: 'bg-[#EEF2FF]',
    tagBg: 'bg-[#EEF2FF]',
    tagColor: 'text-[#3730A3]',
    tags: [
      { icon: 'form', label: 'Form 12153' },
      { icon: 'clock', label: 'Within 30 days of notice' },
      { icon: 'ban', label: 'Stops levies' },
    ],
    href: '#',
  },
  {
    title: 'Bankruptcy Discharge',
    description: 'In certain circumstances, tax debts can be discharged through Chapter 7 bankruptcy. Strict timing rules must be met before the debt qualifies for discharge.',
    accentColor: '#6B7280',
    iconBg: 'bg-[#F3F4F6]',
    tagBg: 'bg-[#F3F4F6]',
    tagColor: 'text-[#374151]',
    tags: [
      { icon: 'calendar', label: '3-year rule' },
      { icon: 'calendar', label: '2-year rule' },
      { icon: 'clock', label: '240-day rule' },
    ],
    href: '#',
  },
]

export default function OtherReliefPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Other Relief Options</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-24">
        {/* Intro text */}
        <div className="text-center py-0.5 pb-1.5">
          <p className="text-[0.82rem] text-[#64748B] leading-relaxed">
            Beyond standard payment plans and offers, these relief options may apply to your situation.
          </p>
        </div>

        {/* Relief Cards */}
        {RELIEF_OPTIONS.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className="block rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] no-underline"
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: option.accentColor }} />

            <div className="flex items-start gap-3.5">
              <div className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${option.iconBg} shrink-0`}>
                <svg className="h-5 w-5" style={{ color: option.accentColor }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[0.92rem] font-extrabold text-[#0A1628]">{option.title}</span>
                </div>
                <p className="text-[0.78rem] text-[#64748B] leading-relaxed mb-3">
                  {option.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {option.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`inline-flex items-center gap-1 rounded-md ${option.tagBg} ${option.tagColor} px-2 py-0.5 text-[0.65rem] font-semibold`}
                    >
                      <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Learn More */}
                <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold" style={{ color: option.accentColor }}>
                  Learn More
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
