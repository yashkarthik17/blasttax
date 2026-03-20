'use client'

import { useState } from 'react'

interface Notification {
  id: string
  icon: 'analysis' | 'form' | 'payment' | 'info'
  title: string
  description: string
  timestamp: string
  read: boolean
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    icon: 'analysis',
    title: 'Analysis complete',
    description: 'Your tax resolution analysis has been completed. Review your personalized options now.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    icon: 'form',
    title: 'Form 9465 ready for review',
    description: 'Your Installment Agreement Request form has been generated and is ready for your review.',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: '3',
    icon: 'payment',
    title: 'Payment reminder',
    description: 'Your next installment payment of $425.00 is due in 5 days.',
    timestamp: '3 days ago',
    read: true,
  },
]

const ICON_MAP: Record<string, { bg: string; color: string; path: string }> = {
  analysis: {
    bg: 'bg-emerald-500/10',
    color: 'text-emerald-400',
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  form: {
    bg: 'bg-blue-500/10',
    color: 'text-blue-400',
    path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  payment: {
    bg: 'bg-amber-500/10',
    color: 'text-amber-400',
    path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  info: {
    bg: 'bg-[var(--primary)]/10',
    color: 'text-[var(--primary)]',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function toggleRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="mt-1 text-[var(--muted-foreground)]">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'You\'re all caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                You&apos;re all caught up. We&apos;ll notify you when something important happens.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] divide-y divide-[var(--border)]">
            {notifications.map((notif) => {
              const icon = ICON_MAP[notif.icon] || ICON_MAP.info
              return (
                <button
                  key={notif.id}
                  onClick={() => toggleRead(notif.id)}
                  className={`flex w-full items-start gap-4 p-4 text-left transition hover:bg-[var(--secondary)]/50 ${
                    !notif.read ? 'bg-[var(--primary)]/5' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${icon.bg}`}
                  >
                    <svg
                      className={`h-5 w-5 ${icon.color}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${!notif.read ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                      {notif.description}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {notif.timestamp}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
