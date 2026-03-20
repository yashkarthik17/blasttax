'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface NotifItem {
  id: string
  iconBg: string
  iconColor: string
  icon: string
  title: string
  description: string
  time: string
  unread: boolean
}

const INITIAL_NOTIFICATIONS: NotifItem[] = [
  {
    id: '1',
    iconBg: '#FEF2F2',
    iconColor: '#EF4444',
    icon: 'fas fa-clock',
    title: 'IRS Deadline Approaching',
    description: 'Your Form 656 submission deadline is in 5 days. Don\'t miss this critical date.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    iconBg: '#FFFBEB',
    iconColor: '#F59E0B',
    icon: 'fas fa-credit-card',
    title: 'Payment Plan Due',
    description: 'Your monthly installment of $350 is due on March 25. Ensure funds are available.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '3',
    iconBg: '#EFF4FF',
    iconColor: '#2563EB',
    icon: 'fas fa-arrow-rotate-right',
    title: 'Case Status Update',
    description: 'Case #1042 has been moved to "Under Review" by the IRS. We\'ll keep you posted.',
    time: '1 day ago',
    unread: true,
  },
  {
    id: '4',
    iconBg: '#ECFDF5',
    iconColor: '#10B981',
    icon: 'fas fa-message',
    title: 'New Message from Expert',
    description: 'Sarah M. responded to your question about the Offer in Compromise process.',
    time: '2 days ago',
    unread: false,
  },
  {
    id: '5',
    iconBg: '#EEF2FF',
    iconColor: '#6366F1',
    icon: 'fas fa-file-lines',
    title: 'Document Uploaded',
    description: 'Your 2023 W-2 has been successfully uploaded and verified.',
    time: '3 days ago',
    unread: false,
  },
  {
    id: '6',
    iconBg: '#E6F9EE',
    iconColor: '#00A651',
    icon: 'fas fa-check-circle',
    title: 'Payment Confirmed',
    description: 'Your payment of $250 has been successfully processed and applied to your account.',
    time: '5 days ago',
    unread: false,
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter((n) => n.unread).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const filtered = activeTab === 'unread' ? notifications.filter((n) => n.unread) : notifications

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: '16px 20px 12px' }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            <button
              onClick={() => router.back()}
              style={{ color: '#0A1628', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <i className="fas fa-arrow-left" style={{ fontSize: 18 }} />
            </button>
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0A1628', flex: 1 }}>Notifications</span>
          </div>
          <button
            onClick={markAllRead}
            style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#2563EB',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: '8px 12px', borderRadius: 9999,
              transition: 'all 0.2s ease',
            }}
          >
            Mark all read
          </button>
        </div>

        <div style={{ padding: '0 20px 24px' }}>
          <div className="flex flex-col" style={{ gap: 16 }}>
            {/* Tabs */}
            <div className="flex" style={{ gap: 8, padding: '0 4px' }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '8px 20px', fontSize: '0.82rem', fontWeight: 600,
                  borderRadius: 9999, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit',
                  background: activeTab === 'all' ? '#0A1628' : 'transparent',
                  color: activeTab === 'all' ? '#FFFFFF' : '#94A3B8',
                  transition: 'all 0.25s ease',
                }}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className="flex items-center"
                style={{
                  padding: '8px 20px', fontSize: '0.82rem', fontWeight: 600,
                  borderRadius: 9999, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit',
                  background: activeTab === 'unread' ? '#0A1628' : 'transparent',
                  color: activeTab === 'unread' ? '#FFFFFF' : '#94A3B8',
                  transition: 'all 0.25s ease',
                }}
              >
                Unread
                {unreadCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 18, height: 18, borderRadius: '50%',
                      background: '#E63946', color: '#FFFFFF',
                      fontSize: '0.6rem', fontWeight: 700, marginLeft: 4,
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Swipe hint */}
            <div className="flex items-center justify-center" style={{ gap: 6, padding: '6px 0' }}>
              <i className="fas fa-arrow-left" style={{ fontSize: 10, color: '#CBD5E1' }} />
              <span style={{ fontSize: '0.7rem', color: '#CBD5E1', fontWeight: 500 }}>Swipe to dismiss</span>
            </div>

            {/* Notification List */}
            {filtered.length > 0 ? (
              <div style={{
                background: '#FFFFFF', borderRadius: 16, border: '1px solid #F3F4F6',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
              }}>
                {filtered.map((notif, i) => (
                  <div
                    key={notif.id}
                    className="flex items-start cursor-pointer"
                    style={{
                      gap: 12,
                      padding: 16,
                      borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                      background: notif.unread ? '#FAFBFF' : 'transparent',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                    }}
                  >
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: 40, height: 40, borderRadius: 12, background: notif.iconBg }}
                    >
                      <i className={notif.icon} style={{ fontSize: 16, color: notif.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between" style={{ gap: 8 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: notif.unread ? 700 : 600, color: '#0A1628' }}>
                          {notif.title}
                        </div>
                        {notif.unread ? (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 6 }} />
                        ) : (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'transparent', flexShrink: 0, marginTop: 6 }} />
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 3, lineHeight: 1.45 }}>
                        {notif.description}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#CBD5E1', fontWeight: 500, marginTop: 6 }}>
                        {notif.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div
                  className="flex items-center justify-center mx-auto"
                  style={{ width: 80, height: 80, borderRadius: 20, background: '#F8FAFC', marginBottom: 20 }}
                >
                  <i className="fas fa-bell-slash" style={{ fontSize: 32, color: '#CBD5E1' }} />
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>
                  No notifications yet
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, maxWidth: 240, margin: '0 auto' }}>
                  We&apos;ll notify you about important updates to your cases, deadlines, and messages.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
