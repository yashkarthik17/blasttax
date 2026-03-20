'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'

/* ------------------------------------------------------------------ */
/* Collapsible Section                                                 */
/* ------------------------------------------------------------------ */

function Section({
  icon,
  iconBg,
  title,
  subtitle,
  badge,
  badgeColor,
  rightLabel,
  defaultOpen = false,
  children,
}: {
  icon: React.ReactNode
  iconBg: string
  title: string
  subtitle: string
  badge?: string
  badgeColor?: string
  rightLabel?: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
            {icon}
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">{title}</div>
            <div className="text-xs text-zinc-500">{subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
              {badge}
            </span>
          )}
          {rightLabel && <span className="text-sm font-bold text-white">{rightLabel}</span>}
          <svg
            className={`h-3 w-3 text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {open && <div className="mt-4 border-t border-zinc-800 pt-4">{children}</div>}
    </div>
  )
}

function PrefilledField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold text-zinc-400">{label}</div>
      <div className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-2.5">
        <span className="text-sm font-semibold text-white">{value}</span>
        <svg className="h-3 w-3 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

function AssetRow({ label, detail, amount }: { label: string; detail: string; amount: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800/50 py-2.5 last:border-0">
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-zinc-500">{detail}</div>
      </div>
      <div className="text-sm font-bold text-white">{amount}</div>
    </div>
  )
}

function ExpenseRow({ label, detail, amount, color = 'text-white' }: { label: string; detail?: string; amount: string; color?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800/50 py-2 last:border-0">
      <div>
        <span className="text-sm text-zinc-400">{label}</span>
        {detail && <div className="text-[10px] text-zinc-600">{detail}</div>}
      </div>
      <span className={`text-sm font-bold ${color}`}>{amount}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433APage() {
  const router = useRouter()
  const { answers } = useWizard()

  const [certify, setCertify] = useState(false)
  const [step] = useState(1)
  const progress = (step / 4) * 100

  // Spouse / Other Income
  const [spouseEmployer, setSpouseEmployer] = useState('')
  const [spouseOccupation, setSpouseOccupation] = useState('')
  const [spouseIncome, setSpouseIncome] = useState('')
  const [socialSecurity, setSocialSecurity] = useState('$0')
  const [rentalIncome, setRentalIncome] = useState('$0')
  const [otherIncome, setOtherIncome] = useState('$0')

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Progress */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">Step {step} of 4</span>
          <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Collection Information Statement</h1>
        <p className="mt-1 text-sm text-zinc-400">IRS Form 433-A &mdash; Individual Financial Statement</p>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-xl bg-blue-500/10 px-4 py-3 ring-1 ring-blue-500/20">
        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-blue-300 leading-relaxed">
          This form is required for Non-Streamlined IAs ($50K+), PPIA, and CNC requests. We&apos;ve pre-filled data from your financial analysis.
        </p>
      </div>

      {/* Section 1: Personal Information */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
        iconBg="bg-blue-500/15"
        title="Section 1: Personal Information"
        subtitle="Pre-filled from profile"
        badge="COMPLETE"
        badgeColor="bg-emerald-500/15 text-emerald-400"
      >
        <div className="space-y-3">
          <PrefilledField label="Full Name" value={answers.taxpayerName ?? 'Jane M. Doe'} />
          <div className="grid grid-cols-2 gap-3">
            <PrefilledField label="SSN" value="***-**-4589" />
            <PrefilledField label="Date of Birth" value="04/15/1984" />
          </div>
          <PrefilledField label="Address" value="1234 Elm Street, Austin, TX 78701" />
          <div className="grid grid-cols-2 gap-3">
            <PrefilledField label="Home Phone" value="(512) 555-0147" />
            <PrefilledField label="Cell Phone" value="(512) 555-0199" />
          </div>
        </div>
      </Section>

      {/* Section 2: Employment */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm-2 5a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
        iconBg="bg-violet-500/15"
        title="Section 2: Employment"
        subtitle="Current employer details"
        badge="COMPLETE"
        badgeColor="bg-emerald-500/15 text-emerald-400"
      >
        <div className="space-y-3">
          <PrefilledField label="Employer Name" value="Acme Technology Inc." />
          <PrefilledField label="Employer Address" value="500 Tech Blvd, Austin, TX 78702" />
          <div className="grid grid-cols-2 gap-3">
            <PrefilledField label="How Long Employed" value="3 years, 4 months" />
            <div>
              <div className="mb-1 text-xs font-semibold text-zinc-400">Pay Frequency</div>
              <select className={inputClass}>
                <option>Bi-weekly</option>
                <option>Weekly</option>
                <option>Semi-monthly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          <PrefilledField label="Occupation" value="Software Engineer" />
        </div>
      </Section>

      {/* Section 3: Other Income */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>}
        iconBg="bg-teal-500/15"
        title="Section 3: Other Income"
        subtitle="Spouse employment &amp; other sources"
      >
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Spouse Employment</h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-400">Spouse Employer Name</label>
              <input type="text" className={inputClass} placeholder="Employer name (if applicable)" value={spouseEmployer} onChange={(e) => setSpouseEmployer(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Occupation</label>
                <input type="text" className={inputClass} placeholder="Occupation" value={spouseOccupation} onChange={(e) => setSpouseOccupation(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Monthly Income</label>
                <input type="text" className={inputClass} placeholder="$0" value={spouseIncome} onChange={(e) => setSpouseIncome(e.target.value)} />
              </div>
            </div>
          </div>
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Other Income Sources</h4>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-zinc-400">Social Security / Pension</label>
              <input type="text" className={inputClass} value={socialSecurity} onChange={(e) => setSocialSecurity(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Rental Income</label>
                <input type="text" className={inputClass} value={rentalIncome} onChange={(e) => setRentalIncome(e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-400">Other</label>
                <input type="text" className={inputClass} value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 4: Asset Summary */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>}
        iconBg="bg-emerald-500/15"
        title="Section 4: Asset Summary"
        subtitle="From financial analysis data"
        rightLabel="$68,600"
        defaultOpen
      >
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Bank Accounts</h4>
          <AssetRow label="Chase Checking ****3421" detail="Full balance reported" amount="$3,400" />
          <AssetRow label="Ally Savings ****7890" detail="Full balance reported" amount="$800" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Investments</h4>
          <AssetRow label="Brokerage -- Schwab" detail="Stocks, bonds, mutual funds" amount="$0" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Retirement Accounts</h4>
          <AssetRow label="401(k) -- Fidelity" detail="Balance reported at FMV" amount="$42,000" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Real Estate</h4>
          <AssetRow label="Primary Residence" detail="FMV $320K - $285K mtg - $20K HELOC" amount="$15,000" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Vehicles</h4>
          <AssetRow label="2020 Honda Civic" detail="FMV $18.5K - $13.3K loan" amount="$5,200" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Life Insurance</h4>
          <AssetRow label="Whole Life -- Net CSV" detail="CSV $4,500 - $1,300 policy loans" amount="$3,200" />

          <h4 className="mt-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Other Assets</h4>
          <AssetRow label="No other assets reported" detail="" amount="$0" />

          {/* Total */}
          <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Total Asset Equity</span>
            <span className="text-lg font-black text-white">$68,600</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <svg className="h-3 w-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" /></svg>
            Auto-calculated from financial analysis data
          </div>
        </div>
      </Section>

      {/* Section 5: Monthly Income */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a5.389 5.389 0 01-.421-.771H10a1 1 0 100-2H8.128a7.373 7.373 0 010-1H10a1 1 0 100-2H8.315c.1-.279.22-.541.421-.771z" clipRule="evenodd" /></svg>}
        iconBg="bg-emerald-500/15"
        title="Section 5: Monthly Income"
        subtitle="All sources, per-person"
        rightLabel="$5,200/mo"
      >
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Taxpayer</h4>
          <ExpenseRow label="Gross wages/salary" amount="$6,250" />
          <ExpenseRow label="Federal tax withheld" amount="-$625" color="text-red-400" />
          <ExpenseRow label="State tax withheld" amount="$0" color="text-red-400" />
          <ExpenseRow label="FICA (SS + Medicare)" amount="-$425" color="text-red-400" />
          <div className="mt-2 flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
            <span className="text-sm font-bold text-white">Net monthly income</span>
            <span className="text-base font-extrabold text-white">$5,200</span>
          </div>
        </div>
      </Section>

      {/* Section 6: Monthly Expenses */}
      <Section
        icon={<svg className="h-3.5 w-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" /></svg>}
        iconBg="bg-red-500/15"
        title="Section 6: Monthly Expenses"
        subtitle="IRS standards comparison"
        rightLabel="$4,689/mo"
      >
        <div className="space-y-1">
          <ExpenseRow label="Food, clothing, misc" detail="IRS standard: $785/mo" amount="$785" />
          <ExpenseRow label="Housing & utilities" detail="IRS standard: $2,138/mo" amount="$1,850" />
          <ExpenseRow label="Transportation (ownership)" amount="$662" />
          <ExpenseRow label="Transportation (operating)" amount="$294" />
          <ExpenseRow label="Healthcare" detail="Under 65: $84/person" amount="$84" />
          <ExpenseRow label="Health insurance" amount="$450" />
          <ExpenseRow label="Court-ordered payments" amount="$0" />
          <ExpenseRow label="Child/dependent care" amount="$564" />
          <div className="mt-2 flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
            <span className="text-sm font-bold text-white">Total allowable expenses</span>
            <span className="text-base font-extrabold text-red-400">$4,689</span>
          </div>
        </div>
      </Section>

      {/* Section 7: Monthly Disposable Income */}
      <div className="rounded-2xl border border-emerald-500/20 bg-zinc-900/50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
            <svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3-1a1 1 0 10-2 0v4a1 1 0 102 0v-4zm-4 3a1 1 0 012 0v1a1 1 0 11-2 0v-1z" clipRule="evenodd" /></svg>
          </div>
          <span className="text-sm font-bold text-white">Section 7: Monthly Disposable Income</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
            <span className="text-sm text-zinc-400">Net monthly income</span>
            <span className="text-sm font-bold text-white">$5,200</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
            <span className="text-sm text-zinc-400">Total allowable expenses</span>
            <span className="text-sm font-bold text-red-400">-$4,689</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-3 py-3">
            <span className="text-sm font-bold text-white">Monthly Disposable Income (MDI)</span>
            <span className="text-lg font-black text-emerald-400">$511</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2.5">
            <svg className="h-3 w-3 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v7.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V3z" /></svg>
            <span className="text-xs text-amber-300">This MDI determines your monthly IA payment amount or CNC eligibility.</span>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15">
            <svg className="h-3.5 w-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
          </div>
          <span className="text-sm font-bold text-white">Signature &amp; Certification</span>
        </div>
        <p className="mb-4 text-xs text-zinc-400 leading-relaxed">
          Under penalties of perjury, I declare that I have examined this statement and, to the best of my knowledge and belief, it is true, correct, and complete.
        </p>
        <label className="mb-4 flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={certify}
            onChange={(e) => setCertify(e.target.checked)}
            className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-blue-500 accent-blue-500"
          />
          <span className="text-sm font-semibold text-white">I certify this information is accurate</span>
        </label>
        <div className="grid grid-cols-[1fr_120px] gap-3">
          <div>
            <div className="mb-1 text-xs font-semibold text-zinc-400">Taxpayer Signature</div>
            <div className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800/50">
              <span className="text-xs text-zinc-600">Tap to sign</span>
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold text-zinc-400">Date</div>
            <div className="flex h-12 items-center rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3">
              <span className="text-sm font-semibold text-white">03/17/2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => router.push('/submission')}
          disabled={!certify}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-40"
        >
          Continue to Submission
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <button
          onClick={() => router.back()}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
          Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
