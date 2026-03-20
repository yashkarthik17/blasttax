'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
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

const inputClass = 'w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
const selectClass = inputClass
const textareaClass = inputClass + ' min-h-[100px] resize-y'

/* ------------------------------------------------------------------ */
/* Tax Period Row                                                      */
/* ------------------------------------------------------------------ */

interface TaxPeriodRow {
  year: string
  form1040: boolean
  form941: boolean
  form940: boolean
  formOther: string
}

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form656Page() {
  const router = useRouter()
  const { answers, caseId } = useWizard()

  // Section 1: Taxpayer Info
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')
  const [phone, setPhone] = useState(answers.phone ?? '')
  const [email, setEmail] = useState(answers.email ?? '')

  // Joint filing
  const [isJoint, setIsJoint] = useState(answers.filingStatus === 'MFJ')
  const [spouseName, setSpouseName] = useState(answers.spouseName ?? '')
  const [spouseSsn, setSpouseSsn] = useState(answers.spouseSsn ?? '')
  const [spouseDob, setSpouseDob] = useState(answers.spouseDob ?? '')

  // Section 2: Tax Periods
  const [taxPeriods, setTaxPeriods] = useState<TaxPeriodRow[]>(() => {
    if (answers.taxDebts && Array.isArray(answers.taxDebts)) {
      return answers.taxDebts.map((d: { taxYear: number; taxForm: string }) => ({
        year: String(d.taxYear),
        form1040: d.taxForm === '1040',
        form941: d.taxForm === '941',
        form940: d.taxForm === '940',
        formOther: !['1040', '941', '940'].includes(d.taxForm) ? d.taxForm : '',
      }))
    }
    return [{ year: '', form1040: true, form941: false, form940: false, formOther: '' }]
  })

  // Section 3: OIC Basis
  const [oicBasis, setOicBasis] = useState<'DATC' | 'ETA'>('DATC')
  const [etaHardship, setEtaHardship] = useState('')

  // Section 4: Payment
  const [paymentOption, setPaymentOption] = useState<'lump' | 'periodic'>('lump')
  const rcpMinimum = answers.rcpLumpSum ?? answers.minimumOffer ?? 0
  const rcpPeriodicMin = answers.rcpPeriodic ?? 0
  const [offerAmount, setOfferAmount] = useState(String(rcpMinimum))

  // Section 5: Low Income
  const [lowIncomeCert, setLowIncomeCert] = useState(answers.isLowIncome ?? false)

  // Section 6: Terms acknowledged
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Section 7: Signature
  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().slice(0, 10))

  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Keep offer amount at or above minimum
  const minimumForOption = paymentOption === 'lump' ? rcpMinimum : rcpPeriodicMin
  useEffect(() => {
    if (Number(offerAmount) < minimumForOption && minimumForOption > 0) {
      setOfferAmount(String(minimumForOption))
    }
  }, [paymentOption, minimumForOption, offerAmount])

  function addTaxPeriod() {
    setTaxPeriods((prev) => [...prev, { year: '', form1040: true, form941: false, form940: false, formOther: '' }])
  }

  function updateTaxPeriod(index: number, field: keyof TaxPeriodRow, value: string | boolean) {
    setTaxPeriods((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)))
  }

  function removeTaxPeriod(index: number) {
    setTaxPeriods((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-656' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-656-OIC.pdf'
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setGenerating(false)
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    // In production: save form data to Supabase, then navigate to submission page
    await new Promise((r) => setTimeout(r, 400))
    router.push('/submission')
    setSubmitting(false)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Form 656</h1>
        <p className="mt-1 text-sm text-zinc-400">Offer in Compromise &mdash; Settle your tax debt for less than the full amount owed.</p>
      </div>

      {/* ── Section 1: Taxpayer Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={1} title="Taxpayer Information" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="John A. Doe" />
          </Field>
          <Field label="Social Security Number" required>
            <input className={inputClass} value={ssn} onChange={(e) => setSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
          </Field>
          <Field label="Street Address" required>
            <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" />
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
          <Field label="Phone" required>
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </Field>
          <Field label="Email">
            <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
          </Field>
        </div>

        {/* Joint Filing Toggle */}
        <div className="mt-6">
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={isJoint} onChange={(e) => setIsJoint(e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500" />
            <span className="text-sm font-medium text-zinc-300">Joint Offer (Married Filing Jointly)</span>
          </label>
        </div>

        {isJoint && (
          <div className="mt-4 grid gap-4 rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:grid-cols-2">
            <Field label="Spouse Full Name" required>
              <input className={inputClass} value={spouseName} onChange={(e) => setSpouseName(e.target.value)} />
            </Field>
            <Field label="Spouse SSN" required>
              <input className={inputClass} value={spouseSsn} onChange={(e) => setSpouseSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
            </Field>
            <Field label="Spouse Date of Birth" required>
              <input className={inputClass} type="date" value={spouseDob} onChange={(e) => setSpouseDob(e.target.value)} />
            </Field>
          </div>
        )}
      </section>

      {/* ── Section 2: Tax Periods ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={2} title="Tax Periods Included in Offer" />

        <div className="space-y-3">
          {taxPeriods.map((row, idx) => (
            <div key={idx} className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-700 bg-zinc-900/50 p-3">
              <Field label="Tax Year">
                <input className={inputClass + ' w-24'} value={row.year} onChange={(e) => updateTaxPeriod(idx, 'year', e.target.value)} placeholder="2024" />
              </Field>
              <div className="flex items-center gap-4 pb-1">
                <label className="flex items-center gap-1.5 text-sm text-zinc-300">
                  <input type="checkbox" checked={row.form1040} onChange={(e) => updateTaxPeriod(idx, 'form1040', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
                  1040
                </label>
                <label className="flex items-center gap-1.5 text-sm text-zinc-300">
                  <input type="checkbox" checked={row.form941} onChange={(e) => updateTaxPeriod(idx, 'form941', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
                  941
                </label>
                <label className="flex items-center gap-1.5 text-sm text-zinc-300">
                  <input type="checkbox" checked={row.form940} onChange={(e) => updateTaxPeriod(idx, 'form940', e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
                  940
                </label>
                <Field label="Other">
                  <input className={inputClass + ' w-20'} value={row.formOther} onChange={(e) => updateTaxPeriod(idx, 'formOther', e.target.value)} placeholder="e.g. 1065" />
                </Field>
              </div>
              {taxPeriods.length > 1 && (
                <button onClick={() => removeTaxPeriod(idx)} className="mb-1 text-sm text-red-400 hover:text-red-300" aria-label="Remove tax period">Remove</button>
              )}
            </div>
          ))}
        </div>

        <button onClick={addTaxPeriod} className="mt-3 rounded-lg border border-dashed border-zinc-600 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-200">
          + Add Tax Period
        </button>
      </section>

      {/* ── Section 3: OIC Basis ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={3} title="Basis for Offer" />

        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-700 p-4 transition-colors hover:border-zinc-500">
            <input type="radio" name="oicBasis" value="DATC" checked={oicBasis === 'DATC'} onChange={() => setOicBasis('DATC')} className="mt-0.5 h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
            <div>
              <span className="text-sm font-semibold text-white">Doubt as to Collectibility (DATC)</span>
              <p className="mt-0.5 text-xs text-zinc-400">I doubt that I can pay the full amount owed before the collection statute expires.</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-700 p-4 transition-colors hover:border-zinc-500">
            <input type="radio" name="oicBasis" value="ETA" checked={oicBasis === 'ETA'} onChange={() => setOicBasis('ETA')} className="mt-0.5 h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
            <div>
              <span className="text-sm font-semibold text-white">Effective Tax Administration (ETA)</span>
              <p className="mt-0.5 text-xs text-zinc-400">I can pay the full amount, but doing so would create an economic hardship or would be unfair and inequitable.</p>
            </div>
          </label>
        </div>

        {oicBasis === 'ETA' && (
          <div className="mt-4">
            <Field label="Describe your hardship or exceptional circumstances" required>
              <textarea className={textareaClass} value={etaHardship} onChange={(e) => setEtaHardship(e.target.value)} placeholder="Explain why paying the full amount would cause economic hardship or be unfair..." />
            </Field>
          </div>
        )}
      </section>

      {/* ── Section 4: Payment Option ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={4} title="Payment Option" />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${paymentOption === 'lump' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="paymentOption" value="lump" checked={paymentOption === 'lump'} onChange={() => setPaymentOption('lump')} className="sr-only" />
            <span className="text-sm font-semibold text-white">Lump Sum Cash</span>
            <span className="mt-1 text-xs text-zinc-400">20% initial payment with application. Balance within 5 months of acceptance.</span>
            {rcpMinimum > 0 && (
              <span className="mt-2 text-xs text-blue-400">Minimum offer: ${rcpMinimum.toLocaleString()}</span>
            )}
          </label>

          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${paymentOption === 'periodic' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="paymentOption" value="periodic" checked={paymentOption === 'periodic'} onChange={() => setPaymentOption('periodic')} className="sr-only" />
            <span className="text-sm font-semibold text-white">Periodic Payment</span>
            <span className="mt-1 text-xs text-zinc-400">First payment with application. Balance within 6-24 months of acceptance.</span>
            {rcpPeriodicMin > 0 && (
              <span className="mt-2 text-xs text-blue-400">Minimum offer: ${rcpPeriodicMin.toLocaleString()}</span>
            )}
          </label>
        </div>

        <div className="mt-5">
          <Field label="Offer Amount" required>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">$</span>
              <input
                className={inputClass + ' pl-7'}
                type="number"
                min={minimumForOption}
                value={offerAmount}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val >= minimumForOption) setOfferAmount(e.target.value)
                }}
              />
            </div>
          </Field>
          {Number(offerAmount) > 0 && paymentOption === 'lump' && !lowIncomeCert && (
            <p className="mt-2 text-sm text-zinc-400">
              Initial 20% payment due with application: <span className="font-semibold text-white">${(Number(offerAmount) * 0.2).toLocaleString()}</span>
            </p>
          )}
          {lowIncomeCert && (
            <p className="mt-2 text-sm text-green-400">Low-income certification: Initial payment waived.</p>
          )}
        </div>
      </section>

      {/* ── Section 5: Low Income Certification ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={5} title="Low-Income Certification" />

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={lowIncomeCert} onChange={(e) => setLowIncomeCert(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">I certify that my income is at or below 250% of the Federal Poverty Level</span>
            <p className="mt-1 text-xs text-zinc-400">If eligible, the $205 application fee and initial payment are waived.</p>
          </div>
        </label>

        <button
          onClick={() => router.push('/form-656a')}
          className="mt-3 text-sm font-medium text-blue-400 underline decoration-blue-400/40 transition-colors hover:text-blue-300"
        >
          Complete Form 656-A (Income Certification)
        </button>
      </section>

      {/* ── Section 6: Terms & Conditions ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={6} title="Terms and Conditions" />

        <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 text-xs leading-relaxed text-zinc-400">
          <p className="mb-2">By submitting this offer, you agree to the following:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>You must timely file all tax returns and pay all taxes for the <span className="font-semibold text-zinc-200">5 years</span> following acceptance.</li>
            <li>The IRS will keep all payments and credits already applied to your account.</li>
            <li>The IRS will keep any refunds, including interest, due to you through the calendar year the offer is accepted.</li>
            <li>You waive and agree to the suspension of the statute of limitations for collection while this offer is pending.</li>
            <li>Failure to comply with any term may result in default and reinstatement of the original liability.</li>
          </ul>
        </div>

        <label className="mt-4 flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <span className="text-sm font-medium text-zinc-200">I have read and agree to the terms and conditions <RequiredBadge /></span>
        </label>
      </section>

      {/* ── Section 7: Signature ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading number={7} title="Signature" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Printed Name" required>
            <input className={inputClass} value={signatureName} onChange={(e) => setSignatureName(e.target.value)} placeholder="Type your full legal name" />
          </Field>
          <Field label="Date" required>
            <input className={inputClass} type="date" value={signatureDate} onChange={(e) => setSignatureDate(e.target.value)} />
          </Field>
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          Under penalties of perjury, I declare that I have examined this offer, including accompanying schedules and statements, and to the best of my knowledge and belief, it is true, correct, and complete.
        </p>
      </section>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGeneratePdf}
          disabled={generating}
          className="rounded-lg border border-zinc-600 bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate PDF'}
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting || !termsAccepted || !signatureName}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Offer'}
        </button>
      </div>
    </div>
  )
}
