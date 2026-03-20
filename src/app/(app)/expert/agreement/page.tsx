'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ExpertAgreementPage() {
  const [termsAccepted, setTermsAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/pending" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F1F5F9]">
            <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Expert Agreement</h1>
          <div className="w-10" />
        </div>

        <div className="px-5 pb-10 space-y-[18px]">
          {/* Expert Matched Card */}
          <div className="bg-[#0A1628] rounded-[20px] p-5 relative overflow-hidden">
            <div className="absolute -top-[30px] -right-[30px] w-[100px] h-[100px] rounded-full bg-white/[0.08]" />
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/30 shrink-0">
                <span className="text-[1.2rem] font-extrabold text-white">MC</span>
              </div>
              <div className="flex-1">
                <div className="text-base font-extrabold text-white mb-0.5">Michael Chen, EA</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-[#FCD34D]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-white/90">4.9</span>
                  </div>
                  <span className="text-[0.72rem] text-white/70">15 years</span>
                  <span className="px-2 py-0.5 bg-white/15 rounded-full text-[0.65rem] font-bold text-white">OIC Specialist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Terms */}
          <div className="text-[1.15rem] font-extrabold text-[#0A1628] tracking-tight">Engagement Terms</div>

          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
            {[
              { label: 'Service', value: 'OIC Preparation & Submission' },
              { label: 'Fee', value: '$1,500', sub: 'or included in Pro plan' },
              { label: 'Scope', value: 'Review, preparation, IRS representation' },
              { label: 'Duration', value: 'Until resolution' },
              { label: 'Payment', value: '50% upfront, 50% on submission' },
            ].map((row, i, arr) => (
              <div key={row.label} className={`flex items-start justify-between py-2.5 ${i < arr.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <span className="text-[0.82rem] font-semibold text-[#64748B]">{row.label}</span>
                <div className="text-right max-w-[180px]">
                  <span className={`text-[0.82rem] ${row.label === 'Fee' ? 'text-[0.95rem] font-extrabold' : 'font-bold'} text-[#0A1628]`}>{row.value}</span>
                  {row.sub && <div className="text-[0.68rem] text-[#00A651] font-semibold">{row.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* What's Included */}
          <div>
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">What&apos;s Included</div>
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] flex flex-col gap-3">
              {['Full case review', 'Form preparation', 'IRS correspondence', 'Phone/chat support', 'Post-submission monitoring'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#E6F9EE] flex items-center justify-center shrink-0">
                    <svg className="w-[9px] h-[9px] text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-[0.82rem] font-semibold text-[#0A1628]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Checkbox */}
          <button
            onClick={() => setTermsAccepted(!termsAccepted)}
            className={`flex items-center gap-3 w-full p-3.5 border-[1.5px] rounded-[14px] transition-colors text-left ${
              termsAccepted ? 'border-[#0A1628] bg-[#EFF4FF]' : 'border-[#E2E8F0] bg-white hover:border-[#0A1628]'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
              termsAccepted ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {termsAccepted && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="text-[0.82rem] font-semibold text-[#0A1628] leading-[1.4]">I agree to the engagement terms and conditions</span>
          </button>

          {/* CTA Section */}
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/expert/poa-education"
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-[0.88rem] font-bold transition ${
                termsAccepted
                  ? 'bg-[#00A651] text-white hover:-translate-y-0.5'
                  : 'bg-[#00A651] text-white opacity-50 pointer-events-none'
              }`}
            >
              Accept &amp; Begin
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <button className="py-3 text-center text-[#94A3B8] text-[0.82rem] font-semibold">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
