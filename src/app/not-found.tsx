import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6 text-center">
      {/* 404 Illustration */}
      <div className="mb-7">
        <div className="relative">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl border border-[#F0F0F5] bg-white">
            <svg className="h-9 w-9 text-[#8585A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15">
            <svg className="h-4 w-4 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Large 404 */}
      <span className="mb-2 text-5xl font-black text-[#1A1A2E]">404</span>

      {/* Heading */}
      <h1 className="mb-3 text-2xl font-extrabold text-[#1A1A2E]">Page Not Found</h1>
      <p className="mx-auto mb-10 max-w-[280px] text-sm text-[#8585A0] leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
      </p>

      {/* Buttons */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-4 text-base font-bold text-white transition-all hover:bg-[#1D4ED8] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go to Dashboard
        </Link>
        <Link
          href="javascript:history.back()"
          className="flex items-center justify-center rounded-full border border-[#D5D5E0] px-7 py-4 text-base font-bold text-[#334155] transition-all hover:bg-[#F0F0F5] active:scale-[0.98]"
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}
