'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

type EmploymentStatus = 'Employed' | 'Self-Employed' | 'Unemployed' | 'Retired'
type PayFrequency = 'Weekly' | 'Biweekly' | 'SemiMonthly' | 'Monthly'

interface Employer {
  id: string
  employerName: string
  street: string
  city: string
  state: string
  zip: string
  occupation: string
  howLong: string
  payFrequency: PayFrequency
}

interface SelfEmployment {
  businessName: string
  businessType: string
  ein: string
}

interface EmploymentData {
  status: EmploymentStatus | ''
  employers: Employer[]
  selfEmployment: SelfEmployment
  spouseStatus: EmploymentStatus | ''
  spouseEmployers: Employer[]
  spouseSelfEmployment: SelfEmployment
}

const emptyEmployer = (): Employer => ({
  id: crypto.randomUUID(),
  employerName: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  occupation: '',
  howLong: '',
  payFrequency: 'Biweekly',
})

const emptySelfEmployment: SelfEmployment = {
  businessName: '',
  businessType: '',
  ein: '',
}

const initialData: EmploymentData = {
  status: '',
  employers: [emptyEmployer()],
  selfEmployment: { ...emptySelfEmployment },
  spouseStatus: '',
  spouseEmployers: [emptyEmployer()],
  spouseSelfEmployment: { ...emptySelfEmployment },
}

const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'
const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'
const pillClass = (active: boolean) =>
  `flex-1 rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all cursor-pointer ${
    active
      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
  }`

const PAY_FREQUENCIES: PayFrequency[] = ['Weekly', 'Biweekly', 'SemiMonthly', 'Monthly']
const STATUSES: EmploymentStatus[] = ['Employed', 'Self-Employed', 'Unemployed', 'Retired']

