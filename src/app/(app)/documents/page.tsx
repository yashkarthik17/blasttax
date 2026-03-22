'use client'

import { useState } from 'react'
import Link from 'next/link'

type TabFilter = 'All' | 'IRS Forms' | 'Transcripts' | 'Uploaded' | 'Generated'

interface Doc {
  name: string
  type: 'Generated' | 'Transcript' | 'IRS Form'
  date: string
  size: string
  iconBg: string
  iconColor: string
  badgeBg: string
  badgeColor: string
}

const documents: Doc[] = [
  { name: 'Form 656 - Draft', type: 'Generated', date: 'Mar 12, 2026', size: '245 KB', iconBg: '#FFF0F1', iconColor: '#E63946', badgeBg: '#FFFBEB', badgeColor: '#D97706' },
  { name: '2023 Tax Transcript', type: 'Transcript', date: 'Mar 8, 2026', size: '128 KB', iconBg: '#EFF4FF', iconColor: '#1A1A2E', badgeBg: '#EFF4FF', badgeColor: '#2563EB' },
  { name: 'Form 433-A(OIC)', type: 'IRS Form', date: 'Mar 5, 2026', size: '312 KB', iconBg: '#E6F9EE', iconColor: '#00A651', badgeBg: '#E6F9EE', badgeColor: '#00A651' },
]

const tabs: TabFilter[] = ['All', 'IRS Forms', 'Transcripts', 'Uploaded', 'Generated']

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('All')
  const [sortBy, setSortBy] = useState('date')

  const filtered = documents.filter((doc) => {
    if (activeTab === 'All') return true
    if (activeTab === 'IRS Forms') return doc.type === 'IRS Form'
    if (activeTab === 'Transcripts') return doc.type === 'Transcript'
    if (activeTab === 'Generated') return doc.type === 'Generated'
    if (activeTab === 'Uploaded') return false // no uploaded docs in sample data
    return true
  })

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-extrabold text-[#1A1A2E]">My Documents</h1>
          </div>
          <button className="flex h-10 w-10 items-center justify-center text-[#1A1A2E]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Upload Zone */}
        <div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-[#D5D5E0] bg-white p-5 text-center transition hover:border-[#1A1A2E] hover:bg-[#FAFAFF]">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EFF4FF]">
            <svg className="h-[18px] w-[18px] text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="text-[0.85rem] font-semibold text-[#1A1A2E]">Upload Documents</div>
          <div className="text-[0.72rem] text-[#8585A0]">Drag &amp; drop or tap to browse</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition ${
                activeTab === tab ? 'bg-[#1A1A2E] text-white' : 'text-[#8585A0] hover:bg-[#F0F0F5] hover:text-[#1A1A2E]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between">
          <span className="text-[0.72rem] font-semibold text-[#8585A0]">{filtered.length} documents</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-none bg-transparent text-[0.72rem] font-semibold text-[#5C5C7A] outline-none"
          >
            <option value="date">Sort: By date</option>
            <option value="type">Sort: By type</option>
            <option value="name">Sort: By name</option>
          </select>
        </div>

        {/* Document Cards */}
        <div className="space-y-2.5">
          {filtered.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center gap-3.5 rounded-[14px] border border-[#F0F0F5] bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-[#D5D5E0] hover:shadow-md"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: doc.iconBg }}
              >
                <svg className="h-[18px] w-[18px]" style={{ color: doc.iconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="truncate text-[0.85rem] font-semibold text-[#1A1A2E]">{doc.name}</span>
                  <span
                    className="whitespace-nowrap rounded-full px-2 py-0.5 text-[0.6rem] font-semibold"
                    style={{ backgroundColor: doc.badgeBg, color: doc.badgeColor }}
                  >
                    {doc.type}
                  </span>
                </div>
                <div className="text-[0.7rem] text-[#8585A0]">{doc.date} &middot; {doc.size}</div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAFAFF]">
                  <svg className="h-3 w-3 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAFAFF]">
                  <svg className="h-3 w-3 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="flex items-center gap-2 rounded-xl bg-[#ECFDF5] px-4 py-3">
          <svg className="h-3 w-3 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[0.75rem] text-[#065F46]">All documents are encrypted and stored securely</span>
        </div>
      </div>
    </div>
  )
}
