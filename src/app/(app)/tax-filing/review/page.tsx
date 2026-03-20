'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TaxReviewPage() {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/credits" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 6/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '100%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2.5 pt-1">
          <div className="w-9 h-9 rounded-[10px] bg-[#E6F9EE] flex items-center justify-center">
            <svg width="16" height="16" fill="#00A651" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] tracking-tight">Review Your Return</h1>
        </div>

        {/* Tax Year Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF4FF] border border-[#0A1628]/10 rounded-full text-[0.72rem] font-semibold text-[#0A1628]">
          <svg width="10" height="10" fill="#0A1628" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
          Tax Year 2025
        </div>

        {/* Income Summary Card */}
        <div className="bg-white rounded-[16px] px-[18px] py-4 border border-[#E2E8F0]">
          <div className="flex items-center justify-between pb-2 mb-0">
            <span className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider">Income</span>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#CBD5E1" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <span className="text-[0.85rem] text-[#64748B] font-medium">W-2 Wages</span>
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">$52,000</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[0.88rem] font-bold text-[#0A1628]">Total Income</span>
            <span className="text-[0.88rem] font-bold text-[#0A1628]">$52,000</span>
          </div>
        </div>

        {/* Adjustments Card */}
        <div className="bg-white rounded-[16px] px-[18px] py-4 border border-[#E2E8F0]">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[0.75rem] font-bold text-[#CBD5E1] uppercase tracking-wider">Adjustments &amp; Deductions</span>
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#CBD5E1" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <span className="text-[0.85rem] text-[#64748B] font-medium">Adjustments</span>
            <span className="text-[0.85rem] font-semibold text-[#E63946]">-$2,500</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <span className="text-[0.85rem] text-[#64748B] font-medium">Adjusted Gross Income</span>
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">$49,500</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <div>
              <span className="text-[0.85rem] text-[#64748B] font-medium">Deductions</span>
              <div className="text-[0.68rem] text-[#CBD5E1] mt-0.5">Standard Deduction</div>
            </div>
            <span className="text-[0.85rem] font-semibold text-[#E63946]">-$14,600</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[0.88rem] font-bold text-[#0A1628]">Taxable Income</span>
            <span className="text-[0.88rem] font-bold text-[#0A1628]">$34,900</span>
          </div>
        </div>

        {/* Tax Calculation Card */}
        <div className="bg-[#E6F9EE] rounded-[20px] p-5 border border-[#00A651]/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00A651]" />
          <div className="text-[0.75rem] font-bold text-[#065F46] uppercase tracking-wider mb-3">Tax Calculation</div>

          <div className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9]">
            <span className="text-[0.85rem] text-[#065F46] font-medium">Tax Liability</span>
            <span className="text-[0.85rem] font-semibold text-[#0A1628]">$3,958</span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-[0.85rem] text-[#065F46] font-medium">Federal Withholding</span>
            <span className="text-[0.85rem] font-semibold text-[#00A651]">-$6,240</span>
          </div>

          <div className="h-px bg-[#00A651]/15 my-2" />

          <div className="flex justify-between items-center">
            <span className="text-[0.92rem] font-bold text-[#065F46]">Estimated Refund</span>
            <span className="text-[1.6rem] font-black text-[#00A651] tracking-tight">$2,282</span>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <button
          onClick={() => setConfirmed(!confirmed)}
          className="w-full flex items-start gap-3 px-4 py-3.5 bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] cursor-pointer text-left"
        >
          <div className={`w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
            confirmed ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#D5D5E0]'
          }`}>
            {confirmed && (
              <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            )}
          </div>
          <span className="text-[0.84rem] text-[#64748B] font-medium leading-relaxed">I confirm all information is accurate and complete to the best of my knowledge</span>
        </button>

        {/* File Return Button */}
        <div className="flex flex-col gap-2.5 pt-1">
          <Link href="/tax-filing/success" className="w-full flex items-center justify-center gap-2 bg-[#00A651] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            File Return
          </Link>
          <button className="w-full flex items-center justify-center gap-2 text-[#94A3B8] text-[0.88rem] font-semibold py-3">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
            Save as Draft
          </button>
        </div>

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          <svg width="11" height="11" fill="#00A651" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          <span className="text-[0.72rem] text-[#94A3B8] font-medium">Powered by IRS e-File</span>
        </div>
      </div>
    </div>
  )
}
