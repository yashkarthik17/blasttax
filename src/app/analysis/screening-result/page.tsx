'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface QuestionMeta {
  key: string
  yesLabel: string
  noLabel: string
  category: 'compliance' | 'urgency' | 'residency' | 'special'
  warnIfYes?: boolean
  warnIfNo?: boolean
}

const QUESTION_META: QuestionMeta[] = [
  { key: 'allReturnsFiled', yesLabel: 'All federal returns filed', noLabel: 'Unfiled federal returns', category: 'compliance', warnIfNo: true },
  { key: 'estimatedPaymentsCurrent', yesLabel: 'Current on estimated tax payments', noLabel: 'Behind on estimated payments', category: 'compliance', warnIfNo: true },
  { key: 'stateReturns', yesLabel: 'State tax return issues', noLabel: 'No state tax issues', category: 'compliance', warnIfYes: true },
  { key: 'hasNFTL', yesLabel: 'Notice of Federal Tax Lien filed', noLabel: 'No Federal Tax Lien', category: 'urgency', warnIfYes: true },
  { key: 'levyNotice', yesLabel: 'Levy notice received', noLabel: 'No levy notices', category: 'urgency', warnIfYes: true },
  { key: 'activeGarnishment', yesLabel: 'Active wage garnishment', noLabel: 'No wage garnishment', category: 'urgency', warnIfYes: true },
  { key: 'bankLevy', yesLabel: 'Bank levy issued', noLabel: 'No bank levy', category: 'urgency', warnIfYes: true },
  { key: 'hasActiveIA', yesLabel: 'Prior installment agreement', noLabel: 'No prior IA', category: 'urgency', warnIfYes: true },
  { key: 'oicPending', yesLabel: 'Prior OIC pending/rejected', noLabel: 'No prior OIC issues', category: 'urgency', warnIfYes: true },
  { key: 'usCitizen', yesLabel: 'US citizen or resident alien', noLabel: 'Not a US citizen or resident alien', category: 'residency', warnIfNo: true },
  { key: 'livingAbroad', yesLabel: 'Living outside the US', noLabel: 'Residing in the US', category: 'residency', warnIfYes: true },
  { key: 'inBankruptcy', yesLabel: 'Active bankruptcy', noLabel: 'Not in active bankruptcy', category: 'residency', warnIfYes: true },
  { key: 'auditOpen', yesLabel: 'Open audit', noLabel: 'No open audit', category: 'residency', warnIfYes: true },
  { key: 'hasPriorPenalties', yesLabel: 'IRS penalties charged', noLabel: 'No IRS penalties', category: 'special', warnIfYes: true },
  { key: 'cncStatus', yesLabel: 'In Currently Not Collectible status', noLabel: 'Not in CNC status', category: 'special' },
  { key: 'assetTransfers', yesLabel: 'Asset transfers in past 2 years', noLabel: 'No large asset transfers', category: 'special', warnIfYes: true },
]

const CATEGORIES = [
  { id: 'compliance', label: 'Compliance', icon: 'fa-solid fa-file-lines', color: '#2563EB' },
  { id: 'urgency', label: 'Urgency / Collection Status', icon: 'fa-solid fa-triangle-exclamation', color: '#E63946' },
  { id: 'residency', label: 'Residency & Eligibility', icon: 'fa-solid fa-shield-halved', color: '#00A651' },
  { id: 'special', label: 'Special Circumstances', icon: 'fa-solid fa-star', color: '#F59E0B' },
] as const

