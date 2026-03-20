'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

type EntityType = 'individual' | 'business' | 'both'
type DepthType = 'full' | 'quick' | 'penalty' | 'csed'

export default function AnalysisTypePage() {
  const router = useRouter()
  const setTaxpayerType = useWizard((s) => s.setTaxpayerType)
  const setAnswer = useWizard((s) => s.setAnswer)

  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null)
  const [selectedDepth, setSelectedDepth] = useState<DepthType | null>(null)
  const [showDepth, setShowDepth] = useState(false)

  function selectEntity(type: EntityType) {
    setSelectedEntity(type)
    if (!showDepth) setShowDepth(true)
  }

  function selectDepth(type: DepthType) {
    setSelectedDepth(type)
  }

  function handleContinue() {
    if (!selectedEntity || !selectedDepth) return
    const tp = selectedEntity === 'business' ? 'Business' : 'Individual'
    setTaxpayerType(tp)
    setAnswer('entityType', selectedEntity)
    setAnswer('analysisDepth', selectedDepth)
    router.push('/analysis/welcome')
  }

  const canContinue = selectedEntity !== null && selectedDepth !== null

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A1628] transition-colors hover:bg-[#F1F5F9]"
          >
            <i className="fa-solid fa-arrow-left text-base" />
          </button>
          <span className="text-[15px] font-semibold text-[#0A1628]">New Analysis</span>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6">
          {/* Heading */}
          <div className="pb-5 pt-1">
            <h1 className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-[#0A1628]">
              What type of tax debt?
            </h1>
            <p className="mt-1.5 text-[13px] text-[#94A3B8]">
              This determines which resolution paths we evaluate
            </p>
          </div>

          {/* Entity Type Selection */}
          <div className="space-y-2.5">
            {/* Individual */}
            <button
              onClick={() => selectEntity('individual')}
              className={`relative flex w-full items-center gap-3.5 rounded-[16px] border-2 p-[18px_16px] text-left transition-all active:scale-[0.98] ${
                selectedEntity === 'individual'
                  ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.08)]'
                  : 'border-[#F1F5F9] bg-white hover:-translate-y-0.5'
              }`}
            >
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[#0A1628] text-[22px] text-white">
                <i className="fa-solid fa-user" />
              </div>
              <div className="flex-1 pr-2">
                <div className="text-[15px] font-bold text-[#0A1628]">Individual (1040)</div>
                <div className="mt-0.5 text-[13px] leading-snug text-[#94A3B8]">Personal income tax debt</div>
              </div>
              <div
                className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  selectedEntity === 'individual'
                    ? 'border-[#2563EB] bg-[#2563EB]'
                    : 'border-[#F1F5F9]'
                }`}
              >
                {selectedEntity === 'individual' && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
              {/* Most Common badge */}
              <div className="absolute -top-px right-4 rounded-b-lg bg-[#0A1628] px-2.5 py-[3px_10px_4px] text-[9px] font-bold uppercase tracking-[0.04em] text-white">
                Most Common
              </div>
            </button>

            {/* Business */}
            <button
              onClick={() => selectEntity('business')}
              className={`flex w-full items-center gap-3.5 rounded-[16px] border-2 p-[18px_16px] text-left transition-all active:scale-[0.98] ${
                selectedEntity === 'business'
                  ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.08)]'
                  : 'border-[#F1F5F9] bg-white hover:-translate-y-0.5'
              }`}
            >
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[#0D9488] text-[22px] text-white">
                <i className="fa-solid fa-building" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold text-[#0A1628]">Business (941/940)</div>
                <div className="mt-0.5 text-[13px] leading-snug text-[#94A3B8]">Payroll tax / employment tax</div>
              </div>
              <div
                className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  selectedEntity === 'business'
                    ? 'border-[#2563EB] bg-[#2563EB]'
                    : 'border-[#F1F5F9]'
                }`}
              >
                {selectedEntity === 'business' && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </button>

            {/* Both */}
            <button
              onClick={() => selectEntity('both')}
              className={`flex w-full items-center gap-3.5 rounded-[16px] border-2 p-[18px_16px] text-left transition-all active:scale-[0.98] ${
                selectedEntity === 'both'
                  ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.08)]'
                  : 'border-[#F1F5F9] bg-white hover:-translate-y-0.5'
              }`}
            >
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[16px] bg-[#7C3AED] text-[22px] text-white">
                <i className="fa-solid fa-users" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold text-[#0A1628]">Both Individual & Business</div>
                <div className="mt-0.5 text-[13px] leading-snug text-[#94A3B8]">I have both types of debt</div>
              </div>
              <div
                className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  selectedEntity === 'both'
                    ? 'border-[#2563EB] bg-[#2563EB]'
                    : 'border-[#F1F5F9]'
                }`}
              >
                {selectedEntity === 'both' && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>

          {/* Analysis Depth (shown after entity selection) */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showDepth ? 'mt-6 max-h-[600px] opacity-100' : 'mt-0 max-h-0 opacity-0'
            }`}
          >
            <div className="mb-3.5">
              <div className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#CBD5E1]">
                Analysis Depth
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Full Resolution */}
              <button
                onClick={() => selectDepth('full')}
                className={`flex w-full items-center gap-3 rounded-[14px] border-[1.5px] p-3.5 text-left transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  selectedDepth === 'full'
                    ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                    : 'border-[#F1F5F9] bg-white'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FF] text-[16px] text-[#0A1628]">
                  <i className="fa-solid fa-compass" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#0A1628]">Full Resolution Analysis</span>
                    <span className="inline-flex items-center gap-[3px] rounded-md bg-[rgba(10,22,40,0.08)] px-[7px] py-0.5 text-[9px] font-bold uppercase tracking-[0.03em] text-[#2563EB]">
                      <i className="fa-solid fa-star text-[7px]" /> Recommended
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-[#94A3B8]">Complete assessment of all 13+ resolution options</div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selectedDepth === 'full'
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-[#F1F5F9]'
                  }`}
                >
                  {selectedDepth === 'full' && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                </div>
              </button>

              {/* Quick Check */}
              <button
                onClick={() => selectDepth('quick')}
                className={`flex w-full items-center gap-3 rounded-[14px] border-[1.5px] p-3.5 text-left transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  selectedDepth === 'quick'
                    ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                    : 'border-[#F1F5F9] bg-white'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF3C7] text-[16px] text-[#D97706]">
                  <i className="fa-solid fa-bolt" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0A1628]">Quick Eligibility Check</div>
                  <div className="mt-0.5 text-xs leading-snug text-[#94A3B8]">Fast screening for common resolution types</div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selectedDepth === 'quick'
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-[#F1F5F9]'
                  }`}
                >
                  {selectedDepth === 'quick' && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                </div>
              </button>

              {/* Penalty Review */}
              <button
                onClick={() => selectDepth('penalty')}
                className={`flex w-full items-center gap-3 rounded-[14px] border-[1.5px] p-3.5 text-left transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  selectedDepth === 'penalty'
                    ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                    : 'border-[#F1F5F9] bg-white'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F0FF] text-[16px] text-[#7C3AED]">
                  <i className="fa-solid fa-eraser" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0A1628]">Penalty Review Only</div>
                  <div className="mt-0.5 text-xs leading-snug text-[#94A3B8]">Check penalty abatement eligibility</div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selectedDepth === 'penalty'
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-[#F1F5F9]'
                  }`}
                >
                  {selectedDepth === 'penalty' && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                </div>
              </button>

              {/* CSED Calculator */}
              <button
                onClick={() => selectDepth('csed')}
                className={`flex w-full items-center gap-3 rounded-[14px] border-[1.5px] p-3.5 text-left transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  selectedDepth === 'csed'
                    ? 'border-[#2563EB] bg-[#EFF4FF] shadow-[0_0_0_2px_rgba(10,22,40,0.06)]'
                    : 'border-[#F1F5F9] bg-white'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDFA] text-[16px] text-[#0D9488]">
                  <i className="fa-solid fa-clock" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0A1628]">CSED Calculator</div>
                  <div className="mt-0.5 text-xs leading-snug text-[#94A3B8]">Calculate when your debts expire</div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selectedDepth === 'csed'
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-[#F1F5F9]'
                  }`}
                >
                  {selectedDepth === 'csed' && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                </div>
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`mt-5 w-full rounded-full py-[15px] text-[15px] font-bold transition-all ${
              canContinue
                ? 'bg-[#00A651] text-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 active:scale-[0.97]'
                : 'pointer-events-none bg-[#E2E8F0] text-[#CBD5E1]'
            }`}
          >
            Continue <i className="fa-solid fa-arrow-right ml-1 text-[13px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
