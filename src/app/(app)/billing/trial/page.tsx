'use client'

import Link from 'next/link'

const features = [
  {
    title: 'Run unlimited analyses',
    subtitle: 'Full tax situation assessment',
    gradientBg: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-[#2563EB]',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Connect with a tax expert',
    subtitle: '1-on-1 professional guidance',
    gradientBg: 'from-violet-500/10 to-violet-500/5',
    iconColor: 'text-violet-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Prepare IRS forms',
    subtitle: 'Auto-filled resolution documents',
    gradientBg: 'from-teal-500/10 to-teal-500/5',
    iconColor: 'text-teal-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
]

export default function TrialActivePage() {
  return (
    <div className="flex flex-col min-h-screen items-center text-center px-6 pt-8 pb-6">
      {/* Spacer */}
      <div className="h-3 flex-shrink-0" />

      {/* Animated Icon */}
      <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-blue-500/15 to-blue-500/5 flex items-center justify-center mb-5 relative shadow-lg shadow-blue-500/15">
        <svg className="h-[34px] w-[34px] text-[#2563EB] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ animationDuration: '3s' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
        {/* Sparkle decorations */}
        <div className="absolute -top-1 -right-0.5 text-amber-400 text-sm animate-pulse" style={{ animationDelay: '0.3s' }}>&#10022;</div>
        <div className="absolute bottom-0.5 -left-1.5 text-violet-400 text-[10px] animate-pulse" style={{ animationDelay: '0.6s' }}>&#9733;</div>
      </div>

      {/* Heading */}
      <h1 className="text-[1.4rem] font-extrabold text-[#1A1A2E] leading-tight mb-2">Your Pro Trial is Active!</h1>
      <p className="text-sm text-[#5C5C7A] leading-relaxed mb-[18px] max-w-[280px]">
        Enjoy full access to all premium features during your trial.
      </p>

      {/* Countdown Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-blue-500/10 rounded-full border border-blue-500/30 mb-6">
        <svg className="h-3.5 w-3.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-bold text-[#2563EB]">6 days, 23 hours remaining</span>
      </div>

      {/* What You Can Do Now */}
      <div className="w-full text-left mb-2">
        <div className="text-xs font-bold text-[#8585A0] uppercase tracking-wider mb-3">What you can do now</div>
      </div>

      {/* Feature Cards */}
      <div className="w-full flex flex-col gap-2.5 mb-5">
        {features.map((f) => (
          <div key={f.title} className="flex items-center gap-3.5 p-4 bg-white border border-[#F0F0F5] rounded-[14px] hover:border-[#D5D5E0] transition-colors cursor-pointer">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradientBg} flex items-center justify-center flex-shrink-0`}>
              <span className={f.iconColor}>{f.icon}</span>
            </div>
            <div className="text-left flex-1">
              <div className="text-sm font-semibold text-[#1A1A2E] leading-snug">{f.title}</div>
              <div className="text-xs text-[#8585A0] mt-0.5">{f.subtitle}</div>
            </div>
            <svg className="h-3 w-3 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* Reminder Note */}
      <div className="w-full bg-white border border-[#F0F0F5] rounded-[10px] px-3.5 py-3 flex items-center gap-2.5 mb-[22px]">
        <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <svg className="h-3 w-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </div>
        <span className="text-xs text-[#5C5C7A] leading-snug text-left">
          We&apos;ll remind you <strong className="font-semibold text-[#1A1A2E]">2 days</strong> before your trial ends.
        </span>
      </div>

      {/* Green CTA Button */}
      <div className="w-full mb-3">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-[#00A651] text-white rounded-full text-sm font-semibold shadow-lg shadow-green-600/20 hover:bg-[#008C44] transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          Explore Dashboard
        </Link>
      </div>

      {/* Ghost Text Link */}
      <div className="pt-0.5">
        <a href="#" className="text-xs text-[#8585A0] font-medium hover:text-[#2563EB] transition-colors">
          <span className="mr-1">&#9201;</span> Set up billing reminders
        </a>
      </div>
    </div>
  )
}
