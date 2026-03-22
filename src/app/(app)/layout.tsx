'use client'

import BottomNav from '@/components/layout/BottomNav'
import SidebarNav from '@/components/layout/SidebarNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex" style={{ background: '#FAFAFF', color: '#1A1A2E' }}>
      {/* Desktop sidebar - hidden below lg */}
      <SidebarNav />

      {/* Main content area */}
      <div className="flex-1 pb-20 lg:pb-0">
        {children}
      </div>

      {/* Mobile/Tablet bottom nav - hidden on lg+ */}
      <BottomNav />
    </div>
  )
}
