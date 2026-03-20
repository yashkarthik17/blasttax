'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

interface Question {
  key: string
  text: string
  helpText: string
  whyWeAsk: string
  categoryLabel: string
  categoryIcon: string
  categoryBg: string
  categoryColor: string
}

const QUESTIONS: Question[] = [
  {
    key: 'allReturnsFiled',
    text: 'Have you filed all of your federal tax returns?',
    helpText: 'The IRS requires all tax returns to be filed before they will consider most resolution options like Offers in Compromise or Installment Agreements.',
    whyWeAsk: 'The IRS has a strict compliance requirement: all required tax returns must be filed before they will process an OIC, approve an IA, or grant CNC status. If you have unfiled returns, we address those first.',
    categoryLabel: 'FILING STATUS',
    categoryIcon: 'fa-solid fa-file-lines',
    categoryBg: '#EFF4FF',
    categoryColor: '#2563EB',
  },
  {
    key: 'inBankruptcy',
    text: 'Are you currently going through bankruptcy?',
    helpText: 'Active bankruptcy proceedings affect which IRS resolution options are available and may provide additional protections.',
    whyWeAsk: 'In active bankruptcy, the automatic stay prevents most IRS collection actions. Certain tax debts may not be dischargeable. This determines if we coordinate with your bankruptcy attorney.',
    categoryLabel: 'LEGAL STATUS',
    categoryIcon: 'fa-solid fa-gavel',
    categoryBg: '#FEF3C7',
    categoryColor: '#F59E0B',
  },
  {
    key: 'estimatedPaymentsCurrent',
    text: 'Are your current estimated tax payments up to date?',
    helpText: 'Being current on estimated payments shows the IRS you are making a good-faith effort and is often required for resolution program eligibility.',
    whyWeAsk: 'The IRS requires current compliance before approving resolution programs. Being behind on estimated payments is a common reason for OIC and IA rejections.',
    categoryLabel: 'COMPLIANCE',
    categoryIcon: 'fa-solid fa-file-lines',
    categoryBg: '#EFF4FF',
    categoryColor: '#2563EB',
  },
  {
    key: 'auditOpen',
    text: 'Do you have an open IRS audit?',
    helpText: 'An open audit can change the total amount owed. We need to factor this into your resolution strategy.',
    whyWeAsk: 'An open audit (TC 420/424) means the IRS is still determining your correct tax liability. This affects timing and strategy for any resolution option.',
    categoryLabel: 'AUDIT STATUS',
    categoryIcon: 'fa-solid fa-magnifying-glass',
    categoryBg: '#FFF0F1',
    categoryColor: '#E63946',
  },
  {
    key: 'hasActiveIA',
    text: 'Do you have an existing installment agreement?',
    helpText: 'If you already have a payment plan with the IRS, we need to evaluate whether modifying it or pursuing a different program would be more beneficial.',
    whyWeAsk: 'Having a prior IA in the last 5 years affects eligibility for Guaranteed Installment Agreements and may influence which resolution path we recommend.',
    categoryLabel: 'PAYMENT PLANS',
    categoryIcon: 'fa-solid fa-credit-card',
    categoryBg: '#EFF4FF',
    categoryColor: '#2563EB',
  },
  {
    key: 'oicPending',
    text: 'Do you have a pending Offer in Compromise?',
    helpText: 'A pending OIC means the IRS is already reviewing a settlement proposal. Submitting a duplicate could cause complications.',
    whyWeAsk: 'A pending or previously rejected/defaulted OIC affects your eligibility to submit a new offer and may require a different approach to resolution.',
    categoryLabel: 'SETTLEMENT',
    categoryIcon: 'fa-solid fa-handshake',
    categoryBg: '#E6F9EE',
    categoryColor: '#00A651',
  },
  {
    key: 'hasPriorPenalties',
    text: 'Has the IRS charged you any penalties?',
    helpText: 'Penalties can significantly increase your total tax debt. Some may be eligible for abatement.',
    whyWeAsk: 'Penalty abatement can reduce your balance. Common penalties include Failure to File and Failure to Pay. First-time penalty abatement and reasonable cause relief are often available.',
    categoryLabel: 'PENALTIES',
    categoryIcon: 'fa-solid fa-triangle-exclamation',
    categoryBg: '#FEF3C7',
    categoryColor: '#F59E0B',
  },
  {
    key: 'cncStatus',
    text: 'Are you currently in "Currently Not Collectible" status?',
    helpText: 'CNC status means the IRS has paused collection because of financial hardship.',
    whyWeAsk: 'CNC status is typically assigned when you cannot afford to pay basic living expenses. Understanding this helps us determine if your financial situation has changed enough to pursue a different resolution.',
    categoryLabel: 'COLLECTION STATUS',
    categoryIcon: 'fa-solid fa-shield-halved',
    categoryBg: '#E6F9EE',
    categoryColor: '#00A651',
  },
  {
    key: 'hasNFTL',
    text: 'Has a Notice of Federal Tax Lien been filed against you?',
    helpText: 'A tax lien is a legal claim against your property that affects your credit and resolution strategies.',
    whyWeAsk: 'A federal tax lien (NFTL) affects your credit and may trigger a 30-day window for a Collection Due Process (CDP) hearing. Lien withdrawal or subordination may be part of your resolution.',
    categoryLabel: 'LIENS',
    categoryIcon: 'fa-solid fa-link',
    categoryBg: '#FFF0F1',
    categoryColor: '#E63946',
  },
  {
    key: 'levyNotice',
    text: 'Have you received a levy notice from the IRS?',
    helpText: 'A levy notice means the IRS intends to seize your assets. Time-sensitive action may be needed.',
    whyWeAsk: 'A Final Notice of Intent to Levy gives you 30 days to request a CDP hearing. This creates urgency and may require expedited action to protect your assets.',
    categoryLabel: 'LEVIES',
    categoryIcon: 'fa-solid fa-hand',
    categoryBg: '#FFF0F1',
    categoryColor: '#E63946',
  },
  {
    key: 'activeGarnishment',
    text: 'Do you have an active wage garnishment?',
    helpText: 'An active garnishment means the IRS is taking a portion of your paycheck.',
    whyWeAsk: 'Active wage garnishment can often be released or reduced once a resolution case is opened. This also indicates the IRS has already progressed through the collection process.',
    categoryLabel: 'COLLECTION ACTIONS',
    categoryIcon: 'fa-solid fa-money-bill-transfer',
    categoryBg: '#FFF0F1',
    categoryColor: '#E63946',
  },
  {
    key: 'bankLevy',
    text: 'Has the IRS issued a bank levy on your account?',
    helpText: 'A bank levy freezes your account funds. There is typically a 21-day window to act.',
    whyWeAsk: 'A bank levy freezes your account for 21 days before the bank sends funds to the IRS. Expedited action is needed to release the levy and protect your funds.',
    categoryLabel: 'COLLECTION ACTIONS',
    categoryIcon: 'fa-solid fa-building-columns',
    categoryBg: '#FFF0F1',
    categoryColor: '#E63946',
  },
  {
    key: 'usCitizen',
    text: 'Are you a U.S. citizen or resident alien?',
    helpText: 'Most IRS resolution programs require U.S. citizenship or resident alien status for eligibility.',
    whyWeAsk: 'Citizenship or resident alien status is required for most resolution programs including OIC. Non-resident aliens have different procedures and limitations.',
    categoryLabel: 'RESIDENCY',
    categoryIcon: 'fa-solid fa-flag-usa',
    categoryBg: '#EFF4FF',
    categoryColor: '#2563EB',
  },
  {
    key: 'livingAbroad',
    text: 'Are you currently living outside the United States?',
    helpText: 'Living abroad affects IRS collection procedures and may qualify you for additional consideration.',
    whyWeAsk: 'Living abroad affects which IRS office handles your case, available communication methods, and may provide additional time for certain resolution options.',
    categoryLabel: 'RESIDENCY',
    categoryIcon: 'fa-solid fa-globe',
    categoryBg: '#EFF4FF',
    categoryColor: '#2563EB',
  },
  {
    key: 'assetTransfers',
    text: 'Have you transferred any assets in the past 2 years?',
    helpText: 'The IRS reviews recent asset transfers when evaluating Offers in Compromise.',
    whyWeAsk: 'The IRS reviews asset transfers over $10K in the past 12 months when evaluating an OIC. Transfers may be seen as dissipation of assets and increase your offer amount.',
    categoryLabel: 'ASSETS',
    categoryIcon: 'fa-solid fa-right-left',
    categoryBg: '#FEF3C7',
    categoryColor: '#F59E0B',
  },
  {
    key: 'stateReturns',
    text: 'Do you have state tax return issues?',
    helpText: 'State tax debt is handled separately from federal but can impact your overall resolution strategy.',
    whyWeAsk: 'State tax compliance is sometimes required alongside federal compliance. We can help address both together for a comprehensive resolution strategy.',
    categoryLabel: 'STATE TAXES',
    categoryIcon: 'fa-solid fa-landmark',
    categoryBg: '#F5F0FF',
    categoryColor: '#7C3AED',
  },
]

