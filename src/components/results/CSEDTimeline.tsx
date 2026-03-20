'use client'

interface CSEDResult {
  taxYear: number
  baseCSED: string
  adjustedCSED: string
  remainingMonths: number
  isExpired: boolean
}

interface CSEDTimelineProps {
  csedResults: CSEDResult[]
}

function getBarColor(remainingMonths: number, isExpired: boolean): string {
  if (isExpired) return 'bg-zinc-600'
  if (remainingMonths < 12) return 'bg-red-500'
  if (remainingMonths < 24) return 'bg-amber-500'
  return 'bg-emerald-500'
}

function getBadgeStyle(remainingMonths: number, isExpired: boolean): string {
  if (isExpired) return 'bg-zinc-500/10 text-zinc-400'
  if (remainingMonths < 12) return 'bg-red-500/10 text-red-400'
  if (remainingMonths < 24) return 'bg-amber-500/10 text-amber-400'
  return 'bg-emerald-500/10 text-emerald-400'
}

function getStatusLabel(remainingMonths: number, isExpired: boolean): string {
  if (isExpired) return 'Expired'
  if (remainingMonths < 12) return `${remainingMonths} mo left`
  if (remainingMonths < 24) return `${remainingMonths} mo left`
  const years = Math.floor(remainingMonths / 12)
  const months = remainingMonths % 12
  return months > 0 ? `${years}y ${months}mo left` : `${years}y left`
}

export default function CSEDTimeline({ csedResults }: CSEDTimelineProps) {
  // Find max remaining months for scaling the bars
  const maxMonths = Math.max(
    ...csedResults.map((r) => (r.isExpired ? 0 : r.remainingMonths)),
    1,
  )

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">CSED Timeline</h3>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Collection Statute Expiration Date by tax year
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          &gt; 24 months
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          12-24 months
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          &lt; 12 months
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          Expired
        </div>
      </div>

      {/* Timeline Bars */}
      <div className="space-y-4">
        {csedResults.map((result) => {
          const barWidth = result.isExpired
            ? 0
            : (result.remainingMonths / maxMonths) * 100
          const barColor = getBarColor(result.remainingMonths, result.isExpired)
          const badgeStyle = getBadgeStyle(result.remainingMonths, result.isExpired)
          const statusLabel = getStatusLabel(result.remainingMonths, result.isExpired)

          return (
            <div key={result.taxYear} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-10">{result.taxYear}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyle}`}>
                    {statusLabel}
                  </span>
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {result.adjustedCSED}
                </span>
              </div>
              <div className="ml-[52px] h-3 w-full rounded-full bg-[var(--secondary)] overflow-hidden">
                <div
                  className={`h-3 rounded-full ${barColor} transition-all duration-500`}
                  style={{ width: `${Math.max(barWidth, result.isExpired ? 0 : 2)}%` }}
                />
              </div>
              {result.baseCSED !== result.adjustedCSED && (
                <p className="ml-[52px] text-xs text-[var(--muted-foreground)]">
                  Base CSED: {result.baseCSED} (adjusted for tolling)
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Today Marker Note */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted-foreground)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs text-[var(--muted-foreground)]">
            Bars show remaining time until each CSED expires. Events like OIC submissions, bankruptcy, or CDP hearings can toll (extend) the CSED.
          </p>
        </div>
      </div>
    </div>
  )
}
