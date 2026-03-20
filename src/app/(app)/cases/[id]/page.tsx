'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

type TabKey = 'timeline' | 'documents' | 'notes' | 'alerts'

const TABS: { key: TabKey; label: string; icon: string; badge?: number }[] = [
  { key: 'timeline', label: 'Timeline', icon: 'fa-timeline' },
  { key: 'documents', label: 'Documents', icon: 'fa-file-lines' },
  { key: 'notes', label: 'Notes', icon: 'fa-sticky-note' },
  { key: 'alerts', label: 'Alerts', icon: 'fa-bell', badge: 2 },
]

const TIMELINE_STEPS = [
  { label: 'Analysis Complete', date: 'Mar 3, 2026', status: 'complete' as const },
  { label: 'Documents Prepared', date: 'Mar 8, 2026', status: 'complete' as const },
  { label: 'OIC Submitted (Day 0)', date: 'Mar 12, 2026', status: 'complete' as const },
  { label: 'Processability Review Passed', date: 'Mar 28', status: 'complete' as const },
  { label: 'TC 480 Posted \u2014 CSED Now Tolled', date: 'Mar 28', status: 'complete' as const },
  { label: 'Letter 3756 Received', date: 'Apr 5 (24-month clock started)', status: 'complete' as const },
  { label: 'Routed to COIC (Brookhaven)', date: 'Apr 20', status: 'complete' as const },
  { label: 'Examiner Assignment', date: 'Letter 4450 expected', status: 'current' as const },
  { label: 'Financial Review', date: 'Upcoming', status: 'upcoming' as const },
  { label: 'Decision', date: 'Expected ~Sep 2026', status: 'upcoming' as const },
]

