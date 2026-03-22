'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SECTIONS = [
  {
    title: 'Section 1: Duties & Responsibilities',
    questions: [
      'What were your duties and responsibilities?',
      'Did you have authority to sign checks?',
      'Did you determine which creditors to pay?',
    ],
    tips: 'Be precise about your actual role. Avoid exaggerating responsibilities. The IRS is looking for decision-making authority over finances.',
  },
  {
    title: 'Section 2: Financial Control',
    questions: [
      'Did you have signature authority on business bank accounts?',
      'Did you make federal tax deposit decisions?',
      'Were you involved in payroll processing?',
    ],
    tips: 'If you delegated financial duties, document who performed them and your level of oversight. Having bank signature authority alone does not automatically mean responsibility.',
  },
  {
    title: 'Section 3: Knowledge of Non-Payment',
    questions: [
      'When did you become aware taxes were not being paid?',
      'What actions did you take when you learned of the issue?',
      'Did you receive IRS notices about the unpaid taxes?',
    ],
    tips: 'This is the most critical section. "Willfulness" does not require evil intent — merely knowing taxes are due and using funds for other purposes. Document any actions you took to address the issue.',
  },
  {
    title: 'Section 4: Other Responsible Persons',
    questions: [
      'Who else had authority to sign checks?',
      'Who else was involved in financial decisions?',
      'Were there changes in management during the period?',
    ],
    tips: 'Be truthful but strategic. Identifying other responsible persons does not reduce your liability but provides the IRS a complete picture.',
  },
  {
    title: 'Section 5: Business Operations',
    questions: [
      'When did the business start/stop operations?',
      'What happened to business assets?',
      'Were there any ownership changes?',
    ],
    tips: 'Provide factual answers. Avoid speculation about others\' roles or motivations.',
  },
]

const TRAPS = [
  {
    trap: 'Check-signing authority',
    guidance:
      'Having authority to sign checks is a strong indicator of responsibility, but it alone may not be sufficient. Clarify if you actually exercised this authority for tax payments.',
  },
  {
    trap: 'Awareness questions',
    guidance:
      'The IRS may ask when you "first became aware" taxes were unpaid. Your answer establishes the timeline for willfulness. Be precise and honest — vague answers invite follow-up.',
  },
  {
    trap: 'Identifying other responsible persons',
    guidance:
      'You may be asked to name others. Remember: each person is independently liable for 100%. Naming others does not split or reduce your liability.',
  },
]

const DEFENSE_STRATEGIES = [
  {
    value: 'lack-of-authority',
    label: 'Lack of Authority',
    guidance:
      'Argue you did not have the actual authority to direct payment of taxes, even if you held a title. Show that someone else made financial decisions.',
  },
  {
    value: 'lack-of-willfulness',
    label: 'Lack of Willfulness',
    guidance:
      'Show that you were unaware of the tax delinquency, or that once aware, you took reasonable steps to address it. Document any corrective actions.',
  },
  {
    value: 'reasonable-cause',
    label: 'Reasonable Cause',
    guidance:
      'Demonstrate circumstances beyond your control (e.g., embezzlement, reliance on professional advice) that prevented timely payment.',
  },
  {
    value: 'statute-of-limitations',
    label: 'Statute of Limitations',
    guidance:
      'The IRS must assess TFRP within 3 years of the Form 941 due date (or filing date if later). Verify assessment dates for each quarter.',
  },
]

const DOCUMENT_CHECKLIST = [
  'Corporate minutes and resolutions',
  'Bank signature cards',
  'Organizational chart during relevant periods',
  'Delegation of authority documents',
  'Correspondence with payroll company',
  'Any communications about tax payment issues',
  'Evidence of corrective actions taken',
  'Financial advisor or CPA engagement letters',
]

