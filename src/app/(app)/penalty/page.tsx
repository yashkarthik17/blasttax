'use client'

import { useRouter } from 'next/navigation'

export default function PenaltyReliefPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
            <i className="fas fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Penalty Relief</div>
          <div className="w-9" />
        </div>

        <div className="flex flex-col gap-4 px-5 pb-8">
          {/* Heading */}
          <div className="py-1 text-center">
            <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F1] px-3 py-1 text-[0.65rem] font-bold text-[#E63946]">
              <i className="fas fa-percent text-[9px]" /> PENALTY REDUCTION
            </span>
            <h1 className="text-[1.35rem] font-extrabold leading-tight tracking-tight text-[#0A1628]">
              Reduce Your Tax Penalties
            </h1>
          </div>

          {/* Penalty Totals Card */}
          <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="mb-3.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Current Penalties</div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#FEF2F2]">
                  <i className="fas fa-file-circle-xmark text-xs text-[#EF4444]" />
                </div>
                <div>
                  <div className="text-[0.82rem] font-semibold text-[#0A1628]">Failure to File</div>
                  <div className="text-[0.68rem] text-[#94A3B8]">IRC 6651(a)(1)</div>
                </div>
              </div>
              <div className="text-[0.9rem] font-extrabold text-[#EF4444]">$3,200</div>
            </div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#FEF2F2]">
                  <i className="fas fa-hand-holding-dollar text-xs text-[#EF4444]" />
                </div>
                <div>
                  <div className="text-[0.82rem] font-semibold text-[#0A1628]">Failure to Pay</div>
                  <div className="text-[0.68rem] text-[#94A3B8]">IRC 6651(a)(2)</div>
                </div>
              </div>
              <div className="text-[0.9rem] font-extrabold text-[#EF4444]">$2,100</div>
            </div>
            <div className="flex items-center justify-between pb-0.5 pt-3">
              <div className="text-[0.85rem] font-bold text-[#0A1628]">Total Penalties</div>
              <div className="text-[1.15rem] font-black tracking-tight text-[#E63946]">$5,300</div>
            </div>
          </div>

          {/* Section Label */}
          <div className="mt-0.5 px-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Relief Strategies</div>

          {/* Strategy Card 1: FTA (Recommended) */}
          <div className="relative overflow-hidden rounded-[18px] border-2 border-[#0A1628] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5">
            <div className="h-1 bg-[#0A1628]" />
            <div className="p-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EBF0FF]">
                    <i className="fas fa-shield-halved text-base text-[#0A1628]" />
                  </div>
                  <div>
                    <div className="text-[0.92rem] font-extrabold text-[#0A1628]">First-Time Abatement</div>
                    <div className="mt-px text-[0.68rem] text-[#94A3B8]">Administrative waiver</div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#0A1628] px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wider text-white">
                  Recommended
                </div>
              </div>

              <div className="mb-3.5 rounded-xl bg-[#F8FAFC] p-3 px-3.5">
                <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-wide text-[#64748B]">Eligibility Check</div>
                {['No prior penalties in last 3 years', 'All required returns filed', 'Current on payment agreement (or paid)'].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#00A651]">
                      <i className="fas fa-check text-[10px] text-white" />
                    </div>
                    <span className="text-[0.78rem] font-medium text-[#0A1628]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mb-3.5 flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-3">
                <div className="flex items-center gap-1.5">
                  <i className="fas fa-piggy-bank text-[13px] text-[#10B981]" />
                  <span className="text-[0.78rem] font-semibold text-[#065F46]">Estimated Savings</span>
                </div>
                <span className="text-[1.05rem] font-black text-[#10B981]">$5,300</span>
              </div>

              <button className="w-full rounded-full bg-[#00A651] py-3.5 text-center text-[0.85rem] font-bold text-white transition hover:-translate-y-0.5 active:scale-[0.97]">
                <i className="fas fa-paper-plane mr-1.5 text-xs" /> Apply for FTA
              </button>
            </div>
          </div>

          {/* Strategy Card 2: Reasonable Cause */}
          <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5">
            <div className="mb-3.5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F5F0FF]">
                <i className="fas fa-scale-balanced text-base text-[#7C3AED]" />
              </div>
              <div>
                <div className="text-[0.92rem] font-extrabold text-[#0A1628]">Reasonable Cause</div>
                <div className="mt-px text-[0.68rem] text-[#94A3B8]">Circumstance-based relief</div>
              </div>
            </div>

            <p className="mb-3.5 text-[0.78rem] leading-relaxed text-[#64748B]">
              If you can demonstrate that your failure to file or pay was due to circumstances beyond your control, the IRS may abate your penalties.
            </p>

            <div className="mb-3.5 rounded-xl bg-[#F8FAFC] p-3 px-3.5">
              <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-wide text-[#64748B]">Qualifying Reasons</div>
              {[
                { icon: 'fa-hospital', label: 'Serious illness or incapacitation' },
                { icon: 'fa-house-crack', label: 'Natural disaster or casualty' },
                { icon: 'fa-user-slash', label: 'Death of immediate family member' },
                { icon: 'fa-file-circle-question', label: 'Inability to obtain records' },
                { icon: 'fa-user-tie', label: 'Erroneous advice from tax professional' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 py-1.5">
                  <i className={`fas ${item.icon} text-[11px] text-[#7C3AED]`} />
                  <span className="text-[0.75rem] font-medium text-[#0A1628]">{item.label}</span>
                </div>
              ))}
            </div>

            <button className="w-full rounded-full border-[1.5px] border-[#E2E8F0] bg-white py-3.5 text-center text-[0.85rem] font-semibold text-[#64748B] transition hover:-translate-y-0.5 active:scale-[0.97]">
              <i className="fas fa-file-pen mr-1.5 text-xs text-[#7C3AED]" /> Apply for Reasonable Cause
            </button>
          </div>

          {/* Continue Button */}
          <div className="mt-1">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:opacity-90">
              Continue
              <i className="fas fa-arrow-right text-[13px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
