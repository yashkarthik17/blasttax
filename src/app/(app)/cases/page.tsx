'use client'

import Link from 'next/link'

// Placeholder types for when data comes from Supabase
interface Case {
  id: string
  caseNumber: string
  dateCreated: string
  taxpayerType: 'individual' | 'business'
  status: 'draft' | 'in-progress' | 'submitted' | 'resolved'
  totalDebt: number
}

const STATUS_STYLES: Record<Case['status'], string> = {
  draft: 'bg-[var(--muted-foreground)]/10 text-[var(--muted-foreground)]',
  'in-progress': 'bg-[var(--primary)]/10 text-[var(--primary)]',
  submitted: 'bg-[var(--warning)]/10 text-[var(--warning)]',
  resolved: 'bg-[var(--success)]/10 text-[var(--success)]',
}

const STATUS_LABELS: Record<Case['status'], string> = {
  draft: 'Draft',
  'in-progress': 'In Progress',
  submitted: 'Submitted',
  resolved: 'Resolved',
}

const TAXPAYER_STYLES: Record<Case['taxpayerType'], string> = {
  individual: 'bg-blue-500/10 text-blue-400',
  business: 'bg-purple-500/10 text-purple-400',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function CasesPage() {
  // Will be replaced with Supabase query later
  const cases: Case[] = []

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cases</h1>
            <p className="mt-1 text-[var(--muted-foreground)]">
              View and manage all your tax resolution cases.
            </p>
          </div>
          <Link
            href="/analysis/type"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
          >
            New Analysis
          </Link>
        </div>

        {/* Cases List */}
        {cases.length > 0 ? (
          <div className="space-y-3">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--muted-foreground)]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{c.caseNumber}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAXPAYER_STYLES[c.taxpayerType]}`}
                      >
                        {c.taxpayerType === 'individual' ? 'Individual' : 'Business'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Created {formatDate(c.dateCreated)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">{formatCurrency(c.totalDebt)}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[c.status]}`}
                    >
                      {STATUS_LABELS[c.status]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg
                  className="h-10 w-10 text-[var(--muted-foreground)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No cases yet</h3>
              <p className="mt-2 max-w-sm text-[var(--muted-foreground)]">
                Start an analysis to create your first case. We&apos;ll guide you through the process step by step.
              </p>
              <Link
                href="/analysis/type"
                className="mt-6 rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition"
              >
                Start Your First Analysis
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
