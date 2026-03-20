'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  { question: 'Will the IRS contact me directly?', answer: 'The IRS may request additional information through your representative. We\'ll handle all communications and notify you if action is needed.' },
  { question: 'Do I need to make payments?', answer: 'For a lump sum OIC, no additional payments are due during review. Your 20% initial payment was included with the submission.' },
  { question: 'What if my offer is rejected?', answer: 'You have 30 days to appeal. We\'ll guide you through alternative options including a revised offer or installment agreement.' },
]

const milestones: { label: string; date: string | null; status: 'complete' | 'current' | 'upcoming'; badge: string | null }[] = [
  { label: 'Submitted', date: 'Mar 12, 2026', status: 'complete' as const, badge: null },
  { label: 'Processability Check', date: 'Mar 18, 2026', status: 'complete' as const, badge: 'Letter 3756 received' },
  { label: 'Assigned to Examiner', date: null, status: 'current' as const, badge: null },
  { label: 'Financial Review', date: null, status: 'upcoming' as const, badge: null },
  { label: 'Decision', date: 'Expected ~Sep 2026', status: 'upcoming' as const, badge: null },
]

export default function SubmissionTrackerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/cases"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] text-[#64748B] transition hover:bg-[#F1F5F9]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Submission Tracker</h1>
          <div className="w-9" />
        </div>

        {/* Progress Circle */}
        <div className="flex flex-col items-center py-2">
          <div className="relative h-[180px] w-[180px]">
            <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
              <circle cx="90" cy="90" r="75" fill="none" stroke="#F1F5F9" strokeWidth="10" />
              <circle
                cx="90" cy="90" r="75" fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="471.24"
                strokeDashoffset="188.5"
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A1628" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#94A3B8]">Step</div>
              <div className="text-4xl font-black tracking-tight text-[#0A1628]">
                3 <span className="text-base font-semibold text-[#CBD5E1]">of 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="rounded-[20px] border border-[rgba(0,61,165,0.1)] bg-white p-5 text-center">
          <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-bold text-[#0A1628]">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Under IRS Review
          </span>
          <div className="mt-1.5 text-[0.82rem] leading-relaxed text-[#64748B]">
            Your Offer in Compromise has been assigned to an IRS examiner who is reviewing your financial information.
          </div>
          <div className="mt-3 rounded-[10px] border border-[rgba(245,166,35,0.15)] bg-[rgba(245,166,35,0.08)] px-3.5 py-2 text-[0.75rem] font-medium text-[#92400E]">
            <svg className="mr-1 inline h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Processing typically takes 6-12 months for OIC
          </div>
        </div>

        {/* Milestones */}
        <div>
          <div className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Milestones</div>
          <div className="rounded-[20px] border border-[#F1F5F9] bg-white p-5">
            {milestones.map((m, i) => (
              <div key={m.label} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  {m.status === 'complete' ? (
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#00A651]">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : m.status === 'current' ? (
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#2563EB]">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  ) : (
                    <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-[#D5D5E0] bg-[#F8FAFC]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#D5D5E0]" />
                    </div>
                  )}
                  {i < milestones.length - 1 && (
                    <div
                      className="my-1 w-0.5 min-h-[16px] flex-1"
                      style={{
                        background: m.status === 'complete' && milestones[i + 1].status === 'complete'
                          ? '#00A651'
                          : m.status === 'complete' && milestones[i + 1].status === 'current'
                            ? '#00A651'
                            : m.status === 'current'
                              ? 'linear-gradient(to bottom, #2563EB, #F1F5F9)'
                              : '#E2E8F0'
                      }}
                    />
                  )}
                </div>
                <div className="pb-[18px]">
                  <div className={`text-[0.82rem] font-bold ${
                    m.status === 'current' ? 'text-[#2563EB]' : m.status === 'complete' ? 'text-[#0A1628]' : 'text-[#94A3B8]'
                  }`}>{m.label}</div>
                  {m.date && (
                    <div className={`mt-0.5 text-[0.7rem] ${m.status === 'current' ? 'font-medium text-[#2563EB]' : 'text-[#94A3B8]'}`}>
                      {m.status === 'current' ? 'Current' : m.date}
                    </div>
                  )}
                  {!m.date && m.status === 'current' && (
                    <div className="mt-0.5 text-[0.7rem] font-medium text-[#2563EB]">Current</div>
                  )}
                  {!m.date && m.status === 'upcoming' && (
                    <div className="mt-0.5 text-[0.7rem] text-[#CBD5E1]">Upcoming</div>
                  )}
                  {m.badge && (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#065F46]">
                      <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {m.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="overflow-hidden rounded-[20px] border border-[#F1F5F9] bg-white">
          <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
              <svg className="h-3.5 w-3.5 text-[#0A1628]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
              </svg>
            </div>
            <span className="text-[0.88rem] font-bold text-[#0A1628]">What to expect during review</span>
          </div>
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-[#F8FAFC] ${i < faqs.length - 1 || openFaq === i ? 'border-b border-[#F1F5F9]' : ''}`}
              >
                <span className="text-[0.8rem] font-semibold text-[#64748B]">{faq.question}</span>
                <svg
                  className={`h-2.5 w-2.5 shrink-0 text-[#CBD5E1] transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all ${openFaq === i ? 'max-h-48 px-4 pb-3.5' : 'max-h-0'}`}>
                <p className="text-[0.78rem] leading-relaxed text-[#94A3B8]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Expert */}
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-4 py-4 text-[0.88rem] font-bold text-white shadow-sm transition hover:-translate-y-0.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Contact Your Expert
        </button>
      </div>
    </div>
  )
}
