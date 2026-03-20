'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OPERATING_ITEMS = [
  'All Form 941s filed for all quarters?',
  'All Form 940s filed for all years?',
  'Current quarter 941 filed (or not yet due)?',
  'All income returns filed (1120/1120-S/1065)?',
]

const OOB_ITEMS = [
  'Final 941 filed with "Final Return" checked?',
  'Final 940 filed and marked as final?',
  'Form W-3 and W-2s issued for final year?',
  'Final income return filed and marked final?',
]

const QUARTERS = [
  { quarter: 'Q1 2025', filed: true, tc150: '04/30/2025', sfr: 'No' },
  { quarter: 'Q2 2025', filed: true, tc150: '07/31/2025', sfr: 'No' },
  { quarter: 'Q3 2025', filed: false, tc150: '--', sfr: '--' },
  { quarter: 'Q4 2025', filed: false, tc150: '--', sfr: '--' },
]

export default function BusinessCompliancePage() {
  const router = useRouter()
  const [opChecks, setOpChecks] = useState<Record<number, boolean>>({})
  const [oobChecks, setOobChecks] = useState<Record<number, boolean>>({})

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '20%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 2 of 8</span>
            <span className="text-xs font-semibold text-[#2563EB]">Filing Compliance</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight mb-1">Filing Compliance Check</h1>
          <p className="text-[13px] text-[#94A3B8] leading-relaxed mb-3.5">IRS requires all returns filed before any resolution. Check each item below.</p>

          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FEF2F2] border border-[rgba(230,57,70,0.15)] p-3.5 mb-3.5">
            <i className="fa-solid fa-triangle-exclamation text-[#E63946]" />
            <span className="text-xs text-[#991B1B]">Filing compliance is the FIRST gate. IRS will not process any resolution request until the business is in compliance.</span>
          </div>

          {/* Operating Checklist */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-file-lines text-xs text-[#2563EB] mr-1.5" /> Operating Business Checklist
            </div>
            {OPERATING_ITEMS.map((item, i) => (
              <label key={i} className="flex items-center gap-2 mt-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={opChecks[i] || false}
                  onChange={() => setOpChecks((p) => ({ ...p, [i]: !p[i] }))}
                  className="h-9 w-9 appearance-none rounded-[10px] bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                    after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                    checked:after:translate-x-4"
                  style={{ width: '36px', height: '20px' }}
                />
                <span className="text-xs font-medium text-[#64748B]">{item}</span>
              </label>
            ))}
          </div>

          {/* OOB Checklist */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-door-closed text-xs text-[#92400E] mr-1.5" /> Out-of-Business Checklist
            </div>
            {OOB_ITEMS.map((item, i) => (
              <label key={i} className="flex items-center gap-2 mt-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={oobChecks[i] || false}
                  onChange={() => setOobChecks((p) => ({ ...p, [i]: !p[i] }))}
                  className="h-9 w-9 appearance-none rounded-[10px] bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                    after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                    checked:after:translate-x-4"
                  style={{ width: '36px', height: '20px' }}
                />
                <span className="text-xs font-medium text-[#64748B]">{item}</span>
              </label>
            ))}
          </div>

          {/* Per-Quarter Table */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-3">
              <i className="fa-solid fa-table text-xs text-[#2563EB] mr-1.5" /> Per-Quarter 941 Filing Status
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="py-2 px-2 text-left font-semibold text-[#94A3B8]">Quarter</th>
                    <th className="py-2 px-2 text-left font-semibold text-[#94A3B8]">Filed?</th>
                    <th className="py-2 px-2 text-left font-semibold text-[#94A3B8]">TC 150</th>
                    <th className="py-2 px-2 text-left font-semibold text-[#94A3B8]">SFR?</th>
                  </tr>
                </thead>
                <tbody>
                  {QUARTERS.map((q, i) => (
                    <tr key={i} className="border-b border-[#F1F5F9] last:border-0">
                      <td className="py-2 px-2 font-semibold text-[#0A1628]">{q.quarter}</td>
                      <td className="py-2 px-2">
                        <span className={`font-bold ${q.filed ? 'text-[#00A651]' : 'text-[#E63946]'}`}>{q.filed ? 'Yes' : 'No'}</span>
                      </td>
                      <td className="py-2 px-2 text-[#0A1628]">{q.tc150}</td>
                      <td className="py-2 px-2 text-[#0A1628]">{q.sfr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Result */}
          <div className="rounded-xl bg-[#FEF2F2] border border-[rgba(230,57,70,0.15)] p-3.5 mb-3">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-xmark text-[#E63946] text-base" />
              <div>
                <span className="text-[13px] font-bold text-[#991B1B]">Not in Compliance</span>
                <p className="text-[11.5px] text-[#991B1B] mt-0.5">2 unfiled quarterly returns detected. Must resolve before proceeding with any resolution request.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/analysis/business/deposits')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white mt-4"
          >
            Continue <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
