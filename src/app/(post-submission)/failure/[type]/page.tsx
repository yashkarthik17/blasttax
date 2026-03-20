'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Failure type content definitions                                   */
/* ------------------------------------------------------------------ */

interface RecoveryOption {
  title: string
  description: string
  href?: string
  buttonLabel?: string
}

interface FailureContent {
  title: string
  subtitle: string
  description: string
  causes: string[]
  noticeInfo?: { code: string; description: string }
  cureInfo?: { days: number; description: string }
  appealInfo?: { days: number; form: string; description: string }
  counterOffer?: boolean
  recoveryOptions: RecoveryOption[]
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
}

const FAILURE_CONTENT: Record<string, FailureContent> = {
  'ia-default': {
    title: 'Your Installment Agreement Has Defaulted',
    subtitle: 'IA Default — CP523 Notice',
    description: 'The IRS has determined that your installment agreement is in default. This means the IRS may resume full collection activity, including liens, levies, and wage garnishment.',
    causes: [
      'Missed one or more monthly payments',
      'Failed to file a required tax return on time',
      'Incurred a new tax balance for a subsequent year',
      'Provided inaccurate financial information on the application',
    ],
    noticeInfo: {
      code: 'CP523',
      description: 'This notice informs you that the IRS intends to terminate your installment agreement. It explains the reason for default and outlines your options.',
    },
    cureInfo: {
      days: 30,
      description: 'You have 30 days from the date of the CP523 notice to cure the default. During this period, you can reinstate the agreement or propose alternative arrangements.',
    },
    recoveryOptions: [
      {
        title: 'Reinstate Agreement',
        description: 'Request reinstatement of your existing IA. Fee: $89 online (OPA) / $130 by phone. Must cure the cause of default first.',
      },
      {
        title: 'Resolution Switching',
        description: 'If the IA is no longer feasible, explore other resolution options like OIC or CNC.',
        href: '/post-submission/switching',
      },
      {
        title: 'Contact IRS',
        description: 'Call the IRS at 1-800-829-1040 to discuss your situation and negotiate reinstatement terms.',
      },
    ],
    primaryAction: { label: 'Reinstate Agreement', href: '#' },
    secondaryAction: { label: 'Explore Other Options', href: '/post-submission/switching' },
  },

  'oic-rejection': {
    title: 'Your Offer in Compromise Was Rejected',
    subtitle: 'OIC Rejection',
    description: 'The IRS has determined that your Offer in Compromise does not meet the acceptance criteria. This is not the end of the road — you have multiple paths forward.',
    causes: [
      'Offer amount did not meet the Reasonable Collection Potential (RCP)',
      'Compliance issues — unfiled returns or unpaid current taxes',
      'Did not respond to information requests within the required timeframe',
      'Financial information could not be verified',
      'IRS determined you could pay through other means (IA, full pay)',
    ],
    appealInfo: {
      days: 30,
      form: 'Form 13711',
      description: 'You have 30 days from the date of the rejection letter to file an appeal using Form 13711 (Request for Appeal of Offer in Compromise). The Appeals Office provides an independent review.',
    },
    counterOffer: true,
    recoveryOptions: [
      {
        title: 'Appeal the Rejection',
        description: 'File Form 13711 within 30 days. The IRS Independent Office of Appeals will review your case with a fresh set of eyes.',
      },
      {
        title: 'Resubmit with Changes',
        description: 'Address the reasons for rejection and submit a new OIC with updated financials or a higher offer amount.',
      },
      {
        title: 'Switch to Installment Agreement',
        description: 'If OIC is not viable, an installment agreement may be a practical alternative to resolve your debt.',
        href: '/post-submission/switching',
      },
      {
        title: 'Request CNC Status',
        description: 'If you truly cannot afford to pay, request Currently Not Collectible status to halt collection activity.',
        href: '/post-submission/switching',
      },
    ],
    primaryAction: { label: 'File Appeal (Form 13711)', href: '#' },
    secondaryAction: { label: 'Explore Other Options', href: '/post-submission/switching' },
  },

  'cnc-removal': {
    title: 'Your CNC Status Was Removed',
    subtitle: 'Currently Not Collectible — Removed',
    description: 'The IRS has determined that your financial condition has improved and removed your Currently Not Collectible status. Collection activity may resume.',
    causes: [
      'IRS determined your income has increased significantly',
      'Annual review showed improved ability to pay',
      'Significant asset acquisition detected',
      'Filed return showing higher income than when CNC was granted',
    ],
    recoveryOptions: [
      {
        title: 'Re-request CNC',
        description: 'If your financial situation has not materially improved, submit updated Form 433-A/F with current financials to re-request CNC status.',
      },
      {
        title: 'Apply for Installment Agreement',
        description: 'If you can afford modest monthly payments, an IA may be the best path to resolve your balance while avoiding aggressive collection.',
        href: '/post-submission/switching',
      },
      {
        title: 'Submit Offer in Compromise',
        description: 'If your total debt significantly exceeds your ability to pay over the CSED period, an OIC may settle the debt for less.',
        href: '/post-submission/switching',
      },
    ],
    primaryAction: { label: 'Re-request CNC', href: '#' },
    secondaryAction: { label: 'Explore Other Options', href: '/post-submission/switching' },
  },

  'penalty-denial': {
    title: 'Your Penalty Abatement Request Was Denied',
    subtitle: 'Penalty Abatement — Denied',
    description: 'The IRS has denied your request for penalty abatement. This means the assessed penalties remain on your account. You still have options to challenge this decision.',
    causes: [
      'First Time Abatement (FTA) criteria not met — prior penalties within 3 years',
      'Insufficient reasonable cause documentation',
      'Penalty type not eligible for abatement',
      'Did not demonstrate how the circumstances prevented compliance',
    ],
    recoveryOptions: [
      {
        title: 'CDP Hearing',
        description: 'File Form 12153 (Request for a Collection Due Process Hearing) within 30 days of the notice. This gives you the right to a hearing with the IRS Independent Office of Appeals.',
      },
      {
        title: 'Resubmit with Stronger Evidence',
        description: 'Gather more compelling documentation of reasonable cause (medical records, disaster declarations, professional advice letters) and resubmit.',
      },
      {
        title: 'Pay and File Refund Claim',
        description: 'Pay the penalty, then file Form 843 (Claim for Refund and Request for Abatement) to formally claim a refund. This preserves your right to take the case to court.',
      },
    ],
    primaryAction: { label: 'File CDP Hearing (Form 12153)', href: '#' },
    secondaryAction: { label: 'Explore Other Options', href: '/post-submission/switching' },
  },
}

