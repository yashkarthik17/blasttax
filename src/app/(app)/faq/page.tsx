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
    <div style={{ minHeight: '100vh', background: '#FAFAFF' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: 12, background: '#FAFAFF', border: '1px solid #D5D5E0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#5C5C7A' }} />
          </button>
          <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A2E', textAlign: 'center' }}>FAQ</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px', paddingBottom: 20 }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1.5px solid #D5D5E0', borderRadius: 9999, padding: '10px 16px' }}>
            <i className="fas fa-magnifying-glass" style={{ fontSize: 14, color: '#B0B0C8' }} />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem', color: '#1A1A2E', background: 'transparent' }}
            />
          </div>

          {/* FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {generalFiltered.map((faq) => {
              const globalIdx = allFaqs.indexOf(faq)
              const isOpen = openIndex === globalIdx
              return (
                <div
                  key={globalIdx}
                  style={{ background: 'white', border: `1px solid ${isOpen ? 'rgba(10,22,40,0.15)' : '#D5D5E0'}`, borderRadius: 14, overflow: 'hidden' }}
                >
                  <div
                    onClick={() => toggle(globalIdx)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', gap: 12, userSelect: 'none' }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.4 }}>{faq.question}</span>
                    <i className="fas fa-chevron-down" style={{ fontSize: 11, color: '#B0B0C8', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px' }}>
                      <p style={{ fontSize: '0.82rem', color: '#5C5C7A', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Section Divider */}
            {resolutionFiltered.length > 0 && generalFiltered.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 4px' }}>
                <div style={{ flex: 1, height: 1, background: '#D5D5E0' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#B0B0C8', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>Resolution-Specific</span>
                <div style={{ flex: 1, height: 1, background: '#D5D5E0' }} />
              </div>
            )}

            {resolutionFiltered.map((faq) => {
              const globalIdx = allFaqs.indexOf(faq)
              const isOpen = openIndex === globalIdx
              return (
                <div
                  key={globalIdx}
                  style={{ background: 'white', border: `1px solid ${isOpen ? 'rgba(10,22,40,0.15)' : '#D5D5E0'}`, borderRadius: 14, overflow: 'hidden' }}
                >
                  <div
                    onClick={() => toggle(globalIdx)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', gap: 12, userSelect: 'none' }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.4 }}>{faq.question}</span>
                    <i className="fas fa-chevron-down" style={{ fontSize: 11, color: '#B0B0C8', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px' }}>
                      <p style={{ fontSize: '0.82rem', color: '#5C5C7A', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Still Have Questions Card */}
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 24, border: '1px solid rgba(10,22,40,0.08)', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: '#EFF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <i className="fas fa-comments" style={{ fontSize: 20, color: '#1A1A2E' }} />
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>Still have questions?</div>
            <div style={{ fontSize: '0.8rem', color: '#8585A0', marginBottom: 16 }}>We&apos;re here to help you navigate your tax resolution</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/chat" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, background: '#1A1A2E', color: 'white', border: 'none', borderRadius: 14, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>
                <i className="fas fa-sparkles" style={{ fontSize: 13 }} />
                Chat with AI
              </Link>
              <Link href="/expert/landing" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, background: 'white', color: '#1A1A2E', border: '1.5px solid #D5D5E0', borderRadius: 14, fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>
                <i className="fas fa-user-tie" style={{ fontSize: 13, color: '#7C3AED' }} />
                Contact Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
