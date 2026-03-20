'use client'

import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Strategy definitions                                               */
/* ------------------------------------------------------------------ */

interface Strategy {
  id: string
  title: string
  tagline: string
  description: string
  whenToUse: string[]
  steps: string[]
  pros: string[]
  cons: string[]
  compatibility: string[]
  color: string
  borderColor: string
  bgColor: string
}

const STRATEGIES: Strategy[] = [
  {
    id: 'penalty-first',
    title: 'Penalty Abatement FIRST',
    tagline: 'Reduce the balance, then resolve the remainder',
    description: 'Request First Time Abatement (FTA) or reasonable cause penalty abatement before pursuing an installment agreement or OIC. By removing penalties first, you reduce the total balance — which lowers IA payments or OIC offer amounts.',
    whenToUse: [
      'Significant penalty amounts on your account (often 20-40% of total balance)',
      'Clean compliance history for the prior 3 tax years (for FTA)',
      'Documented reasonable cause for late filing/payment',
    ],
    steps: [
      'Identify penalty amounts on each tax period (FTF, FTP, estimated tax)',
      'Determine FTA eligibility — check 3-year compliance history',
      'Request FTA by phone (1-800-829-1040) or letter',
      'If FTA denied, submit reasonable cause abatement (Form 843)',
      'After penalties removed, recalculate RCP and pursue IA or OIC on reduced balance',
    ],
    pros: [
      'Can reduce total balance by 20-40%',
      'FTA is often granted quickly (single phone call)',
      'Reduces monthly IA payments or OIC offer amount',
      'No cost to request',
    ],
    cons: [
      'FTA only applies once — must have clean 3-year history',
      'Reasonable cause requires strong documentation',
      'Only removes penalties, not interest on those penalties',
      'Adds time before starting the main resolution',
    ],
    compatibility: ['Installment Agreement', 'Offer in Compromise', 'Currently Not Collectible'],
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
  },
  {
    id: 'cnc-csed',
    title: 'CNC + Wait for CSED',
    tagline: 'Let the clock run out on your debt',
    description: 'If your Collection Statute Expiration Date (CSED) is within approximately 3 years, it may be strategic to request Currently Not Collectible status and simply wait for the debt to expire. No payments, no offer — the debt disappears by law.',
    whenToUse: [
      'CSED expires within 3 years or less',
      'Cannot afford meaningful payments (qualify for CNC)',
      'Total balance is large relative to income',
      'No significant assets the IRS could seize',
    ],
    steps: [
      'Verify exact CSED date for each tax period',
      'Confirm CNC eligibility (complete Form 433-A financial disclosure)',
      'Request CNC status to stop all collection activity',
      'Monitor annually — ensure no events extend the CSED',
      'After CSED passes, debt is legally uncollectible',
    ],
    pros: [
      'Pay nothing — debt expires completely',
      'No application fee or complex paperwork',
      'CSED runs whether or not you are in CNC',
      'Ideal for older debts near the 10-year mark',
    ],
    cons: [
      'Penalties and interest continue accruing (but irrelevant if CSED expires)',
      'Federal Tax Lien will likely be filed',
      'IRS reviews CNC annually — could be removed if income increases',
      'Refunds will be offset during the waiting period',
    ],
    compatibility: ['Currently Not Collectible'],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
  },
  {
    id: 'file-then-oic',
    title: 'File Missing Returns + OIC',
    tagline: 'Fix compliance first, then settle for less',
    description: 'If you have Substitute for Return (SFR) assessments, filing original returns often reduces your balance significantly (SFRs do not include deductions, credits, or filing status benefits). After filing corrected returns and reducing the assessed balance, submit an OIC on the lower amount.',
    whenToUse: [
      'IRS filed SFR returns on your behalf (TC 150 with SFR indicator)',
      'You had deductions, credits, or a more favorable filing status than Single/0',
      'Total assessed balance is inflated by SFR assessments',
      'You want to pursue OIC but need to be in compliance first',
    ],
    steps: [
      'Obtain wage and income transcripts for unfiled years',
      'Prepare and file original returns (Form 1040) for each SFR year',
      'Wait for IRS to process returns and adjust balances (4-12 weeks)',
      'Once balances are adjusted downward, prepare OIC with accurate numbers',
      'Submit OIC package with updated balance and Form 656',
    ],
    pros: [
      'Filing original returns can drastically reduce assessed balance',
      'Brings you into compliance (required for OIC anyway)',
      'OIC offer amount based on lower, accurate balance',
      'May reveal refund years that offset balances',
    ],
    cons: [
      'Must gather records for potentially old tax years',
      'Filing returns restarts assessment statute for those years',
      'Process adds 2-4 months before OIC can be submitted',
      'Some taxpayers owe more after filing (rare but possible)',
    ],
    compatibility: ['Offer in Compromise'],
    color: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
  },
  {
    id: 'ia-then-oic',
    title: 'IA Now, OIC Later',
    tagline: 'Stop collection immediately, prepare OIC strategically',
    description: 'Set up an Installment Agreement quickly to stop collection activity (levies, garnishments), then take your time gathering the documentation needed for a strong OIC submission. The IA buys you breathing room while you build the best possible offer.',
    whenToUse: [
      'Facing active collection (levy notice, wage garnishment, bank levy)',
      'Need immediate relief but OIC preparation takes months',
      'Want to demonstrate compliance history before submitting OIC',
      'Financial situation may change in the near term',
    ],
    steps: [
      'Apply for Streamlined IA immediately (can be done online if < $50K)',
      'IA stops active collection and levy actions',
      'While making IA payments, gather OIC documentation',
      'Complete Form 433-A (OIC), gather bank statements, pay stubs, asset docs',
      'Submit OIC — IRS will suspend IA while OIC is reviewed',
      'If OIC accepted, IA is closed. If rejected, IA continues.',
    ],
    pros: [
      'Immediate collection relief within days',
      'Buys time for thorough OIC preparation',
      'IA payments demonstrate willingness to pay (good faith)',
      'Safety net — if OIC fails, IA is already in place',
    ],
    cons: [
      'IA payments may be non-refundable (depends on OIC outcome)',
      'Must qualify for both IA and OIC',
      'Running two programs adds complexity',
      'IA user fee ($31-$225) is an additional cost',
    ],
    compatibility: ['Installment Agreement', 'Offer in Compromise'],
    color: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
  },
]

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function StrategicPlaysPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/analysis/results"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Results
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Strategic Plays</h1>
          <p className="mt-2 text-zinc-400">
            Advanced multi-resolution strategies that combine approaches for optimal outcomes. These are not individual resolutions — they are sequences designed to maximize your savings.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="space-y-6">
          {STRATEGIES.map((strategy) => (
            <div
              key={strategy.id}
              className={`rounded-2xl border ${strategy.borderColor} ${strategy.bgColor} p-6`}
            >
              {/* Strategy Header */}
              <div className="mb-4">
                <h2 className={`text-xl font-bold ${strategy.color}`}>{strategy.title}</h2>
                <p className="mt-1 text-sm text-zinc-300 italic">&quot;{strategy.tagline}&quot;</p>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">{strategy.description}</p>

              {/* When to Use */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">When to Use This Strategy</h3>
                <div className="space-y-2">
                  {strategy.whenToUse.map((condition, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 flex-shrink-0 ${strategy.color}`}>
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <p className="text-sm text-zinc-300">{condition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Step-by-Step</h3>
                <div className="space-y-2">
                  {strategy.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-[#09090b]/60 p-3">
                      <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${strategy.bgColor} ${strategy.color}`}>
                        {i + 1}
                      </span>
                      <p className="text-sm text-zinc-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                <div className="rounded-xl bg-[#09090b] p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Pros</h4>
                  <ul className="space-y-2">
                    {strategy.pros.map((pro, i) => (
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
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">Cons</h4>
                  <ul className="space-y-2">
                    {strategy.cons.map((con, i) => (
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

              {/* Compatibility */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Compatible with:</span>
                {strategy.compatibility.map((res) => (
                  <span key={res} className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                    {res}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-5">
          <p className="text-xs text-zinc-500 leading-relaxed">
            <span className="font-semibold text-zinc-400">Disclaimer:</span> These strategies represent common multi-step approaches used in tax resolution practice. The optimal strategy depends on your specific financial situation, tax debt composition, and CSED timeline. Results may vary based on IRS processing times and examiner discretion. Consider consulting a tax professional for complex situations.
          </p>
        </div>

        {/* Back to Results */}
        <div className="pb-8">
          <Link
            href="/analysis/results"
            className="block w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-center text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Back to Resolution Results
          </Link>
        </div>
      </div>
    </div>
  )
}
