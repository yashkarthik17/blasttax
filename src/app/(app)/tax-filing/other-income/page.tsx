'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AccordionSection {
  id: string
  label: string
  sub: string
  icon: string
  iconBg: string
  borderColor: string
  fields: { label: string; placeholder: string; className?: string }[]
}

const sections: AccordionSection[] = [
  {
    id: 'nec',
    label: '1099-NEC (Self-Employment)',
    sub: 'Freelance, contract work',
    icon: '💻',
    iconBg: 'bg-[#F5F0FF]',
    borderColor: 'border-l-[#7C3AED]',
    fields: [
      { label: 'Payer Name', placeholder: 'e.g., Client Inc.' },
      { label: 'Amount Received', placeholder: '$0.00', className: 'nec' },
      { label: 'Payer TIN (optional)', placeholder: 'XX-XXXXXXX' },
    ],
  },
  {
    id: 'int',
    label: '1099-INT (Interest)',
    sub: 'Bank interest, savings',
    icon: '🏦',
    iconBg: 'bg-[#F0FDFA]',
    borderColor: 'border-l-[#0D9488]',
    fields: [
      { label: 'Payer Name', placeholder: 'e.g., Chase Bank' },
      { label: 'Interest Amount', placeholder: '$0.00', className: 'int' },
    ],
  },
  {
    id: 'div',
    label: '1099-DIV (Dividends)',
    sub: 'Stock dividends, distributions',
    icon: '📈',
    iconBg: 'bg-[#FEF3C7]',
    borderColor: 'border-l-[#D97706]',
    fields: [
      { label: 'Payer Name', placeholder: 'e.g., Vanguard' },
      { label: 'Ordinary Dividends', placeholder: '$0.00', className: 'div' },
      { label: 'Qualified Dividends', placeholder: '$0.00' },
    ],
  },
  {
    id: 'ret',
    label: '1099-R (Retirement)',
    sub: 'Pension, IRA distributions',
    icon: '🐷',
    iconBg: 'bg-[#FFF0F1]',
    borderColor: 'border-l-[#E63946]',
    fields: [
      { label: 'Payer Name', placeholder: 'e.g., Fidelity' },
      { label: 'Gross Distribution', placeholder: '$0.00' },
      { label: 'Taxable Amount', placeholder: '$0.00', className: 'ret' },
    ],
  },
  {
    id: 'other',
    label: 'Other Income',
    sub: 'Gambling, alimony, etc.',
    icon: '...',
    iconBg: 'bg-[#FAFAFF]',
    borderColor: 'border-l-[#5C5C7A]',
    fields: [
      { label: 'Description', placeholder: 'e.g., Gambling winnings' },
      { label: 'Amount', placeholder: '$0.00', className: 'other' },
    ],
  },
]

export default function OtherIncomePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/w2" className="w-9 h-9 rounded-xl bg-[#FAFAFF] border border-[#F0F0F5] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1A1A2E" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#1A1A2E]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#8585A0]">Step 3/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F0F0F5] rounded-full overflow-hidden">
          <div className="h-full bg-[#1A1A2E] rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3.5">
        {/* Title */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-11 h-11 rounded-[14px] bg-[#FEF3C7] flex items-center justify-center shrink-0 text-lg">
            💰
          </div>
          <div>
            <h1 className="text-[1.3rem] font-extrabold text-[#1A1A2E] tracking-tight mb-0.5">Other Income</h1>
            <p className="text-[0.82rem] text-[#8585A0] font-normal leading-relaxed">Enter income from the sources you selected</p>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="flex flex-col gap-2.5">
          {sections.map((section) => {
            const isExpanded = expandedId === section.id
            return (
              <div
                key={section.id}
                className={`bg-white border-[1.5px] border-[#D5D5E0] border-l-[3px] ${section.borderColor} rounded-[14px] overflow-hidden transition-all ${isExpanded ? 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : ''}`}
              >
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="flex items-center gap-3 w-full px-4 py-3.5 select-none hover:bg-[#FAFAFF] active:scale-[0.99] transition-all text-left"
                >
                  <div className={`w-[38px] h-[38px] rounded-[10px] ${section.iconBg} flex items-center justify-center shrink-0 text-sm`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[0.86rem] font-semibold text-[#1A1A2E]">{section.label}</div>
                    <div className="text-[0.7rem] text-[#8585A0] mt-0.5">{section.sub}</div>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-[20px] text-[0.7rem] font-bold bg-[#FAFAFF] text-[#B0B0C8]">$0</div>
                  <svg
                    width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#B0B0C8" strokeWidth="2"
                    className={`shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[600px]' : 'max-h-0'}`}>
                  <div className="px-4 pb-4 pt-3.5 border-t border-[#D5D5E0]">
                    {section.fields.map((field, i) => (
                      <div key={i} className="mb-3.5 last:mb-0">
                        <label className="block text-[0.72rem] font-semibold text-[#5C5C7A] uppercase tracking-wide mb-1.5">{field.label}</label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full py-3 px-3.5 bg-[#FAFAFF] border-[1.5px] border-[#D5D5E0] rounded-xl text-[0.88rem] font-medium text-[#1A1A2E] outline-none focus:border-[#1A1A2E] focus:bg-white focus:ring-[3px] focus:ring-[#1A1A2E]/8 transition-all placeholder:text-[#B0B0C8] placeholder:font-normal"
                        />
                      </div>
                    ))}
                    {section.id === 'nec' && (
                      <button className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#1A1A2E] mt-1 hover:text-[#060D17] transition-colors">
                        <svg width="13" height="13" fill="#1A1A2E" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                        Add Another 1099-NEC
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Bar */}
        <div className="bg-white border-[1.5px] border-[#D5D5E0] rounded-[14px] px-[18px] py-3.5 flex items-center justify-between">
          <div className="text-[0.82rem] font-semibold text-[#5C5C7A]">Total Other Income</div>
          <div className="text-[1.05rem] font-extrabold text-[#1A1A2E]">$0</div>
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/contractor-1099" className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