/* ------------------------------------------------------------------ */
/*  Cure Period Countdown Component                                    */
/* ------------------------------------------------------------------ */

function CurePeriodCountdown({ days }: { days: number }) {
  const [remaining, setRemaining] = useState(days)

  useEffect(() => {
    // In production, this would calculate from the actual notice date
    setRemaining(days)
  }, [days])

  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Cure Period Remaining</p>
          <p className="mt-1 text-3xl font-bold text-red-400">{remaining} <span className="text-base font-normal text-zinc-400">days</span></p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-500 transition-all"
          style={{ width: `${((days - remaining) / days) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">Act before the cure period expires to preserve your options.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function FailurePage() {
  const params = useParams()
  const failureType = params.type as string
  const content = FAILURE_CONTENT[failureType]

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-4">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-zinc-800">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Unknown Failure Type</h1>
          <p className="text-zinc-400">The failure type &quot;{failureType}&quot; is not recognized.</p>
          <Link href="/dashboard" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

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
          Back to Dashboard
        </Link>

        {/* Failure Banner */}
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
              <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-red-400/60 mb-2">{content.subtitle}</p>
          <h1 className="text-2xl font-bold text-red-400">{content.title}</h1>
          <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">{content.description}</p>
        </div>

        {/* Cure Period Countdown (IA Default only) */}
        {content.cureInfo && (
          <CurePeriodCountdown days={content.cureInfo.days} />
        )}

        {/* Appeal Window (OIC Rejection) */}
        {content.appealInfo && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-amber-400">Appeal Window: {content.appealInfo.days} Days</h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  {content.appealInfo.description}
                </p>
                <span className="mt-2 inline-block rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                  {content.appealInfo.form}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Notice Information */}
        {content.noticeInfo && (
          <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Notice: {content.noticeInfo.code}</h2>
            <p className="text-sm text-zinc-400">{content.noticeInfo.description}</p>
          </div>
        )}

        {/* Counter-Offer Section (OIC only) */}
        {content.counterOffer && (
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h2 className="text-lg font-semibold text-white mb-2">Counter-Offer</h2>
            <p className="text-sm text-zinc-400 mb-4">
              In some cases, the IRS may reject your original offer amount but propose a higher amount they would accept. If a counter-offer was included in your rejection letter, you can accept it without starting over.
            </p>
            <div className="rounded-lg bg-[#09090b] p-4 border border-[#27272a]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Your Offer</p>
                  <p className="mt-1 text-lg font-bold text-zinc-400">$--,---</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">IRS Counter</p>
                  <p className="mt-1 text-lg font-bold text-blue-400">$--,---</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-500">Check your rejection letter for counter-offer details.</p>
            </div>
          </div>
        )}

        {/* Common Causes */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Common Causes</h2>
          <div className="space-y-2">
            {content.causes.map((cause, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/15 text-[10px] font-bold text-red-400">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-300">{cause}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Options */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Recovery Options</h2>
          <p className="text-sm text-zinc-400 mb-6">Here are your available paths forward.</p>
          <div className="space-y-4">
            {content.recoveryOptions.map((option) => (
              <div key={option.title} className="rounded-xl border border-[#27272a] bg-[#09090b] p-5">
                <h3 className="font-semibold text-white">{option.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{option.description}</p>
                {option.href && (
                  <Link href={option.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-8">
          <Link
            href={content.primaryAction.href}
            className="block w-full rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700"
          >
            {content.primaryAction.label}
          </Link>
          <Link
            href={content.secondaryAction.href}
            className="block w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-center text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            {content.secondaryAction.label}
          </Link>
          <Link
            href="/post-submission/switching"
            className="block w-full rounded-xl border border-blue-500/20 bg-blue-500/5 py-4 text-center text-base font-medium text-blue-400 transition-colors hover:bg-blue-500/10"
          >
            Switch Resolution
          </Link>
        </div>
      </div>
    </div>
  )
}
