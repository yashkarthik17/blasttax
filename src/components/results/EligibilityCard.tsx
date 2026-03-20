'use client'

interface EligibilityCardProps {
  program: string
  eligible: boolean
  confidence: number
  monthlyPayment?: number
  totalPayment?: number
  reasons: string[]
  advantages: string[]
  onViewDetails: () => void
}

export default function EligibilityCard({
  program,
  eligible,
  confidence,
  monthlyPayment,
  totalPayment,
  reasons,
  advantages,
  onViewDetails,
}: EligibilityCardProps) {
  const confidenceColor =
    confidence >= 70
      ? 'bg-emerald-400'
      : confidence >= 40
        ? 'bg-amber-400'
        : 'bg-red-400'

  const badgeStyle =
    confidence >= 70
      ? 'bg-emerald-500/10 text-emerald-400'
      : confidence >= 40
        ? 'bg-amber-500/10 text-amber-400'
        : 'bg-red-500/10 text-red-400'

  const badgeLabel = eligible
    ? confidence >= 70
      ? 'Likely Eligible'
      : 'Possibly Eligible'
    : 'Not Eligible'

  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{program}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle}`}>
          {badgeLabel}
        </span>
      </div>

      {/* Confidence Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--muted-foreground)]">Confidence</span>
          <span className="font-medium">{confidence}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--secondary)]">
          <div
            className={`h-2 rounded-full ${confidenceColor} transition-all`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Financial Figures */}
      {(monthlyPayment !== undefined || totalPayment !== undefined) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {monthlyPayment !== undefined && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--muted-foreground)]">Monthly Payment</p>
              <p className="mt-0.5 text-xl font-bold">{fmt.format(monthlyPayment)}</p>
            </div>
          )}
          {totalPayment !== undefined && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
              <p className="text-xs text-[var(--muted-foreground)]">Total Payment</p>
              <p className="mt-0.5 text-xl font-bold">{fmt.format(totalPayment)}</p>
            </div>
          )}
        </div>
      )}

      {/* Advantages (top 2) */}
      {advantages.length > 0 && (
        <div className="space-y-2">
          {advantages.slice(0, 2).map((adv, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[var(--muted-foreground)]">{adv}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reasons (if not eligible) */}
      {!eligible && reasons.length > 0 && (
        <div className="space-y-2">
          {reasons.slice(0, 2).map((reason, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[var(--muted-foreground)]">{reason}</span>
            </div>
          ))}
        </div>
      )}

      {/* View Details */}
      <button
        onClick={onViewDetails}
        className="w-full rounded-lg border border-[var(--border)] py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
      >
        View Details
      </button>
    </div>
  )
}