export default function CaseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const caseId = params.id as string
  const [activeTab, setActiveTab] = useState<TabKey>('timeline')

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
            <i className="fas fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="text-[0.95rem] font-extrabold text-[#0A1628]">Case #{caseId}</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] transition hover:bg-[#EFF4FF]">
            <i className="fas fa-share-nodes text-sm text-[#64748B]" />
          </div>
        </div>

        <div className="px-5">
          {/* Status Badge Strip */}
          <div className="mb-3.5 flex items-center gap-2 rounded-[14px] border border-[rgba(0,166,81,0.12)] bg-[#ECFDF5] px-4 py-2.5">
            <div className="h-2 w-2 rounded-full bg-[#00A651]" />
            <span className="text-[0.82rem] font-bold text-[#065F46]">Active</span>
            <span className="text-[0.82rem] font-medium text-[#64748B]"> &mdash; Offer in Compromise</span>
          </div>

          {/* Alert Banner */}
          <div className="mb-3.5 rounded-[14px] border border-[rgba(37,99,235,0.15)] bg-[#EFF4FF] p-3.5">
            <div className="flex items-start gap-2.5">
              <div className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(37,99,235,0.12)]">
                <i className="fas fa-clock text-xs text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-[0.78rem] font-bold text-[#1E40AF]">Awaiting Examiner Assignment</div>
                <div className="text-[0.7rem] text-[#3B82F6]">24-month deadline: Apr 2028</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('timeline')}
              className="mt-2.5 w-full rounded-[10px] bg-[#0A1628] px-3 py-2 text-[0.72rem] font-bold text-white"
            >
              <i className="fas fa-timeline mr-1 text-[9px]" /> View Timeline
            </button>
          </div>

          {/* Hero Stats Row */}
          <div className="mb-4 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-[#F1F5F9] bg-white p-3.5 text-center">
              <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wider text-[#CBD5E1]">Original Debt</div>
              <div className="text-[1.05rem] font-extrabold tracking-tight text-[#94A3B8]">$47,250</div>
            </div>
            <div className="rounded-2xl border border-[rgba(0,166,81,0.15)] bg-[#ECFDF5] p-3.5 text-center">
              <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wider text-[#065F46]">Offer Amount</div>
              <div className="text-[1.2rem] font-black tracking-tight text-[#00A651]">$8,500</div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#F1F5F9] bg-white p-3.5 text-center">
              <div className="mb-1 text-[0.6rem] font-semibold uppercase tracking-wider text-[#CBD5E1]">Savings</div>
              <span className="inline-flex rounded-full bg-[#00A651] px-3 py-1 text-base font-extrabold text-white">82%</span>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="sticky top-0 z-10 -mx-5 border-b border-[#E2E8F0] bg-white px-5">
            <div className="flex justify-between">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 py-2.5 text-center text-[0.78rem] font-semibold transition ${
                    activeTab === tab.key ? 'font-bold text-[#0A1628]' : 'text-[#94A3B8]'
                  }`}
                >
                  <i className={`fas ${tab.icon} mr-1 text-[10px]`} />
                  {tab.label}
                  {tab.badge && (
                    <span className="absolute right-2 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#F8FAFC] bg-[#E63946] text-[0.55rem] font-extrabold text-white">
                      {tab.badge}
                    </span>
                  )}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#0A1628]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-4 pb-8">
            {activeTab === 'timeline' && (
              <div>
                <div className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">OIC Lifecycle</div>
                <div className="rounded-[18px] border border-[#F1F5F9] bg-white px-4 py-5">
                  {TIMELINE_STEPS.map((step, i) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {step.status === 'complete' ? (
                          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#00A651]">
                            <i className="fas fa-check text-[10px] text-white" />
                          </div>
                        ) : step.status === 'current' ? (
                          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#2563EB]">
                            <i className="fas fa-sync-alt animate-spin text-[9px] text-white" />
                          </div>
                        ) : (
                          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-[#D5D5E0] bg-[#F8FAFC]">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#D5D5E0]" />
                          </div>
                        )}
                        {i < TIMELINE_STEPS.length - 1 && (
                          <div
                            className="my-1 min-h-[16px] w-0.5 flex-1"
                            style={{
                              background:
                                step.status === 'complete' ? '#00A651'
                                  : step.status === 'current' ? 'linear-gradient(to bottom, #2563EB, #F1F5F9)'
                                  : '#E2E8F0',
                            }}
                          />
                        )}
                      </div>
                      <div className="pb-3.5">
                        <div className={`text-[0.8rem] font-bold ${step.status === 'current' ? 'text-[#2563EB]' : step.status === 'complete' ? 'text-[#0A1628]' : 'text-[#94A3B8]'}`}>
                          {step.label}
                        </div>
                        <div className={`mt-px text-[0.68rem] ${step.status === 'current' ? 'font-medium text-[#3B82F6]' : step.status === 'upcoming' ? 'text-[#CBD5E1]' : 'text-[#94A3B8]'}`}>
                          {step.date}
                        </div>
                        {step.status === 'current' && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-lg bg-[#EFF4FF] px-2 py-1 text-[0.65rem] font-semibold text-[#0A1628]">
                            <i className="fas fa-circle text-[5px] text-[#2563EB]" /> ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="flex flex-col items-center justify-center rounded-[18px] border border-[#F1F5F9] bg-white py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8FAFC]">
                  <i className="fas fa-file-lines text-xl text-[#CBD5E1]" />
                </div>
                <div className="text-[0.88rem] font-bold text-[#64748B]">No documents yet</div>
                <div className="mt-1 text-[0.75rem] text-[#CBD5E1]">Upload tax documents and IRS notices here</div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="flex flex-col items-center justify-center rounded-[18px] border border-[#F1F5F9] bg-white py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8FAFC]">
                  <i className="fas fa-sticky-note text-xl text-[#CBD5E1]" />
                </div>
                <div className="text-[0.88rem] font-bold text-[#64748B]">No notes yet</div>
                <div className="mt-1 text-[0.75rem] text-[#CBD5E1]">Add notes to track important details</div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="flex flex-col items-center justify-center rounded-[18px] border border-[#F1F5F9] bg-white py-16 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8FAFC]">
                  <i className="fas fa-bell text-xl text-[#CBD5E1]" />
                </div>
                <div className="text-[0.88rem] font-bold text-[#64748B]">No new alerts</div>
                <div className="mt-1 text-[0.75rem] text-[#CBD5E1]">Case alerts will appear here</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2.5">
              <Link href="/submission-tracker" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0A1628] px-4 py-3.5 text-[0.82rem] font-bold text-white no-underline transition hover:-translate-y-0.5">
                <i className="fas fa-location-arrow text-xs" /> Track Submission
              </Link>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-4 py-3.5 text-[0.82rem] font-bold text-[#0A1628] transition hover:-translate-y-0.5">
                <i className="fas fa-headset text-xs text-[#7C3AED]" /> Contact Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