const TOTAL_QUESTIONS = QUESTIONS.length

export default function PreQualifierStepPage() {
  const router = useRouter()
  const params = useParams()
  const stepNum = Number(params.step)
  const setAnswer = useWizard((s) => s.setAnswer)
  const answers = useWizard((s) => s.answers)

  const [selected, setSelected] = useState<boolean | null>(() => {
    if (isNaN(stepNum) || stepNum < 1 || stepNum > TOTAL_QUESTIONS) return null
    const q = QUESTIONS[stepNum - 1]
    const saved = answers[q.key]
    if (saved === true) return true
    if (saved === false) return false
    return null
  })
  const [whyOpen, setWhyOpen] = useState(false)

  // Validate step range
  if (isNaN(stepNum) || stepNum < 1 || stepNum > TOTAL_QUESTIONS) {
    router.replace('/analysis/pre-qualifier/1')
    return null
  }

  const question = QUESTIONS[stepNum - 1]
  const progress = ((stepNum) / TOTAL_QUESTIONS) * 100

  function handleSelect(answer: boolean) {
    setSelected(answer)
    setAnswer(question.key, answer)
  }

  function handleContinue() {
    if (selected === null) return
    if (stepNum < TOTAL_QUESTIONS) {
      router.push(`/analysis/pre-qualifier/${stepNum + 1}`)
    } else {
      router.push('/analysis/screening-result')
    }
  }

  function handleBack() {
    if (stepNum > 1) {
      router.push(`/analysis/pre-qualifier/${stepNum - 1}`)
    } else {
      router.push('/analysis/welcome')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Progress Bar */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-[#00A651] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Pre-Qualifier</span>
            <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">
              Question {stepNum} of {TOTAL_QUESTIONS}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-5 pt-8">
          {/* Category Badge */}
          <div
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1"
            style={{ background: question.categoryBg }}
          >
            <i className={`${question.categoryIcon} text-xs`} style={{ color: question.categoryColor }} />
            <span className="text-[11px] font-bold" style={{ color: question.categoryColor }}>
              {question.categoryLabel}
            </span>
          </div>

          {/* Question */}
          <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-[#0A1628]">
            {question.text}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-[#64748B]">
            {question.helpText}
          </p>

          {/* Yes / No Pills */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => handleSelect(true)}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-[16px] border-2 py-[18px] text-base font-bold transition-all hover:-translate-y-0.5 active:scale-[0.97] ${
                selected === true
                  ? 'border-[#00A651] bg-[#E6F9EE] text-[#065F46]'
                  : 'border-[#E2E8F0] bg-white text-[#0A1628]'
              }`}
            >
              <i className="fa-solid fa-check text-xl text-[#00A651]" />
              Yes
            </button>
            <button
              onClick={() => handleSelect(false)}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-[16px] border-2 py-[18px] text-base font-bold transition-all hover:-translate-y-0.5 active:scale-[0.97] ${
                selected === false
                  ? 'border-[#E63946] bg-[#FFF0F1] text-[#991B1B]'
                  : 'border-[#E2E8F0] bg-white text-[#0A1628]'
              }`}
            >
              <i className="fa-solid fa-xmark text-xl text-[#E63946]" />
              No
            </button>
          </div>

          {/* Why do we ask */}
          <div className="mt-4">
            <button
              onClick={() => setWhyOpen(!whyOpen)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] transition-opacity hover:opacity-80"
            >
              <i className="fa-solid fa-circle-question text-sm" />
              Why do we ask?
              <i
                className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${whyOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-400 ${
                whyOpen ? 'mt-2.5 max-h-[300px]' : 'max-h-0'
              }`}
            >
              <p className="text-[13px] leading-relaxed text-[#64748B]">
                {question.whyWeAsk}
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navigation */}
          <div className="pb-5 pt-3">
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-5 py-4 text-[15px] font-semibold text-[#64748B] transition-all hover:border-[#2563EB] hover:text-[#0A1628]"
              >
                <i className="fa-solid fa-arrow-left text-[13px]" />
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={selected === null}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-[15px] font-bold transition-all ${
                  selected !== null
                    ? 'bg-[#00A651] text-white hover:-translate-y-0.5 active:scale-[0.97]'
                    : 'pointer-events-none bg-[#00A651] text-white opacity-50'
                }`}
              >
                Continue <i className="fa-solid fa-arrow-right text-[13px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
