'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEPOSIT_DATA = [
  { date: '01/15/2026', amount: '$4,250', status: 'Timely' },
  { date: '02/15/2026', amount: '$4,250', status: 'Timely' },
  { date: '03/15/2026', amount: '$0', status: 'Missing' },
]

export default function BusinessDepositsPage() {
  const router = useRouter()
  const [eftpsEnrolled, setEftpsEnrolled] = useState(false)
  const [schedule, setSchedule] = useState<'monthly' | 'semiweekly'>('monthly')
  const [nextDayRule, setNextDayRule] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '22%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 2 of 8</span>
            <span className="text-xs font-semibold text-[#2563EB]">Deposit Compliance</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight mb-1">Deposit Compliance</h1>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-3.5">Operating businesses must be current on federal tax deposits.</p>

          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FEF2F2] border border-[rgba(230,57,70,0.15)] p-3.5 mb-3.5">
            <i className="fa-solid fa-triangle-exclamation text-[#E63946]" />
            <span className="text-xs text-[#991B1B]">IRS will REJECT resolution if deposits are not current. This prevents &quot;pyramiding&quot; of new debt.</span>
          </div>

          {/* EFTPS Enrollment */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-building-columns text-xs text-[#2563EB] mr-1.5" /> EFTPS Enrollment
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={eftpsEnrolled}
                onChange={() => setEftpsEnrolled(!eftpsEnrolled)}
                className="h-5 w-9 appearance-none rounded-full bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                  checked:after:translate-x-4"
              />
              <span className="text-xs font-medium text-[#64748B]">Enrolled in EFTPS (Electronic Federal Tax Payment System)?</span>
            </label>
            <div className="text-[10.5px] text-[#64748B] mt-2 p-2 bg-[#F8FAFC] rounded-lg">If not enrolled, enroll at EFTPS.gov. PIN arrives by mail in 5-7 business days.</div>
          </div>

          {/* Depositor Schedule */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-calendar-check text-xs text-[#2563EB] mr-1.5" /> Depositor Schedule
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSchedule('monthly')}
                className={`flex-1 flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  schedule === 'monthly' ? 'bg-[#EFF4FF] border-[1.5px] border-[#2563EB] text-[#2563EB]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] text-[#64748B]'
                }`}
              >Monthly</button>
              <button
                onClick={() => setSchedule('semiweekly')}
                className={`flex-1 flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-all ${
                  schedule === 'semiweekly' ? 'bg-[#EFF4FF] border-[1.5px] border-[#2563EB] text-[#2563EB]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] text-[#64748B]'
                }`}
              >Semi-Weekly</button>
            </div>
            <div className="text-[10.5px] text-[#64748B] mt-2 p-2 bg-[#F8FAFC] rounded-lg">Based on lookback period: If total 941 tax &gt; $50,000 (Jul 1 - Jun 30 two years prior), semi-weekly depositor.</div>
          </div>

          {/* Current Quarter Deposits */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-table text-xs text-[#2563EB] mr-1.5" /> Current Quarter Deposits
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="py-2 px-2 text-left font-semibold text-[#94A3B8]">Date</th>
                  <th className="py-2 px-2 text-right font-semibold text-[#94A3B8]">Amount</th>
                  <th className="py-2 px-2 text-center font-semibold text-[#94A3B8]">Status</th>
                </tr>
              </thead>
              <tbody>
                {DEPOSIT_DATA.map((d, i) => (
                  <tr key={i} className="border-b border-[#F1F5F9] last:border-0">
                    <td className="py-2 px-2 font-semibold text-[#0A1628]">{d.date}</td>
                    <td className="py-2 px-2 text-right font-semibold text-[#0A1628]">{d.amount}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        d.status === 'Timely' ? 'bg-[#E6F9EE] text-[#00A651]' : 'bg-[#FEF2F2] text-[#E63946]'
                      }`}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 rounded-[10px] bg-[#FEF2F2] p-2.5">
              <div className="text-xs font-bold text-[#991B1B]">Deposit Shortfall: $4,250</div>
              <div className="text-[11px] text-[#991B1B] mt-0.5">March deposit missing. Must be made before resolution can proceed.</div>
            </div>
          </div>

          {/* $100K Rule */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-4">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-sm text-[#F59E0B]" />
              <div>
                <span className="text-[13px] font-bold text-[#0A1628]">$100,000 Next-Day Rule</span>
                <p className="text-[11.5px] text-[#64748B] mt-0.5">If accumulated tax reaches $100,000+ on any day, deposit must be made by the next business day (IRC 6302).</p>
              </div>
            </div>
            <label className="flex items-center gap-2 mt-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={nextDayRule}
                onChange={() => setNextDayRule(!nextDayRule)}
                className="h-5 w-9 appearance-none rounded-full bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                  checked:after:translate-x-4"
              />
              <span className="text-xs font-medium text-[#64748B]">$100,000 next-day rule applies?</span>
            </label>
          </div>

          <button
            onClick={() => router.push('/analysis/business/trust-fund')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white"
          >
            Continue <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
