'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Note {
  id: string
  content: string
  createdAt: string
}

const STORAGE_KEY = 'blasttax_case_notes'

export default function CaseNotesPage() {
  const params = useParams()
  const caseId = params.id as string
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const allNotes: Record<string, Note[]> = JSON.parse(stored)
        setNotes(allNotes[caseId] || [])
      }
    } catch {
      // ignore
    }
  }, [caseId])

  function saveNotes(updated: Note[]) {
    setNotes(updated)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const allNotes: Record<string, Note[]> = stored ? JSON.parse(stored) : {}
      allNotes[caseId] = updated
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotes))
    } catch {
      // ignore
    }
  }

  function addNote() {
    if (!newNote.trim()) return
    const note: Note = {
      id: `note-${Date.now()}`,
      content: newNote.trim(),
      createdAt: new Date().toISOString(),
    }
    saveNotes([note, ...notes])
    setNewNote('')
  }

  function deleteNote(id: string) {
    saveNotes(notes.filter((n) => n.id !== id))
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
      </div>
    )
  }

  const caseNumber = `BT-${caseId?.slice(0, 6)?.toUpperCase() || '000000'}`

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <Link href="/cases" className="hover:text-[var(--foreground)] transition">
            Cases
          </Link>
          <span>/</span>
          <Link href={`/cases/${caseId}`} className="hover:text-[var(--foreground)] transition">
            {caseNumber}
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Notes</span>
        </nav>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Case Notes</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">
            Track important details and observations for {caseNumber}.
          </p>
        </div>

        {/* Add Note */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this case..."
            rows={4}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={addNote}
              disabled={!newNote.trim()}
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-40"
            >
              Add Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
                <svg className="h-8 w-8 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notes yet</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Add notes to keep track of important details about this case.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-xs text-[var(--muted-foreground)] transition hover:text-[var(--destructive)]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
