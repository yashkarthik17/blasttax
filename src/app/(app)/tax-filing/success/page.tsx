'use client'

import Link from 'next/link'

const nextItems = [
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
    ),
    iconBg: 'bg-[#EFF4FF]',
    iconColor: 'text-[#0A1628]',
    title: 'IRS processes in 1-3 weeks',
    sub: 'Standard e-file processing time',
  },
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
    ),
    iconBg: 'bg-[#E6F9EE]',
    iconColor: 'text-[#00A651]',
    title: "We'll notify you of any updates",
    sub: 'Push notifications enabled',
  },
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    ),
    iconBg: 'bg-[#F3EEFF]',
    iconColor: 'text-[#7C3AED]',
    title: 'Check refund status anytime',
    sub: 'Track from your dashboard',
  },
]

const summaryRows = [
  { label: 'Tax Year', value: '2025' },
  { label: 'Filing Status', value: 'Single' },
  { label: 'Estimated Refund', value: '$2,282', valueColor: 'text-[#00A651]', valueSize: 'text-[1.15rem] font-black' },
  { label: 'Submitted', value: 'March 16, 2026' },
  { label: 'Confirmation #', value: 'BT-2026-78432', valueBold: true },
]

export default function FilingSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link href="/tax-filing" className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0A1628" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </Link>
        <span className="text-[0.95rem] font-bold text-[#0A1628]">Filing Complete</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4 pt-5">
        {/* Success Animation */}
        <div className="text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-[#00A651] flex items-center justify-center mx-auto mb-4 relative">
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            <div className="absolute inset-0 rounded-full border-2 border-[#00A651]/30 animate-ping" />
          </div>
          <h1 className="text-[1.4rem] font-extrabold text-[#0A1628]">Return Filed Successfully</h1>
        </div>

        {/* Summary Card */}
        <div className="bg-white border border-[#F1F5F9] rounded-[16px] p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          {summaryRows.map((row, i) => (
            <div key={i} className={`flex justify-between items-center py-2.5 ${i < summaryRows.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
              <span className="text-[0.85rem] text-[#64748B] font-medium">{row.label}</span>
              <span className={`${row.valueSize || 'text-[0.85rem]'} ${row.valueBold ? 'font-bold' : 'font-semibold'} ${row.valueColor || 'text-[#0A1628]'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* What's Next */}
        <div>
          <h2 className="text-[1rem] font-extrabold text-[#0A1628] mb-3">What&apos;s Next</h2>
          <div className="bg-white border border-[#F1F5F9] rounded-[16px] px-[18px] py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {nextItems.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 py-3 ${i < nextItems.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <div className={`w-9 h-9 rounded-[10px] ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-[0.84rem] font-semibold text-[#0A1628] block">{item.title}</span>
                  <span className="text-[0.72rem] text-[#94A3B8]">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Banner */}
        <div className="flex items-start gap-2.5 px-4 py-3.5 bg-[#EFF4FF] border border-[#0A1628]/10 rounded-[14px]">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4m0-4h.01"/></svg>
          <span className="text-[0.82rem] text-[#0A1628] font-medium leading-relaxed">Have outstanding tax debt? Start a resolution analysis to explore your options.</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <Link href="/resolution" className="w-full flex items-center justify-center gap-2 bg-[#0A1628] text-white text-[0.95rem] font-bold py-4 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
            Start Resolution Analysis
          </Link>
          <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 bg-white border-[1.5px] border-[#E2E8F0] text-[#0A1628] text-[0.88rem] font-semibold py-3.5 px-7 rounded-full hover:-translate-y-px active:scale-[0.97] transition-all">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Go to Dashboard
          </Link>
        </div>

        <div className="h-5" />
      </div>
    </div>
  )
}
