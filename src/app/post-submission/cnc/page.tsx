'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CNCPostSubmissionPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const timelineItems = [
    { label: 'CNC Request Made', date: 'Mar 15', completed: true },
    { label: 'IRS Reviewed Financials (Form 433-F)', date: 'Mar 22', completed: true },
    { label: 'TC 530 Posted (Closing Code 03: Hardship)', date: 'Mar 25', completed: true },
    { label: 'Letter 4223 Mailed (Confirmation)', date: 'Mar 28', completed: true },
    { label: 'Next Annual Review', date: 'Mar 2027', completed: false },
  ]

  const effects = [
    { icon: 'fa-circle-check', color: 'text-[#00A651]', label: 'Collection activity stopped', sub: null },
    { icon: 'fa-circle-check', color: 'text-[#00A651]', label: 'CSED running', sub: 'Debt expires 2028-2031' },
    { icon: 'fa-triangle-exclamation', color: 'text-[#F59E0B]', label: 'Interest accruing', sub: '~$150/month still adding up' },
    { icon: 'fa-triangle-exclamation', color: 'text-[#F59E0B]', label: 'Tax refunds will be offset', sub: null },
    { icon: 'fa-triangle-exclamation', color: 'text-[#F59E0B]', label: 'NFTL may be on file', sub: null },
  ]

  const warnings = [
    { icon: 'fa-exclamation-circle', text: 'If your income increases significantly, IRS may revoke CNC' },
    { icon: 'fa-eye', text: 'Annual review via W-2/1099 data matching' },
    { icon: 'fa-rotate-left', text: 'If revoked (TC 531): back to active collection' },
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
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">CNC Status</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-ellipsis-vertical text-[#94A3B8]" />
          </button>
        </div>

        <div className="px-5 py-5 pb-8">
          {/* Title + Badge */}
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-extrabold text-[#0A1628] leading-tight">Currently Not Collectible</h1>
            <span className="shrink-0 rounded-full bg-[#00A651] px-2.5 py-[3px] text-[11px] font-bold text-white whitespace-nowrap">Active</span>
          </div>

          {/* Timeline */}
          <div className="mt-5 mb-5">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative flex gap-3.5 pb-5 last:pb-0">
                {i < timelineItems.length - 1 && (
                  <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${item.completed ? 'bg-[#00A651]' : 'bg-[#F1F5F9]'}`} />
                )}
                <div className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] ${
                  item.completed ? 'bg-[#E6F9EE] text-[#00A651]' : 'bg-[#EFF4FF] text-[#2563EB]'
                }`}>
                  <i className={`fa-solid ${item.completed ? 'fa-check' : 'fa-hourglass-half text-[11px]'}`} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#0A1628]">{item.label}</p>
                  <p className={`text-xs ${!item.completed ? 'text-[#2563EB] font-medium' : 'text-[#64748B]'}`}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Effects Card */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-4">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-[0.06em] mb-2.5">Active Effects</p>
            {effects.map((eff, i) => (
              <div key={i} className={`flex items-start gap-2.5 py-2.5 text-[13px] ${i < effects.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                <i className={`fa-solid ${eff.icon} ${eff.color} text-sm mt-0.5`} />
                <div>
                  <p className="font-medium text-[#0A1628]">{eff.label}</p>
                  {eff.sub && <p className="text-[11px] text-[#64748B]">{eff.sub}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* CSED Countdown */}
          <div className="rounded-2xl bg-[#F0FDFA] border border-[rgba(13,148,136,0.15)] p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-clock text-[#0D9488] text-base" />
              <p className="text-sm font-bold text-[#0A1628]">CSED Countdown</p>
            </div>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl font-black text-[#0D9488]">2 yrs, 6 mo</span>
            </div>
            <p className="text-xs text-[#64748B] mb-3">Nearest expiration: <span className="font-semibold">Sep 2028</span></p>
            <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-[#00A651]" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-[#94A3B8]">Assessment</span>
              <span className="text-[10px] text-[#94A3B8]">Expiration</span>
            </div>
            <div className="mt-3.5 rounded-[10px] bg-white border border-[#F1F5F9] p-2.5">
              <p className="text-xs text-[#065F46] font-medium">
                <i className="fa-solid fa-sparkles text-[#0D9488] mr-1" />
                When CSED expires: TC 608 posts, debt is legally gone
              </p>
            </div>
          </div>

          {/* Risk Warnings */}
          <div className="mb-4">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-[0.06em] mb-2.5">Important Warnings</p>
            <div className="flex flex-col gap-2">
              {warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl bg-[#FFFBEB] border border-[rgba(245,166,35,0.2)] p-3">
                  <i className={`fa-solid ${w.icon} text-[#D97706] text-sm mt-0.5`} />
                  <p className="text-xs text-[#92400E] font-medium">{w.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white">
              <i className="fa-solid fa-pen-to-square" />
              Update Financial Info
            </button>
          </div>
          <div className="mt-3 text-center">
            <a href="#" className="text-[13px] font-semibold text-[#0A1628]">
              <i className="fa-solid fa-clock text-[11px] mr-1" />
              Check CSED Status
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
