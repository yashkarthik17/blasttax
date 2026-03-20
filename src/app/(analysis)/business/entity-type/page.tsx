'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ENTITY_TYPES = [
  { value: 'sole-proprietor', label: 'Sole Proprietor', icon: 'SP' },
  { value: 'partnership', label: 'Partnership', icon: 'PT' },
  { value: 'llc', label: 'LLC', icon: 'LLC' },
  { value: 's-corp', label: 'S-Corporation', icon: 'S' },
  { value: 'c-corp', label: 'C-Corporation', icon: 'C' },
] as const

const LLC_CLASSIFICATIONS = [
  'Disregarded Entity',
  'Partnership',
  'S-Corporation',
  'C-Corporation',
] as const

const IMPLICATIONS: Record<string, string> = {
  'sole-proprietor':
    'Sole Proprietor: Personal liability for all business taxes. Filed on Schedule C with Form 1040.',
  partnership:
    'Partnership: Form 1065 filing. Partners report income on K-1s. Employment taxes if employees exist.',
  llc: 'LLC: Tax treatment depends on classification election. See sub-selection below.',
  's-corp':
    'S-Corp: Form 1120-S + 941/940 employment taxes + K-1 pass-through to shareholders.',
  'c-corp':
    'C-Corp: Form 1120 corporate tax. Double taxation on distributions. 941/940 if employees.',
}

export default function EntityTypePage() {
  const router = useRouter()
  const [entityType, setEntityType] = useState<string | null>(null)
  const [llcClassification, setLlcClassification] = useState<string | null>(null)
  const [state, setState] = useState('')
  const [formationDate, setFormationDate] = useState('')
  const [naicsCode, setNaicsCode] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')

  const canContinue =
    entityType !== null &&
    (entityType !== 'llc' || llcClassification !== null) &&
    state.trim() !== '' &&
    formationDate !== ''

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 px-4 py-8">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Entity Classification
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Select your business entity type to determine applicable tax forms and resolution programs.
          </p>
        </div>

        <div className="space-y-6">
          {/* Entity Type Radio Cards */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="mb-4 font-medium text-white">Entity Type</p>
            <div className="grid gap-3">
              {ENTITY_TYPES.map((et) => (
                <button
                  key={et.value}
                  onClick={() => {
                    setEntityType(et.value)
                    if (et.value !== 'llc') setLlcClassification(null)
                  }}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                    entityType === et.value
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      entityType === et.value
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {et.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{et.label}</p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`h-5 w-5 rounded-full border-2 ${
                        entityType === et.value
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-zinc-600'
                      }`}
                    >
                      {entityType === et.value && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          className="h-full w-full p-0.5"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* LLC Sub-selection */}
          {entityType === 'llc' && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5">
              <p className="mb-4 font-medium text-white">
                LLC Tax Classification
              </p>
              <div className="flex flex-wrap gap-2">
                {LLC_CLASSIFICATIONS.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setLlcClassification(cls)}
                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                      llcClassification === cls
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Implications Display */}
          {entityType && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-amber-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="text-sm leading-relaxed text-amber-200/80">
                  {IMPLICATIONS[entityType]}
                </p>
              </div>
            </div>
          )}

          {/* State of Formation */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="mb-2 block font-medium text-white">
              State of Formation
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g., California"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
            />
          </div>

          {/* Date of Formation */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="mb-2 block font-medium text-white">
              Date of Formation
            </label>
            <input
              type="date"
              value={formationDate}
              onChange={(e) => setFormationDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-emerald-500 [color-scheme:dark]"
            />
          </div>

          {/* NAICS Code */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="mb-2 block font-medium text-white">
              NAICS Code / Principal Business Activity
            </label>
            <input
              type="text"
              value={naicsCode}
              onChange={(e) => setNaicsCode(e.target.value)}
              placeholder="e.g., 541211 - Offices of CPAs"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
            />
          </div>

          {/* Number of Employees */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <label className="mb-2 block font-medium text-white">
              Number of Employees
            </label>
            <input
              type="number"
              min="0"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-emerald-500"
            />
          </div>

          {/* Infobox */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5">
            <div className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-blue-400"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <p className="text-sm leading-relaxed text-zinc-400">
                Your entity type determines which tax forms you file, TFRP
                exposure, and available resolution programs.
              </p>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          disabled={!canContinue}
          onClick={() => router.push('/analysis/business/compliance')}
          className={`mt-10 w-full rounded-xl py-4 text-lg font-semibold transition-colors ${
            canContinue
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700'
              : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
