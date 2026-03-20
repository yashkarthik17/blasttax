'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ResultCard {
  rank: number
  recommended: boolean
  title: string
  amount: string
  amountSub: string
  amountColor: string
  description: string
  confidence: number
  confidenceLabel: string
  confidenceColor: string
  barColor: string
}

const RESULTS: ResultCard[] = [
  {
    rank: 1, recommended: true,
    title: 'In-Business Trust Fund Express IA',
    amount: '$607', amountSub: '/month for 72 months', amountColor: '#2563EB',
    description: 'No 433-B required for trust fund balance under $25,000. Streamlined approval.',
    confidence: 92, confidenceLabel: 'Very high', confidenceColor: '#00A651', barColor: '#00A651',
  },
  {
    rank: 2, recommended: false,
    title: 'Business OIC',
    amount: '$43,700', amountSub: 'minimum offer (RCP-based)', amountColor: '#00A651',
    description: 'Requires Form 433-B(OIC). 6-12 month process. $205 application fee.',
    confidence: 55, confidenceLabel: 'Medium', confidenceColor: '#F59E0B', barColor: '#F59E0B',
  },
  {
    rank: 3, recommended: false,
    title: 'Non-Streamlined Business IA',
    amount: '$729', amountSub: '/month (433-B required)', amountColor: '#2563EB',
    description: 'Full financial disclosure. Higher payment but guaranteed acceptance if compliant.',
    confidence: 80, confidenceLabel: 'High', confidenceColor: '#00A651', barColor: '#00A651',
  },
  {
    rank: 4, recommended: false,
    title: 'Business Penalty Abatement',
    amount: '$6,400', amountSub: 'in penalties', amountColor: '#00A651',
    description: 'FTA + reasonable cause for FTF, FTP, and FTD penalties.',
    confidence: 75, confidenceLabel: 'High', confidenceColor: '#00A651', barColor: '#00A651',
  },
]

export default function BusinessResultsPage() {
  const router = useRouter()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '85%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 7 of 8</span>
            <span className="text-xs font-semibold text-[#2563EB]">Results</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          {/* Header */}
          <div className="text-center pt-5 pb-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-[11px] font-bold text-[#2563EB] mb-3">
              <i className="fa-solid fa-wand-magic-sparkles text-[10px]" /> Business Analysis Complete
            </div>
            <h1 className="text-[1.45rem] font-extrabold text-[#0A1628] leading-tight">Business Resolution Options</h1>
            <p className="text-[12.5px] text-[#94A3B8] mt-1.5 leading-relaxed">Based on entity type, debt composition, and financial profile</p>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {RESULTS.map((r) => (
            <div key={r.rank} className={`rounded-[18px] bg-white border mb-3.5 overflow-hidden ${
              r.recommended ? 'border-2 border-[#2563EB] relative' : 'border border-[#F1F5F9]'
            }`}>
              {r.recommended && <div className="absolute top-0 left-0 right-0 h-1 bg-[#0A1628]" />}
              <div className="p-[18px] relative">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-extrabold ${
                      r.recommended ? 'bg-[#2563EB] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
                    }`}>{r.rank}</div>
                    {r.recommended && (
                      <span className="rounded-md bg-[#0A1628] px-2.5 py-[3px] text-[9.5px] font-extrabold text-white uppercase tracking-[0.06em]">Recommended</span>
                    )}
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-[#0A1628] mb-2.5">{r.title}</h3>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  {r.rank === 4 ? (
                    <>
                      <span className="text-xs text-[#64748B]">Remove</span>
                      <span className="text-xl font-black" style={{ color: r.amountColor }}>{r.amount}</span>
                      <span className="text-xs text-[#64748B]">{r.amountSub}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[22px] font-black" style={{ color: r.amountColor }}>{r.amount}</span>
                      <span className="text-[13px] text-[#64748B] font-medium">{r.amountSub}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-[#94A3B8] mb-3 leading-relaxed">{r.description}</p>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-semibold" style={{ color: r.confidenceColor }}>{r.confidenceLabel}</span>
                  <div className="flex-1 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-[1500ms]"
                      style={{ background: r.barColor, width: animated ? `${r.confidence}%` : '0%' }}
                    />
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: r.confidenceColor }}>{r.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* CNC Not Available */}
          <div className="rounded-[14px] bg-[#FEF2F2] border border-[#FEE2E2] p-4 mb-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <i className="fa-solid fa-ban text-sm text-[#E63946]" />
              <span className="text-[13px] font-bold text-[#991B1B]">CNC Not Available for Businesses</span>
            </div>
            <div className="text-xs text-[#991B1B] leading-relaxed">
              Businesses CANNOT be placed in Currently Not Collectible (CNC) status. If the business cannot pay, the IRS expects it to close/dissolve. Remaining trust fund liability is pursued against responsible persons via TFRP.
            </div>
          </div>

          {/* TFRP Warning */}
          <div className="rounded-xl bg-[#FEF3C7] border border-[#FDE68A] p-3 mb-4">
            <div className="text-xs font-bold text-[#92400E]">
              <i className="fa-solid fa-user-shield text-[11px] mr-1" /> TFRP Personal Liability Warning
            </div>
            <div className="text-[11.5px] text-[#92400E] mt-1">Responsible persons may be personally assessed $29,260 (trust fund portion) regardless of business resolution outcome. See TFRP screens for defense strategies.</div>
          </div>

          <button
            onClick={() => router.push('/analysis/business/plan')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white"
          >
            <i className="fa-solid fa-check-circle mr-1.5" /> Choose Resolution
          </button>
        </div>
      </div>
    </div>
  )
}
