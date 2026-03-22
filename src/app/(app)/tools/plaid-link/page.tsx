'use client'

import Link from 'next/link'

const banks = [
  { name: 'Chase', letter: 'C', bg: '#1A1A2E' },
  { name: 'BofA', letter: 'B', bg: '#E63946' },
  { name: 'Wells', letter: 'W', bg: '#D4A617' },
  { name: 'Cap One', letter: 'C', bg: '#E65100' },
  { name: 'Citi', letter: 'CITI', bg: '#2563EB' },
]

const benefits = [
  { icon: 'bolt', color: '#00A651', bg: '#E6F9EE', title: 'Faster form prep', desc: 'Auto-fill financial forms in seconds' },
  { icon: 'headset', color: '#1A1A2E', bg: '#EFF4FF', title: 'Accurate asset reporting', desc: 'Real balances, no guesswork' },
  { icon: 'check', color: '#7C3AED', bg: '#F5F0FF', title: 'Auto income verification', desc: 'Verify deposits automatically' },
]

export default function PlaidLinkPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Connect Your Bank</h1>
        </div>

        {/* Shield Icon */}
        <div className="flex justify-center pt-2">
          <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-[22px] bg-[#EFF4FF]">
            <svg className="relative z-10 h-7 w-7 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-[#00A651]">
              <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <div className="text-[1.35rem] font-extrabold leading-tight tracking-tight text-[#1A1A2E]">Securely link your accounts</div>
          <div className="mt-2 text-[0.82rem] font-medium leading-relaxed text-[#8585A0]">Automatically import financial data for accurate analysis</div>
        </div>

        {/* Benefits */}
        <div className="space-y-1.5">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-[#F0F0F5]">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: b.bg }}>
                <svg className="h-3.5 w-3.5" style={{ color: b.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {b.icon === 'bolt' && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                  {b.icon === 'headset' && <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />}
                  {b.icon === 'check' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                </svg>
              </div>
              <div>
                <div className="text-[0.85rem] font-bold text-[#1A1A2E]">{b.title}</div>
                <div className="text-[0.72rem] text-[#8585A0]">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bank Selector */}
        <div>
          <div className="relative mb-4">
            <svg className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your bank..."
              className="w-full rounded-xl border-[1.5px] border-[#E8E8F0] bg-[#FAFAFF] py-3 pl-10 pr-4 text-[0.85rem] font-medium text-[#1A1A2E] outline-none transition focus:border-[#1A1A2E] focus:bg-white placeholder:text-[#B0B0C8]"
            />
          </div>

          <div className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-[#B0B0C8]">Popular Banks</div>
          <div className="flex justify-between gap-2.5">
            {banks.map((bank) => (
              <button key={bank.name} className="flex flex-col items-center gap-1.5 transition hover:-translate-y-0.5 active:scale-95">
                <div
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl"
                  style={{ backgroundColor: bank.bg }}
                >
                  <span className={`font-extrabold text-white ${bank.letter.length > 1 ? 'text-[0.75rem]' : 'text-lg'}`}>{bank.letter}</span>
                </div>
                <span className="text-[0.65rem] font-semibold text-[#5C5C7A]">{bank.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Security Card */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#E8E8F0] bg-white p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F9EE]">
            <svg className="h-3.5 w-3.5 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <div className="mb-1.5 text-[0.8rem] font-bold text-[#1A1A2E]">Bank-grade security</div>
            <div className="flex flex-wrap gap-1.5">
              {['256-bit encryption', 'Read-only access', 'Revoke anytime'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-[#5C5C7A]">
                  <svg className="h-2 w-2 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-1">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-7 py-4 text-[0.95rem] font-bold text-white transition hover:opacity-90">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Connect Bank Account
          </button>
          <button className="flex w-full items-center justify-center rounded-full px-7 py-3 text-[0.82rem] font-semibold text-[#8585A0] transition hover:text-[#5C5C7A]">
            Skip &mdash; I&apos;ll enter manually
          </button>
        </div>
      </div>
    </div>
  )
}
