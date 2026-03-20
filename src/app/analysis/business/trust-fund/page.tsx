'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

interface QuarterData {
  label: string
  incomeTax: string
  ssTax: string
  medTax: string
  addMed: string
}

export default function TrustFundPage() {
  const router = useRouter()
  const [quarters, setQuarters] = useState<QuarterData[]>([
    { label: 'Q3 2025 (941)', incomeTax: '12400', ssTax: '8200', medTax: '1920', addMed: '0' },
    { label: 'Q4 2025 (941)', incomeTax: '11800', ssTax: '7600', medTax: '1780', addMed: '0' },
  ])

  function updateField(qi: number, field: keyof QuarterData, value: string) {
    setQuarters((prev) => prev.map((q, i) => i === qi ? { ...q, [field]: value } : q))
  }

  const totals = useMemo(() => {
    let tf = 0, ntf = 0
    quarters.forEach((q) => {
      const it = parseFloat(q.incomeTax) || 0
      const ss = parseFloat(q.ssTax) || 0
      const med = parseFloat(q.medTax) || 0
      const am = parseFloat(q.addMed) || 0
      tf += it + ss / 2 + med / 2 + am
      ntf += ss / 2 + med / 2
    })
    const total = tf + ntf
    return { tf, ntf, pct: total > 0 ? Math.round((tf / total) * 100) : 0 }
  }, [quarters])

  const fmt = (n: number) => '$' + n.toLocaleString()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '30%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 3 of 8</span>
            <span className="text-xs font-semibold text-[#2563EB]">Trust Fund Split</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight mb-1">Trust Fund vs Non-Trust Fund</h1>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-3.5">This is the most critical classification in business tax resolution. Trust fund = personal liability via TFRP.</p>

          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FFFBEB] border border-[rgba(245,166,35,0.2)] p-3.5 mb-3.5">
            <i className="fa-solid fa-piggy-bank text-[#D97706]" />
            <span className="text-xs text-[#92400E]">Always designate payments to trust fund first. Undesignated payments go to non-trust fund (benefits IRS, not you).</span>
          </div>

          {/* Quarter Cards */}
          {quarters.map((q, qi) => (
            <div key={qi} className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
              <div className="text-sm font-bold text-[#0A1628] mb-2">
                <i className="fa-solid fa-calculator text-xs text-[#2563EB] mr-1.5" /> {q.label}
              </div>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Line 3: Income Tax Withheld</label>
                  <input type="text" value={q.incomeTax} onChange={(e) => updateField(qi, 'incomeTax', e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                  <div className="text-[9px] text-[#00A651] font-semibold mt-0.5">100% Trust Fund</div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Line 5a: Social Security Tax</label>
                    <input type="text" value={q.ssTax} onChange={(e) => updateField(qi, 'ssTax', e.target.value)}
                      className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                    <div className="text-[9px] text-[#F59E0B] font-semibold mt-0.5">50/50 Split</div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Line 5c: Medicare Tax</label>
                    <input type="text" value={q.medTax} onChange={(e) => updateField(qi, 'medTax', e.target.value)}
                      className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                    <div className="text-[9px] text-[#F59E0B] font-semibold mt-0.5">50/50 Split</div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Line 5d: Additional Medicare</label>
                  <input type="text" value={q.addMed} onChange={(e) => updateField(qi, 'addMed', e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                  <div className="text-[9px] text-[#00A651] font-semibold mt-0.5">100% Trust Fund</div>
                </div>
              </div>
            </div>
          ))}

          {/* Summary Bar */}
          <div className="rounded-[14px] bg-[#0A1628] p-4 flex items-center justify-between mt-4">
            <div>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.06em]">Total Trust Fund</span>
              <div className="text-[1.3rem] font-black text-[#10B981] tracking-tight mt-0.5">{fmt(totals.tf)}</div>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-semibold text-white/50 uppercase">Non-Trust Fund</span>
              <div className="text-[1.1rem] font-extrabold text-white">{fmt(totals.ntf)}</div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-white/50">TF %</span>
              <div className="text-[1.1rem] font-extrabold text-white">{totals.pct}%</div>
            </div>
          </div>

          {/* TFRP Exposure */}
          <div className="mt-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] p-3">
            <div className="text-xs font-bold text-[#991B1B]">
              <i className="fa-solid fa-user-shield text-[11px] mr-1" /> TFRP Exposure
            </div>
            <div className="text-[11.5px] text-[#991B1B] mt-1">Each responsible person is personally liable for the full {fmt(totals.tf)} trust fund amount. This is separate from the business debt.</div>
          </div>

          <button
            onClick={() => router.push('/analysis/business/results')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white mt-5"
          >
            Continue <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
