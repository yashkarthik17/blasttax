'use client'

interface HeaderProps {
  showNotification?: boolean
}

export default function Header({ showNotification = false }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-zinc-950 px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#059669" />
          <path
            d="M8 12h16M8 16h12M8 20h8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-lg font-bold text-white">BlastTax</span>
      </div>

      {/* Notification Bell */}
      <button
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-800"
        aria-label="Notifications"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-400"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {showNotification && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        )}
      </button>
    </header>
  )
}
