'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TollingEventEntry {
  id: string
  eventType: string
  startDate: string
  endDate: string
}

interface TaxYearCSED {
  taxYear: number
  assessmentDate: string
  tollingEvents: TollingEventEntry[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOLLING_EVENT_TYPES = [
  { value: 'OIC_Pending', label: 'OIC Pending' },
  { value: 'Bankruptcy_Active', label: 'Bankruptcy' },
  { value: 'CDP_Hearing', label: 'CDP Hearing' },
  { value: 'Innocent_Spouse', label: 'Innocent Spouse' },
  { value: 'Litigation', label: 'Litigation' },
  { value: 'Military_Deferment', label: 'Military Deferment' },
  { value: 'Outside_US', label: 'Outside US (6+ months)' },
]

const EXTRA_TOLLING: Record<string, number> = {
  OIC_Pending: 30,
  Bankruptcy_Active: 180,
}

const CSED_DAYS = 3650 // 10 years

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function addDaysToDate(dateStr: string, days: number): Date {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

function monthsBetween(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

function computeTollingDays(events: TollingEventEntry[]): number {
  if (events.length === 0) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Convert to intervals with extra grace days, merge overlaps
  const intervals = events.map((e) => {
    const start = new Date(e.startDate).getTime()
    const endBase = e.endDate ? new Date(e.endDate) : today
    const extra = EXTRA_TOLLING[e.eventType] ?? 0
    const end = new Date(endBase)
    end.setDate(end.getDate() + extra)
    return { start, end: end.getTime() }
  })

  intervals.sort((a, b) => a.start - b.start)

  const merged: { start: number; end: number }[] = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1]
    if (intervals[i].start <= last.end) {
      last.end = Math.max(last.end, intervals[i].end)
    } else {
      merged.push(intervals[i])
    }
  }

  let total = 0
  for (const iv of merged) {
    total += Math.round((iv.end - iv.start) / (1000 * 60 * 60 * 24))
  }
  return total
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CSEDReviewPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  // Hydrate from existing tax debt entries
  const taxDebts: { taxYear: number; assessmentDate: string }[] = answers.taxDebts ?? []

  const [csedData, setCSEDData] = useState<TaxYearCSED[]>(() =>
    taxDebts.map((d) => ({
      taxYear: d.taxYear,
      assessmentDate: d.assessmentDate,
      tollingEvents: (answers.tollingEvents?.[d.taxYear] as TollingEventEntry[]) ?? [],
    })),
  )

  // ---- Add / remove tolling events ----
  function addTollingEvent(yearIndex: number) {
    setCSEDData((prev) => {
      const next = [...prev]
      const entry = { ...next[yearIndex] }
      entry.tollingEvents = [
        ...entry.tollingEvents,
        {
          id: crypto.randomUUID(),
          eventType: 'OIC_Pending',
          startDate: '',
          endDate: '',
        },
      ]
      next[yearIndex] = entry
      return next
    })
  }

  function removeTollingEvent(yearIndex: number, eventId: string) {
    setCSEDData((prev) => {
      const next = [...prev]
      const entry = { ...next[yearIndex] }
      entry.tollingEvents = entry.tollingEvents.filter((e) => e.id !== eventId)
      next[yearIndex] = entry
      return next
    })
  }

  function updateTollingEvent(
    yearIndex: number,
    eventId: string,
    field: keyof TollingEventEntry,
    value: string,
  ) {
    setCSEDData((prev) => {
      const next = [...prev]
      const entry = { ...next[yearIndex] }
      entry.tollingEvents = entry.tollingEvents.map((e) =>
        e.id === eventId ? { ...e, [field]: value } : e,
      )
      next[yearIndex] = entry
      return next
    })
  }

  // ---- Computed CSED info ----
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const computedRows = useMemo(
    () =>
      csedData.map((entry) => {
        const baseCSED = addDaysToDate(entry.assessmentDate, CSED_DAYS)
        const tollingDays = computeTollingDays(entry.tollingEvents)
        const adjustedCSED = addDaysToDate(entry.assessmentDate, CSED_DAYS + tollingDays)
        const remaining = monthsBetween(today, adjustedCSED)
        const isExpired = adjustedCSED <= today

        let status: 'expired' | 'expiring' | 'active' = 'active'
        if (isExpired) status = 'expired'
        else if (remaining < 24) status = 'expiring'

        return {
          taxYear: entry.taxYear,
          assessmentDate: entry.assessmentDate,
          baseCSED,
          adjustedCSED,
          tollingDays,
          remaining: Math.max(0, remaining),
          status,
        }
      }),
    [csedData, today],
  )

  const earliest = useMemo(() => {
    const active = computedRows.filter((r) => r.status !== 'expired')
    if (active.length === 0) return null
    return active.reduce((min, r) => (r.adjustedCSED < min.adjustedCSED ? r : min))
  }, [computedRows])

  // ---- Timeline bounds ----
  const timelineBounds = useMemo(() => {
    if (computedRows.length === 0) return { start: today, end: today }
    const start = today
    const end = computedRows.reduce(
      (latest, r) => (r.adjustedCSED > latest ? r.adjustedCSED : latest),
      today,
    )
    return { start, end }
  }, [computedRows, today])

  const totalSpan = daysBetween(timelineBounds.start, timelineBounds.end) || 1

  // ---- Persist & navigate ----
  function handleContinue() {
    try {
      const tollingByYear: Record<string, TollingEventEntry[]> = {}
      csedData.forEach((entry) => {
        tollingByYear[entry.taxYear] = entry.tollingEvents
      })
      const safeCSEDData = computedRows
        .filter((r) => r.baseCSED instanceof Date && !isNaN(r.baseCSED.getTime()))
        .map((r) => ({
          taxYear: r.taxYear,
          baseCSED: r.baseCSED.toISOString().split('T')[0],
          adjustedCSED: r.adjustedCSED.toISOString().split('T')[0],
          tollingDays: r.tollingDays,
          remainingMonths: r.remaining,
          isExpired: r.status === 'expired',
        }))
      setAnswers({
        tollingEvents: tollingByYear,
        csedData: safeCSEDData,
      })
    } catch (e) {
      // If CSED computation fails (e.g. no debts entered), still proceed
      console.warn('CSED data save error:', e)
    }

    const hasPenalties = answers.hasPriorPenalties === true
    router.push(hasPenalties ? '/analysis/penalty-screening' : '/analysis/verification')
  }

  // ---- Status badge ----
  function statusBadge(status: 'expired' | 'expiring' | 'active') {
    const styles = {
      active: 'bg-emerald-500/15 text-emerald-400',
      expiring: 'bg-amber-500/15 text-amber-400',
      expired: 'bg-red-500/15 text-red-400',
    }
    const labels = { active: 'Active', expiring: 'Expiring Soon', expired: 'Expired' }
    return (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">CSED Review</h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Review each tax year&apos;s Collection Statute Expiration Date. Add any tolling events
            that may have paused the 10-year collection period.
          </p>
        </div>

        {/* Per-Year Cards */}
        {csedData.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-zinc-400">No tax debts have been entered yet.</p>
            <button
              onClick={() => router.push('/analysis/case-info')}
              className="mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Go to Tax Debt Entry
            </button>
          </div>
        )}

        <div className="space-y-4">
          {csedData.map((entry, yi) => {
            const row = computedRows[yi]
            return (
              <div
                key={entry.taxYear}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                {/* Year header */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Tax Year {entry.taxYear}</h3>
                  {row && statusBadge(row.status)}
                </div>

                {/* Key dates */}
                <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-zinc-500">Assessment Date</span>
                    <p className="font-medium text-zinc-300">
                      {entry.assessmentDate
                        ? fmtDate(new Date(entry.assessmentDate))
                        : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Base CSED (10 yr)</span>
                    <p className="font-medium text-zinc-300">
                      {row ? fmtDate(row.baseCSED) : '--'}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Adjusted CSED</span>
                    <p className="font-medium text-white">
                      {row ? fmtDate(row.adjustedCSED) : '--'}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Remaining</span>
                    <p
                      className={`font-medium ${
                        row?.status === 'expired'
                          ? 'text-red-400'
                          : row?.status === 'expiring'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }`}
                    >
                      {row
                        ? row.status === 'expired'
                          ? 'Expired'
                          : `${row.remaining} months`
                        : '--'}
                    </p>
                  </div>
                </div>

                {/* Tolling Events */}
                <div className="border-t border-zinc-800 pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-zinc-300">Tolling Events</h4>
                    <button
                      onClick={() => addTollingEvent(yi)}
                      className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-zinc-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Add Tolling Event
                    </button>
                  </div>

                  {entry.tollingEvents.length === 0 && (
                    <p className="text-xs text-zinc-500">
                      No tolling events. The standard 10-year statute applies.
                    </p>
                  )}

                  <div className="space-y-2">
                    {entry.tollingEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex flex-wrap items-center gap-2 rounded-lg bg-zinc-800/50 p-3"
                      >
                        <select
                          value={evt.eventType}
                          onChange={(e) =>
                            updateTollingEvent(yi, evt.id, 'eventType', e.target.value)
                          }
                          className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        >
                          {TOLLING_EVENT_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={evt.startDate}
                          onChange={(e) =>
                            updateTollingEvent(yi, evt.id, 'startDate', e.target.value)
                          }
                          className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                          placeholder="Start"
                        />
                        <span className="text-xs text-zinc-500">to</span>
                        <input
                          type="date"
                          value={evt.endDate}
                          onChange={(e) =>
                            updateTollingEvent(yi, evt.id, 'endDate', e.target.value)
                          }
                          className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                          placeholder="End (blank = ongoing)"
                        />
                        <button
                          onClick={() => removeTollingEvent(yi, evt.id)}
                          className="ml-auto rounded p-1 text-zinc-500 hover:bg-zinc-700 hover:text-red-400"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Timeline Visualization ── */}
        {computedRows.length > 0 && (
          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-4 text-sm font-medium text-zinc-300">CSED Timeline</h3>
            <div className="space-y-3">
              {computedRows.map((row) => {
                const offset = 0
                const width = Math.max(
                  2,
                  (daysBetween(today, row.adjustedCSED) / totalSpan) * 100,
                )
                const barColor =
                  row.status === 'expired'
                    ? 'bg-red-500/60'
                    : row.status === 'expiring'
                      ? 'bg-amber-500/60'
                      : 'bg-emerald-500/60'

                return (
                  <div key={row.taxYear}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-400">TY {row.taxYear}</span>
                      <span className="text-zinc-500">{fmtDate(row.adjustedCSED)}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all`}
                        style={{
                          marginLeft: `${offset}%`,
                          width: `${Math.min(width, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Today marker label */}
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
              <span>Today</span>
              <span>
                {computedRows.length > 0
                  ? fmtDate(
                      computedRows.reduce((latest, r) =>
                        r.adjustedCSED > latest ? r.adjustedCSED : latest,
                        today,
                      ),
                    )
                  : ''}
              </span>
            </div>
          </div>
        )}

        {/* ── Summary ── */}
        {earliest && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-300">
                  Earliest CSED: {fmtDate(earliest.adjustedCSED)}
                </p>
                <p className="text-xs text-amber-400/70">
                  {earliest.remaining} months remaining (Tax Year {earliest.taxYear})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div className="mt-8 flex gap-3 pb-4">
          <button
            onClick={() => router.back()}
            className="flex-1 rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
