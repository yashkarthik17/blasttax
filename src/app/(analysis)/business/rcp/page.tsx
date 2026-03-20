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
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Business RCP
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Reasonable Collection Potential for OIC purposes.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-blue-400"
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
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Business Net Realizable Equity (NRE)
            </p>
            <p className="mb-3 text-xs text-zinc-500">
              Equity in business assets (equipment, inventory, receivables, real
              property) minus encumbrances
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={businessNRE}
                onChange={(e) => setBusinessNRE(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Business MDI */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Business Monthly Disposable Income (MDI)
            </p>
            <p className="mb-3 text-xs text-zinc-500">
              Net business income available after allowable expenses (if
              operating)
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={businessMDI}
                onChange={(e) => setBusinessMDI(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Personal NRE */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Personal Net Realizable Equity (NRE)
            </p>
            <p className="mb-3 text-xs text-zinc-500">
              From individual collection analysis
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={personalNRE}
                onChange={(e) => setPersonalNRE(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Personal MDI */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">
              Personal Monthly Disposable Income (MDI)
            </p>
            <p className="mb-3 text-xs text-zinc-500">
              From individual collection analysis
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={personalMDI}
                onChange={(e) => setPersonalMDI(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-8 pr-4 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Combined RCP Summary */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">RCP Breakdown</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Business NRE</span>
                <span className="font-medium text-white">${fmt(bNRE)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Business MDI (x12 or x24)</span>
                <span className="font-medium text-white">${fmt(bMDI)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Personal NRE</span>
                <span className="font-medium text-white">${fmt(pNRE)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Personal MDI (x12 or x24)</span>
                <span className="font-medium text-white">${fmt(pMDI)}</span>
              </div>
              <div className="my-2 border-t border-zinc-700" />
              <div className="flex justify-between">
                <span className="font-semibold text-white">Combined RCP</span>
                <span className="text-xl font-bold text-emerald-400">
                  ${fmt(combinedRCP)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/results')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
