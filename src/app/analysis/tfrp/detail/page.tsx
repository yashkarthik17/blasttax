'use client'

import { useRouter } from 'next/navigation'

const RESOLUTION_OPTIONS = [
  { num: 1, title: 'Dispute TFRP', description: 'Appeal within 60 days of Letter 1153' },
  { num: 2, title: 'Pay and Claim Refund', description: 'Pay partial amount, then file Form 843' },
  { num: 3, title: 'Installment Agreement', description: 'IA on personal 1040 account' },
  { num: 4, title: 'Offer in Compromise', description: 'Include TFRP in your Offer' },
]

export default function TFRPDetailPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">Trust Fund Recovery Penalty</span>
          <div className="w-10" />
        </div>

        <div className="px-5 py-5 pb-32">
          {/* Title */}
          <div className="mb-1.5">
            <h1 className="text-xl font-extrabold text-[#E63946] leading-snug">Personal Liability for Payroll Taxes</h1>
          </div>

          {/* Warning Card */}
          <div className="rounded-2xl bg-[#FFF0F1] border-[1.5px] border-[#FECACA] p-4 mb-[18px]">
            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E63946]">
                <i className="fa-solid fa-triangle-exclamation text-white text-sm" />
              </div>
              <p className="text-[13px] text-[#0A1628] font-semibold leading-relaxed">TFRP makes you <span className="text-[#E63946] font-extrabold">PERSONALLY</span> liable for the trust fund portion of unpaid payroll taxes</p>
            </div>
          </div>

          {/* What Is Trust Fund */}
          <div className="rounded-2xl bg-white border-[1.5px] border-[#F1F5F9] p-4 mb-3.5">
            <div className="flex items-center gap-2 mb-2.5">
              <i className="fa-solid fa-vault text-[#0A1628] text-sm" />
              <span className="text-[13px] font-bold text-[#0A1628]">What Is Trust Fund?</span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">The employee&apos;s share of Social Security, Medicare, and withheld income tax &mdash; money held <em>in trust</em> for the government.</p>
          </div>

          {/* TC 246 Indicator */}
          <div className="rounded-2xl bg-[#FFFBFB] border-[1.5px] border-[rgba(230,57,70,0.2)] p-4 mb-[18px]">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF0F1] px-2.5 py-1 text-[11px] font-bold text-[#E63946] font-mono">TC 246</span>
              <p className="text-xs text-[#0A1628] font-medium">This TC on your personal transcript means TFRP has been assessed</p>
            </div>
          </div>

          {/* Responsible Person Determination */}
          <h2 className="text-[15px] font-bold text-[#0A1628] mb-1.5">Responsible Person Determination</h2>
          <div className="rounded-2xl bg-white border-[1.5px] border-[#F1F5F9] p-4 mb-3.5">
            <div className="mb-3">
              <p className="text-xs font-bold text-[#0A1628] mb-1.5">Who qualifies:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: 'fa-user-tie', label: 'Officers' },
                  { icon: 'fa-users', label: 'Directors' },
                  { icon: 'fa-pen-fancy', label: 'Check-signing authority' },
                ].map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#F8FAFC] border border-[#F1F5F9] px-3 py-1.5 text-xs font-semibold">
                    <i className={`fa-solid ${p.icon} text-[11px] text-[#0A1628]`} /> {p.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-[10px] bg-[#F8FAFC] p-2.5 mb-2.5">
              <i className="fa-solid fa-clipboard-question text-[13px] text-[#7C3AED] mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0A1628] mb-0.5">Form 4180 Interview</p>
                <p className="text-[11px] text-[#64748B]">The IRS interviews potential responsible persons to determine liability</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-[#FFFBEB] p-2">
              <i className="fa-solid fa-users-gear text-xs text-[#F5A623]" />
              <p className="text-[11px] text-[#0A1628] font-medium">Multiple responsible persons may be assessed</p>
            </div>
          </div>

          {/* TFRP Calculation */}
          <h2 className="text-[15px] font-bold text-[#0A1628] mb-1.5">TFRP Calculation</h2>
          <div className="rounded-2xl bg-white border-[1.5px] border-[rgba(0,61,165,0.15)] p-4 mb-[18px]">
            {[
              { label: 'Gross Payroll Taxes', value: '$120,000', bold: true },
              { label: 'Employee Share (Trust Fund)', value: '$60,000', bold: false },
              { label: 'Employer Share (Non-Trust)', value: '$60,000', muted: true },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#F1F5F9] last:border-0">
                <span className="text-xs text-[#64748B]">{row.label}</span>
                <span className={`text-[13px] ${row.bold ? 'font-bold text-[#0A1628]' : row.muted ? 'font-semibold text-[#64748B]' : 'font-semibold text-[#0A1628]'}`}>{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-[#0A1628]">
              <span className="text-[13px] font-extrabold text-[#E63946]">YOUR TFRP LIABILITY</span>
              <span className="text-lg font-extrabold text-[#E63946]">$60,000</span>
            </div>
          </div>

          {/* Resolution Options */}
          <h2 className="text-[15px] font-bold text-[#0A1628] mb-2.5">Resolution Options for TFRP</h2>
          <div className="flex flex-col gap-2.5 mb-[18px]">
            {RESOLUTION_OPTIONS.map((opt) => (
              <div key={opt.num} className="flex items-start gap-3 rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-3.5 cursor-pointer transition-all hover:border-[rgba(0,61,165,0.25)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EBF0FF] text-xs font-bold text-[#0A1628]">{opt.num}</div>
                <div>
                  <p className="text-[13px] font-bold text-[#0A1628] mb-0.5">{opt.title}</p>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">{opt.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bankruptcy Warning */}
          <div className="rounded-2xl bg-[#FFF0F1] border-[1.5px] border-[#FECACA] p-4 mb-5">
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-ban text-[#E63946] text-base" />
              <p className="text-[13px] font-bold text-[#E63946]">TFRP is NOT dischargeable in bankruptcy</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-white px-5 py-4 pb-7 border-t border-[#F1F5F9]">
          <div className="mx-auto max-w-md">
            <button
              onClick={() => router.push('/analysis/tfrp/persons')}
              className="flex w-full h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#E63946] text-[15px] font-bold text-white"
            >
              <i className="fa-solid fa-gavel" /> Dispute TFRP
            </button>
            <p className="text-center mt-2.5">
              <a href="#" className="text-[13px] text-[#0A1628] font-semibold">Talk to Expert <i className="fa-solid fa-arrow-right text-[10px]" /></a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
