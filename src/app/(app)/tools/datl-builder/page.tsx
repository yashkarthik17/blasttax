'use client'

import { useState } from 'react'
import Link from 'next/link'

const qualifyingReasons = [
  'Mathematical or clerical error by IRS',
  'Income was incorrectly attributed to me',
  'Deductions or credits were improperly disallowed',
  'Substitute for Return (SFR) was filed incorrectly',
  'Penalty was assessed in error',
  'Other assessment dispute',
]

export default function DatlBuilderPage() {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [descriptions, setDescriptions] = useState<Record<number, string>>({})
  const [activeYears, setActiveYears] = useState<Set<string>>(new Set(['2021', '2022']))
  const [amounts, setAmounts] = useState<Record<string, string>>({ '2021': '$8,200', '2022': '$5,400' })

  function toggleReason(idx: number) {
    const next = new Set(selected)
    if (next.has(idx)) {
      next.delete(idx)
    } else {
      next.add(idx)
    }
    setSelected(next)
  }

  function toggleYear(year: string) {
    const next = new Set(activeYears)
    if (next.has(year)) {
      next.delete(year)
    } else {
      next.add(year)
    }
    setActiveYears(next)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/resolution"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Doubt as to Liability</h1>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-xl font-extrabold leading-snug text-[var(--foreground)]">
            Do you believe the IRS assessed your tax incorrectly?
          </h2>
          <p className="mt-1.5 text-xs text-[#94A3B8] leading-relaxed">
            DATL allows you to dispute the amount the IRS says you owe through Form 656-L
          </p>
        </div>

        {/* Qualifying Reasons */}
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Qualifying Reasons</div>
          <div className="space-y-2">
            {qualifyingReasons.map((reason, idx) => (
              <div key={idx}>
                <button
                  onClick={() => toggleReason(idx)}
                  className={`flex w-full items-start gap-3 rounded-[14px] border-[1.5px] p-3.5 text-left transition ${
                    selected.has(idx)
                      ? 'border-[#0A1628] bg-[#EFF4FF] shadow-[0_0_0_3px_rgba(10,22,40,0.1)]'
                      : 'border-[#F3F4F6] bg-white hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  <div className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 transition ${
                    selected.has(idx) ? 'border-[#0A1628] bg-[#0A1628]' : 'border-[#E2E8F0]'
                  }`}>
                    {selected.has(idx) && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-[var(--foreground)]">{reason}</div>
                    {selected.has(idx) && (
                      <textarea
                        placeholder="Describe the error..."
                        value={descriptions[idx] || ''}
                        onChange={(e) => setDescriptions({ ...descriptions, [idx]: e.target.value })}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2.5 w-full resize-y rounded-[10px] border-[1.5px] border-[#F3F4F6] bg-white px-3 py-2.5 text-[13px] text-[var(--foreground)] outline-none transition focus:border-[#0A1628] focus:shadow-[0_0_0_3px_rgba(10,22,40,0.08)] placeholder:text-[#CBD5E1]"
                        rows={2}
                      />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Evidence */}
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Supporting Evidence</div>
          <div className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-[#F1F5F9] p-4 text-center transition hover:border-[#0A1628] hover:bg-[#EFF4FF]">
            <svg className="h-5 w-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-xs font-semibold text-[#64748B]">Upload documents</div>
            <div className="text-[11px] text-[#CBD5E1]">PDF, JPG, PNG</div>
          </div>
        </div>

        {/* Tax Years */}
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Tax Years Affected</div>
          <div className="flex flex-wrap gap-2">
            {['2020', '2021', '2022', '2023'].map((year) => (
              <button
                key={year}
                onClick={() => toggleYear(year)}
                className={`rounded-full border-[1.5px] px-4 py-2 text-[13px] font-semibold transition ${
                  activeYears.has(year)
                    ? 'border-[#0A1628] bg-[#EFF4FF] text-[#0A1628]'
                    : 'border-[#F3F4F6] bg-white text-[#64748B]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Disputed Amounts */}
        <div>
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Disputed Amount Per Year</div>
          <div className="flex gap-2.5">
            {Array.from(activeYears).sort().map((year) => (
              <div key={year} className="flex-1">
                <div className="mb-1 text-[11px] font-semibold text-[#94A3B8]">{year}</div>
                <input
                  type="text"
                  placeholder="$0"
                  value={amounts[year] || ''}
                  onChange={(e) => setAmounts({ ...amounts, [year]: e.target.value })}
                  className="w-full rounded-[10px] border-[1.5px] border-[#F3F4F6] bg-[#F8FAFC] px-3 py-2.5 text-[14px] font-semibold text-[var(--foreground)] outline-none transition focus:border-[#0A1628] focus:bg-white focus:shadow-[0_0_0_3px_rgba(10,22,40,0.08)] placeholder:font-normal placeholder:text-[#CBD5E1]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Total Bar */}
        <div className="flex items-center justify-between rounded-[14px] bg-[#0A1628] px-[18px] py-3.5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Total Disputed</span>
            <div className="mt-0.5 text-xl font-black tracking-tight text-white">$13,600</div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-white/50">via</span>
            <div className="text-[13px] font-bold text-white">Form 656-L</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-2 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-3.5 py-3">
          <svg className="h-3.5 w-3.5 shrink-0 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <span className="text-[0.78rem] text-[#1e40af]">Unlike DATC, DATL does not require a financial disclosure</span>
        </div>

        {/* Continue */}
        <div className="py-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-4 text-[15px] font-bold text-white transition hover:opacity-90">
            Continue
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
