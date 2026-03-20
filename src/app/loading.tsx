export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <div className="flex flex-1 flex-col gap-5 px-5 pb-24 pt-4">
        {/* Header skeleton: avatar + text */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-800" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-24 animate-pulse rounded-md bg-zinc-800" />
              <div className="h-2.5 w-36 animate-pulse rounded-md bg-zinc-800" style={{ animationDelay: '0.15s' }} />
            </div>
          </div>
          <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-800" style={{ animationDelay: '0.15s' }} />
        </div>

        {/* Hero card skeleton */}
        <div className="h-36 w-full animate-pulse rounded-2xl bg-zinc-800" style={{ animationDelay: '0.15s' }} />

        {/* 2x2 grid of card skeletons */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 animate-pulse rounded-2xl bg-zinc-800" style={{ animationDelay: '0.3s' }} />
          <div className="h-24 animate-pulse rounded-2xl bg-zinc-800" style={{ animationDelay: '0.4s' }} />
          <div className="h-24 animate-pulse rounded-2xl bg-zinc-800" style={{ animationDelay: '0.5s' }} />
          <div className="h-24 animate-pulse rounded-2xl bg-zinc-800" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Section header skeleton */}
        <div className="mt-1 h-2.5 w-28 animate-pulse rounded-md bg-zinc-800" style={{ animationDelay: '0.5s' }} />

        {/* List item skeletons (3 rows) */}
        <div className="flex flex-col gap-1">
          {[0.5, 0.6, 0.7].map((delay, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-zinc-800/50 py-3 last:border-0">
              <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-xl bg-zinc-800" style={{ animationDelay: `${delay}s` }} />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="h-3 w-[70%] animate-pulse rounded-md bg-zinc-800" style={{ animationDelay: `${delay}s` }} />
                <div className="h-2.5 w-[45%] animate-pulse rounded-md bg-zinc-800" style={{ animationDelay: `${delay + 0.1}s` }} />
              </div>
              <div className="h-3 w-12 animate-pulse rounded-md bg-zinc-800" style={{ animationDelay: `${delay + 0.1}s` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
