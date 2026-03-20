'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COUNTY_DATA: Record<string, string[]> = {
  FL: ['Miami-Dade', 'Broward', 'Palm Beach', 'Hillsborough', 'Orange', 'Pinellas', 'Lee', 'Sarasota'],
  TX: ['Harris', 'Dallas', 'Tarrant', 'Bexar', 'Travis', 'Galveston', 'Jefferson', 'Chambers'],
  CA: ['Los Angeles', 'San Bernardino', 'Ventura', 'Santa Barbara', 'San Diego', 'Riverside', 'Butte', 'Sonoma'],
  LA: ['Orleans', 'Jefferson', 'East Baton Rouge', 'Caddo', 'Calcasieu', 'St. Tammany'],
  NC: ['Buncombe', 'Henderson', 'Mecklenburg', 'Wake', 'Watauga', 'Avery'],
}

const DISASTER_COUNTIES: Record<string, string[]> = {
  FL: ['Miami-Dade', 'Broward', 'Palm Beach', 'Hillsborough', 'Pinellas', 'Lee', 'Sarasota'],
  TX: ['Harris', 'Galveston', 'Jefferson', 'Chambers'],
  CA: ['Los Angeles', 'San Bernardino', 'Ventura', 'Santa Barbara', 'Butte', 'Sonoma'],
  LA: ['Orleans', 'Jefferson', 'Calcasieu', 'St. Tammany'],
  NC: ['Buncombe', 'Henderson', 'Watauga', 'Avery'],
}

const COVERAGE_ITEMS = [
  'Filing deadline extensions',
  'Payment deadline extensions',
  'FTF and FTP penalty abatement',
  'Interest abatement (sometimes)',
  'Estimated tax penalty waiver',
]

