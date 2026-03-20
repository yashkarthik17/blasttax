'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DIFF_ROWS = [
  { label: 'IRS Form', innocent: '8857', injured: '8379' },
  { label: 'Issue', innocent: 'Spouse caused wrong tax amount', injured: "Refund taken for spouse's debt" },
  { label: 'Relief Type', innocent: 'Remove liability from you', injured: 'Refund your portion' },
  { label: 'Deadline', innocent: 'Generally 2 years from first collection', injured: 'File with return or within 3 years' },
  { label: 'Knowledge', innocent: "Must show you didn't know of errors", injured: 'No knowledge requirement' },
]

export default function SpouseReliefHubPage() {
  const router = useRouter()
  const [comparisonOpen, setComparisonOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F3F4F6] bg-[#F8FAFC] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Spouse Relief</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8 pt-2">
        {/* Heading */}
        <div>
          <h1 className="text-[1.25rem] font-extrabold text-[#0A1628] tracking-tight leading-tight">Spouse Tax Relief</h1>
          <p className="text-[0.78rem] text-[#94A3B8] mt-1 leading-relaxed">Choose the type of relief that fits your situation</p>
        </div>

        {/* Innocent Spouse Card */}
        <Link
          href="/forms/form-8857"
          className="block rounded-2xl border-[1.5px] border-[#F3F4F6] bg-white p-5 transition-all hover:border-[#0A1628] hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98] no-underline"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F5F0FF] shrink-0">
              <svg className="h-5 w-5 text-[#7C3AED]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 15l-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z"/></svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Innocent Spouse</span>
                <span className="inline-flex rounded-full bg-[#F5F0FF] px-2 py-0.5 text-[0.58rem] font-bold text-[#7C3AED]">FORM 8857</span>
              </div>
              <p className="text-[0.78rem] text-[#64748B] leading-relaxed">
                Request relief from joint tax liability caused by your spouse&apos;s errors or omissions on a joint return.
              </p>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="text-[0.72rem] font-semibold text-[#2563EB]">Get started</span>
                <svg className="h-2.5 w-2.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Injured Spouse Card */}
        <Link
          href="#"
          className="block rounded-2xl border-[1.5px] border-[#F3F4F6] bg-white p-5 transition-all hover:border-[#0A1628] hover:-translate-y-0.5 hover:shadow-card active:scale-[0.98] no-underline"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#FFF0F1] shrink-0">
              <svg className="h-5 w-5 text-[#E63946]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Injured Spouse</span>
                <span className="inline-flex rounded-full bg-[#FFF0F1] px-2 py-0.5 text-[0.58rem] font-bold text-[#E63946]">FORM 8379</span>
              </div>
              <p className="text-[0.78rem] text-[#64748B] leading-relaxed">
                Claim your share of a joint refund that was offset by your spouse&apos;s prior debt (child support, student loans, back taxes).
              </p>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="text-[0.72rem] font-semibold text-[#2563EB]">Get started</span>
                <svg className="h-2.5 w-2.5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* "Which do I need?" Expandable */}
        <button
          onClick={() => setComparisonOpen(!comparisonOpen)}
          className={`w-full text-left rounded-[14px] border bg-white overflow-hidden transition-all ${
            comparisonOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.15)]'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3.5 select-none">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
                <svg className="h-3 w-3 text-[#2563EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
              </div>
              <span className="text-[0.85rem] font-bold text-[#0A1628]">Which do I need?</span>
            </div>
            <svg
              className={`h-3 w-3 text-[#CBD5E1] transition-transform ${comparisonOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {comparisonOpen && (
            <div className="px-4 pb-4">
              {/* Quick descriptions */}
              <div className="flex flex-col gap-2.5 mb-3.5">
                <div className="rounded-[10px] bg-[#F5F0FF] px-3 py-2.5">
                  <div className="text-[0.72rem] font-bold text-[#7C3AED] mb-0.5">Innocent Spouse</div>
                  <div className="text-[0.72rem] text-[#64748B] leading-relaxed">You were wrongly assessed tax due to your spouse&apos;s actions &mdash; underreported income, false deductions, or fraud on a joint return.</div>
                </div>
                <div className="rounded-[10px] bg-[#FFF0F1] px-3 py-2.5">
                  <div className="text-[0.72rem] font-bold text-[#E63946] mb-0.5">Injured Spouse</div>
                  <div className="text-[0.72rem] text-[#64748B] leading-relaxed">Your share of a joint refund was taken (offset) to pay your spouse&apos;s separate debt &mdash; past-due child support, federal student loans, or prior-year taxes.</div>
                </div>
                <div className="rounded-[10px] bg-[#F0FDFA] px-3 py-2.5">
                  <div className="text-[0.72rem] font-bold text-[#0D9488] mb-0.5">Equitable Relief</div>
                  <div className="text-[0.72rem] text-[#64748B] leading-relaxed">A catch-all when you don&apos;t qualify for innocent or injured spouse. Available when it would be inequitable to hold you liable. Filed via Form 8857.</div>
                </div>
              </div>

              {/* Key Differences Table */}
              <div className="text-[0.68rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-2">Key Differences</div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-1.5 text-[0.62rem] font-bold text-[#94A3B8] uppercase tracking-wider text-left border-b border-[#F1F5F9]" style={{ width: '28%' }} />
                    <th className="p-1.5 text-[0.62rem] font-bold text-[#94A3B8] uppercase tracking-wider text-left border-b border-[#F1F5F9]" style={{ width: '36%' }}>Innocent</th>
                    <th className="p-1.5 text-[0.62rem] font-bold text-[#94A3B8] uppercase tracking-wider text-left border-b border-[#F1F5F9]" style={{ width: '36%' }}>Injured</th>
                  </tr>
                </thead>
                <tbody>
                  {DIFF_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-[#F8FAFC] last:border-b-0">
                      <td className="p-1.5 text-[0.72rem] font-semibold text-[#0A1628] align-top leading-snug">{row.label}</td>
                      <td className="p-1.5 text-[0.72rem] text-[#64748B] align-top leading-snug">{row.innocent}</td>
                      <td className="p-1.5 text-[0.72rem] text-[#64748B] align-top leading-snug">{row.injured}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </button>

        {/* Not sure? CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-5 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mx-auto mb-3">
            <svg className="h-[18px] w-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="text-[0.92rem] font-extrabold text-white mb-1">Not sure which you need?</div>
          <p className="text-[0.75rem] text-white/60 leading-relaxed mb-3.5">
            Our tax experts can review your situation and recommend the right path forward.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-full bg-[#00A651] px-6 py-3 text-white text-[0.82rem] font-bold transition-all hover:-translate-y-0.5 active:scale-[0.97] no-underline"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
            Talk to an Expert
          </Link>
        </div>
      </div>
    </div>
  )
}
