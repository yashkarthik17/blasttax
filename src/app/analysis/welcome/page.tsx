'use client'

import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        <div className="flex min-h-screen flex-col items-center justify-center px-7 py-5 text-center">
          {/* Illustration */}
          <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#F3F4F6]">
            <i className="fa-solid fa-magnifying-glass text-5xl text-[#0A1628]" />
            {/* Dashed rings */}
            <div className="pointer-events-none absolute inset-[-8px] animate-[spin_20s_linear_infinite] rounded-full border-2 border-dashed border-[rgba(10,22,40,0.1)]" />
            <div className="pointer-events-none absolute inset-[-20px] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-dashed border-[rgba(124,58,237,0.08)]" />
          </div>

          {/* Heading */}
          <div className="mt-8">
            <h1 className="text-[1.6rem] font-extrabold leading-tight tracking-[-0.01em] text-[#0A1628]">
              Let&apos;s find your best<br />resolution path
            </h1>
          </div>

          {/* Steps */}
          <div className="mt-8 flex w-full flex-col gap-4 text-left">
            {/* Step 1 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A1628] text-sm text-white">
                <i className="fa-solid fa-clipboard-list text-sm" />
              </div>
              <div>
                <span className="block text-sm font-bold text-[#0A1628]">Answer a few questions</span>
                <span className="text-xs text-[#94A3B8]">Simple, guided questions about your situation</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-sm text-white">
                <i className="fa-solid fa-microchip text-sm" />
              </div>
              <div>
                <span className="block text-sm font-bold text-[#0A1628]">We&apos;ll analyze your eligibility</span>
                <span className="text-xs text-[#94A3B8]">AI-powered assessment against IRS criteria</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A651] text-sm text-white">
                <i className="fa-solid fa-star text-sm" />
              </div>
              <div>
                <span className="block text-sm font-bold text-[#0A1628]">Get your personalized plan</span>
                <span className="text-xs text-[#94A3B8]">Ranked options with savings estimates</span>
              </div>
            </div>
          </div>

          {/* Time estimate */}
          <div className="mt-6">
            <span className="text-[13px] text-[#94A3B8]">
              <i className="fa-regular fa-clock mr-1" />
              This usually takes about 10 minutes
            </span>
          </div>

          {/* Reassurance */}
          <div className="mt-5 w-full">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F9EE]">
                <i className="fa-solid fa-lock text-[13px] text-[#00A651]" />
              </div>
              <span className="text-left text-[12.5px] leading-snug text-[#64748B]">
                Everything you share is confidential and encrypted
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex w-full flex-col items-center gap-3">
            <button
              onClick={() => router.push('/analysis/pre-qualifier/1')}
              className="w-full rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
            >
              Let&apos;s Begin <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-[13px] font-medium text-[#94A3B8] transition-colors hover:text-[#64748B]"
            >
              I&apos;ll do this later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
