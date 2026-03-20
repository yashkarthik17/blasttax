'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface Specialty {
  id: string
  label: string
  description: string
  iconBg: string
  iconColor: string
  icon: React.ReactNode
}

const SPECIALTIES: Specialty[] = [
  {
    id: 'lien-levy',
    label: 'Tax Lien or Levy',
    description: 'Received notice of federal tax lien or bank levy',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-[#E63946]',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'military',
    label: 'Active-Duty Military',
    description: 'Currently serving or recently returned from deployment',
    iconBg: 'bg-[#2563EB]/15',
    iconColor: 'text-[#2563EB]',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'fbar',
    label: 'Foreign Bank Accounts',
    description: 'Accounts over $10,000 combined in foreign banks',
    iconBg: 'bg-teal-500/15',
    iconColor: 'text-teal-400',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'deceased',
    label: 'Deceased Taxpayer',
    description: 'Handling tax matters for someone who has passed',
    iconBg: 'bg-[#E2E8F0]/50',
    iconColor: 'text-[#64748B]',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'sfr',
    label: 'IRS Filed My Return',
    description: 'IRS created a Substitute for Return (SFR)',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'passport',
    label: 'Passport Issue',
    description: 'Passport denied or revoked due to tax debt',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM7 10.5a3 3 0 016 0V11H7v-.5z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'injured-spouse',
    label: 'Injured Spouse',
    description: "Want to protect your refund from spouse's debt",
    iconBg: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>,
  },
  {
    id: 'audit',
    label: 'Audited by IRS',
    description: 'Received an audit notice or disagreed with results',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>,
  },
]

/* ------------------------------------------------------------------ */
/* Page Component                                                      */
/* ------------------------------------------------------------------ */

export default function SituationScreeningPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [noneSelected, setNoneSelected] = useState(false)

  function toggleCard(id: string) {
    setNoneSelected(false)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function selectNone() {
    setSelected(new Set())
    setNoneSelected(true)
  }

  const canContinue = selected.size > 0 || noneSelected

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Progress */}
      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
          <div className="h-full rounded-full bg-[#2563EB] transition-all duration-500" style={{ width: '45%' }} />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#94A3B8]">Step 3 of 6</span>
          <span className="text-xs font-semibold text-[#2563EB]">Special Circumstances</span>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A1628] leading-tight">
          Do any of these apply to you?
        </h1>
        <p className="mt-1.5 text-sm text-[#94A3B8]">
          These help us find additional relief options. Select all that apply.
        </p>
      </div>

      {/* Toggle Cards */}
      <div className="space-y-2.5">
        {SPECIALTIES.map((spec) => {
          const isSelected = selected.has(spec.id)
          return (
            <button
              key={spec.id}
              type="button"
              onClick={() => toggleCard(spec.id)}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                isSelected
                  ? 'border-[#E2E8F0] bg-[#2563EB]/10 ring-1 ring-blue-500/20'
                  : 'border-[#F1F5F9] bg-white hover:border-[#E2E8F0]'
              }`}
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${spec.iconBg} ${spec.iconColor}`}>
                {spec.icon}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[#0A1628]">{spec.label}</span>
                <span className="block text-xs text-[#94A3B8]">{spec.description}</span>
              </div>
              <div
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                  isSelected ? 'scale-100 bg-white opacity-100' : 'scale-75 bg-[#E2E8F0] opacity-0'
                }`}
              >
                <svg className="h-3 w-3 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      {/* None of these apply */}
      <div className="text-center">
        <button
          type="button"
          onClick={selectNone}
          className={`text-sm font-semibold transition-colors ${noneSelected ? 'text-[#0A1628]' : 'text-[#94A3B8] hover:text-[#334155]'}`}
        >
          None of these apply
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => router.back()}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] transition-all hover:bg-[#E2E8F0] hover:text-[#0A1628]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </button>
        <button
          onClick={() => router.push('/household')}
          disabled={!canContinue}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2563EB] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#1D4ED8] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          Continue
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
