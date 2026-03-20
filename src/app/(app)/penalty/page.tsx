'use client'

import { useRouter } from 'next/navigation'

export default function PenaltyReliefPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Penalty Relief</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-4 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F1] px-3 py-1 text-[0.65rem] font-bold text-[#E63946] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 3.5L12 2L5.5 3.5L4 10l8 12 8-12-1.5-6.5z" /></svg>
            PENALTY REDUCTION
          </span>
          <h1 className="text-[1.35rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">
            Reduce Your Tax Penalties
          </h1>
        </div>

        {/* Penalty Totals Card */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3.5">Current Penalties</div>

          {/* Penalty row 1 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#FEF2F2]">
                <svg className="h-3 w-3 text-[#EF4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/><path d="M8 12h8v2H8zm0 4h5v2H8z" opacity=".5"/></svg>
              </div>
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Failure to File</div>
                <div className="text-[0.68rem] text-[#94A3B8]">IRC 6651(a)(1)</div>
              </div>
            </div>
            <div className="text-[0.9rem] font-extrabold text-[#EF4444]">$3,200</div>
          </div>

          {/* Penalty row 2 */}
          <div className="flex items-center justify-between py-2.5 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#FEF2F2]">
                <svg className="h-3 w-3 text-[#EF4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Failure to Pay</div>
                <div className="text-[0.68rem] text-[#94A3B8]">IRC 6651(a)(2)</div>
              </div>
            </div>
            <div className="text-[0.9rem] font-extrabold text-[#EF4444]">$2,100</div>
          </div>

          {/* Total row */}
          <div className="flex items-center justify-between pt-3 pb-0.5">
            <div className="text-[0.85rem] font-bold text-[#0A1628]">Total Penalties</div>
            <div className="text-[1.15rem] font-black text-[#E63946] tracking-tight">$5,300</div>
          </div>
        </div>

        {/* Section Label */}
        <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider px-1 mt-0.5">
          Relief Strategies
        </div>

        {/* Strategy Card 1: FTA (Recommended) */}
        <div className="rounded-[18px] border-2 border-[#0A1628] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)] relative transition-all hover:-translate-y-0.5">
          <div className="h-1 bg-[#0A1628]" />
          <div className="p-[18px]">
            {/* Title row */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EBF0FF]">
                  <svg className="h-4 w-4 text-[#0A1628]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 15l-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z"/></svg>
                </div>
                <div>
                  <div className="text-[0.92rem] font-extrabold text-[#0A1628]">First-Time Abatement</div>
                  <div className="text-[0.68rem] text-[#94A3B8] mt-px">Administrative waiver</div>
                </div>
              </div>
              <div className="rounded-lg bg-[#0A1628] px-2.5 py-1 text-[0.6rem] font-extrabold text-white uppercase tracking-wider">
                Recommended
              </div>
            </div>

            {/* Eligibility checklist */}
            <div className="rounded-xl bg-[#F8FAFC] p-3 px-3.5 mb-3.5">
              <div className="text-[0.7rem] font-bold text-[#64748B] uppercase tracking-wide mb-2">Eligibility Check</div>
              {[
                'No prior penalties in last 3 years',
                'All required returns filed',
                'Current on payment agreement (or paid)',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#00A651] shrink-0">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[0.78rem] font-medium text-[#0A1628]">{item}</span>
                </div>
              ))}
            </div>

            {/* Estimated savings */}
            <div className="flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-3 mb-3.5">
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z"/></svg>
                <span className="text-[0.78rem] font-semibold text-[#065F46]">Estimated Savings</span>
              </div>
              <span className="text-[1.05rem] font-black text-[#10B981]">$5,300</span>
            </div>

            {/* Apply button */}
            <button className="w-full rounded-full bg-[#00A651] py-3.5 text-center text-white text-[0.85rem] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]">
              <svg className="inline-block h-3 w-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              Apply for FTA
            </button>
          </div>
        </div>

        {/* Strategy Card 2: Reasonable Cause */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
              <svg className="h-4 w-4 text-[#7C3AED]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
            </div>
            <div>
              <div className="text-[0.92rem] font-extrabold text-[#0A1628]">Reasonable Cause</div>
              <div className="text-[0.68rem] text-[#94A3B8] mt-px">Circumstance-based relief</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[0.78rem] text-[#64748B] leading-relaxed mb-3.5">
            If you can demonstrate that your failure to file or pay was due to circumstances beyond your control, the IRS may abate your penalties.
          </p>

          {/* Qualifying reasons */}
          <div className="rounded-xl bg-[#F8FAFC] p-3 px-3.5 mb-3.5">
            <div className="text-[0.7rem] font-bold text-[#64748B] uppercase tracking-wide mb-2">Qualifying Reasons</div>
            {[
              { icon: 'M19 8C19 12.4183 15.4183 16 12 16C8.58172 16 5 12.4183 5 8C5 3.58172 8.58172 0 12 0C15.4183 0 19 3.58172 19 8Z', label: 'Serious illness or incapacitation' },
              { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3', label: 'Natural disaster or casualty' },
              { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Death of immediate family member' },
              { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Inability to obtain records' },
              { icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Erroneous advice from tax professional' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 py-1.5">
                <svg className="h-3 w-3 text-[#7C3AED] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-[0.75rem] text-[#0A1628] font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Apply button */}
          <button className="w-full rounded-full border-[1.5px] border-[#E2E8F0] bg-white py-3.5 text-center text-[#64748B] text-[0.85rem] font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97]">
            <svg className="inline-block h-3 w-3 mr-1.5 text-[#7C3AED]" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg>
            Apply for Reasonable Cause
          </button>
        </div>

        {/* Continue Button */}
        <div className="mt-1">
          <button className="w-full flex items-center justify-center gap-2 rounded-full bg-[#0A1628] py-4 px-7 text-white text-[0.9rem] font-bold transition-all hover:opacity-90">
            Continue
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
