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
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #F1F5F9',
      }}
    >
      <div className="mx-auto flex max-w-md sm:max-w-xl items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-[2px] py-2 transition-colors"
              style={{
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <i
                className={item.icon}
                style={{
                  fontSize: 20,
                  color: isActive ? '#0A1628' : '#94A3B8',
                  transition: 'color 0.2s ease',
                }}
              />
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0A1628' : '#94A3B8',
                  transition: 'color 0.2s ease',
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
