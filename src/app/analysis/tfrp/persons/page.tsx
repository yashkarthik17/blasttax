'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ResponsiblePerson {
  id: string
  name: string
  ssn: string
  title: string
  ownership: string
  period: string
  checkSigning: boolean
  financialDecision: boolean
  hireFire: boolean
  madeDeposits: boolean
  isPrimary: boolean
}

let nextId = 3

export default function TFRPPersonsPage() {
  const router = useRouter()
  const [persons, setPersons] = useState<ResponsiblePerson[]>([
    { id: '1', name: 'John Smith', ssn: '****1234', title: 'President / CEO', ownership: '60', period: '2020 - Present', checkSigning: true, financialDecision: true, hireFire: true, madeDeposits: false, isPrimary: true },
    { id: '2', name: 'Jane Smith', ssn: '', title: 'Secretary / Treasurer', ownership: '40', period: '2021 - Present', checkSigning: true, financialDecision: false, hireFire: false, madeDeposits: false, isPrimary: false },
  ])
  const [letter1153, setLetter1153] = useState(false)
  const [letter1153Date, setLetter1153Date] = useState('')

  function addPerson() {
    setPersons((prev) => [...prev, {
      id: String(nextId++), name: '', ssn: '', title: '', ownership: '', period: '',
      checkSigning: false, financialDecision: false, hireFire: false, madeDeposits: false, isPrimary: false,
    }])
  }

  function updatePerson(id: string, field: keyof ResponsiblePerson, value: string | boolean) {
    setPersons((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Progress */}
        <div className="px-5 pt-4">
          <div className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
            <div className="h-full rounded-full bg-[#0A1628] transition-all" style={{ width: '33%' }} />
          </div>
          <div className="flex justify-between items-center mt-2.5">
            <span className="text-xs font-semibold text-[#94A3B8]">Step 1 of 3</span>
            <span className="text-xs font-semibold text-[#2563EB]">TFRP Track</span>
          </div>
        </div>

        <div className="px-5 py-4 pb-8">
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight mb-1">Responsible Person Identification</h1>
          <p className="text-[13px] text-[#94A3B8] mb-3.5">Identify all persons with TFRP exposure under IRC 6672.</p>

          {/* Warning */}
          <div className="flex items-start gap-2.5 rounded-[14px] bg-[#FEF2F2] border border-[rgba(230,57,70,0.15)] p-3.5 mb-3.5">
            <i className="fa-solid fa-triangle-exclamation text-[#E63946]" />
            <span className="text-xs text-[#991B1B]">Each responsible person is liable for the FULL trust fund amount ($29,260). There is no pro-rata sharing.</span>
          </div>

          {/* Person Cards */}
          {persons.map((person, pi) => (
            <div key={person.id} className="rounded-2xl bg-white border border-[#F1F5F9] p-[18px] mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-bold text-[#991B1B]">
                  <i className="fa-solid fa-user-shield text-[10px]" /> Person {pi + 1}
                </span>
                {person.isPrimary && <span className="text-[11px] text-[#94A3B8]">Primary</span>}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Full Name</label>
                  <input type="text" value={person.name} onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">{person.isPrimary ? 'SSN (Last 4)' : 'Title / Role'}</label>
                  <input type="text" value={person.isPrimary ? person.ssn : person.title}
                    onChange={(e) => updatePerson(person.id, person.isPrimary ? 'ssn' : 'title', e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Title / Role</label>
                  <input type="text" value={person.title} onChange={(e) => updatePerson(person.id, 'title', e.target.value)}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Ownership %</label>
                  <input type="number" value={person.ownership} onChange={(e) => updatePerson(person.id, 'ownership', e.target.value)} max={100}
                    className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
                </div>
              </div>
              <div className="mt-2.5">
                <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Period of Authority</label>
                <input type="text" value={person.period} onChange={(e) => updatePerson(person.id, 'period', e.target.value)}
                  className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
              </div>

              {/* Toggle switches */}
              {[
                { field: 'checkSigning' as const, label: 'Check-signing authority?' },
                { field: 'financialDecision' as const, label: 'Financial decision authority?' },
                { field: 'hireFire' as const, label: 'Hire/fire authority?' },
                { field: 'madeDeposits' as const, label: 'Made federal tax deposits?' },
              ].map((sw) => (
                <label key={sw.field} className="flex items-center gap-2 mt-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={person[sw.field]}
                    onChange={() => updatePerson(person.id, sw.field, !person[sw.field])}
                    className="h-5 w-9 appearance-none rounded-full bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                      checked:after:translate-x-4"
                  />
                  <span className="text-xs font-medium text-[#64748B]">{sw.label}</span>
                </label>
              ))}

              <div className="mt-2.5 rounded-[10px] bg-[#FEF2F2] p-2.5">
                <div className="text-xs font-bold text-[#991B1B]">TFRP Exposure: $29,260</div>
                {person.isPrimary && <div className="text-[10.5px] text-[#991B1B] mt-0.5">100% of trust fund amount</div>}
              </div>
            </div>
          ))}

          {/* Add Person Button */}
          <button
            onClick={addPerson}
            className="flex items-center gap-1.5 rounded-lg bg-[#EFF4FF] px-3.5 py-2 text-xs font-semibold text-[#2563EB] mb-3 hover:bg-[#dbe4ff] transition-colors"
          >
            <i className="fa-solid fa-plus text-[10px]" /> Add Responsible Person
          </button>

          {/* Form 4180 */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-3">
            <div className="text-sm font-bold text-[#0A1628] mb-2">
              <i className="fa-solid fa-gavel text-xs text-[#2563EB] mr-1.5" /> Form 4180 Interview
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed mb-2">The IRS will interview each potential responsible person using Form 4180. Prepare thoroughly before the interview.</p>
            <button
              onClick={() => router.push('/analysis/tfrp/form-4180')}
              className="flex items-center gap-1.5 rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-5 py-3 text-[13px] font-semibold text-[#0A1628]"
            >
              Prepare for Form 4180 <i className="fa-solid fa-arrow-right text-[11px]" />
            </button>
          </div>

          {/* Letter 1153 */}
          <div className="rounded-2xl bg-white border border-[#F1F5F9] p-4 mb-4">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-sm text-[#E63946]" />
              <div>
                <span className="text-[13px] font-bold text-[#0A1628]">Letter 1153 Received?</span>
                <p className="text-[11.5px] text-[#64748B] mt-0.5">If yes, you have 60 days to appeal. Missing this deadline means automatic assessment.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 mt-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={letter1153}
                onChange={() => setLetter1153(!letter1153)}
                className="h-5 w-9 appearance-none rounded-full bg-[#E2E8F0] relative cursor-pointer transition-colors checked:bg-[#2563EB] shrink-0
                  after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform
                  checked:after:translate-x-4"
              />
              <span className="text-xs font-medium text-[#64748B]">Letter 1153 received?</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5 mt-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Date Received</label>
                <input type="date" value={letter1153Date} onChange={(e) => setLetter1153Date(e.target.value)}
                  className="w-full rounded-[10px] bg-[#F8FAFC] border-[1.5px] border-[#F1F5F9] py-2.5 px-3 text-sm font-semibold text-[#0A1628] outline-none focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-[0.04em] mb-1">Appeal Deadline</label>
                <div className="rounded-[10px] bg-[#FEF2F2] border-[1.5px] border-[#FEE2E2] py-2.5 px-3 text-sm font-bold text-[#991B1B]">--</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/analysis/tfrp/form-4180')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A1628] py-4 text-[15px] font-bold text-white"
          >
            Continue <i className="fa-solid fa-arrow-right text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
