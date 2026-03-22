'use client'

import Link from 'next/link'

const feeItems = [
  { name: 'Initial Consultation', amount: '$250', status: 'Paid', statusBg: 'bg-[#00A651]/10', statusColor: 'text-[#00A651]' },
  { name: 'Case Analysis', amount: '$500', status: 'Paid', statusBg: 'bg-[#00A651]/10', statusColor: 'text-[#00A651]' },
  { name: 'Form Preparation', amount: '$750', status: 'Due', statusBg: 'bg-amber-500/10', statusColor: 'text-amber-400', sub: 'Due on completion' },
  { name: 'IRS Submission', amount: '$500', status: 'Upcoming', statusBg: 'bg-[#F0F0F5]', statusColor: 'text-[#8585A0]', sub: 'Due on submission', muted: true },
  { name: 'Representation', amount: '$1,000', status: 'Upcoming', statusBg: 'bg-[#F0F0F5]', statusColor: 'text-[#8585A0]', sub: 'Due on engagement', muted: true },
  { name: 'Post-Resolution', amount: '$500', status: 'Upcoming', statusBg: 'bg-[#F0F0F5]', statusColor: 'text-[#8585A0]', sub: 'Due on resolution', muted: true },
]

const documents = [
  { name: 'Engagement Letter', icon: 'contract', status: 'Signed' },
  { name: 'Form 2848 (POA)', icon: 'shield', status: 'Signed' },
  { name: 'Fee Agreement', icon: 'invoice', status: 'Signed' },
]

export default function ContractsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Service Agreement</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-xl font-extrabold text-[#1A1A2E] leading-tight">Your Tax Professional Engagement</h2>
          <p className="text-sm text-[#8585A0] mt-1">Contract details and payment tracking</p>
        </div>

        {/* Active Contract Card */}
        <div className="bg-white rounded-2xl p-[18px] text-[#1A1A2E]">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#F0F0F5] flex items-center justify-center">
                <svg className="h-[18px] w-[18px] text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <p className="text-[0.9375rem] font-extrabold">Michael Chen, EA</p>
                <p className="text-[0.6875rem] text-[#8585A0]">Enrolled Agent</p>
              </div>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 bg-green-50 rounded-full text-[0.6875rem] font-bold text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" /> Active
            </span>
          </div>

          <div className="border-t border-[#F0F0F5] pt-3 space-y-2">
            <div>
              <p className="text-[0.625rem] text-[#5C5C7A] uppercase tracking-wide">Service</p>
              <p className="text-xs font-semibold">OIC Preparation &amp; IRS Representation</p>
            </div>
            <div>
              <p className="text-[0.625rem] text-[#5C5C7A] uppercase tracking-wide">Contract Date</p>
              <p className="text-xs font-semibold">Mar 1, 2026</p>
            </div>
          </div>
        </div>

        {/* Fee Structure Card */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <svg className="h-3.5 w-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#1A1A2E]">Fee Structure</span>
            </div>
            <span className="text-[0.9375rem] font-black text-[#1A1A2E]">$3,500</span>
          </div>

          <div className="flex flex-col">
            {feeItems.map((item, i) => (
              <div key={item.name} className={`flex items-center justify-between py-2.5 ${i < feeItems.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
                <div>
                  <p className={`text-sm font-semibold ${item.muted ? 'text-[#8585A0]' : 'text-[#1A1A2E]'}`}>{item.name}</p>
                  {item.sub && <p className="text-[0.625rem] text-[#8585A0] mt-0.5">{item.sub}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${item.muted ? 'text-[#8585A0]' : 'text-[#1A1A2E]'}`}>{item.amount}</span>
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6875rem] font-bold ${item.statusBg} ${item.statusColor}`}>
                    {item.status === 'Paid' && (
                      <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-3.5">
            <div className="flex justify-between mb-1.5">
              <span className="text-[0.6875rem] font-bold text-[#8585A0]">$750 / $3,500 paid</span>
              <span className="text-[0.6875rem] font-extrabold text-[#1A1A2E]">21%</span>
            </div>
            <div className="w-full h-2 bg-[#F0F0F5] rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '21%' }} />
            </div>
          </div>
        </div>

        {/* Next Payment Alert */}
        <div className="flex items-center gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/15 rounded-[14px]">
          <svg className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <div>
            <p className="text-sm font-bold text-amber-300">Next Payment</p>
            <p className="text-xs text-amber-400/80">$750 due when forms are ready</p>
          </div>
        </div>

        {/* Retainer */}
        <div className="flex items-center gap-2.5 p-3 bg-[#2563EB]/10 rounded-xl">
          <svg className="h-3.5 w-3.5 text-[#1A1A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
          <p className="text-sm text-[#1A1A2E] font-semibold">Retainer balance: $250 remaining</p>
        </div>

        {/* Contract Documents */}
        <div className="bg-white border border-[#F0F0F5] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#00A651]/10 flex items-center justify-center">
              <svg className="h-3.5 w-3.5 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            </div>
            <span className="text-sm font-bold text-[#1A1A2E]">Contract Documents</span>
          </div>

          {documents.map((doc, i) => (
            <div key={doc.name} className={`flex items-center justify-between py-2.5 ${i < documents.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
              <div className="flex items-center gap-2.5">
                <svg className="h-3.5 w-3.5 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="text-sm font-semibold text-[#1A1A2E]">{doc.name}</p>
              </div>
              <span className="flex items-center gap-1 px-2 py-0.5 bg-[#00A651]/10 rounded-full text-[0.6875rem] font-bold text-[#00A651]">
                <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {doc.status}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <Link
          href="/billing/checkout"
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#00A651] text-white rounded-full text-sm font-bold hover:bg-[#008C44] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
          Make Payment
        </Link>
        <div className="flex gap-2.5">
          <Link href="#" className="flex-1 text-center py-3 bg-white border border-[#F0F0F5] rounded-xl text-sm font-semibold text-[#1A1A2E]">
            <span className="mr-1">&#128196;</span> View Full Contract
          </Link>
          <Link href="/expert/landing" className="flex-1 text-center py-3 bg-white border border-[#F0F0F5] rounded-xl text-sm font-semibold text-[#1A1A2E]">
            <span className="mr-1">&#128172;</span> Contact Professional
          </Link>
        </div>
      </div>
    </div>
  )
}
