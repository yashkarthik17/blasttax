'use client'

import { useState } from 'react'
import Link from 'next/link'

const incomeTypes = [
  { id: 'w2', label: 'W-2 Employment Income', sub: 'Wages, salary, tips', icon: '💼', bgColor: 'bg-[#EFF4FF]', defaultSelected: true },
  { id: '1099nec', label: '1099-NEC Self-Employment', sub: 'Freelance, contract work', icon: '💻', bgColor: 'bg-[#F5F0FF]' },
  { id: '1099int', label: '1099-INT Interest Income', sub: 'Bank interest, savings', icon: '🏦', bgColor: 'bg-[#F0FDFA]' },
  { id: '1099div', label: '1099-DIV Dividend Income', sub: 'Stock dividends, distributions', icon: '📈', bgColor: 'bg-[#FEF3C7]' },
  { id: '1099r', label: '1099-R Retirement', sub: 'Pension, IRA distributions', icon: '🐷', bgColor: 'bg-[#FFF0F1]' },
  { id: '1099g', label: '1099-G Unemployment', sub: 'Government payments', icon: '📄', bgColor: 'bg-[#EEF2FF]' },
  { id: '1099ssa', label: '1099-SSA Social Security', sub: 'Social security benefits', icon: '🛡️', bgColor: 'bg-[#EFF4FF]' },
  { id: 'rental', label: 'Rental Income', sub: 'Property rental earnings', icon: '🏠', bgColor: 'bg-[#F0FDFA]' },
  { id: 'other', label: 'Other Income', sub: 'Gambling, alimony, etc.', icon: '...', bgColor: 'bg-[#FAFAFF]' },
]

export default function IncomeChecklistPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['w2']))

  const toggleItem = (id: string) => {
    setSelected((prev) => {
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
    <div className="flex flex-col min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/security" className="w-9 h-9 rounded-xl bg-[#FAFAFF] border border-[#F0F0F5] flex items-center justify-center">
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

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.35rem] font-extrabold text-[#1A1A2E] tracking-tight mb-1.5">What income did you receive?</h1>
          <p className="text-[0.82rem] text-[#8585A0] font-normal leading-relaxed">Select all that apply for tax year 2025</p>
        </div>

        {/* Checkbox Cards */}
        <div className="flex flex-col gap-2.5">
          {incomeTypes.map((item) => {
            const isSelected = selected.has(item.id)
            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] border-[1.5px] select-none transition-all hover:-translate-y-px active:scale-[0.98] text-left ${
                  isSelected
                    ? 'border-[#1A1A2E] bg-[#EFF4FF] shadow-[0_0_0_3px_rgba(10,22,40,0.08)]'
                    : 'border-[#D5D5E0] bg-white hover:border-[#1A1A2E]/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 text-[15px]`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[0.88rem] font-semibold text-[#1A1A2E]">{item.label}</div>
                  <div className="text-[0.72rem] text-[#8585A0] mt-0.5">{item.sub}</div>
                </div>
                <div className={`w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? 'border-[#1A1A2E] bg-[#1A1A2E]' : 'border-[#D5D5E0]'
                }`}>
                  {isSelected && (
                    <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Min selection hint */}
        <div className="flex items-center gap-1.5 px-1">
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#B0B0C8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
          <span className="text-[0.72rem] text-[#8585A0] font-medium">At least one must be selected</span>
        </div>

        {/* Continue Button */}
        <div className="pt-1">
          <Link href="/tax-filing/w2" className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
