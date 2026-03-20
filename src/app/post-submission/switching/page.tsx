'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Resolution option definitions                                      */
/* ------------------------------------------------------------------ */

interface ResolutionOption {
  id: string
  title: string
  shortDescription: string
  pros: string[]
  cons: string[]
  eligibility: string
  timeframe: string
  href: string
  recommended?: boolean
}

const RESOLUTION_OPTIONS: ResolutionOption[] = [
  {
    id: 'ia',
    title: 'Installment Agreement',
    shortDescription: 'Pay your tax debt in fixed monthly payments over time (up to 72 months).',
    pros: [
      'Stops aggressive collection activity',
      'Reduced FTP penalty rate (0.25%/month)',
      'Predictable monthly payment schedule',
      'Multiple IA types available (Guaranteed, Streamlined, Non-Streamlined)',
    ],
    cons: [
      'Interest and penalties continue to accrue',
      'Federal Tax Lien may still be filed',
      'Must stay in compliance for the life of the agreement',
      'Full balance must be paid within the CSED',
    ],
    eligibility: 'Available to most taxpayers who owe $50,000 or less (Streamlined) or any amount (Non-Streamlined with full financial disclosure).',
    timeframe: '2-6 weeks for approval (Streamlined), 2-6 months (Non-Streamlined)',
    href: '/analysis/results',
    recommended: true,
  },
  {
    id: 'oic',
    title: 'Offer in Compromise',
    shortDescription: 'Settle your tax debt for less than the full amount owed.',
    pros: [
      'Potentially settle for pennies on the dollar',
      'Collection activity paused during review',
      'Fresh start after acceptance',
      '24-month deemed acceptance rule protects you',
    ],
    cons: [
      'Lengthy process (6-24 months)',
      '$205 application fee (non-refundable)',
      'Requires extensive financial documentation',
      '5-year compliance period after acceptance',
    ],
    eligibility: 'Must demonstrate inability to pay full amount within CSED. All tax returns must be filed and current estimated payments made.',
    timeframe: '6-18 months for decision, up to 24 months',
    href: '/analysis/results',
  },
  {
    id: 'cnc',
    title: 'Currently Not Collectible',
    shortDescription: 'Temporarily halt all IRS collection activity due to financial hardship.',
    pros: [
      'No payments required',
      'CSED continues running (debt eventually expires)',
      'Immediate relief from collection pressure',
      'No application fee',
    ],
    cons: [
      'Penalties and interest continue accruing',
      'Federal Tax Lien typically filed',
      'IRS reviews status annually',
      'Tax refunds will be offset',
    ],
    eligibility: 'Must demonstrate that paying would cause economic hardship — monthly income does not cover allowable living expenses.',
    timeframe: '2-8 weeks for determination',
    href: '/analysis/results',
  },
  {
    id: 'penalty',
    title: 'Penalty Abatement',
    shortDescription: 'Request removal of assessed penalties (FTP, FTF, estimated tax).',
    pros: [
      'Can significantly reduce total balance',
      'First Time Abatement is straightforward',
      'Can be combined with other resolutions',
      'No fee to request',
    ],
    cons: [
      'Only removes penalties, not interest or tax',
      'FTA requires clean 3-year compliance history',
      'Reasonable cause requires strong documentation',
      'Not guaranteed — IRS has discretion',
    ],
    eligibility: 'First Time Abatement: no penalties in prior 3 years. Reasonable Cause: must document circumstances beyond your control.',
    timeframe: '1-4 weeks (FTA), 2-6 months (Reasonable Cause)',
    href: '/analysis/results',
  },
]

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SwitchingPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/15">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Let&apos;s Find a Better Path</h1>
          <p className="mt-2 text-zinc-400 max-w-md mx-auto">
            Your previous resolution didn&apos;t work out. Review the options below and choose the best path forward for your situation.
          </p>
        </div>

        {/* Resolution Option Cards */}
        <div className="space-y-4">
          {RESOLUTION_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`rounded-2xl border p-6 transition-all cursor-pointer ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-500/5'
                  : 'border-[#27272a] bg-[#18181b] hover:border-zinc-600'
              }`}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                    {option.recommended && (
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{option.shortDescription}</p>
                </div>
                <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                  selectedOption === option.id ? 'border-blue-500 bg-blue-500' : 'border-zinc-600'
                }`}>
                  {selectedOption === option.id && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOption === option.id && (
                <div className="mt-6 space-y-4">
                  {/* Pros & Cons Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-[#09090b] p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Advantages</h4>
                      <ul className="space-y-2">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-emerald-500">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-[#09090b] p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">Drawbacks</h4>
                      <ul className="space-y-2">
                        {option.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-red-400">
                              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Eligibility & Timeframe */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Eligibility</h4>
                      <p className="text-sm text-zinc-300">{option.eligibility}</p>
                    </div>
                    <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Typical Timeframe</h4>
                      <p className="text-sm text-zinc-300">{option.timeframe}</p>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Link
                    href={option.href}
                    className="block w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    Proceed with {option.title}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Re-run / Fresh Start Buttons */}
        <div className="space-y-3 pb-8">
          <Link
            href="/analysis/income-expenses"
            className="block w-full rounded-xl border border-blue-500/20 bg-blue-500/5 py-4 text-center text-base font-medium text-blue-400 transition-colors hover:bg-blue-500/10"
          >
            Re-run Analysis (with Updated Financial Data)
          </Link>
          <Link
            href="/analysis/type"
            className="block w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-center text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Start Fresh Analysis
          </Link>
        </div>
      </div>
    </div>
  )
}
