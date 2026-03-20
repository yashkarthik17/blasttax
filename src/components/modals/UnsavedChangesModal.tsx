'use client'

interface UnsavedChangesModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onDiscard: () => void
}

export default function UnsavedChangesModal({
  isOpen,
  onClose,
  onConfirm,
  onDiscard,
}: UnsavedChangesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xs animate-in zoom-in-95 slide-in-from-bottom-4 rounded-3xl bg-zinc-900 px-6 pb-6 pt-7 text-center shadow-2xl ring-1 ring-zinc-800">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15">
          <svg className="h-7 w-7 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="mb-2 text-xl font-extrabold text-white">Unsaved Changes</h2>
        <p className="mb-7 text-sm text-zinc-500 leading-relaxed">
          You have unsaved changes. Do you want to save before leaving?
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Save &amp; Leave
          </button>
          <button
            onClick={onDiscard}
            className="w-full rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-400 transition-all hover:border-zinc-600 hover:text-zinc-200"
          >
            Discard
          </button>
          <button
            onClick={onClose}
            className="w-full px-7 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Stay on this page
          </button>
        </div>
      </div>
    </div>
  )
}
