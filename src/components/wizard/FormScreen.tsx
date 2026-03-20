'use client'

interface FormScreenProps {
  title: string
  description?: string
  children: React.ReactNode
  onNext: () => void
  onBack?: () => void
  isValid: boolean
}

export default function FormScreen({
  title,
  description,
  children,
  onNext,
  onBack,
  isValid,
}: FormScreenProps) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Title & Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
        )}
      </div>

      {/* Form Content */}
      <div className="flex-1 space-y-4">
        {children}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3 pb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border border-zinc-700 py-4 text-base font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`flex-1 rounded-xl py-4 text-base font-semibold transition-colors ${
            isValid
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700'
              : 'cursor-not-allowed bg-zinc-800 text-zinc-600'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
