'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FaqItem {
  question: string
  answer: string
}

const generalFaqs: FaqItem[] = [
  {
    question: 'What is an Offer in Compromise?',
    answer:
      'An Offer in Compromise (OIC) is an agreement between you and the IRS that settles your tax debt for less than the full amount owed. The IRS considers your ability to pay, income, expenses, and asset equity when evaluating your offer.',
  },
  {
    question: 'How long does the IRS resolution process take?',
    answer:
      'The timeline varies by resolution type. Installment agreements can be set up in days, while an Offer in Compromise typically takes 6-12 months for the IRS to process. Penalty abatement requests usually take 2-4 months.',
  },
  {
    question: 'Will I be audited during the process?',
    answer:
      'Applying for a resolution does not trigger an audit. However, the IRS will review your financial information to evaluate your case. Being accurate and transparent with your documentation helps ensure a smooth process.',
  },
  {
    question: 'What happens if my offer is rejected?',
    answer:
      'If your OIC is rejected, you have 30 days to appeal the decision. You can also explore alternative resolutions like installment agreements or Currently Not Collectible status. Our experts can help you navigate the next steps.',
  },
  {
    question: 'Can I negotiate with the IRS myself?',
    answer:
      'Yes, you have the right to negotiate directly with the IRS. BlastTax helps you prepare your case and forms. For complex situations, our licensed experts can represent you and handle all IRS communications on your behalf.',
  },
  {
    question: 'What are IRS allowable expenses?',
    answer:
      'The IRS uses national and local standards to determine reasonable living expenses. These include housing, food, transportation, healthcare, and other necessities. Your allowable expenses directly affect how much you can offer in a settlement.',
  },
  {
    question: 'How does penalty abatement work?',
    answer:
      'Penalty abatement removes or reduces IRS penalties on your tax debt. You may qualify through first-time abatement if you have a clean compliance history, or through reasonable cause if circumstances prevented you from filing or paying on time.',
  },
  {
    question: 'What is CSED and why does it matter?',
    answer:
      'CSED stands for Collection Statute Expiration Date \u2014 the deadline by which the IRS must collect a tax debt, typically 10 years from assessment. Understanding your CSED is crucial as it affects your resolution strategy and negotiating position.',
  },
]

const resolutionFaqs: FaqItem[] = [
  {
    question: "What if I can't afford my installment agreement payment?",
    answer:
      'Contact the IRS immediately to request a payment modification. You may qualify for a reduced payment, temporary delay, or switch to Currently Not Collectible status. Acting quickly prevents default.',
  },
  {
    question: 'Will tax debt affect my credit score?',
    answer:
      'Tax liens are no longer reported on credit reports (since 2018). However, unpaid tax debt can lead to levies on bank accounts and wage garnishments. Resolving your debt removes these risks.',
  },
  {
    question: 'What happens if I do nothing?',
    answer:
      'The IRS will continue collection actions: penalties and interest accumulate, they may file liens, levy bank accounts, garnish wages, or seize assets. Your debt grows larger over time. The sooner you act, the more options you have.',
  },
  {
    question: 'How do I contact the IRS directly?',
    answer:
      'Individual: 1-800-829-1040 (Mon-Fri 7am-7pm). Collections: 1-800-829-7650. Installment Agreements: 1-800-829-0922. OIC inquiries: 1-800-829-8374. Have your SSN and recent notices ready.',
  },
]

export default function FaqPage() {
  const [search, setSearch] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const allFaqs = [...generalFaqs, ...resolutionFaqs]
  const filtered = allFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()),
  )

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  // Split filtered back into sections
  const generalFiltered = filtered.filter((f) => generalFaqs.includes(f))
  const resolutionFiltered = filtered.filter((f) => resolutionFaqs.includes(f))

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">FAQ</h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-4 py-2.5">
          <svg className="h-4 w-4 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border-none bg-transparent text-sm text-[#0A1628] outline-none placeholder:text-[#CBD5E1]"
          />
        </div>

        {/* General FAQs */}
        {generalFiltered.length > 0 && (
          <div className="space-y-3">
            {generalFiltered.map((faq) => {
              const globalIdx = allFaqs.indexOf(faq)
              return (
                <div
                  key={globalIdx}
                  className={`overflow-hidden rounded-[14px] border transition-colors ${
                    openIndex === globalIdx ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.12)]'
                  }`}
                >
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]"
                  >
                    <span className="text-[0.88rem] font-semibold leading-snug text-[#0A1628]">{faq.question}</span>
                    <svg
                      className={`h-3 w-3 shrink-0 text-[#CBD5E1] transition-transform duration-300 ${
                        openIndex === globalIdx ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      openIndex === globalIdx ? 'max-h-80 px-4 pb-3.5' : 'max-h-0 px-4'
                    }`}
                  >
                    <p className="text-[0.82rem] leading-relaxed text-[#64748B]">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Divider */}
        {resolutionFiltered.length > 0 && generalFiltered.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Resolution-Specific</span>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>
        )}

        {/* Resolution FAQs */}
        {resolutionFiltered.length > 0 && (
          <div className="space-y-3">
            {resolutionFiltered.map((faq) => {
              const globalIdx = allFaqs.indexOf(faq)
              return (
                <div
                  key={globalIdx}
                  className={`overflow-hidden rounded-[14px] border transition-colors ${
                    openIndex === globalIdx ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.12)]'
                  }`}
                >
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]"
                  >
                    <span className="text-[0.88rem] font-semibold leading-snug text-[#0A1628]">{faq.question}</span>
                    <svg
                      className={`h-3 w-3 shrink-0 text-[#CBD5E1] transition-transform duration-300 ${
                        openIndex === globalIdx ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      openIndex === globalIdx ? 'max-h-80 px-4 pb-3.5' : 'max-h-0 px-4'
                    }`}
                  >
                    <p className="text-[0.82rem] leading-relaxed text-[#64748B]">{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Still Have Questions */}
        <div className="rounded-[20px] border border-[rgba(10,22,40,0.08)] bg-white p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF4FF]">
            <svg className="h-5 w-5 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="text-base font-bold text-[#0A1628]">Still have questions?</div>
          <div className="mb-4 text-[0.8rem] text-[#94A3B8]">We&apos;re here to help you navigate your tax resolution</div>
          <div className="flex gap-2.5">
            <Link
              href="/chat"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#0A1628] px-3 py-3 text-[0.82rem] font-semibold text-white transition hover:opacity-90"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Chat with AI
            </Link>
            <Link
              href="/support"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-3 py-3 text-[0.82rem] font-semibold text-[#0A1628] transition hover:bg-[#F8FAFC]"
            >
              <svg className="h-3.5 w-3.5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
