'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HandoffAcceptancePage() {
  const [isSigned, setIsSigned] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const canSubmit = isSigned && isAuthorized

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/handoff/recommendation" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F1F5F9]">
            <svg className="w-4 h-4 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Accept &amp; Authorize</h1>
          <div className="w-10" />
        </div>

        {/* Step Indicator */}
        <div className="px-5 pb-2">
          <div className="flex items-center gap-2">
            {/* Steps 1-3 complete */}
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#00A651] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div className="w-8 h-[3px] bg-[#00A651] rounded-full" />
              </div>
            ))}
            {/* Step 4 active */}
            <div className="w-6 h-6 rounded-full bg-[#0A1628] flex items-center justify-center">
              <span className="text-[0.7rem] font-bold text-white">4</span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-10 space-y-4">
          {/* Expert Recommendation Summary */}
          <div className="bg-[#E6F9EE] rounded-2xl p-4 border border-[rgba(0,166,81,0.15)]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[rgba(0,166,81,0.15)] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#00A651]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M1 8.998a7 7 0 0 1 13.02-3.55l-.024.014H14a6 6 0 1 0-6.088 6.04A7 7 0 0 1 1 8.998ZM14.5 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM10 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" />
                </svg>
              </div>
              <span className="text-[0.82rem] font-bold text-[#065F46]">Expert Recommends: Proceed with OIC</span>
            </div>
            <div className="text-[0.78rem] text-[#065F46] leading-relaxed">Offer $8,500 for $47,250 debt. Strong case with 78% success probability.</div>
          </div>

          {/* Power of Attorney Section */}
          <div>
            <div className="text-[1.1rem] font-extrabold text-[#0A1628] tracking-tight mb-1">Power of Attorney</div>
            <div className="text-[0.82rem] text-[#94A3B8] leading-relaxed">By signing Form 2848, you authorize your tax professional to represent you before the IRS</div>
          </div>

          {/* Form 2848 Preview Card */}
          <div className="bg-white rounded-2xl p-4 border border-[#F1F5F9]">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#EFF4FF] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-[#0A1628]">Form 2848</div>
                <div className="text-[0.68rem] text-[#94A3B8]">Power of Attorney and Declaration of Representative</div>
              </div>
            </div>

            {/* POA Fields */}
            {[
              {
                label: 'Tax Years',
                value: (
                  <div className="flex gap-1.5">
                    {['2020', '2021', '2022'].map((y) => (
                      <span key={y} className="px-2.5 py-0.5 bg-[#EFF4FF] rounded-full text-[0.7rem] font-bold text-[#0A1628]">{y}</span>
                    ))}
                  </div>
                ),
              },
              { label: 'Matters', value: <span className="text-[0.78rem] font-semibold text-[#0A1628]">Income tax resolution</span> },
              { label: 'Representative', value: <span className="text-[0.78rem] font-bold text-[#0A1628]">Michael Chen, EA</span> },
              { label: 'PTIN', value: <span className="text-[0.78rem] font-semibold text-[#0A1628] tracking-wider">P12345678</span> },
            ].map((field, i, arr) => (
              <div key={field.label} className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <span className="text-[0.78rem] font-semibold text-[#64748B]">{field.label}</span>
                {field.value}
              </div>
            ))}
          </div>

          {/* Signature Area */}
          <div>
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-wider mb-2.5">Your Signature</div>
            <button
              onClick={() => setIsSigned(!isSigned)}
              className={`w-full h-[100px] rounded-[14px] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                isSigned
                  ? 'border-2 border-solid border-[#00A651] bg-white'
                  : 'border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0A1628] hover:bg-[#EFF4FF]'
              }`}
            >
              {isSigned ? (
                <span className="text-[1.8rem] text-[#0A1628] italic" style={{ fontFamily: 'cursive' }}>Jane M. Doe</span>
              ) : (
                <>
                  <svg className="w-[22px] h-[22px] text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                  </svg>
                  <span className="text-[0.78rem] font-semibold text-[#94A3B8]">Tap to sign</span>
                </>
              )}
            </button>

            {/* Date */}
            <div className="flex items-center justify-between mt-2.5 px-3.5 py-2.5 bg-[#F8FAFC] rounded-[10px]">
              <span className="text-[0.78rem] font-semibold text-[#64748B]">Date</span>
              <span className="text-[0.82rem] font-bold text-[#0A1628]">March 15, 2026</span>
            </div>
          </div>

          {/* Authorization Checkbox */}
          <button
            onClick={() => setIsAuthorized(!isAuthorized)}
            className={`flex items-start gap-3 w-full p-3.5 border-[1.5px] rounded-[14px] transition-colors text-left ${
              isAuthorized ? 'border-[#0A1628] bg-[#EFF4FF]' : 'border-[#F1F5F9] bg-white hover:border-[#0A1628]'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              isAuthorized ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#D5D5E0]'
            }`}>
              {isAuthorized && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span className="text-[0.82rem] font-semibold text-[#0A1628] leading-relaxed">I authorize this representative to act on my behalf with the IRS</span>
          </button>

          {/* CTA Section */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              disabled={!canSubmit}
              className={`flex items-center justify-center gap-2 w-full py-4 rounded-full text-[0.88rem] font-bold transition ${
                canSubmit
                  ? 'bg-[#00A651] text-white hover:-translate-y-0.5'
                  : 'bg-[#00A651] text-white opacity-50 cursor-not-allowed'
              }`}
            >
              <svg className="w-[13px] h-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
              </svg>
              Sign &amp; Submit
            </button>
            <button className="py-2.5 text-center text-[#0A1628] text-[0.78rem] font-semibold flex items-center justify-center gap-1">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Review Terms Again
            </button>
          </div>

          {/* Reassurance */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            <svg className="w-3 h-3 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span className="text-[0.72rem] text-[#94A3B8] font-medium">You can revoke authorization at any time</span>
          </div>
        </div>
      </div>
    </div>
  )
}
