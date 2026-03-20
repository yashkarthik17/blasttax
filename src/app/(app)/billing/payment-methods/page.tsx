'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PaymentMethodsPage() {
  const [autoRenew, setAutoRenew] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-white">Payment Methods</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Section Label */}
        <p className="text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-wide">Your Cards</p>

        {/* Default Card */}
        <div className="bg-zinc-900 border border-blue-500 rounded-2xl px-[18px] py-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-[34px] rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-[0.6875rem] font-extrabold text-zinc-900 tracking-wide">VISA</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold text-white">Visa ending 4242</p>
                <span className="px-2 py-0.5 bg-blue-500/10 rounded-full text-[0.625rem] font-bold text-blue-400">Default</span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">Expires 08/28</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                <svg className="h-3 w-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                <svg className="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Add New Payment Method */}
        <Link
          href="/billing/add-payment"
          className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-zinc-900 border border-dashed border-zinc-700 rounded-[14px] hover:border-blue-500 hover:bg-blue-500/5 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-blue-400">Add new payment method</span>
        </Link>

        {/* Divider */}
        <div className="h-px bg-zinc-800 my-1" />

        {/* Autopay Settings */}
        <div>
          <p className="text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-wide mb-3.5">Autopay Settings</p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-[18px] py-4">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Auto-renew subscription</p>
                <p className="text-xs text-zinc-500 mt-0.5">Automatically renew at end of period</p>
              </div>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${autoRenew ? 'bg-green-500' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-transform ${autoRenew ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="px-3.5 py-2.5 bg-zinc-800 rounded-[10px] border border-zinc-700">
              <div className="flex items-center gap-2">
                <svg className="h-3 w-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-sm text-zinc-400 font-medium">
                  Your card will be charged <strong className="text-white font-bold">$49.00</strong> on <strong className="text-white font-bold">April 15, 2026</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="flex gap-3 p-3.5 bg-blue-500/10 rounded-xl border-l-4 border-blue-500">
          <svg className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-300 mb-0.5">Secure payment storage</p>
            <p className="text-xs text-blue-400/80 leading-relaxed">Your payment info is securely stored and processed by Stripe. BlastTax never stores your full card number.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
