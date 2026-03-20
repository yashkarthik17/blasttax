'use client'

import { useRouter } from 'next/navigation'

const phases = [
  {
    step: 1,
    title: 'Pre-Qualification',
    time: '~5 min',
    description:
      'Quick yes/no questions to determine which IRS resolution programs you may qualify for.',
  },
  {
    step: 2,
    title: 'Financial Data Collection',
    time: '~15-20 min',
    description:
      'We gather your income, expenses, assets, and tax debt details to build your case profile.',
  },
  {
    step: 3,
    title: 'Results & Options',
    time: 'Instant',
    description:
      'View your personalized resolution options with estimated savings and recommended next steps.',
  },
]

const checklist = [
  'Any IRS notices or letters you have received',
  'Income information (pay stubs, 1099s, or estimates)',
  'Asset information (bank accounts, property, vehicles)',
  'Monthly expense estimates (rent, utilities, food, etc.)',
]

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            What to Expect
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Your analysis has three phases. Here&apos;s a quick overview of the
            process.
          </p>
        </div>

        {/* Phases */}
        <div className="mb-10 space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.step}
              className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-400">
                {phase.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-white">{phase.title}</h3>
                  <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
                    {phase.time}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h3 className="mb-4 font-semibold text-white">
            What You&apos;ll Need
          </h3>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-emerald-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span className="text-sm leading-relaxed text-zinc-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-zinc-500">
            Don&apos;t worry if you don&apos;t have everything handy — you can
            estimate and update later.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push('/analysis/pre-qualifier/1')}
          className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Begin Analysis
        </button>
      </div>
    </div>
  )
}
