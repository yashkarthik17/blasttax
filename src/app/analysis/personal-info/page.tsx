'use client'

import { useState, useEffect } from 'react'
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

interface PersonalInfo {
  firstName: string
  middleName: string
  lastName: string
  ssn: string
  dob: string
  street: string
  city: string
  state: string
  zip: string
  yearsAtAddress: string
  prevStreet: string
  prevCity: string
  prevState: string
  prevZip: string
  phoneHome: string
  phoneCell: string
  phoneWork: string
  email: string
  spouseFirstName: string
  spouseMiddleName: string
  spouseLastName: string
  spouseSsn: string
  spouseDob: string
}

const initial: PersonalInfo = {
  firstName: '', middleName: '', lastName: '',
  ssn: '', dob: '',
  street: '', city: '', state: '', zip: '',
  yearsAtAddress: '',
  prevStreet: '', prevCity: '', prevState: '', prevZip: '',
  phoneHome: '', phoneCell: '', phoneWork: '',
  email: '',
  spouseFirstName: '', spouseMiddleName: '', spouseLastName: '',
  spouseSsn: '', spouseDob: '',
}

function maskSSN(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 4) return digits
  const masked = '\u2022'.repeat(digits.length - 4) + digits.slice(-4)
  if (digits.length <= 3) return digits
  if (digits.length <= 5) return masked.slice(0, 3) + '-' + masked.slice(3)
  return masked.slice(0, 3) + '-' + masked.slice(3, 5) + '-' + masked.slice(5)
}

function formatSSNDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 3) return digits.replace(/./g, '\u2022')
  if (digits.length <= 5) return '\u2022'.repeat(3) + '-' + digits.slice(3).replace(/./g, '\u2022')
  const last4 = digits.slice(-4)
  const beforeLast4 = digits.length - 4
  let display = '\u2022\u2022\u2022-\u2022\u2022-'
  if (beforeLast4 >= 5) {
    display = '\u2022\u2022\u2022-\u2022\u2022-'
  }
  return display + last4
}

const inputClass =
  'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-300'
const cardClass = 'rounded-2xl border border-zinc-800 bg-zinc-900 p-6'