export default function Form4180Page() {
  const router = useRouter()
  const [selectedDefense, setSelectedDefense] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFF] px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E]">
            Form 4180 Interview Prep
          </h1>
          <p className="mt-3 text-base text-[#5C5C7A]">
            Prepare for the IRS Trust Fund Recovery Penalty interview.
          </p>
        </div>

        <div className="space-y-6">
          {/* What is Form 4180 */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <h2 className="mb-3 font-semibold text-[#1A1A2E]">
              What is Form 4180?
            </h2>
            <p className="text-sm leading-relaxed text-[#5C5C7A]">
              Form 4180 is the &quot;Report of Interview with Individual
              Relative to Trust Fund Recovery Penalty.&quot; The IRS Revenue
              Officer uses this form to interview potentially responsible
              persons to determine if they should be assessed the TFRP. The
              interview covers your duties, financial authority, knowledge of
              tax delinquencies, and whether you acted willfully.
            </p>
          </div>

          {/* 5 Sections */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <h2 className="mb-4 font-semibold text-[#1A1A2E]">
              Interview Sections
            </h2>
            <div className="space-y-2">
              {SECTIONS.map((section, i) => (
                <div key={i}>
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === i ? null : i)
                    }
                    className="flex w-full items-center justify-between rounded-lg border border-[#D5D5E0] bg-[#FAFAFF] p-3 text-left transition-colors hover:border-[#D5D5E0]"
                  >
                    <span className="text-sm font-medium text-[#1A1A2E]">
                      {section.title}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`shrink-0 text-[#8585A0] transition-transform ${
                        expandedSection === i ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {expandedSection === i && (
                    <div className="mt-2 rounded-lg bg-[#FAFAFF] p-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8585A0]">
                        Key Questions
                      </p>
                      <ul className="mb-3 space-y-2">
                        {section.questions.map((q, qi) => (
                          <li
                            key={qi}
                            className="flex items-start gap-2 text-sm text-[#334155]"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B0B0C8]" />
                            {q}
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-lg bg-amber-500/5 p-3">
                        <p className="text-xs font-medium text-amber-400">
                          Strategy Tip
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-amber-200/70">
                          {section.tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Common Traps */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h2 className="mb-4 font-semibold text-[#E63946]">Common Traps</h2>
            <div className="space-y-4">
              {TRAPS.map((trap, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-[#1A1A2E]">{trap.trap}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5C5C7A]">
                    {trap.guidance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Defense Strategy Selector */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <h2 className="mb-4 font-semibold text-[#1A1A2E]">Defense Strategy</h2>
            <div className="space-y-2">
              {DEFENSE_STRATEGIES.map((strategy) => (
                <button
                  key={strategy.value}
                  onClick={() => setSelectedDefense(strategy.value)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${
                    selectedDefense === strategy.value
                      ? 'border-emerald-500/50 bg-[#00A651]/10'
                      : 'border-[#D5D5E0] bg-[#FAFAFF] hover:border-[#D5D5E0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        selectedDefense === strategy.value
                          ? 'border-emerald-500 bg-[#00A651]'
                          : 'border-[#D5D5E0]'
                      }`}
                    />
                    <span className="font-medium text-[#1A1A2E]">
                      {strategy.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {selectedDefense && (
              <div className="mt-3 rounded-lg bg-[#00A651]/5 p-4">
                <p className="text-sm leading-relaxed text-[#334155]">
                  {
                    DEFENSE_STRATEGIES.find(
                      (s) => s.value === selectedDefense
                    )?.guidance
                  }
                </p>
              </div>
            )}
          </div>

          {/* Document Checklist */}
          <div className="rounded-xl border border-[#F0F0F5] bg-white p-5">
            <h2 className="mb-4 font-semibold text-[#1A1A2E]">
              Document Checklist
            </h2>
            <ul className="space-y-3">
              {DOCUMENT_CHECKLIST.map((doc) => (
                <li key={doc} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 shrink-0 text-[#8585A0]"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                  <span className="text-sm leading-relaxed text-[#334155]">
                    {doc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/tfrp/assessment')}
          className="mt-10 w-full rounded-xl bg-[#00A651] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#008C44] active:bg-[#008C44]"
        >
          Continue to Assessment Detail
        </button>
      </div>
    </div>
  )
}
