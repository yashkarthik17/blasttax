'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ComplianceItem {
  key: string
  label: string
  guidance: string
}

const ITEMS: ComplianceItem[] = [
  {
    key: 'all941Filed',
    label: 'All Form 941s filed for all quarters?',
    guidance:
      'File all missing 941s immediately. Use payroll records or bank statements to reconstruct wages. The IRS may have prepared SFR (Substitute for Return) filings that typically overstate liability.',
  },
  {
    key: 'all940Filed',
    label: 'All Form 940s filed?',
    guidance:
      'Form 940 (annual FUTA) must be filed for each year you had employees. Calculate using total wages paid during the year.',
  },
  {
    key: 'current941',
    label: 'Current quarter 941 filed or not yet due?',
    guidance:
      'If the current quarter return is not yet due, ensure you are on track to file timely. Late filing triggers additional penalties.',
  },
  {
    key: 'incomeReturns',
    label: 'All income/info returns filed (1120/1120-S/1065)?',
    guidance:
      'Business income tax returns must be current. Late-filed S-Corp and partnership returns carry per-shareholder/partner monthly penalties.',
  },
  {
    key: 'finalReturns',
    label: 'Final returns marked as "Final" if business closed?',
    guidance:
      'If the business has ceased operations, check the "Final Return" box. This prevents the IRS from expecting future filings.',
  },
]

export default function BusinessCompliancePage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  function toggle(key: string) {
    setAnswers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const allAnswered = ITEMS.every((item) => item.key in answers)
  const hasNonCompliance = Object.values(answers).some((v) => !v)

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Filing Compliance
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            The IRS requires full filing compliance before processing any resolution request.
          </p>
        </div>

        {/* Warning Banner */}
        {allAnswered && hasNonCompliance && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
            <div className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-red-400"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p className="font-semibold text-red-300">
                  Filing Compliance Not Met
                </p>
                <p className="mt-1 text-sm leading-relaxed text-red-200/70">
                  The IRS will not process any resolution request until filing
                  compliance is met. Address the items marked below before
                  proceeding.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="space-y-4">
          {ITEMS.map((item) => {
            const answered = item.key in answers
            const isYes = answers[item.key] === true

            return (
              <div
                key={item.key}
                className={`rounded-xl border p-5 transition-colors ${
                  answered && !isYes
                    ? 'border-red-500/30 bg-red-500/5'
                    : answered && isYes
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-zinc-800 bg-zinc-900'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-white">{item.label}</p>
                  {/* Toggle */}
                  <button
                    onClick={() => toggle(item.key)}
                    className={`relative h-7 w-14 shrink-0 rounded-full transition-colors ${
                      isYes ? 'bg-emerald-600' : answered ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                        isYes ? 'translate-x-7' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Guidance when No */}
                {answered && !isYes && (
                  <div className="mt-3 rounded-lg bg-zinc-800/60 px-4 py-3">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {item.guidance}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Continue */}
        <button
          disabled={!allAnswered}
          onClick={() => router.push('/analysis/business/deposits')}
          className={`mt-10 w-full rounded-xl py-4 text-lg font-semibold transition-colors ${
            allAnswered
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700'
              : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
