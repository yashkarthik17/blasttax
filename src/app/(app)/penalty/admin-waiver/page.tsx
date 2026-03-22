'use client'

import { useRouter } from 'next/navigation'

const PROCESS_STEPS = [
  {
    title: 'IRS Identifies Systemic Issues',
    description: 'The IRS finds widespread problems affecting many taxpayers',
    iconBg: 'bg-[#EBF0FF]',
    iconColor: 'text-[#1A1A2E]',
  },
  {
    title: 'Issues a Blanket Waiver',
    description: 'Relief applies to all affected tax periods and taxpayers',
    iconBg: 'bg-[#F5F0FF]',
    iconColor: 'text-[#7C3AED]',
  },
  {
    title: 'TC 271 Posts Automatically',
    description: 'Penalty removed on your account transcript without any action from you',
    iconBg: 'bg-[#E6F9EE]',
    iconColor: 'text-[#00A651]',
  },
]

const HOW_STEPS = [
  { title: 'Review your transcript for TC 271', desc: 'Transaction code 271 indicates a penalty has been systemically removed' },
  { title: 'Check IRS.gov for current programs', desc: 'IRS publishes notices for active waiver programs' },
  { title: 'Call IRS about systemic relief', desc: 'Ask specifically if your account qualifies for any administrative waivers' },
]

export default function PenaltyAdminWaiverPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D5D5E0] bg-[#FAFAFF] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Administrative Waiver</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0FDFA] px-3 py-1 text-[0.65rem] font-bold text-[#0D9488] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
            IRS-INITIATED
          </span>
          <h1 className="text-[1.3rem] font-extrabold text-[#1A1A2E] leading-tight tracking-tight">
            IRS-Initiated Penalty Removal
          </h1>
        </div>

        {/* Explanation */}
        <div className="rounded-[14px] bg-[#FAFAFF] border border-[#D5D5E0] p-3.5 px-4">
          <p className="text-[0.78rem] text-[#5C5C7A] leading-relaxed">
            The IRS can systemically remove penalties through administrative waivers without you requesting it. These are blanket relief programs for widespread issues.
          </p>
        </div>

        {/* How It Works */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#B0B0C8] uppercase tracking-wider mb-3.5">How It Works</div>

          {PROCESS_STEPS.map((step, index) => (
            <div key={step.title} className="flex gap-3 relative pb-4">
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#D5D5E0]" />
              )}
              <div className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${step.iconBg} shrink-0 z-[1]`}>
                <svg className={`h-3.5 w-3.5 ${step.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                  {index === 0 && <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>}
                  {index === 1 && <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/>}
                  {index === 2 && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
                </svg>
              </div>
              <div className="flex-1 pt-1">
                <div className="text-[0.82rem] font-bold text-[#1A1A2E]">{step.title}</div>
                <div className="text-[0.72rem] text-[#8585A0] mt-0.5 leading-relaxed">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Label */}
        <div className="text-[0.7rem] font-bold text-[#B0B0C8] uppercase tracking-wider px-1">
          Recent Waivers
        </div>

        {/* Waiver Card 1 */}
        <div className="rounded-[14px] border border-[#D5D5E0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="rounded-lg bg-[#EBF0FF] px-2.5 py-0.5 text-[0.65rem] font-extrabold text-[#1A1A2E]">2024</span>
            <span className="text-[0.82rem] font-bold text-[#1A1A2E]">COVID-era Penalty Relief</span>
          </div>
          <p className="text-[0.75rem] text-[#5C5C7A] leading-relaxed mb-2">
            Automatic failure-to-pay penalty abatement for 2020-2021 tax years. The IRS provided relief for taxpayers affected by COVID-19 processing delays.
          </p>
          <div className="flex items-center gap-1.5">
            <svg className="h-2.5 w-2.5 text-[#00A651]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
            <span className="text-[0.7rem] text-[#8585A0] font-medium">Tax years 2020 &ndash; 2021</span>
          </div>
        </div>

        {/* Waiver Card 2 */}
        <div className="rounded-[14px] border border-[#D5D5E0] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="rounded-lg bg-[#F5F0FF] px-2.5 py-0.5 text-[0.65rem] font-extrabold text-[#7C3AED]">2023</span>
            <span className="text-[0.82rem] font-bold text-[#1A1A2E]">Notice CP14 Processing Delays</span>
          </div>
          <p className="text-[0.75rem] text-[#5C5C7A] leading-relaxed mb-2">
            Failure-to-pay penalties waived for taxpayers affected by CP14 notice processing delays during the IRS backlog period.
          </p>
          <div className="flex items-center gap-1.5">
            <svg className="h-2.5 w-2.5 text-[#00A651]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
            <span className="text-[0.7rem] text-[#8585A0] font-medium">Affected CP14 recipients</span>
          </div>
        </div>

        {/* How to Check If You Qualify */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
              <svg className="h-3 w-3 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18zM6 15h12v2H6zm0-4h12v2H6zm0-4h12v2H6z"/></svg>
            </div>
            <span className="text-[0.85rem] font-bold text-[#1A1A2E]">How to Check If You Qualify</span>
          </div>

          {HOW_STEPS.map((step, index) => (
            <div key={step.title} className={`flex items-start gap-3 py-2.5 ${index < HOW_STEPS.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EBF0FF] text-[0.7rem] font-extrabold text-[#1A1A2E] shrink-0">
                {index + 1}
              </div>
              <div>
                <div className="text-[0.8rem] font-semibold text-[#1A1A2E]">{step.title}</div>
                <div className="text-[0.72rem] text-[#8585A0] mt-0.5 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-2.5 rounded-[14px] border border-[#C5D5F5] bg-[#EBF0FF] px-4 py-3.5">
          <svg className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <p className="text-[0.75rem] text-[#1E40AF] leading-relaxed font-medium">
            <strong>Good to know:</strong> Administrative waivers are applied BEFORE you need to request First-Time Abatement. Check your transcript first to avoid using FTA unnecessarily.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-1">
          <button className="w-full rounded-full bg-[#1A1A2E] py-4 text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            <svg className="inline-block h-3.5 w-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Check My Account
          </button>
        </div>
      </div>
    </div>
  )
}
