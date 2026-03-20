'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function RequiredBadge() {
  return <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">Required</span>
}

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-white">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">{number}</span>
      {title}
    </h2>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center text-sm font-medium text-zinc-300">
        {label}
        {required && <RequiredBadge />}
      </span>
      {children}
    </label>
  )
}

function StatRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-blue-400' : 'text-white'}`}>{value}</span>
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
const selectClass = inputClass

/* ------------------------------------------------------------------ */
/* Asset Category Labels                                               */
/* ------------------------------------------------------------------ */

const ASSET_LABELS: Record<string, string> = {
  bankAccount: 'Bank Accounts',
  investmentLiquid: 'Investments (Liquid)',
  investmentIlliquid: 'Investments (Illiquid)',
  retirementAccount: 'Retirement Accounts',
  realEstate: 'Real Estate',
  vehicle: 'Vehicles',
  lifeInsurance: 'Life Insurance (CSV)',
  crypto: 'Cryptocurrency',
  other: 'Other Assets',
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433AOICPage() {
  const { answers, caseId } = useWizard()

  // Pull pre-filled data from wizard answers / calculations
  const nreBreakdown: { assetId: string; assetType: string; qsv: number }[] = answers.nreBreakdown ?? []
  const totalNRE: number = answers.totalNRE ?? nreBreakdown.reduce((s, a) => s + Math.max(0, a.qsv), 0)

  const mdiResult = answers.mdiResult ?? { totalIncome: 0, totalAllowableExpenses: 0, mdi: 0, expenseBreakdown: [] }
  const rcpResult = answers.rcpResult ?? { nre: totalNRE, futureIncomeLumpSum: 0, futureIncomePeriodic: 0, rcpLumpSum: 0, rcpPeriodic: 0 }

  // Section 1: Personal info
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [dob, setDob] = useState(answers.dob ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')
  const [phone, setPhone] = useState(answers.phone ?? '')
  const [maritalStatus, setMaritalStatus] = useState(answers.filingStatus ?? 'Single')

  // Section 2: Employment
  const [employerName, setEmployerName] = useState(answers.employerName ?? '')
  const [employerAddress, setEmployerAddress] = useState(answers.employerAddress ?? '')
  const [occupation, setOccupation] = useState(answers.occupation ?? '')
  const [yearsEmployed, setYearsEmployed] = useState(answers.yearsEmployed ?? '')

  // Section 4: Self-employment (toggle)
  const [isSelfEmployed, setIsSelfEmployed] = useState(answers.isSelfEmployed ?? false)
  const [businessName, setBusinessName] = useState(answers.businessName ?? '')
  const [businessEin, setBusinessEin] = useState(answers.businessEin ?? '')
  const [businessType, setBusinessType] = useState(answers.businessType ?? 'Sole Proprietorship')

  // Dissipated assets
  const [hasDissipated, setHasDissipated] = useState(false)
  const [dissipatedDescription, setDissipatedDescription] = useState('')

  const [generating, setGenerating] = useState(false)

  // Group NRE breakdown by asset type for display
  const assetsByType = nreBreakdown.reduce<Record<string, { assetType: string; qsv: number }[]>>((acc, item) => {
    const key = item.assetType
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-433a-oic' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-433A-OIC.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white">Form 433-A(OIC)</h1>
        <p className="mt-1 text-sm text-zinc-400">Collection Information Statement for Wage Earners and Self-Employed Individuals &mdash; Used with your Offer in Compromise.</p>
      </div>

      {/* ── Section 1: Personal Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={1} title="Personal Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="SSN" required>
            <input className={inputClass} value={ssn} onChange={(e) => setSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
          </Field>
          <Field label="Date of Birth" required>
            <input className={inputClass} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </Field>
          <Field label="Marital / Filing Status">
            <select className={selectClass} value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
              <option value="Single">Single</option>
              <option value="MFJ">Married Filing Jointly</option>
              <option value="MFS">Married Filing Separately</option>
              <option value="HOH">Head of Household</option>
            </select>
          </Field>
          <Field label="Street Address" required>
            <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City"><input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} /></Field>
            <Field label="State"><input className={inputClass} value={state} onChange={(e) => setState(e.target.value)} maxLength={2} /></Field>
            <Field label="ZIP"><input className={inputClass} value={zip} onChange={(e) => setZip(e.target.value)} /></Field>
          </div>
          <Field label="Phone">
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
        </div>
      </section>

      {/* ── Section 2: Employment Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={2} title="Employment Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Employer Name" required>
            <input className={inputClass} value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          </Field>
          <Field label="Employer Address">
            <input className={inputClass} value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)} />
          </Field>
          <Field label="Occupation">
            <input className={inputClass} value={occupation} onChange={(e) => setOccupation(e.target.value)} />
          </Field>
          <Field label="Years Employed">
            <input className={inputClass} type="number" value={yearsEmployed} onChange={(e) => setYearsEmployed(e.target.value)} />
          </Field>
        </div>
      </section>

      {/* ── Section 3: Assets (All 8 Categories with QSV) ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={3} title="Assets — Quick Sale Values (QSV)" />

        {Object.keys(assetsByType).length === 0 ? (
          <div className="rounded-lg bg-zinc-900/50 p-4 text-center text-sm text-zinc-500">
            No assets recorded. Asset data will be pre-filled from your financial questionnaire.
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(assetsByType).map(([type, assets]) => (
              <div key={type} className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-zinc-200">{ASSET_LABELS[type] ?? type}</h3>
                <div className="divide-y divide-zinc-800">
                  {assets.map((asset, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-zinc-400">Asset #{idx + 1}</span>
                      <span className="text-sm font-medium text-white">${asset.qsv.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between border-t border-zinc-700 pt-2">
                  <span className="text-xs font-medium text-zinc-400">Subtotal</span>
                  <span className="text-sm font-semibold text-blue-400">
                    ${assets.reduce((s, a) => s + Math.max(0, a.qsv), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between rounded-lg bg-blue-600/10 p-4">
              <span className="text-sm font-semibold text-zinc-200">Total Net Realizable Equity (NRE)</span>
              <span className="text-lg font-bold text-blue-400">${totalNRE.toLocaleString()}</span>
            </div>
          </div>
        )}
      </section>

      {/* ── Section 4: Self-Employment (if applicable) ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={4} title="Self-Employment Information" />

        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={isSelfEmployed} onChange={(e) => setIsSelfEmployed(e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <span className="text-sm font-medium text-zinc-300">I am self-employed or have business income</span>
        </label>

        {isSelfEmployed && (
          <div className="mt-4 grid gap-4 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:grid-cols-2">
            <Field label="Business Name" required>
              <input className={inputClass} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </Field>
            <Field label="Business EIN">
              <input className={inputClass} value={businessEin} onChange={(e) => setBusinessEin(e.target.value)} placeholder="XX-XXXXXXX" />
            </Field>
            <Field label="Business Type">
              <select className={selectClass} value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                <option>Sole Proprietorship</option>
                <option>Single-Member LLC</option>
                <option>Partnership</option>
                <option>S Corporation</option>
              </select>
            </Field>
          </div>
        )}
      </section>

      {/* ── Section 5: Monthly Income ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={5} title="Monthly Income (All Sources)" />

        <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4">
          <StatRow label="Gross Monthly Income" value={`$${mdiResult.totalIncome.toLocaleString()}`} />
          {(answers.incomeRecords ?? []).map((inc: { incomeType: string; grossMonthly: number; person: string }, idx: number) => (
            <StatRow key={idx} label={`${inc.incomeType} (${inc.person})`} value={`$${inc.grossMonthly.toLocaleString()}`} />
          ))}
        </div>
      </section>

      {/* ── Section 6: Monthly Expenses ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={6} title="Monthly Expenses (with IRS Standards)" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-left text-xs text-zinc-400">
                <th className="pb-2 pr-4">Category</th>
                <th className="pb-2 pr-4 text-right">Actual</th>
                <th className="pb-2 pr-4 text-right">IRS Standard</th>
                <th className="pb-2 text-right">Allowable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {(mdiResult.expenseBreakdown ?? []).map((exp: { category: string; actual: number; standard: number; allowable: number }, idx: number) => (
                <tr key={idx}>
                  <td className="py-2 pr-4 text-zinc-300">{exp.category.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td className="py-2 pr-4 text-right text-zinc-400">${exp.actual.toLocaleString()}</td>
                  <td className="py-2 pr-4 text-right text-zinc-500">${exp.standard.toLocaleString()}</td>
                  <td className="py-2 text-right font-medium text-white">${exp.allowable.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-600">
                <td className="pt-3 font-semibold text-zinc-300">Total</td>
                <td className="pt-3 text-right text-zinc-400">
                  ${(mdiResult.expenseBreakdown ?? []).reduce((s: number, e: { actual: number }) => s + e.actual, 0).toLocaleString()}
                </td>
                <td className="pt-3 text-right text-zinc-500">-</td>
                <td className="pt-3 text-right font-bold text-white">${mdiResult.totalAllowableExpenses.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ── NRE & RCP Summary ── */}
      <section className="rounded-xl border border-blue-500/30 bg-blue-600/5 p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Calculation Summary</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* MDI */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Monthly Disposable Income (MDI)</h3>
            <div className="divide-y divide-zinc-800">
              <StatRow label="Gross Monthly Income" value={`$${mdiResult.totalIncome.toLocaleString()}`} />
              <StatRow label="Allowable Expenses" value={`-$${mdiResult.totalAllowableExpenses.toLocaleString()}`} />
              <StatRow label="MDI" value={`$${mdiResult.mdi.toLocaleString()}`} highlight />
            </div>
          </div>

          {/* Future Income */}
          <div className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Future Income</h3>
            <div className="divide-y divide-zinc-800">
              <StatRow label="Lump Sum (MDI x 12)" value={`$${rcpResult.futureIncomeLumpSum.toLocaleString()}`} />
              <StatRow label="Periodic (MDI x 24)" value={`$${rcpResult.futureIncomePeriodic.toLocaleString()}`} />
            </div>
          </div>
        </div>

        {/* RCP */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-500/30 bg-blue-600/10 p-4">
            <p className="text-xs text-zinc-400">RCP (Lump Sum)</p>
            <p className="mt-1 text-sm text-zinc-400">NRE + Future Income (12 mo)</p>
            <p className="mt-2 text-2xl font-bold text-blue-400">${rcpResult.rcpLumpSum.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-600/10 p-4">
            <p className="text-xs text-zinc-400">RCP (Periodic)</p>
            <p className="mt-1 text-sm text-zinc-400">NRE + Future Income (24 mo)</p>
            <p className="mt-2 text-2xl font-bold text-blue-400">${rcpResult.rcpPeriodic.toLocaleString()}</p>
          </div>
        </div>
      </section>

      {/* ── Dissipated Assets ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Dissipated Assets Declaration</h2>

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={hasDissipated} onChange={(e) => setHasDissipated(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">I transferred, sold, or otherwise disposed of assets in the past 3 years</span>
            <p className="mt-0.5 text-xs text-zinc-400">Include sales below fair market value, gifts, or transfers to family members.</p>
          </div>
        </label>

        {hasDissipated && (
          <div className="mt-3">
            <Field label="Describe the transfers" required>
              <textarea
                className={inputClass + ' min-h-[100px] resize-y'}
                value={dissipatedDescription}
                onChange={(e) => setDissipatedDescription(e.target.value)}
                placeholder="Describe each asset transferred, to whom, the date, and the consideration received."
              />
            </Field>
          </div>
        )}
      </section>

      {/* ── Generate PDF ── */}
      <div className="flex gap-3">
        <button
          onClick={handleGeneratePdf}
          disabled={generating}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  )
}
