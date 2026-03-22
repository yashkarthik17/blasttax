'use client'

import Link from 'next/link'

const yearData = [
  {
    year: 2025,
    short: '25',
    status: 'Not Filed',
    statusColor: 'text-[#E63946]',
    bgColor: 'bg-[#FFF0F1]',
    badgeBg: 'bg-[#FFF0F1]',
    sub: 'Federal & State returns due',
    action: 'file',
  },
  {
    year: 2024,
    short: '24',
    status: 'Filed',
    statusColor: 'text-[#00A651]',
    bgColor: 'bg-[#E6F9EE]',
    badgeBg: 'bg-[#E6F9EE]',
    sub: 'Filed on Apr 12, 2025',
    action: 'view',
  },
  {
    year: 2023,
    short: '23',
    status: 'Filed',
    statusColor: 'text-[#00A651]',
    bgColor: 'bg-[#E6F9EE]',
    badgeBg: 'bg-[#E6F9EE]',
    sub: 'Filed on Apr 8, 2024',
    action: 'viewOnly',
  },
  {
    year: 2022,
    short: '22',
    status: 'Unfiled',
    statusColor: 'text-[#E63946]',
    bgColor: 'bg-[#FFF0F1]',
    badgeBg: 'bg-[#FFF0F1]',
    sub: 'Federal & State returns overdue',
    action: 'file',
  },
]

export default function TaxFilingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/dashboard" className="w-9 h-9 rounded-xl bg-[#FAFAFF] border border-[#F0F0F5] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#1A1A2E" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#1A1A2E]">Tax Filing</span>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1A1A2E" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-[18px]">
        {/* Hero Card */}
        <div className="bg-[#1A1A2E] rounded-[20px] p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[42px] h-[42px] rounded-[14px] bg-white/15 flex items-center justify-center">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg>
              </div>
            </div>
            <h1 className="text-[1.3rem] font-extrabold text-white tracking-tight mb-1.5">File or Amend Your Returns</h1>
            <p className="text-[0.82rem] text-white/80 font-normal leading-relaxed mb-3">Get current with the IRS to unlock resolution options</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 border border-white/20 rounded-full text-[0.7rem] font-semibold text-white">
              <svg width="9" height="9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
              Required for resolution eligibility
            </div>
          </div>
        </div>

        {/* Tax Year Cards */}
        <div>
          <div className="text-[0.75rem] font-bold text-[#B0B0C8] uppercase tracking-wider mb-3 px-1">Filing Status by Year</div>
          <div className="flex flex-col gap-2.5">
            {yearData.map((item) => (
              <div key={item.year} className="bg-white rounded-[16px] px-[18px] py-4 border border-[#D5D5E0] flex items-center gap-3.5 hover:-translate-y-px transition-all cursor-pointer active:scale-[0.98]">
                <div className={`w-12 h-12 rounded-[14px] ${item.bgColor} flex items-center justify-center shrink-0`}>
                  <span className={`text-[0.82rem] font-extrabold ${item.statusColor}`}>{item.short}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.92rem] font-bold text-[#1A1A2E]">{item.year}</span>
                    <span className={`px-2 py-0.5 ${item.badgeBg} rounded-full text-[0.65rem] font-semibold ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <div className="text-[0.72rem] text-[#8585A0] mt-0.5">{item.sub}</div>
                </div>
                {item.action === 'file' && (
                  <Link href="/tax-filing/personal" className="px-3.5 py-1.5 rounded-full text-[0.72rem] font-semibold bg-[#E63946] text-white hover:-translate-y-px active:scale-95 transition-all">
                    File Now
                  </Link>
                )}
                {item.action === 'view' && (
                  <div className="flex gap-1.5 items-center">
                    <a href="#" className="text-[0.72rem] font-semibold text-[#1A1A2E]">View</a>
                    <span className="text-[#D5D5E0]">|</span>
                    <a href="#" className="text-[0.72rem] font-semibold text-[#8585A0]">Amend</a>
                  </div>
                )}
                {item.action === 'viewOnly' && (
                  <a href="#" className="text-[0.72rem] font-semibold text-[#1A1A2E]">View</a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Alert */}
        <div className="flex gap-2.5 px-4 py-3.5 bg-[#EEF2FF] border border-[#C7D2FE] rounded-[14px]">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
          <div className="text-[0.8rem] text-[#3730A3] leading-relaxed font-medium">All returns must be filed before applying for most resolution types</div>
        </div>

        {/* CTA */}
        <div className="pt-1">
          <Link href="/tax-filing/personal" className="w-full flex items-center justify-center gap-2 bg-[#1A1A2E] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            Start Filing 2025
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
