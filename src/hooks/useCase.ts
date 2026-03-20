'use client'

import { useState, useCallback } from 'react'

export interface CaseData {
  id: string
  caseNumber: string
  taxpayerType: 'Individual' | 'Business'
  status: 'draft' | 'in-progress' | 'completed' | 'archived'
  totalDebt: number
  createdAt: string
  updatedAt: string
  deleted: boolean
  answers?: Record<string, unknown>
  notes?: string[]
}

const STORAGE_KEY = 'blasttax_cases'

function loadCases(): CaseData[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCases(cases: CaseData[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases))
  } catch {
    // ignore
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useCase() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createCase = useCallback(
    async (taxpayerType: 'Individual' | 'Business'): Promise<string> => {
      setLoading(true)
      setError(null)
      try {
        const id = generateId()
        const now = new Date().toISOString()
        const newCase: CaseData = {
          id,
          caseNumber: `BT-${id.slice(0, 6).toUpperCase()}`,
          taxpayerType,
          status: 'draft',
          totalDebt: 0,
          createdAt: now,
          updatedAt: now,
          deleted: false,
        }
        const cases = loadCases()
        cases.unshift(newCase)
        saveCases(cases)
        return id
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to create case'
        setError(msg)
        throw new Error(msg)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const getCase = useCallback(async (caseId: string): Promise<CaseData | null> => {
    setLoading(true)
    setError(null)
    try {
      const cases = loadCases()
      return cases.find((c) => c.id === caseId && !c.deleted) || null
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch case'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCase = useCallback(
    async (caseId: string, data: Partial<CaseData>): Promise<void> => {
      setLoading(true)
      setError(null)
      try {
        const cases = loadCases()
        const index = cases.findIndex((c) => c.id === caseId)
        if (index === -1) throw new Error('Case not found')
        cases[index] = {
          ...cases[index],
          ...data,
          updatedAt: new Date().toISOString(),
        }
        saveCases(cases)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to update case'
        setError(msg)
        throw new Error(msg)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const getCases = useCallback(async (): Promise<CaseData[]> => {
    setLoading(true)
    setError(null)
    try {
      return loadCases().filter((c) => !c.deleted)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch cases'
      setError(msg)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCase = useCallback(async (caseId: string): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const cases = loadCases()
      const index = cases.findIndex((c) => c.id === caseId)
      if (index === -1) throw new Error('Case not found')
      cases[index] = {
        ...cases[index],
        deleted: true,
        updatedAt: new Date().toISOString(),
      }
      saveCases(cases)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete case'
      setError(msg)
      throw new Error(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    createCase,
    getCase,
    updateCase,
    getCases,
    deleteCase,
  }
}
