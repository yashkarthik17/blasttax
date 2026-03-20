'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

type HousingType = 'rent' | 'own' | 'other'

interface HouseholdData {
  memberCount: number; under17Count: number; over65Count: number
  county: string; state: string
  incomeBracket: string; vehicleCount: number; housingType: HousingType | ''
  hasInsurance: boolean; insuranceType: string
}

const initial: HouseholdData = {
  memberCount: 1, under17Count: 0, over65Count: 0,
  county: '', state: '',
  incomeBracket: '', vehicleCount: 1, housingType: '',
  hasInsurance: true, insuranceType: '',
}

const inputClass = 'w-full rounded-[10px] border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-3 py-2.5 text-sm font-semibold text-[#0A1628] outline-none transition-all placeholder:font-normal placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:bg-white focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
const selectClass = inputClass + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2712%27%20height%3D%278%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201.5L6%206.5L11%201.5%27%20stroke%3D%27%238585A0%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[right_12px_center] bg-no-repeat pr-8'

function Counter({ value, onChange, min = 0 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#F1F5F9] bg-white text-[#0A1628] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB] active:scale-95"
      >
        <i className="fa-solid fa-minus text-xs" />
      </button>
      <span className="min-w-[40px] text-center text-2xl font-black text-[#0A1628]">{value}</span>
      <button
        onClick={() => onChange(Math.min(10, value + 1))}
        className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#F1F5F9] bg-white text-[#0A1628] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB] active:scale-95"
      >
        <i className="fa-solid fa-plus text-xs" />
      </button>
    </div>
  )
}

