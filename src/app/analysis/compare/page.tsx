'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ComparePage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    eligibility: { program: string; eligible: boolean; confidence: number; advantages: string[]; disadvantages: string[]; monthlyPayment?: number; totalPayment?: number; termMonths?: number }[]
    totalDebt: number
    rcp?: { rcpLumpSum: number }
  } | undefined

  const totalDebt = result?.totalDebt ?? 47250
  const rcp = result?.rcp?.rcpLumpSum ?? 0

  // Static comparison data matching HTML prototype
  const comparisonRows = [
    { label: 'Monthly', oic: '$0-$354', sia: '$657', ppia: '$869', cnc: '$0', bestCols: [0, 3] },
    { label: 'Total Cost', oic: fmt(rcp || 8500), sia: fmt(totalDebt), ppia: '~$30,000', cnc: '$0', bestCols: [0, 3] },
    { label: 'Duration', oic: '5-24 mo', sia: '72 mo', ppia: 'CSED', cnc: 'CSED', bestCols: [] },
    { label: 'Savings', oic: `${rcp > 0 ? Math.round(((totalDebt - rcp) / totalDebt) * 100) : 82}%`, sia: '0%', ppia: '~36%', cnc: '100%*', bestCols: [0, 3] },
    { label: 'Lien Filed?', oic: 'Released after', sia: 'Under $25K: No', ppia: 'Yes', cnc: 'Maybe', bestCols: [] },
    { label: 'Disclosure', oic: '433-A (Full)', sia: 'None', ppia: '433-A (Full)', cnc: '433-F', bestCols: [1] },
    { label: 'Approval', oic: '6-12 mo', sia: 'Immediate', ppia: '4-8 wk', cnc: '2-8 wk', bestCols: [1] },
    { label: 'Risk Level', oic: 'Medium', sia: 'Low', ppia: 'Low', cnc: 'Medium', bestCols: [1, 2] },
    { label: 'CSED Tolled?', oic: 'Yes', sia: 'No', ppia: 'No', cnc: 'No', bestCols: [1, 2, 3], redCols: [0] },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 pb-3">
          <button onClick={() => router.push('/analysis/results')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white transition-all hover:border-[#2563EB]">
            <i className="fa-solid fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <span className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Compare Options</span>
          <div className="w-10 shrink-0" />
        </div>

        {/* Heading */}
        <div className="mb-4">
          <h1 className="text-xl font-extrabold text-[#0A1628] mb-1">Compare Your Resolution Options</h1>
          <p className="text-sm text-[#94A3B8]">Side-by-side analysis of your eligible paths</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full border-collapse overflow-hidden rounded-[14px] border border-[#F1F5F9] bg-white text-[11px]">
            <thead>
              <tr>
                <th className="border-b-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#0A1628]" style={{ width: 72 }}>Factor</th>
                <th className="border-b-[1.5px] border-[#F1F5F9] bg-[#EBF0FF] px-1.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">OIC</th>
                <th className="border-b-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-1.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#0A1628]">S-IA</th>
                <th className="border-b-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-1.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#0A1628]">PPIA</th>
                <th className="border-b-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-1.5 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#0A1628]">CNC</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => {
                const vals = [row.oic, row.sia, row.ppia, row.cnc]
                return (
                  <tr key={row.label} className="border-b border-[#F1F5F9] last:border-b-0">
                    <td className="px-3 py-2 text-left text-[10px] font-semibold text-[#0A1628]">{row.label}</td>
                    {vals.map((val, i) => {
                      const isBest = row.bestCols?.includes(i)
                      const isRed = (row as { redCols?: number[] }).redCols?.includes(i)
                      const isHighlight = i === 0
                      return (
                        <td key={i} className={`px-1.5 py-2 text-center font-medium ${isHighlight ? 'bg-[rgba(235,240,255,0.3)]' : ''} ${isBest ? 'font-bold text-[#00A651]' : isRed ? 'font-bold text-[#E63946]' : isHighlight ? 'font-semibold text-[#2563EB]' : 'text-[#64748B]'}`}>
                          {val}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Recommendation */}
        <div className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-[#BFDBFE] bg-[#EFF4FF] p-3.5">
          <i className="fa-solid fa-lightbulb mt-0.5 text-sm text-[#2563EB]" />
          <div>
            <div className="text-[13px] font-bold text-[#1e3a5f] mb-0.5">Our Recommendation</div>
            <div className="text-xs leading-snug text-[#374151]">
              <strong>OIC</strong> offers the highest savings ({rcp > 0 ? Math.round(((totalDebt - rcp) / totalDebt) * 100) : 82}%), or <strong>Streamlined IA</strong> for fastest approval with zero disclosure.
            </div>
          </div>
        </div>

        {/* Strategic Plays */}
        <div className="mt-4">
          <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
            <i className="fa-solid fa-chess mr-1 text-[11px]" /> Strategic Plays
          </div>

          {/* Play A */}
          <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="mb-2.5 rounded-2xl border-[1.5px] border-[#F1F5F9] bg-white p-4 transition-all hover:border-[rgba(0,61,165,0.2)] hover:-translate-y-px hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EBF0FF]">
                <i className="fa-solid fa-arrow-trend-down text-sm text-[#0A1628]" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#0A1628]">Play A: Balance Reducer</div>
                <span className="rounded-md bg-[#0A1628] px-1.5 py-px text-[9px] font-bold text-white">Compound Strategy</span>
              </div>
            </div>
            <p className="text-xs leading-snug text-[#64748B] mb-1.5">
              Do FTA first to reduce balance, then submit OIC with lower RCP = lower offer amount.
            </p>
            <button onClick={() => router.push('/analysis/detail/penalty')} className="text-xs font-semibold text-[#2563EB]">
              Learn More <i className="fa-solid fa-arrow-right ml-0.5 text-[10px]" />
            </button>
          </div>

          {/* Play E */}
          <div className="mb-2.5 rounded-2xl border-[1.5px] border-[#F1F5F9] bg-white p-4 transition-all hover:border-[rgba(0,61,165,0.2)] hover:-translate-y-px hover:shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F0FDFA]">
                <i className="fa-solid fa-hourglass-half text-sm text-[#0D9488]" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#0A1628]">Play E: Expiration Play</div>
                <span className="rounded-md bg-[#F0FDFA] px-1.5 py-px text-[9px] font-bold text-[#0D9488]">Long-Term</span>
              </div>
            </div>
            <p className="text-xs leading-snug text-[#64748B] mb-1.5">
              Request CNC + apply FTA, then wait for CSED to expire. Pay $0 if income stays low.
            </p>
            <button onClick={() => router.push('/analysis/detail/cnc')} className="text-xs font-semibold text-[#2563EB]">
              Learn More <i className="fa-solid fa-arrow-right ml-0.5 text-[10px]" />
            </button>
          </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <button
            onClick={() => router.push('/analysis/plan')}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00A651] py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#008C44]"
          >
            Choose Your Resolution <i className="fa-solid fa-arrow-right text-xs" />
          </button>
        </div>
      </div>
    </div>
  )
}
