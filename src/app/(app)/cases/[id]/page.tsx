'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type TabKey = 'overview' | 'documents' | 'notes' | 'submissions'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'documents', label: 'Documents' },
  { key: 'notes', label: 'Notes' },
  { key: 'submissions', label: 'Submissions' },
]

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  // Placeholder data - will be replaced with Supabase query
  const caseData = {
    caseNumber: `BT-${caseId?.slice(0, 6)?.toUpperCase() || '000000'}`,
    status: 'in-progress' as const,
    totalDebt: 0,
    dateCreated: new Date().toISOString(),
    taxpayerType: 'individual' as const,
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <Link href="/cases" className="hover:text-[var(--foreground)] transition">
            Cases
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{caseData.caseNumber}</span>
        </nav>

        {/* Case Header */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{caseData.caseNumber}</h1>
                <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                  In Progress
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Created {new Date(caseData.dateCreated).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--muted-foreground)]">Total Debt</p>
              <p className="text-3xl font-bold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  caseData.totalDebt,
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--border)]">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-3 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          {/* ========= OVERVIEW ========= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Debt Breakdown */}
              <div>
                <h3 className="text-lg font-semibold">Debt Breakdown</h3>
                <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <svg
                      className="h-10 w-10 text-[var(--muted-foreground)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                      Debt breakdown will appear once your analysis is complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resolution Recommendation */}
              <div>
                <h3 className="text-lg font-semibold">Resolution Recommendation</h3>
                <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <svg
                      className="h-10 w-10 text-[var(--muted-foreground)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                      Resolution recommendations will be generated after your analysis is reviewed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-left transition hover:border-[var(--muted-foreground)]">
                    <svg className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="mt-2 text-sm font-medium">Upload Document</p>
                  </button>
                  <button className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-left transition hover:border-[var(--muted-foreground)]">
                    <svg className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <p className="mt-2 text-sm font-medium">Add Note</p>
                  </button>
                  <button className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-left transition hover:border-[var(--muted-foreground)]">
                    <svg className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <p className="mt-2 text-sm font-medium">Submit to IRS</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========= DOCUMENTS ========= */}
          {activeTab === 'documents' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No documents yet</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Upload tax documents, IRS notices, and other relevant files here.
              </p>
              <button className="mt-4 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--secondary)] transition">
                Upload Document
              </button>
            </div>
          )}

          {/* ========= NOTES ========= */}
          {activeTab === 'notes' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notes yet</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Add notes to track important details about this case.
              </p>
              <button className="mt-4 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:bg-[var(--secondary)] transition">
                Add Note
              </button>
            </div>
          )}

          {/* ========= SUBMISSIONS ========= */}
          {activeTab === 'submissions' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No submissions yet</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                IRS form submissions and their statuses will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
