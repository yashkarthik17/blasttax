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
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-base" />
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">IRS Terms Glossary</h1>
          <div className="w-10" />
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-8">
          {/* Search Bar */}
          <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-4 py-2.5">
            <i className="fas fa-magnifying-glass text-sm text-[#CBD5E1]" />
            <input
              type="text"
              placeholder="Search terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-none bg-transparent text-[0.85rem] text-[#0A1628] outline-none placeholder:text-[#CBD5E1]"
            />
          </div>

          {/* Letter Tabs */}
          <div className="flex gap-1 overflow-x-auto py-1">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`flex h-8 min-w-[32px] shrink-0 items-center justify-center rounded-lg text-[0.72rem] font-bold transition ${
                  activeLetter === letter
                    ? 'bg-[#0A1628] text-white'
                    : 'text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0A1628]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Glossary Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filtered.map((term, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={term.abbreviation}
                  className={`overflow-hidden rounded-[14px] border transition-colors ${isOpen ? 'border-[rgba(10,22,40,0.15)]' : 'border-[#E2E8F0] hover:border-[rgba(10,22,40,0.12)]'}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-flex min-w-[42px] items-center justify-center rounded-lg px-2 py-1 text-[0.75rem] font-extrabold"
                        style={{ backgroundColor: term.bgColor, color: term.color }}
                      >
                        {term.abbreviation}
                      </span>
                      <span className="text-[0.85rem] font-semibold text-[#0A1628]">{term.name}</span>
                    </div>
                    <i className={`fas fa-chevron-down shrink-0 text-[11px] text-[#CBD5E1] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[500px] px-4 pb-3.5' : 'max-h-0 px-4'}`}>
                    <p className="mb-2 text-[0.82rem] leading-relaxed text-[#64748B]">{term.definition}</p>
                    <div className="flex flex-wrap gap-1">
                      {term.usedIn.map((tag) => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-[#EFF4FF] px-2 py-0.5 text-[0.62rem] font-semibold text-[#2563EB]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
