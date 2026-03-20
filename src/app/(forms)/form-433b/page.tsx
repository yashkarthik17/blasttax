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
  subtitle?: string
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
            {subtitle && <div className="text-xs text-zinc-500">{subtitle}</div>}
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
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}

function LineItem({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="text-sm font-bold text-white">{amount}</span>
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-2 text-xs font-bold text-blue-400 transition-colors hover:bg-blue-500/20"
    >
      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      {label}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form433BPage() {
  const router = useRouter()
  const { answers } = useWizard()

  const [step] = useState(2)
  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  /* Business Details state */
  const [businessName] = useState(answers.businessName ?? "Doe's Consulting LLC")
  const [businessType, setBusinessType] = useState(answers.businessType ?? 'LLC')

  /* Accounts Receivable state */
  const [arTotal, setArTotal] = useState('$8,500')

  /* Business Income state */
  const [grossReceipts, setGrossReceipts] = useState('$18,500')
  const [cogsAmount, setCogsAmount] = useState('$4,200')

  /* Computed values (static for pre-filled demo) */
  const netBusinessIncome = '$2,550/mo'
  const totalBusinessEquity = '$29,700'

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Progress */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">Step {step} of {totalSteps}</span>
          <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="relative h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute -top-[1px] right-0 h-[7px] w-[7px] rounded-full bg-blue-400" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Business Financial Information</h1>
        <p className="mt-1 text-sm text-zinc-400">Required for business tax debt resolutions</p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Business Details Card                                            */}
      {/* ---------------------------------------------------------------- */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Business Details
        </h3>
        <div className="space-y-3">
          <PrefilledField label="Business Name" value={businessName} />

          <div>
            <div className="mb-1 text-xs font-semibold text-zinc-400">EIN</div>
            <div className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-4 py-2.5">
              <span className="text-sm font-semibold tracking-wider text-white">**-***4321</span>
              <svg className="h-3 w-3 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Business Type</label>
            <select
              className={inputClass}
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="LLC">LLC</option>
              <option value="S-Corp">S-Corp</option>
              <option value="C-Corp">C-Corp</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Business Bank Accounts                                           */}
      {/* ---------------------------------------------------------------- */}

      <Section
        icon={
          <svg className="h-3.5 w-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
            />
            <path
              fillRule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBg="bg-blue-500/15"
        title="Business Bank Accounts"
        defaultOpen
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-3 py-2.5">
            <div>
              <div className="text-sm font-semibold text-white">Chase Business Checking</div>
              <div className="text-xs text-zinc-500">****6789</div>
            </div>
            <span className="text-sm font-bold text-white">$12,340</span>
          </div>
          <AddButton label="Add Account" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Accounts Receivable                                              */}
      {/* ---------------------------------------------------------------- */}

      <Section
        icon={
          <svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 1a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBg="bg-emerald-500/15"
        title="Accounts Receivable"
        subtitle="Total: $8,500"
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Total Outstanding</label>
            <input
              type="text"
              className={inputClass}
              value={arTotal}
              onChange={(e) => setArTotal(e.target.value)}
              placeholder="$0"
            />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Business Assets                                                  */}
      {/* ---------------------------------------------------------------- */}

      <Section
        icon={
          <svg className="h-3.5 w-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" />
          </svg>
        }
        iconBg="bg-violet-500/15"
        title="Business Assets"
        subtitle="Equipment, inventory, vehicles"
      >
        <div className="space-y-2">
          <LineItem label="Equipment" amount="$15,000" />
          <LineItem label="Inventory" amount="$6,200" />
          <LineItem label="Vehicles" amount="$8,500" />
          <div className="pt-1">
            <AddButton label="Add Asset" />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Business Income                                                  */}
      {/* ---------------------------------------------------------------- */}

      <Section
        icon={
          <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBg="bg-amber-500/15"
        title="Business Income"
        subtitle="Monthly gross receipts"
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Monthly Gross Receipts</label>
            <input
              type="text"
              className={inputClass}
              value={grossReceipts}
              onChange={(e) => setGrossReceipts(e.target.value)}
              placeholder="$0"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-400">Cost of Goods Sold</label>
            <input
              type="text"
              className={inputClass}
              value={cogsAmount}
              onChange={(e) => setCogsAmount(e.target.value)}
              placeholder="$0"
            />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Business Expenses                                                */}
      {/* ---------------------------------------------------------------- */}

      <Section
        icon={
          <svg className="h-3.5 w-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        }
        iconBg="bg-red-500/15"
        title="Business Expenses"
        subtitle="Rent, utilities, payroll, etc."
      >
        <div className="space-y-2">
          <LineItem label="Rent" amount="$3,200" />
          <LineItem label="Utilities" amount="$450" />
          <LineItem label="Insurance" amount="$380" />
          <LineItem label="Payroll" amount="$6,800" />
          <LineItem label="Supplies" amount="$920" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Net Business Income Summary Card                                 */}
      {/* ---------------------------------------------------------------- */}

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">Net Business Income</span>
          <span className="text-lg font-black text-white">{netBusinessIncome}</span>
        </div>
        <div className="my-3 h-px bg-blue-500/10" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-400">Total Business Equity</span>
          <span className="text-lg font-black text-white">{totalBusinessEquity}</span>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Action Buttons                                                   */}
      {/* ---------------------------------------------------------------- */}

      <div className="space-y-3 pt-2">
        {/* Generate PDF */}
        <button
          type="button"
          onClick={() => {
            /* TODO: wire up PDF generation */
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-zinc-700 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h6M9 13h6M9 9h1" />
          </svg>
          Generate PDF
        </button>

        {/* Continue / Submit */}
        <button
          type="button"
          onClick={() => router.push('/submission')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
        >
          Continue
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        {/* Save & Exit */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
