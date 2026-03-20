'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Answer = 'yes' | 'no' | 'unsure' | null

interface Question {
  id: string
  question: string
  hint: string
}

const QUESTIONS: Question[] = [
  { id: 'q1', question: 'Have you filed ALL required tax returns?', hint: 'Check all years -- unfiled returns block most resolutions' },
  { id: 'q2', question: 'Are you current on estimated tax payments?', hint: 'Self-employed: quarterly 1040-ES payments' },
  { id: 'q3', question: 'Are you current on payroll tax deposits?', hint: '941/940 deposits must be current for OIC' },
  { id: 'q4', question: 'Do you have an existing installment agreement?', hint: 'TC 971 AC 043 -- must close before filing OIC' },
  { id: 'q5', question: 'Are you currently in bankruptcy?', hint: 'TC 520 -- blocks most resolution types' },
  { id: 'q6', question: 'Have you had an OIC accepted in the past 5 years?', hint: 'TC 481 -- 5-year compliance period blocks new OIC' },
]

/* ------------------------------------------------------------------ */
/* Eligibility Logic                                                   */
/* ------------------------------------------------------------------ */

function computeEligibility(answers: Record<string, Answer>) {
  const res: Record<string, { eligible: boolean; reason: string }> = {
    OIC: { eligible: true, reason: '' },
    IA: { eligible: true, reason: '' },
    CNC: { eligible: true, reason: '' },
    FTA: { eligible: true, reason: '' },
  }

  if (answers.q1 === 'no') {
    res.OIC = { eligible: false, reason: 'Unfiled returns' }
    res.IA = { eligible: false, reason: 'Unfiled returns' }
  }
  if (answers.q4 === 'yes') {
    res.OIC = { eligible: false, reason: 'Existing IA must close first' }
  }
  if (answers.q5 === 'yes') {
    res.OIC = { eligible: false, reason: 'TC 520 blocks' }
    res.IA = { eligible: false, reason: 'TC 520 blocks' }
    res.CNC = { eligible: false, reason: 'TC 520 blocks' }
  }
  if (answers.q6 === 'yes') {
    res.OIC = { eligible: false, reason: '5-year compliance period' }
  }

  return res
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function ComplianceCheckPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  function selectAnswer(qId: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  const answeredCount = Object.keys(answers).length
  const eligibility = computeEligibility(answers)
  const eligible = Object.entries(eligibility).filter(([, v]) => v.eligible)
  const blocked = Object.entries(eligibility).filter(([, v]) => !v.eligible)

  const btnStyle = (qId: string, value: Answer) => {
    const current = answers[qId]
    if (current === value) {
      if (value === 'yes') return 'border-emerald-500 bg-[#00A651]/15 text-[#00A651]'
      if (value === 'no') return 'border-red-500 bg-red-500/15 text-[#E63946]'
      return 'border-amber-500 bg-amber-500/15 text-amber-400'
    }
    return 'border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] hover:border-[#94A3B8] hover:text-[#334155]'
  }

  const cardBorder = (qId: string) => {
    const a = answers[qId]
    if (a === 'yes') return 'border-emerald-500/25'
    if (a === 'no') return 'border-red-500/20'
    if (a === 'unsure') return 'border-amber-500/25'
    return 'border-[#F1F5F9]'
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-40">
      {/* Progress */}
      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
          <div className="h-full rounded-full bg-[#2563EB] transition-all duration-500" style={{ width: '20%' }} />
        </div>
        <p className="mt-1.5 text-xs font-semibold text-[#94A3B8]">Step 3 of 15</p>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628]">Are You Current with the IRS?</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          The IRS requires compliance before most resolution options
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className={`rounded-xl border p-4 transition-all ${cardBorder(q.id)} bg-white`}
          >
            <p className="text-sm font-bold text-[#0A1628]">{q.question}</p>
            <p className="mb-3 mt-1 text-xs text-[#94A3B8]">{q.hint}</p>
            <div className="flex gap-2">
              {(['yes', 'no', 'unsure'] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => selectAnswer(q.id, val)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${btnStyle(q.id, val)}`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Eligibility Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#F1F5F9] bg-[#F8FAFC]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          {answeredCount === 0 ? (
            <p className="mb-3 text-xs font-semibold text-[#94A3B8]">Answer questions to see eligibility...</p>
          ) : (
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-[#94A3B8]">Eligible:</span>
              {eligible.map(([name]) => (
                <span key={name} className="inline-flex items-center gap-1 rounded-full bg-[#00A651]/15 px-2 py-0.5 text-[10px] font-semibold text-[#00A651]">
                  {name}
                  <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </span>
              ))}
              {blocked.length > 0 && (
                <>
                  <span className="ml-2 mr-1 text-xs font-semibold text-[#94A3B8]">Blocked:</span>
                  {blocked.map(([name]) => (
                    <span key={name} className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-[#E63946]">
                      {name}
                      <svg className="h-2 w-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </span>
                  ))}
                </>
              )}
            </div>
          )}
          <button
            onClick={() => router.push('/situation-screening')}
            disabled={answeredCount < QUESTIONS.length}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] active:scale-[0.98] disabled:opacity-40"
          >
            Continue
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