export default function ScreeningResultPage() {
  const router = useRouter()
  const answers = useWizard((s) => s.answers)

  // Compute warnings & blockers
  const hasBankruptcy = answers.inBankruptcy === true
  const hasLevyOrLien = answers.hasNFTL === true || answers.levyNotice === true
  const hasCollectionActions = answers.activeGarnishment === true || answers.bankLevy === true

  // Count eligible programs (simplified)
  let eligible = 13
  if (hasBankruptcy) eligible -= 3
  if (answers.allReturnsFiled === false) eligible -= 2
  if (answers.assetTransfers === true) eligible -= 1

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[30%] rounded-full bg-[#00A651]" />
          </div>
        </div>

        <div className="px-5 pb-5 pt-6">
          {/* Checkmark */}
          <div className="relative mb-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00A651] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <i className="fa-solid fa-check text-[28px] text-white" />
            </div>
            <h1 className="mt-4 text-[1.3rem] font-extrabold text-[#0A1628]">Screening Complete</h1>
            <p className="mt-1 text-[13px] text-[#94A3B8]">Here&apos;s a summary of your answers</p>
          </div>

          {/* Conditional Banners */}
          {hasBankruptcy && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border-[1.5px] border-[#FECACA] bg-[#FFF0F1] p-3.5 text-[13px] leading-snug text-[#991B1B]">
              <i className="fa-solid fa-gavel mt-0.5 text-base" />
              <div>
                <div className="font-bold">Bankruptcy Detected</div>
                <div className="mt-0.5 text-xs">Active bankruptcy limits available resolution options. Consult with your tax professional before proceeding.</div>
              </div>
            </div>
          )}
          {hasLevyOrLien && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border-[1.5px] border-[#FDE68A] bg-[#FEF3C7] p-3.5 text-[13px] leading-snug text-[#92400E]">
              <i className="fa-solid fa-clock mt-0.5 text-base" />
              <div>
                <div className="font-bold">URGENT: Possible CDP Deadline</div>
                <div className="mt-0.5 text-xs">You may have a 30-day deadline to request a Collection Due Process (CDP) hearing. Act immediately.</div>
              </div>
            </div>
          )}
          {hasCollectionActions && (
            <div className="mb-3 flex items-start gap-2.5 rounded-xl border-[1.5px] border-[#FDE68A] bg-[#FEF3C7] p-3.5 text-[13px] leading-snug text-[#92400E]">
              <i className="fa-solid fa-hand mt-0.5 text-base" />
              <div>
                <div className="font-bold">Active Collection Actions</div>
                <div className="mt-0.5 text-xs">You have active garnishment or levy actions. Expedited resolution may be needed.</div>
              </div>
            </div>
          )}

          {/* Result Categories */}
          <div className="md:grid md:grid-cols-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const items = QUESTION_META.filter((q) => q.category === cat.id)
            const answeredCount = items.filter((q) => answers[q.key] !== undefined).length
            return (
              <div key={cat.id} className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8]">
                  <i className={`${cat.icon} text-xs`} style={{ color: cat.color }} />
                  {cat.label} ({answeredCount} questions)
                </div>
                {items.map((q) => {
                  const val = answers[q.key]
                  const isYes = val === true
                  const isNo = val === false
                  const isWarning = (isYes && q.warnIfYes) || (isNo && q.warnIfNo)
                  const label = isYes ? q.yesLabel : q.noLabel
                  return (
                    <div
                      key={q.key}
                      className="flex items-start gap-2.5 border-b border-[#F1F5F9] py-2.5 last:border-b-0"
                    >
                      <div
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${
                          isWarning
                            ? 'bg-[#FEF3C7] text-[#F59E0B]'
                            : 'bg-[#E6F9EE] text-[#00A651]'
                        }`}
                      >
                        <i className={isWarning ? 'fa-solid fa-exclamation' : 'fa-solid fa-check'} />
                      </div>
                      <span className="text-[13px] font-medium text-[#0A1628]">{label}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
          </div>

          {/* Stat Highlight */}
          <div className="mt-2 rounded-[16px] border border-[rgba(10,22,40,0.1)] bg-white p-5 text-center">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-[2rem] font-black tracking-tight text-[#2563EB]">{eligible}</span>
              <span className="text-sm font-semibold text-[#64748B]">of</span>
              <span className="text-[2rem] font-black tracking-tight text-[#2563EB]">13</span>
            </div>
            <span className="mt-1 block text-[13px] font-semibold text-[#64748B]">resolution types you may qualify for</span>
            <span className="mt-0.5 block text-[11px] text-[#94A3B8]">Based on your screening answers</span>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <button
              onClick={() => router.push('/analysis/personal-info')}
              className="w-full rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Continue to Personal Info <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
            </button>
          </div>
          <div className="mt-2.5">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-7 py-3.5 text-sm font-medium text-[#0A1628] transition-all hover:-translate-y-0.5"
            >
              <i className="fa-solid fa-bookmark mr-1" />
              Save & Come Back Later
            </button>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 pb-5 text-xs font-medium text-[#94A3B8]">
            <i className="fa-solid fa-shield-halved text-[12px] text-[#00A651]" />
            Your screening results have been saved
          </div>
        </div>
      </div>
    </div>
  )
}
