'use client'

import { useRouter } from 'next/navigation'

export default function DisclaimerPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Disclaimer</h1>
        </div>

        {/* Shield Icon */}
        <div className="pt-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] border border-[rgba(245,158,11,0.15)] bg-[#FFFBEB]">
            <svg className="h-9 w-9 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-[#1A1A2E]">Important Disclaimer</h2>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-[#E8E8F0] bg-white p-5 shadow-card">
          <div className="mb-3 text-[0.88rem] font-bold leading-snug text-[#1A1A2E]">
            BlastTax provides educational tax information and tools. This is NOT legal, tax, or financial advice.
          </div>
          <p className="mb-4 text-[0.82rem] leading-relaxed text-[#5C5C7A]">
            The information, analysis, and recommendations provided through BlastTax are for educational and informational purposes only. They should not be construed as legal, tax, accounting, or financial advice specific to your situation.
          </p>
          <p className="mb-4 text-[0.82rem] leading-relaxed text-[#5C5C7A]">
            Every tax situation is unique. The IRS evaluates each case on its own merits, and outcomes may vary significantly based on individual circumstances that our tools cannot fully assess.
          </p>

          {/* Callout */}
          <div className="rounded-xl border-l-4 border-[#2563EB] bg-[#EFF4FF] px-4 py-3.5">
            <div className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-[0.82rem] font-medium leading-relaxed text-[#1E40AF]">
                Consult a licensed tax professional, enrolled agent, CPA, or tax attorney for advice specific to your situation before making any decisions regarding your tax obligations.
              </p>
            </div>
          </div>
        </div>

        {/* Circular 230 */}
        <div className="rounded-[14px] border border-[#F0F0F5] bg-[#FAFAFF] p-4">
          <div className="mb-2 flex items-center gap-1 text-[0.72rem] font-bold uppercase tracking-wider text-[#8585A0]">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            IRS Circular 230 Notice
          </div>
          <p className="text-[0.75rem] leading-relaxed text-[#8585A0]">
            To ensure compliance with requirements imposed by the IRS, we inform you that any U.S. federal tax advice contained in this application is not intended or written to be used, and cannot be used, for the purpose of (i) avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or recommending to another party any transaction or matter addressed herein.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => router.back()}
          className="flex w-full items-center justify-center rounded-full bg-[#1A1A2E] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90"
        >
          I Understand
        </button>
      </div>
    </div>
  )
}