function SmallCounter({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border-[1.5px] border-[#F1F5F9] bg-white text-sm text-[#0A1628] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB] active:scale-95"
      >
        <i className="fa-solid fa-minus text-[10px]" />
      </button>
      <span className="min-w-[28px] text-center text-lg font-black text-[#0A1628]">{value}</span>
      <button
        onClick={() => onChange(Math.min(10, value + 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border-[1.5px] border-[#F1F5F9] bg-white text-sm text-[#0A1628] transition-all hover:border-[#2563EB] hover:bg-[#EFF4FF] hover:text-[#2563EB] active:scale-95"
      >
        <i className="fa-solid fa-plus text-[10px]" />
      </button>
    </div>
  )
}

export default function HouseholdPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<HouseholdData>(() => ({
    ...initial,
    ...(answers.household ?? {}),
  }))

  function update<K extends keyof HouseholdData>(field: K, value: HouseholdData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ household: form })
    router.push('/analysis/transcript')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[30%] rounded-full bg-[#00A651]" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 3 of 6</span>
            <span className="text-xs font-semibold text-[#2563EB]">Household</span>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          {/* Heading */}
          <div className="mb-1.5">
            <h1 className="text-[1.3rem] font-extrabold leading-tight text-[#0A1628]">Tell us about your household</h1>
            <p className="mt-1 text-[13px] leading-relaxed text-[#94A3B8]">The IRS uses your household size to determine allowable living expenses</p>
          </div>

          {/* Household Size */}
          <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#0A1628]">Total Household Members</div>
                <div className="mt-0.5 text-xs text-[#94A3B8]">Including yourself</div>
              </div>
              <Counter value={form.memberCount} onChange={(v) => update('memberCount', v)} min={1} />
            </div>
          </div>

          {/* Age Groups */}
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-1 text-[13px] font-bold text-[#0A1628]">Household Age Breakdown</div>
            <div className="mb-2.5 text-[11px] text-[#94A3B8]">Used for IRS National Standards calculations</div>
            <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2.5">
              <div>
                <div className="text-[13px] font-semibold text-[#0A1628]">Members under 17</div>
                <div className="mt-px text-[11px] text-[#94A3B8]">Child-related deductions</div>
              </div>
              <SmallCounter value={form.under17Count} onChange={(v) => update('under17Count', v)} />
            </div>
            <div className="flex items-center justify-between py-2.5">
              <div>
                <div className="text-[13px] font-semibold text-[#0A1628]">Members age 65+</div>
                <div className="mt-px text-[11px] text-[#94A3B8]">Healthcare OOP: $149/mo vs $84/mo</div>
              </div>
              <SmallCounter value={form.over65Count} onChange={(v) => update('over65Count', v)} />
            </div>
          </div>

          </div>

          {/* Income Bracket */}
          <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-1 text-[13px] font-bold text-[#0A1628]">Approximate Gross Monthly Household Income</div>
            <div className="mb-2.5 text-[11px] text-[#94A3B8]">Matches IRS National Standards income brackets</div>
            <select
              className={selectClass}
              value={form.incomeBracket}
              onChange={(e) => update('incomeBracket', e.target.value)}
            >
              <option value="">Select income range...</option>
              <option value="0-1666">Under $1,667/month</option>
              <option value="1667-2499">$1,667 - $2,499/month</option>
              <option value="2500-3332">$2,500 - $3,332/month</option>
              <option value="3333-4166">$3,333 - $4,166/month</option>
              <option value="4167-5832">$4,167 - $5,832/month</option>
              <option value="5833-7499">$5,833 - $7,499/month</option>
              <option value="7500-8332">$7,500 - $8,332/month</option>
              <option value="8333+">$8,333+/month</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-2.5 text-[13px] font-bold text-[#0A1628]">Location</div>
            <div className="flex gap-2.5">
              <div className="flex-1">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#94A3B8]">County</label>
                <input type="text" className={inputClass} value={form.county} onChange={(e) => update('county', e.target.value)} placeholder="e.g. Los Angeles" />
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#94A3B8]">State</label>
                <select className={selectClass} value={form.state} onChange={(e) => update('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          </div>

          {/* Vehicles */}
          <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-1 text-[13px] font-bold text-[#0A1628]">Vehicles in Household</div>
            <div className="mb-2.5 text-[11px] text-[#94A3B8]">How many vehicles does your household own or lease?</div>
            <div className="flex gap-2.5">
              {[0, 1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => update('vehicleCount', n)}
                  className={`flex-1 rounded-xl border-[1.5px] py-3.5 text-center transition-all hover:-translate-y-px ${
                    form.vehicleCount === n
                      ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                      : 'border-[#F1F5F9] bg-white'
                  }`}
                >
                  <div className="text-lg font-bold">{n === 2 ? '2+' : n}</div>
                  <div className="text-[11px] font-semibold text-[#94A3B8]">{n === 0 ? 'None' : n === 1 ? 'Vehicle' : 'Vehicles'}</div>
                </button>
              ))}
            </div>
            <div className="mt-2.5 rounded-lg bg-[#EFF4FF] px-3 py-2">
              <div className="text-[11px] font-semibold leading-snug text-[#4338CA]">
                <i className="fa-solid fa-circle-info mr-1 text-[10px]" />
                IRS allows: <strong>$662/mo</strong> ownership per vehicle (max 2). Operating cost varies by region. No vehicle = public transit allowance.
              </div>
            </div>
          </div>

          {/* Housing */}
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-2.5 text-[13px] font-bold text-[#0A1628]">Housing</div>
            <div className="flex gap-2.5">
              {([
                { type: 'rent' as HousingType, icon: 'fa-solid fa-building', color: '#2563EB', label: 'Rent' },
                { type: 'own' as HousingType, icon: 'fa-solid fa-house', color: '#00A651', label: 'Own' },
                { type: 'other' as HousingType, icon: 'fa-solid fa-people-roof', color: '#64748B', label: 'Other' },
              ]).map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => update('housingType', opt.type)}
                  className={`flex-1 rounded-xl border-[1.5px] py-3.5 text-center transition-all hover:-translate-y-px ${
                    form.housingType === opt.type
                      ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                      : 'border-[#F1F5F9] bg-white'
                  }`}
                >
                  <i className={`${opt.icon} mb-1 block text-base`} style={{ color: opt.color }} />
                  <div className="text-xs font-bold text-[#0A1628]">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          </div>

          {/* Health Insurance */}
          <div className="mb-3 rounded-[16px] border border-[#F1F5F9] bg-white p-4">
            <div className="mb-2.5 text-[13px] font-bold text-[#0A1628]">Health Insurance</div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[13px] font-semibold text-[#0A1628]">Do you have health insurance?</span>
              <button
                onClick={() => update('hasInsurance', !form.hasInsurance)}
                className={`relative h-7 w-12 rounded-full transition-colors ${form.hasInsurance ? 'bg-[#00A651]' : 'bg-[#F1F5F9]'}`}
              >
                <div className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-transform ${form.hasInsurance ? 'left-[23px]' : 'left-[3px]'}`} />
              </button>
            </div>
            {form.hasInsurance && (
              <div className="mt-2">
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#94A3B8]">Insurance Type</label>
                <select className={selectClass} value={form.insuranceType} onChange={(e) => update('insuranceType', e.target.value)}>
                  <option value="">Select...</option>
                  <option value="employer">Employer-provided</option>
                  <option value="marketplace">Marketplace / ACA</option>
                  <option value="medicare">Medicare</option>
                  <option value="medicaid">Medicaid</option>
                  <option value="va">VA / Military</option>
                  <option value="private">Private / Individual</option>
                  <option value="none">No Insurance</option>
                </select>
              </div>
            )}
            <div className="mt-2 rounded-lg bg-[#EFF4FF] px-3 py-2">
              <div className="text-[11px] font-semibold leading-snug text-[#4338CA]">
                <i className="fa-solid fa-circle-info mr-1 text-[10px]" />
                IRS allows OOP healthcare: <strong>$84/mo</strong> per person under 65, <strong>$149/mo</strong> per person 65+.
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF4FF] px-3.5 py-2.5 text-[13px] text-[#0A1628]">
            <i className="fa-solid fa-circle-info shrink-0 text-[#2563EB]" />
            <span>These details determine your IRS National and Local Standards allowances</span>
          </div>

          {/* Continue */}
          <div className="pt-3">
            <button
              onClick={handleNext}
              className="w-full rounded-full bg-[#00A651] px-7 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Continue <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
