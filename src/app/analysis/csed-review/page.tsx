'use client'

import { useState, useMemo, useEffect } from 'react'
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
  extraDays: number
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
  { value: 'OIC_Pending', label: 'OIC pending' },
  { value: 'IA_Request', label: 'IA request' },
  { value: 'CDP_Hearing', label: 'CDP hearing' },
  { value: 'Bankruptcy_Active', label: 'Bankruptcy' },
  { value: 'Outside_US', label: 'Abroad (6+ mo)' },
  { value: 'Military_Combat', label: 'Military combat' },
  { value: 'Innocent_Spouse', label: 'Innocent spouse' },
  { value: 'Other', label: 'Other' },
]

const EXTRA_TOLLING: Record<string, number> = {
  OIC_Pending: 30,
  Bankruptcy_Active: 180,
}

const CSED_DAYS = 3650

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
  const intervals = events.map((e) => {
    const start = new Date(e.startDate).getTime()
    const endBase = e.endDate ? new Date(e.endDate) : today
    const extra = e.extraDays || EXTRA_TOLLING[e.eventType] || 0
    const end = new Date(endBase)
    end.setDate(end.getDate() + extra)
    return { start, end: end.getTime() }
  }).filter(iv => !isNaN(iv.start) && !isNaN(iv.end))
  if (intervals.length === 0) return 0
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
  for (const iv of merged) { total += Math.round((iv.end - iv.start) / (1000 * 60 * 60 * 24)) }
  return total
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function fmtDateShort(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CSEDReviewPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  const taxDebts: { taxYear: number; assessmentDate: string }[] = answers.taxDebts ?? []

  const [csedData, setCSEDData] = useState<TaxYearCSED[]>(() =>
    taxDebts.map((d) => ({
      taxYear: d.taxYear,
      assessmentDate: d.assessmentDate,
      tollingEvents: (answers.tollingEvents?.[d.taxYear] as TollingEventEntry[]) ?? [],
    })),
  )

  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 600); return () => clearTimeout(t) }, [])

  function addTollingEvent(yearIndex: number) {
    setCSEDData((prev) => {
      const next = [...prev]
      const entry = { ...next[yearIndex] }
      entry.tollingEvents = [...entry.tollingEvents, { id: crypto.randomUUID(), eventType: 'OIC_Pending', startDate: '', endDate: '', extraDays: 30 }]
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

  function updateTollingEvent(yearIndex: number, eventId: string, field: keyof TollingEventEntry, value: string | number) {
    setCSEDData((prev) => {
      const next = [...prev]
      const entry = { ...next[yearIndex] }
      entry.tollingEvents = entry.tollingEvents.map((e) => e.id === eventId ? { ...e, [field]: value } : e)
      next[yearIndex] = entry
      return next
    })
  }

  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])

  const computedRows = useMemo(() =>
    csedData.map((entry) => {
      const baseCSED = addDaysToDate(entry.assessmentDate, CSED_DAYS)
      const tollingDays = computeTollingDays(entry.tollingEvents)
      const adjustedCSED = addDaysToDate(entry.assessmentDate, CSED_DAYS + tollingDays)
      const remaining = monthsBetween(today, adjustedCSED)
      const remainingDays = daysBetween(today, adjustedCSED)
      const isExpired = adjustedCSED <= today
      const elapsed = daysBetween(new Date(entry.assessmentDate), today)
      const totalSpan = CSED_DAYS + tollingDays
      const pct = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100))
      return { taxYear: entry.taxYear, assessmentDate: entry.assessmentDate, baseCSED, adjustedCSED, tollingDays, remaining: Math.max(0, remaining), remainingDays: Math.max(0, remainingDays), isExpired, pct, status: isExpired ? 'expired' as const : remaining < 24 ? 'expiring' as const : 'active' as const }
    }),
  [csedData, today])

  const earliest = useMemo(() => {
    const active = computedRows.filter((r) => !r.isExpired)
    if (active.length === 0) return null
    return active.reduce((min, r) => (r.adjustedCSED < min.adjustedCSED ? r : min))
  }, [computedRows])

  const latest = useMemo(() => {
    const active = computedRows.filter((r) => !r.isExpired)
    if (active.length === 0) return null
    return active.reduce((max, r) => (r.adjustedCSED > max.adjustedCSED ? r : max))
  }, [computedRows])

  function handleContinue() {
    try {
      const tollingByYear: Record<string, TollingEventEntry[]> = {}
      csedData.forEach((entry) => { tollingByYear[entry.taxYear] = entry.tollingEvents })
      const safeCSEDData = computedRows
        .filter((r) => r.baseCSED instanceof Date && !isNaN(r.baseCSED.getTime()))
        .map((r) => ({
          taxYear: r.taxYear, baseCSED: r.baseCSED.toISOString().split('T')[0],
          adjustedCSED: r.adjustedCSED.toISOString().split('T')[0],
          tollingDays: r.tollingDays, remainingMonths: r.remaining, isExpired: r.isExpired,
        }))
      setAnswers({ tollingEvents: tollingByYear, csedData: safeCSEDData })
    } catch (e) { console.warn('CSED data save error:', e) }
    const hasPenalties = answers.hasPriorPenalties === true
    router.push(hasPenalties ? '/analysis/penalty-screening' : '/analysis/verification')
  }

  // Color logic per card
  const cardColors = ['#0A1628', '#2563EB', '#00A651', '#7C3AED', '#0D9488']

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 pb-3">
          <button onClick={() => router.back()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:border-[#2563EB]">
            <i className="fa-solid fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">CSED Review</div>
          <div className="w-9 shrink-0" />
        </div>

        {/* Heading */}
        <div className="text-center py-1">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-[0.65rem] font-bold text-[#0A1628]">
            <i className="fa-solid fa-clock text-[9px]" /> COLLECTION TIMELINE
          </div>
          <h1 className="text-[1.35rem] font-extrabold leading-tight tracking-tight text-[#0A1628]">
            When does your tax debt expire?
          </h1>
        </div>

        {/* Info Card */}
        <div className="mt-3.5 flex gap-3 rounded-2xl border border-[rgba(10,22,40,0.1)] bg-white p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <i className="fa-solid fa-info-circle text-base text-[#0A1628]" />
          </div>
          <div>
            <div className="text-[0.82rem] font-bold text-[#0A1628] mb-1">What is CSED?</div>
            <div className="text-[0.72rem] leading-relaxed text-[#64748B]">
              The IRS has <strong className="text-[#0A1628]">10 years</strong> from the date of assessment to collect a tax debt. After the Collection Statute Expiration Date (CSED), the debt is legally uncollectible.
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="mt-4 px-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
          Your Tax Year Timeline
        </div>

        {/* Timeline Cards */}
        <div className="mt-3 space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {csedData.map((entry, yi) => {
            const row = computedRows[yi]
            const isNearest = earliest?.taxYear === entry.taxYear
            const color = cardColors[yi % cardColors.length]
            return (
              <div key={entry.taxYear} className={`rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${isNearest ? 'border-2 border-[#2563EB]' : 'border border-[#E2E8F0]'}`} style={{ position: 'relative' }}>
                {/* Year header */}
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px]" style={{ background: isNearest ? '#EFF4FF' : yi === computedRows.length - 1 ? '#E6F9EE' : '#EFF4FF' }}>
                      <i className="fa-solid fa-calendar-check text-[13px]" style={{ color }} />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#0A1628]">Tax Year {entry.taxYear}</div>
                      <div className="text-[0.68rem] text-[#94A3B8] mt-px">Assessed: {entry.assessmentDate ? fmtDate(new Date(entry.assessmentDate)) : 'Not set'}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isNearest && (
                      <div className="inline-flex items-center gap-1 rounded-full bg-[#0A1628] px-2 py-0.5 text-[0.58rem] font-extrabold uppercase tracking-wider text-white">
                        <i className="fa-solid fa-bolt text-[7px]" /> Nearest Expiration
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: isNearest ? '#EFF4FF' : yi === computedRows.length - 1 ? '#E6F9EE' : '#EFF4FF', color }}>
                      <i className="fa-solid fa-hourglass-half text-[8px]" /> {row?.remaining ?? 0} mo / {row?.remainingDays?.toLocaleString() ?? 0} days
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div className="h-full rounded-full transition-all duration-[1200ms]" style={{ background: color, width: animated ? `${row?.pct ?? 0}%` : '0%' }} />
                </div>
                <div className="mt-1.5 flex justify-between">
                  <span className="text-[0.62rem] font-medium text-[#CBD5E1]">Assessed {entry.assessmentDate ? fmtDateShort(new Date(entry.assessmentDate)) : ''}</span>
                  <span className="text-[0.62rem] font-semibold" style={{ color }}>Expires {row ? fmtDateShort(row.adjustedCSED) : ''}</span>
                </div>

                {/* Tolling Events */}
                <div className="mt-2.5 rounded-xl border border-[#F1F5F9] bg-white p-2.5">
                  <div className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#64748B]">
                    <i className="fa-solid fa-pause-circle mr-1 text-[9px]" /> Tolling Events
                  </div>
                  {entry.tollingEvents.length === 0 && (
                    <div className="text-[0.68rem] text-[#94A3B8] mb-1.5">No tolling events recorded</div>
                  )}
                  {entry.tollingEvents.map((evt) => (
                    <div key={evt.id} className="mb-2 rounded-lg bg-[#F8FAFC] p-2">
                      <div className="flex gap-1.5 mb-1.5">
                        <select value={evt.eventType} onChange={(e) => updateTollingEvent(yi, evt.id, 'eventType', e.target.value)} className="flex-1 rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2 py-1.5 text-[10px] font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]">
                          {TOLLING_EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1">
                          <div className="text-[9px] font-semibold uppercase text-[#94A3B8] mb-0.5">Start</div>
                          <input type="date" value={evt.startDate} onChange={(e) => updateTollingEvent(yi, evt.id, 'startDate', e.target.value)} className="w-full rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2 py-1.5 text-[10px] font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[9px] font-semibold uppercase text-[#94A3B8] mb-0.5">End</div>
                          <input type="date" value={evt.endDate} onChange={(e) => updateTollingEvent(yi, evt.id, 'endDate', e.target.value)} className="w-full rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2 py-1.5 text-[10px] font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                        </div>
                        <div className="w-[60px] shrink-0">
                          <div className="text-[9px] font-semibold uppercase text-[#94A3B8] mb-0.5">+Days</div>
                          <input type="number" value={evt.extraDays} onChange={(e) => updateTollingEvent(yi, evt.id, 'extraDays', Number(e.target.value) || 0)} className="w-full rounded-lg border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-2 py-1.5 text-center text-[10px] font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                        </div>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#7C3AED]">Total tolling: {computeTollingDays([evt])} days</span>
                        <button onClick={() => removeTollingEvent(yi, evt.id)} className="text-[10px] font-semibold text-[#E63946] hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addTollingEvent(yi)} className="mt-1 flex items-center gap-1 rounded-md bg-[#EFF4FF] px-2.5 py-1.5 text-[10px] font-semibold text-[#2563EB] transition-all hover:bg-[#dbe4ff]">
                    <i className="fa-solid fa-plus text-[8px]" /> Add Tolling Event
                  </button>
                </div>

                {/* Adjusted CSED */}
                <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#F5F3FF] px-2.5 py-2">
                  <i className="fa-solid fa-calendar-day text-[10px] text-[#7C3AED]" />
                  <div>
                    <span className="text-[0.68rem] font-bold text-[#7C3AED]">Adjusted CSED:</span>
                    <span className="text-[0.68rem] font-bold text-[#0A1628]"> {row ? fmtDate(row.adjustedCSED) : ''}</span>
                    <span className="text-[0.62rem] text-[#94A3B8]"> ({row && row.tollingDays > 0 ? `+${row.tollingDays} days tolling` : 'no tolling'})</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tolling Warning */}
        <div className="mt-3 flex gap-2.5 rounded-[14px] border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3.5">
          <i className="fa-solid fa-triangle-exclamation mt-0.5 shrink-0 text-sm text-[#D97706]" />
          <div>
            <div className="text-[0.78rem] font-bold text-[#92400E] mb-0.5">Tolling Events Extend Your CSED</div>
            <div className="text-[0.72rem] leading-relaxed text-[#92400E]">
              Filing an OIC <strong>pauses the CSED clock + adds 30 days</strong> after rejection. CDP hearing requests, bankruptcy filings, time abroad (6+ months), and military combat zone service also toll the statute.
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {earliest && latest && (
          <div className="mt-3 relative overflow-hidden rounded-[18px] bg-[#0A1628] p-5">
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/[0.06]" />
            <div className="absolute -bottom-5 -left-2.5 h-[60px] w-[60px] rounded-full bg-white/[0.04]" />
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/[0.15]">
                <i className="fa-solid fa-chart-line text-sm text-white" />
              </div>
              <div className="text-[0.82rem] font-bold text-white">Summary</div>
            </div>
            <div className="text-[1.1rem] font-extrabold leading-tight text-white mb-1.5">
              Your debts expire between {fmtDateShort(earliest.adjustedCSED)} &ndash; {fmtDateShort(latest.adjustedCSED)}
            </div>
            <div className="text-[0.72rem] leading-snug text-white/75 mb-2.5">
              The nearest CSED is {fmtDate(earliest.adjustedCSED)} (Tax Year {earliest.taxYear}, {earliest.remaining} months remaining). Strategic planning around these dates can maximize your resolution options.
            </div>
            <div className="flex gap-2">
              <div className="flex-1 rounded-[10px] bg-white/10 px-2.5 py-2">
                <div className="text-[0.62rem] uppercase tracking-wider text-white/50">Earliest</div>
                <div className="text-[0.82rem] font-extrabold text-white">{fmtDateShort(earliest.adjustedCSED)}</div>
                <div className="text-[0.62rem] text-white/60">{earliest.remaining} months</div>
              </div>
              <div className="flex-1 rounded-[10px] bg-white/10 px-2.5 py-2">
                <div className="text-[0.62rem] uppercase tracking-wider text-white/50">Latest</div>
                <div className="text-[0.82rem] font-extrabold text-white">{fmtDateShort(latest.adjustedCSED)}</div>
                <div className="text-[0.62rem] text-white/60">{latest.remaining} months</div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-4">
          <button
            onClick={handleContinue}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#00A651] py-4 text-[0.9rem] font-semibold text-white transition-colors hover:bg-[#008C44]"
          >
            Continue
            <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
