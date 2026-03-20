'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const FILING_STATUSES = ['Single', 'MFJ', 'MFS', 'HOH', 'QSS']
const TAX_FORMS = ['1040', '1120', '941', '940', '944', '1065']
const ASSESSMENT_TYPES = ['Self-assessed', 'IRS-assessed', 'Audit-assessed']

interface TaxYearEntry {
  id: string; taxYear: string; balance: string; taxForm: string; filingStatus: string
  assessmentDate: string; lastPaymentDate: string; isSfr: boolean; assessmentType: string
  showPenalties: boolean; totalPenalty: string; interest: string
  ftfPenalty: string; ftpPenalty: string; accuracyPenalty: string; estimatedTaxPenalty: string
}

const taxYears = Array.from({ length: 8 }, (_, i) => String(2025 - i))

const emptyEntry = (): TaxYearEntry => ({
  id: crypto.randomUUID(), taxYear: '', balance: '', taxForm: '1040', filingStatus: 'Single',
  assessmentDate: '', lastPaymentDate: '', isSfr: false, assessmentType: 'Self-assessed',
  showPenalties: false, totalPenalty: '', interest: '',
  ftfPenalty: '', ftpPenalty: '', accuracyPenalty: '', estimatedTaxPenalty: '',
})

function parseMoney(s: string): number {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? 0 : n
}
function formatCurrency(v: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v)
}

const inputClass = 'w-full rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-3 py-2.5 text-sm font-semibold text-[#0A1628] outline-none transition-all placeholder:font-normal placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:bg-white focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
const selectClass = inputClass + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2712%27%20height%3D%278%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201.5L6%206.5L11%201.5%27%20stroke%3D%27%238585A0%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[right_12px_center] bg-no-repeat pr-8'
const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#94A3B8] mb-1.5'