export default function PenaltyDisasterPage() {
  const router = useRouter()
  const [selectedState, setSelectedState] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [eligibilityResult, setEligibilityResult] = useState<'eligible' | 'not-eligible' | 'missing' | null>(null)

  const counties = selectedState ? COUNTY_DATA[selectedState] || [] : []

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedCounty('')
    setEligibilityResult(null)
  }

  const checkEligibility = () => {
    if (!selectedState || !selectedCounty) {
      setEligibilityResult('missing')
      return
    }
    const isDisaster = DISASTER_COUNTIES[selectedState]?.includes(selectedCounty)
    setEligibilityResult(isDisaster ? 'eligible' : 'not-eligible')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all hover:bg-[#EFF4FF]"
        >
          <svg className="h-3.5 w-3.5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-[0.95rem] font-extrabold text-[#0A1628]">Disaster Relief</div>
        <div className="w-9 shrink-0" />
      </div>

      <div className="flex flex-col gap-3.5 px-5 pb-8">
        {/* Heading */}
        <div className="text-center py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1 text-[0.65rem] font-bold text-[#D97706] mb-2.5">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4l7.53 14H4.47L12 6z"/></svg>
            FEMA RELIEF
          </span>
          <h1 className="text-[1.3rem] font-extrabold text-[#0A1628] leading-tight tracking-tight">
            Tax Relief for Disaster Areas
          </h1>
        </div>

        {/* Explanation */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 px-4">
          <p className="text-[0.78rem] text-[#64748B] leading-relaxed">
            When FEMA declares a federal disaster area, the IRS automatically extends deadlines and may abate penalties for taxpayers in affected regions.
          </p>
        </div>

        {/* Check Your Area */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#FFF7ED]">
              <svg className="h-3 w-3 text-[#D97706]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <span className="text-[0.85rem] font-bold text-[#0A1628]">Check Your Area</span>
          </div>

          <div className="mb-2.5">
            <label className="block text-[0.68rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">State</label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-[0.8rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,61,165,0.08)] transition-all appearance-none"
            >
              <option value="">Select your state...</option>
              <option value="FL">Florida</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="LA">Louisiana</option>
              <option value="NC">North Carolina</option>
            </select>
          </div>

          <div className="mb-3.5">
            <label className="block text-[0.68rem] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              disabled={!selectedState}
              className="w-full rounded-[10px] border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-[0.8rem] font-semibold text-[#0A1628] outline-none focus:border-[#0A1628] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,61,165,0.08)] transition-all appearance-none disabled:opacity-50"
            >
              <option value="">{selectedState ? 'Select your county...' : 'Select state first...'}</option>
              {counties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>

          <button
            onClick={checkEligibility}
            className="w-full rounded-xl bg-[#0A1628] py-3 text-center text-white text-[0.82rem] font-bold transition-all hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <svg className="inline-block h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Check Eligibility
          </button>

          {/* Result */}
          {eligibilityResult === 'missing' && (
            <div className="mt-3.5 rounded-xl border border-[#FED7AA] bg-[#FFF7ED] px-3.5 py-3">
              <div className="flex items-center gap-2">
                <svg className="h-3.5 w-3.5 text-[#D97706]" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                <span className="text-[0.78rem] font-semibold text-[#92400E]">Please select both state and county.</span>
              </div>
            </div>
          )}
          {eligibilityResult === 'eligible' && (
            <div className="mt-3.5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <svg className="h-3.5 w-3.5 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span className="text-[0.82rem] font-bold text-[#065F46]">Your county IS in a declared disaster area</span>
              </div>
              <p className="text-[0.72rem] text-[#065F46] leading-relaxed">
                {selectedCounty} County, {selectedState} qualifies for automatic tax deadline extensions and penalty relief.
              </p>
            </div>
          )}
          {eligibilityResult === 'not-eligible' && (
            <div className="mt-3.5 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <svg className="h-3.5 w-3.5 text-[#EF4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                <span className="text-[0.82rem] font-bold text-[#991B1B]">Your county is NOT in a declared disaster area</span>
              </div>
              <p className="text-[0.72rem] text-[#991B1B] leading-relaxed">
                {selectedCounty} County, {selectedState} is not currently covered. Check other penalty relief options.
              </p>
            </div>
          )}
        </div>

        {/* Current Declarations Label */}
        <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider px-1">
          Current Disaster Declarations
        </div>

        {/* Disaster 1 */}
        <div className="rounded-[14px] border border-[#E2E8F0] bg-white p-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F1]">
              <svg className="h-3 w-3 text-[#E63946]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.82rem] font-bold text-[#0A1628]">Hurricane Milton</div>
              <div className="text-[0.68rem] text-[#94A3B8]">FL, TX &mdash; Extended to Oct 15, 2026</div>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <span className="rounded-md bg-[#FFF0F1] px-2 py-0.5 text-[0.62rem] font-semibold text-[#E63946]">FEMA-4831</span>
            <span className="rounded-md bg-[#E6F9EE] px-2 py-0.5 text-[0.62rem] font-semibold text-[#00A651]">Active</span>
          </div>
        </div>

        {/* Disaster 2 */}
        <div className="rounded-[14px] border border-[#E2E8F0] bg-white p-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF7ED]">
              <svg className="h-3 w-3 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.82rem] font-bold text-[#0A1628]">California Wildfires</div>
              <div className="text-[0.68rem] text-[#94A3B8]">CA &mdash; Extended to Jun 15, 2026</div>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <span className="rounded-md bg-[#FFF7ED] px-2 py-0.5 text-[0.62rem] font-semibold text-[#D97706]">FEMA-4815</span>
            <span className="rounded-md bg-[#E6F9EE] px-2 py-0.5 text-[0.62rem] font-semibold text-[#00A651]">Active</span>
          </div>
        </div>

        {/* What's Covered */}
        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="text-[0.7rem] font-bold text-[#CBD5E1] uppercase tracking-wider mb-3">What&apos;s Covered</div>
          {COVERAGE_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2 py-[7px]">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#00A651] shrink-0">
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[0.78rem] font-medium text-[#0A1628]">{item}</span>
            </div>
          ))}
        </div>

        {/* No Action Needed Callout */}
        <div className="flex items-start gap-2.5 rounded-[14px] border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3.5">
          <svg className="h-3.5 w-3.5 text-[#10B981] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p className="text-[0.75rem] text-[#065F46] leading-relaxed font-medium">
            <strong>No action needed:</strong> Relief is automatic if your address on file with the IRS is in the declared disaster area.
          </p>
        </div>

        {/* What If Not Automatic */}
        <div className="flex items-start gap-2.5 rounded-[14px] border border-[#C5D5F5] bg-[#EBF0FF] px-4 py-3.5">
          <svg className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <p className="text-[0.75rem] text-[#1E40AF] leading-relaxed font-medium">
            <strong>Not applied automatically?</strong> Call the IRS at 866-562-5227 or submit Form 4506-T to verify your address is linked to the disaster area.
          </p>
        </div>

        {/* Learn More Link */}
        <div className="text-center py-1">
          <a
            href="https://www.irs.gov/newsroom/tax-relief-in-disaster-situations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#2563EB] no-underline"
          >
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            View IRS Disaster Relief Page
          </a>
        </div>
      </div>
    </div>
  )
}
