'use client'

import { useRouter } from 'next/navigation'

const TIMELINE_STEPS = [
  {
    label: 'Investigation',
    description:
      'IRS Revenue Officer investigates who was responsible for collecting, accounting for, and paying trust fund taxes.',
    status: 'completed' as const,
  },
  {
    label: 'Form 4180 Interview',
    description:
      'IRS conducts interviews with potentially responsible persons to determine willfulness and authority.',
    status: 'current' as const,
  },
  {
    label: 'Letter 1153 (Proposed Assessment)',
    description:
      'IRS sends Letter 1153 proposing the TFRP assessment. You have 60 days to appeal.',
    status: 'upcoming' as const,
  },
  {
    label: 'TC 246 Assessment',
    description:
      'If no appeal or appeal denied, the TFRP is assessed on your personal account as a separate liability.',
    status: 'upcoming' as const,
  },
]

const STATUS_STYLES = {
  completed: 'border-emerald-500 bg-emerald-500',
  current: 'border-amber-500 bg-amber-500 animate-pulse',
  upcoming: 'border-zinc-600 bg-zinc-700',
}

export default function TFRPDetailPage() {
  const router = useRouter()

  // In production this would come from business analysis store
  const trustFundTotal = 45000

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Trust Fund Recovery Penalty
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Understanding the TFRP and your exposure.
          </p>
        </div>

        <div className="space-y-6">
          {/* Educational Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-3 font-semibold text-white">What is TFRP?</h2>
            <p className="text-sm leading-relaxed text-zinc-400">
              The Trust Fund Recovery Penalty (IRC 6672) is a penalty equal to
              100% of the unpaid trust fund taxes. Trust fund taxes are the
              income taxes and employee share of FICA taxes withheld from
              employee wages that the business was required to collect and remit
              to the IRS. The IRS can assess this penalty against any
              &quot;responsible person&quot; who willfully failed to collect or
              pay these taxes.
            </p>
          </div>

          {/* Trust Fund Total */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-center">
            <p className="text-sm text-zinc-400">Trust Fund Total from Business Analysis</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              ${fmt(trustFundTotal)}
            </p>
            <p className="mt-2 text-sm font-medium text-red-300">
              This amount may become your personal liability
            </p>
          </div>

          {/* TFRP Timeline */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 font-semibold text-white">TFRP Timeline</h2>
            <div className="relative ml-3">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-0.5 bg-zinc-700" />
              <div className="space-y-6">
                {TIMELINE_STEPS.map((step, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div
                      className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 ${STATUS_STYLES[step.status]}`}
                    />
                    <div className="flex-1 pb-1">
                      <p className="font-medium text-white">{step.label}</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 font-semibold text-white">Related Screens</h2>
            <div className="space-y-2">
              {[
                {
                  label: 'Responsible Persons',
                  href: '/analysis/tfrp/persons',
                  desc: 'Identify who may be held personally liable',
                },
                {
                  label: 'Form 4180 Interview Prep',
                  href: '/analysis/tfrp/form-4180',
                  desc: 'Prepare for the IRS interview',
                },
                {
                  label: 'Assessment Detail',
                  href: '/analysis/tfrp/assessment',
                  desc: 'View TC 246 assessment and defense options',
                },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className="group flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 text-left transition-colors hover:border-zinc-600"
                >
                  <div>
                    <p className="font-medium text-white">{link.label}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{link.desc}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-zinc-600 transition-colors group-hover:text-emerald-400"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
