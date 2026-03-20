'use client'

interface ConsentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConsentModal({ isOpen, onClose, onConfirm }: ConsentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Banner */}
      <div className="relative z-10 w-full max-w-lg animate-in slide-in-from-bottom rounded-t-3xl bg-zinc-900 px-6 pb-8 pt-5 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-zinc-500 transition-colors hover:text-zinc-300"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Lock icon + message */}
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
            <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white">We protect your data</div>
            <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
              We use secure, encrypted storage to protect your information. By continuing, you agree to our{' '}
              <a href="/terms" className="font-semibold text-blue-400 hover:text-blue-300">Terms of Service</a> and{' '}
              <a href="/privacy" className="font-semibold text-blue-400 hover:text-blue-300">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-emerald-500 active:scale-[0.98]"
          >
            Accept
          </button>
          <button
            onClick={onClose}
            className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
