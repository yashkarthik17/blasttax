'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]

type PayFrequency = 'Weekly' | 'Bi-weekly' | 'Semi-monthly' | 'Monthly'

interface EmploymentData {
  employerName: string; employerStreet: string; employerCity: string; employerState: string; employerZip: string
  employerPhone: string; yearsEmployed: string; monthsEmployed: string; payFrequency: PayFrequency; occupation: string
  spouseEmployed: boolean; spouseEmployerName: string; spouseEmployerAddress: string; spouseEmployerPhone: string
  spouseHowLong: string; spousePayFrequency: string; spouseOccupation: string
  selfEmployed: boolean; businessName: string; businessType: string; ein: string; numEmployees: string; howLongInBusiness: string
}

const initial: EmploymentData = {
  employerName: '', employerStreet: '', employerCity: '', employerState: '', employerZip: '',
  employerPhone: '', yearsEmployed: '', monthsEmployed: '', payFrequency: 'Bi-weekly', occupation: '',
  spouseEmployed: false, spouseEmployerName: '', spouseEmployerAddress: '', spouseEmployerPhone: '',
  spouseHowLong: '', spousePayFrequency: '', spouseOccupation: '',
  selfEmployed: false, businessName: '', businessType: '', ein: '', numEmployees: '', howLongInBusiness: '',
}

const inputClass = 'w-full rounded-xl border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-3.5 py-3 text-[0.85rem] font-semibold text-[#0A1628] outline-none transition-all placeholder:font-normal placeholder:text-[#CBD5E1] focus:border-[#0A1628] focus:bg-white focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
const labelClass = 'mb-1.5 block text-[0.72rem] font-semibold text-[#64748B]'
const selectClass = inputClass + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2712%27%20height%3D%278%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201.5L6%206.5L11%201.5%27%20stroke%3D%27%238585A0%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[right_12px_center] bg-no-repeat pr-8'
const PAY_FREQS: PayFrequency[] = ['Weekly', 'Bi-weekly', 'Semi-monthly', 'Monthly']

