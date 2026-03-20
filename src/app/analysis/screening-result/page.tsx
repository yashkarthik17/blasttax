'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/*  Question metadata for summary display                             */
/* ------------------------------------------------------------------ */

interface QuestionMeta {
  key: string
  label: string
  category: 'Compliance' | 'Collection' | 'Programs' | 'Residency' | 'Other'
}

const QUESTION_META: QuestionMeta[] = [
  { key: 'allReturnsFiled', label: 'All returns filed', category: 'Compliance' },
  { key: 'inBankruptcy', label: 'Active bankruptcy', category: 'Compliance' },
  { key: 'estimatedPaymentsCurrent', label: 'Estimated payments current', category: 'Compliance' },
  { key: 'auditOpen', label: 'Open IRS audit', category: 'Compliance' },
  { key: 'hasActiveIA', label: 'Existing installment agreement', category: 'Programs' },
  { key: 'oicPending', label: 'Pending Offer in Compromise', category: 'Programs' },
  { key: 'hasPriorPenalties', label: 'Prior penalties (3 years)', category: 'Programs' },
  { key: 'cncStatus', label: 'Currently Not Collectible status', category: 'Programs' },
  { key: 'hasNFTL', label: 'Notice of Federal Tax Lien', category: 'Collection' },
  { key: 'levyNotice', label: 'Levy notice received', category: 'Collection' },
  { key: 'activeGarnishment', label: 'Active wage garnishment', category: 'Collection' },
  { key: 'bankLevy', label: 'Bank levy issued', category: 'Collection' },
  { key: 'usCitizen', label: 'U.S. citizen / resident alien', category: 'Residency' },
  { key: 'livingAbroad', label: 'Living outside the U.S.', category: 'Residency' },
  { key: 'assetTransfers', label: 'Asset transfers (2 years)', category: 'Other' },
  { key: 'stateReturns', label: 'State tax issues', category: 'Other' },
]

const CATEGORIES = ['Compliance', 'Programs', 'Collection', 'Residency', 'Other'] as const

/* ------------------------------------------------------------------ */
/*  Blocking condition evaluator                                      */
/* ------------------------------------------------------------------ */

interface BlockingIssue {
  title: string
  description: string
  remediation: string
}

function getBlockingIssues(answers: Record<string, any>): BlockingIssue[] {
  const issues: BlockingIssue[] = []

  if (answers.allReturnsFiled === false) {
    issues.push({
      title: 'Unfiled Tax Returns',
      description:
        'You must file all required federal tax returns before proceeding with most resolution programs.',
      remediation:
        'File all outstanding returns as soon as possible. You can request wage and income transcripts from the IRS to help reconstruct missing returns.',
    })
  }

  if (answers.inBankruptcy === true) {
    issues.push({
      title: 'Active Bankruptcy',
      description:
        'Active bankruptcy proceedings block most IRS resolution programs due to the automatic stay.',
      remediation:
        'Consult with your bankruptcy attorney about how your tax debt is being handled within the bankruptcy. Some taxes may be dischargeable.',
    })
  }

  if (answers.usCitizen === false) {
    issues.push({
      title: 'Citizenship / Residency Requirement',
      description:
        'Most IRS resolution programs require U.S. citizenship or resident alien status.',
      remediation:
        'If you are a non-resident alien with U.S. tax obligations, consult a tax professional who specializes in international tax matters.',
    })
  }

  return issues
}

/* ------------------------------------------------------------------ */
/*  Urgency flag evaluator                                            */
/* ------------------------------------------------------------------ */

interface UrgencyFlag {
  title: string
  description: string
}

function getUrgencyFlags(answers: Record<string, any>): UrgencyFlag[] {
  const flags: UrgencyFlag[] = []

  if (answers.levyNotice === true) {
    flags.push({
      title: 'Levy Notice Received',
      description:
        'The IRS intends to seize your assets. You may have limited time to act — typically 30 days from the notice date.',
    })
  }

  if (answers.activeGarnishment === true) {
    flags.push({
      title: 'Active Wage Garnishment',
      description:
        'The IRS is currently taking a portion of your paycheck. This can often be released or reduced once a resolution case is opened.',
    })
  }

  if (answers.bankLevy === true) {
    flags.push({
      title: 'Bank Levy Issued',
      description:
        'Your bank account funds have been frozen. There is a 21-day window before the bank sends the money to the IRS.',
    })
  }

  return flags
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ScreeningResultPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  const blockingIssues = getBlockingIssues(answers)
  const urgencyFlags = getUrgencyFlags(answers)
  const hasBlockers = blockingIssues.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* ---- Header Banner ---- */}
        {hasBlockers ? (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-400">Issues Found</h1>
            <p className="mt-2 text-sm text-red-300/70">
              Some items need to be addressed before you can proceed with the
              full analysis.
            </p>
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-400"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-emerald-400">
              You Qualify to Continue
            </h1>
            <p className="mt-2 text-sm text-emerald-300/70">
              No blocking issues were found. You can proceed to the data
              collection phase.
            </p>
          </div>
        )}

        {/* ---- Blocking Issues ---- */}
        {hasBlockers && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-white">
              What You Can Do
            </h2>
            <div className="space-y-4">
              {blockingIssues.map((issue) => (
                <div
                  key={issue.title}
                  className="rounded-xl border border-red-500/20 bg-zinc-900 p-5"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-red-400">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    {issue.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {issue.description}
                  </p>
                  <div className="mt-3 rounded-lg bg-zinc-800/60 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Recommended Action
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                      {issue.remediation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Urgency Flags ---- */}
        {urgencyFlags.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Urgency Alerts
            </h2>
            <div className="space-y-4">
              {urgencyFlags.map((flag) => (
                <div
                  key={flag.title}
                  className="flex gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-400">
                      {flag.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                      {flag.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Answer Summary Grid ---- */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Your Answers
          </h2>

          {CATEGORIES.map((category) => {
            const items = QUESTION_META.filter((q) => q.category === category)
            return (
              <div key={category} className="mb-6">
                <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
                  {category}
                </h3>
                <div className="space-y-2">
                  {items.map((q) => {
                    const value = answers[q.key]
                    const answered = value !== undefined && value !== null
                    const isYes = value === true

                    return (
                      <div
                        key={q.key}
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
                      >
                        <span className="text-sm text-zinc-300">
                          {q.label}
                        </span>
                        {answered ? (
                          <span
                            className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                              isYes
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-zinc-700 text-zinc-400'
                            }`}
                          >
                            {isYes ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          <span className="rounded-full bg-zinc-800 px-3 py-0.5 text-xs text-zinc-600">
                            --
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* ---- Actions ---- */}
        <div className="space-y-3 pb-8">
          {!hasBlockers && (
            <button
              onClick={() => router.push('/analysis/personal-info')}
              className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
            >
              Continue to Data Collection
            </button>
          )}
          <button
            onClick={() => router.push('/analysis/pre-qualifier/1')}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-4 text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Review Answers
          </button>
        </div>
      </div>
    </div>
  )
}
