'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface GlossaryTerm {
  abbreviation: string
  name: string
  definition: string
  letter: string
  color: string
  bgColor: string
  usedIn: string[]
}

const glossaryTerms: GlossaryTerm[] = [
  { abbreviation: 'AC', name: 'Activity Code', definition: 'An internal IRS code that categorizes the type of activity or action taken on a taxpayer\'s account, such as audits, collections, or adjustments.', letter: 'A', color: '#0A1628', bgColor: '#EFF4FF', usedIn: ['Case Detail', 'Analysis Results'] },
  { abbreviation: 'CDP', name: 'Collection Due Process', definition: 'A hearing that gives taxpayers the right to challenge IRS collection actions like liens and levies. You must request a CDP hearing within 30 days of receiving a notice.', letter: 'C', color: '#E63946', bgColor: '#FFF0F1', usedIn: ['Resolution Center', 'Case Detail'] },
  { abbreviation: 'CNC', name: 'Currently Not Collectible', definition: 'An IRS status that temporarily suspends collection activity when paying your tax debt would cause financial hardship. The debt still exists but the IRS stops active enforcement.', letter: 'C', color: '#00A651', bgColor: '#E6F9EE', usedIn: ['Resolution Center', 'Analysis Results'] },
  { abbreviation: 'CSED', name: 'Collection Statute Expiration Date', definition: 'The deadline by which the IRS must collect a tax debt, typically 10 years from the date of assessment. After this date, the IRS can no longer legally collect the debt. Certain actions can "toll" (pause) this clock.', letter: 'C', color: '#D97706', bgColor: '#FFFBEB', usedIn: ['Dashboard', 'Case Detail', 'Calculation Methodology'] },
  { abbreviation: 'DATL', name: 'Doubt as to Liability', definition: 'An OIC basis where you believe the assessed tax amount is incorrect. You must provide evidence that the tax liability is wrong, such as missing deductions or incorrect income reporting.', letter: 'D', color: '#4F46E5', bgColor: '#EEF2FF', usedIn: ['OIC Form Builder', 'Resolution Center'] },
  { abbreviation: 'DDIA', name: 'Direct Debit Installment Agreement', definition: 'An installment agreement where payments are automatically debited from your bank account each month. This option can reduce setup fees and may avoid a federal tax lien filing.', letter: 'D', color: '#00A651', bgColor: '#E6F9EE', usedIn: ['Resolution Center', 'Payment Portal'] },
  { abbreviation: 'ETA', name: 'Effective Tax Administration', definition: 'An OIC basis where you don\'t dispute the debt and can technically pay it, but collecting would create an unfair economic hardship or be inequitable. Includes situations like serious illness or disability.', letter: 'E', color: '#0D9488', bgColor: '#F0FDFA', usedIn: ['OIC Form Builder', 'Resolution Center'] },
  { abbreviation: 'FBAR', name: 'Foreign Bank Account Report', definition: 'A report (FinCEN Form 114) required if you have financial accounts in foreign countries with an aggregate value exceeding $10,000 at any point during the year. Severe penalties for non-filing.', letter: 'F', color: '#E63946', bgColor: '#FFF0F1', usedIn: ['Document Center', 'Analysis'] },
  { abbreviation: 'FTA', name: 'First Time Abatement', definition: 'An IRS administrative waiver that removes failure-to-file, failure-to-pay, or failure-to-deposit penalties for taxpayers with a clean compliance history for the prior 3 years.', letter: 'F', color: '#00A651', bgColor: '#E6F9EE', usedIn: ['Resolution Center', 'Penalty Abatement'] },
  { abbreviation: 'FTF', name: 'Failure to File', definition: 'A penalty assessed when you don\'t file your tax return by the due date (including extensions). The penalty is typically 5% of unpaid taxes per month, up to 25%.', letter: 'F', color: '#D97706', bgColor: '#FFFBEB', usedIn: ['Analysis Results', 'Penalty Abatement'] },
  { abbreviation: 'FTP', name: 'Failure to Pay', definition: 'A penalty for not paying your tax liability by the due date. The penalty is 0.5% of unpaid taxes per month, up to 25%. This is separate from the failure-to-file penalty.', letter: 'F', color: '#D97706', bgColor: '#FFFBEB', usedIn: ['Analysis Results', 'Penalty Abatement'] },
  { abbreviation: 'IA', name: 'Installment Agreement', definition: 'A payment plan with the IRS that allows you to pay your tax debt over time in monthly installments. Several types exist including streamlined, guaranteed, and partial-pay agreements.', letter: 'I', color: '#0A1628', bgColor: '#EFF4FF', usedIn: ['Resolution Center', 'Payment Portal', 'Analysis Results'] },
  { abbreviation: 'MDI', name: 'Monthly Disposable Income', definition: 'Your total monthly income minus IRS-allowed living expenses. This is what the IRS considers your ability to pay. MDI is a key component of RCP calculations.', letter: 'M', color: '#7C3AED', bgColor: '#F5F0FF', usedIn: ['Calculation Methodology', 'Analysis Results', 'OIC Form Builder'] },
  { abbreviation: 'NFTL', name: 'Notice of Federal Tax Lien', definition: 'A public document filed by the IRS alerting creditors that the government has a legal claim against your property for unpaid taxes. This is different from a levy, which is an actual seizure of assets.', letter: 'N', color: '#E63946', bgColor: '#FFF0F1', usedIn: ['Case Detail', 'Resolution Center'] },
  { abbreviation: 'NRE', name: 'Net Realizable Equity', definition: 'The Quick Sale Value of your assets minus any secured debts. This represents what the IRS could realistically collect by liquidating your assets. NRE is a key component of your RCP.', letter: 'N', color: '#0D9488', bgColor: '#F0FDFA', usedIn: ['Calculation Methodology', 'Analysis Results', 'OIC Form Builder'] },
  { abbreviation: 'OIC', name: 'Offer in Compromise', definition: 'An agreement between a taxpayer and the IRS that settles tax debt for less than the full amount owed. The IRS evaluates your ability to pay, income, expenses, and asset equity. The application fee is $205.', letter: 'O', color: '#0A1628', bgColor: '#EFF4FF', usedIn: ['Resolution Center', 'Analysis Results', 'Dashboard', 'OIC Form Builder'] },
  { abbreviation: 'PPIA', name: 'Partial Pay Installment Agreement', definition: 'An installment agreement where monthly payments won\'t fully pay off the debt before the CSED expires. The remaining balance is forgiven when the statute expires. A strategic option for large debts.', letter: 'P', color: '#00A651', bgColor: '#E6F9EE', usedIn: ['Resolution Center', 'Analysis Results'] },
  { abbreviation: 'QSV', name: 'Quick Sale Value', definition: 'An estimate of what an asset would sell for in a quick, forced sale \u2014 typically 80% of Fair Market Value. The IRS uses QSV when calculating what they could collect from your assets.', letter: 'Q', color: '#D97706', bgColor: '#FFFBEB', usedIn: ['Calculation Methodology', 'OIC Form Builder', 'Analysis Results'] },
  { abbreviation: 'RCP', name: 'Reasonable Collection Potential', definition: 'The total amount the IRS believes it can collect from you. Calculated as NRE (Net Realizable Equity from assets) + Future Income (MDI x number of months). Your OIC offer must generally equal or exceed your RCP.', letter: 'R', color: '#4F46E5', bgColor: '#EEF2FF', usedIn: ['Calculation Methodology', 'Analysis Results', 'OIC Form Builder'] },
  { abbreviation: 'SFR', name: 'Substitute for Return', definition: 'A tax return the IRS prepares on your behalf when you fail to file. SFRs typically result in a higher tax liability because the IRS won\'t include deductions or credits you may be entitled to.', letter: 'S', color: '#E63946', bgColor: '#FFF0F1', usedIn: ['Case Detail', 'Analysis'] },
  { abbreviation: 'TC', name: 'Transaction Code', definition: 'Three-digit codes on IRS account transcripts that describe specific actions taken on your account (e.g., TC 150 = return filed, TC 290 = additional tax assessed, TC 971 = notice issued).', letter: 'T', color: '#64748B', bgColor: '#F1F5F9', usedIn: ['Case Detail', 'Transcript Analysis'] },
  { abbreviation: 'TFRP', name: 'Trust Fund Recovery Penalty', definition: 'A penalty equal to 100% of unpaid payroll taxes that can be assessed personally against responsible individuals (business owners, officers) who willfully fail to collect and remit employment taxes.', letter: 'T', color: '#E63946', bgColor: '#FFF0F1', usedIn: ['Case Detail', 'Resolution Center'] },
]

