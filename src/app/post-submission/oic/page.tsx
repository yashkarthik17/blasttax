'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface TimelineStep {
  label: string
  description: string
  completed: boolean
  current: boolean
  pending: boolean
  icon: string
}

export default function OICPostSubmissionPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const timeline: TimelineStep[] = [
    { label: 'Day 0: OIC Submitted', description: 'Mar 15 — Certified mail', completed: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Wk 1-3: Processability Review', description: 'Passed — Mar 28', completed: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'TC 480 Posted — CSED Tolled', description: 'Mar 28 — Collection statute paused', completed: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Letter 3756 Received', description: 'Apr 5 — 24-month clock started', completed: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Routed to COIC', description: 'Apr 20 — Brookhaven, NY', completed: true, current: false, pending: false, icon: 'fa-check' },
    { label: 'Mo 2-6: Examiner Assignment', description: 'Letter 4450 expected', completed: false, current: true, pending: false, icon: 'fa-hourglass-half' },
    { label: 'Mo 3-12: Investigation Phase', description: 'Examiner reviews financials', completed: false, current: false, pending: true, icon: 'fa-magnifying-glass' },
    { label: 'Mo 6-18: Decision', description: 'Accept, reject, or counteroffer', completed: false, current: false, pending: true, icon: 'fa-gavel' },
  ]

  const reminders = [
    { text: 'Stay current on all tax filings', warning: true },
    { text: 'Continue periodic payments (not refunded if rejected)', warning: true },
    { text: 'Respond to all IRS requests within deadlines', warning: true },
    { text: 'Refunds will be offset (TC 826)', muted: true, warning: true },
    { text: 'No levy while TC 480 active', success: true },
  ]

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">OIC Status</span>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3.5 px-5 py-5 pb-8">
          {/* Title */}
          <div>
            <h1 className="text-xl font-extrabold text-[#0A1628] mb-1.5">Your Offer in Compromise</h1>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-[11px] font-bold text-[#2563EB]">
                <i className="fa-solid fa-clock text-[8px]" /> In Review
              </span>
              <span className="text-xs text-[#64748B]">DATC — $8,500</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Timeline */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-3">
              Lifecycle Timeline
            </div>
            <div className="flex flex-col">
              {timeline.map((step, i) => (
                <div key={i} className="relative flex gap-3.5 pb-3.5 last:pb-0">
                  {i < timeline.length - 1 && (
                    <div className={`absolute left-[14px] top-[32px] bottom-0 w-0.5 ${step.completed ? 'bg-[#00A651]' : 'bg-[#F1F5F9]'}`} />
                  )}
                  <div className={`relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] ${
                    step.completed ? 'bg-[#00A651] text-white'
                      : step.current ? 'bg-[#2563EB] text-white'
                      : 'bg-[#F8FAFC] text-[#CBD5E1] border-2 border-[#F1F5F9]'
                  }`}>
                    <i className={`fa-solid ${step.icon} text-[10px]`} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${step.current ? 'text-[#2563EB]' : step.pending ? 'text-[#94A3B8]' : 'text-[#0A1628]'}`}>
                      {step.label}
                    </div>
                    <div className={`text-[10px] ${step.completed && step.description.includes('Passed') ? 'text-[#00A651] font-semibold' : step.pending ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status Pulse */}
          <div className="flex items-center gap-3 rounded-[14px] bg-[#EFF4FF] border-[1.5px] border-[rgba(37,99,235,0.15)] p-3.5 w-full">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]">
              <i className="fa-solid fa-satellite-dish text-white text-base" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#0A1628]">Awaiting Examiner Assignment</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">24-month deadline: <strong>Apr 5, 2028</strong></div>
              <div className="text-[10px] text-[#2563EB] font-semibold mt-0.5">
                If no decision by then: Deemed Accepted (IRC &sect; 7122(f))
              </div>
            </div>
          </div>

          </div>

          {/* Reminders */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-2.5">
              <i className="fa-solid fa-bell text-[10px] mr-1" />
              During Review Reminders
            </div>
            {reminders.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 py-[7px] text-xs leading-relaxed">
                <i className={`fa-solid ${item.success ? 'fa-circle-check text-[#00A651]' : 'fa-triangle-exclamation text-[#F59E0B]'} text-[13px] mt-0.5 shrink-0`} />
                <span className={`font-medium ${item.muted ? 'text-[#64748B]' : 'text-[#0A1628]'}`}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-1 flex flex-col gap-2.5">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2563EB] py-4 text-[15px] font-bold text-white">
              <i className="fa-solid fa-folder-open text-[13px]" />
              View Documents
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white py-4 text-[15px] font-semibold text-[#0A1628]">
              <i className="fa-solid fa-comment-dots text-[13px]" />
              Message Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