export default function CaseInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [entries, setEntries] = useState<TaxYearEntry[]>(() => {
    const saved = answers.taxDebts as TaxYearEntry[] | undefined
    return saved && saved.length > 0 ? saved : [emptyEntry()]
  })

  function updateEntry(index: number, field: keyof TaxYearEntry, value: string | boolean) {
    setEntries((prev) => {
      const arr = [...prev]
      arr[index] = { ...arr[index], [field]: value }
      return arr
    })
  }

  function addEntry() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  const totalDebt = entries.reduce((sum, e) => sum + parseMoney(e.balance), 0)
  const yearCount = entries.filter((e) => e.taxYear).length

  function handleNext() {
    setAnswers({ taxDebts: entries })
    router.push('/analysis/case-review')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[40%] rounded-full bg-[#00A651]" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 3 of 6</span>
            <span className="text-xs font-semibold text-[#2563EB]">Tax Debt Inventory</span>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          {/* Heading */}
          <div className="mb-1.5">
            <h1 className="text-[1.3rem] font-extrabold leading-tight text-[#0A1628]">Tell us about your tax debt</h1>
            <p className="mt-1 text-[13px] text-[#94A3B8]">Add each tax year you owe</p>
          </div>

          {/* Pre-populated banner */}
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF4FF] px-3.5 py-2.5 text-[13px] text-[#0A1628]">
            <i className="fa-solid fa-sparkles" />
            <span>Pre-populated from your IRS transcript. Verify and adjust if needed.</span>
          </div>

          {/* Year Cards */}
          {entries.map((entry, idx) => (
            <div key={entry.id} className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-[18px]">
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4FF] px-3 py-1 text-xs font-bold text-[#2563EB]">
                  <i className="fa-solid fa-calendar text-[10px]" />
                  {entry.taxYear || 'New Year'}
                </span>
                <span className="text-[11px] text-[#94A3B8]">Income Tax</span>
              </div>

              {/* Year + Balance */}
              <div className="mb-3 flex gap-2.5">
                <div className="flex-1">
                  <div className={labelClass}>Tax Year</div>
                  <select className={selectClass} value={entry.taxYear} onChange={(e) => updateEntry(idx, 'taxYear', e.target.value)}>
                    <option value="">Select</option>
                    {taxYears.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <div className={labelClass}>Balance Owed</div>
                  <input type="text" className={inputClass} value={entry.balance} onChange={(e) => updateEntry(idx, 'balance', e.target.value)} placeholder="$0" />
                </div>
              </div>

              {/* Form + Filing */}
              <div className="mb-3 flex gap-2.5">
                <div className="flex-1">
                  <div className={labelClass}>Tax Form Type</div>
                  <select className={selectClass} value={entry.taxForm} onChange={(e) => updateEntry(idx, 'taxForm', e.target.value)}>
                    {TAX_FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <div className={labelClass}>Filing Status</div>
                  <select className={selectClass} value={entry.filingStatus} onChange={(e) => updateEntry(idx, 'filingStatus', e.target.value)}>
                    {FILING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Assessment Date */}
              <div className="mb-3">
                <div className={labelClass}>Original Assessment Date (TC 150)</div>
                <input type="date" className={inputClass} value={entry.assessmentDate} onChange={(e) => updateEntry(idx, 'assessmentDate', e.target.value)} />
              </div>

              {/* Last Payment */}
              <div className="mb-3">
                <div className={labelClass}>Date of Last Payment</div>
                <input type="date" className={inputClass} value={entry.lastPaymentDate} onChange={(e) => updateEntry(idx, 'lastPaymentDate', e.target.value)} />
              </div>

              {/* SFR Toggle */}
              <label className="mb-2.5 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={entry.isSfr}
                  onChange={(e) => updateEntry(idx, 'isSfr', e.target.checked)}
                  className="h-[20px] w-[36px] cursor-pointer appearance-none rounded-[10px] bg-[#E2E8F0] transition-colors checked:bg-[#2563EB] relative after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform checked:after:translate-x-4"
                />
                <span className="text-xs font-medium text-[#64748B]">Substitute for Return (SFR / IRS-prepared)?</span>
              </label>

              {/* Assessment Type */}
              <div className="mb-2.5">
                <div className={labelClass}>Assessment Type</div>
                <div className="flex flex-wrap gap-1.5">
                  {ASSESSMENT_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => updateEntry(idx, 'assessmentType', type)}
                      className={`rounded-lg border-[1.5px] px-2.5 py-1.5 text-[11px] font-semibold transition-all ${
                        entry.assessmentType === type
                          ? 'border-[#2563EB] bg-[#EFF4FF] text-[#2563EB]'
                          : 'border-[#F1F5F9] bg-[#F8FAFC] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Penalty Toggle */}
              <button
                onClick={() => updateEntry(idx, 'showPenalties', !entry.showPenalties)}
                className="flex items-center gap-1 text-[11.5px] font-semibold text-[#2563EB]"
              >
                <i className={`fa-solid ${entry.showPenalties ? 'fa-minus' : 'fa-plus'} text-[9px]`} />
                {entry.showPenalties ? 'Hide penalty & interest' : 'Penalty & interest breakdown'}
              </button>
              {entry.showPenalties && (
                <div className="mt-2.5 space-y-2.5">
                  <div className="flex gap-2.5">
                    <div className="flex-1">
                      <div className={labelClass}>Total Penalty</div>
                      <input type="text" className={inputClass} value={entry.totalPenalty} onChange={(e) => updateEntry(idx, 'totalPenalty', e.target.value)} placeholder="$0" />
                    </div>
                    <div className="flex-1">
                      <div className={labelClass}>Interest</div>
                      <input type="text" className={inputClass} value={entry.interest} onChange={(e) => updateEntry(idx, 'interest', e.target.value)} placeholder="$0" />
                    </div>
                  </div>
                  <div className="text-[10.5px] font-bold uppercase tracking-[0.04em] text-[#94A3B8]">Penalty Breakdown</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className={labelClass}>FTF (Failure to File)</div>
                      <input type="text" className={inputClass} value={entry.ftfPenalty} onChange={(e) => updateEntry(idx, 'ftfPenalty', e.target.value)} placeholder="$0" />
                    </div>
                    <div>
                      <div className={labelClass}>FTP (Failure to Pay)</div>
                      <input type="text" className={inputClass} value={entry.ftpPenalty} onChange={(e) => updateEntry(idx, 'ftpPenalty', e.target.value)} placeholder="$0" />
                    </div>
                    <div>
                      <div className={labelClass}>Accuracy-Related</div>
                      <input type="text" className={inputClass} value={entry.accuracyPenalty} onChange={(e) => updateEntry(idx, 'accuracyPenalty', e.target.value)} placeholder="$0" />
                    </div>
                    <div>
                      <div className={labelClass}>Estimated Tax</div>
                      <input type="text" className={inputClass} value={entry.estimatedTaxPenalty} onChange={(e) => updateEntry(idx, 'estimatedTaxPenalty', e.target.value)} placeholder="$0" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Year */}
          <button
            onClick={addEntry}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-[#F1F5F9] py-4 text-[13px] font-semibold text-[#64748B] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB]"
          >
            <i className="fa-solid fa-plus" />
            Add another tax year
          </button>

          {/* Summary Bar */}
          {totalDebt > 0 && (
            <div className="mb-4 flex items-center justify-between rounded-[14px] bg-[#0A1628] px-[18px] py-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-white/50">Total Debt</span>
                <div className="mt-0.5 text-[1.35rem] font-black tracking-tight text-white">{formatCurrency(totalDebt)}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-white/50">across</span>
                <div className="text-[1.1rem] font-extrabold text-white">{yearCount} year{yearCount !== 1 ? 's' : ''}</div>
              </div>
            </div>
          )}

          {/* Continue */}
          <button
            onClick={handleNext}
            className="w-full rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Continue <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
