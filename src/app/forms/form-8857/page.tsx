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
const textareaClass = inputClass + ' min-h-[100px] resize-y'

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function Form8857Page() {
  const { answers, caseId } = useWizard()

  // Requesting spouse
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')
  const [phone, setPhone] = useState(answers.phone ?? '')

  // Non-requesting spouse
  const [nrSpouseName, setNrSpouseName] = useState(answers.spouseName ?? '')
  const [nrSpouseSsn, setNrSpouseSsn] = useState(answers.spouseSsn ?? '')

  // Marriage info
  const [marriageDate, setMarriageDate] = useState('')
  const [separationDate, setSeparationDate] = useState('')
  const [isCurrentlyMarried, setIsCurrentlyMarried] = useState(true)

  // Tax years
  const currentYear = new Date().getFullYear()
  const availableYears = Array.from({ length: 10 }, (_, i) => String(currentYear - i))
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  function toggleYear(year: string) {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    )
  }

  // Relief type
  const [reliefType, setReliefType] = useState<'traditional' | 'separation' | 'equitable'>('traditional')

  // Knowledge questions
  const [knewAboutUnderstatement, setKnewAboutUnderstatement] = useState<'yes' | 'no' | 'partial'>('no')
  const [knewDetails, setKnewDetails] = useState('')

  // Economic hardship
  const [economicHardship, setEconomicHardship] = useState(false)
  const [hardshipDetails, setHardshipDetails] = useState('')

  // Abuse indicator
  const [abuseIndicator, setAbuseIndicator] = useState(false)
  const [abuseDetails, setAbuseDetails] = useState('')

  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-8857' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-8857-Innocent-Spouse.pdf'
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
        <h1 className="text-2xl font-bold text-white">Form 8857</h1>
        <p className="mt-1 text-sm text-zinc-400">Request for Innocent Spouse Relief &mdash; Seek relief from joint tax liability caused by your spouse or former spouse.</p>
      </div>

      {/* ── Requesting Spouse ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Requesting Spouse (Your Information)" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="SSN" required>
            <input className={inputClass} value={ssn} onChange={(e) => setSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
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
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </Field>
        </div>
      </section>

      {/* ── Non-Requesting Spouse ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Non-Requesting Spouse / Former Spouse" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" required>
            <input className={inputClass} value={nrSpouseName} onChange={(e) => setNrSpouseName(e.target.value)} />
          </Field>
          <Field label="SSN" required>
            <input className={inputClass} value={nrSpouseSsn} onChange={(e) => setNrSpouseSsn(e.target.value)} placeholder="XXX-XX-XXXX" />
          </Field>
        </div>
      </section>

      {/* ── Marriage Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Marriage Information" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date of Marriage" required>
            <input className={inputClass} type="date" value={marriageDate} onChange={(e) => setMarriageDate(e.target.value)} />
          </Field>

          <div>
            <label className="mb-3 flex cursor-pointer items-center gap-3">
              <input type="checkbox" checked={!isCurrentlyMarried} onChange={(e) => setIsCurrentlyMarried(!e.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
              <span className="text-sm font-medium text-zinc-300">Separated or Divorced</span>
            </label>

            {!isCurrentlyMarried && (
              <Field label="Date of Separation or Divorce">
                <input className={inputClass} type="date" value={separationDate} onChange={(e) => setSeparationDate(e.target.value)} />
              </Field>
            )}
          </div>
        </div>
      </section>

      {/* ── Tax Years ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Tax Years for Which You Are Requesting Relief" />
        <div className="flex flex-wrap gap-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedYears.includes(year)
                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* ── Type of Relief ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Type of Relief Requested" />

        <div className="space-y-3">
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${reliefType === 'traditional' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="reliefType" value="traditional" checked={reliefType === 'traditional'} onChange={() => setReliefType('traditional')} className="mt-0.5 h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
            <div>
              <span className="text-sm font-semibold text-white">Traditional Innocent Spouse Relief &mdash; Section 6015(b)</span>
              <p className="mt-0.5 text-xs text-zinc-400">There is an understatement of tax on your joint return due to erroneous items of your spouse. You did not know, and had no reason to know, about the understatement.</p>
            </div>
          </label>

          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${reliefType === 'separation' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="reliefType" value="separation" checked={reliefType === 'separation'} onChange={() => setReliefType('separation')} className="mt-0.5 h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
            <div>
              <span className="text-sm font-semibold text-white">Separation of Liability &mdash; Section 6015(c)</span>
              <p className="mt-0.5 text-xs text-zinc-400">You are no longer married to or are legally separated from the spouse with whom you filed the joint return. The understated tax is allocated between you and your former spouse.</p>
            </div>
          </label>

          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${reliefType === 'equitable' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="reliefType" value="equitable" checked={reliefType === 'equitable'} onChange={() => setReliefType('equitable')} className="mt-0.5 h-4 w-4 border-zinc-600 bg-zinc-800 text-blue-500" />
            <div>
              <span className="text-sm font-semibold text-white">Equitable Relief &mdash; Section 6015(f)</span>
              <p className="mt-0.5 text-xs text-zinc-400">Taking into account all the facts and circumstances, it would be unfair to hold you liable for the understated or unpaid tax. This applies to both understatements and underpayments.</p>
            </div>
          </label>
        </div>
      </section>

      {/* ── Knowledge Questions ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Knowledge of the Understatement" />

        <Field label="When you signed the joint return, did you know about the understatement of tax?" required>
          <div className="mt-2 flex gap-3">
            {(['no', 'yes', 'partial'] as const).map((val) => (
              <label key={val} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${knewAboutUnderstatement === val ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-zinc-700 text-zinc-400'}`}>
                <input type="radio" name="knowledge" value={val} checked={knewAboutUnderstatement === val} onChange={() => setKnewAboutUnderstatement(val)} className="sr-only" />
                {val === 'no' ? 'No' : val === 'yes' ? 'Yes' : 'Partially'}
              </label>
            ))}
          </div>
        </Field>

        {(knewAboutUnderstatement === 'yes' || knewAboutUnderstatement === 'partial') && (
          <div className="mt-4">
            <Field label="Please explain what you knew">
              <textarea className={textareaClass} value={knewDetails} onChange={(e) => setKnewDetails(e.target.value)} placeholder="Describe what you knew about the income, deductions, or credits that caused the understatement..." />
            </Field>
          </div>
        )}
      </section>

      {/* ── Economic Hardship ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Economic Hardship" />

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={economicHardship} onChange={(e) => setEconomicHardship(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">I am experiencing economic hardship</span>
            <p className="mt-0.5 text-xs text-zinc-400">Payment of the tax liability would prevent you from paying reasonable basic living expenses.</p>
          </div>
        </label>

        {economicHardship && (
          <div className="mt-3">
            <Field label="Describe your economic hardship">
              <textarea className={textareaClass} value={hardshipDetails} onChange={(e) => setHardshipDetails(e.target.value)} placeholder="Explain how paying this tax would affect your ability to pay for basic necessities like housing, food, medical care, transportation, and utilities." />
            </Field>
          </div>
        )}
      </section>

      {/* ── Abuse / Domestic Violence ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Abuse or Domestic Violence" />

        <div className="mb-4 rounded-lg border border-blue-600/20 bg-blue-600/5 p-3">
          <p className="text-xs text-blue-300">
            This information is handled with the utmost confidentiality. The IRS considers abuse as a factor in determining innocent spouse relief and will not share this information with your spouse or former spouse.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={abuseIndicator} onChange={(e) => setAbuseIndicator(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
          <div>
            <span className="text-sm font-medium text-zinc-200">I was a victim of spousal abuse or domestic violence</span>
            <p className="mt-0.5 text-xs text-zinc-400">This may have affected your ability to challenge items on the return or your willingness to question your spouse.</p>
          </div>
        </label>

        {abuseIndicator && (
          <div className="mt-3">
            <Field label="Please describe the situation (optional but helpful)">
              <textarea
                className={textareaClass}
                value={abuseDetails}
                onChange={(e) => setAbuseDetails(e.target.value)}
                placeholder="You may describe the nature and duration of abuse. This information helps the IRS understand the circumstances under which you signed the return. Share only what you are comfortable providing."
              />
            </Field>
            <div className="mt-2 rounded-lg bg-zinc-900/50 p-3">
              <p className="text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Resources:</span> National Domestic Violence Hotline: 1-800-799-7233 | TTY: 1-800-787-3224
              </p>
            </div>
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
