'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Notice {
  code: string
  label: string
  codeBg: string
  codeColor: string
  searchTerms: string
  meaning: string
  deadline?: string
  action?: string
  badges?: { label: string; bg: string; color: string }[]
  linkLabel?: string
}

const urgentNotices: Notice[] = [
  { code: 'CP504', label: 'Final Notice \u2014 Intent to Levy', codeBg: '#FEF2F2', codeColor: '#E63946', searchTerms: 'CP504 LT11 Final Notice Intent to Levy', meaning: 'The IRS intends to seize your assets (bank accounts, wages, Social Security) if you don\'t pay or arrange to pay. This is one of the last notices before enforced collection.', deadline: '30 days from notice date', action: 'Request a CDP hearing, set up a payment plan, or file an OIC immediately.', badges: [{ label: 'CDP Rights', bg: '#FFF0F1', color: '#E63946' }, { label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }], linkLabel: 'Go to Resolution Center' },
  { code: 'L1058', label: 'Final Notice \u2014 Intent to Levy', codeBg: '#FEF2F2', codeColor: '#E63946', searchTerms: 'Letter 1058 Final Notice Intent to Levy', meaning: 'Alternative version of the levy notice. The IRS will seize your property unless you pay, set up a plan, or request a hearing.', deadline: '30 days from notice date', action: 'File Form 12153 for a CDP hearing within 30 days.', badges: [{ label: 'CDP Rights', bg: '#FFF0F1', color: '#E63946' }, { label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'L3172', label: 'Notice of Federal Tax Lien Filed', codeBg: '#FEF2F2', codeColor: '#E63946', searchTerms: 'Letter 3172 Notice Federal Tax Lien Filed', meaning: 'A public lien has been filed against your property. This appears on credit reports and affects your ability to sell or refinance.', deadline: '30 days for CDP hearing', action: 'Request CDP hearing or explore lien subordination/discharge.', badges: [{ label: 'CDP Rights', bg: '#FFF0F1', color: '#E63946' }, { label: 'CSED', bg: '#EEF2FF', color: '#4F46E5' }] },
  { code: 'CP90', label: 'Final Notice \u2014 Levy (Soc. Sec.)', codeBg: '#FEF2F2', codeColor: '#E63946', searchTerms: 'CP90 Final Notice Intent to Levy Social Security', meaning: 'The IRS intends to levy your Social Security benefits. This is a final notice with CDP hearing rights.', deadline: '30 days from notice date', badges: [{ label: 'CDP Rights', bg: '#FFF0F1', color: '#E63946' }, { label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'L1153', label: 'TFRP Proposed', codeBg: '#FEF2F2', codeColor: '#E63946', searchTerms: 'Letter 1153 Trust Fund Recovery Penalty TFRP Proposed', meaning: 'The IRS is proposing to personally assess you for unpaid payroll taxes (Trust Fund Recovery Penalty). This penalty equals 100% of the trust fund portion.', deadline: '60 days to appeal', badges: [{ label: 'TFRP', bg: '#FFF0F1', color: '#E63946' }, { label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
]

const importantNotices: Notice[] = [
  { code: 'CP14', label: 'Balance Due Notice', codeBg: '#FFFBEB', codeColor: '#D97706', searchTerms: 'CP14 Balance Due Notice first', meaning: 'Your first notice from the IRS that you have an unpaid balance. This starts the collection process. Interest and penalties are accruing.', action: 'Pay in full, set up a payment plan, or dispute the amount if incorrect.', badges: [{ label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'CP501', label: 'Reminder of Balance Due', codeBg: '#FFFBEB', codeColor: '#D97706', searchTerms: 'CP501 Reminder Balance Due', meaning: 'Second notice reminding you of an unpaid balance. More penalties and interest have accumulated.', badges: [{ label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'CP503', label: 'Second Reminder', codeBg: '#FFFBEB', codeColor: '#D97706', searchTerms: 'CP503 Second Reminder Balance Due', meaning: 'Third notice. The IRS is escalating. The next step is typically a final notice with enforcement action.', badges: [{ label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'CP2000', label: 'Proposed Changes to Return', codeBg: '#FFFBEB', codeColor: '#D97706', searchTerms: 'CP2000 Proposed Changes Return underreporter', meaning: 'The IRS found a discrepancy between what you reported and what was reported to them (W-2s, 1099s). They\'re proposing changes that would increase your tax.', action: 'Review carefully. You can agree, partially agree, or fully disagree with an explanation.', badges: [{ label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
  { code: 'CP523', label: 'IA Termination Intent', codeBg: '#FFFBEB', codeColor: '#D97706', searchTerms: 'CP523 Intent Terminate Installment Agreement', meaning: 'The IRS intends to terminate your installment agreement, usually due to missed payments or a new tax liability.', action: 'Contact the IRS immediately to reinstate. Catch up on missed payments.', badges: [{ label: 'Collection Status', bg: '#FFFBEB', color: '#92400E' }] },
]

const infoNotices: Notice[] = [
  { code: 'CP21', label: 'Changes Resulting in Balance', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'CP21 Changes Return Resulting Balance', meaning: 'The IRS made changes to your return resulting in a balance due. Review the changes and pay if correct.' },
  { code: 'CP49', label: 'Overpayment Applied', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'CP49 Overpayment Applied Other Tax Owed', meaning: 'Your refund or overpayment was applied to another tax year\'s balance. No action required unless you disagree.' },
  { code: 'CP521', label: 'IA Payment Reminder', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'CP521 Installment Agreement Annual Payment Reminder', meaning: 'Annual reminder of your installment agreement terms, remaining balance, and payment schedule. Keep for your records.' },
  { code: 'CP522P', label: 'PPIA Financial Review', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'CP522P PPIA Financial Review Request', meaning: 'The IRS is requesting a financial review of your Partial Pay Installment Agreement. You\'ll need to submit updated financials.' },
  { code: 'L3756', label: 'OIC Receipt', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'Letter 3756 OIC Receipt acknowledgment', meaning: 'The IRS received your Offer in Compromise application. Processing typically takes 6-12 months.' },
  { code: 'L4450', label: 'OIC Examiner Assigned', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'Letter 4450 OIC Examiner Assigned', meaning: 'An IRS examiner has been assigned to review your OIC. They may request additional documentation.' },
  { code: 'L3572', label: 'OIC Rejection', codeBg: '#EFF4FF', codeColor: '#2563EB', searchTerms: 'Letter 3572 OIC Rejection', meaning: 'Your Offer in Compromise was rejected. You have 30 days to appeal to the IRS Independent Office of Appeals.', action: 'Review the rejection reason and consider appealing or revising your offer.' },
]

function NoticeCard({ notice, isOpen, onToggle }: { notice: Notice; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-[14px] border transition-colors ${isOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#D5D5E0] hover:border-[rgba(10,22,40,0.12)]'}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-2.5 px-3.5 py-3 text-left transition hover:bg-[#FAFAFF]">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="inline-flex min-w-[52px] items-center justify-center rounded-lg px-2 py-1 text-[0.72rem] font-extrabold" style={{ backgroundColor: notice.codeBg, color: notice.codeColor }}>
            {notice.code}
          </span>
          <span className="text-[0.8rem] font-semibold leading-snug text-[#1A1A2E]">{notice.label}</span>
        </div>
        <svg className={`h-2.5 w-2.5 shrink-0 text-[#B0B0C8] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-[500px] px-3.5 pb-3.5' : 'max-h-0 px-3.5'}`}>
        <div className="mb-2.5 text-[0.78rem] leading-relaxed text-[#5C5C7A]">
          <strong className="text-[#1A1A2E]">What it means:</strong> {notice.meaning}
        </div>
        {notice.deadline && (
          <div className="mb-2.5 flex items-center gap-1.5 rounded-lg px-2.5 py-2" style={{ backgroundColor: '#FEF2F2' }}>
            <svg className="h-2.5 w-2.5 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[0.72rem] font-bold text-[#991B1B]">Deadline: {notice.deadline}</span>
          </div>
        )}
        {notice.action && (
          <div className="mb-2 text-[0.75rem] leading-relaxed text-[#5C5C7A]">
            <strong className="text-[#1A1A2E]">Recommended action:</strong> {notice.action}
          </div>
        )}
        {notice.badges && notice.badges.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {notice.badges.map((b) => (
              <span key={b.label} className="rounded-full px-2 py-0.5 text-[0.58rem] font-bold" style={{ backgroundColor: b.bg, color: b.color }}>
                {b.label}
              </span>
            ))}
          </div>
        )}
        {notice.linkLabel && (
          <Link href="/resolution" className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#2563EB]">
            {notice.linkLabel}
            <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function NoticeDecoderPage() {
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const allNotices = [...urgentNotices, ...importantNotices, ...infoNotices]

  function matchesSearch(notice: Notice) {
    if (!search) return true
    return notice.searchTerms.toLowerCase().includes(search.toLowerCase())
  }

  const filteredUrgent = urgentNotices.filter(matchesSearch)
  const filteredImportant = importantNotices.filter(matchesSearch)
  const filteredInfo = infoNotices.filter(matchesSearch)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/resolution" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Notice Decoder</h1>
        </div>

        {/* Heading */}
        <div>
          <div className="text-xl font-extrabold leading-snug tracking-tight text-[#1A1A2E]">What Notice Did You Receive?</div>
          <div className="mt-1 text-[0.78rem] leading-relaxed text-[#8585A0]">Look up any IRS notice or letter to understand what it means</div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#D5D5E0] bg-white px-4 py-2.5">
          <svg className="h-3.5 w-3.5 text-[#B0B0C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by notice number (e.g., CP14, LT11)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-none bg-transparent text-[0.85rem] text-[#1A1A2E] outline-none placeholder:text-[#B0B0C8]"
          />
        </div>

        {/* Urgent */}
        {filteredUrgent.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 py-1.5">
              <div className="h-2 w-2 rounded-full bg-[#E63946]" />
              <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-[#E63946]">Urgent &mdash; Action Required Within 30 Days</span>
            </div>
            <div className="space-y-2">
              {filteredUrgent.map((n) => (
                <NoticeCard key={n.code} notice={n} isOpen={openId === n.code} onToggle={() => setOpenId(openId === n.code ? null : n.code)} />
              ))}
            </div>
          </div>
        )}

        {/* Important */}
        {filteredImportant.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 py-1.5">
              <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-[#D97706]">Important &mdash; Action Recommended</span>
            </div>
            <div className="space-y-2">
              {filteredImportant.map((n) => (
                <NoticeCard key={n.code} notice={n} isOpen={openId === n.code} onToggle={() => setOpenId(openId === n.code ? null : n.code)} />
              ))}
            </div>
          </div>
        )}

        {/* Informational */}
        {filteredInfo.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2 py-1.5">
              <div className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span className="text-[0.72rem] font-extrabold uppercase tracking-wider text-[#2563EB]">Informational</span>
            </div>
            <div className="space-y-2">
              {filteredInfo.map((n) => (
                <NoticeCard key={n.code} notice={n} isOpen={openId === n.code} onToggle={() => setOpenId(openId === n.code ? null : n.code)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
