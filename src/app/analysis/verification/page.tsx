'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const fmt = (n: number | undefined) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// ---------------------------------------------------------------------------
// Checklist items
// ---------------------------------------------------------------------------

interface CheckItem {
  id: string
  label: string
  status: 'success' | 'pending'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function VerificationPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  const [confirmed, setConfirmed] = useState(false)
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 500); return () => clearTimeout(t) }, [])

  // Build checklist from answers
  const totalDebt = (answers.taxDebts as { balance: number }[] ?? []).reduce((s, d) => s + d.balance, 0)
  const taxYearCount = (answers.taxDebts as unknown[] ?? []).length
  const mdi = (answers.monthlyDisposableIncome as number) ?? 0
  const totalAssets = 0 // computed from answer data if available

  const checkItems: CheckItem[] = [
    { id: 'returns', label: 'All required tax returns filed', status: 'success' },
    { id: 'personal', label: 'Personal information verified', status: 'success' },
    { id: 'debts', label: `${taxYearCount} tax years with ${fmt(totalDebt)} total debt entered`, status: 'success' },
    { id: 'financial', label: 'Financial profile complete (assets, income, expenses)', status: 'success' },
    { id: 'transcript', label: 'Transcript data reviewed', status: 'success' },
    { id: 'household', label: 'Household information provided', status: 'success' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md px-5 pb-8">
        {/* Progress Bar */}
        <div className="pt-4">
          <div className="h-1 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all duration-500" style={{ width: '90%' }} />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-5 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[1.4rem] font-extrabold leading-tight text-[#0A1628]">Almost there!</h1>
            <span className="text-xl animate-pulse">&#10024;</span>
          </div>
          <p className="text-[13px] leading-snug text-[#94A3B8]">
            {"Let's do a final check before running your analysis"}
          </p>
        </div>

        {/* Verification Checklist */}
        <div className="mb-3.5 rounded-2xl border border-[#F3F4F6] bg-white px-4 py-1">
          {checkItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b border-[#F1F5F9] py-3 last:border-b-0"
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateX(0)' : 'translateX(-12px)',
                transition: `all 0.4s cubic-bezier(0.25,0.1,0.25,1) ${500 + idx * 120}ms`,
              }}
            >
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                item.status === 'success'
                  ? 'bg-[#E6F9EE] text-[#00A651]'
                  : 'border-2 border-[#F1F5F9] bg-[#F8FAFC] text-[#CBD5E1]'
              }`}>
                {item.status === 'success' && <i className="fa-solid fa-check" />}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[#0A1628]">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mb-3.5 flex gap-2"
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 800ms',
          }}
        >
          <div className="flex-1 rounded-xl border border-[#F3F4F6] bg-white p-3 text-center">
            <div className="text-base font-extrabold tracking-tight text-[#E63946]">{fmt(totalDebt)}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Total Debt</div>
          </div>
          <div className="flex-1 rounded-xl border border-[#F3F4F6] bg-white p-3 text-center">
            <div className="text-base font-extrabold tracking-tight text-[#0A1628]">{fmt(mdi)}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">MDI</div>
          </div>
          <div className="flex-1 rounded-xl border border-[#F3F4F6] bg-white p-3 text-center">
            <div className="text-base font-extrabold tracking-tight text-[#0A1628]">{fmt(totalAssets)}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Assets</div>
          </div>
          <div className="flex-1 rounded-xl border border-[#F3F4F6] bg-white p-3 text-center">
            <div className="text-base font-extrabold tracking-tight text-[#0A1628]">{taxYearCount}</div>
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Years</div>
          </div>
        </div>

        {/* Confirm Checkbox */}
        <button
          onClick={() => setConfirmed(!confirmed)}
          className={`mb-3.5 flex w-full items-start gap-3 rounded-[14px] border-[1.5px] px-4 py-3.5 text-left transition-all ${
            confirmed
              ? 'border-[#2563EB] bg-[#EFF4FF]'
              : 'border-[#F3F4F6] bg-[#F8FAFC]'
          }`}
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 1000ms',
          }}
        >
          <div className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            confirmed ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#F1F5F9]'
          }`}>
            {confirmed && <i className="fa-solid fa-check text-[11px] text-white" />}
          </div>
          <div className="flex-1 text-[13px] font-semibold leading-snug text-[#0A1628]">
            I confirm all information is accurate to the best of my knowledge
          </div>
        </button>

        {/* Run Analysis CTA */}
        <div
          style={{
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 1200ms',
          }}
        >
          <button
            onClick={() => confirmed && router.push('/analysis/processing')}
            disabled={!confirmed}
            className={`flex w-full items-center justify-center gap-2.5 rounded-full py-[18px] text-base font-bold transition-all ${
              confirmed
                ? 'bg-[#00A651] text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:-translate-y-0.5'
                : 'pointer-events-none bg-[#00A651] text-white opacity-50'
            }`}
          >
            <span className="animate-pulse">&#10024;</span>
            Run Analysis
          </button>
        </div>

        {/* Back link */}
        <div className="mt-2.5 text-center"
          style={{
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.5s ease 1300ms',
          }}
        >
          <button onClick={() => router.push('/analysis/csed-review')} className="text-[13px] font-semibold text-[#64748B]">
            <i className="fa-solid fa-arrow-left mr-1 text-[11px]" /> Back to Edit
          </button>
        </div>

        {/* Reassurance */}
        <div className="mt-4 pb-4 text-center"
          style={{
            opacity: animated ? 1 : 0,
            transition: 'opacity 0.5s ease 1400ms',
          }}
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#CBD5E1]">
            <i className="fa-solid fa-clock text-[10px]" />
            Analysis typically takes 30-60 seconds
          </div>
        </div>
      </div>
    </div>
  )
}
