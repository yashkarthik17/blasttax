'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DEFENSE_OPTIONS = [
  {
    title: 'Pre-Assessment Appeal (60 days from Letter 1153)',
    description:
      'File an appeal within 60 days of receiving Letter 1153. This is the most effective time to challenge the TFRP before it becomes a formal assessment.',
    deadline: true,
  },
  {
    title: 'Post-Assessment Refund Claim (Flora Rule)',
    description:
      'After assessment, make a divisible tax payment for one quarter, then file a claim for refund and ultimately a refund suit in district court or Court of Federal Claims.',
    deadline: false,
  },
  {
    title: 'Collection Alternative',
    description:
      'Even if the TFRP is assessed, you can seek resolution through personal OIC, personal IA, or personal CNC depending on your financial situation.',
    deadline: false,
  },
]

const RESOLUTION_ROUTING = [
  {
    label: 'Include in Personal OIC',
    description:
      'TFRP liability can be included in a personal Offer in Compromise alongside any personal tax debt.',
  },
  {
    label: 'Include in Personal IA',
    description:
      'Add TFRP balance to a personal installment agreement. Aggregate balance determines streamlined vs. non-streamlined.',
  },
  {
    label: 'Include in Personal CNC',
    description:
      'If you qualify for Currently Not Collectible status, the TFRP balance can be placed in CNC alongside personal liabilities.',
  },
]

export default function TFRPAssessmentPage() {
  const router = useRouter()
  const [assessmentDate, setAssessmentDate] = useState('')
  const [assessmentAmount, setAssessmentAmount] = useState('')
  const [csed, setCsed] = useState('')

  const amount = parseFloat(assessmentAmount) || 0
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A1628]">
            TFRP Assessment Detail
          </h1>
          <p className="mt-3 text-base text-[#64748B]">
            TC 246 assessment information and defense options.
          </p>
        </div>

        <div className="space-y-6">
          {/* Assessment Details */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">
              Assessment Information
            </p>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  TC 246 Assessment Date
                </label>
                <input
                  type="date"
                  value={assessmentDate}
                  onChange={(e) => setAssessmentDate(e.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-3 text-[#0A1628] outline-none transition-colors focus:border-emerald-500 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  Assessment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={assessmentAmount}
                    onChange={(e) => setAssessmentAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] py-3 pl-8 pr-4 text-[#0A1628] placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#94A3B8]">
                  CSED (Separate from Business CSED)
                </label>
                <input
                  type="date"
                  value={csed}
                  onChange={(e) => setCsed(e.target.value)}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-3 text-[#0A1628] outline-none transition-colors focus:border-emerald-500 [color-scheme:dark]"
                />
                <p className="mt-1 text-xs text-[#94A3B8]">
                  The TFRP has its own 10-year CSED, separate from the business
                  liability CSED.
                </p>
              </div>
            </div>
          </div>

          {/* Assessment Summary */}
          {amount > 0 && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center">
              <p className="text-sm text-[#64748B]">Personal TFRP Liability</p>
              <p className="mt-2 text-3xl font-bold text-[#E63946]">
                ${fmt(amount)}
              </p>
              {csed && (
                <p className="mt-2 text-sm text-[#64748B]">
                  CSED: {new Date(csed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
          )}

          {/* Defense Options */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">Defense Options</p>
            <div className="space-y-4">
              {DEFENSE_OPTIONS.map((option, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 ${
                    option.deadline
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-[#E2E8F0] bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <h3 className="font-medium text-[#0A1628]">{option.title}</h3>
                    {option.deadline && (
                      <span className="shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-400">
                        Time-Sensitive
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Resolution Routing */}
          <div className="rounded-xl border border-[#F1F5F9] bg-white p-5">
            <p className="mb-4 font-medium text-[#0A1628]">Resolution Routing</p>
            <p className="mb-3 text-xs text-[#94A3B8]">
              TFRP assessments become personal liabilities and can be resolved
              through personal resolution programs.
            </p>
            <div className="space-y-3">
              {RESOLUTION_ROUTING.map((route, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <p className="font-medium text-[#0A1628]">{route.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#64748B]">
                    {route.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bankruptcy Warning */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
            <div className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-[#E63946]"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p className="font-semibold text-[#E63946]">
                  Bankruptcy Non-Dischargeability
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#E63946]">
                  Trust fund taxes (and therefore the TFRP) are generally
                  non-dischargeable in bankruptcy under 11 U.S.C. 523(a)(1).
                  Filing bankruptcy will not eliminate this liability. The debt
                  will survive the bankruptcy discharge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Business Results */}
        <button
          onClick={() => router.push('/analysis/business/results')}
          className="mt-10 w-full rounded-xl bg-[#00A651] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#008C44] active:bg-[#008C44]"
        >
          Back to Business Results
        </button>
      </div>
    </div>
  )
}
