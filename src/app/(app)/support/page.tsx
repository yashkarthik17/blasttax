'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactSupportPage() {
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--secondary)]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Contact Support</h1>
        </div>

        {/* Heading */}
        <div className="py-2 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF4FF]">
            <svg className="h-6 w-6 text-[#0A1628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-xl font-extrabold text-[#0A1628]">How Can We Help?</div>
          <div className="text-[0.8rem] text-[#94A3B8]">Choose a contact method or submit a request</div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-2.5">
          <a
            href="mailto:support@blasttax.com"
            className="flex items-center gap-3.5 rounded-[14px] border border-[#F1F5F9] bg-white p-3.5 transition hover:border-[#E2E8F0] hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FF]">
              <svg className="h-4 w-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.85rem] font-semibold text-[#0A1628]">Email Support</div>
              <div className="text-[0.72rem] text-[#94A3B8]">support@blasttax.com</div>
            </div>
            <svg className="h-3 w-3 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a
            href="tel:+18005551234"
            className="flex items-center gap-3.5 rounded-[14px] border border-[#F1F5F9] bg-white p-3.5 transition hover:border-[#E2E8F0] hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F9EE]">
              <svg className="h-4 w-4 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.85rem] font-semibold text-[#0A1628]">Phone Support</div>
              <div className="text-[0.72rem] text-[#94A3B8]">Mon-Fri, 9am-6pm ET</div>
            </div>
            <svg className="h-3 w-3 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <Link
            href="/chat"
            className="flex items-center gap-3.5 rounded-[14px] border border-[#F1F5F9] bg-white p-3.5 transition hover:border-[#E2E8F0] hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F0FF]">
              <svg className="h-4 w-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[0.85rem] font-semibold text-[#0A1628]">In-App Chat</div>
              <div className="text-[0.72rem] text-[#94A3B8]">Get instant AI-powered help</div>
            </div>
            <svg className="h-3 w-3 text-[#CBD5E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#CBD5E1]">Or Submit a Request</span>
          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>

        {/* Form */}
        <div className="space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Subject</label>
            <input
              type="text"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 pr-9 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628]"
            >
              <option value="" disabled>Select a category</option>
              <option>Billing &amp; Payments</option>
              <option>Account Issues</option>
              <option>Technical Problem</option>
              <option>Case Questions</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Description</label>
            <textarea
              rows={4}
              placeholder="Tell us more about your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0A1628] outline-none transition focus:border-[#0A1628] placeholder:text-[#CBD5E1]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#64748B]">Attachment (optional)</label>
            <div className="flex cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 transition hover:border-[#0A1628]">
              <svg className="h-4 w-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="text-[0.82rem] text-[#94A3B8]">Attach a file or screenshot</span>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1628] px-7 py-4 text-[0.9rem] font-bold text-white transition hover:opacity-90">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Send
        </button>

        {/* Footer info */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2 text-[0.78rem] text-[#64748B]">
            <svg className="h-3 w-3 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            We typically respond within 24 hours
          </div>
          <Link href="/faq" className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#2563EB]">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Check our FAQ first
          </Link>
        </div>
      </div>
    </div>
  )
}
