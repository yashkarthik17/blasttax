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
      className="hidden lg:flex lg:flex-col lg:w-[260px] xl:w-[280px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen"
      style={{
        background: '#FFFFFF',
        borderRight: '1px solid #E8E8F0',
        boxShadow: '2px 0 12px rgba(26,26,46,0.03)',
      }}
    >
      {/* Logo */}
      <div className="px-7 pt-8 pb-10">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#E63946' }}>Blast</span>
            <span style={{ color: '#1A1A2E' }}>Tax</span>
          </div>
          <div
            style={{
              fontSize: '0.58rem',
              fontWeight: 700,
              color: '#8585A0',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginTop: 2,
            }}
          >
            DEBT RESOLUTION
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4">
        <div className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3.5 px-4 py-3"
                style={{
                  textDecoration: 'none',
                  background: isActive ? '#EBF0FF' : 'transparent',
                  color: isActive ? '#003DA5' : '#5C5C7A',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  borderRadius: 14,
                  transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,61,165,0.08)' : 'none',
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: isActive ? '#003DA5' : 'transparent',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                >
                  <i
                    className={item.icon}
                    style={{
                      fontSize: 15,
                      color: isActive ? '#FFFFFF' : '#8585A0',
                      transition: 'color 0.2s ease',
                    }}
                  />
                </div>
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-5 pb-7">
        <div
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3"
          style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #E6F9EE 100%)',
            border: '1px solid rgba(0,166,81,0.12)',
            fontSize: '0.72rem',
            color: '#065F46',
            fontWeight: 600,
          }}
        >
          <i className="fas fa-shield-halved" style={{ fontSize: 13, color: '#00A651' }} />
          <span>256-bit encrypted</span>
        </div>
      </div>
    </aside>
  )
}
