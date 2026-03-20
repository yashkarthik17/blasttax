'use client'

import { useRouter } from 'next/navigation'
import { useWizard } from '@/hooks/useWizard'

export default function AnalysisTypePage() {
  const router = useRouter()
  const setTaxpayerType = useWizard((s) => s.setTaxpayerType)

  function select(type: 'Individual' | 'Business') {
    setTaxpayerType(type)
    router.push('/analysis/welcome')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            What type of tax issue?
          </h1>
          <p className="mt-3 text-base text-zinc-400">
            Select the category that best describes your situation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5">
          {/* Individual Card */}
          <button
            onClick={() => select('Individual')}
            className="group flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-800/70 active:scale-[0.98]"
          >
            {/* Person Silhouette Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">Individual</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                For personal income tax issues (Form 1040)
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-zinc-600 transition-colors group-hover:text-emerald-400"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Business Card */}
          <button
            onClick={() => select('Business')}
            className="group flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition-all hover:border-blue-500/50 hover:bg-zinc-800/70 active:scale-[0.98]"
          >
            {/* Building Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">Business</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                For business tax issues (Form 941/940/1120)
              </p>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-zinc-600 transition-colors group-hover:text-blue-400"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