export default function PersonalInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<PersonalInfo>(() => ({
    ...initial,
    ...(answers.personalInfo ?? {}),
  }))
  const [rawSsn, setRawSsn] = useState(form.ssn)
  const [rawSpouseSsn, setRawSpouseSsn] = useState(form.spouseSsn)

  const isMarried = answers.filingStatus === 'MFJ' || answers.filingStatus === 'MFS'
  const showPrevAddress = form.yearsAtAddress !== '' && Number(form.yearsAtAddress) < 3

  function update(field: keyof PersonalInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isValid =
    form.firstName.trim() !== '' &&
    form.lastName.trim() !== '' &&
    rawSsn.replace(/\D/g, '').length === 9 &&
    form.dob !== '' &&
    form.street.trim() !== '' &&
    form.city.trim() !== '' &&
    form.state !== '' &&
    form.zip.replace(/\D/g, '').length === 5 &&
    form.phoneCell.trim() !== '' &&
    form.email.trim() !== '' &&
    (!isMarried ||
      (form.spouseFirstName.trim() !== '' &&
        form.spouseLastName.trim() !== '' &&
        rawSpouseSsn.replace(/\D/g, '').length === 9 &&
        form.spouseDob !== ''))

  function handleNext() {
    setAnswers({
      personalInfo: {
        ...form,
        ssn: rawSsn.replace(/\D/g, ''),
        spouseSsn: rawSpouseSsn.replace(/\D/g, ''),
      },
    })
    router.push('/analysis/employment')
  }

  return (
    <FormScreen
      title="Personal Information"
      description="We need your basic information to prepare IRS Form 433-A. All data is encrypted and never shared."
      onNext={handleNext}
      onBack={() => router.push('/analysis/screening-result')}
      isValid={isValid}
    >
      {/* Full Legal Name */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Full Legal Name</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="firstName" className={labelClass}>First Name *</label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              placeholder="John"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="middleName" className={labelClass}>Middle Name</label>
            <input
              id="middleName"
              type="text"
              value={form.middleName}
              onChange={(e) => update('middleName', e.target.value)}
              placeholder="Michael"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last Name *</label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Doe"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* SSN & DOB */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Identification</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ssn" className={labelClass}>Social Security Number *</label>
            <input
              id="ssn"
              type="text"
              inputMode="numeric"
              value={rawSsn.replace(/\D/g, '').length > 0 ? formatSSNDisplay(rawSsn) : ''}
              onChange={(e) => {
                // Extract only newly typed digits
                const current = rawSsn.replace(/\D/g, '')
                const inputVal = e.target.value.replace(/[^\d\u2022]/g, '')
                // Detect backspace (shorter input)
                if (e.target.value.length < (formatSSNDisplay(rawSsn) || '').length) {
                  setRawSsn(current.slice(0, -1))
                } else {
                  // Extract new digit from end
                  const newChars = e.target.value.replace(/[^\d]/g, '')
                  if (newChars.length > 0) {
                    const lastDigit = newChars[newChars.length - 1]
                    const updated = (current + lastDigit).slice(0, 9)
                    setRawSsn(updated)
                  }
                }
              }}
              placeholder="\u2022\u2022\u2022-\u2022\u2022-\u2022\u2022\u2022\u2022"
              className={inputClass}
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-zinc-500">Only the last 4 digits are displayed</p>
          </div>
          <div>
            <label htmlFor="dob" className={labelClass}>Date of Birth *</label>
            <input
              id="dob"
              type="date"
              value={form.dob}
              onChange={(e) => update('dob', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Current Address */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Current Address</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="street" className={labelClass}>Street Address *</label>
            <input
              id="street"
              type="text"
              value={form.street}
              onChange={(e) => update('street', e.target.value)}
              placeholder="123 Main Street, Apt 4B"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="city" className={labelClass}>City *</label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                placeholder="Austin"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>State *</label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s} - {STATE_NAMES[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="zip" className={labelClass}>ZIP Code *</label>
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={form.zip}
                onChange={(e) => update('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="78701"
                className={inputClass}
              />
            </div>
          </div>
          <div className="max-w-xs">
            <label htmlFor="yearsAtAddress" className={labelClass}>Years at this address</label>
            <input
              id="yearsAtAddress"
              type="number"
              min="0"
              max="99"
              value={form.yearsAtAddress}
              onChange={(e) => update('yearsAtAddress', e.target.value)}
              placeholder="e.g. 5"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Previous Address (conditional) */}
      {showPrevAddress && (
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-white">Previous Address</h3>
          <p className="mb-4 text-sm text-zinc-400">
            Since you have been at your current address less than 3 years, please provide your previous address.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="prevStreet" className={labelClass}>Street Address</label>
              <input
                id="prevStreet"
                type="text"
                value={form.prevStreet}
                onChange={(e) => update('prevStreet', e.target.value)}
                placeholder="456 Oak Avenue"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="prevCity" className={labelClass}>City</label>
                <input
                  id="prevCity"
                  type="text"
                  value={form.prevCity}
                  onChange={(e) => update('prevCity', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="prevState" className={labelClass}>State</label>
                <select
                  id="prevState"
                  value={form.prevState}
                  onChange={(e) => update('prevState', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="prevZip" className={labelClass}>ZIP</label>
                <input
                  id="prevZip"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={form.prevZip}
                  onChange={(e) => update('prevZip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className={cardClass}>
        <h3 className="mb-4 text-lg font-semibold text-white">Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="phoneHome" className={labelClass}>Home Phone</label>
            <input
              id="phoneHome"
              type="tel"
              value={form.phoneHome}
              onChange={(e) => update('phoneHome', e.target.value)}
              placeholder="(555) 123-4567"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phoneCell" className={labelClass}>Cell Phone *</label>
            <input
              id="phoneCell"
              type="tel"
              value={form.phoneCell}
              onChange={(e) => update('phoneCell', e.target.value)}
              placeholder="(555) 987-6543"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phoneWork" className={labelClass}>Work Phone</label>
            <input
              id="phoneWork"
              type="tel"
              value={form.phoneWork}
              onChange={(e) => update('phoneWork', e.target.value)}
              placeholder="(555) 456-7890"
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john.doe@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Spouse Information (conditional) */}
      {isMarried && (
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-white">Spouse Information</h3>
          <p className="mb-4 text-sm text-zinc-400">
            Required for Married Filing Jointly or Married Filing Separately status.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="spouseFirst" className={labelClass}>First Name *</label>
                <input
                  id="spouseFirst"
                  type="text"
                  value={form.spouseFirstName}
                  onChange={(e) => update('spouseFirstName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="spouseMiddle" className={labelClass}>Middle Name</label>
                <input
                  id="spouseMiddle"
                  type="text"
                  value={form.spouseMiddleName}
                  onChange={(e) => update('spouseMiddleName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="spouseLast" className={labelClass}>Last Name *</label>
                <input
                  id="spouseLast"
                  type="text"
                  value={form.spouseLastName}
                  onChange={(e) => update('spouseLastName', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="spouseSsn" className={labelClass}>SSN *</label>
                <input
                  id="spouseSsn"
                  type="text"
                  inputMode="numeric"
                  value={rawSpouseSsn.replace(/\D/g, '').length > 0 ? formatSSNDisplay(rawSpouseSsn) : ''}
                  onChange={(e) => {
                    const current = rawSpouseSsn.replace(/\D/g, '')
                    if (e.target.value.length < (formatSSNDisplay(rawSpouseSsn) || '').length) {
                      setRawSpouseSsn(current.slice(0, -1))
                    } else {
                      const newChars = e.target.value.replace(/[^\d]/g, '')
                      if (newChars.length > 0) {
                        const lastDigit = newChars[newChars.length - 1]
                        const updated = (current + lastDigit).slice(0, 9)
                        setRawSpouseSsn(updated)
                      }
                    }
                  }}
                  placeholder="\u2022\u2022\u2022-\u2022\u2022-\u2022\u2022\u2022\u2022"
                  className={inputClass}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="spouseDob" className={labelClass}>Date of Birth *</label>
                <input
                  id="spouseDob"
                  type="date"
                  value={form.spouseDob}
                  onChange={(e) => update('spouseDob', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </FormScreen>
  )
}
