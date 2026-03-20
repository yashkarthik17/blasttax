'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Home', href: '/dashboard', icon: 'fas fa-house' },
  { label: 'Resolve', href: '/resolution', icon: 'fas fa-scale-balanced' },
  { label: 'AI Chat', href: '/chat', icon: 'fas fa-sparkles' },
  { label: 'Learn', href: '/learn', icon: 'fas fa-book-open' },
  { label: 'Account', href: '/account', icon: 'fas fa-user' },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:w-[240px] xl:w-[260px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:border-r"
      style={{
        background: '#FFFFFF',
        borderColor: '#F1F5F9',
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#E63946' }}>Blast</span>
            <span style={{ color: '#0A1628' }}>Tax</span>
          </div>
          <div
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              color: '#94A3B8',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: 1,
            }}
          >
            DEBT
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3">
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                style={{
                  textDecoration: 'none',
                  background: isActive ? '#EFF4FF' : 'transparent',
                  color: isActive ? '#0A1628' : '#64748B',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: 16,
                    width: 20,
                    textAlign: 'center',
                    color: isActive ? '#0A1628' : '#94A3B8',
                  }}
                />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-4 pb-6">
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{
            background: '#F8FAFC',
            fontSize: '0.72rem',
            color: '#94A3B8',
            fontWeight: 500,
          }}
        >
          <i className="fas fa-shield-halved" style={{ fontSize: 12, color: '#00A651' }} />
          <span>256-bit encrypted</span>
        </div>
      </div>
    </aside>
  )
}
