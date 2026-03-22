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
    <div className="flex min-h-screen flex-col" style={{ background: '#FAFAFF' }}>
      <div className="mx-auto flex w-full max-w-md md:max-w-2xl lg:max-w-4xl flex-1 flex-col">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px 12px' }}>
          <button
            onClick={() => router.back()}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#1A1A2E' }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: 16 }} />
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-sparkles" style={{ fontSize: 12, color: 'white' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A2E' }}>BlastTax AI</div>
            </div>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              background: '#EFF4FF',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 9999,
              fontSize: '0.62rem',
              fontWeight: 600,
              color: '#4F46E5',
            }}
          >
            <i className="fas fa-bolt" style={{ fontSize: 8 }} /> AI-Powered
          </div>
        </div>

        {/* Human Expert Banner */}
        <Link
          href="/expert/landing"
          style={{
            margin: '0 20px 12px',
            padding: '12px 16px',
            background: '#FFFBEB',
            border: '1px solid #FEF3C7',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i className="fas fa-headset" style={{ fontSize: 14, color: '#D97706' }} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#92400E' }}>Need a real person?</span>
            <span style={{ fontSize: '0.68rem', color: '#D97706', display: 'block' }}>Schedule a call with a licensed tax professional</span>
          </div>
          <i className="fas fa-chevron-right" style={{ fontSize: 10, color: '#D97706' }} />
        </Link>

        {/* Chat Area */}
        <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', paddingBottom: 80 }}>
          {messages.map((msg) =>
            msg.role === 'assistant' ? (
              <div key={msg.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <i className="fas fa-sparkles" style={{ fontSize: 10, color: 'white' }} />
                </div>
                <div
                  style={{
                    background: 'white',
                    border: '1px solid #E8E8F0',
                    borderRadius: '2px 18px 18px 18px',
                    padding: '14px 16px',
                    maxWidth: '88%',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    color: '#2D2B3D',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    background: '#1A1A2E',
                    borderRadius: '18px 2px 18px 18px',
                    padding: '14px 16px',
                    maxWidth: '82%',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    color: 'white',
                    marginLeft: 'auto',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ),
          )}

          {/* Suggested Prompts - only show when welcome message */}
          {messages.length === 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 38 }}>
              {[
                { icon: 'fa-check-circle', color: '#2563EB', text: 'What resolution am I eligible for?' },
                { icon: 'fa-handshake', color: '#7C3AED', text: 'Explain the OIC process' },
                { icon: 'fa-file-lines', color: '#0D9488', text: 'What documents do I need?' },
              ].map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleSend(q.text)}
                  style={{
                    padding: '10px 14px',
                    background: 'white',
                    border: '1px solid #E8E8F0',
                    borderRadius: 12,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#5C5C7A',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <i className={`fas ${q.icon}`} style={{ fontSize: 10, color: q.color, marginRight: 4 }} />
                  {q.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Input Bar */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: '10px 16px',
            background: '#FFFFFF',
            borderTop: '1px solid #F0F0F5',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'white',
              border: '1.5px solid #E8E8F0',
              borderRadius: 9999,
              padding: '6px 8px 6px 16px',
            }}
          >
            <button
              type="button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#B0B0C8', fontSize: 16, padding: 4 }}
            >
              <i className="fas fa-paperclip" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                color: '#1A1A2E',
                background: 'transparent',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#1A1A2E',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                opacity: input.trim() ? 1 : 0.4,
              }}
            >
              <i className="fas fa-arrow-up" style={{ fontSize: 13, color: 'white' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
