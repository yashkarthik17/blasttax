'use client'

import { useState } from 'react'
import Link from 'next/link'

const starterFeatures = ['Full analysis', 'Form generation', 'AI chat', 'Email support']
const proFeatures = ['Everything in Starter', 'Expert consultation', 'IRS representation', 'Priority support', 'Unlimited analyses']
const enterpriseFeatures = ['Bulk client management', 'API access', 'Dedicated account manager']

const comparisonRows = [
  { label: 'Analyses/mo', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Form generation', starter: true, pro: true, enterprise: true },
  { label: 'Expert consult', starter: false, pro: true, enterprise: true },
  { label: 'IRS representation', starter: false, pro: true, enterprise: true },
]

export default function PlansPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [showComparison, setShowComparison] = useState(false)

  const starterPrice = billing === 'monthly' ? '$19' : '$15'
  const proPrice = billing === 'monthly' ? '$49' : '$39'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-white">Plans</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-[18px]">
        {/* Billing Toggle */}
        <div className="flex bg-zinc-800/60 rounded-xl p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`flex-1 py-2.5 px-4 rounded-[10px] text-xs font-semibold transition-all ${billing === 'monthly' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`flex-1 py-2.5 px-4 rounded-[10px] text-xs font-semibold transition-all flex items-center justify-center gap-1 ${billing === 'annual' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500'}`}
          >
            Annual
            <span className="px-1.5 py-0.5 bg-green-500/10 rounded-full text-[0.58rem] font-bold text-green-400">Save 20%</span>
          </button>
        </div>

        {/* Starter Plan */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="text-[0.68rem] font-semibold text-zinc-500 uppercase tracking-wide mb-1">Starter</div>
          <div className="flex items-baseline gap-1 mb-3.5">
            <span className="text-2xl font-black text-white">{starterPrice}</span>
            <span className="text-sm text-zinc-500 font-medium">/mo</span>
          </div>
          <div className="flex flex-col gap-2">
            {starterFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <svg className="h-3 w-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-zinc-400 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan (Recommended) */}
        <div className="bg-zinc-900 border-2 border-white/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white" />
          <div className="flex items-center justify-between mb-1">
            <div className="text-[0.68rem] font-semibold text-white uppercase tracking-wide">Pro</div>
            <span className="px-2.5 py-1 bg-white rounded-full text-[0.6rem] font-bold text-zinc-900">RECOMMENDED</span>
          </div>
          <div className="flex items-baseline gap-1 mb-3.5">
            <span className="text-2xl font-black text-white">{proPrice}</span>
            <span className="text-sm text-zinc-500 font-medium">/mo</span>
          </div>
          <div className="flex flex-col gap-2">
            {proFeatures.map((f, i) => (
              <div key={f} className="flex items-center gap-2">
                <svg className={`h-3 w-3 flex-shrink-0 ${i === 0 ? 'text-green-400' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className={`text-xs font-medium ${i === 0 ? 'text-zinc-400' : 'text-white font-semibold'}`}>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3.5 px-3 py-2 bg-white/5 rounded-[10px]">
            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold text-white">Your current plan</span>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-2xl p-5">
          <div className="text-[0.68rem] font-semibold text-zinc-400 uppercase tracking-wide mb-1">Enterprise</div>
          <div className="flex items-baseline gap-1 mb-3.5">
            <span className="text-2xl font-black text-zinc-900">Custom</span>
          </div>
          <div className="text-xs text-zinc-500 font-medium mb-3.5">For tax professionals</div>
          <div className="flex flex-col gap-2">
            {enterpriseFeatures.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <svg className="h-3 w-3 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-zinc-600 font-medium">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-zinc-100 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors">
            Contact Sales
          </button>
        </div>

        {/* Feature Comparison */}
        <div>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-[14px] transition-colors"
          >
            <span className="text-sm font-bold text-white">Feature Comparison</span>
            <svg className={`h-3 w-3 text-zinc-500 transition-transform ${showComparison ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {showComparison && (
            <div className="bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-[14px] px-4 py-2 -mt-1">
              {/* Header */}
              <div className="grid grid-cols-4 items-center py-2 border-b-2 border-zinc-800">
                <div className="text-[0.65rem] font-semibold text-zinc-600 uppercase tracking-wide">Feature</div>
                <div className="text-center text-[0.65rem] font-semibold text-zinc-600 uppercase tracking-wide">Starter</div>
                <div className="text-center text-[0.65rem] font-bold text-white uppercase tracking-wide">Pro</div>
                <div className="text-center text-[0.65rem] font-semibold text-zinc-600 uppercase tracking-wide">Enter.</div>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.label} className="grid grid-cols-4 items-center py-2.5 border-b border-zinc-800/50 last:border-0">
                  <div className="text-xs font-semibold text-zinc-400">{row.label}</div>
                  {[row.starter, row.pro, row.enterprise].map((val, i) => (
                    <div key={i} className="text-center text-xs font-semibold text-white">
                      {typeof val === 'boolean' ? (
                        val ? (
                          <svg className="h-3 w-3 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="h-3 w-3 text-zinc-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        )
                      ) : (
                        <span>{val}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade CTA */}
        <div className="pt-1">
          <Link
            href="/billing/upgrade"
            className="w-full flex items-center justify-center gap-2 py-4 px-7 bg-green-600 text-white rounded-full text-[0.92rem] font-bold hover:bg-green-700 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            Upgrade to Pro
          </Link>
        </div>

        {/* Trial note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 rounded-full">
            <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs font-semibold text-zinc-400">All plans include 7-day free trial</span>
          </div>
        </div>
      </div>
    </div>
  )
}
