'use client'

import { useState } from 'react'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

function RequiredBadge() {
  return <span className="ml-1 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">Required</span>
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
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

const inputClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
const selectClass = inputClass

/* ------------------------------------------------------------------ */
/* IA Type badge color                                                 */
/* ------------------------------------------------------------------ */

function iaTypeBadge(type: string) {
  const colors: Record<string, string> = {
    GuaranteedIA: 'bg-green-600/20 text-green-400',
    StreamlinedIA: 'bg-blue-600/20 text-blue-400',
    ExpandedStreamlinedIA: 'bg-blue-600/20 text-blue-400',
    NonStreamlinedIA: 'bg-amber-600/20 text-amber-400',
    RegularIA: 'bg-amber-600/20 text-amber-400',
    ShortTermPlan: 'bg-emerald-600/20 text-emerald-400',
    PPIA: 'bg-purple-600/20 text-purple-400',
  }
  const labels: Record<string, string> = {
    GuaranteedIA: 'Guaranteed IA',
    StreamlinedIA: 'Streamlined IA',
    ExpandedStreamlinedIA: 'Expanded Streamlined IA',
    NonStreamlinedIA: 'Non-Streamlined IA',
    RegularIA: 'Regular IA',
    ShortTermPlan: 'Short-Term Plan',
    PPIA: 'Partial Pay IA',
  }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[type] ?? 'bg-zinc-700 text-zinc-300'}`}>
      {labels[type] ?? type}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Setup Fee Calculation                                               */
/* ------------------------------------------------------------------ */

function getSetupFee(method: string, ddiaRequired: boolean, isLowIncome: boolean): number {
  if (isLowIncome) return 22
  if (method === 'ddia') return 22
  if (method === 'check') return 178
  if (method === 'payroll') return 69
  return 69
}

/* ------------------------------------------------------------------ */
/* Debt Row                                                            */
/* ------------------------------------------------------------------ */

interface DebtRow {
  taxYear: string
  formType: string
  amount: string
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form9465Page() {
  const { answers, caseId } = useWizard()

  // Taxpayer info (pre-filled)
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')

  // Spouse
  const isMfj = answers.filingStatus === 'MFJ'
  const [spouseName, setSpouseName] = useState(answers.spouseName ?? '')
  const [spouseSsn, setSpouseSsn] = useState(answers.spouseSsn ?? '')

  // Employer info
  const [employerName, setEmployerName] = useState(answers.employerName ?? '')
  const [employerAddress, setEmployerAddress] = useState(answers.employerAddress ?? '')
  const [spouseEmployerName, setSpouseEmployerName] = useState(answers.spouseEmployerName ?? '')
  const [spouseEmployerAddress, setSpouseEmployerAddress] = useState(answers.spouseEmployerAddress ?? '')

  // Tax debts table
  const [debts, setDebts] = useState<DebtRow[]>(() => {
    if (answers.taxDebts && Array.isArray(answers.taxDebts)) {
      return answers.taxDebts.map((d: { taxYear: number; taxForm: string; balance: number }) => ({
        taxYear: String(d.taxYear),
        formType: d.taxForm,
        amount: String(d.balance),
      }))
    }
    return [{ taxYear: '', formType: '1040', amount: '' }]
  })

  const totalOwed = debts.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)

  // IA Calculation results (pre-filled)
  const iaType = answers.iaRecommendedType ?? 'StreamlinedIA'
  const iaTermMonths = answers.iaTermMonths ?? 72
  const prefilledPayment = answers.iaMonthlyPayment ?? Math.ceil(totalOwed / iaTermMonths)
  const ddiaRequired = answers.iaDdiaRequired ?? totalOwed > 25000
  const isLowIncome = answers.isLowIncome ?? false

  // Monthly payment slider
  const [monthlyPayment, setMonthlyPayment] = useState(prefilledPayment)
  const minPayment = Math.max(25, Math.ceil(totalOwed / 120))
  const maxPayment = Math.ceil(totalOwed / 6)

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'ddia' | 'check' | 'payroll'>(ddiaRequired ? 'ddia' : 'ddia')

  // DDIA bank info
  const [routingNumber, setRoutingNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking')

  // Payment day
  const [paymentDay, setPaymentDay] = useState('15')

  const setupFee = getSetupFee(paymentMethod, ddiaRequired, isLowIncome)

  const [generating, setGenerating] = useState(false)

  function addDebt() {
    setDebts((prev) => [...prev, { taxYear: '', formType: '1040', amount: '' }])
  }

  function updateDebt(index: number, field: keyof DebtRow, value: string) {
    setDebts((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  function removeDebt(index: number) {
    setDebts((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-9465' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-9465-IA-Request.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Form 9465</h1>
          <p className="mt-1 text-sm text-zinc-400">Installment Agreement Request &mdash; Set up a monthly payment plan with the IRS.</p>
        </div>
        {iaTypeBadge(iaType)}
      </div>

      {/* ── Taxpayer Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Taxpayer Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="John A. Doe" />
          </Field>
          <Field label="Social Security Number" required>
            <input className={inputClass} value={ssn} onChange={(e) => setSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
          </Field>
          <Field label="Street Address" required>
            <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City">
              <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <Field label="State">
              <input className={inputClass} value={state} onChange={(e) => setState(e.target.value)} maxLength={2} />
            </Field>
            <Field label="ZIP">
              <input className={inputClass} value={zip} onChange={(e) => setZip(e.target.value)} />
            </Field>
          </div>
        </div>

        {isMfj && (
          <div className="mt-4 grid gap-4 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:grid-cols-2">
            <Field label="Spouse Full Name" required>
              <input className={inputClass} value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
            </Field>
            <Field label="Spouse SSN" required>
              <input className={inputClass} value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
            </Field>
          </div>
        )}
      </section>

      {/* ── Employer Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Employer Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your Employer Name">
            <input className={inputClass} value={employerName} onChange={(e) => setEmployerName(e.target.value)} />
          </Field>
          <Field label="Employer Address">
            <input className={inputClass} value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)} />
          </Field>
        </div>
        {isMfj && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Spouse Employer Name">
              <input className={inputClass} value={spouseEmployerName} onChange={(e) => setSpouseEmployerName(e.target.value)} />
            </Field>
            <Field label="Spouse Employer Address">
              <input className={inputClass} value={spouseEmployerAddress} onChange={(e) => setSpouseEmployerAddress(e.target.value)} />
            </Field>
          </div>
        )}
      </section>

      {/* ── Tax Years / Amounts ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Tax Periods and Amounts Owed" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-left text-xs text-zinc-400">
                <th className="pb-2 pr-4">Tax Year</th>
                <th className="pb-2 pr-4">Form</th>
                <th className="pb-2 pr-4 text-right">Amount Owed</th>
                <th className="pb-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {debts.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4">
                    <input className={inputClass + ' w-24'} value={row.taxYear} onChange={(e) => updateDebt(idx, 'taxYear', e.target.value)} placeholder="2024" />
                  </td>
                  <td className="py-2 pr-4">
                    <select className={selectClass + ' w-28'} value={row.formType} onChange={(e) => updateDebt(idx, 'formType', e.target.value)}>
                      <option value="1040">1040</option>
                      <option value="941">941</option>
                      <option value="940">940</option>
                      <option value="1065">1065</option>
                      <option value="1120">1120</option>
                    </select>
                  </td>
                  <td className="py-2 pr-4">
                    <input className={inputClass + ' w-32 text-right'} type="number" value={row.amount} onChange={(e) => updateDebt(idx, 'amount', e.target.value)} placeholder="0" />
                  </td>
                  <td className="py-2">
                    {debts.length > 1 && (
                      <button onClick={() => removeDebt(idx)} className="text-red-400 hover:text-red-300" aria-label="Remove row">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-600">
                <td colSpan={2} className="pt-3 text-right font-semibold text-zinc-300">Total Amount Owed</td>
                <td className="pt-3 text-right font-bold text-white">${totalOwed.toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <button onClick={addDebt} className="mt-3 rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-200">
          + Add Tax Period
        </button>
      </section>

      {/* ── Monthly Payment ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Monthly Payment Amount" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-white">${monthlyPayment.toLocaleString()}</span>
            <span className="text-sm text-zinc-400">/month</span>
          </div>

          <input
            type="range"
            min={minPayment}
            max={maxPayment}
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full accent-blue-500"
          />

          <div className="flex justify-between text-xs text-zinc-500">
            <span>${minPayment.toLocaleString()}/mo</span>
            <span>${maxPayment.toLocaleString()}/mo</span>
          </div>

          <div className="rounded-lg bg-zinc-900/50 p-3 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Estimated term</span>
              <span className="text-white">{monthlyPayment > 0 ? Math.ceil(totalOwed / monthlyPayment) : 0} months</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>Total paid</span>
              <span className="text-white">${(monthlyPayment * Math.ceil(totalOwed / monthlyPayment)).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment Method ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Payment Method" />

        {ddiaRequired && totalOwed > 25000 && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-600/30 bg-amber-600/10 p-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-amber-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs text-amber-300">Direct Debit Installment Agreement (DDIA) is <span className="font-semibold">required</span> for balances between $25,000 and $50,000.</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${paymentMethod === 'ddia' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="paymentMethod" value="ddia" checked={paymentMethod === 'ddia'} onChange={() => setPaymentMethod('ddia')} className="sr-only" />
            <span className="text-sm font-semibold text-white">Direct Debit (DDIA)</span>
            <span className="mt-1 text-xs text-zinc-400">Auto-debit from bank account</span>
          </label>

          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${paymentMethod === 'check' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'} ${ddiaRequired ? 'pointer-events-none opacity-40' : ''}`}>
            <input type="radio" name="paymentMethod" value="check" checked={paymentMethod === 'check'} onChange={() => setPaymentMethod('check')} disabled={ddiaRequired} className="sr-only" />
            <span className="text-sm font-semibold text-white">Check / Money Order</span>
            <span className="mt-1 text-xs text-zinc-400">Mail monthly payments</span>
          </label>

          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${paymentMethod === 'payroll' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'} ${ddiaRequired ? 'pointer-events-none opacity-40' : ''}`}>
            <input type="radio" name="paymentMethod" value="payroll" checked={paymentMethod === 'payroll'} onChange={() => setPaymentMethod('payroll')} disabled={ddiaRequired} className="sr-only" />
            <span className="text-sm font-semibold text-white">Payroll Deduction</span>
            <span className="mt-1 text-xs text-zinc-400">Deducted from paycheck</span>
          </label>
        </div>

        {paymentMethod === 'ddia' && (
          <div className="mt-4 grid gap-4 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:grid-cols-2">
            <Field label="Bank Routing Number" required>
              <input className={inputClass} value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} placeholder="9-digit routing number" maxLength={9} />
            </Field>
            <Field label="Account Number" required>
              <input className={inputClass} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" />
            </Field>
            <Field label="Account Type" required>
              <select className={selectClass} value={accountType} onChange={(e) => setAccountType(e.target.value as 'checking' | 'savings')}>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </Field>
          </div>
        )}

        {/* Payment day */}
        <div className="mt-4">
          <Field label="Preferred Payment Day of Month">
            <select className={selectClass + ' w-32'} value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)}>
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d)}>{d}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* ── Fee Summary ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Setup Fee" />

        <div className="flex items-center justify-between rounded-lg bg-zinc-900/50 p-4">
          <div>
            <p className="text-sm font-medium text-zinc-300">One-time setup fee</p>
            <p className="text-xs text-zinc-500">{paymentMethod === 'ddia' ? 'Online DDIA' : paymentMethod === 'check' ? 'Phone/Mail' : 'Online'} application</p>
          </div>
          <span className="text-2xl font-bold text-white">${setupFee}</span>
        </div>

        {isLowIncome && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-600/30 bg-green-600/10 p-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400"><path d="M20 6L9 17l-5-5" /></svg>
            <p className="text-xs text-green-400">Low-income fee waiver applied. Setup fee may be reduced or waived.</p>
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
