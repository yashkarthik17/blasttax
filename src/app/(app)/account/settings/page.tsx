'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [pushNotifs, setPushNotifs] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [caseAlerts, setCaseAlerts] = useState(true)
  const [marketing, setMarketing] = useState(false)

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${on ? 'bg-[#00A651]' : 'bg-[#D5D5E0]'}`}
      >
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}
        />
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-lg" />
          </button>
          <h1 className="text-[0.95rem] font-extrabold text-[#0A1628]">Settings</h1>
        </div>

        <div className="flex flex-col gap-6 px-5 pb-8">
          {/* Connected Services */}
          <div>
            <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Connected Services</div>
            <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-[0_1px_3px_rgba(10,22,40,0.06),0_1px_2px_rgba(10,22,40,0.04)]">
              <div className="flex items-center gap-3 border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#EFF4FF]">
                  <i className="fas fa-landmark text-[15px] text-[#0A1628]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">IRS e-Services</div>
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                    <i className="fas fa-circle text-[5px]" /> Connected
                  </span>
                </div>
                <span className="cursor-pointer text-[0.75rem] font-semibold text-[#94A3B8] hover:opacity-70">Disconnect</span>
              </div>
              <div className="flex items-center gap-3 border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#F0FDFA]">
                  <i className="fas fa-building-columns text-[15px] text-[#0D9488]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Plaid (Chase Bank)</div>
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                    <i className="fas fa-circle text-[5px]" /> Connected
                  </span>
                </div>
                <span className="cursor-pointer text-[0.75rem] font-semibold text-[#0A1628] hover:opacity-70">Manage</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#FFF0F1]">
                  <i className="fab fa-google text-[15px] text-[#E63946]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.85rem] font-semibold text-[#0A1628]">Google Account</div>
                  <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#E6F9EE] px-2 py-0.5 text-[0.65rem] font-semibold text-[#00A651]">
                    <i className="fas fa-circle text-[5px]" /> Connected
                  </span>
                </div>
                <span className="cursor-pointer text-[0.75rem] font-semibold text-[#94A3B8] hover:opacity-70">Disconnect</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Notifications</div>
            <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-[0_1px_3px_rgba(10,22,40,0.06),0_1px_2px_rgba(10,22,40,0.04)]">
              {[
                { icon: 'fa-bell', label: 'Push Notifications', on: pushNotifs, toggle: () => setPushNotifs(!pushNotifs) },
                { icon: 'fa-envelope', label: 'Email Updates', on: emailUpdates, toggle: () => setEmailUpdates(!emailUpdates) },
                { icon: 'fa-circle-exclamation', label: 'Case Status Alerts', on: caseAlerts, toggle: () => setCaseAlerts(!caseAlerts) },
                { icon: 'fa-bullhorn', label: 'Marketing', on: marketing, toggle: () => setMarketing(!marketing), iconColor: 'text-[#CBD5E1]' },
              ].map((item, i, arr) => (
                <div key={item.label} className={`flex items-center justify-between p-3.5 transition hover:bg-[#F8FAFC] ${i < arr.length - 1 ? 'border-b border-[#F1F5F9]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <i className={`fas ${item.icon} text-[15px] ${item.iconColor || 'text-[#64748B]'}`} />
                    <span className="text-[0.85rem] font-semibold text-[#0A1628]">{item.label}</span>
                  </div>
                  <Toggle on={item.on} onToggle={item.toggle} />
                </div>
              ))}
            </div>
          </div>

          {/* Data & Privacy */}
          <div>
            <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">Data & Privacy</div>
            <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-[0_1px_3px_rgba(10,22,40,0.06),0_1px_2px_rgba(10,22,40,0.04)]">
              <div className="flex cursor-pointer items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-download text-[15px] text-[#64748B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Download My Data</span>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
              <div className="flex cursor-pointer items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-trash-can text-[15px] text-[#E63946]" />
                  <span className="text-[0.85rem] font-semibold text-[#E63946]">Delete Account</span>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
              <Link href="/privacy" className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5 no-underline transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-shield-halved text-[15px] text-[#64748B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Privacy Policy</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square text-[11px] text-[#D5D5E0]" />
              </Link>
              <Link href="/terms" className="flex items-center justify-between p-3.5 no-underline transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-file-contract text-[15px] text-[#64748B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Terms of Service</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square text-[11px] text-[#D5D5E0]" />
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <div className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-[#CBD5E1]">About</div>
            <div className="overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white shadow-[0_1px_3px_rgba(10,22,40,0.06),0_1px_2px_rgba(10,22,40,0.04)]">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] p-3.5">
                <div className="flex items-center gap-3">
                  <i className="fas fa-code-branch text-[15px] text-[#64748B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Version</span>
                </div>
                <span className="text-[0.8rem] font-medium text-[#94A3B8]">3.0.0</span>
              </div>
              <div className="flex cursor-pointer items-center justify-between border-b border-[#F1F5F9] p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-star text-[15px] text-[#F59E0B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Rate the App</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square text-[11px] text-[#D5D5E0]" />
              </div>
              <div className="flex cursor-pointer items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <i className="fas fa-message text-[15px] text-[#64748B]" />
                  <span className="text-[0.85rem] font-semibold text-[#0A1628]">Send Feedback</span>
                </div>
                <i className="fas fa-chevron-right text-[11px] text-[#D5D5E0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
