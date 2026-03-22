'use client'

import Link from 'next/link'

const nextSteps = [
  {
    title: 'Features downgrade to Free plan',
    subtitle: 'After your current period expires',
    icon: (
      <svg className="h-2.5 w-2.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
      </svg>
    ),
  },
  {
    title: 'Your cases and data are preserved',
    subtitle: 'Nothing gets deleted',
    icon: (
      <svg className="h-2.5 w-2.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: 'You can resubscribe anytime',
    subtitle: 'Instantly reactivate your Pro plan',
    icon: (
      <svg className="h-2.5 w-2.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    ),
  },
]

export default function CancelConfirmedPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-7 text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/15">
        <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-[1.35rem] font-extrabold text-[#1A1A2E] leading-tight mb-2">Subscription Cancelled</h1>
      <p className="text-sm text-[#5C5C7A] mb-6">We&apos;re sorry to see you go.</p>

      {/* Info Card */}
      <div className="w-full bg-[#2563EB]/10 border border-blue-500/30 rounded-[14px] p-4 flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-[10px] bg-white flex items-center justify-center flex-shrink-0">
          <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-[#2563EB] leading-snug">Your Pro access continues until April 15, 2026</div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="w-full text-left mb-6">
        <div className="text-xs font-bold text-[#8585A0] uppercase tracking-wider mb-3.5">What happens next</div>
        <div className="flex flex-col gap-3">
          {nextSteps.map((step) => (
            <div key={step.title} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#F0F0F5] flex items-center justify-center flex-shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1A1A2E] leading-snug">{step.title}</div>
                <div className="text-xs text-[#8585A0] mt-0.5">{step.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-2.5 mb-4">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center py-3.5 bg-[#00A651] text-white rounded-full text-sm font-semibold hover:bg-[#008C44] transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/billing/plans"
          className="w-full flex items-center justify-center gap-1 py-3.5 bg-transparent text-[#1A1A2E] border border-[#D5D5E0] rounded-full text-sm font-semibold hover:border-white transition-colors"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          Resubscribe
        </Link>
      </div>

      {/* Small text */}
      <p className="text-xs text-[#8585A0] leading-relaxed max-w-[280px]">
        Changed your mind? You can reactivate anytime before April 15.
      </p>
    </div>
  )
}