function EmployerForm({
  employer,
  index,
  onChange,
  onRemove,
  canRemove,
  idPrefix,
}: {
  employer: Employer
  index: number
  onChange: (updated: Employer) => void
  onRemove: () => void
  canRemove: boolean
  idPrefix: string
}) {
  function update(field: keyof Employer, value: string) {
    onChange({ ...employer, [field]: value })
  }

  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-300">
          {index === 0 ? 'Primary Employer' : `Employer ${index + 1}`}
        </h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-400 transition-colors hover:text-red-300"
          >
            Remove
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-name-${index}`} className={labelClass}>Employer Name *</label>
            <input
              id={`${idPrefix}-name-${index}`}
              type="text"
              value={employer.employerName}
              onChange={(e) => update('employerName', e.target.value)}
              placeholder="Acme Corporation"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-occ-${index}`} className={labelClass}>Occupation *</label>
            <input
              id={`${idPrefix}-occ-${index}`}
              type="text"
              value={employer.occupation}
              onChange={(e) => update('occupation', e.target.value)}
              placeholder="Software Engineer"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-street-${index}`} className={labelClass}>Employer Address</label>
          <input
            id={`${idPrefix}-street-${index}`}
            type="text"
            value={employer.street}
            onChange={(e) => update('street', e.target.value)}
            placeholder="100 Corporate Blvd, Suite 200"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <label htmlFor={`${idPrefix}-city-${index}`} className={labelClass}>City</label>
            <input
              id={`${idPrefix}-city-${index}`}
              type="text"
              value={employer.city}
              onChange={(e) => update('city', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-state-${index}`} className={labelClass}>State</label>
            <input
              id={`${idPrefix}-state-${index}`}
              type="text"
              maxLength={2}
              value={employer.state}
              onChange={(e) => update('state', e.target.value.toUpperCase())}
              placeholder="TX"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-zip-${index}`} className={labelClass}>ZIP</label>
            <input
              id={`${idPrefix}-zip-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={employer.zip}
              onChange={(e) => update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-long-${index}`} className={labelClass}>How Long</label>
            <input
              id={`${idPrefix}-long-${index}`}
              type="text"
              value={employer.howLong}
              onChange={(e) => update('howLong', e.target.value)}
              placeholder="3 years"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Pay Frequency *</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PAY_FREQUENCIES.map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => update('payFrequency', freq)}
                className={pillClass(employer.payFrequency === freq)}
              >
                {freq === 'SemiMonthly' ? 'Semi-Monthly' : freq}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SelfEmploymentForm({
  data,
  onChange,
  idPrefix,
}: {
  data: SelfEmployment
  onChange: (updated: SelfEmployment) => void
  idPrefix: string
}) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5">
      <h4 className="mb-4 text-sm font-semibold text-zinc-300">Self-Employment Details</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor={`${idPrefix}-bizname`} className={labelClass}>Business Name *</label>
          <input
            id={`${idPrefix}-bizname`}
            type="text"
            value={data.businessName}
            onChange={(e) => onChange({ ...data, businessName: e.target.value })}
            placeholder="Doe Consulting LLC"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-biztype`} className={labelClass}>Business Type *</label>
          <input
            id={`${idPrefix}-biztype`}
            type="text"
            value={data.businessType}
            onChange={(e) => onChange({ ...data, businessType: e.target.value })}
            placeholder="LLC, Sole Prop, etc."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-ein`} className={labelClass}>EIN</label>
          <input
            id={`${idPrefix}-ein`}
            type="text"
            value={data.ein}
            onChange={(e) => onChange({ ...data, ein: e.target.value })}
            placeholder="XX-XXXXXXX"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}

export default function EmploymentPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const isMarried = answers.filingStatus === 'MFJ' || answers.filingStatus === 'MFS'

  const [form, setForm] = useState<EmploymentData>(() => ({
    ...initialData,
    ...(answers.employment ?? {}),
  }))

  function updateEmployer(list: 'employers' | 'spouseEmployers', index: number, updated: Employer) {
    setForm((prev) => {
      const arr = [...prev[list]]
      arr[index] = updated
      return { ...prev, [list]: arr }
    })
  }

  function removeEmployer(list: 'employers' | 'spouseEmployers', index: number) {
    setForm((prev) => ({
      ...prev,
      [list]: prev[list].filter((_, i) => i !== index),
    }))
  }

  function addEmployer(list: 'employers' | 'spouseEmployers') {
    setForm((prev) => ({
      ...prev,
      [list]: [...prev[list], emptyEmployer()],
    }))
  }

  const isValid =
    form.status !== '' &&
    (form.status === 'Unemployed' ||
      form.status === 'Retired' ||
      (form.status === 'Employed' && form.employers[0]?.employerName.trim() !== '') ||
      (form.status === 'Self-Employed' && form.selfEmployment.businessName.trim() !== ''))

  function handleNext() {
    setAnswers({ employment: form })
    router.push('/analysis/household')
  }

  return (
    <FormScreen
      title="Employment Information"
      description="Tell us about your current employment. This information is required for IRS Form 433-A, Section 2."
      onNext={handleNext}
      onBack={() => router.push('/analysis/personal-info')}
      isValid={isValid}
    >
      {/* Taxpayer Employment Status */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Your Employment Status</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, status }))}
              className={pillClass(form.status === status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Employed - Employer Details */}
      {form.status === 'Employed' && (
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-white">Employer Details</h3>
          <div className="space-y-4">
            {form.employers.map((employer, i) => (
              <EmployerForm
                key={employer.id}
                employer={employer}
                index={i}
                onChange={(updated) => updateEmployer('employers', i, updated)}
                onRemove={() => removeEmployer('employers', i)}
                canRemove={form.employers.length > 1}
                idPrefix="tp"
              />
            ))}
            <button
              type="button"
              onClick={() => addEmployer('employers')}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-3 text-sm font-medium text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" /><path d="M5 12h14" />
              </svg>
              Add Another Employer
            </button>
          </div>
        </div>
      )}

      {/* Self-Employed Details */}
      {form.status === 'Self-Employed' && (
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-white">Self-Employment Details</h3>
          <SelfEmploymentForm
            data={form.selfEmployment}
            onChange={(updated) => setForm((prev) => ({ ...prev, selfEmployment: updated }))}
            idPrefix="tp-se"
          />
        </div>
      )}

      {/* Spouse Employment (conditional) */}
      {isMarried && (
        <>
          <div className={cardClass}>
            <h3 className="mb-4 text-lg font-semibold text-white">Spouse Employment Status</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, spouseStatus: status }))}
                  className={pillClass(form.spouseStatus === status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {form.spouseStatus === 'Employed' && (
            <div className={cardClass}>
              <h3 className="mb-4 text-lg font-semibold text-white">Spouse Employer Details</h3>
              <div className="space-y-4">
                {form.spouseEmployers.map((employer, i) => (
                  <EmployerForm
                    key={employer.id}
                    employer={employer}
                    index={i}
                    onChange={(updated) => updateEmployer('spouseEmployers', i, updated)}
                    onRemove={() => removeEmployer('spouseEmployers', i)}
                    canRemove={form.spouseEmployers.length > 1}
                    idPrefix="sp"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addEmployer('spouseEmployers')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 py-3 text-sm font-medium text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" /><path d="M5 12h14" />
                  </svg>
                  Add Another Employer
                </button>
              </div>
            </div>
          )}

          {form.spouseStatus === 'Self-Employed' && (
            <div className={cardClass}>
              <h3 className="mb-4 text-lg font-semibold text-white">Spouse Self-Employment Details</h3>
              <SelfEmploymentForm
                data={form.spouseSelfEmployment}
                onChange={(updated) => setForm((prev) => ({ ...prev, spouseSelfEmployment: updated }))}
                idPrefix="sp-se"
              />
            </div>
          )}
        </>
      )}
    </FormScreen>
  )
}
