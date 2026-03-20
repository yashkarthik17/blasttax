'use client'

import { useState } from 'react'
import Link from 'next/link'

const creditItems = [
  {
    id: 'child',
    label: 'Child Tax Credit',
    sub: '$2,000 per qualifying child',
    badge: '0 qualifying children',
    badgeBg: 'bg-[#F8FAFC]',
    badgeColor: 'text-[#64748B]',
    expandLabel: 'Number of qualifying children',
    inputType: 'number' as const,
  },
  {
    id: 'eic',
    label: 'Earned Income Credit (EIC)',
    sub: 'Based on income and filing status',
    badge: 'Estimated: $0',
    badgeBg: 'bg-[#F8FAFC]',
    badgeColor: 'text-[#64748B]',
    expandLabel: '',
    inputType: null,
  },
  {
    id: 'aoc',
    label: 'American Opportunity Credit',
    sub: 'Education expenses',
    badge: 'Up to $2,500',
    badgeBg: 'bg-[#EFF4FF]',
    badgeColor: 'text-[#0A1628]',
    expandLabel: 'Qualified education expenses',
    inputType: 'currency' as const,
  },
  {
    id: 'llc',
    label: 'Lifetime Learning Credit',
    sub: 'Education expenses',
    badge: 'Up to $2,000',
    badgeBg: 'bg-[#EFF4FF]',
    badgeColor: 'text-[#0A1628]',
    expandLabel: 'Qualified tuition & fees',
    inputType: 'currency' as const,
  },
  {
    id: 'cdc',
    label: 'Child & Dependent Care Credit',
    sub: 'Daycare/childcare expenses',
    badge: '',
    badgeBg: '',
    badgeColor: '',
    expandLabel: 'Total care expenses',
    inputType: 'currency' as const,
  },
  {
    id: 'saver',
    label: "Saver's Credit",
    sub: 'Retirement contributions',
    badge: '',
    badgeBg: '',
    badgeColor: '',
    expandLabel: 'Retirement contributions amount',
    inputType: 'currency' as const,
  },
  {
    id: 'energy',
    label: 'Energy Credits',
    sub: 'Solar, EV, home improvements',
    badge: '',
    badgeBg: '',
    badgeColor: '',
    expandLabel: 'Qualified energy expenses',
    inputType: 'currency' as const,
  },
]

export default function TaxCreditsPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggleCredit = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/deductions" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 5/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '83.3%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-3">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.4rem] font-extrabold text-[#0A1628] tracking-tight mb-1.5">Tax Credits</h1>
          <p className="text-[0.85rem] text-[#94A3B8] font-normal leading-relaxed">Credits directly reduce your tax -- check all that apply</p>
        </div>

        {/* Credit Cards */}
        {creditItems.map((item) => {
          const isChecked = checked.has(item.id)
          return (
            <div
              key={item.id}
              className={`bg-white border-[1.5px] rounded-[14px] p-4 cursor-pointer relative transition-all ${
                isChecked ? 'border-[#0A1628]' : 'border-[#E2E8F0] hover:border-[#0A1628]/15'
              }`}
            >
              <div className="flex items-start gap-3" onClick={() => toggleCredit(item.id)}>
                <div className={`w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  isChecked ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#D5D5E0]'
                }`}>
                  {isChecked && (
                    <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[0.85rem] font-bold text-[#0A1628]">{item.label}</div>
                  <div className="text-[0.72rem] text-[#94A3B8] mt-0.5">{item.sub}</div>
                  {item.badge && (
                    <div className={`inline-flex mt-1.5 px-2 py-0.5 ${item.badgeBg} rounded-full text-[0.65rem] font-semibold ${item.badgeColor}`}>
                      {item.badge}
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable content */}
              {isChecked && item.expandLabel && (
                <div className="pt-3.5 mt-3 border-t border-[#E2E8F0]">
                  <label className="text-[0.72rem] font-semibold text-[#94A3B8] block mb-1.5">{item.expandLabel}</label>
                  {item.inputType === 'number' ? (
                    <div className="w-[100px]">
                      <input
                        type="number"
                        placeholder="0"
                        min={0}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 px-3 bg-white border-[1.5px] border-[#E2E8F0] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[0.82rem] font-semibold text-[#94A3B8] z-10">$</span>
                      <input
                        type="text"
                        placeholder="0.00"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 pl-6 pr-3.5 bg-white border-[1.5px] border-[#E2E8F0] rounded-[10px] text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all placeholder:text-[#CBD5E1] placeholder:font-normal"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Total Credits */}
        <div className="flex items-center justify-center py-3.5 bg-[#E6F9EE] rounded-[14px] mt-1">
          <div className="text-center">
            <div className="text-[0.7rem] font-semibold text-[#00A651] uppercase tracking-wider mb-0.5">Total Credits</div>
            <div className="text-[1.4rem] font-black text-[#00A651]">$0</div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/review" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
