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
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Progress Bar */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            marginTop: 4, height: 4, width: '100%', borderRadius: 9999,
            background: '#E2E8F0', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 9999, background: '#00A651',
              width: `${progress}%`, transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>Pre-Qualifier</span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#EFF4FF',
              padding: '2px 8px', borderRadius: 20,
            }}>
              Question {stepNum} of {TOTAL_QUESTIONS}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 20px 0' }}>
          {/* Category Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '4px 12px', background: question.categoryBg,
            borderRadius: 20, marginBottom: 12, width: 'fit-content',
          }}>
            <i className={question.categoryIcon} style={{ fontSize: 12, color: question.categoryColor }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: question.categoryColor }}>
              {question.categoryLabel}
            </span>
          </div>

          {/* Question */}
          <h1 style={{
            fontSize: '1.5rem', fontWeight: 800, color: '#0A1628',
            lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0,
          }}>
            {question.text}
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginTop: 8 }}>
            {question.helpText}
          </p>

          {/* Yes / No Pills */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button
              onClick={() => handleSelect(true)}
              style={{
                flex: 1, padding: '18px 24px', borderRadius: 16,
                border: `2px solid ${selected === true ? '#00A651' : '#E2E8F0'}`,
                background: selected === true ? '#E6F9EE' : '#fff',
                color: selected === true ? '#065F46' : '#0A1628',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                minHeight: 64, transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <i className="fa-solid fa-check" style={{ fontSize: 20, color: '#00A651' }} />
              Yes
            </button>
            <button
              onClick={() => handleSelect(false)}
              style={{
                flex: 1, padding: '18px 24px', borderRadius: 16,
                border: `2px solid ${selected === false ? '#E63946' : '#E2E8F0'}`,
                background: selected === false ? '#FFF0F1' : '#fff',
                color: selected === false ? '#991B1B' : '#0A1628',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                minHeight: 64, transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              <i className="fa-solid fa-xmark" style={{ fontSize: 20, color: '#E63946' }} />
              No
            </button>
          </div>

          {/* Why do we ask */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => setWhyOpen(!whyOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: '#2563EB', background: 'none',
                border: 'none', fontFamily: 'inherit', padding: 0,
              }}
            >
              <i className="fa-solid fa-circle-question" style={{ fontSize: 14 }} />
              Why do we ask?
              <i className="fa-solid fa-chevron-down" style={{
                fontSize: 10, transition: 'transform 0.3s',
                transform: whyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />
            </button>
            <div style={{
              maxHeight: whyOpen ? 300 : 0, overflow: 'hidden',
              transition: 'max-height 0.4s ease',
              fontSize: 13, color: '#64748B', lineHeight: 1.6,
            }}>
              <div style={{ paddingTop: 10 }}>
                {question.whyWeAsk}
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Navigation */}
          <div style={{ padding: '12px 0 20px' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleBack}
                style={{
                  flex: '0 0 auto', padding: '16px 20px', borderRadius: 14,
                  border: '1.5px solid #E2E8F0', background: '#fff', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#64748B',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fa-solid fa-arrow-left" style={{ fontSize: 13 }} />
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={selected === null}
                style={{
                  flex: 1, fontSize: 15, fontWeight: 700, padding: '16px 28px',
                  background: '#00A651', color: 'white', border: 'none', borderRadius: 9999,
                  cursor: selected !== null ? 'pointer' : 'default',
                  opacity: selected !== null ? 1 : 0.5,
                  pointerEvents: selected !== null ? 'auto' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'inherit',
                  transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                Continue
                <i className="fa-solid fa-arrow-right" style={{ fontSize: 13 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
