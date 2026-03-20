'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

type MilestoneStatus = 'completed' | 'in-progress' | 'pending' | 'not-started'

interface Milestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  expectedDate: string
  completedDate?: string
}

const STATUS_CONFIG: Record<
  MilestoneStatus,
  { dot: string; badge: string; label: string }
> = {
  completed: {
    dot: 'bg-emerald-400',
    badge: 'bg-[#00A651]/10 text-[#00A651]',
    label: 'Completed',
  },
  'in-progress': {
    dot: 'bg-[var(--primary)]',
    badge: 'bg-[var(--primary)]/10 text-[var(--primary)]',
    label: 'In Progress',
  },
  pending: {
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-400',
    label: 'Pending',
  },
  'not-started': {
    dot: 'bg-[#CBD5E1]',
    badge: 'bg-[#94A3B8]/10 text-[#64748B]',
    label: 'Not Started',
  },
}

const SAMPLE_MILESTONES: Milestone[] = []

export default function SubmissionTrackerPage() {
  const params = useParams()
  const caseId = params.id as string
  const caseNumber = `BT-${caseId?.slice(0, 6)?.toUpperCase() || '000000'}`

  const milestones: Milestone[] = SAMPLE_MILESTONES

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <Link href="/cases" className="hover:text-[var(--foreground)] transition">
            Cases
          </Link>
          <span>/</span>
          <Link href={`/cases/${caseId}`} className="hover:text-[var(--foreground)] transition">
            {caseNumber}
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Submission Tracker</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Submission Tracker</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Track milestones and submission progress for {caseNumber}.
          </p>
        </div>

        {/* Timeline or Empty State */}
        {milestones.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No submissions tracked yet</h3>
              <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
                Once you submit forms to the IRS, milestones and expected timelines will appear here so you can track progress.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            {/* Expected Timeline Bar */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[var(--muted-foreground)]">Expected Timeline</h3>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-[var(--secondary)] overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-[var(--primary)] transition-all"
                    style={{
                      width: `${(milestones.filter((m) => m.status === 'completed').length / milestones.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-[var(--muted-foreground)]">
                  {milestones.filter((m) => m.status === 'completed').length}/{milestones.length}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {milestones.map((milestone, index) => {
                const config = STATUS_CONFIG[milestone.status]
                const isLast = index === milestones.length - 1
                return (
                  <div key={milestone.id} className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full ${config.dot} shrink-0 mt-1.5`} />
                      {!isLast && (
                        <div className="w-px flex-1 bg-[var(--border)]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.badge}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {milestone.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                        <span>Expected: {milestone.expectedDate}</span>
                        {milestone.completedDate && (
                          <span className="text-[#00A651]">
                            Completed: {milestone.completedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
