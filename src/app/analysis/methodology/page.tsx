'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface MethodSection {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  iconColor: string
  formula: string
  content: string
  bullets?: { icon: string; iconColor: string; text: string }[]
  standards?: { icon: string; title: string; description: string }[]
  tolling?: string[]
}

const SECTIONS: MethodSection[] = [
  {
    id: 'rcp', title: 'RCP Formula', subtitle: 'Reasonable Collection Potential',
    icon: 'fa-calculator', iconBg: 'bg-[#EEF2FF]', iconColor: 'text-[#4F46E5]',
    formula: 'NRE + Future Income = RCP',
    content: 'Your Reasonable Collection Potential (RCP) is the total amount the IRS believes it can collect. It combines:',
    bullets: [
      { icon: 'fa-circle', iconColor: 'text-[#4F46E5]', text: 'NRE (Net Realizable Equity) -- what your assets are worth after debts' },
      { icon: 'fa-circle', iconColor: 'text-[#4F46E5]', text: 'Future Income -- your MDI multiplied by months remaining (12 for lump sum, 24 for periodic)' },
    ],
  },
  {
    id: 'qsv', title: 'QSV Explanation', subtitle: 'Quick Sale Value',
    icon: 'fa-tag', iconBg: 'bg-[#FFFBEB]', iconColor: 'text-[#D97706]',
    formula: 'QSV = FMV x 80%',
    content: 'The Quick Sale Value is 80% of Fair Market Value (FMV). This reflects what an asset would realistically sell for in a forced or quick sale.',
    bullets: [
      { icon: 'fa-home', iconColor: 'text-[#D97706]', text: 'Real estate and property' },
      { icon: 'fa-car', iconColor: 'text-[#D97706]', text: 'Vehicles' },
      { icon: 'fa-building-columns', iconColor: 'text-[#D97706]', text: 'Bank accounts and investments' },
      { icon: 'fa-piggy-bank', iconColor: 'text-[#D97706]', text: 'Retirement accounts (with penalties)' },
      { icon: 'fa-gem', iconColor: 'text-[#D97706]', text: 'Personal property and valuables' },
    ],
  },
  {
    id: 'mdi', title: 'MDI Calculation', subtitle: 'Monthly Disposable Income',
    icon: 'fa-money-bill-trend-up', iconBg: 'bg-[#F5F0FF]', iconColor: 'text-[#7C3AED]',
    formula: 'Income - IRS Allowed Expenses = MDI',
    content: 'Your Monthly Disposable Income is what the IRS considers your ability to pay each month. It uses your gross income minus only the expenses the IRS allows. If MDI is negative or very low, you may qualify for CNC status or a lower OIC offer amount.',
  },
  {
    id: 'standards', title: 'IRS Standards Used', subtitle: 'Allowable Living Expenses',
    icon: 'fa-landmark', iconBg: 'bg-[#EFF4FF]', iconColor: 'text-[#0A1628]',
    formula: '',
    content: 'The IRS sets maximum allowable amounts for living expenses. We use the most current published standards:',
    standards: [
      { icon: 'fa-utensils', title: 'National Standards', description: 'Food, clothing, housekeeping, personal care, misc.' },
      { icon: 'fa-house', title: 'Local Standards', description: 'Housing/utilities based on county and family size' },
      { icon: 'fa-heart-pulse', title: 'Healthcare', description: 'Out-of-pocket medical expenses by age' },
      { icon: 'fa-car', title: 'Transportation', description: 'Vehicle ownership, operating costs by region' },
    ],
  },
  {
    id: 'csed', title: 'CSED Calculation', subtitle: 'Collection Statute Expiration',
    icon: 'fa-clock', iconBg: 'bg-[#FFF0F1]', iconColor: 'text-[#E63946]',
    formula: 'Assessment Date + 10 Years + Tolling = CSED',
    content: 'The IRS generally has 10 years from the date of assessment to collect a tax debt. However, certain actions "toll" (pause) this clock:',
    tolling: [
      'Filing an OIC (during review + 30 days)',
      'CDP hearing requests',
      'Bankruptcy proceedings',
      'Time spent living outside the US',
    ],
  },
]

