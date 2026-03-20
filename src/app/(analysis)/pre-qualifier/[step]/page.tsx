'use client'

import { useRouter, useParams } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import WizardShell from '@/components/wizard/WizardShell'
import QuestionScreen from '@/components/wizard/QuestionScreen'

interface Question {
  key: string
  text: string
  helpText: string
}

const QUESTIONS: Question[] = [
  {
    key: 'allReturnsFiled',
    text: 'Have you filed all required federal tax returns?',
    helpText:
      'The IRS requires all tax returns to be filed before you can qualify for most resolution programs, including Offers in Compromise and Installment Agreements.',
  },
  {
    key: 'inBankruptcy',
    text: 'Are you currently in active bankruptcy?',
    helpText:
      'Active bankruptcy proceedings impose an automatic stay that affects IRS collection activity and limits which resolution options are available.',
  },
  {
    key: 'estimatedPaymentsCurrent',
    text: 'Are your current estimated tax payments up to date?',
    helpText:
      'Being current on estimated payments shows the IRS you are making a good-faith effort and is often required for resolution program eligibility.',
  },
  {
    key: 'auditOpen',
    text: 'Do you have an open IRS audit?',
    helpText:
      'An open audit can change the total amount owed. We need to factor this into your resolution strategy, as it may affect timing and program selection.',
  },
  {
    key: 'hasActiveIA',
    text: 'Do you have an existing installment agreement?',
    helpText:
      'If you already have a payment plan with the IRS, we need to evaluate whether modifying it or pursuing a different program would be more beneficial.',
  },
  {
    key: 'oicPending',
    text: 'Do you have a pending Offer in Compromise?',
    helpText:
      'A pending OIC means the IRS is already reviewing a settlement proposal. Submitting a duplicate could cause complications or delays.',
  },
  {
    key: 'hasPriorPenalties',
    text: 'Have you received IRS penalties in the past 3 years?',
    helpText:
      'Penalty history determines whether you qualify for First Time Penalty Abatement, which can significantly reduce the amount you owe.',
  },
  {
    key: 'cncStatus',
    text: 'Are you currently in "Currently Not Collectible" status?',
    helpText:
      'CNC status means the IRS has paused collection because of financial hardship. Understanding this status helps us determine the best path forward.',
  },
  {
    key: 'hasNFTL',
    text: 'Has a Notice of Federal Tax Lien been filed against you?',
    helpText:
      'A tax lien is a legal claim against your property. This affects your credit and certain resolution strategies, including lien subordination or discharge options.',
  },
  {
    key: 'levyNotice',
    text: 'Have you received a levy notice from the IRS?',
    helpText:
      'A levy notice means the IRS intends to seize your assets. This creates urgency — time-sensitive action may be needed to protect your property.',
  },
  {
    key: 'activeGarnishment',
    text: 'Do you have an active wage garnishment?',
    helpText:
      'An active garnishment means the IRS is taking a portion of your paycheck. We may be able to get this released or reduced as part of your resolution.',
  },
  {
    key: 'bankLevy',
    text: 'Has the IRS issued a bank levy on your account?',
    helpText:
      'A bank levy freezes your account funds. There is typically a 21-day window to act before the bank releases the funds to the IRS.',
  },
  {
    key: 'usCitizen',
    text: 'Are you a U.S. citizen or resident alien?',
    helpText:
      'Most IRS resolution programs, including Offers in Compromise, require U.S. citizenship or resident alien status for eligibility.',
  },
  {
    key: 'livingAbroad',
    text: 'Are you currently living outside the United States?',
    helpText:
      'Living abroad affects IRS collection procedures and may qualify you for additional time or special consideration in your resolution case.',
  },
  {
    key: 'assetTransfers',
    text: 'Have you transferred any assets in the past 2 years?',
    helpText:
      'The IRS reviews recent asset transfers when evaluating Offers in Compromise. Transfers may be seen as dissipation of assets and affect your offer amount.',
  },
  {
    key: 'stateReturns',
    text: 'Do you have state tax return issues?',
    helpText:
      'State tax debt is handled separately from federal but can impact your overall resolution strategy. We can help you address both together.',
  },
]

const TOTAL_QUESTIONS = QUESTIONS.length

export default function PreQualifierStepPage() {
  const router = useRouter()
  const params = useParams()
  const stepNum = Number(params.step)
  const setAnswer = useWizard((s) => s.setAnswer)

  // Validate step range
  if (isNaN(stepNum) || stepNum < 1 || stepNum > TOTAL_QUESTIONS) {
    router.replace('/analysis/pre-qualifier/1')
    return null
  }

  const question = QUESTIONS[stepNum - 1]

  function handleAnswer(answer: boolean) {
    setAnswer(question.key, answer)

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
    <WizardShell
      title="Pre-Qualification"
      currentStep={stepNum}
      totalSteps={TOTAL_QUESTIONS}
      onBack={handleBack}
    >
      <div className="mb-4 text-center">
        <span className="text-sm font-medium text-zinc-500">
          Question {stepNum} of {TOTAL_QUESTIONS}
        </span>
      </div>
      <QuestionScreen
        question={question.text}
        helpText={question.helpText}
        onAnswer={handleAnswer}
      />
    </WizardShell>
  )
}
