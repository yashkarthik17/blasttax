'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Failure type definitions                                           */
/* ------------------------------------------------------------------ */

interface CureAction {
  icon: string
  iconBg: string
  iconColor: string
  title: string
  description: string
}

interface TerminatedOption {
  title: string
  description: string
  badge?: string
}

interface FailureContent {
  headerTitle: string
  heading: string
  headingColor: string
  subtitle: string
  // Default trigger
  triggerTitle: string
  triggerDetail: string
  triggerNotice: string
  daysLeft: number
  // Timeline
  timelineSteps: { label: string; description: string; color: string; bgColor: string; icon: string; lineClass?: string }[]
  // Cure actions
  cureActions: CureAction[]
  // Protection notice
  protectionText: string
  // Terminated options
  terminatedOptions: TerminatedOption[]
  terminatedWarning: string
  // CTAs
  primaryCta: { icon: string; label: string }
  secondaryCta: { icon: string; label: string }
}

const FAILURE_CONTENT: Record<string, FailureContent> = {
  'ia-default': {
    headerTitle: 'IA Default',
    heading: 'Your Installment Agreement is at Risk',
    headingColor: 'text-[#F59E0B]',
    subtitle: 'Action required within 30 days to prevent termination',
    triggerTitle: 'Missed Payment',
    triggerDetail: 'April 28, 2026 — $657 not received',
    triggerNotice: 'CP523 Notice received',
    daysLeft: 18,
    timelineSteps: [
      { label: 'Default Trigger', description: 'Missed payment — Apr 28', color: '#92400E', bgColor: '#F59E0B', icon: 'fa-triangle-exclamation', lineClass: 'bg-[#F59E0B]' },
      { label: 'CP523 Notice Sent', description: '"Intent to Terminate IA"', color: '#991B1B', bgColor: '#E63946', icon: 'fa-envelope', lineClass: 'bg-[#E63946]' },
      { label: '30-Day Cure Period', description: 'You have until May 28 to fix this', color: '#2563EB', bgColor: '#2563EB', icon: 'fa-clock' },
      { label: 'Outcome', description: 'IA continues OR terminated (TC 971 AC 073)', color: '#94A3B8', bgColor: 'transparent', icon: 'fa-question' },
    ],
    cureActions: [
      { icon: 'fa-credit-card', iconBg: '#E6F9EE', iconColor: '#00A651', title: 'Make Missed Payment', description: 'Pay $657 to restore agreement' },
      { icon: 'fa-phone', iconBg: '#EFF4FF', iconColor: '#0A1628', title: 'Call IRS to Explain', description: '800-829-1040 — Hardship exception' },
      { icon: 'fa-file-signature', iconBg: '#F5F0FF', iconColor: '#7C3AED', title: 'File Form 9423 (CAP Appeal)', description: 'Formal Collection Appeals Program' },
    ],
    protectionText: 'No levy for 90 days after CP523 notice. You have time to act.',
    terminatedOptions: [
      { title: 'Reinstate Same IA', description: '$89 online / $130 phone reinstatement fee', badge: 'Fastest' },
      { title: 'Negotiate New IA', description: 'New Form 9465 — may get different terms' },
      { title: 'Switch to OIC or CNC', description: 'If hardship justifies a different resolution path' },
    ],
    terminatedWarning: 'TC 971 AC 073 = extra scrutiny on next attempt',
    primaryCta: { icon: 'fa-credit-card', label: 'Make Payment Now' },
    secondaryCta: { icon: 'fa-phone', label: 'Call IRS (800-829-1040)' },
  },

  'ia-modification': {
    headerTitle: 'IA Modification',
    heading: 'Your IA Modification Was Denied',
    headingColor: 'text-[#E63946]',
    subtitle: 'The IRS did not approve your request to change IA terms',
    triggerTitle: 'Modification Denied',
    triggerDetail: 'Your request to lower payment was rejected',
    triggerNotice: 'Letter 3127C received',
    daysLeft: 30,
    timelineSteps: [
      { label: 'Modification Requested', description: 'Submitted request to lower payment', color: '#0A1628', bgColor: '#2563EB', icon: 'fa-file-lines' },
      { label: 'IRS Review', description: 'Financial disclosure reviewed', color: '#0A1628', bgColor: '#F59E0B', icon: 'fa-magnifying-glass', lineClass: 'bg-[#F59E0B]' },
      { label: 'Denied', description: 'IRS determined current terms are appropriate', color: '#991B1B', bgColor: '#E63946', icon: 'fa-xmark', lineClass: 'bg-[#E63946]' },
      { label: 'Appeal Window', description: '30 days to appeal or accept current terms', color: '#2563EB', bgColor: '#2563EB', icon: 'fa-clock' },
    ],
    cureActions: [
      { icon: 'fa-file-signature', iconBg: '#F5F0FF', iconColor: '#7C3AED', title: 'File CAP Appeal', description: 'Collection Appeals Program within 30 days' },
      { icon: 'fa-phone', iconBg: '#EFF4FF', iconColor: '#0A1628', title: 'Call IRS to Negotiate', description: '800-829-1040 — Discuss alternatives' },
      { icon: 'fa-calculator', iconBg: '#E6F9EE', iconColor: '#00A651', title: 'Re-run Financial Analysis', description: 'Update income/expenses and resubmit' },
    ],
    protectionText: 'Your current IA remains active while you appeal or negotiate.',
    terminatedOptions: [
      { title: 'Accept Current Terms', description: 'Continue with existing payment amount' },
      { title: 'Submit New Modification', description: 'Resubmit with updated financial data' },
      { title: 'Switch Resolution', description: 'Consider OIC or CNC if hardship exists' },
    ],
    terminatedWarning: 'Continuing non-payment of the current terms may trigger default',
    primaryCta: { icon: 'fa-file-signature', label: 'File Appeal' },
    secondaryCta: { icon: 'fa-phone', label: 'Call IRS (800-829-1040)' },
  },

  'oic-rejection': {
    headerTitle: 'OIC Rejection',
    heading: 'Your Offer in Compromise Was Rejected',
    headingColor: 'text-[#E63946]',
    subtitle: 'You have 30 days to appeal using Form 13711',
    triggerTitle: 'Offer Rejected',
    triggerDetail: 'IRS determined RCP exceeds offer amount',
    triggerNotice: 'Rejection letter received',
    daysLeft: 25,
    timelineSteps: [
      { label: 'OIC Submitted', description: 'Form 656 with $205 fee', color: '#0A1628', bgColor: '#00A651', icon: 'fa-check', lineClass: 'bg-[#00A651]' },
      { label: 'Investigation Complete', description: 'Examiner reviewed financials', color: '#0A1628', bgColor: '#00A651', icon: 'fa-check', lineClass: 'bg-[#00A651]' },
      { label: 'Offer Rejected', description: 'RCP higher than offer amount', color: '#991B1B', bgColor: '#E63946', icon: 'fa-xmark', lineClass: 'bg-[#E63946]' },
      { label: '30-Day Appeal Window', description: 'File Form 13711 to appeal', color: '#2563EB', bgColor: '#2563EB', icon: 'fa-clock' },
    ],
    cureActions: [
      { icon: 'fa-file-signature', iconBg: '#F5F0FF', iconColor: '#7C3AED', title: 'File Form 13711 Appeal', description: 'Appeal to IRS Independent Office of Appeals' },
      { icon: 'fa-calculator', iconBg: '#EFF4FF', iconColor: '#2563EB', title: 'Resubmit New OIC', description: 'Address rejection reasons with updated data' },
      { icon: 'fa-handshake', iconBg: '#E6F9EE', iconColor: '#00A651', title: 'Accept Counter-Offer', description: 'If IRS proposed a higher amount' },
    ],
    protectionText: 'Collection remains suspended during appeal period.',
    terminatedOptions: [
      { title: 'Appeal the Rejection', description: 'Form 13711 within 30 days', badge: 'Best Option' },
      { title: 'Switch to Installment Agreement', description: 'IA is always available, no waiting period' },
      { title: 'Request CNC Status', description: 'If hardship prevents any payment' },
    ],
    terminatedWarning: 'Periodic payments during OIC are not refunded after rejection',
    primaryCta: { icon: 'fa-file-signature', label: 'File Appeal (Form 13711)' },
    secondaryCta: { icon: 'fa-arrows-rotate', label: 'Switch Resolution' },
  },

  'cnc-review': {
    headerTitle: 'CNC Review',
    heading: 'Your CNC Status is Under Review',
    headingColor: 'text-[#F59E0B]',
    subtitle: 'IRS annual review detected potential income increase',
    triggerTitle: 'Annual Review Triggered',
    triggerDetail: 'W-2/1099 data shows income increase',
    triggerNotice: 'Letter 4223 follow-up received',
    daysLeft: 30,
    timelineSteps: [
      { label: 'CNC Granted (TC 530)', description: 'Original hardship determination', color: '#0A1628', bgColor: '#00A651', icon: 'fa-check', lineClass: 'bg-[#00A651]' },
      { label: 'Annual Review Triggered', description: 'IRS detected income change', color: '#92400E', bgColor: '#F59E0B', icon: 'fa-eye', lineClass: 'bg-[#F59E0B]' },
      { label: 'Response Required', description: 'Submit updated 433-F financials', color: '#2563EB', bgColor: '#2563EB', icon: 'fa-clock' },
      { label: 'Outcome', description: 'CNC continues or revoked (TC 531)', color: '#94A3B8', bgColor: 'transparent', icon: 'fa-question' },
    ],
    cureActions: [
      { icon: 'fa-file-lines', iconBg: '#EFF4FF', iconColor: '#2563EB', title: 'Submit Updated 433-F', description: 'Prove continued financial hardship' },
      { icon: 'fa-phone', iconBg: '#E6F9EE', iconColor: '#00A651', title: 'Call IRS to Discuss', description: '800-829-1040 — Explain circumstances' },
      { icon: 'fa-calculator', iconBg: '#F5F0FF', iconColor: '#7C3AED', title: 'Re-run Analysis', description: 'Update financials in the app' },
    ],
    protectionText: 'No immediate levy action during the review period.',
    terminatedOptions: [
      { title: 'Re-prove Hardship', description: 'Submit updated financial documentation', badge: 'Best Option' },
      { title: 'Set Up Installment Agreement', description: 'Proactively establish IA before revocation' },
      { title: 'Submit Offer in Compromise', description: 'If debt significantly exceeds ability to pay' },
    ],
    terminatedWarning: 'If CNC is revoked, active collection resumes immediately',
    primaryCta: { icon: 'fa-file-lines', label: 'Submit Updated Financials' },
    secondaryCta: { icon: 'fa-phone', label: 'Call IRS (800-829-1040)' },
  },
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function FailurePage() {
  const params = useParams()
  const router = useRouter()
  const failureType = params.type as string
  const content = FAILURE_CONTENT[failureType]

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] px-4">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[#F1F5F9]">
            <i className="fa-solid fa-circle-xmark text-2xl text-[#94A3B8]" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Unknown Failure Type</h1>
          <p className="text-[#64748B]">The failure type &quot;{failureType}&quot; is not recognized.</p>
          <Link href="/dashboard" className="inline-block rounded-xl bg-[#0A1628] px-6 py-3 text-sm font-medium text-white">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4 border-b border-[#F1F5F9]">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <i className="fa-solid fa-arrow-left text-[#64748B]" />
          </button>
          <span className="text-[15px] font-bold text-[#0A1628]">{content.headerTitle}</span>
          <div className="w-10" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 py-5 pb-8">
          {/* Heading */}
          <div>
            <h1 className={`text-xl font-extrabold mb-1 ${content.headingColor}`}>{content.heading}</h1>
            <p className="text-[13px] text-[#94A3B8]">{content.subtitle}</p>
          </div>

          {/* Default Trigger Card */}
          <div className="rounded-2xl border-[1.5px] border-[rgba(245,166,35,0.4)] bg-[#FFFBEB] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#F59E0B 216deg, #E2E8F0 216deg)' }}>
                <div className="flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full bg-white">
                  <div className="text-lg font-black text-[#F59E0B]">{content.daysLeft}</div>
                  <div className="text-[8px] font-bold text-[#92400E] uppercase">days left</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#92400E]">{content.triggerTitle}</div>
                <div className="text-xs text-[#78350F] mt-0.5">{content.triggerDetail}</div>
                <div className="text-[11px] text-[#92400E] mt-1 font-semibold">
                  <i className="fa-solid fa-envelope text-[10px] mr-1" />
                  {content.triggerNotice}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-3">
              Default Timeline
            </div>
            {content.timelineSteps.map((step, i) => (
              <div key={i} className="relative flex gap-3.5 pb-3.5 last:pb-0">
                {i < content.timelineSteps.length - 1 && (
                  <div className={`absolute left-[14px] top-[32px] bottom-0 w-0.5 ${step.lineClass || 'bg-[#F1F5F9]'}`} />
                )}
                <div className="relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[10px]" style={{
                  background: step.bgColor === 'transparent' ? '#F8FAFC' : step.bgColor,
                  color: step.bgColor === 'transparent' ? '#CBD5E1' : 'white',
                  border: step.bgColor === 'transparent' ? '2px solid #F1F5F9' : 'none',
                }}>
                  <i className={`fa-solid ${step.icon}`} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: step.color }}>{step.label}</div>
                  <div className="text-[10px] text-[#64748B]" dangerouslySetInnerHTML={{ __html: step.description }} />
                </div>
              </div>
            ))}
          </div>

          {/* How to Cure */}
          <div>
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-2.5">
              How to Cure (Within 30 Days)
            </div>
            {content.cureActions.map((action, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-3 mb-2 cursor-pointer transition-all hover:border-[#2563EB]/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: action.iconBg }}>
                  <i className={`fa-solid ${action.icon} text-base`} style={{ color: action.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-[#0A1628]">{action.title}</div>
                  <div className="text-[11px] text-[#64748B]">{action.description}</div>
                </div>
                <i className="fa-solid fa-chevron-right text-[#CBD5E1] text-xs" />
              </div>
            ))}
          </div>

          {/* Protection Notice */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#EFF4FF] border border-[rgba(37,99,235,0.15)] p-3.5">
            <i className="fa-solid fa-shield-halved text-[#2563EB]" />
            <div className="text-xs text-[#1E40AF] leading-relaxed">
              <strong>Protection:</strong> {content.protectionText}
            </div>
          </div>

          {/* If Terminated Options */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_1px_3px_rgba(10,22,40,0.06)] p-4">
            <div className="text-xs font-bold text-[#CBD5E1] uppercase tracking-[0.06em] mb-2.5">
              If Agreement is Terminated
            </div>
            {content.terminatedOptions.map((opt, i) => (
              <div key={i} className="rounded-[14px] bg-white border-[1.5px] border-[#F1F5F9] p-3.5 mb-2 last:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[13px] font-bold text-[#0A1628]">{opt.title}</span>
                  {opt.badge && (
                    <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[9px] font-bold text-[#2563EB]">{opt.badge}</span>
                  )}
                </div>
                <div className="text-[11px] text-[#64748B] leading-relaxed">{opt.description}</div>
              </div>
            ))}
            <div className="mt-2 rounded-[10px] bg-[rgba(230,57,70,0.05)] p-2">
              <div className="text-[10px] text-[#991B1B] leading-relaxed">
                <i className="fa-solid fa-triangle-exclamation text-[9px] mr-1" />
                {content.terminatedWarning}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-1 flex flex-col gap-2.5">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white">
              <i className={`fa-solid ${content.primaryCta.icon} text-[13px]`} />
              {content.primaryCta.label}
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white py-4 text-[15px] font-semibold text-[#0A1628]">
              <i className={`fa-solid ${content.secondaryCta.icon} text-[13px]`} />
              {content.secondaryCta.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