export default function MethodologyPage() {
  const router = useRouter()
  const [openSection, setOpenSection] = useState<string | null>(null)

  function toggleSection(id: string) {
    setOpenSection(openSection === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-base" />
          </button>
          <h1 className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">How We Calculate</h1>
          <div className="w-10" />
        </div>

        <div className="flex flex-col gap-3 px-5 pb-8">
          {/* Heading */}
          <div className="py-1 pb-2">
            <div className="mb-1.5 text-[1.15rem] font-extrabold text-[#0A1628]">How Your Results Are Calculated</div>
            <div className="text-[0.82rem] leading-relaxed text-[#64748B]">We use the same methodology and formulas that the IRS uses to evaluate your case.</div>
          </div>

          {/* Expandable Sections */}
          {SECTIONS.map((section) => {
            const isOpen = openSection === section.id
            return (
              <div
                key={section.id}
                className={`overflow-hidden rounded-[14px] border bg-white transition ${isOpen ? 'border-[#E2E8F0]' : 'border-[#F1F5F9] hover:border-[#E2E8F0]'}`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#F8FAFC]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${section.iconBg}`}>
                      <i className={`fas ${section.icon} text-sm ${section.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-[0.85rem] font-bold text-[#0A1628]">{section.title}</div>
                      <div className="text-[0.68rem] text-[#94A3B8]">{section.subtitle}</div>
                    </div>
                  </div>
                  <i className={`fas fa-chevron-down shrink-0 text-[11px] text-[#CBD5E1] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[600px] px-4 pb-4' : 'max-h-0 px-4'}`}>
                  {section.formula && (
                    <div className="mb-3 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-3 text-center text-[0.82rem] font-bold tracking-wide text-[#0A1628]">
                      {section.formula}
                    </div>
                  )}
                  <p className="mb-2.5 text-[0.78rem] leading-relaxed text-[#64748B]">{section.content}</p>

                  {section.bullets && (
                    <div className="flex flex-col gap-2">
                      {section.bullets.map((b) => (
                        <div key={b.text} className="flex items-start gap-2">
                          <i className={`fas ${b.icon} mt-[7px] text-[5px] ${b.iconColor}`} />
                          <span className="text-[0.78rem] leading-relaxed text-[#1F2937]">{b.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.standards && (
                    <div className="flex flex-col gap-2">
                      {section.standards.map((s) => (
                        <div key={s.title} className="flex items-start gap-2.5 rounded-lg bg-[#F8FAFC] px-3 py-2.5">
                          <i className={`fas ${s.icon} mt-0.5 text-xs text-[#0A1628]`} />
                          <div>
                            <div className="text-[0.78rem] font-semibold text-[#0A1628]">{s.title}</div>
                            <div className="text-[0.7rem] text-[#94A3B8]">{s.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.tolling && (
                    <div className="flex flex-col gap-1.5">
                      {section.tolling.map((t) => (
                        <div key={t} className="flex items-start gap-2">
                          <i className="fas fa-pause mt-[5px] text-[10px] text-[#E63946]" />
                          <span className="text-[0.78rem] leading-relaxed text-[#1F2937]">{t}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {/* IRS Methodology Reassurance */}
          <div className="flex items-center gap-2 rounded-xl bg-[#ECFDF5] px-4 py-3">
            <i className="fas fa-shield-halved text-sm text-[#10B981]" />
            <span className="text-[0.78rem] font-medium text-[#065F46]">This matches the IRS&apos;s own methodology</span>
          </div>

          {/* CTA */}
          <Link
            href="/expert"
            className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#E2E8F0] bg-white px-7 py-3.5 text-[0.88rem] font-bold text-[#0A1628] no-underline transition hover:-translate-y-0.5"
          >
            <i className="fas fa-user-tie text-[13px]" />
            Questions? Talk to an Expert
          </Link>
        </div>
      </div>
    </div>
  )
}
