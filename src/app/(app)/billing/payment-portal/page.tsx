'use client'

import Link from 'next/link'

const obligations = [
  {
    name: 'OIC Periodic Payment',
    detail: '$354 — Due: Apr 15, 2026',
    status: 'Due in 12 days',
    statusBg: 'bg-amber-500/10',
    statusColor: 'text-amber-400',
    showPay: true,
    paid: false,
  },
  {
    name: 'OIC Application Fee',
    detail: '$205 — Paid Mar 12, 2026',
    status: 'Paid',
    statusBg: 'bg-green-500/10',
    statusColor: 'text-green-400',
    showPay: false,
    paid: true,
  },
  {
    name: 'OIC Initial Payment (20%)',
    detail: '$1,700 — Paid Mar 12, 2026',
    status: 'Paid',
    statusBg: 'bg-green-500/10',
    statusColor: 'text-green-400',
    showPay: false,
    paid: true,
  },
]

const paymentMethods = [
  { name: 'IRS Direct Pay', desc: 'Free, instant from bank account', badge: 'Recommended', iconBg: 'bg-blue-500/10', iconColor: 'text-white' },
  { name: 'EFTPS', desc: 'For business tax payments', iconBg: 'bg-violet-500/10', iconColor: 'text-violet-400' },
  { name: 'Credit/Debit Card', desc: '1.87% processing fee', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
  { name: 'Check/Money Order', desc: 'Mail to IRS address', iconBg: 'bg-green-500/10', iconColor: 'text-teal-400' },
]

const recentPayments = [
  { name: 'OIC Periodic Payment', detail: 'Mar 15, 2026 · Confirmation #IRS-2026-0315', amount: '$354' },
  { name: 'Application Fee', detail: 'Mar 12, 2026 · Confirmation #IRS-2026-0312', amount: '$205' },
  { name: 'Initial Payment (20%)', detail: 'Mar 12, 2026 · Confirmation #IRS-2026-0312b', amount: '$1,700' },
]

export default function PaymentPortalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-white">IRS Payments</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
        {/* Active Obligations */}
        <div>
          <p className="text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-wide mb-3">Active Obligations</p>

          {obligations.map((ob) => (
            <div key={ob.name} className={`bg-zinc-900 border border-zinc-800 rounded-[14px] p-3.5 mb-2.5 ${ob.paid ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <p className="text-sm font-semibold text-white">{ob.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{ob.detail}</p>
                </div>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold ${ob.statusBg} ${ob.statusColor}`}>
                  {ob.paid ? (
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                  {ob.status}
                </span>
              </div>
              {ob.showPay && (
                <div className="flex justify-end">
                  <button className="px-5 py-2 bg-white text-zinc-900 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors">
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div>
          <p className="text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-wide mb-3">Payment Methods</p>

          <div className="space-y-0">
            {paymentMethods.map((m, i) => (
              <div key={m.name} className={`flex items-center gap-3.5 py-3.5 ${i < paymentMethods.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                <div className={`w-[38px] h-[38px] rounded-[10px] ${m.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <svg className={`h-4 w-4 ${m.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{m.name}</p>
                    {m.badge && (
                      <span className="px-2 py-0.5 bg-green-500/10 rounded-full text-[0.625rem] font-bold text-green-400">{m.badge}</span>
                    )}
                  </div>
                  <p className="text-[0.6875rem] text-zinc-500 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div>
          <p className="text-[0.6875rem] font-bold text-zinc-500 uppercase tracking-wide mb-3">Recent Payments</p>

          {recentPayments.map((p, i) => (
            <div key={p.name} className={`flex items-start justify-between py-3 ${i < recentPayments.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                <p className="text-[0.6875rem] text-zinc-500 mt-0.5">{p.detail}</p>
              </div>
              <p className="text-sm font-bold text-white flex-shrink-0 ml-3">{p.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
