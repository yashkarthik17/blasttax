'use client'

import { useState } from 'react'
import Link from 'next/link'

const itemizedFields = [
  { label: 'Medical expenses', sub: 'Exceeding 7.5% AGI' },
  { label: 'State/local taxes', sub: 'SALT, max $10,000' },
  { label: 'Mortgage interest', sub: '' },
  { label: 'Charitable contributions', sub: '' },
  { label: 'Other deductions', sub: '' },
]

export default function DeductionsPage() {
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard')
  const [itemizedValues, setItemizedValues] = useState<number[]>(new Array(itemizedFields.length).fill(0))

  const itemizedTotal = itemizedValues.reduce((a, b) => a + b, 0)

  const handleItemizedChange = (index: number, value: string) => {
    const num = parseFloat(value.replace(/,/g, '')) || 0
    setItemizedValues((prev) => {
      const next = [...prev]
      next[index] = num
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/state-filing" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 4/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '66.6%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.4rem] font-extrabold text-[#0A1628] tracking-tight mb-1.5">Deductions</h1>
          <p className="text-[0.85rem] text-[#94A3B8] font-normal leading-relaxed">Choose your deduction method</p>
        </div>

        {/* Standard Deduction Option */}
        <button
          onClick={() => setDeductionType('standard')}
          className={`w-full text-left bg-white border-2 rounded-[16px] p-[18px] cursor-pointer relative overflow-hidden transition-all ${
            deductionType === 'standard' ? 'border-[#0A1628]' : 'border-[#E2E8F0] hover:border-[#0A1628]/20'
          }`}
        >
          {deductionType === 'standard' && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0A1628]" />}
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              deductionType === 'standard' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {deductionType === 'standard' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Standard Deduction</span>
                <span className="text-[1rem] font-black text-[#0A1628]">$14,600</span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="px-2 py-0.5 bg-[#E6F9EE] rounded-full text-[0.62rem] font-bold text-[#00A651]">RECOMMENDED</span>
                <span className="text-[0.68rem] text-[#94A3B8] font-medium">for single filers</span>
              </div>
              <p className="text-[0.76rem] text-[#94A3B8] leading-relaxed">Most taxpayers choose this. It&apos;s simpler and often results in a larger deduction.</p>
            </div>
          </div>
        </button>

        {/* Itemized Deduction Option */}
        <div
          onClick={() => setDeductionType('itemized')}
          className={`w-full text-left bg-white border-2 rounded-[16px] p-[18px] cursor-pointer relative overflow-hidden transition-all ${
            deductionType === 'itemized' ? 'border-[#0A1628]' : 'border-[#E2E8F0] hover:border-[#0A1628]/20'
          }`}
        >
          {deductionType === 'itemized' && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0A1628]" />}
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              deductionType === 'itemized' ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {deductionType === 'itemized' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Itemized Deductions</span>
              </div>
              <p className="text-[0.76rem] text-[#94A3B8] leading-relaxed">If your itemized deductions exceed the standard deduction amount.</p>
            </div>
          </div>

          {/* Itemized Detail */}
          {deductionType === 'itemized' && (
            <div className="mt-4 pt-3.5 border-t border-[#E2E8F0]" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-0.5">
                {itemizedFields.map((field, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-[#F1F5F9] last:border-b-0">
                    <div className="flex-1">
                      <div className="text-[0.78rem] font-semibold text-[#0A1628]">{field.label}</div>
                      {field.sub && <div className="text-[0.65rem] text-[#94A3B8]">{field.sub}</div>}
                    </div>
                    <div className="relative w-[110px]">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[0.88rem] font-semibold text-[#94A3B8] z-10">$</span>
                      <input
                        type="text"
                        placeholder="0.00"
                        onChange={(e) => handleItemizedChange(i, e.target.value)}
                        className="w-full py-2.5 pl-7 pr-3 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.82rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all placeholder:text-[#CBD5E1] placeholder:font-normal"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Total */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t-2 border-[#E2E8F0]">
                <span className="text-[0.82rem] font-bold text-[#0A1628]">Total Itemized</span>
                <span className="text-[1rem] font-black text-[#0A1628]">${itemizedTotal.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Comparison */}
        {deductionType === 'itemized' && (
          <div className="bg-[#EFF4FF] rounded-[14px] p-4">
            <div className="text-[0.72rem] font-bold text-[#0A1628] uppercase tracking-wide mb-2.5">Comparison</div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="text-[0.78rem] font-semibold text-[#64748B]">Standard</div>
                <div className="text-[1.1rem] font-extrabold text-[#0A1628]">$14,600</div>
              </div>
              <div className="text-[0.78rem] font-semibold text-[#94A3B8]">vs</div>
              <div className="text-right">
                <div className="text-[0.78rem] font-semibold text-[#64748B]">Itemized</div>
                <div className="text-[1.1rem] font-extrabold text-[#0A1628]">${itemizedTotal.toLocaleString()}</div>
              </div>
            </div>
            <div className={`px-3 py-2 rounded-lg text-center ${itemizedTotal > 14600 ? 'bg-[#0A1628]/10' : 'bg-[#00A651]/10'}`}>
              <span className={`text-[0.75rem] font-bold ${itemizedTotal > 14600 ? 'text-[#0A1628]' : 'text-[#00A651]'}`}>
                <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" className="inline mr-1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                {itemizedTotal > 14600 ? 'Itemized deductions save you more' : 'Standard deduction saves you more'}
              </span>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="pt-2">
          <Link href="/tax-filing/credits" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