const letters = ['All', 'A', 'C', 'D', 'E', 'F', 'I', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']

export default function GlossaryPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = glossaryTerms.filter((term) => {
    const matchesLetter = activeLetter === 'All' || term.letter === activeLetter
    const matchesSearch =
      search === '' ||
      term.abbreviation.toLowerCase().includes(search.toLowerCase()) ||
      term.name.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase())
    return matchesLetter && matchesSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 12px' }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: 12, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit' }}>
            <i className="fas fa-arrow-left" style={{ fontSize: 14, color: '#64748B' }} />
          </button>
          <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 800, color: '#0A1628', textAlign: 'center' }}>IRS Terms Glossary</span>
          <div style={{ width: 40 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px', paddingBottom: 20 }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 9999, padding: '10px 16px' }}>
            <i className="fas fa-magnifying-glass" style={{ fontSize: 14, color: '#CBD5E1' }} />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem', color: '#0A1628', background: 'transparent' }}
            />
          </div>

          {/* Alphabetical Letter Tabs */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '4px 0', WebkitOverflowScrolling: 'touch' }}>
            {letters.map((letter) => (
              <div
                key={letter}
                onClick={() => setActiveLetter(letter)}
                style={{
                  minWidth: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: activeLetter === letter ? 'white' : '#94A3B8',
                  background: activeLetter === letter ? '#0A1628' : 'transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Glossary Terms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((term, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={term.abbreviation}
                  style={{ background: 'white', border: `1px solid ${isOpen ? 'rgba(10,22,40,0.15)' : '#E2E8F0'}`, borderRadius: 14, overflow: 'hidden' }}
                >
                  <div
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', gap: 12, userSelect: 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 42, padding: '4px 8px', backgroundColor: term.bgColor, borderRadius: 8, fontSize: '0.75rem', fontWeight: 800, color: term.color }}>{term.abbreviation}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1628', lineHeight: 1.4 }}>{term.name}</span>
                    </div>
                    <i className="fas fa-chevron-down" style={{ fontSize: 11, color: '#CBD5E1', flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px' }}>
                      <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.6, marginBottom: 8, marginTop: 0 }}>{term.definition}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {term.usedIn.map((tag) => (
                          <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', background: '#EFF4FF', borderRadius: 9999, fontSize: '0.62rem', fontWeight: 600, color: '#2563EB', marginRight: 4, marginBottom: 4 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
