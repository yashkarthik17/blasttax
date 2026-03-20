'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

// ---------------------------------------------------------------------------
// Processing steps
// ---------------------------------------------------------------------------

const STEPS = [
  { label: 'Calculating assets...', duration: 1200 },
  { label: 'Computing income & expenses...', duration: 1400 },
  { label: 'Evaluating resolution programs...', duration: 1800 },
  { label: 'Generating results...', duration: 1000 },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProcessingPage() {
  const router = useRouter()
  const caseId = useWizard((s) => s.caseId)
  const answers = useWizard((s) => s.answers)
  const setAnswers = useWizard((s) => s.setAnswers)

  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false)
  const hasStarted = useRef(false)

  async function runAnalysis() {
    setError(null)
    setRetrying(false)

    // Step through visual progress
    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStep(i)
      await new Promise((r) => setTimeout(r, STEPS[i].duration))
    }

    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, answers }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Server error (${res.status})`)
      }

      const data = await res.json()
      setAnswers({ calculationResult: data })
      router.push('/analysis/results')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(msg)
    }
  }

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    runAnalysis()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRetry() {
    setRetrying(true)
    hasStarted.current = false
    setCurrentStep(0)
    runAnalysis()
  }

  const progress = error
    ? 100
    : Math.round(((currentStep + 1) / STEPS.length) * 100)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md text-center">
        {/* Spinner */}
        {!error && (
          <div className="mb-8 flex justify-center">
            <div className="relative h-20 w-20">
              {/* Track */}
              <svg className="h-20 w-20" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#27272a"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 213.6} 213.6`}
                  className="origin-center -rotate-90 transition-all duration-500"
                />
              </svg>
              {/* Percentage */}
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                {progress}%
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-white">
          {error ? 'Something went wrong' : 'Analyzing Your Case'}
        </h1>
        <p className="mb-8 text-sm text-zinc-400">
          {error
            ? 'We encountered an error while processing your data.'
            : 'Please wait while we crunch the numbers...'}
        </p>

        {/* Steps */}
        {!error && (
          <div className="space-y-3 text-left">
            {STEPS.map((step, i) => {
              let status: 'done' | 'active' | 'pending' = 'pending'
              if (i < currentStep) status = 'done'
              else if (i === currentStep) status = 'active'

              return (
                <div key={step.label} className="flex items-center gap-3">
                  {/* Icon */}
                  {status === 'done' ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : status === 'active' ? (
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-zinc-700" />
                    </div>
                  )}
                  <span
                    className={`text-sm ${
                      status === 'done'
                        ? 'text-zinc-400'
                        : status === 'active'
                          ? 'font-medium text-white'
                          : 'text-zinc-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="w-full rounded-xl bg-emerald-600 py-4 text-base font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
            >
              {retrying ? 'Retrying...' : 'Retry Analysis'}
            </button>
            <button
              onClick={() => router.push('/analysis/verification')}
              className="w-full rounded-xl border border-zinc-700 py-3 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
            >
              Go Back and Review Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
