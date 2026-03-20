'use client'

import { useState, useMemo } from 'react'
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

export default function Form12153Page() {
  const { answers, caseId } = useWizard()

  // Taxpayer info
  const [name, setName] = useState(answers.taxpayerName ?? '')
  const [ssn, setSsn] = useState(answers.ssn ?? '')
  const [address, setAddress] = useState(answers.address ?? '')
  const [city, setCity] = useState(answers.city ?? '')
  const [state, setState] = useState(answers.state ?? '')
  const [zip, setZip] = useState(answers.zip ?? '')
  const [phone, setPhone] = useState(answers.phone ?? '')

  // Tax periods
  const currentYear = new Date().getFullYear()
  const availableYears = Array.from({ length: 10 }, (_, i) => String(currentYear - i))
  const [selectedYears, setSelectedYears] = useState<string[]>(() => {
    if (answers.taxDebts && Array.isArray(answers.taxDebts)) {
      return answers.taxDebts.map((d: { taxYear: number }) => String(d.taxYear))
    }
    return []
  })

  function toggleYear(year: string) {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    )
  }

  // Tax type
  const [taxType, setTaxType] = useState<'income' | 'employment' | 'excise'>('income')

  // Notice info
  const [noticeType, setNoticeType] = useState('CP90')
  const [noticeDate, setNoticeDate] = useState('')

  // 30-day countdown
  const daysRemaining = useMemo(() => {
    if (!noticeDate) return null
    const notice = new Date(noticeDate)
    const deadline = new Date(notice)
    deadline.setDate(deadline.getDate() + 30)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }, [noticeDate])

  const isPast30 = daysRemaining !== null && daysRemaining <= 0

  // Hearing type
  const [hearingType, setHearingType] = useState<'CDP' | 'Equivalent'>(() => {
    return isPast30 ? 'Equivalent' : 'CDP'
  })

  // Auto-detect hearing type when notice date changes
  useMemo(() => {
    if (isPast30) setHearingType('Equivalent')
  }, [isPast30])

  // Issues to raise
  const [issues, setIssues] = useState({
    installmentAgreement: false,
    offerInCompromise: false,
    cnc: false,
    penaltyAbatement: false,
    innocentSpouse: false,
    lienDischarge: false,
  })

  function toggleIssue(key: keyof typeof issues) {
    setIssues((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Additional info
  const [additionalInfo, setAdditionalInfo] = useState('')

  const [generating, setGenerating] = useState(false)

  async function handleGeneratePdf() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, formType: 'form-12153' }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Form-12153-CDP-Hearing.pdf'
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
        <h1 className="text-2xl font-bold text-white">Form 12153</h1>
        <p className="mt-1 text-sm text-zinc-400">Request for a Collection Due Process (CDP) or Equivalent Hearing &mdash; Exercise your right to dispute IRS collection actions.</p>
      </div>

      {/* ── Taxpayer Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Taxpayer Information" />
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
          <Field label="Phone" required>
            <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
          </Field>
        </div>
      </section>

      {/* ── Tax Periods ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Tax Periods Affected" />

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

        <div className="mt-4">
          <Field label="Tax Type" required>
            <div className="flex gap-3">
              {(['income', 'employment', 'excise'] as const).map((t) => (
                <label key={t} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${taxType === t ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-zinc-700 text-zinc-400'}`}>
                  <input type="radio" name="taxType" value={t} checked={taxType === t} onChange={() => setTaxType(t)} className="sr-only" />
                  {t.charAt(0).toUpperCase() + t.slice(1)} Tax
                </label>
              ))}
            </div>
          </Field>
        </div>
      </section>

      {/* ── Notice Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Notice Information" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Notice Type" required>
            <select className={selectClass} value={noticeType} onChange={(e) => setNoticeType(e.target.value)}>
              <option value="CP90">CP90 — Final Notice of Intent to Levy</option>
              <option value="LT11">LT11 — Final Notice of Intent to Levy</option>
              <option value="Letter1058">Letter 1058 — Final Notice</option>
              <option value="Letter3172">Letter 3172 — Notice of Federal Tax Lien Filing</option>
            </select>
          </Field>
          <Field label="Date on Notice" required>
            <input className={inputClass} type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} />
          </Field>
        </div>

        {/* 30-Day Countdown */}
        {daysRemaining !== null && (
          <div className={`mt-4 rounded-lg border p-4 ${daysRemaining > 7 ? 'border-green-600/30 bg-green-600/10' : daysRemaining > 0 ? 'border-amber-600/30 bg-amber-600/10' : 'border-red-600/30 bg-red-600/10'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-semibold ${daysRemaining > 7 ? 'text-green-400' : daysRemaining > 0 ? 'text-amber-400' : 'text-red-400'}`}>
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'CDP deadline has passed'}
                </p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  {daysRemaining > 0
                    ? 'You must request a CDP hearing within 30 days of the notice date.'
                    : 'You may still request an Equivalent Hearing within 1 year.'}
                </p>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${daysRemaining > 7 ? 'bg-green-600/20 text-green-400' : daysRemaining > 0 ? 'bg-amber-600/20 text-amber-400' : 'bg-red-600/20 text-red-400'}`}>
                {daysRemaining > 0 ? daysRemaining : 0}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Hearing Type ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Hearing Type" />

        {isPast30 && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-600/30 bg-amber-600/10 p-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-amber-400">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs text-amber-300">The 30-day CDP deadline has passed. Your request has been automatically set to Equivalent Hearing. An Equivalent Hearing does not provide the right to judicial review in Tax Court.</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${hearingType === 'CDP' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'} ${isPast30 ? 'pointer-events-none opacity-40' : ''}`}>
            <input type="radio" name="hearingType" value="CDP" checked={hearingType === 'CDP'} onChange={() => setHearingType('CDP')} disabled={isPast30} className="sr-only" />
            <span className="text-sm font-semibold text-white">CDP Hearing</span>
            <span className="mt-1 text-xs text-zinc-400">Within 30 days of notice. Provides right to judicial review in Tax Court if you disagree with the outcome.</span>
          </label>

          <label className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${hearingType === 'Equivalent' ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-500'}`}>
            <input type="radio" name="hearingType" value="Equivalent" checked={hearingType === 'Equivalent'} onChange={() => setHearingType('Equivalent')} className="sr-only" />
            <span className="text-sm font-semibold text-white">Equivalent Hearing</span>
            <span className="mt-1 text-xs text-zinc-400">After 30 days but within 1 year. No Tax Court review, but IRS will consider collection alternatives.</span>
          </label>
        </div>
      </section>

      {/* ── Issues to Raise ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Issues You Want to Raise at the Hearing" />

        <div className="grid gap-3 sm:grid-cols-2">
          {([
            { key: 'installmentAgreement' as const, label: 'Installment Agreement', desc: 'Request a payment plan' },
            { key: 'offerInCompromise' as const, label: 'Offer in Compromise', desc: 'Settle for less than owed' },
            { key: 'cnc' as const, label: 'Currently Not Collectible', desc: 'Hardship — cannot pay' },
            { key: 'penaltyAbatement' as const, label: 'Penalty Abatement', desc: 'Request penalty removal' },
            { key: 'innocentSpouse' as const, label: 'Innocent Spouse Relief', desc: 'Not responsible for spouse debt' },
            { key: 'lienDischarge' as const, label: 'Lien Discharge / Withdrawal', desc: 'Remove or release lien' },
          ]).map(({ key, label, desc }) => (
            <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${issues[key] ? 'border-blue-500/50 bg-blue-500/5' : 'border-zinc-700 hover:border-zinc-500'}`}>
              <input type="checkbox" checked={issues[key]} onChange={() => toggleIssue(key)} className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500" />
              <div>
                <span className="text-sm font-medium text-zinc-200">{label}</span>
                <p className="text-xs text-zinc-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ── Additional Information ── */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <SectionHeading title="Additional Information" />
        <Field label="Provide any additional details for your hearing request">
          <textarea className={textareaClass} value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Explain why you disagree with the collection action, any alternatives you want to propose, or other relevant facts..." />
        </Field>
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
