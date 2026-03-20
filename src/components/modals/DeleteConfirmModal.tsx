'use client'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Document?',
  description = 'This action cannot be undone. The document and all associated data will be permanently removed.',
}: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-xs animate-in zoom-in-95 slide-in-from-bottom-4 rounded-3xl bg-zinc-900 px-6 pb-6 pt-7 text-center shadow-2xl ring-1 ring-zinc-800">
        {/* Warning icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15">
          <svg className="h-7 w-7 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="mb-2 text-xl font-extrabold text-white">{title}</h2>
        <p className="mb-7 text-sm text-zinc-500 leading-relaxed">{description}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onConfirm}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-400 active:scale-[0.97]"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full px-7 py-3 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
