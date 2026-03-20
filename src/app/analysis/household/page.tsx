'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'
import FormScreen from '@/components/wizard/FormScreen'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]

const STATE_NAMES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
  CT:'Connecticut',DE:'Delaware',DC:'District of Columbia',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',
  KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',
  MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',
  NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',
  NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',
  OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',
  TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
  WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
}

const INCOME_BRACKETS = [
  'Under $1,667',
  '$1,667 - $2,499',
  '$2,500 - $3,332',
  '$3,333 - $4,166',
  '$4,167 - $5,832',
  '$5,833 - $7,499',
  '$7,500 - $8,332',
  '$8,333+',
]

type HousingType = 'Own' | 'Rent' | 'Other'

interface HouseholdData {
  familySize: string
  membersUnder17: string
  members65Plus: string
  state: string
  county: string
  housingType: HousingType | ''
  numVehicles: string
  grossMonthlyIncomeBracket: string
}

const initialData: HouseholdData = {
  familySize: '',
  membersUnder17: '',
  members65Plus: '',
  state: '',
  county: '',
  housingType: '',
  numVehicles: '',
  grossMonthlyIncomeBracket: '',
}

const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'
const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'
const pillClass = (active: boolean) =>
  `rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all cursor-pointer ${
    active
      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
  }`
const radioPillClass = (active: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all cursor-pointer ${
    active
      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
      : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
  }`

export default function HouseholdPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()

  const [form, setForm] = useState<HouseholdData>(() => ({
    ...initialData,
    ...(answers.household ?? {}),
  }))

  function update(field: keyof HouseholdData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isValid =
    form.familySize !== '' &&
    Number(form.familySize) >= 1 &&
    form.state !== '' &&
    form.housingType !== '' &&
    form.numVehicles !== '' &&
    form.grossMonthlyIncomeBracket !== ''

  function handleNext() {
    setAnswers({ household: form })
    router.push('/analysis/transcript')
  }

  return (
    <FormScreen
      title="Household Information"
      description="This helps us determine IRS allowable living expense standards for your area and family size."
      onNext={handleNext}
      onBack={() => router.push('/analysis/employment')}
      isValid={isValid}
    >
      {/* Family Size */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Family Size</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="familySize" className={labelClass}>Total in household *</label>
            <input
              id="familySize"
              type="number"
              min="1"
              max="20"
              value={form.familySize}
              onChange={(e) => update('familySize', e.target.value)}
              placeholder="1"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="under17" className={labelClass}>Members under 17</label>
            <input
              id="under17"
              type="number"
              min="0"
              max="15"
              value={form.membersUnder17}
              onChange={(e) => update('membersUnder17', e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="over65" className={labelClass}>Members 65 and over</label>
            <input
              id="over65"
              type="number"
              min="0"
              max="10"
              value={form.members65Plus}
              onChange={(e) => update('members65Plus', e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Location</h3>
        <p className="mb-4 text-sm text-zinc-400">
          Your state and county determine IRS allowable housing and transportation standards.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="state" className={labelClass}>State *</label>
            <select
              id="state"
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
              className={inputClass}
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s} - {STATE_NAMES[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="county" className={labelClass}>County</label>
            <input
              id="county"
              type="text"
              value={form.county}
              onChange={(e) => update('county', e.target.value)}
              placeholder="Travis County"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Housing Type */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Housing *</h3>
        <div className="grid grid-cols-3 gap-3">
          {(['Own', 'Rent', 'Other'] as HousingType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update('housingType', type)}
              className={pillClass(form.housingType === type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Vehicles */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Vehicles *</h3>
        <p className="mb-3 text-sm text-zinc-400">How many vehicles does your household own or lease?</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {['0', '1', '2', '3', '4', '5', '5+'].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update('numVehicles', n)}
              className={pillClass(form.numVehicles === n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Gross Monthly Income Bracket */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Gross Monthly Income *</h3>
        <p className="mb-4 text-sm text-zinc-400">
          Select the bracket that best represents your total gross monthly household income (before taxes).
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INCOME_BRACKETS.map((bracket) => (
            <button
              key={bracket}
              type="button"
              onClick={() => update('grossMonthlyIncomeBracket', bracket)}
              className={radioPillClass(form.grossMonthlyIncomeBracket === bracket)}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    form.grossMonthlyIncomeBracket === bracket
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-zinc-600'
                  }`}
                >
                  {form.grossMonthlyIncomeBracket === bracket && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
                {bracket}
              </span>
            </button>
          ))}
        </div>
      </div>
    </FormScreen>
  )
}
