'use client'

import { useState } from 'react'

type DocType = 'Transcript' | 'Form' | 'Letter'
type SortKey = 'date' | 'name' | 'size'

interface Document {
  id: string
  name: string
  type: DocType
  dateUploaded: string
  size: string
}

const TYPE_STYLES: Record<DocType, string> = {
  Transcript: 'bg-blue-500/10 text-blue-400',
  Form: 'bg-purple-500/10 text-purple-400',
  Letter: 'bg-amber-500/10 text-amber-400',
}

export default function DocumentsPage() {
  const [documents] = useState<Document[]>([])
  const [filterType, setFilterType] = useState<DocType | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortKey>('date')

  const filtered = documents.filter(
    (d) => filterType === 'all' || d.type === filterType,
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'size') return a.size.localeCompare(b.size)
    return new Date(b.dateUploaded).getTime() - new Date(a.dateUploaded).getTime()
  })

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="mt-1 text-[var(--muted-foreground)]">
              Your uploaded transcripts, forms, and IRS correspondence.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Upload
          </button>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {(['all', 'Transcript', 'Form', 'Letter'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  filterType === type
                    ? 'bg-[var(--primary)] text-white'
                    : 'border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>

        {/* Document List or Empty State */}
        {sorted.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No documents yet</h3>
              <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
                Upload transcripts and IRS notices to get started. Your documents will be securely stored and accessible from any device.
              </p>
              <button className="mt-6 flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                Upload Document
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {sorted.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 transition hover:bg-[var(--secondary)]/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--secondary)]">
                  <svg className="h-5 w-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {new Date(doc.dateUploaded).toLocaleDateString()} &middot; {doc.size}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    TYPE_STYLES[doc.type]
                  }`}
                >
                  {doc.type}
                </span>
                <button className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
