'use client'

import { useState } from 'react'
import Link from 'next/link'

const payments = [
  { name: 'Pro Plan — Monthly', date: 'Mar 15, 2026', amount: '$49.00', status: 'Paid', icon: 'check', iconBg: 'bg-green-50', iconColor: 'text-green-600', badgeBg: 'bg-green-50', badgeColor: 'text-green-600' },
  { name: 'Pro Plan — Monthly', date: 'Feb 15, 2026', amount: '$49.00', status: 'Paid', icon: 'check', iconBg: 'bg-green-50', iconColor: 'text-green-600', badgeBg: 'bg-green-50', badgeColor: 'text-green-600' },
  { name: 'Pro Plan — Monthly', date: 'Jan 15, 2026', amount: '$49.00', status: 'Paid', icon: 'check', iconBg: 'bg-green-50', iconColor: 'text-green-600', badgeBg: 'bg-green-50', badgeColor: 'text-green-600' },
  { name: 'Pro Plan — Monthly', date: 'Apr 15, 2026', amount: '$49.00', status: 'Pending', icon: 'clock', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', badgeBg: 'bg-amber-50', badgeColor: 'text-amber-600' },
]

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function BillingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <h1 className="text-xl font-extrabold text-[#0A1628]">Billing</h1>
        <Link href="/account/settings" className="w-9 h-9 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        {/* Current Plan Card */}
        <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white" />
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="text-[0.7rem] font-semibold text-[#94A3B8] uppercase tracking-wide">Current Plan</div>
              <div className="text-xl font-extrabold text-[#0A1628] mt-0.5">Pro Plan</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00A651]/10 rounded-full text-[0.68rem] font-bold text-[#00A651]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active
            </div>
          </div>
          <div className="flex items-baseline gap-1 mb-2.5">
            <span className="text-3xl font-black text-[#0A1628]">$49</span>
            <span className="text-sm text-[#94A3B8] font-medium">/month</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-medium">
            <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Next billing: April 15, 2026
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="flex gap-2.5">
          <div className="flex-1 bg-white border border-[#F1F5F9] rounded-[14px] p-3.5 text-center">
            <div className="text-[0.65rem] font-semibold text-[#94A3B8] uppercase tracking-wide">Total Paid</div>
            <div className="text-lg font-extrabold text-[#0A1628] mt-1">$294</div>
          </div>
          <div className="flex-1 bg-white border border-[#F1F5F9] rounded-[14px] p-3.5 text-center">
            <div className="text-[0.65rem] font-semibold text-[#94A3B8] uppercase tracking-wide">Upcoming</div>
            <div className="text-lg font-extrabold text-[#2563EB] mt-1">$49</div>
          </div>
          <div className="flex-1 bg-white border border-[#F1F5F9] rounded-[14px] p-3.5 text-center">
            <div className="text-[0.65rem] font-semibold text-[#94A3B8] uppercase tracking-wide">Method</div>
            <div className="text-lg font-extrabold text-[#0A1628] mt-1">
              <span className="text-[#1A1F71]">VISA</span>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div>
          <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 px-1">Payment History</div>
          <div className="bg-white rounded-2xl border border-[#F1F5F9] px-4">
            {payments.map((p, i) => (
              <div key={i} className={`flex items-center gap-3 py-3.5 ${i < payments.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${p.status === 'Paid' ? 'bg-[#00A651]/10' : 'bg-amber-500/10'}`}>
                  {p.status === 'Paid' ? (
                    <span className="text-[#00A651]"><CheckIcon /></span>
                  ) : (
                    <span className="text-amber-400"><ClockIcon /></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#0A1628]">{p.name}</div>
                  <div className="text-[0.68rem] text-[#94A3B8] mt-0.5">{p.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#0A1628]">{p.amount}</div>
                  <div className={`inline-flex px-2 py-0.5 rounded-full text-[0.6rem] font-semibold mt-0.5 ${p.status === 'Paid' ? 'bg-[#00A651]/10 text-[#00A651]' : 'bg-amber-500/10 text-amber-400'}`}>
                    {p.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-3 px-1">Payment Method</div>
          <div className="bg-white rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="text-2xl font-bold text-[#0A1628]/90 tracking-wide">VISA</span>
              <div className="flex gap-0.5">
                <div className="w-6 h-4 rounded-full bg-[#E2E8F0]" />
                <div className="w-6 h-4 rounded-full bg-[#F1F5F9] -ml-2.5" />
              </div>
            </div>
            <div className="text-base font-semibold tracking-[0.15em] mb-4 relative z-10 text-[#0A1628]">
              <span className="opacity-50">****</span>
              <span className="opacity-50 ml-2">****</span>
              <span className="opacity-50 ml-2">****</span>
              <span className="ml-2">4242</span>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="text-[0.58rem] text-[#0A1628]/50 uppercase tracking-wide">Card Holder</div>
                <div className="text-xs font-semibold text-[#0A1628] mt-0.5">Jane Doe</div>
              </div>
              <div>
                <div className="text-[0.58rem] text-[#0A1628]/50 uppercase tracking-wide">Expires</div>
                <div className="text-xs font-semibold text-[#0A1628] mt-0.5">08/28</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <Link href="/billing/payment-methods" className="text-xs font-semibold text-[#2563EB]">
              Change payment method
            </Link>
          </div>
        </div>

        {/* View Plans Button */}
        <div className="pt-1">
          <Link
            href="/billing/plans"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-7 bg-white text-[#0A1628] border border-[#E2E8F0] rounded-full text-sm font-semibold hover:border-white/40 transition-colors"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            View Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
