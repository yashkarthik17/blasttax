import BottomNav from '@/components/layout/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC', color: '#0A1628' }}>
      <div className="pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
