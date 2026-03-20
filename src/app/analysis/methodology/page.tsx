'use client'

import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Methodology section definitions                                    */
/* ------------------------------------------------------------------ */

interface FormulaSection {
  id: string
  title: string
  irsReference: string
  description: string
  formula: string
  components: { name: string; description: string }[]
  example: { inputs: { label: string; value: string }[]; calculation: string; result: string }
  dataSources: string[]
}

const FORMULA_SECTIONS: FormulaSection[] = [
  {
    id: 'qsv',
    title: 'Quick Sale Value (QSV)',
    irsReference: 'IRM 5.8.5.4 — Quick Sale Value',
    description: 'The QSV represents the estimated amount an asset would sell for in a forced or quick sale scenario. The IRS uses 80% of Fair Market Value (FMV) as the standard QSV for most assets.',
    formula: 'QSV = FMV x 0.80 - Encumbrances',
    components: [
      { name: 'Fair Market Value (FMV)', description: 'The price the asset would sell for on the open market under normal conditions.' },
      { name: '80% Multiplier', description: 'Standard IRS discount reflecting the reduced price in a quick/forced sale.' },
      { name: 'Encumbrances', description: 'Outstanding loans, liens, or mortgages secured by the asset.' },
    ],
    example: {
      inputs: [
        { label: 'Home FMV', value: '$350,000' },
        { label: 'Mortgage Balance', value: '$280,000' },
      ],
      calculation: 'QSV = ($350,000 x 0.80) - $280,000 = $280,000 - $280,000',
      result: '$0 (no equity for IRS)',
    },
    dataSources: ['Zillow/Redfin for real estate FMV', 'KBB/NADA for vehicle FMV', 'Recent statements for loan balances'],
  },
  {
    id: 'nre',
    title: 'Net Realizable Equity (NRE)',
    irsReference: 'IRM 5.8.5.4.1 — Net Realizable Equity in Assets',
    description: 'NRE is the total equity available from all of a taxpayer\'s assets if they were sold at quick sale value. It represents the asset component of the Reasonable Collection Potential.',
    formula: 'NRE = Sum of (QSV of each asset)',
    components: [
      { name: 'Real Property', description: 'Primary residence, rental properties, vacant land — each at QSV.' },
      { name: 'Vehicles', description: 'Cars, trucks, boats, recreational vehicles — each at QSV.' },
      { name: 'Financial Assets', description: 'Bank accounts (full value), investments (full value), retirement accounts (QSV minus early withdrawal penalty).' },
      { name: 'Other Assets', description: 'Art, jewelry, collections, business equipment — each at QSV.' },
    ],
    example: {
      inputs: [
        { label: 'Home QSV (equity)', value: '$0' },
        { label: 'Car QSV (equity)', value: '$3,200' },
        { label: 'Bank Accounts', value: '$2,100' },
        { label: '401(k) QSV', value: '$8,400' },
      ],
      calculation: 'NRE = $0 + $3,200 + $2,100 + $8,400',
      result: '$13,700',
    },
    dataSources: ['Form 433-A (OIC) asset sections', 'Bank/brokerage statements', 'Property appraisals or online estimates'],
  },
  {
    id: 'mdi',
    title: 'Monthly Disposable Income (MDI)',
    irsReference: 'IRM 5.8.5.5 — Future Income',
    description: 'MDI is the difference between your gross monthly income and your total allowable monthly expenses. This is what the IRS considers available to pay toward your tax debt each month.',
    formula: 'MDI = Gross Monthly Income - Total Allowable Expenses',
    components: [
      { name: 'Gross Monthly Income', description: 'All sources: wages, self-employment, Social Security, pensions, rental income, etc.' },
      { name: 'National Standards', description: 'IRS allowance for food, clothing, housekeeping, personal care, and miscellaneous.' },
      { name: 'Local Standards', description: 'IRS allowance for housing/utilities (varies by county) and transportation (varies by region).' },
      { name: 'Other Necessary Expenses', description: 'Health insurance, court-ordered payments, child care, taxes (current year).' },
    ],
    example: {
      inputs: [
        { label: 'Gross Monthly Income', value: '$5,800' },
        { label: 'National Standards (family of 3)', value: '$1,884' },
        { label: 'Local Standards (housing)', value: '$2,012' },
        { label: 'Transportation', value: '$588' },
        { label: 'Health Insurance', value: '$450' },
        { label: 'Current Taxes (withholding)', value: '$725' },
      ],
      calculation: 'MDI = $5,800 - ($1,884 + $2,012 + $588 + $450 + $725)',
      result: '$141/month disposable income',
    },
    dataSources: ['IRS National Standards (updated annually)', 'IRS Local Standards by county', 'IRS Transportation Standards by region', 'Pay stubs, 1099s, Social Security statements'],
  },
  {
    id: 'rcp',
    title: 'Reasonable Collection Potential (RCP)',
    irsReference: 'IRM 5.8.5.2 — Calculation of Reasonable Collection Potential',
    description: 'The RCP is the IRS\'s estimate of the maximum amount they could collect from you. It combines your asset equity with your projected future income. The RCP is the minimum acceptable offer amount for an OIC.',
    formula: 'RCP = NRE + (MDI x Multiplier)',
    components: [
      { name: 'NRE', description: 'Net Realizable Equity from all assets (calculated above).' },
      { name: 'MDI', description: 'Monthly Disposable Income (calculated above).' },
      { name: 'Multiplier', description: '12 months for Lump Sum offers (pay within 5 months of acceptance). 24 months for Periodic Payment offers (pay within 24 months).' },
    ],
    example: {
      inputs: [
        { label: 'NRE', value: '$13,700' },
        { label: 'MDI', value: '$141/month' },
        { label: 'Payment Type', value: 'Lump Sum (12x)' },
      ],
      calculation: 'RCP = $13,700 + ($141 x 12)',
      result: '$15,392 (minimum OIC offer amount)',
    },
    dataSources: ['Derived from NRE and MDI calculations above', 'IRM 5.8.5 — Offer in Compromise procedures'],
  },
]

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/analysis/results"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Results
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">How We Calculate Your Options</h1>
          <p className="mt-2 text-zinc-400">
            Full transparency into the formulas and methodology used to determine your resolution options. All calculations follow official IRS procedures from the Internal Revenue Manual (IRM).
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">On This Page</h2>
          <div className="space-y-2">
            {FORMULA_SECTIONS.map((section, i) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 rounded-lg border border-[#27272a] bg-[#09090b] p-3 transition hover:border-zinc-600"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-bold text-blue-400">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{section.title}</p>
                  <p className="text-xs text-zinc-500">{section.irsReference}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Formula Sections */}
        {FORMULA_SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6 scroll-mt-8">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">{section.title}</h2>
              <p className="mt-1 text-xs font-medium text-blue-400">{section.irsReference}</p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{section.description}</p>
            </div>

            {/* Formula */}
            <div className="mb-6 rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Formula</p>
              <p className="font-mono text-lg font-bold text-blue-400">{section.formula}</p>
            </div>

            {/* Components */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Components</h3>
              <div className="space-y-2">
                {section.components.map((comp) => (
                  <div key={comp.name} className="rounded-lg border border-[#27272a] bg-[#09090b] p-3">
                    <p className="text-sm font-semibold text-white">{comp.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Calculation */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Example Calculation</h3>
              <div className="rounded-xl bg-[#09090b] border border-[#27272a] p-4">
                {/* Inputs */}
                <div className="space-y-1.5 mb-4">
                  {section.example.inputs.map((input) => (
                    <div key={input.label} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{input.label}</span>
                      <span className="font-mono font-semibold text-white">{input.value}</span>
                    </div>
                  ))}
                </div>
                {/* Calculation */}
                <div className="border-t border-[#27272a] pt-3 mb-3">
                  <p className="font-mono text-sm text-zinc-300">{section.example.calculation}</p>
                </div>
                {/* Result */}
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Result</span>
                    <span className="font-mono text-lg font-bold text-blue-400">{section.example.result}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Data Sources</h3>
              <div className="space-y-1.5">
                {section.dataSources.map((source, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-600" />
                    <p className="text-sm text-zinc-400">{source}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* IRS Standards Reference */}
        <div className="rounded-2xl border border-[#27272a] bg-[#18181b] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">IRS Allowable Expense Standards</h2>
          <p className="text-sm text-zinc-400 mb-6">
            The IRS publishes standardized expense allowances that determine how much you can claim for living expenses. These standards are updated annually and vary by location and family size.
          </p>
          <div className="space-y-3">
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <h3 className="text-sm font-semibold text-white">National Standards</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Covers food, housekeeping supplies, apparel, personal care, and miscellaneous expenses. Based on Bureau of Labor Statistics Consumer Expenditure Survey data. Amounts vary only by family size (1, 2, 3, 4, or 5+ persons).
              </p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <h3 className="text-sm font-semibold text-white">Local Standards — Housing &amp; Utilities</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Covers mortgage/rent, property taxes, insurance, maintenance, utilities, and heating fuel. Varies by county and family size. Based on Census Bureau American Community Survey data.
              </p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <h3 className="text-sm font-semibold text-white">Local Standards — Transportation</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Covers vehicle ownership costs (loan/lease, insurance) and operating costs (gas, maintenance, registration). National ownership cost plus regional operating cost. Public transit allowance available if no vehicle.
              </p>
            </div>
            <div className="rounded-xl border border-[#27272a] bg-[#09090b] p-4">
              <h3 className="text-sm font-semibold text-white">Out-of-Pocket Health Care</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Allowance for medical expenses not covered by insurance. Amount varies by age bracket (under 65 vs. 65 and older). Based on Bureau of Labor Statistics Medical Expenditure Panel Survey.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-amber-400">Important Disclaimer</h3>
              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                These calculations are estimates based on the information you provided and current IRS standards. Actual IRS determinations may vary based on additional factors, examiner discretion, and changes to IRS policy. This tool is for educational and planning purposes — it does not constitute tax advice. For complex situations, consult a qualified tax professional (EA, CPA, or tax attorney).
              </p>
            </div>
          </div>
        </div>

        {/* Back to Results */}
        <div className="pb-8">
          <Link
            href="/analysis/results"
            className="block w-full rounded-xl border border-[#27272a] bg-[#18181b] py-4 text-center text-base font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Back to Resolution Results
          </Link>
        </div>
      </div>
    </div>
  )
}
