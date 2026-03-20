'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BusinessRCPPage() {
  const router = useRouter()

  // In production these would come from collected data / store
  const [businessNRE, setBusinessNRE] = useState('')
  const [businessMDI, setBusinessMDI] = useState('')
  const [personalNRE, setPersonalNRE] = useState('')
  const [personalMDI, setPersonalMDI] = useState('')

  const bNRE = parseFloat(businessNRE) || 0
  const bMDI = parseFloat(businessMDI) || 0
  const pNRE = parseFloat(personalNRE) || 0
  const pMDI = parseFloat(personalMDI) || 0
  const combinedRCP = bNRE + bMDI + pNRE + pMDI

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A1628]">
            Business RCP
          </h1>
          <p className="mt-3 text-base text-[#64748B]">
            Reasonable Collection Potential for OIC purposes.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 rounded-xl border border-blue-500/30 bg-[#2563EB]/5 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-[#2563EB]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p className="text-sm leading-relaxed text-blue-200/80">
              Business RCP is calculated separately from personal RCP for
              resolution purposes. Both are combined when determining OIC offer
              amount.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Business NRE */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Business Net Realizable Equity (NRE)
            </p>
            <p className="mb-3 text-xs text-[#94A3B8]">
              Equity in business assets (equipment, inventory, receivables, real
              property) minus encumbrances
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={businessNRE}
                onChange={(e) => setBusinessNRE(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Business MDI */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Business Monthly Disposable Income (MDI)
            </p>
            <p className="mb-3 text-xs text-[#94A3B8]">
              Net business income available after allowable expenses (if
              operating)
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={businessMDI}
                onChange={(e) => setBusinessMDI(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Personal NRE */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Personal Net Realizable Equity (NRE)
            </p>
            <p className="mb-3 text-xs text-[#94A3B8]">
              From individual collection analysis
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={personalNRE}
                onChange={(e) => setPersonalNRE(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Personal MDI */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Personal Monthly Disposable Income (MDI)
            </p>
            <p className="mb-3 text-xs text-[#94A3B8]">
              From individual collection analysis
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={personalMDI}
                onChange={(e) => setPersonalMDI(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Combined RCP Summary */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">RCP Breakdown</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Business NRE</span>
                <span className="font-medium text-[#0A1628]">${fmt(bNRE)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Business MDI (x12 or x24)</span>
                <span className="font-medium text-[#0A1628]">${fmt(bMDI)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Personal NRE</span>
                <span className="font-medium text-[#0A1628]">${fmt(pNRE)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B]">Personal MDI (x12 or x24)</span>
                <span className="font-medium text-[#0A1628]">${fmt(pMDI)}</span>
              </div>
              <div className="my-2 border-t border-[#E2E8F0]" />
              <div className="flex justify-between">
                <span className="font-semibold text-[#0A1628]">Combined RCP</span>
                <span className="text-xl font-bold text-[#00A651]">
                  ${fmt(combinedRCP)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/results')}
          className="mt-10 w-full rounded-xl bg-[#00A651] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#008C44] active:bg-[#008C44]"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
