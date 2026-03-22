'use client'

import Link from 'next/link'

const findings = [
  { num: '1', bg: 'bg-[#EFF4FF]', color: 'text-[#1A1A2E]', text: 'Your RCP supports a low offer amount' },
  { num: '2', bg: 'bg-[#F5F0FF]', color: 'text-[#7C3AED]', text: 'Strong reasonable cause for penalty abatement' },
  { num: '3', bg: 'bg-[#F0FDFA]', color: 'text-[#0D9488]', text: 'FTA eligible \u2014 should be done first' },
]

export default function HandoffRecommendationPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <div className="mx-auto max-w-lg lg:max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4">
          <Link href="/expert/handoff/review" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#F0F0F5]">
            <svg className="w-[18px] h-[18px] text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Expert Recommendation</h1>
        </div>

        <div className="px-5 pb-10 space-y-5">
          {/* Expert Profile */}
          <div className="flex items-center gap-3.5 py-1">
            <div className="relative w-[52px] h-[52px] shrink-0">
              <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center shadow-sm">
                <span className="text-[1.1rem] font-extrabold text-white">MC</span>
              </div>
              <div className="absolute -bottom-px -right-px w-[18px] h-[18px] rounded-full bg-[#00A651] border-[2.5px] border-[#FAFAFF] flex items-center justify-center">
                <svg className="w-[7px] h-[7px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-[#1A1A2E]">Michael Chen, EA</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[0.72rem] font-semibold text-[#8585A0]">Enrolled Agent</span>
                <span className="text-[0.55rem] text-[#B0B0C8]">|</span>
                <div className="flex items-center gap-0.5">
                  <svg className="w-[9px] h-[9px] text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[0.72rem] font-semibold text-[#8585A0]">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white rounded-[18px] border border-[#F0F0F5] overflow-hidden">
            <div className="flex">
              <div className="w-[5px] bg-[#1A1A2E] shrink-0 rounded-l-[5px]" />
              <div className="flex-1 p-4">
                {/* Recommended badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EFF4FF] border border-[rgba(0,61,165,0.12)] rounded-full text-[0.68rem] font-bold text-[#1A1A2E] mb-3">
                  <svg className="w-[9px] h-[9px] text-[#7C3AED]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                  Recommended
                </div>

                <div className="text-[1.05rem] font-extrabold text-[#1A1A2E] leading-tight mb-1">Offer in Compromise &mdash; Lump Sum</div>
                <div className="text-[0.8rem] text-[#8585A0] font-medium leading-relaxed mb-4">Based on my review, OIC gives you the best outcome</div>

                {/* Offer Amount */}
                <div className="bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] rounded-[14px] p-4 text-center">
                  <div className="text-[0.7rem] font-semibold text-[#8585A0] uppercase tracking-wider mb-1">Proposed Offer Amount</div>
                  <div className="text-[2rem] font-black text-[#00A651] tracking-tight">$8,500</div>
                </div>

                {/* Insight note */}
                <div className="flex items-start gap-2 mt-3.5 p-2.5 bg-[#FFF5F5] rounded-[10px] border border-[rgba(230,57,70,0.08)]">
                  <svg className="w-[13px] h-[13px] text-[#F59E0B] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z" />
                  </svg>
                  <div className="text-[0.76rem] text-[#5C5C7A] font-medium leading-relaxed">I&apos;ve identified opportunities to reduce your offer with medical expenses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-3 px-1">Key Findings</div>
            <div className="flex flex-col gap-2">
              {findings.map((f) => (
                <div key={f.num} className="flex items-start gap-3 p-3 hover:bg-[#FAFAFF] rounded-xl transition">
                  <div className={`w-[30px] h-[30px] rounded-full ${f.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-xs font-extrabold ${f.color}`}>{f.num}</span>
                  </div>
                  <div className="text-[0.84rem] font-semibold text-[#1A1A2E] leading-[1.45] pt-1">{f.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Timeline */}
          <div>
            <div className="text-xs font-bold text-[#B0B0C8] uppercase tracking-wider mb-3 px-1">Strategy Timeline</div>
            <div className="bg-white rounded-2xl border border-[#F0F0F5] p-[18px] shadow-sm">
              {/* Step 1 */}
              <div className="flex items-start gap-3.5 pb-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#0D9488] flex items-center justify-center">
                    <span className="text-[0.72rem] font-extrabold text-white">1</span>
                  </div>
                  <div className="w-0.5 h-6 bg-[#D5D5E0] mt-1" />
                </div>
                <div className="pt-1">
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Apply for First Time Abatement</div>
                  <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-[#E6F9EE] rounded-full text-[0.68rem] font-bold text-[#00A651]">
                    <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                    Reduces by $5,300
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5 pb-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A2E] flex items-center justify-center shadow-sm">
                    <span className="text-[0.72rem] font-extrabold text-white">2</span>
                  </div>
                  <div className="w-0.5 h-6 bg-[#D5D5E0] mt-1" />
                </div>
                <div className="pt-1">
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Submit OIC with reduced balance</div>
                  <div className="text-[0.72rem] text-[#8585A0] font-medium mt-1">Lump sum payment option</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3.5">
                <div className="shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                    </svg>
                  </div>
                </div>
                <div className="pt-1">
                  <div className="text-[0.88rem] font-bold text-[#1A1A2E]">Expected savings</div>
                  <div className="inline-flex items-center gap-1 mt-1.5 px-3 py-1 bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] rounded-full text-[0.82rem] font-extrabold text-[#00A651]">
                    85%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              href="/expert/handoff/acceptance"
              className="flex items-center justify-center gap-2 w-full py-4 px-7 bg-[#1A1A2E] text-white rounded-full text-[0.95rem] font-bold hover:opacity-90 transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Accept Recommendation
            </Link>
            <button className="flex items-center justify-center gap-2 w-full py-3.5 px-7 border-2 border-[#D5D5E0] bg-white text-[#1A1A2E] rounded-full text-[0.88rem] font-semibold hover:border-[#1A1A2E] transition">
              <svg className="w-3 h-3 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
              </svg>
              Request Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
