'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEBT_TYPES = [
  { id: '941', label: '941 Employment Tax', sub: 'Most common business tax debt' },
  { id: '940', label: '940 Federal Unemployment Tax', sub: '' },
  { id: '720', label: '720 Excise Tax', sub: '' },
  { id: '1120', label: '1120 Corporate Income Tax', sub: '' },
]

export default function BusinessScreeningPage() {
  const router = useRouter()
  const [operating, setOperating] = useState<boolean | null>(null)
  const [debtTypes, setDebtTypes] = useState<string[]>([])
  const [hasTFRP, setHasTFRP] = useState<boolean | null>(null)
  const [employeeCount, setEmployeeCount] = useState(0)
  const [depositsUpToDate, setDepositsUpToDate] = useState<boolean | null>(null)
  const [revenueOfficer, setRevenueOfficer] = useState<boolean | null>(null)

  function toggleDebtType(id: string) {
    setDebtTypes((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Progress Bar */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '22%' }} />
          </div>
          <p className="text-[11px] font-semibold text-[#94A3B8] mt-1.5">Step 4 of 15</p>
        </div>

        <div className="px-5 py-4 pb-8">
          {/* Title */}
          <div className="flex items-center gap-2 mt-4 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFF4FF]">
              <i className="fa-solid fa-briefcase text-[13px] text-[#0A1628]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#0A1628] leading-tight">Business Tax Information</h1>
          </div>
          <p className="text-[13px] text-[#64748B] mb-5">Additional questions for business tax debt</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Q1: Business still operating? */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-1">Is your business still operating?</p>
              <p className="text-[11px] text-[#64748B] mb-2.5">Affects which IA types are available</p>
              <div className="flex rounded-[10px] border-[1.5px] border-[#F1F5F9] overflow-hidden bg-[#F8FAFC]">
                <button
                  onClick={() => setOperating(true)}
                  className={`flex-1 py-2 text-[13px] font-semibold transition-all ${operating === true ? 'bg-[#E6F9EE] text-[#00A651]' : 'text-[#64748B]'}`}
                >Yes</button>
                <button
                  onClick={() => setOperating(false)}
                  className={`flex-1 py-2 text-[13px] font-semibold border-l border-[#F1F5F9] transition-all ${operating === false ? 'bg-[#FFF0F1] text-[#E63946]' : 'text-[#64748B]'}`}
                >No</button>
              </div>
            </div>

            {/* Q2: Type of business tax debt */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-1">What type of business tax debt?</p>
              <p className="text-[11px] text-[#64748B] mb-2.5">Select all that apply</p>
              <div className="flex flex-col gap-0.5">
                {DEBT_TYPES.map((dt) => (
                  <div
                    key={dt.id}
                    onClick={() => toggleDebtType(dt.id)}
                    className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 cursor-pointer transition-all hover:bg-[#F8FAFC] ${debtTypes.includes(dt.id) ? 'bg-[#F8FAFC]' : ''}`}
                  >
                    <div className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                      debtTypes.includes(dt.id) ? 'bg-[#0A1628] border-[#0A1628]' : 'border-[#F1F5F9]'
                    }`}>
                      {debtTypes.includes(dt.id) && <i className="fa-solid fa-check text-white text-[10px]" />}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0A1628]">{dt.label}</p>
                      {dt.sub && <p className="text-[11px] text-[#64748B]">{dt.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q3: TFRP */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-1">Do you have Trust Fund Recovery Penalty (TFRP)?</p>
              <p className="text-[11px] text-[#64748B] mb-2.5">TC 246 on your personal transcript?</p>
              <div className="flex rounded-[10px] border-[1.5px] border-[#F1F5F9] overflow-hidden bg-[#F8FAFC] mb-2.5">
                <button
                  onClick={() => setHasTFRP(true)}
                  className={`flex-1 py-2 text-[13px] font-semibold transition-all ${hasTFRP === true ? 'bg-[#E6F9EE] text-[#00A651]' : 'text-[#64748B]'}`}
                >Yes</button>
                <button
                  onClick={() => setHasTFRP(false)}
                  className={`flex-1 py-2 text-[13px] font-semibold border-l border-[#F1F5F9] transition-all ${hasTFRP === false ? 'bg-[#FFF0F1] text-[#E63946]' : 'text-[#64748B]'}`}
                >No</button>
              </div>
              {hasTFRP === true && (
                <div className="rounded-[10px] bg-[#FFF0F1] border border-[rgba(230,57,70,0.15)] p-2.5 mt-1">
                  <div className="flex items-start gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-[#E63946] text-[13px] mt-0.5" />
                    <p className="text-xs text-[#991B1B] font-medium">TFRP makes you <strong>PERSONALLY</strong> liable for trust fund portion</p>
                  </div>
                </div>
              )}
            </div>

            {/* Q4: Number of employees */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-2.5">Number of employees currently?</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEmployeeCount(Math.max(0, employeeCount - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#F1F5F9] bg-white text-[#0A1628] transition-all hover:bg-[#F8FAFC]"
                >
                  <i className="fa-solid fa-minus text-xs" />
                </button>
                <input
                  type="number"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2 px-3 text-center text-sm font-semibold text-[#0A1628] outline-none focus:border-[#0A1628]"
                />
                <button
                  onClick={() => setEmployeeCount(employeeCount + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-[#F1F5F9] bg-white text-[#0A1628] transition-all hover:bg-[#F8FAFC]"
                >
                  <i className="fa-solid fa-plus text-xs" />
                </button>
              </div>
            </div>

            {/* Q5: Payroll deposits */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-1">Are current payroll deposits up to date?</p>
              <p className="text-[11px] text-[#64748B] mb-2.5">Required for OIC and most IAs</p>
              <div className="flex rounded-[10px] border-[1.5px] border-[#F1F5F9] overflow-hidden bg-[#F8FAFC]">
                <button
                  onClick={() => setDepositsUpToDate(true)}
                  className={`flex-1 py-2 text-[13px] font-semibold transition-all ${depositsUpToDate === true ? 'bg-[#E6F9EE] text-[#00A651]' : 'text-[#64748B]'}`}
                >Yes</button>
                <button
                  onClick={() => setDepositsUpToDate(false)}
                  className={`flex-1 py-2 text-[13px] font-semibold border-l border-[#F1F5F9] transition-all ${depositsUpToDate === false ? 'bg-[#FFF0F1] text-[#E63946]' : 'text-[#64748B]'}`}
                >No</button>
              </div>
            </div>

            {/* Q6: Revenue Officer */}
            <div className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-4">
              <p className="text-sm font-bold text-[#0A1628] mb-1">Has a Revenue Officer been assigned?</p>
              <p className="text-[11px] text-[#64748B] mb-2.5">TC 971 AC 044 on transcript. If yes: &gt;$250K or complex case</p>
              <div className="flex rounded-[10px] border-[1.5px] border-[#F1F5F9] overflow-hidden bg-[#F8FAFC]">
                <button
                  onClick={() => setRevenueOfficer(true)}
                  className={`flex-1 py-2 text-[13px] font-semibold transition-all ${revenueOfficer === true ? 'bg-[#E6F9EE] text-[#00A651]' : 'text-[#64748B]'}`}
                >Yes</button>
                <button
                  onClick={() => setRevenueOfficer(false)}
                  className={`flex-1 py-2 text-[13px] font-semibold border-l border-[#F1F5F9] transition-all ${revenueOfficer === false ? 'bg-[#FFF0F1] text-[#E63946]' : 'text-[#64748B]'}`}
                >No</button>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-[18px] mb-5 rounded-xl bg-[#EFF4FF] border border-[rgba(10,22,40,0.1)] p-3 flex items-start gap-2.5">
            <i className="fa-solid fa-info-circle text-[#0A1628] text-sm mt-0.5" />
            <p className="text-xs text-[#0A1628] font-medium">Business debt requires <strong>Form 433-B</strong> in addition to Form 433-A</p>
          </div>

          {/* Continue */}
          <button
            onClick={() => router.push('/analysis/business/entity-type')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white"
          >
            Continue
            <i className="fa-solid fa-arrow-right text-xs" />
          </button>
        </div>
      </div>
    </div>
  )
}
