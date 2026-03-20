'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EntityOption {
  id: string
  label: string
  sub: string
  iconBg: string
  iconColor: string
  icon: string
}

const ENTITIES: EntityOption[] = [
  { id: 'sole-prop', label: 'Sole Proprietor', sub: 'Schedule C on 1040 + 941/940 if employees', iconBg: '#FEF3C7', iconColor: '#D97706', icon: 'fa-user' },
  { id: 'partnership', label: 'Partnership', sub: 'Form 1065 + K-1s to partners', iconBg: '#F0FDFA', iconColor: '#0D9488', icon: 'fa-handshake' },
  { id: 's-corp', label: 'S-Corporation', sub: 'Form 1120-S + K-1s to shareholders', iconBg: '#EFF4FF', iconColor: '#2563EB', icon: 'fa-building' },
  { id: 'c-corp', label: 'C-Corporation', sub: 'Form 1120 + 21% flat corporate rate', iconBg: '#F5F3FF', iconColor: '#7C3AED', icon: 'fa-city' },
  { id: 'llc', label: 'LLC', sub: 'Tax classification depends on election', iconBg: '#FDF2F8', iconColor: '#DB2777', icon: 'fa-shield-halved' },
]

const LLC_TYPES = [
  { id: 'sole-prop', label: 'Single-Member (Sole Prop)' },
  { id: 'partnership', label: 'Multi-Member (Partnership)' },
  { id: 's-corp', label: 'S-Corp Election' },
  { id: 'c-corp', label: 'C-Corp Election' },
]

const RT_MAP: Record<string, string> = {
  'sole-prop': 'Schedule C (1040)',
  'partnership': 'Form 1065',
  's-corp': 'Form 1120-S',
  'c-corp': 'Form 1120',
}

const STATES = ['AZ', 'CA', 'DE', 'FL', 'NV', 'NY', 'TX', 'WA', 'Other']

