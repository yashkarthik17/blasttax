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

interface PersonalInfo {
  firstName: string; middleName: string; lastName: string
  ssn: string; dob: string
  street: string; apt: string; city: string; state: string; zip: string
  prevStreet: string; prevCity: string; prevState: string; prevZip: string
  phoneHome: string; phoneCell: string; phoneWork: string; email: string
  spouseFirstName: string; spouseMiddleName: string; spouseLastName: string
  spouseSsn: string; spouseDob: string
}

const initial: PersonalInfo = {
  firstName: '', middleName: '', lastName: '',
  ssn: '', dob: '',
  street: '', apt: '', city: '', state: '', zip: '',
  prevStreet: '', prevCity: '', prevState: '', prevZip: '',
  phoneHome: '', phoneCell: '', phoneWork: '', email: '',
  spouseFirstName: '', spouseMiddleName: '', spouseLastName: '',
  spouseSsn: '', spouseDob: '',
}

const inputClass = 'w-full rounded-xl border-[1.5px] border-[#F1F5F9] bg-[#F8FAFC] px-3.5 py-3 text-[0.85rem] font-semibold text-[#0A1628] outline-none transition-all placeholder:font-normal placeholder:text-[#CBD5E1] focus:border-[#0A1628] focus:bg-white focus:shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
const labelClass = 'mb-1.5 block text-[0.72rem] font-semibold text-[#64748B]'
const selectClass = inputClass + ' appearance-none bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2712%27%20height%3D%278%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201.5L6%206.5L11%201.5%27%20stroke%3D%27%238585A0%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E")] bg-[right_12px_center] bg-no-repeat pr-8'

