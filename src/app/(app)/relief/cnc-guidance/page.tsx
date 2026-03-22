'use client'

import { useRouter } from 'next/navigation'

const BENEFITS = [
  { title: 'IRS stops active collection', desc: 'No more levies, liens, or wage garnishments', type: 'benefit' as const },
  { title: 'CSED continues to run', desc: 'Your tax debt can expire after the statute expires', type: 'benefit' as const },
]

const WARNINGS = [
  { title: 'Interest and penalties continue', desc: 'Your balance may grow while in CNC' },
  { title: 'IRS may review annually', desc: 'Requires Form 433-F to verify continued eligibility' },
  { title: 'Tax refunds may be offset', desc: 'Future refunds can be applied to your balance' },
]

const COMPARISON = [
  { label: 'Monthly payment', cnc: '$0', ia: '$500+', oic: 'Varies', cncHighlight: true },
  { label: 'Stops collection', cnc: true, ia: true, oic: true },
  { label: 'Debt reduced', cnc: false, ia: false, oic: true },
  { label: 'Debt can expire', cnc: true, ia: false, oic: 'N/A' },
  { label: 'Financial review', cnc: 'Annual', ia: 'None', oic: 'Upfront' },
]

export default function CNCGuidancePage() {
  const router = useRouter()

  const renderCell = (value: boolean | string, isHighlight?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg className="h-3 w-3 text-[#00A651] mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      ) : (
        <svg className="h-3 w-3 text-[#E63946] mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
      )
    }
    return (
      <span className={isHighlight ? 'text-[#00A651] font-bold' : ''}>
        {value}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D5D5E0] bg-[#FAFAFF] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#1A1A2E]">Currently Not Collectible</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-[18px] px-5 pb-10">
        {/* Heading */}
        <h1 className="text-[1.25rem] font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
          Understanding CNC Status
        </h1>

        {/* Explanation Card */}
        <div className="rounded-2xl border border-[rgba(0,61,165,0.1)] bg-white p-[18px]">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(0,61,165,0.1)] shrink-0">
              <svg className="h-4 w-4 text-[#1A1A2E]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <p className="text-[0.82rem] text-[#1A1A2E] leading-relaxed font-medium">
              When your monthly disposable income (MDI) is <strong className="text-[#1A1A2E]">$0 or below</strong>, the IRS may classify your account as Currently Not Collectible &mdash; pausing all active collection efforts.
            </p>
          </div>
        </div>

        {/* Your Eligibility */}
        <div>
          <div className="text-[0.75rem] font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5">Your Eligibility</div>
          <div className="rounded-2xl border-[1.5px] border-[#00A651] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {/* Qualifying badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00A651]">
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-[#00A651]">You Qualify</div>
                <div className="text-[0.7rem] text-[#8585A0]">Based on your financial analysis</div>
              </div>
            </div>

            {/* MDI */}
            <div className="flex items-center justify-between py-3 border-t border-[#F0F0F5]">
              <span className="text-[0.82rem] font-semibold text-[#5C5C7A]">Monthly Disposable Income</span>
              <span className="text-[1.1rem] font-black text-[#00A651]">$0</span>
            </div>

            {/* Income */}
            <div className="flex items-center justify-between py-3 border-t border-[#F0F0F5]">
              <span className="text-[0.82rem] font-semibold text-[#5C5C7A]">Monthly Income</span>
              <span className="text-[0.88rem] font-bold text-[#1A1A2E]">$4,700</span>
            </div>

            {/* Expenses */}
            <div className="flex items-center justify-between py-3 border-t border-[#F0F0F5]">
              <span className="text-[0.82rem] font-semibold text-[#5C5C7A]">IRS Allowable Expenses</span>
              <span className="text-[0.88rem] font-bold text-[#1A1A2E]">$4,700</span>
            </div>
          </div>
        </div>

        {/* What Happens with CNC */}
        <div>
          <div className="text-[0.75rem] font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5">What Happens with CNC</div>
          <div className="rounded-2xl border border-[#D5D5E0] bg-white p-4 flex flex-col gap-3">
            {/* Benefits */}
            {BENEFITS.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F9EE] shrink-0 mt-px">
                  <svg className="h-2.5 w-2.5 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">{item.title}</div>
                  <div className="text-[0.72rem] text-[#8585A0] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}

            <div className="h-px bg-[#F0F0F5]" />

            {/* Warnings */}
            {WARNINGS.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFFBEB] shrink-0 mt-px">
                  <svg className="h-2.5 w-2.5 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                </div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">{item.title}</div>
                  <div className="text-[0.72rem] text-[#8585A0] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div>
          <div className="text-[0.75rem] font-bold text-[#B0B0C8] uppercase tracking-wider mb-2.5">Compare Options</div>
          <div className="rounded-2xl border border-[#D5D5E0] bg-white p-1 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-[0.68rem] font-bold text-[#5C5C7A] text-left bg-[#FAFAFF] rounded-tl-xl" />
                  <th className="p-2 text-[0.68rem] font-bold text-[#1A1A2E] text-center bg-[#EBF0FF]">CNC</th>
                  <th className="p-2 text-[0.68rem] font-bold text-[#5C5C7A] text-center bg-[#FAFAFF]">IA</th>
                  <th className="p-2 text-[0.68rem] font-bold text-[#5C5C7A] text-center bg-[#FAFAFF] rounded-tr-xl">OIC</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-[#F0F0F5] last:border-b-0">
                    <td className="p-2 text-[0.68rem] font-semibold text-[#1A1A2E] text-left">{row.label}</td>
                    <td className="p-2 text-[0.68rem] font-medium text-[#1A1A2E] text-center">
                      {renderCell(row.cnc, row.cncHighlight)}
                    </td>
                    <td className="p-2 text-[0.68rem] font-medium text-[#1A1A2E] text-center">
                      {renderCell(row.ia)}
                    </td>
                    <td className="p-2 text-[0.68rem] font-medium text-[#1A1A2E] text-center">
                      {renderCell(row.oic)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col gap-3 pt-1">
          <button className="w-full rounded-full bg-[#00A651] py-4 text-center text-white text-[0.88rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            Apply for CNC Status
            <svg className="inline-block h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => router.back()}
            className="w-full py-3 text-center text-[#8585A0] text-[0.82rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <svg className="inline-block h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Options
          </button>
        </div>
      </div>
    </div>
  )
}
