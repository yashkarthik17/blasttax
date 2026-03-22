'use client'

import { useState } from 'react'
import Link from 'next/link'

const invoices = [
  { id: 'INV-2026-003', date: 'Mar 15, 2026', amount: '$49.00', status: 'Paid', lineItem: 'Pro Plan - Monthly', method: 'Visa **** 4242', txnId: 'txn_3N8kQL2e...x9f' },
  { id: 'INV-2026-002', date: 'Feb 15, 2026', amount: '$49.00', status: 'Paid', lineItem: 'Pro Plan - Monthly', method: 'Visa **** 4242', txnId: 'txn_2M7jPK1d...w8e' },
  { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: '$49.00', status: 'Paid', lineItem: 'Pro Plan - Monthly', method: 'Visa **** 4242', txnId: 'txn_1L6iOJ0c...v7d' },
  { id: 'INV-2025-012', date: 'Dec 15, 2025', amount: '$19.00', status: 'Paid', lineItem: 'Starter Plan - Monthly', method: 'Visa **** 4242', txnId: 'txn_0K5hNI9b...u6c' },
]

type Filter = 'all' | 'paid' | 'pending'

export default function InvoicesPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === 'all') return true
    return inv.status.toLowerCase() === filter
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link href="/billing" className="w-9 h-9 rounded-xl bg-[#F0F0F5] flex items-center justify-center">
          <svg className="h-4 w-4 text-[#5C5C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-[#1A1A2E]">Invoices</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-[18px]">
        {/* Filter chips */}
        <div className="flex gap-2">
          {(['all', 'paid', 'pending'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors capitalize ${
                filter === f
                  ? 'bg-white text-[#1A1A2E] border-white'
                  : 'bg-white text-[#5C5C7A] border-[#F0F0F5] hover:border-[#D5D5E0]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-2xl border border-[#F0F0F5] px-4">
          {filteredInvoices.map((inv, i) => (
            <div key={inv.id} className={`py-3.5 ${i < filteredInvoices.length - 1 ? 'border-b border-[#F0F0F5]' : ''}`}>
              <button onClick={() => setExpandedId(expandedId === inv.id ? null : inv.id)} className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-[#1A1A2E]">{inv.id}</span>
                      <span className="px-2 py-0.5 bg-[#00A651]/10 rounded-full text-[0.6rem] font-semibold text-[#00A651]">{inv.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8585A0] font-medium">{inv.date}</span>
                      <span className="text-sm font-bold text-[#1A1A2E]">{inv.amount}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#2563EB]">Download</span>
                </div>
              </button>
              {expandedId === inv.id && (
                <div className="mt-2.5 bg-[#FAFAFF] rounded-[10px] p-3">
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-[#8585A0]">Line item</span>
                    <span className="text-xs font-semibold text-[#1A1A2E]">{inv.lineItem}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-[#8585A0]">Payment method</span>
                    <span className="text-xs font-semibold text-[#1A1A2E]">{inv.method}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-xs text-[#8585A0]">Transaction ID</span>
                    <span className="text-xs font-semibold text-[#1A1A2E]">{inv.txnId}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download All */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[#F0F0F5] rounded-[14px] text-sm font-semibold text-[#1A1A2E] hover:border-[#D5D5E0] transition-colors">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download All
        </button>

        {/* Total Paid */}
        <div className="flex items-center justify-center p-4 bg-[#2563EB]/10 rounded-2xl">
          <div className="text-center">
            <div className="text-[0.7rem] font-semibold text-[#1A1A2E] uppercase tracking-wide mb-1">Total Paid</div>
            <div className="text-2xl font-black text-[#1A1A2E]">$166.00</div>
          </div>
        </div>
      </div>
    </div>
  )
}
