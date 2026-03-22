'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SITUATIONS = [
  {
    title: 'Combat Zone Service',
    code: 'IRC \u00A7 7508',
    iconBg: 'bg-[#EBF0FF]',
    iconColor: 'text-[#1A1A2E]',
    description: 'Automatic extension of filing and payment deadlines for military personnel serving in designated combat zones. Penalties are suspended during the qualifying period.',
    checks: ['Active duty in combat zone', '180-day extension after return'],
    claim: 'Claim: Attach deployment orders to return',
  },
  {
    title: 'Presidentially Declared Disaster',
    code: 'IRC \u00A7 7508A',
    iconBg: 'bg-[#FFF7ED]',
    iconColor: 'text-[#F5A623]',
    description: 'IRS postpones tax deadlines for taxpayers in federally declared disaster areas. Filing and payment penalties are automatically abated for the postponement period.',
    checks: ['Located in FEMA disaster area', 'Deadlines extended automatically'],
    claim: 'Claim: Usually automatic; file in affected area',
  },
  {
    title: 'Spousal Signature',
    code: 'IRC \u00A7 6013(e)',
    iconBg: 'bg-[#F5F0FF]',
    iconColor: 'text-[#7C3AED]',
    description: 'Relief from joint and several liability on a joint return. If your spouse (or former spouse) understated tax, you may not be responsible for the resulting penalties.',
    checks: ['Filed joint return with spouse', 'Understatement due to other spouse'],
    claim: 'Claim: File Form 8857',
  },
  {
    title: 'Estimated Tax Safe Harbor',
    code: 'IRC \u00A7 6654(d)',
    iconBg: 'bg-[#E6F9EE]',
    iconColor: 'text-[#00A651]',
    description: 'No estimated tax penalty if you paid at least 90% of current year tax or 100% of prior year tax (110% if AGI over $150K). The safe harbor protects you by law.',
    checks: ['Paid 90% of current year liability', 'OR 100%/110% of prior year tax'],
    claim: 'Claim: File Form 2210 with return',
  },
  {
    title: 'Reasonable Cause by Law',
    code: 'IRC \u00A7 6664(c)',
    iconBg: 'bg-[#F0FDFA]',
    iconColor: 'text-[#0D9488]',
    description: 'Accuracy-related penalties are removed if you can show reasonable cause and good faith, or had substantial authority for your position. This is a statutory defense against penalties.',
    checks: ['Substantial authority for tax position', 'Acted in good faith with reasonable cause'],
    claim: 'Claim: Attach explanation to penalty response',
  },
]

const QUALIFY_OPTIONS = [
  'I served in a combat zone',
  'I was in a declared disaster area',
  'My spouse caused the tax issue',
  'I met estimated tax safe harbor',
  'I had substantial authority for my position',
]

export default function PenaltyStatutoryPage() {
  const router = useRouter()
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [selectedQualify, setSelectedQualify] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

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
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Statutory Exception</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF0FF] px-3 py-1 text-[0.65rem] font-bold text-[#1A1A2E] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/></svg>
            STATUTORY RELIEF
          </span>
          <h1 className="text-[1.3rem] font-extrabold text-[#1A1A2E] leading-tight tracking-tight">
            Penalties Removed by Law
          </h1>
        </div>

        {/* Explanation */}
        <div className="rounded-[14px] bg-[#FAFAFF] border border-[#D5D5E0] p-3.5 px-4">
          <p className="text-[0.78rem] text-[#5C5C7A] leading-relaxed m-0">
            Certain IRC provisions automatically remove or prevent penalties in specific circumstances. If you qualify under one of these statutes, the penalty is abated as a matter of law.
          </p>
        </div>

        {/* Section Label */}
        <div className="text-[0.7rem] font-bold text-[#B0B0C8] uppercase tracking-wider px-1 mt-0.5">
          Qualifying Situations
        </div>

        {/* Situation Cards */}
        {SITUATIONS.map((situation, index) => (
          <button
            key={situation.title}
            onClick={() => toggleCard(index)}
            className={`w-full text-left rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all ${
              expandedCard === index ? 'border-[1.5px] border-[#1A1A2E]' : 'border border-[#D5D5E0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${situation.iconBg}`}>
                  <svg className={`h-4 w-4 ${situation.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[0.85rem] font-bold text-[#1A1A2E]">{situation.title}</div>
                  <div className="text-[0.68rem] text-[#8585A0] mt-px">{situation.code}</div>
                </div>
              </div>
              <svg
                className={`h-3 w-3 text-[#B0B0C8] transition-transform ${expandedCard === index ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {expandedCard === index && (
              <div className="mt-3.5 pt-3 border-t border-[#F0F0F5]">
                <p className="text-[0.75rem] text-[#5C5C7A] leading-relaxed mb-2.5">{situation.description}</p>
                <div className="flex flex-col gap-1.5">
                  {situation.checks.map((check) => (
                    <div key={check} className="flex items-center gap-1.5">
                      <svg className="h-3 w-3 text-[#00A651] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-[0.72rem] text-[#1A1A2E] font-medium">{check}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3 w-3 text-[#1A1A2E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[0.72rem] text-[#5C5C7A] font-medium">{situation.claim}</span>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}

        {/* Check If You Qualify */}
        <div className="rounded-[18px] border border-[#D5D5E0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
              <svg className="h-3 w-3 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-[0.85rem] font-bold text-[#1A1A2E]">Check If You Qualify</div>
          </div>

          <p className="text-[0.75rem] text-[#5C5C7A] leading-relaxed mb-3.5">
            Select the situation that best describes your circumstances:
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {QUALIFY_OPTIONS.map((option, index) => (
              <button
                key={option}
                onClick={() => setSelectedQualify(index)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 border-[1.5px] transition-all text-left ${
                  selectedQualify === index
                    ? 'border-[#1A1A2E] bg-[#EBF0FF]'
                    : 'border-[#D5D5E0] bg-[#FAFAFF] hover:border-[#1A1A2E] hover:bg-[#EBF0FF]'
                }`}
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 shrink-0 transition-all ${
                    selectedQualify === index ? 'border-[#1A1A2E] bg-[#1A1A2E]' : 'border-[#D5D5E0]'
                  }`}
                >
                  {selectedQualify === index && (
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-[0.78rem] font-semibold text-[#1A1A2E]">{option}</span>
              </button>
            ))}
          </div>

          {/* Result */}
          {selectedQualify !== null && (
            <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-3 mb-3.5">
              <div className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-[0.78rem] font-semibold text-[#065F46]">You may qualify for statutory exception relief!</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-1">
          <button className="w-full rounded-full bg-[#00A651] py-4 text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            <svg className="inline-block h-3.5 w-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            Request Statutory Abatement
          </button>
        </div>
      </div>
    </div>
  )
}
