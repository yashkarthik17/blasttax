'use client'

import { useState } from 'react'
import Link from 'next/link'

const agreementDetails = [
  { label: 'Started', value: 'Jan 15, 2026' },
  { label: 'Next payment', value: 'Apr 15, 2026' },
  { label: 'Amount', value: '$49.00', suffix: '/month' },
]

const terms = [
  {
    title: 'Cancellation Policy',
    body: 'You may cancel your subscription at any time. Your access will continue until the end of your current billing period. No partial refunds for the remaining billing period.',
  },
  {
    title: 'Refund Policy',
    body: 'Full refund available within the first 7 days (trial period). After trial, refunds may be issued on a case-by-case basis within 30 days of charge.',
  },
  {
    title: 'Auto-Renewal Terms',
    body: "Your subscription renews automatically each billing period. We'll notify you 3 days before renewal. Price changes will be communicated at least 30 days in advance.",
  },
]

export default function AgreementsPage() {
  const [showTerms, setShowTerms] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-white">Payment Agreements</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-[18px]">
        {/* Active Agreement Card */}
        <div className="bg-zinc-900 border-2 border-white/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white" />

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-extrabold text-white">Pro Plan</div>
              <div className="text-xs text-zinc-500 font-medium mt-0.5">Monthly</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full text-[0.68rem] font-bold text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active
            </div>
          </div>

          <div className="bg-white/5 rounded-[14px] px-4 border border-white/[0.08]">
            {agreementDetails.map((d, i) => (
              <div key={d.label} className={`flex items-center justify-between py-3 ${i < agreementDetails.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                <span className="text-xs text-zinc-500 font-medium">{d.label}</span>
                <span className="text-sm text-white font-semibold">
                  {d.value}
                  {d.suffix && <span className="font-medium text-zinc-500">{d.suffix}</span>}
                </span>
              </div>
            ))}
            {/* Payment method row */}
            <div className="flex items-center justify-between py-3 border-t border-zinc-800/50">
              <span className="text-xs text-zinc-500 font-medium">Payment method</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.7rem] font-bold text-blue-300">VISA</span>
                <span className="text-sm text-white font-semibold">**** 4242</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/billing/cancel" className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">
              Cancel Plan
            </Link>
          </div>
        </div>

        {/* Agreement Terms */}
        <div>
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-[14px] hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-blue-500/10 flex items-center justify-center">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-white">Agreement Terms</span>
            </div>
            <svg className={`h-3 w-3 text-zinc-500 transition-transform ${showTerms ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {showTerms && (
            <div className="bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-[14px] px-4 py-3.5 -mt-1">
              {terms.map((t, i) => (
                <div key={t.title} className={`py-2.5 ${i < terms.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                  <div className="text-xs font-bold text-white mb-1">{t.title}</div>
                  <div className="text-[0.74rem] text-zinc-500 leading-relaxed">{t.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Download Agreement PDF */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-900 border border-zinc-800 rounded-[14px] text-sm font-semibold text-white hover:border-zinc-600 transition-colors">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Agreement PDF
        </button>

        {/* Past Agreements */}
        <div>
          <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-3 px-1">Past Agreements</div>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">Starter Plan</div>
                <div className="text-[0.68rem] text-zinc-500 mt-0.5">Oct 15, 2025 - Jan 14, 2026</div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xs font-semibold text-white">$19/mo</span>
                <span className="px-2 py-0.5 bg-zinc-800 rounded-full text-[0.6rem] font-semibold text-zinc-500">Ended</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
