'use client'

interface SummaryItem {
  label: string
  value: string
  highlight?: boolean
}

interface SubmitConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  summary?: SummaryItem[]
}

const DEFAULT_SUMMARY: SummaryItem[] = [
  { label: 'Form Type', value: 'OIC - Form 656' },
  { label: 'Total Debt', value: '$47,250' },
  { label: 'Offer Amount', value: '$8,500', highlight: true },
  { label: 'Tax Years', value: '2021, 2022, 2023' },
  { label: 'Documents', value: '7 attached' },
]

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  summary = DEFAULT_SUMMARY,
}: SubmitConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg animate-in slide-in-from-bottom rounded-t-3xl bg-zinc-900 px-6 pb-8 pt-3 shadow-2xl">
        {/* Handle bar */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-zinc-700" />

        {/* Icon + Title */}
        <div className="mb-5 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
            <svg className="h-6 w-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-white">Ready to Submit?</h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            Please review your information before submitting to the IRS.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-xl bg-zinc-800/50 px-4 py-1">
          {summary.map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-zinc-700/50 py-2.5 last:border-0">
              <span className="text-xs text-zinc-500">{item.label}</span>
              <span className={`text-sm font-semibold ${item.highlight ? 'text-emerald-400' : 'text-white'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Submit to IRS
          </button>
          <button
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-400 transition-all hover:border-zinc-600 hover:text-zinc-200"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Go Back &amp; Review
          </button>
        </div>
      </div>
    </div>
  )
}
