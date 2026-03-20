'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChecklistStep {
  id: string
  label: string
  detail: string
  completed: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PlanPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)
  const result = answers.calculationResult as {
    rcp?: { nre: number; rcpLumpSum: number }
    mdi?: { mdi: number }
    totalDebt?: number
  } | undefined

  const totalDebt = result?.totalDebt ?? 47250
  const rcp = result?.rcp?.rcpLumpSum ?? 8500
  const mdi = result?.mdi?.mdi ?? 0
  const downPayment = Math.round(rcp * 0.2)

  const [steps, setSteps] = useState<ChecklistStep[]>([
    { id: '1', label: 'Complete Form 656 (OIC Application)', detail: 'Main application form for Offer in Compromise.', completed: true },
    { id: '2', label: 'Complete Form 433-A(OIC) (Financial Statement)', detail: 'Detailed financial statement required for OIC processing.', completed: true },
    { id: '3', label: 'Gather supporting documents', detail: 'Bank statements, pay stubs, tax returns, and asset documentation from the last 3 months.', completed: false },
    { id: '4', label: 'Pay $205 application fee', detail: 'Non-refundable fee paid to the IRS. May be waived for low-income applicants (Form 656-A).', completed: false },
    { id: '5', label: `Submit 20% initial payment (${fmt(downPayment)})`, detail: 'Required with lump sum offers. This payment is applied to your tax liability if the offer is accepted.', completed: false },
    { id: '6', label: 'Submit to IRS', detail: "We'll compile everything and submit your complete OIC package to the IRS on your behalf.", completed: false },
  ])

  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({})

  const completedCount = steps.filter(s => s.completed).length
  const totalSteps = steps.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)
  const circumference = 2 * Math.PI * 18
  const strokeDashoffset = circumference - (progressPct / 100) * circumference

  function toggleCheck(id: string) {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s))
  }

  function toggleExpand(id: string) {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md px-5 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 pb-3">
          <button onClick={() => router.back()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F3F4F6] bg-[#F8FAFC] transition-all hover:border-[#2563EB]">
            <i className="fa-solid fa-arrow-left text-sm text-[#64748B]" />
          </button>
          <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Your Action Plan</div>
          <div className="w-9 shrink-0" />
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-[20px] bg-[#0A1628] p-6">
          <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/[0.15] px-2.5 py-1 text-[0.65rem] font-semibold text-white">
            <i className="fa-solid fa-star text-[8px]" /> RECOMMENDED
          </div>
          <div className="text-[1.1rem] font-extrabold text-white mb-1.5">Offer in Compromise</div>
          <div className="text-[0.82rem] font-medium text-white/75 mb-4">Lump Sum Payment Option</div>
          <div className="mb-2 flex items-baseline gap-2">
            <div className="text-[2rem] font-black leading-none tracking-tight text-white">{fmt(rcp)}</div>
            <div className="text-[0.75rem] font-medium text-white/60">offer amount</div>
          </div>
          <div className="rounded-xl border border-white/[0.12] bg-white/10 px-3.5 py-2.5">
            <div className="text-[0.78rem] font-medium leading-snug text-white/90">
              <i className="fa-solid fa-info-circle mr-1 text-[10px]" />
              20% down ({fmt(downPayment)}) + remaining within 5 months
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-4 flex items-center gap-3 rounded-[14px] border border-[#F3F4F6] bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex-1">
            <div className="text-[0.82rem] font-bold text-[#0A1628]">{completedCount} of {totalSteps} steps complete</div>
            <div className="mt-0.5 text-[0.72rem] text-[#94A3B8]">{"Keep going, you're making progress!"}</div>
          </div>
          <div className="relative h-11 w-11">
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#F1F5F9" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="#00A651" strokeWidth="4" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[0.7rem] font-extrabold text-[#00A651]">{progressPct}%</div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-4">
          <div className="mb-3 px-1 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">Required Steps</div>
          <div className="overflow-hidden rounded-[20px] border border-[#F3F4F6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {steps.map((step) => {
              const isExpanded = expandedSteps[step.id] && !step.completed
              return (
                <div key={step.id} className="border-b border-[#F1F5F9] last:border-b-0">
                  <div className="flex items-start gap-3 px-4 py-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleCheck(step.id)}
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                        step.completed
                          ? 'border-[#00A651] bg-[#00A651]'
                          : 'border-[#D5D5E0] bg-white'
                      }`}
                    >
                      {step.completed && <i className="fa-solid fa-check text-[11px] text-white" />}
                    </button>

                    {/* Label */}
                    <div className="flex-1" onClick={() => !step.completed && toggleExpand(step.id)} style={{ cursor: step.completed ? 'default' : 'pointer' }}>
                      <div className={`text-[0.82rem] font-semibold transition-all ${step.completed ? 'text-[#94A3B8] line-through' : 'text-[#0A1628]'}`}>
                        {step.label}
                      </div>
                      {step.completed && (
                        <div className="mt-0.5 text-[0.7rem] font-medium text-[#00A651]">
                          <i className="fa-solid fa-check-circle mr-0.5 text-[9px]" /> Completed
                        </div>
                      )}
                      {isExpanded && (
                        <div className="mt-2 text-[0.72rem] leading-snug text-[#94A3B8]">{step.detail}</div>
                      )}
                    </div>

                    {/* Chevron */}
                    {!step.completed && (
                      <button onClick={() => toggleExpand(step.id)} className="mt-1">
                        <i className={`fa-solid fa-chevron-down text-[10px] text-[#CBD5E1] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={() => router.push('/forms/form-656')}
            className="rounded-full bg-[#00A651] px-6 py-4 text-center text-[0.88rem] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-file-pen mr-2" /> Begin Form 656
          </button>
          <button
            onClick={() => router.push('/expert')}
            className="rounded-full border-[1.5px] border-[#F3F4F6] bg-white px-6 py-3.5 text-center text-[0.85rem] font-semibold text-[#64748B]"
          >
            <i className="fa-solid fa-headset mr-1.5 text-[#0A1628]" /> Talk to an expert first
          </button>
        </div>
      </div>
    </div>
  )
}
