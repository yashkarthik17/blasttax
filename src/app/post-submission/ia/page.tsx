'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type IAStatus = 'pending' | 'active' | 'default'

const STATUS_CONFIG: Record<IAStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  active: { label: 'Active', color: 'text-[#00A651]', bgColor: 'bg-[#E6F9EE]' },
  default: { label: 'Default', color: 'text-[#E63946]', bgColor: 'bg-[#FFF0F1]' },
}

interface TimelineStep {
  label: string
  description: string
  completed: boolean
  current: boolean
  icon: string
}

export default function IAPostSubmissionPage() {
  const router = useRouter()
  const [status] = useState<IAStatus>('active')
  const statusConfig = STATUS_CONFIG[status]

  const paymentData = {
    monthlyAmount: 657,
    paymentMethod: 'Direct Debit (DDIA)',
    paymentDate: '28th of each month',
    remainingBalance: 46593,
    paymentsMade: 1,
    totalPayments: 72,
    ftpRate: '0.25%/mo',
  }

  const timeline: TimelineStep[] = [
    { label: 'Application Submitted', description: 'Mar 15 — Online via IRS.gov', completed: true, current: false, icon: 'fa-check' },
    { label: 'TC 971 AC 043 Posted', description: 'Mar 15 — Pending status confirmed', completed: true, current: false, icon: 'fa-check' },
    { label: 'Levy Protection Active', description: 'IRC \u00A7 6331(k) — Protected from levies', completed: true, current: false, icon: 'fa-check' },
    { label: 'Approved — TC 971 AC 063', description: 'Mar 16 — Online = immediate approval', completed: true, current: false, icon: 'fa-check' },
    { label: 'First Payment Due', description: 'Apr 28 — $657 via Direct Debit', completed: false, current: true, icon: 'fa-arrow-right' },
  ]

  const complianceItems = [
    'File all future returns on time',
    'Pay current-year taxes on time',
    'Make all IA payments on time',
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">IA Status</span>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 px-5 py-5 pb-8">
          {/* Title + Status */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-xl font-extrabold text-[#0A1628]">Your Installment Agreement</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${statusConfig.bgColor} ${statusConfig.color}`}>
                <i className="fa-solid fa-circle text-[6px]" /> {statusConfig.label}
              </span>
              <span className="text-xs text-[#64748B]">Streamlined DDIA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Timeline Card */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-[12px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-3.5">
              Timeline
            </div>
            <div className="flex flex-col">
              {timeline.map((step, i) => (
                <div key={i} className="relative flex gap-3.5 pb-4 last:pb-0">
                  {/* Connector line */}
                  {i < timeline.length - 1 && (
                    <div className={`absolute left-[15px] top-[34px] bottom-0 w-0.5 ${step.completed ? 'bg-[#00A651]' : 'bg-[#F1F5F9]'}`} />
                  )}
                  {/* Dot */}
                  <div className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs text-white ${
                    step.completed ? 'bg-[#00A651]' : step.current ? 'bg-[#2563EB]' : 'bg-[#F8FAFC] text-[#CBD5E1] border-2 border-[#F1F5F9]'
                  }`}>
                    <i className={`fa-solid ${step.icon} text-[11px]`} />
                  </div>
                  <div>
                    <div className={`text-[13px] font-bold ${step.current ? 'text-[#2563EB]' : 'text-[#0A1628]'}`}>
                      {step.label}
                    </div>
                    <div className="text-[11px] text-[#64748B]">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Details */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4 md:row-start-1 md:col-start-2">
            <div className="text-[12px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-2.5">
              Agreement Details
            </div>
            {[
              { label: 'Monthly Payment', value: `$${paymentData.monthlyAmount}`, bold: true },
              { label: 'Payment Method', value: paymentData.paymentMethod },
              { label: 'Payment Date', value: paymentData.paymentDate },
              { label: 'Remaining Balance', value: `$${paymentData.remainingBalance.toLocaleString()}`, accent: true },
              { label: 'Payments Made', value: `${paymentData.paymentsMade} of ${paymentData.totalPayments}` },
            ].map((row, i) => (
              <div key={i} className={`flex items-center justify-between py-2 text-xs ${i > 0 ? 'border-t border-[#F1F5F9]' : ''}`}>
                <span className="text-[#64748B]">{row.label}</span>
                <span className={`font-semibold ${row.accent ? 'text-[#E63946] font-bold' : row.bold ? 'font-bold text-[#0A1628]' : 'text-[#0A1628]'}`}>
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2 border-t border-[#F1F5F9] text-xs">
              <span className="text-[#64748B]">FTP Penalty Rate</span>
              <div>
                <span className="font-semibold text-[#00A651]">{paymentData.ftpRate}</span>
                <span className="text-[10px] text-[#64748B] line-through ml-1">0.5%</span>
              </div>
            </div>
          </div>

          </div>

          {/* NFTL Status */}
          <div className="flex items-start gap-3 rounded-[14px] bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] p-3.5">
            <i className="fa-solid fa-shield-check text-[#00A651] mt-0.5" />
            <div>
              <div className="font-bold text-[13px] text-[#065F46] mb-0.5">No Lien Filed</div>
              <div className="text-xs text-[#065F46] leading-relaxed">Balance under $25K DDIA threshold. NFTL will not be filed.</div>
            </div>
          </div>

          {/* Compliance Requirements */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-[12px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-2.5">
              <i className="fa-solid fa-triangle-exclamation text-[10px] mr-1 text-[#F59E0B]" />
              Compliance Requirements
            </div>
            {complianceItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 text-xs">
                <i className="fa-solid fa-triangle-exclamation text-[#F59E0B] text-sm mt-px shrink-0" />
                <span className="text-[#0A1628] font-medium">{item}</span>
              </div>
            ))}
            <div className="mt-2 rounded-[10px] bg-[rgba(245,166,35,0.06)] p-2.5 text-[11px] text-[#92400E] leading-relaxed">
              <i className="fa-solid fa-info-circle text-[10px] mr-1" />
              Default triggers CP523 notice with a 30-day cure period before termination.
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-1 flex flex-col gap-2.5">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white">
              <i className="fa-solid fa-credit-card text-[13px]" />
              Make a Payment
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white py-4 text-[15px] font-semibold text-[#0A1628]">
              <i className="fa-solid fa-clock-rotate-left text-[13px]" />
              View Payment History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
