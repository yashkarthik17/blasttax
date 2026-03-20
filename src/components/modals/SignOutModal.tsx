'use client'

interface SignOutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function SignOutModal({ isOpen, onClose, onConfirm }: SignOutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xs animate-in zoom-in-95 slide-in-from-bottom-4 rounded-3xl bg-zinc-900 px-6 pb-6 pt-8 text-center shadow-2xl ring-1 ring-zinc-800">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/15">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>

        {/* Heading */}
        <div className="mb-2 text-xl font-extrabold text-white">Sign Out?</div>
        <div className="text-sm text-zinc-400">Are you sure you want to sign out?</div>
        <div className="mb-6 mt-1.5 text-xs text-zinc-500">
          Your data is saved and will be here when you return.
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15 active:scale-[0.97]"
          >
            Sign Out
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-semibold text-zinc-400 transition-all hover:border-zinc-600 hover:text-zinc-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
