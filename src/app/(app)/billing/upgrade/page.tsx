'use client'

import Link from 'next/link'

const benefits = [
  'Unlimited tax analyses per month',
  '1-on-1 expert consultations',
  'IRS representation & advocacy',
  'Priority 24/7 support',
  'Advanced form generation & e-file',
]

export default function UpgradePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing/plans" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Confirm Upgrade</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Plan Comparison Card */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-5">
          <div className="flex items-center justify-center gap-4">
            {/* Current Plan */}
            <div className="flex-1 text-center py-3.5 px-2 bg-[#F0F0F5] rounded-[14px] border border-[#D5D5E0]">
              <div className="w-9 h-9 rounded-[10px] bg-[#D5D5E0] flex items-center justify-center mx-auto mb-2">
                <svg className="h-3.5 w-3.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-[0.6875rem] font-semibold text-[#8585A0] uppercase tracking-wide mb-0.5">Current</p>
              <p className="text-[0.9375rem] font-extrabold text-[#1A1A2E]">Free</p>
              <p className="text-xs text-[#8585A0] mt-0.5">$0/mo</p>
            </div>

            {/* Arrow */}
            <div className="w-9 h-9 rounded-full bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
              <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* New Plan */}
            <div className="flex-1 text-center py-3.5 px-2 bg-[#2563EB]/10 rounded-[14px] border border-blue-500">
              <div className="w-9 h-9 rounded-[10px] bg-[#2563EB] flex items-center justify-center mx-auto mb-2">
                <svg className="h-3.5 w-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <p className="text-[0.6875rem] font-semibold text-[#2563EB] uppercase tracking-wide mb-0.5">New</p>
              <p className="text-[0.9375rem] font-extrabold text-[#1A1A2E]">Pro</p>
              <p className="text-xs text-[#2563EB] font-semibold mt-0.5">$49/mo</p>
            </div>
          </div>
        </div>

        {/* What You're Getting */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-[18px]">
          <p className="text-sm font-bold text-[#1A1A2E] mb-3.5">What you&apos;re getting</p>
          <div className="flex flex-col gap-2.5">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2.5">
                <div className="w-[22px] h-[22px] rounded-full bg-[#00A651]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="h-2.5 w-2.5 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-[#1A1A2E] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-[18px]">
          <p className="text-sm font-bold text-[#1A1A2E] mb-3">Price Breakdown</p>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xl font-extrabold text-[#8585A0] line-through">$0</span>
            <svg className="h-3 w-3 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span className="text-xl font-extrabold text-[#1A1A2E]">$49</span>
            <span className="text-sm text-[#8585A0] font-medium">/month</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#00A651]/10 rounded-lg">
            <svg className="h-3 w-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span className="text-xs font-semibold text-[#00A651]">First 7 days free — cancel anytime</span>
          </div>
        </div>

        {/* Billing Info Summary */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl px-[18px] py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded-md bg-white flex items-center justify-center">
                <span className="text-[0.625rem] font-extrabold text-[#1A1A2E] tracking-wide">VISA</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">Visa ending 4242</p>
                <p className="text-[0.6875rem] text-[#8585A0]">Exp 08/28</p>
              </div>
            </div>
            <Link href="/billing/payment-methods" className="text-xs font-semibold text-[#2563EB]">Change</Link>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-1">
          <Link
            href="/billing/success"
            className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#1A1A2E] rounded-full text-[0.9375rem] font-bold hover:bg-[#D5D5E0] transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Start 7-Day Free Trial
          </Link>
        </div>

        {/* Reassurance */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full">
            <svg className="h-3 w-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs font-semibold text-[#5C5C7A]">Cancel anytime during trial — no charge</span>
          </div>
        </div>
      </div>
    </div>
  )
}
