'use client'

import { useState } from 'react'
import Link from 'next/link'

type FilterKey = 'all' | 'active' | 'pending' | 'resolved'

const FILTERS: { key: FilterKey; label: string; dotColor?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active', dotColor: '#00A651' },
  { key: 'pending', label: 'Pending', dotColor: '#F59E0B' },
  { key: 'resolved', label: 'Resolved', dotColor: '#94A3B8' },
]

interface CaseItem {
  id: string
  caseNumber: string
  status: FilterKey
  statusLabel: string
  statusBg: string
  statusColor: string
  resolutionType: string
  resolutionIcon: string
  resolutionIconColor: string
  debt: string
  updated: string
  progressLabel: string
  progressPercent: number
  progressColor: string
  progressDotColor: string
  isComplete?: boolean
}

const CASES: CaseItem[] = [
  {
    id: '1042', caseNumber: 'Case #1042', status: 'active', statusLabel: 'Active',
    statusBg: 'bg-[#E6F9EE]', statusColor: 'text-[#00A651]',
    resolutionType: 'Offer in Compromise', resolutionIcon: 'fa-handshake', resolutionIconColor: 'text-[#0A1628]',
    debt: '$47,250', updated: 'Updated 2h ago',
    progressLabel: 'Under IRS Review', progressPercent: 60, progressColor: 'bg-[#0A1628]', progressDotColor: 'bg-[#2563EB]',
  },
  {
    id: '1038', caseNumber: 'Case #1038', status: 'pending', statusLabel: 'Pending Review',
    statusBg: 'bg-[#FFFBEB]', statusColor: 'text-[#D97706]',
    resolutionType: 'Installment Agreement', resolutionIcon: 'fa-calendar-check', resolutionIconColor: 'text-[#7C3AED]',
    debt: '$12,800', updated: 'Updated 1d ago',
    progressLabel: 'Documents Prepared', progressPercent: 85, progressColor: 'bg-[#7C3AED]', progressDotColor: 'bg-[#A78BFA]',
  },
  {
    id: '985', caseNumber: 'Case #985', status: 'resolved', statusLabel: 'Resolved',
    statusBg: 'bg-[#F8FAFC]', statusColor: 'text-[#94A3B8]',
    resolutionType: 'Penalty Abatement', resolutionIcon: 'fa-eraser', resolutionIconColor: 'text-[#0D9488]',
    debt: '$5,200', updated: 'Resolved Feb 28',
    progressLabel: 'Complete', progressPercent: 100, progressColor: 'bg-[#00A651]', progressDotColor: '',
    isComplete: true,
  },
]

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredCases = activeFilter === 'all' ? CASES : CASES.filter((c) => c.status === activeFilter)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-4 px-5 pb-8 pt-4">
          {/* Header */}
          <div className="flex items-center justify-between pt-1">
            <h1 className="text-[1.5rem] font-extrabold tracking-tight text-[#0A1628]">My Cases</h1>
            <div className="flex items-center gap-2.5">
              <div className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
                <i className="fas fa-sliders text-sm text-[#64748B]" />
              </div>
              <Link href="/analysis/type" className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#0A1628] transition hover:opacity-90">
                <i className="fas fa-plus text-sm text-white" />
              </Link>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 whitespace-nowrap rounded-full border-[1.5px] px-[18px] py-2 text-[0.78rem] font-semibold transition ${
                  activeFilter === f.key
                    ? 'border-[#0A1628] bg-[#0A1628] text-white'
                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:-translate-y-0.5'
                }`}
              >
                {f.dotColor && <i className="fas fa-circle mr-1 text-[6px]" style={{ color: activeFilter === f.key ? 'white' : f.dotColor }} />}
                {f.label}
              </button>
            ))}
          </div>

          {/* Case Cards */}
          {filteredCases.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className="block rounded-[20px] border border-[#F1F5F9] bg-white p-5 no-underline transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {/* Top row */}
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[0.9rem] font-extrabold text-[#0A1628]">{c.caseNumber}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold ${c.statusBg} ${c.statusColor}`}>
                    {c.isComplete ? <i className="fas fa-check text-[8px]" /> : <i className="fas fa-circle text-[5px]" />} {c.statusLabel}
                  </span>
                </div>
                <i className="fas fa-chevron-right text-xs text-[#CBD5E1]" />
              </div>
              {/* Resolution type */}
              <div className="mb-1.5 text-[0.82rem] font-semibold text-[#64748B]">
                <i className={`fas ${c.resolutionIcon} mr-1 text-[11px] ${c.resolutionIconColor}`} />
                {c.resolutionType}
              </div>
              {/* Debt + timestamp */}
              <div className="mb-3.5 flex items-center justify-between">
                <div className="text-[1.15rem] font-extrabold tracking-tight text-[#0A1628]">{c.debt}</div>
                <div className="text-[0.68rem] font-medium text-[#CBD5E1]">{c.updated}</div>
              </div>
              {/* Progress bar */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className={`text-[0.68rem] font-semibold ${c.isComplete ? 'text-[#00A651]' : 'text-[#94A3B8]'}`}>
                    {c.isComplete && <i className="fas fa-circle-check mr-0.5 text-[10px]" />} {c.progressLabel}
                  </span>
                  <span className={`text-[0.68rem] font-bold ${c.isComplete ? 'text-[#00A651]' : c.status === 'pending' ? 'text-[#7C3AED]' : 'text-[#0A1628]'}`}>{c.progressPercent}%</span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div className={`relative h-full rounded-full ${c.progressColor}`} style={{ width: `${c.progressPercent}%` }}>
                    {!c.isComplete && c.progressDotColor && (
                      <div className={`absolute -top-px right-0 h-[7px] w-[7px] rounded-full ${c.progressDotColor}`} />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State: Start New Analysis */}
          <Link
            href="/analysis/type"
            className="flex cursor-pointer flex-col items-center gap-2.5 rounded-[20px] border-2 border-dashed border-[#D5D5E0] p-7 text-center no-underline transition hover:-translate-y-0.5 hover:border-[#0A1628] hover:bg-[#EFF4FF]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F8FAFC] transition">
              <i className="fas fa-plus text-lg text-[#CBD5E1]" />
            </div>
            <div className="text-[0.88rem] font-bold text-[#64748B]">Start a new analysis</div>
            <div className="text-[0.75rem] leading-relaxed text-[#CBD5E1]">Get a personalized resolution recommendation</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
