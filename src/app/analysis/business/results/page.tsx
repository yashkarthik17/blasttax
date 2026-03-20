'use client'

import { useRouter } from 'next/navigation'

interface Program {
  name: string
  description: string
  eligible: boolean
  tag?: string
}

const PROGRAMS: Program[] = [
  {
    name: 'In-Business Trust Fund Express IA',
    description:
      'For businesses with trust fund liability up to $25,000. Streamlined approval without full financial disclosure.',
    eligible: true,
    tag: 'Up to $25K',
  },
  {
    name: 'Out-of-Business Streamlined IA',
    description:
      'For closed businesses with total liability up to $25,000. No financial statement required.',
    eligible: true,
    tag: 'Up to $25K',
  },
  {
    name: 'Non-Streamlined Installment Agreement',
    description:
      'For larger balances requiring full financial disclosure via Form 433-B. Subject to RO review.',
    eligible: true,
  },
  {
    name: 'Business Offer in Compromise',
    description:
      'Settle business tax debt for less than the full amount owed based on RCP calculation.',
    eligible: true,
  },
  {
    name: 'Penalty Abatement',
    description:
      'Request removal of penalties based on reasonable cause or first-time abatement criteria.',
    eligible: true,
  },
  {
    name: 'Collection Due Process (CDP)',
    description:
      'Request a hearing if you received a Notice of Intent to Levy or Notice of Federal Tax Lien.',
    eligible: true,
  },
]

export default function BusinessResultsPage() {
  const router = useRouter()

  // In production, trustFundExists would come from the store
  const trustFundExists = true

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Business Resolution Options
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Based on your business profile, the following programs may be available.
          </p>
        </div>

        {/* CNC Note */}
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-amber-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div>
              <p className="font-semibold text-amber-300">Note</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-200/70">
                Currently Not Collectible (CNC) is NOT available for businesses.
                CNC status applies only to individual taxpayers.
              </p>
            </div>
          </div>
        </div>

        {/* TFRP Warning */}
        {trustFundExists && (
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
                  Trust Fund Liability Detected
                </p>
                <p className="mt-1 text-sm leading-relaxed text-red-200/70">
                  Trust fund liability may create personal liability for
                  responsible persons through the Trust Fund Recovery Penalty
                  (TFRP).
                </p>
                <button
                  onClick={() => router.push('/analysis/tfrp/detail')}
                  className="mt-3 text-sm font-semibold text-red-400 transition-colors hover:text-red-300"
                >
                  View TFRP Details &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Programs */}
        <div className="space-y-4">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className={`rounded-xl border p-5 transition-colors ${
                program.eligible
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-zinc-800 bg-zinc-900 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{program.name}</h3>
                    {program.tag && (
                      <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
                        {program.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {program.description}
                  </p>
                </div>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    program.eligible ? 'bg-emerald-500/20' : 'bg-zinc-700'
                  }`}
                >
                  {program.eligible && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-emerald-400"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/business/plan')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Build Resolution Plan
        </button>
      </div>
    </div>
  )
}
