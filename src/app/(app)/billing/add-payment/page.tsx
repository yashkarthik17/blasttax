'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AddPaymentPage() {
  const [setDefault, setSetDefault] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing/payment-methods" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Add Card</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Card Preview */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-5 relative overflow-hidden" style={{ aspectRatio: '1.586' }}>
          <div className="absolute -top-[30%] -right-[20%] w-[200px] h-[200px] rounded-full bg-[#2563EB]/[0.08]" />
          <div className="absolute -bottom-[40%] -left-[10%] w-[180px] h-[180px] rounded-full bg-[#2563EB]/[0.05]" />

          <div className="flex flex-col justify-between h-full relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-9 h-7 rounded-[5px] bg-gradient-to-br from-yellow-500 via-yellow-300 to-yellow-500" />
              <svg className="h-[18px] w-[18px] text-[#1A1A2E]/40 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-[#1A1A2E] tracking-[0.15em] mb-3.5 font-mono">4242  4242  4242  4242</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.5625rem] text-[#1A1A2E]/45 uppercase tracking-wider mb-0.5">Card Holder</p>
                  <p className="text-sm font-semibold text-[#1A1A2E] tracking-wide">JANE DOE</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.5625rem] text-[#1A1A2E]/45 uppercase tracking-wider mb-0.5">Expires</p>
                  <p className="text-sm font-semibold text-[#1A1A2E]">08/28</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-[#1A1A2E]/50 tracking-wide">VISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-xs font-semibold text-[#8585A0] uppercase tracking-wide mb-1.5">Card Number</label>
          <div className="relative">
            <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-3.5 py-3 pr-11 bg-white border border-[#F0F0F5] rounded-xl text-sm text-[#1A1A2E] tracking-wider placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
        </div>

        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-[#8585A0] uppercase tracking-wide mb-1.5">Expiry Date</label>
            <input type="text" placeholder="MM/YY" maxLength={5} className="w-full px-3.5 py-3 bg-white border border-[#F0F0F5] rounded-xl text-sm text-[#1A1A2E] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#8585A0] uppercase tracking-wide mb-1.5">CVV</label>
            <div className="relative">
              <input type="text" placeholder="123" maxLength={4} className="w-full px-3.5 py-3 bg-white border border-[#F0F0F5] rounded-xl text-sm text-[#1A1A2E] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-xs font-semibold text-[#8585A0] uppercase tracking-wide mb-1.5">Cardholder Name</label>
          <input type="text" placeholder="Jane Doe" className="w-full px-3.5 py-3 bg-white border border-[#F0F0F5] rounded-xl text-sm text-[#1A1A2E] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
        </div>

        {/* Set as Default Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer py-1">
          <button
            type="button"
            onClick={() => setSetDefault(!setDefault)}
            className={`w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${setDefault ? 'bg-[#2563EB] border-blue-500' : 'bg-white border-2 border-[#D5D5E0]'}`}
          >
            {setDefault && (
              <svg className="h-3 w-3 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <span className="text-sm text-[#1A1A2E] font-medium">Set as default payment method</span>
        </label>

        {/* Add Card Button */}
        <div className="mt-1">
          <Link
            href="/billing/payment-methods"
            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#1A1A2E] rounded-full text-[0.9375rem] font-bold hover:bg-[#D5D5E0] transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Card
          </Link>
        </div>

        {/* Security Badges */}
        <div>
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#F0F0F5]">
              <span className="text-sm font-bold text-violet-400">S</span>
              <span className="text-[0.6875rem] font-semibold text-[#8585A0]">Stripe</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#F0F0F5]">
              <svg className="h-3 w-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-[0.6875rem] font-semibold text-[#8585A0]">PCI</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-[#F0F0F5]">
              <svg className="h-3 w-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-[0.6875rem] font-semibold text-[#8585A0]">SSL</span>
            </div>
          </div>
          <p className="text-center text-[0.6875rem] text-[#8585A0] leading-snug">
            Your card details are encrypted end-to-end<br />and never touch our servers
          </p>
        </div>
      </div>
    </div>
  )
}
