'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FaqItem {
  question: string
  answer: string
}

const generalFaqs: FaqItem[] = [
  { question: 'What is an Offer in Compromise?', answer: 'An Offer in Compromise (OIC) is an agreement between you and the IRS that settles your tax debt for less than the full amount owed. The IRS considers your ability to pay, income, expenses, and asset equity when evaluating your offer.' },
  { question: 'How long does the IRS resolution process take?', answer: 'The timeline varies by resolution type. Installment agreements can be set up in days, while an Offer in Compromise typically takes 6-12 months for the IRS to process. Penalty abatement requests usually take 2-4 months.' },
  { question: 'Will I be audited during the process?', answer: 'Applying for a resolution does not trigger an audit. However, the IRS will review your financial information to evaluate your case. Being accurate and transparent with your documentation helps ensure a smooth process.' },
  { question: 'What happens if my offer is rejected?', answer: 'If your OIC is rejected, you have 30 days to appeal the decision. You can also explore alternative resolutions like installment agreements or Currently Not Collectible status. Our experts can help you navigate the next steps.' },
  { question: 'Can I negotiate with the IRS myself?', answer: 'Yes, you have the right to negotiate directly with the IRS. BlastTax helps you prepare your case and forms. For complex situations, our licensed experts can represent you and handle all IRS communications on your behalf.' },
  { question: 'What are IRS allowable expenses?', answer: 'The IRS uses national and local standards to determine reasonable living expenses. These include housing, food, transportation, healthcare, and other necessities. Your allowable expenses directly affect how much you can offer in a settlement.' },
  { question: 'How does penalty abatement work?', answer: 'Penalty abatement removes or reduces IRS penalties on your tax debt. You may qualify through first-time abatement if you have a clean compliance history, or through reasonable cause if circumstances prevented you from filing or paying on time.' },
  { question: 'What is CSED and why does it matter?', answer: 'CSED stands for Collection Statute Expiration Date \u2014 the deadline by which the IRS must collect a tax debt, typically 10 years from assessment. Understanding your CSED is crucial as it affects your resolution strategy and negotiating position.' },
]

const resolutionFaqs: FaqItem[] = [
  { question: "What if I can't afford my installment agreement payment?", answer: 'Contact the IRS immediately to request a payment modification. You may qualify for a reduced payment, temporary delay, or switch to Currently Not Collectible status. Acting quickly prevents default.' },
  { question: 'Will tax debt affect my credit score?', answer: 'Tax liens are no longer reported on credit reports (since 2018). However, unpaid tax debt can lead to levies on bank accounts and wage garnishments. Resolving your debt removes these risks.' },
  { question: 'What happens if I do nothing?', answer: 'The IRS will continue collection actions: penalties and interest accumulate, they may file liens, levy bank accounts, garnish wages, or seize assets. Your debt grows larger over time. The sooner you act, the more options you have.' },
  { question: 'How do I contact the IRS directly?', answer: 'Individual: 1-800-829-1040 (Mon-Fri 7am-7pm). Collections: 1-800-829-7650. Installment Agreements: 1-800-829-0922. OIC inquiries: 1-800-829-8374. Have your SSN and recent notices ready.' },
]

export default function FaqPage() {
  const router = useRouter()
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

  const generalFiltered = filtered.filter((f) => generalFaqs.includes(f))
  const resolutionFiltered = filtered.filter((f) => resolutionFaqs.includes(f))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-base" />
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">FAQ</h1>
          <div className="w-10" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-8">
          {/* Search Bar */}
          <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-4 py-2.5">
            <i className="fas fa-magnifying-glass text-sm text-[#CBD5E1]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[0.85rem] text-[#0A1628] outline-none placeholder:text-[#CBD5E1]"
            />
          </div>

          {/* General FAQs */}
          {generalFiltered.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {generalFiltered.map((faq) => {
                const globalIdx = allFaqs.indexOf(faq)
                const isOpen = openIndex === globalIdx
                return (
                  <div
                    key={globalIdx}
                    className={`overflow-hidden rounded-[14px] border transition-colors ${isOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.12)]'}`}
                  >
                    <button onClick={() => toggle(globalIdx)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]">
                      <span className="text-[0.88rem] font-semibold leading-snug text-[#0A1628]">{faq.question}</span>
                      <i className={`fas fa-chevron-down shrink-0 text-[11px] text-[#CBD5E1] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-80 px-4 pb-3.5' : 'max-h-0 px-4'}`}>
                      <p className="text-[0.82rem] leading-relaxed text-[#64748B]">{faq.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Divider */}
          {resolutionFiltered.length > 0 && generalFiltered.length > 0 && (
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-[#E2E8F0]" />
              <span className="whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Resolution-Specific</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </div>
          )}

          {/* Resolution FAQs */}
          {resolutionFiltered.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {resolutionFiltered.map((faq) => {
                const globalIdx = allFaqs.indexOf(faq)
                const isOpen = openIndex === globalIdx
                return (
                  <div
                    key={globalIdx}
                    className={`overflow-hidden rounded-[14px] border transition-colors ${isOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.12)]'}`}
                  >
                    <button onClick={() => toggle(globalIdx)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]">
                      <span className="text-[0.88rem] font-semibold leading-snug text-[#0A1628]">{faq.question}</span>
                      <i className={`fas fa-chevron-down shrink-0 text-[11px] text-[#CBD5E1] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-80 px-4 pb-3.5' : 'max-h-0 px-4'}`}>
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
              <i className="fas fa-comments text-xl text-[#0A1628]" />
            </div>
            <div className="text-base font-bold text-[#0A1628]">Still have questions?</div>
            <div className="mb-4 text-[0.8rem] text-[#94A3B8]">We&apos;re here to help you navigate your tax resolution</div>
            <div className="flex gap-2.5">
              <Link href="/chat" className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#0A1628] px-3 py-3 text-[0.82rem] font-semibold text-white no-underline transition hover:opacity-90">
                <i className="fas fa-sparkles text-[13px]" />
                Chat with AI
              </Link>
              <Link href="/expert" className="flex flex-1 items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-3 py-3 text-[0.82rem] font-semibold text-[#0A1628] no-underline transition hover:bg-[#F8FAFC]">
                <i className="fas fa-user-tie text-[13px] text-[#7C3AED]" />
                Contact Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