export default function EmploymentPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<EmploymentData>(() => ({
    ...initial,
    ...(answers.employment ?? {}),
  }))

  function update<K extends keyof EmploymentData>(field: K, value: EmploymentData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ employment: form })
    router.push('/analysis/household')
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
            <span className="text-xs font-semibold text-[#2563EB]">Employment Info</span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-5 pt-3.5">
          {/* Heading */}
          <div>
            <h1 className="text-[1.3rem] font-extrabold leading-tight tracking-[-0.01em] text-[#0A1628]">
              Employment details
            </h1>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-[#94A3B8]">
              Required for Form 9465, Form 433-A, and other IRS forms
            </p>
          </div>

          {/* Your Employment */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#EFF4FF]">
                <i className="fa-solid fa-user text-[9px] text-[#2563EB]" />
              </div>
              Your Employment
            </div>

            <div className="rounded-[16px] border border-[#F3F4F6] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="mb-3">
                <div className={labelClass}>Current Employer Name</div>
                <input type="text" className={inputClass} value={form.employerName} onChange={(e) => update('employerName', e.target.value)} placeholder="Employer name" />
              </div>
              <div className="mb-3">
                <div className={labelClass}>Employer Address</div>
                <input type="text" className={inputClass} value={form.employerStreet} onChange={(e) => update('employerStreet', e.target.value)} placeholder="Street address" />
              </div>
              <div className="mb-3 flex gap-2.5">
                <div className="flex-[2]">
                  <div className={labelClass}>City</div>
                  <input type="text" className={inputClass} value={form.employerCity} onChange={(e) => update('employerCity', e.target.value)} placeholder="City" />
                </div>
                <div className="w-[70px]">
                  <div className={labelClass}>State</div>
                  <select className={selectClass} value={form.employerState} onChange={(e) => update('employerState', e.target.value)}>
                    <option value="">--</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="w-[90px]">
                  <div className={labelClass}>ZIP</div>
                  <input type="text" className={inputClass} value={form.employerZip} onChange={(e) => update('employerZip', e.target.value)} maxLength={10} placeholder="ZIP" />
                </div>
              </div>
              <div className="mb-3">
                <div className={labelClass}>Employer Phone Number</div>
                <input type="tel" className={inputClass} value={form.employerPhone} onChange={(e) => update('employerPhone', e.target.value)} placeholder="(000) 000-0000" />
              </div>
              <div className="mb-3">
                <div className={labelClass}>How Long Employed</div>
                <div className="flex items-center gap-1.5">
                  <input type="number" className={inputClass + ' w-[60px] text-center'} value={form.yearsEmployed} onChange={(e) => update('yearsEmployed', e.target.value)} placeholder="0" />
                  <span className="text-[0.72rem] text-[#94A3B8]">yrs</span>
                  <input type="number" className={inputClass + ' w-[60px] text-center'} value={form.monthsEmployed} onChange={(e) => update('monthsEmployed', e.target.value)} placeholder="0" />
                  <span className="text-[0.72rem] text-[#94A3B8]">mos</span>
                </div>
              </div>
              <div className="mb-3">
                <div className={labelClass}>Pay Frequency</div>
                <div className="flex flex-wrap gap-1.5">
                  {PAY_FREQS.map((freq) => (
                    <button
                      key={freq}
                      onClick={() => update('payFrequency', freq)}
                      className={`rounded-[10px] border-[1.5px] px-3.5 py-2 text-[0.78rem] font-semibold transition-all ${
                        form.payFrequency === freq
                          ? 'border-[#0A1628] bg-[#EBF0FF] text-[#0A1628]'
                          : 'border-[#F1F5F9] bg-[#F8FAFC] text-[#64748B] hover:border-[#0A1628] hover:text-[#0A1628]'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className={labelClass}>Occupation</div>
                <input type="text" className={inputClass} value={form.occupation} onChange={(e) => update('occupation', e.target.value)} placeholder="Your occupation / job title" />
              </div>
            </div>
          </div>

          {/* Spouse Employment Toggle */}
          <div className="rounded-[14px] border border-[#F3F4F6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Spouse is employed?</div>
                <div className="text-[0.68rem] text-[#94A3B8]">If filing jointly (MFJ)</div>
              </div>
              <button
                onClick={() => update('spouseEmployed', !form.spouseEmployed)}
                className={`relative h-[22px] w-[40px] rounded-full transition-colors ${form.spouseEmployed ? 'bg-[#0A1628]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${form.spouseEmployed ? 'left-[20px]' : 'left-[2px]'}`} />
              </button>
            </div>
            {form.spouseEmployed && (
              <div className="mt-3.5">
                <div className="mb-3 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#7C3AED]">
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#F5F0FF]">
                    <i className="fa-solid fa-user-group text-[9px] text-[#7C3AED]" />
                  </div>
                  Spouse Employment
                </div>
                <div className="rounded-[16px] border border-[#F3F4F6] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <div className="mb-3">
                    <div className={labelClass}>Spouse&apos;s Employer Name</div>
                    <input type="text" className={inputClass} value={form.spouseEmployerName} onChange={(e) => update('spouseEmployerName', e.target.value)} placeholder="Employer name" />
                  </div>
                  <div className="mb-3">
                    <div className={labelClass}>Employer Address</div>
                    <input type="text" className={inputClass} value={form.spouseEmployerAddress} onChange={(e) => update('spouseEmployerAddress', e.target.value)} placeholder="Street, City, State, ZIP" />
                  </div>
                  <div className="mb-3 flex gap-2.5">
                    <div className="flex-1">
                      <div className={labelClass}>Employer Phone</div>
                      <input type="tel" className={inputClass} value={form.spouseEmployerPhone} onChange={(e) => update('spouseEmployerPhone', e.target.value)} placeholder="(000) 000-0000" />
                    </div>
                    <div className="flex-1">
                      <div className={labelClass}>How Long Employed</div>
                      <input type="text" className={inputClass} value={form.spouseHowLong} onChange={(e) => update('spouseHowLong', e.target.value)} placeholder="e.g., 2 years" />
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="flex-1">
                      <div className={labelClass}>Pay Frequency</div>
                      <select className={selectClass} value={form.spousePayFrequency} onChange={(e) => update('spousePayFrequency', e.target.value)}>
                        <option value="">Select...</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="semimonthly">Semi-monthly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <div className={labelClass}>Occupation</div>
                      <input type="text" className={inputClass} value={form.spouseOccupation} onChange={(e) => update('spouseOccupation', e.target.value)} placeholder="Job title" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Self-Employment Toggle */}
          <div className="rounded-[14px] border border-[#F3F4F6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Self-employed?</div>
                <div className="text-[0.68rem] text-[#94A3B8]">Business or freelance income</div>
              </div>
              <button
                onClick={() => update('selfEmployed', !form.selfEmployed)}
                className={`relative h-[22px] w-[40px] rounded-full transition-colors ${form.selfEmployed ? 'bg-[#0A1628]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${form.selfEmployed ? 'left-[20px]' : 'left-[2px]'}`} />
              </button>
            </div>
            {form.selfEmployed && (
              <div className="mt-3.5">
                <div className="mb-3 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#D97706]">
                  <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-[#FEF3C7]">
                    <i className="fa-solid fa-store text-[9px] text-[#D97706]" />
                  </div>
                  Self-Employment
                </div>
                <div className="rounded-[16px] border border-[#F3F4F6] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  <div className="mb-3">
                    <div className={labelClass}>Business Name</div>
                    <input type="text" className={inputClass} value={form.businessName} onChange={(e) => update('businessName', e.target.value)} placeholder="Your business name" />
                  </div>
                  <div className="mb-3 flex gap-2.5">
                    <div className="flex-1">
                      <div className={labelClass}>Business Type</div>
                      <select className={selectClass} value={form.businessType} onChange={(e) => update('businessType', e.target.value)}>
                        <option value="">Select...</option>
                        <option value="sole">Sole Proprietorship</option>
                        <option value="llc-single">LLC (Single Member)</option>
                        <option value="llc-multi">LLC (Multi Member)</option>
                        <option value="scorp">S-Corporation</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <div className={labelClass}>EIN</div>
                      <input type="text" className={inputClass} value={form.ein} onChange={(e) => update('ein', e.target.value)} placeholder="XX-XXXXXXX" maxLength={10} />
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="flex-1">
                      <div className={labelClass}>Number of Employees</div>
                      <input type="number" className={inputClass} value={form.numEmployees} onChange={(e) => update('numEmployees', e.target.value)} placeholder="0" min={0} />
                    </div>
                    <div className="flex-1">
                      <div className={labelClass}>How Long in Business</div>
                      <input type="text" className={inputClass} value={form.howLongInBusiness} onChange={(e) => update('howLongInBusiness', e.target.value)} placeholder="e.g., 5 years" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2.5 rounded-[14px] border border-[rgba(245,166,35,0.15)] bg-[#FFFBEB] px-3.5 py-3">
            <i className="fa-solid fa-info-circle mt-0.5 shrink-0 text-xs text-[#D97706]" />
            <div className="text-[0.72rem] leading-relaxed text-[#92400E]">
              <strong>Required for Form 9465, Form 433-A, and Form 433-F.</strong> The IRS will return forms without employment information. Self-employment details are also needed for Form 433-B if applicable.
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={handleNext}
              className="w-full rounded-full bg-[#00A651] py-4 text-[0.88rem] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Continue <i className="fa-solid fa-arrow-right ml-1.5 text-xs" />
            </button>
            <button
              onClick={() => router.push('/analysis/personal-info')}
              className="py-3 text-center text-[0.82rem] font-semibold text-[#94A3B8] transition-colors hover:text-[#64748B]"
            >
              <i className="fa-solid fa-arrow-left mr-1.5 text-[11px]" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
