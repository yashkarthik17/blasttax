'use client'

import { useState } from 'react'

interface QuestionScreenProps {
  question: string
  helpText?: string
  onAnswer: (answer: boolean) => void
}

export default function QuestionScreen({ question, helpText, onAnswer }: QuestionScreenProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <h2 className="mb-8 text-center text-2xl font-bold leading-tight text-white">
        {question}
      </h2>

      {/* Why do we ask? */}
      {helpText && (
        <div className="mb-8 w-full max-w-sm">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            <span>Why do we ask?</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${showHelp ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showHelp && (
            <div className="mt-2 rounded-lg bg-zinc-800/60 px-4 py-3 text-sm leading-relaxed text-zinc-400">
              {helpText}
            </div>
          )}
        </div>
      )}

      {/* Yes / No Pills */}
      <div className="flex w-full max-w-sm gap-4">
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 rounded-full bg-emerald-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-500 active:bg-emerald-700"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 rounded-full bg-zinc-700 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-600 active:bg-zinc-800"
        >
          No
        </button>
      </div>
    </div>
  )
}
