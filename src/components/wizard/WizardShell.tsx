'use client'

interface WizardShellProps {
  children: React.ReactNode
  title: string
  currentStep: number
  totalSteps: number
  onBack?: () => void
  onClose?: () => void
  showProgress?: boolean
}

export default function WizardShell({
  children,
  title,
  currentStep,
  totalSteps,
  onBack,
  onClose,
  showProgress = true,
}: WizardShellProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-800"
          aria-label="Go back"
        >
          {onBack ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          ) : (
            <span className="w-6" />
          )}
        </button>

        <h1 className="text-lg font-semibold text-zinc-100">{title}</h1>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-800"
          aria-label="Close wizard"
        >
          {onClose ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <span className="w-6" />
          )}
        </button>
      </header>

      {/* Progress Bar */}
      {showProgress && (
        <div className="px-4 pb-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-zinc-500">
            {currentStep} of {totalSteps}
          </p>
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-4 py-4">
        {children}
      </main>
    </div>
  )
}
