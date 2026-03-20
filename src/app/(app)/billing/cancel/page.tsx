'use client'

import { useState } from 'react'
import Link from 'next/link'

const lostFeatures = ['Expert consultation', 'IRS representation', 'Priority support', 'Unlimited analyses']

const reasons = [
  { icon: '$', label: 'Too expensive' },
  { icon: '⇄', label: 'Found another service' },
  { icon: '✓', label: 'Issue resolved' },
  { icon: '⧉', label: 'Missing features' },
  { icon: '⏸', label: 'Just taking a break' },
]

export default function CancelSubscriptionPage() {
  const [selectedReason, setSelectedReason] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#0A1628]">Cancel Subscription</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        {/* Warning Card */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-[14px] p-4 flex gap-3 items-start">
          <div className="w-9 h-9 rounded-[10px] bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-amber-300 leading-snug">You&apos;ll lose access to Pro features on April 15, 2026</div>
            <div className="text-xs text-amber-400/80 mt-1 leading-relaxed">Your current billing cycle continues until then.</div>
          </div>
        </div>

        {/* What You'll Lose */}
        <div>
          <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">What you&apos;ll lose</div>
          <div className="flex flex-col gap-2.5">
            {lostFeatures.map((f) => (
              <div key={f} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-[#F1F5F9]">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-3 w-3 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm text-[#0A1628] font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why are you leaving? */}
        <div>
          <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Why are you leaving?</div>
          <div className="flex flex-col gap-2">
            {reasons.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setSelectedReason(i)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] border transition-colors text-left ${
                  selectedReason === i
                    ? 'bg-[#2563EB]/10 border-blue-500'
                    : 'bg-white border-[#F1F5F9] hover:border-[#E2E8F0]'
                }`}
              >
                <span className="text-sm text-[#64748B] w-[18px] text-center">{r.icon}</span>
                <span className="text-sm text-[#0A1628] font-medium flex-1">{r.label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedReason === i ? 'border-blue-500 bg-[#2563EB]' : 'border-[#E2E8F0]'
                }`}>
                  {selectedReason === i && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Retention Offer */}
        <div className="bg-[#2563EB]/10 border-[1.5px] border-blue-500 rounded-2xl p-[18px] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500" />
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <svg className="h-3 w-3 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wide">Special Offer</span>
          </div>
          <div className="text-sm font-bold text-[#0A1628] leading-snug mb-1">Stay on Pro and get 30% off your next 3 months</div>
          <div className="text-sm text-[#64748B] mb-3.5">
            <span className="text-lg font-extrabold text-[#2563EB]">$34.30</span>
            <span className="font-medium">/mo instead of $49.00</span>
          </div>
          <button className="w-full py-3 bg-transparent text-[#2563EB] border border-blue-500 rounded-full text-sm font-semibold hover:bg-[#1D4ED8] hover:text-white transition-colors">
            <span className="mr-1">&#127991;</span> Accept Offer
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <Link
            href="/billing/cancelled"
            className="w-full flex items-center justify-center py-3.5 bg-transparent text-[#E63946] border border-red-500 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-[#0A1628] transition-colors"
          >
            Continue Cancellation
          </Link>
          <Link
            href="/billing"
            className="w-full flex items-center justify-center gap-1 py-3.5 bg-[#00A651] text-white rounded-full text-sm font-semibold hover:bg-[#008C44] transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Keep My Plan
          </Link>
        </div>
      </div>
    </div>
  )
}