export default function PersonalInfoPage() {
  const router = useRouter()
  const { answers, setAnswers } = useWizard()
  const [form, setForm] = useState<PersonalInfo>(() => ({
    ...initial,
    ...(answers.personalInfo ?? {}),
  }))
  const [showPrevAddress, setShowPrevAddress] = useState(false)
  const [showSpouse, setShowSpouse] = useState(false)

  function update(field: keyof PersonalInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleNext() {
    setAnswers({ personalInfo: form })
    router.push('/analysis/employment')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5">
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div className="h-full w-[30%] rounded-full bg-[#00A651]" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 2 of 6</span>
            <span className="text-xs font-semibold text-[#2563EB]">Personal Info</span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-5 pt-3.5">
          {/* Heading */}
          <div>
            <h1 className="text-[1.3rem] font-extrabold leading-tight tracking-[-0.01em] text-[#0A1628]">
              Tell us about yourself
            </h1>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-[#94A3B8]">
              This information is required by every IRS form
            </p>
          </div>

          {/* Info note */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[rgba(37,99,235,0.1)] bg-[#EBF0FF] px-3.5 py-2.5">
            <i className="fa-solid fa-shield-halved shrink-0 text-xs text-[#2563EB]" />
            <span className="text-[0.72rem] leading-snug text-[#1E40AF]">
              Your data is encrypted and only used for IRS form generation.
            </span>
          </div>

          {/* Legal Name */}
          <div>
            <div className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
              Your Legal Name
            </div>
            <div className="mb-2.5 flex gap-2.5">
              <div className="flex-[2]">
                <div className={labelClass}>First Name</div>
                <input type="text" className={inputClass} value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First name" />
              </div>
              <div className="w-[60px]">
                <div className={labelClass}>M.I.</div>
                <input type="text" className={inputClass + ' text-center'} value={form.middleName} onChange={(e) => update('middleName', e.target.value)} maxLength={1} placeholder="M" />
              </div>
              <div className="flex-[2]">
                <div className={labelClass}>Last Name</div>
                <input type="text" className={inputClass} value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last name" />
              </div>
            </div>
          </div>

          {/* SSN & DOB */}
          <div className="mb-2.5 flex gap-2.5">
            <div className="flex-1">
              <div className={labelClass}>Social Security Number</div>
              <input type="text" className={inputClass} value={form.ssn} onChange={(e) => update('ssn', e.target.value)} placeholder="XXX-XX-XXXX" maxLength={11} />
            </div>
            <div className="flex-1">
              <div className={labelClass}>Date of Birth</div>
              <input type="date" className={inputClass} value={form.dob} onChange={(e) => update('dob', e.target.value)} />
            </div>
          </div>

          {/* Current Address */}
          <div>
            <div className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
              Current Address
            </div>
            <div className="mb-2.5">
              <div className={labelClass}>Street Address</div>
              <input type="text" className={inputClass} value={form.street} onChange={(e) => update('street', e.target.value)} placeholder="Street address" />
            </div>
            <div className="mb-2.5">
              <div className={labelClass}>Apartment / Suite / Unit</div>
              <input type="text" className={inputClass} value={form.apt} onChange={(e) => update('apt', e.target.value)} placeholder="Apt, Suite, Unit (optional)" />
            </div>
            <div className="mb-2.5 flex gap-2.5">
              <div className="flex-[2]">
                <div className={labelClass}>City</div>
                <input type="text" className={inputClass} value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="City" />
              </div>
              <div className="w-[70px]">
                <div className={labelClass}>State</div>
                <select className={selectClass} value={form.state} onChange={(e) => update('state', e.target.value)}>
                  <option value="">--</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="w-[90px]">
                <div className={labelClass}>ZIP</div>
                <input type="text" className={inputClass} value={form.zip} onChange={(e) => update('zip', e.target.value)} maxLength={10} placeholder="ZIP" />
              </div>
            </div>
          </div>

          {/* Previous Address Toggle */}
          <div className="rounded-[14px] border border-[#F3F4F6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Previous address?</div>
                <div className="text-[0.68rem] text-[#94A3B8]">Required if &lt; 3 years at current</div>
              </div>
              <button
                onClick={() => setShowPrevAddress(!showPrevAddress)}
                className={`relative h-[22px] w-[40px] rounded-full transition-colors ${showPrevAddress ? 'bg-[#0A1628]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${showPrevAddress ? 'left-[20px]' : 'left-[2px]'}`} />
              </button>
            </div>
            {showPrevAddress && (
              <div className="mt-3 space-y-2.5">
                <div>
                  <div className={labelClass}>Previous Street Address</div>
                  <input type="text" className={inputClass} value={form.prevStreet} onChange={(e) => update('prevStreet', e.target.value)} placeholder="Previous street address" />
                </div>
                <div className="flex gap-2.5">
                  <div className="flex-[2]">
                    <div className={labelClass}>City</div>
                    <input type="text" className={inputClass} value={form.prevCity} onChange={(e) => update('prevCity', e.target.value)} placeholder="City" />
                  </div>
                  <div className="w-[70px]">
                    <div className={labelClass}>State</div>
                    <select className={selectClass} value={form.prevState} onChange={(e) => update('prevState', e.target.value)}>
                      <option value="">--</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="w-[90px]">
                    <div className={labelClass}>ZIP</div>
                    <input type="text" className={inputClass} value={form.prevZip} onChange={(e) => update('prevZip', e.target.value)} maxLength={10} placeholder="ZIP" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-3 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
              Contact Information
            </div>
            <div className="mb-2.5 flex gap-2.5">
              <div className="flex-1">
                <div className={labelClass}>Home Phone</div>
                <input type="tel" className={inputClass} value={form.phoneHome} onChange={(e) => update('phoneHome', e.target.value)} placeholder="(000) 000-0000" />
              </div>
              <div className="flex-1">
                <div className={labelClass}>Cell Phone</div>
                <input type="tel" className={inputClass} value={form.phoneCell} onChange={(e) => update('phoneCell', e.target.value)} placeholder="(000) 000-0000" />
              </div>
            </div>
            <div className="mb-2.5 flex gap-2.5">
              <div className="flex-1">
                <div className={labelClass}>Work Phone</div>
                <input type="tel" className={inputClass} value={form.phoneWork} onChange={(e) => update('phoneWork', e.target.value)} placeholder="(000) 000-0000" />
              </div>
              <div className="flex-1">
                <div className={labelClass}>Email Address</div>
                <input type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" />
              </div>
            </div>
          </div>

          {/* Spouse Toggle */}
          <div className="rounded-[14px] border border-[#F3F4F6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.82rem] font-semibold text-[#0A1628]">Filing jointly (MFJ)?</div>
                <div className="text-[0.68rem] text-[#94A3B8]">Add spouse information</div>
              </div>
              <button
                onClick={() => setShowSpouse(!showSpouse)}
                className={`relative h-[22px] w-[40px] rounded-full transition-colors ${showSpouse ? 'bg-[#0A1628]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white transition-transform ${showSpouse ? 'left-[20px]' : 'left-[2px]'}`} />
              </button>
            </div>
            {showSpouse && (
              <div className="mt-3.5">
                <div className="mb-3 flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#7C3AED]">
                  <i className="fa-solid fa-user-group text-[10px]" /> Spouse Information
                </div>
                <div className="mb-2.5 flex gap-2.5">
                  <div className="flex-[2]">
                    <div className={labelClass}>First Name</div>
                    <input type="text" className={inputClass} value={form.spouseFirstName} onChange={(e) => update('spouseFirstName', e.target.value)} placeholder="Spouse first name" />
                  </div>
                  <div className="w-[60px]">
                    <div className={labelClass}>M.I.</div>
                    <input type="text" className={inputClass + ' text-center'} value={form.spouseMiddleName} onChange={(e) => update('spouseMiddleName', e.target.value)} maxLength={1} placeholder="M" />
                  </div>
                  <div className="flex-[2]">
                    <div className={labelClass}>Last Name</div>
                    <input type="text" className={inputClass} value={form.spouseLastName} onChange={(e) => update('spouseLastName', e.target.value)} placeholder="Spouse last name" />
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex-1">
                    <div className={labelClass}>Spouse SSN</div>
                    <input type="text" className={inputClass} value={form.spouseSsn} onChange={(e) => update('spouseSsn', e.target.value)} placeholder="XXX-XX-XXXX" maxLength={11} />
                  </div>
                  <div className="flex-1">
                    <div className={labelClass}>Spouse Date of Birth</div>
                    <input type="date" className={inputClass} value={form.spouseDob} onChange={(e) => update('spouseDob', e.target.value)} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleNext}
              className="w-full rounded-full bg-[#00A651] py-4 text-[0.88rem] font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Continue <i className="fa-solid fa-arrow-right ml-1.5 text-xs" />
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="py-3 text-center text-[0.82rem] font-semibold text-[#94A3B8] transition-colors hover:text-[#64748B]"
            >
              <i className="fa-solid fa-bookmark mr-1.5 text-[11px]" /> Save & Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
