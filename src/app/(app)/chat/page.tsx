'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi Jane! I'm your BlastTax AI assistant. I can help you understand your tax situation, explain resolution options, and guide you through next steps. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')

  function handleSend(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: msg }
    const botMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content:
        'AI Chat is coming soon. Full AI integration will be available in a future update. In the meantime, check out our Learn hub for educational content about IRS resolution options.',
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <div className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-3.5">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-[#0A1628]">
            <i className="fas fa-arrow-left text-base" />
          </button>
          <div className="flex flex-1 items-center gap-2.5">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[#2563EB]">
              <i className="fas fa-sparkles text-xs text-white" />
            </div>
            <div className="text-[0.9rem] font-bold text-[#1F2937]">BlastTax AI</div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#EFF4FF] px-2.5 py-1 text-[0.62rem] font-semibold text-[#4F46E5]">
            <i className="fas fa-bolt text-[8px]" /> AI-Powered
          </span>
        </div>

        {/* Human Expert Banner */}
        <Link href="/expert" className="mx-5 mb-3 flex items-center gap-2.5 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] p-3 no-underline">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7]">
            <i className="fas fa-headset text-sm text-[#D97706]" />
          </div>
          <div className="flex-1">
            <span className="text-[0.78rem] font-semibold text-[#92400E]">Need a real person?</span>
            <span className="block text-[0.68rem] text-[#D97706]">Schedule a call with a licensed tax professional</span>
          </div>
          <i className="fas fa-chevron-right text-[10px] text-[#D97706]" />
        </Link>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-24">
          {messages.map((msg) =>
            msg.role === 'assistant' ? (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]">
                  <i className="fas fa-sparkles text-[10px] text-white" />
                </div>
                <div className="max-w-[88%] rounded-[2px_18px_18px_18px] border border-[#F3F4F6] bg-white px-4 py-3.5 text-[0.82rem] leading-relaxed text-[#2D2B3D]">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="ml-auto max-w-[82%] rounded-[18px_2px_18px_18px] bg-[#0A1628] px-4 py-3.5 text-[0.82rem] leading-relaxed text-white">
                  {msg.content}
                </div>
              </div>
            ),
          )}

          {/* Suggested Prompts - only show when welcome message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pl-[38px]">
              {[
                { icon: 'fa-check-circle', color: 'text-[#2563EB]', text: 'What resolution am I eligible for?' },
                { icon: 'fa-handshake', color: 'text-[#7C3AED]', text: 'Explain the OIC process' },
                { icon: 'fa-file-lines', color: 'text-[#0D9488]', text: 'What documents do I need?' },
              ].map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleSend(q.text)}
                  className="rounded-xl border border-[#F3F4F6] bg-white px-3.5 py-2.5 text-[0.75rem] font-semibold text-[#64748B] transition hover:-translate-y-0.5 hover:border-[#0A1628] hover:bg-[#EFF4FF] hover:text-[#0A1628]"
                >
                  <i className={`fas ${q.icon} ${q.color} mr-1 text-[10px]`} />
                  {q.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Input Bar */}
        <div className="sticky bottom-0 border-t border-[#F1F5F9] bg-white px-4 py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#F3F4F6] bg-white px-2 py-1.5 pl-4"
          >
            <button type="button" className="text-[#CBD5E1]">
              <i className="fas fa-paperclip text-base" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-none bg-transparent text-[0.82rem] text-[#1F2937] outline-none placeholder:text-[#CBD5E1]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A1628] text-white transition hover:scale-105 disabled:opacity-40"
            >
              <i className="fas fa-arrow-up text-[13px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
