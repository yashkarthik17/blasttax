'use client'

import { useRouter } from 'next/navigation'

export default function SessionTimeout() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6 text-center">
      {/* Lock Icon */}
      <div className="mb-8">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-blue-500/10 bg-blue-500/10">
          <svg className="h-9 w-9 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="mb-3 text-2xl font-extrabold text-white">Session Expired</h1>
      <p className="mx-auto mb-10 max-w-[280px] text-sm text-zinc-500 leading-relaxed">
        For your security, you&apos;ve been signed out after a period of inactivity.
      </p>

      {/* Sign Back In Button */}
      <div className="w-full max-w-xs">
        <button
          onClick={() => router.push('/login')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign Back In
        </button>
      </div>

      {/* Reassurance */}
      <div className="mt-7 flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/10 px-5 py-3">
        <svg className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm text-emerald-300">Your progress has been saved</span>
      </div>
    </div>
  )
}
