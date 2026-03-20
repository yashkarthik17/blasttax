'use client'

export default function NetworkError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6 text-center">
      {/* Wifi Off Icon */}
      <div className="mb-8">
        <div className="relative">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900">
            <svg className="h-10 w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
          </div>
          {/* Slash overlay */}
          <div className="absolute left-1/2 top-1/2 h-[3px] w-10 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-red-500" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="mb-3 text-2xl font-extrabold text-white">No Internet Connection</h1>
      <p className="mx-auto mb-10 max-w-[260px] text-sm text-zinc-500 leading-relaxed">
        Check your connection and try again. Your data is safe and will sync when you&apos;re back online.
      </p>

      {/* Buttons */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Retry
        </button>
        <button
          onClick={() => history.back()}
          className="flex items-center justify-center rounded-full border border-zinc-700 px-7 py-4 text-base font-bold text-zinc-300 transition-all hover:bg-zinc-800 active:scale-[0.98]"
        >
          Go Back
        </button>
      </div>

      {/* Reassurance */}
      <div className="mt-8 flex items-center gap-2">
        <svg className="h-3.5 w-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
        <span className="text-xs text-zinc-500">Your data is encrypted and saved locally</span>
      </div>
    </div>
  )
}
