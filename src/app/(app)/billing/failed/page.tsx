'use client'

import { useState } from 'react'
import Link from 'next/link'

const possibleReasons = [
  {
    title: 'Insufficient funds',
    body: 'Your account may not have enough balance to cover the $49.00 charge. Check with your bank.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    icon: (
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
      </svg>
    ),
  },
  {
    title: 'Card expired',
    body: 'If your card has been replaced or expired, update your payment method to continue.',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-[#E63946]',
    icon: (
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Bank security hold',
    body: 'Your bank may have flagged the transaction for security. Contact them to authorize it.',
    iconBg: 'bg-[#2563EB]/10',
    iconColor: 'text-[#2563EB]',
    icon: (
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

export default function PaymentFailedPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Payment Issue</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        {/* Red Alert Card */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-3.5 animate-pulse">
            <svg className="h-[22px] w-[22px] text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="text-base font-bold text-[#E63946] mb-1.5">Your payment of $49.00 was declined</div>
          <div className="text-xs text-[#E63946]/80">Transaction attempted on March 15, 2026</div>
        </div>

        {/* Card Info */}
        <div className="bg-white border border-[#F0F0F5] rounded-[14px] p-4 flex items-center gap-3.5">
          <div className="w-11 h-[30px] bg-[#F0F0F5] rounded-md flex items-center justify-center">
            <span className="text-[0.7rem] font-bold text-[#1A1A2E]/90 tracking-wide">VISA</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A1A2E]">Visa ending in 4242</div>
            <div className="text-xs text-[#8585A0] mt-0.5">Expires 08/28</div>
          </div>
          <div className="px-2.5 py-1 bg-red-500/10 rounded-full text-[0.65rem] font-semibold text-[#E63946]">
            Declined
          </div>
        </div>

        {/* Possible Reasons */}
        <div>
          <div className="text-xs font-bold text-[#8585A0] uppercase tracking-wider mb-3">Possible reasons</div>
          <div className="flex flex-col gap-2">
            {possibleReasons.map((r, i) => (
              <div key={r.title} className="bg-white border border-[#F0F0F5] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#FAFAFF] transition-colors"
                >
                  <div className={`w-7 h-7 rounded-lg ${r.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <span className={r.iconColor}>{r.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#1A1A2E] flex-1">{r.title}</span>
                  <svg className={`h-3 w-3 text-[#8585A0] transition-transform ${openAccordion === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openAccordion === i && (
                  <div className="px-4 pb-3.5">
                    <p className="text-xs text-[#5C5C7A] leading-relaxed">{r.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What to Do */}
        <div>
          <div className="text-xs font-bold text-[#8585A0] uppercase tracking-wider mb-3">What to do</div>
          <div className="flex flex-col gap-2.5">
            <button className="w-full py-3.5 bg-[#00A651] text-white rounded-full text-sm font-semibold hover:bg-[#008C44] transition-colors flex items-center justify-center gap-1.5">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Try Again
            </button>
            <Link
              href="/billing/add-payment"
              className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-transparent text-[#1A1A2E] border border-[#D5D5E0] rounded-full text-sm font-semibold hover:border-white transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              Use Different Card
            </Link>
            <div className="text-center">
              <a href="#" className="text-xs font-semibold text-[#2563EB]">
                <span className="mr-1">&#128222;</span> Contact your bank
              </a>
            </div>
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-amber-500/10 border border-amber-500/15 border-l-4 border-l-amber-500 rounded-lg px-4 py-3.5 flex gap-2.5 items-start">
          <svg className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-amber-300/90 leading-relaxed font-medium">
            Your account will be downgraded if payment isn&apos;t resolved within <strong className="font-bold">7 days</strong>.
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center pt-1">
          <a href="#" className="text-xs text-[#8585A0] font-medium">
            Need help? <span className="text-[#2563EB] font-semibold">Contact support</span>
          </a>
        </div>
      </div>
    </div>
  )
}
