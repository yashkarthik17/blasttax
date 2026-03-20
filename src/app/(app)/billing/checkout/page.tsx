'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [sameAddress, setSameAddress] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing/plans" className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#0A1628]">Checkout</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Order Summary */}
        <div className="bg-white border border-[#F1F5F9] rounded-2xl p-[18px]">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <p className="text-[0.9375rem] font-bold text-[#0A1628]">Pro Plan</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">Monthly subscription</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
              <svg className="h-4 w-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
          </div>
          <div className="border-t border-[#F1F5F9] pt-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm text-[#94A3B8]">Subtotal</span>
              <span className="text-sm font-semibold text-[#0A1628]">$49.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#94A3B8]">Tax</span>
              <span className="text-sm font-semibold text-[#0A1628]">$0.00</span>
            </div>
            <div className="border-t border-dashed border-[#E2E8F0] pt-2 mt-2 flex justify-between">
              <span className="text-sm font-bold text-[#0A1628]">Total</span>
              <span className="text-sm font-extrabold text-[#0A1628]">$49.00</span>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-1 px-3.5 py-3 bg-white border border-[#F1F5F9] rounded-xl text-sm text-[#0A1628] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors"
          />
          <button className="px-4.5 py-3 bg-white text-[#0A1628] rounded-xl text-sm font-semibold hover:bg-[#E2E8F0] transition-colors whitespace-nowrap">
            Apply
          </button>
        </div>

        {/* Card Details */}
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <span className="text-sm font-bold text-[#0A1628]">Card Details</span>
          </div>

          <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">Card Number</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[1, 2, 3, 4].map((n) => (
              <input key={n} type="text" placeholder="4242" maxLength={4} className="w-full px-2 py-3 bg-white border border-[#F1F5F9] rounded-xl text-sm text-[#0A1628] text-center tracking-wider placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">Expiry</label>
              <input type="text" placeholder="MM/YY" maxLength={5} className="w-full px-3.5 py-3 bg-white border border-[#F1F5F9] rounded-xl text-sm text-[#0A1628] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">CVV</label>
              <input type="text" placeholder="123" maxLength={4} className="w-full px-3.5 py-3 bg-white border border-[#F1F5F9] rounded-xl text-sm text-[#0A1628] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
            </div>
          </div>

          <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">Cardholder Name</label>
          <input type="text" placeholder="Jane Doe" className="w-full px-3.5 py-3 bg-white border border-[#F1F5F9] rounded-xl text-sm text-[#0A1628] placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition-colors" />
        </div>

        {/* Billing Address */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-sm font-bold text-[#0A1628]">Billing Address</span>
          </div>

          <label className="flex items-center gap-2.5 mb-3.5 cursor-pointer" onClick={() => setSameAddress(!sameAddress)}>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${sameAddress ? 'bg-[#2563EB]' : 'bg-[#F1F5F9] border border-[#E2E8F0]'}`}>
              {sameAddress && (
                <svg className="h-2.5 w-2.5 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#0A1628] font-medium">Same as account address</span>
          </label>

          <div className="px-3.5 py-3 bg-white border border-[#F1F5F9] rounded-xl">
            <p className="text-sm text-[#94A3B8]">123 Main Street, Apt 4B</p>
            <p className="text-sm text-[#94A3B8]">New York, NY 10001</p>
          </div>
        </div>

        {/* Security Reassurance */}
        <div className="flex items-center justify-center gap-2 py-2.5 bg-[#00A651]/10 rounded-[10px]">
          <svg className="h-3 w-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className="text-xs font-semibold text-[#00A651]">256-bit SSL encrypted &middot; Secured by Stripe</span>
        </div>

        {/* Pay Button */}
        <Link
          href="/billing/processing"
          className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#0A1628] rounded-full text-[0.9375rem] font-bold hover:bg-[#E2E8F0] transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Pay $49.00
        </Link>

        {/* Terms Footer */}
        <div className="text-center">
          <p className="text-[0.6875rem] text-[#94A3B8] leading-relaxed">
            By proceeding, you agree to our{' '}
            <Link href="#" className="text-[#2563EB] font-semibold">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
