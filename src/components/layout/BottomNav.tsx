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

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bottom-nav"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="mx-auto flex items-center justify-around" style={{ maxWidth: 560 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5"
              style={{
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
                position: 'relative',
              }}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: 20,
                    height: 3,
                    borderRadius: 9999,
                    background: 'linear-gradient(135deg, #003DA5, #2563EB)',
                  }}
                />
              )}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: isActive ? '#EBF0FF' : 'transparent',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: 18,
                    color: isActive ? '#003DA5' : '#8585A0',
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#003DA5' : '#8585A0',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
