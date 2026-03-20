'use client'

import Link from 'next/link'

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Screen',
    description: 'Answer a few questions about your tax situation so we can understand your case.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'Analyze',
    description: 'Our engine evaluates your financial data and identifies the best resolution strategies.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Resolve',
    description: 'Follow guided steps to submit your resolution to the IRS and track its progress.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function ResolutionPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Resolution Center</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Explore resolution strategies and manage your active cases.
          </p>
        </div>

        {/* Start New Analysis CTA */}
        <div className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Ready to resolve your tax situation?</h2>
              <p className="mt-1 text-[var(--muted-foreground)]">
                Start a new analysis to discover the best resolution options available to you.
              </p>
            </div>
            <Link
              href="/analysis/type"
              className="shrink-0 rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:opacity-90 transition"
            >
              Start New Analysis
            </Link>
          </div>
        </div>

        {/* Active Cases */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-semibold">Active Resolutions</h2>
          <div className="mt-6 flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
              <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5M3.75 7.5h16.5" />
              </svg>
            </div>
            <p className="mt-4 text-[var(--muted-foreground)]">
              No active resolutions. Start an analysis to begin your resolution journey.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-semibold">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                        {item.step}
                      </span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Info */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="text-xl font-semibold">Resolution Options</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Common IRS resolution programs we can help you navigate.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Offer in Compromise',
                desc: 'Settle your tax debt for less than the full amount owed.',
              },
              {
                title: 'Installment Agreement',
                desc: 'Set up a monthly payment plan with the IRS.',
              },
              {
                title: 'Currently Not Collectible',
                desc: 'Temporarily pause IRS collection when you can\'t pay.',
              },
              {
                title: 'Penalty Abatement',
                desc: 'Request removal of penalties due to reasonable cause.',
              },
            ].map((option) => (
              <div
                key={option.title}
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <h3 className="font-medium">{option.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