export default function EntityTypePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [llcClass, setLlcClass] = useState<string | null>(null)
  const [numOwners, setNumOwners] = useState('1')
  const [stateInc, setStateInc] = useState('')
  const [dateInc, setDateInc] = useState('')
  const [ein, setEin] = useState('')
  const [numEmployees, setNumEmployees] = useState('0')
  const [naics, setNaics] = useState('')
  const [opStatus, setOpStatus] = useState<'operating' | 'oob' | null>(null)
  const [dateCeased, setDateCeased] = useState('')

  const effectiveEntity = selected === 'llc' ? llcClass : selected
  const showDetails = selected && (selected !== 'llc' || llcClass)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '10%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 1 of 8</span>
            <span className="text-xs font-semibold text-[#2563EB]">Business Track</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          <div className="mb-1.5">
            <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight">Business Entity Classification</h1>
            <p className="text-[13px] text-[#94A3B8] mt-1 leading-relaxed">Select your entity type to determine tax obligations and resolution options.</p>
          </div>

          {/* Entity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-4">
            {ENTITIES.map((ent) => (
              <button
                key={ent.id}
                onClick={() => { setSelected(ent.id); if (ent.id !== 'llc') setLlcClass(null) }}
                className={`flex items-center gap-3.5 rounded-[14px] bg-white border-[1.5px] p-4 text-left transition-all ${
                  selected === ent.id ? 'border-[#2563EB] bg-[#EFF4FF]' : 'border-[#F1F5F9] hover:translate-y-[-2px]'
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: ent.iconBg, color: ent.iconColor }}>
                  <i className={`fa-solid ${ent.icon}`} />
                </div>
                <div className="flex-1">
                  <span className="text-[13.5px] font-bold text-[#0A1628] block">{ent.label}</span>
                  <span className="text-[11px] text-[#94A3B8]">{ent.sub}</span>
                </div>
                <div className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 ml-auto ${
                  selected === ent.id ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#E2E8F0]'
                }`}>
                  {selected === ent.id && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>

          {/* LLC Sub-selection */}
          {selected === 'llc' && (
            <div className="rounded-xl bg-[#F8FAFC] p-3 mt-2.5">
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.04em] mb-2">LLC Tax Classification</div>
              <div className="flex flex-wrap gap-1.5">
                {LLC_TYPES.map((lt) => (
                  <button
                    key={lt.id}
                    onClick={() => setLlcClass(lt.id)}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      llcClass === lt.id ? 'bg-[#EFF4FF] border-[1.5px] border-[#2563EB] text-[#2563EB]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]'
                    }`}
                  >{lt.label}</button>
                ))}
              </div>
              {llcClass && (
                <div className="inline-flex items-center gap-1 mt-1.5 rounded-full bg-[#EFF4FF] px-2.5 py-1 text-[10px] font-bold text-[#2563EB]">
                  <i className="fa-solid fa-file-lines text-[9px]" /> Taxed as: {RT_MAP[llcClass]}
                </div>
              )}
            </div>
          )}

          {/* Return type tags */}
          {effectiveEntity && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF4FF] px-2.5 py-1 text-[10px] font-bold text-[#2563EB]">
                <i className="fa-solid fa-file-lines text-[9px]" /> {RT_MAP[effectiveEntity] || '--'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] px-2.5 py-1 text-[10px] font-bold text-[#92400E]">
                <i className="fa-solid fa-users text-[9px]" /> 941/940 if employees
              </span>
            </div>
          )}

          {/* Business Details */}
          {showDetails && (
            <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mt-3">
              <div className="text-sm font-bold text-[#0A1628] mb-3">
                <i className="fa-solid fa-building text-xs text-[#2563EB] mr-1.5" /> Business Details
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Owners / Shareholders</label>
                  <input type="number" value={numOwners} onChange={(e) => setNumOwners(e.target.value)} min="1"
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">State of Incorporation</label>
                  <select value={stateInc} onChange={(e) => setStateInc(e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB] appearance-none">
                    <option value="">Select...</option>
                    {STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Date of Incorporation</label>
                  <input type="date" value={dateInc} onChange={(e) => setDateInc(e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Business EIN</label>
                  <input type="text" placeholder="XX-XXXXXXX" maxLength={10} value={ein} onChange={(e) => setEin(e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB] placeholder:text-[#CBD5E1] placeholder:font-normal" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Number of Employees</label>
                  <input type="number" value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} min="0"
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">NAICS Code (optional)</label>
                  <input type="text" placeholder="e.g. 541110" value={naics} onChange={(e) => setNaics(e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB] placeholder:text-[#CBD5E1] placeholder:font-normal" />
                </div>
              </div>
            </div>
          )}

          {/* Operating Status */}
          {showDetails && (
            <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mt-3">
              <div className="text-sm font-bold text-[#0A1628] mb-3">
                <i className="fa-solid fa-power-off text-xs text-[#2563EB] mr-1.5" /> Business Operating Status
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpStatus('operating')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-3 text-xs font-semibold transition-all ${
                    opStatus === 'operating' ? 'bg-[#EFF4FF] border-[1.5px] border-[#2563EB] text-[#2563EB]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  <i className="fa-solid fa-circle-check text-[11px]" /> Operating
                </button>
                <button
                  onClick={() => setOpStatus('oob')}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-3 text-xs font-semibold transition-all ${
                    opStatus === 'oob' ? 'bg-[#EFF4FF] border-[1.5px] border-[#2563EB] text-[#2563EB]' : 'bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  <i className="fa-solid fa-circle-xmark text-[11px]" /> Out of Business
                </button>
              </div>
              {opStatus === 'operating' && (
                <div className="mt-3 rounded-xl bg-[#E6F9EE] border border-[rgba(0,166,81,0.15)] p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <i className="fa-solid fa-circle-check text-sm text-[#00A651]" />
                    <span className="text-[13px] font-bold text-[#065F46]">Business is Operating</span>
                  </div>
                  <p className="text-[11.5px] text-[#065F46] leading-relaxed">Operating businesses must be current on tax deposits. Deposit compliance checked next.</p>
                </div>
              )}
              {opStatus === 'oob' && (
                <div className="mt-3 rounded-xl bg-[#FFFBEB] border border-[rgba(245,166,35,0.2)] p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <i className="fa-solid fa-triangle-exclamation text-sm text-[#92400E]" />
                    <span className="text-[13px] font-bold text-[#92400E]">Business is Closed</span>
                  </div>
                  <p className="text-[11.5px] text-[#92400E] leading-relaxed mb-2.5">Final returns must be filed. Trust fund liability transfers to responsible persons via TFRP.</p>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#92400E] uppercase tracking-[0.04em] mb-1">Date Ceased Operations</label>
                    <input type="date" value={dateCeased} onChange={(e) => setDateCeased(e.target.value)}
                      className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#EFF4FF] border border-[rgba(37,99,235,0.15)] p-3 mt-4">
            <i className="fa-solid fa-circle-info text-[#2563EB] mt-0.5" />
            <span className="text-xs text-[#0A1628]">Your entity type determines which tax returns are required and which resolution paths are available.</span>
          </div>

          <div className="mt-5">
            <button
              onClick={() => router.push('/analysis/business/compliance')}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white"
            >
              Continue <i className="fa-solid fa-arrow-right text-[13px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
