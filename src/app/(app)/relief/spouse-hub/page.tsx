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
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F3F4F6] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
            <i className="fas fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Spouse Relief</div>
          <div className="w-9" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-8 pt-2">
          {/* Heading */}
          <div>
            <h1 className="text-[1.25rem] font-extrabold leading-tight tracking-tight text-[#0A1628]">Spouse Tax Relief</h1>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-[#94A3B8]">Choose the type of relief that fits your situation</p>
          </div>

          {/* Innocent Spouse Card */}
          <Link
            href="/forms/form-8857"
            className="block rounded-2xl border-[1.5px] border-[#F3F4F6] bg-white p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#0A1628] hover:shadow-[0_1px_3px_rgba(10,22,40,0.06)] active:scale-[0.98]"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#F5F0FF]">
                <i className="fas fa-shield-heart text-xl text-[#7C3AED]" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Innocent Spouse</span>
                  <span className="inline-flex rounded-full bg-[#F5F0FF] px-2 py-0.5 text-[0.58rem] font-bold text-[#7C3AED]">FORM 8857</span>
                </div>
                <p className="text-[0.78rem] leading-relaxed text-[#64748B]">
                  Request relief from joint tax liability caused by your spouse&apos;s errors or omissions on a joint return.
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-[0.72rem] font-semibold text-[#2563EB]">Get started</span>
                  <i className="fas fa-arrow-right text-[10px] text-[#2563EB]" />
                </div>
              </div>
            </div>
          </Link>

          {/* Injured Spouse Card */}
          <Link
            href="#"
            className="block rounded-2xl border-[1.5px] border-[#F3F4F6] bg-white p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#0A1628] hover:shadow-[0_1px_3px_rgba(10,22,40,0.06)] active:scale-[0.98]"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#FFF0F1]">
                <i className="fas fa-hand-holding-heart text-xl text-[#E63946]" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[0.92rem] font-extrabold text-[#0A1628]">Injured Spouse</span>
                  <span className="inline-flex rounded-full bg-[#FFF0F1] px-2 py-0.5 text-[0.58rem] font-bold text-[#E63946]">FORM 8379</span>
                </div>
                <p className="text-[0.78rem] leading-relaxed text-[#64748B]">
                  Claim your share of a joint refund that was offset by your spouse&apos;s prior debt (child support, student loans, back taxes).
                </p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-[0.72rem] font-semibold text-[#2563EB]">Get started</span>
                  <i className="fas fa-arrow-right text-[10px] text-[#2563EB]" />
                </div>
              </div>
            </div>
          </Link>

          {/* "Which do I need?" Expandable */}
          <div
            className={`overflow-hidden rounded-[14px] border bg-white transition ${comparisonOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.15)]'}`}
          >
            <button
              onClick={() => setComparisonOpen(!comparisonOpen)}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#EBF0FF]">
                  <i className="fas fa-circle-question text-xs text-[#2563EB]" />
                </div>
                <span className="text-[0.85rem] font-bold text-[#0A1628]">Which do I need?</span>
              </div>
              <i className={`fas fa-chevron-down text-[11px] text-[#CBD5E1] transition-transform ${comparisonOpen ? 'rotate-180' : ''}`} />
            </button>

            {comparisonOpen && (
              <div className="px-4 pb-4">
                <div className="mb-3.5 flex flex-col gap-2.5">
                  <div className="rounded-[10px] bg-[#F5F0FF] px-3 py-2.5">
                    <div className="mb-0.5 text-[0.72rem] font-bold text-[#7C3AED]">Innocent Spouse</div>
                    <div className="text-[0.72rem] leading-relaxed text-[#64748B]">You were wrongly assessed tax due to your spouse&apos;s actions &mdash; underreported income, false deductions, or fraud on a joint return.</div>
                  </div>
                  <div className="rounded-[10px] bg-[#FFF0F1] px-3 py-2.5">
                    <div className="mb-0.5 text-[0.72rem] font-bold text-[#E63946]">Injured Spouse</div>
                    <div className="text-[0.72rem] leading-relaxed text-[#64748B]">Your share of a joint refund was taken (offset) to pay your spouse&apos;s separate debt &mdash; past-due child support, federal student loans, or prior-year taxes.</div>
                  </div>
                  <div className="rounded-[10px] bg-[#F0FDFA] px-3 py-2.5">
                    <div className="mb-0.5 text-[0.72rem] font-bold text-[#0D9488]">Equitable Relief</div>
                    <div className="text-[0.72rem] leading-relaxed text-[#64748B]">A catch-all when you don&apos;t qualify for innocent or injured spouse. Available when it would be inequitable to hold you liable. Filed via Form 8857.</div>
                  </div>
                </div>

                <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Key Differences</div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-[#F1F5F9] p-1.5 text-left text-[0.62rem] font-bold uppercase tracking-wider text-[#94A3B8]" style={{ width: '28%' }} />
                      <th className="border-b border-[#F1F5F9] p-1.5 text-left text-[0.62rem] font-bold uppercase tracking-wider text-[#94A3B8]" style={{ width: '36%' }}>Innocent</th>
                      <th className="border-b border-[#F1F5F9] p-1.5 text-left text-[0.62rem] font-bold uppercase tracking-wider text-[#94A3B8]" style={{ width: '36%' }}>Injured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DIFF_ROWS.map((row) => (
                      <tr key={row.label} className="border-b border-[#F8FAFC] last:border-b-0">
                        <td className="p-1.5 align-top text-[0.72rem] font-semibold leading-snug text-[#0A1628]">{row.label}</td>
                        <td className="p-1.5 align-top text-[0.72rem] leading-snug text-[#64748B]">{row.innocent}</td>
                        <td className="p-1.5 align-top text-[0.72rem] leading-snug text-[#64748B]">{row.injured}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Not sure? CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-5 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <i className="fas fa-headset text-lg text-white" />
            </div>
            <div className="mb-1 text-[0.92rem] font-extrabold text-white">Not sure which you need?</div>
            <p className="mb-3.5 text-[0.75rem] leading-relaxed text-white/60">
              Our tax experts can review your situation and recommend the right path forward.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-[#00A651] px-6 py-3 text-[0.82rem] font-bold text-white no-underline transition hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <i className="fas fa-message text-xs" /> Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
