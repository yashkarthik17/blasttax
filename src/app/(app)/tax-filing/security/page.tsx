'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'

export default function SecurityVerificationPage() {
  const [pinValues, setPinValues] = useState(['', '', '', '', '', ''])
  const [showHelp, setShowHelp] = useState(false)
  const pinRefs = useRef<(HTMLInputElement | null)[]>([])

  const handlePinChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newValues = [...pinValues]
    newValues[index] = value.slice(-1)
    setPinValues(newValues)
    if (value && index < 5) {
      pinRefs.current[index + 1]?.focus()
    }
  }, [pinValues])

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing/taxpayer" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing 2025</span>
        <div className="text-[0.75rem] font-semibold text-[#94A3B8]">Step 2.5/6</div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-2">
        <div className="h-[5px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A1628] rounded-full" style={{ width: '41.6%' }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {/* Title */}
        <div className="pt-1">
          <h1 className="text-[1.4rem] font-extrabold text-[#0A1628] tracking-tight mb-1.5">Security Verification</h1>
          <p className="text-[0.85rem] text-[#94A3B8] font-normal leading-relaxed">The IRS requires identity verification for e-filing</p>
        </div>

        {/* IP PIN Section */}
        <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[16px] p-5">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center">
              <svg width="13" height="13" fill="#0A1628" viewBox="0 0 24 24"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
            </div>
            <div>
              <div className="text-[0.85rem] font-bold text-[#0A1628]">IP PIN</div>
              <div className="text-[0.68rem] text-[#94A3B8] mt-0.5">If you have one from the IRS</div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            {pinValues.map((val, i) => (
              <input
                key={i}
                ref={(el) => { pinRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handlePinChange(i, e.target.value)}
                className="w-11 h-[52px] border-[1.5px] border-[#E2E8F0] rounded-xl bg-white text-[1.2rem] font-bold text-[#0A1628] text-center outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all"
              />
            ))}
          </div>

          {/* Help Toggle */}
          <div className="mt-3.5">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-1.5 w-full px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px] hover:bg-[#EFF4FF] transition-all"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M9 9a3 3 0 015.12 2.13c0 1.5-2.12 2.12-2.12 3.37m0 3.5h.01"/></svg>
              <span className="text-[0.75rem] font-semibold text-[#2563EB]">Don&apos;t have an IP PIN?</span>
              <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2" className={`ml-auto transition-transform ${showHelp ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {showHelp && (
              <div className="px-3.5 py-3 bg-[#F8FAFC] rounded-b-[10px] -mt-0.5">
                <p className="text-[0.74rem] text-[#64748B] leading-relaxed">
                  You can request an IP PIN from the IRS at <strong className="text-[#0A1628]">irs.gov/ippin</strong>. It&apos;s a 6-digit number that helps prevent the misuse of your Social Security number on fraudulent returns. If you haven&apos;t received one, you can skip this field.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Driver's License / State ID */}
        <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[16px] p-5">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-[10px] bg-[#F5F0FF] flex items-center justify-center">
              <svg width="13" height="13" fill="#7C3AED" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10-4h2v2h-2zm-6 0h6v2h-6z"/></svg>
            </div>
            <div>
              <div className="text-[0.85rem] font-bold text-[#0A1628]">Driver&apos;s License / State ID</div>
              <div className="text-[0.68rem] text-[#94A3B8] mt-0.5">Required for identity verification</div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {/* State */}
            <div>
              <label className="text-[0.72rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5 block">State Issued</label>
              <select className="w-full py-[13px] px-4 pr-9 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.85rem] font-medium text-[#64748B] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M6%208L1%203h10z%22%20fill%3D%22%2394A3B8%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
                <option value="">Select state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="IL">Illinois</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
            </div>

            {/* License Number */}
            <div>
              <label className="text-[0.72rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5 block">License Number</label>
              <input type="text" placeholder="Enter license number" className="w-full py-[13px] px-4 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all placeholder:text-[#CBD5E1] placeholder:font-normal" />
            </div>

            {/* Dates Row */}
            <div className="flex gap-2.5">
              <div className="flex-1">
                <label className="text-[0.72rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5 block">Issue Date</label>
                <input type="text" placeholder="MM/DD/YYYY" className="w-full py-[13px] px-4 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all placeholder:text-[#CBD5E1] placeholder:font-normal" />
              </div>
              <div className="flex-1">
                <label className="text-[0.72rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5 block">Expiration Date</label>
                <input type="text" placeholder="MM/DD/YYYY" className="w-full py-[13px] px-4 bg-white border-[1.5px] border-[#E2E8F0] rounded-xl text-[0.88rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:ring-[3px] focus:ring-[#0A1628]/8 transition-all placeholder:text-[#CBD5E1] placeholder:font-normal" />
              </div>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#EFF4FF] border border-[#0A1628]/10 rounded-xl">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
          <span className="text-[0.78rem] text-[#0A1628] font-medium leading-relaxed">This information is used only for IRS identity verification and is not stored beyond the filing process.</span>
        </div>

        {/* Continue Button */}
        <div className="pt-2">
          <Link href="/tax-filing/income-checklist" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Continue
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
