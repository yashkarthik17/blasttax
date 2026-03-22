'use client'

import { useState } from 'react'
import Link from 'next/link'

type FilterType = 'all' | 'assessment' | 'payment' | 'status'

interface TranscriptCode {
  code: string
  label: string
  date: string
  type: FilterType
  amount?: string
  amountColor: string
  iconBg: string
  iconColor: string
  codeBg: string
  codeColor: string
  badge?: { label: string; bg: string; color: string }
  detail: string
}

const codes: TranscriptCode[] = [
  { code: 'TC 150', label: 'Return Filed', date: 'Apr 15, 2022', type: 'status', amountColor: '#10B981', iconBg: '#ECFDF5', iconColor: '#10B981', codeBg: '#EFF4FF', codeColor: '#1A1A2E', badge: { label: 'Filed', bg: '#ECFDF5', color: '#10B981' }, detail: 'Your 2021 tax return was received and processed by the IRS. This establishes the CSED start date for this tax year.' },
  { code: 'TC 806', label: 'W-2 Withholding', date: 'Apr 15, 2022', type: 'payment', amount: '-$6,240', amountColor: '#10B981', iconBg: '#EFF4FF', iconColor: '#1A1A2E', codeBg: '#EFF4FF', codeColor: '#1A1A2E', detail: 'Credit applied from W-2 income tax withholding. This amount was withheld by your employer throughout the tax year.' },
  { code: 'TC 290', label: 'Additional Assessment', date: 'Jul 12, 2022', type: 'assessment', amount: '$3,800', amountColor: '#D97706', iconBg: '#FFFBEB', iconColor: '#D97706', codeBg: '#FFFBEB', codeColor: '#D97706', detail: 'Additional tax assessed after examination or audit adjustment. This amount was added to your original balance due.' },
  { code: 'TC 300', label: 'Additional Tax', date: 'Aug 03, 2022', type: 'assessment', amount: '$12,500', amountColor: '#EF4444', iconBg: '#FEF2F2', iconColor: '#EF4444', codeBg: '#FEF2F2', codeColor: '#EF4444', detail: 'Additional tax assessed by the IRS, typically from an audit or underreported income. This is a significant assessment on your account.' },
  { code: 'TC 170', label: 'Failure to File Penalty', date: 'Aug 03, 2022', type: 'assessment', amount: '$3,200', amountColor: '#EF4444', iconBg: '#FEF2F2', iconColor: '#EF4444', codeBg: '#FEF2F2', codeColor: '#EF4444', badge: { label: 'Penalty', bg: '#FEF2F2', color: '#EF4444' }, detail: 'Penalty for failing to file your tax return on time. Accrues at 5% per month up to 25% of unpaid tax. May be eligible for First-Time Abatement.' },
  { code: 'TC 276', label: 'Failure to Pay Penalty', date: 'Sep 15, 2022', type: 'assessment', amount: '$2,100', amountColor: '#EF4444', iconBg: '#FEF2F2', iconColor: '#EF4444', codeBg: '#FEF2F2', codeColor: '#EF4444', detail: 'Penalty for not paying your tax balance by the due date. Accrues at 0.5% per month. Rate increases to 1% if IRS issues a levy notice.' },
  { code: 'TC 360', label: 'Interest', date: 'Dec 31, 2022', type: 'assessment', amount: '$1,890', amountColor: '#D97706', iconBg: '#FFFBEB', iconColor: '#D97706', codeBg: '#FFFBEB', codeColor: '#D97706', detail: 'Interest accrued on your unpaid tax balance. The IRS charges interest at the federal short-term rate plus 3%, compounded daily.' },
]

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Assessments', value: 'assessment' },
  { label: 'Payments', value: 'payment' },
  { label: 'Status', value: 'status' },
]

export default function TranscriptCodesPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = codes.filter((c) => filter === 'all' || c.type === filter)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-3.5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/cases"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E8F0] bg-[#FAFAFF] text-[#5C5C7A] transition hover:bg-[#F0F0F5]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Transcript Codes</h1>
          <div className="w-9" />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto py-0.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-[7px] text-[0.72rem] font-semibold transition ${
                filter === f.value
                  ? 'border-[#1A1A2E] bg-[#1A1A2E] text-white shadow-sm'
                  : 'border-[#E8E8F0] bg-white text-[#5C5C7A] hover:border-[#1A1A2E] hover:bg-[#EFF4FF] hover:text-[#1A1A2E]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Code List */}
        <div className="overflow-hidden rounded-[18px] border border-[#E8E8F0] bg-white shadow-sm">
          {filtered.map((c, i) => (
            <div
              key={c.code}
              className={`cursor-pointer transition hover:bg-[#FAFAFF] ${i < filtered.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ backgroundColor: c.iconBg }}>
                  <svg className="h-3.5 w-3.5" style={{ color: c.iconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {c.type === 'status' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {c.type === 'payment' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {c.type === 'assessment' && c.amountColor === '#D97706' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                    {c.type === 'assessment' && c.amountColor === '#EF4444' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="rounded-md px-[7px] py-0.5 text-[0.72rem] font-extrabold" style={{ backgroundColor: c.codeBg, color: c.codeColor }}>{c.code}</span>
                    <span className="text-[0.82rem] font-bold text-[#1A1A2E]">{c.label}</span>
                  </div>
                  <div className="text-[0.68rem] text-[#8585A0]">{c.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  {c.badge && (
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.62rem] font-bold" style={{ backgroundColor: c.badge.bg, color: c.badge.color }}>
                      {c.badge.label}
                    </span>
                  )}
                  {c.amount && <span className="text-[0.82rem] font-extrabold" style={{ color: c.amountColor }}>{c.amount}</span>}
                  <svg className={`h-2.5 w-2.5 text-[#B0B0C8] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-hidden transition-all ${openIndex === i ? 'max-h-32 pb-3.5 pt-2.5' : 'max-h-0'}`}>
                <div className="pl-[46px] pr-4 text-[0.72rem] leading-relaxed text-[#5C5C7A]">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-center gap-4 rounded-[14px] border border-[#E8E8F0] bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#EF4444]" />
            <span className="text-[0.7rem] font-semibold text-[#5C5C7A]">6 assessments</span>
          </div>
          <div className="h-4 w-px bg-[#D5D5E0]" />
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#D97706]" />
            <span className="text-[0.7rem] font-semibold text-[#5C5C7A]">2 penalties</span>
          </div>
          <div className="h-4 w-px bg-[#D5D5E0]" />
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-sm bg-[#10B981]" />
            <span className="text-[0.7rem] font-semibold text-[#5C5C7A]">1 credit</span>
          </div>
        </div>
      </div>
    </div>
  )
}
