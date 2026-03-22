'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PaymentMethodsPage() {
  const [autoRenew, setAutoRenew] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Payment Methods</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Section Label */}
        <p className="text-[0.6875rem] font-bold text-[#8585A0] uppercase tracking-wide">Your Cards</p>

        {/* Default Card */}
        <div className="bg-white border border-blue-500 rounded-2xl px-[18px] py-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-[34px] rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-[0.6875rem] font-extrabold text-[#1A1A2E] tracking-wide">VISA</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold text-[#1A1A2E]">Visa ending 4242</p>
                <span className="px-2 py-0.5 bg-[#2563EB]/10 rounded-full text-[0.625rem] font-bold text-[#2563EB]">Default</span>
              </div>
              <p className="text-xs text-[#8585A0] font-medium">Expires 08/28</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button className="w-8 h-8 rounded-lg bg-[#F0F0F5] flex items-center justify-center hover:bg-[#D5D5E0] transition-colors">
                <svg className="h-3 w-3 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                <svg className="h-3 w-3 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Add New Payment Method */}
        <Link
          href="/billing/add-payment"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white border border-dashed border-[#D5D5E0] rounded-[14px] hover:border-blue-500 hover:bg-[#1D4ED8]/5 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
            <svg className="h-3 w-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#2563EB]">Add new payment method</span>
        </Link>

        {/* Divider */}
        <div className="h-px bg-[#F0F0F5] my-1" />

        {/* Autopay Settings */}
        <div>
          <p className="text-[0.6875rem] font-bold text-[#8585A0] uppercase tracking-wide mb-3.5">Autopay Settings</p>

          <div className="bg-white border border-[#F0F0F5] rounded-2xl px-[18px] py-4">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A2E]">Auto-renew subscription</p>
                <p className="text-xs text-[#8585A0] mt-0.5">Automatically renew at end of period</p>
              </div>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${autoRenew ? 'bg-[#00A651]' : 'bg-[#D5D5E0]'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-transform ${autoRenew ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="px-3.5 py-2.5 bg-[#F0F0F5] rounded-[10px] border border-[#D5D5E0]">
              <div className="flex items-center gap-2">
                <svg className="h-3 w-3 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-sm text-[#5C5C7A] font-medium">
                  Your card will be charged <strong className="text-[#1A1A2E] font-bold">$49.00</strong> on <strong className="text-[#1A1A2E] font-bold">April 15, 2026</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="flex gap-3 p-3.5 bg-[#2563EB]/10 rounded-xl border-l-4 border-blue-500">
          <svg className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[#2563EB] mb-0.5">Secure payment storage</p>
            <p className="text-xs text-[#2563EB]/80 leading-relaxed">Your payment info is securely stored and processed by Stripe. BlastTax never stores your full card number.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
