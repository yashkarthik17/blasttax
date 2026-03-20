'use client'

import { useState } from 'react'

interface RCPBreakdownProps {
  nre: number
  futureIncomeLumpSum: number
  futureIncomePeriodic: number
  rcpLumpSum: number
  rcpPeriodic: number
}

export default function RCPBreakdown({
  nre,
  futureIncomeLumpSum,
  futureIncomePeriodic,
  rcpLumpSum,
  rcpPeriodic,
}: RCPBreakdownProps) {
  const [view, setView] = useState<'lump' | 'periodic'>('lump')

  const futureIncome = view === 'lump' ? futureIncomeLumpSum : futureIncomePeriodic
  const totalRCP = view === 'lump' ? rcpLumpSum : rcpPeriodic

  const nrePercent = totalRCP > 0 ? (nre / totalRCP) * 100 : 0
  const futurePercent = totalRCP > 0 ? (futureIncome / totalRCP) * 100 : 0

  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-6">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Reasonable Collection Potential</h3>
        <div className="flex rounded-lg border border-[var(--border)] bg-[var(--background)] p-0.5">
          <button
            onClick={() => setView('lump')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              view === 'lump'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Lump Sum
          </button>
          <button
            onClick={() => setView('periodic')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              view === 'periodic'
                ? 'bg-[var(--primary)] text-white'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Periodic
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* NRE */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 space-y-1">
          <p className="text-xs text-[var(--muted-foreground)]">Net Realizable Equity</p>
          <p className="text-2xl font-bold">{fmt.format(nre)}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Assets minus liabilities</p>
        </div>

        {/* Future Income */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 space-y-1">
          <p className="text-xs text-[var(--muted-foreground)]">
            Future Income ({view === 'lump' ? '5 mo' : '24 mo'})
          </p>
          <p className="text-2xl font-bold">{fmt.format(futureIncome)}</p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Disposable income &times; {view === 'lump' ? '5' : '24'}
          </p>
        </div>

        {/* Total RCP */}
        <div className="rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-4 space-y-1">
          <p className="text-xs text-[var(--primary)]">Total RCP</p>
          <p className="text-2xl font-bold text-[var(--primary)]">{fmt.format(totalRCP)}</p>
          <p className="text-xs text-[var(--muted-foreground)]">Minimum offer amount</p>
        </div>
      </div>

      {/* Visual Proportion Bar */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--muted-foreground)]">RCP Composition</p>
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-[var(--secondary)]">
          {nrePercent > 0 && (
            <div
              className="h-4 bg-blue-500 transition-all"
              style={{ width: `${nrePercent}%` }}
              title={`NRE: ${fmt.format(nre)}`}
            />
          )}
          {futurePercent > 0 && (
            <div
              className="h-4 bg-emerald-500 transition-all"
              style={{ width: `${futurePercent}%` }}
              title={`Future Income: ${fmt.format(futureIncome)}`}
            />
          )}
        </div>
        <div className="flex items-center gap-6 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            NRE ({nrePercent.toFixed(0)}%)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Future Income ({futurePercent.toFixed(0)}%)
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          <span className="font-medium text-[var(--foreground)]">{fmt.format(nre)}</span>
          {' NRE + '}
          <span className="font-medium text-[var(--foreground)]">{fmt.format(futureIncome)}</span>
          {' Future Income = '}
          <span className="font-bold text-[var(--primary)]">{fmt.format(totalRCP)}</span>
          {' RCP'}
        </p>
      </div>
    </div>
  )
}
