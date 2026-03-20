'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ResponsiblePerson {
  id: string
  name: string
  title: string
  ssn: string
  ownershipPercent: string
  checkSigning: boolean
  financialControl: boolean
  hireFireAuthority: boolean
  periodStart: string
  periodEnd: string
  awarenessOfNonPayment: boolean
}

let nextId = 1

export default function TFRPPersonsPage() {
  const router = useRouter()
  const [persons, setPersons] = useState<ResponsiblePerson[]>([])

  // In production this would come from business analysis store
  const trustFundTotal = 45000

  function addPerson() {
    setPersons((prev) => [
      ...prev,
      {
        id: String(nextId++),
        name: '',
        title: '',
        ssn: '',
        ownershipPercent: '',
        checkSigning: false,
        financialControl: false,
        hireFireAuthority: false,
        periodStart: '',
        periodEnd: '',
        awarenessOfNonPayment: false,
      },
    ])
  }

  function updatePerson(
    id: string,
    field: keyof ResponsiblePerson,
    value: string | boolean
  ) {
    setPersons((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  function removePerson(id: string) {
    setPersons((prev) => prev.filter((p) => p.id !== id))
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Responsible Persons
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Identify individuals who may be held personally liable for TFRP.
          </p>
        </div>

        {/* Warning */}
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-red-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-sm leading-relaxed text-red-200/70">
              Each responsible person is liable for the FULL amount — no pro-rata
              split. The IRS can collect 100% from any single responsible person.
            </p>
          </div>
        </div>

        {/* Persons List */}
        <div className="space-y-4">
          {persons.map((person) => (
            <div
              key={person.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium text-white">
                  {person.name || 'New Person'}
                </p>
                <button
                  onClick={() => removePerson(person.id)}
                  className="text-xs text-zinc-500 transition-colors hover:text-red-400"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="mb-1 block text-xs text-zinc-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) =>
                      updatePerson(person.id, 'name', e.target.value)
                    }
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Title & SSN */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Title / Role
                    </label>
                    <input
                      type="text"
                      value={person.title}
                      onChange={(e) =>
                        updatePerson(person.id, 'title', e.target.value)
                      }
                      placeholder="CEO, CFO, etc."
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      SSN
                    </label>
                    <input
                      type="text"
                      value={person.ssn}
                      onChange={(e) =>
                        updatePerson(person.id, 'ssn', e.target.value)
                      }
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Ownership */}
                <div>
                  <label className="mb-1 block text-xs text-zinc-500">
                    Ownership %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={person.ownershipPercent}
                    onChange={(e) =>
                      updatePerson(person.id, 'ownershipPercent', e.target.value)
                    }
                    placeholder="0"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Authority Indicators */}
                <div>
                  <label className="mb-2 block text-xs text-zinc-500">
                    Authority Indicators
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        field: 'checkSigning' as const,
                        label: 'Check-Signing',
                      },
                      {
                        field: 'financialControl' as const,
                        label: 'Financial Control',
                      },
                      {
                        field: 'hireFireAuthority' as const,
                        label: 'Hire/Fire Authority',
                      },
                      {
                        field: 'awarenessOfNonPayment' as const,
                        label: 'Aware of Non-Payment',
                      },
                    ].map(({ field, label }) => (
                      <button
                        key={field}
                        onClick={() =>
                          updatePerson(person.id, field, !person[field])
                        }
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          person[field]
                            ? 'bg-red-500/15 text-red-400'
                            : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period of Authority */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Period Start
                    </label>
                    <input
                      type="date"
                      value={person.periodStart}
                      onChange={(e) =>
                        updatePerson(person.id, 'periodStart', e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-zinc-500">
                      Period End
                    </label>
                    <input
                      type="date"
                      value={person.periodEnd}
                      onChange={(e) =>
                        updatePerson(person.id, 'periodEnd', e.target.value)
                      }
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* TFRP Exposure */}
                <div className="rounded-lg bg-red-500/10 p-3 text-center">
                  <p className="text-xs text-zinc-400">TFRP Exposure</p>
                  <p className="text-sm font-bold text-red-400">
                    Liable for 100% of ${fmt(trustFundTotal)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPerson}
            className="w-full rounded-xl border-2 border-dashed border-zinc-700 py-4 text-sm font-semibold text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            + Add Responsible Person
          </button>
        </div>

        {/* Continue */}
        <button
          onClick={() => router.push('/analysis/tfrp/form-4180')}
          className="mt-10 w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Continue to Form 4180 Prep
        </button>
      </div>
    </div>
  )
}
