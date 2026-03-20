'use client'
import { create } from 'zustand'

interface WizardState {
  caseId: string | null
  currentStepIndex: number
  taxpayerType: 'Individual' | 'Business'
  answers: Record<string, any>
  setCaseId: (id: string) => void
  setStep: (index: number) => void
  setTaxpayerType: (type: 'Individual' | 'Business') => void
  setAnswer: (key: string, value: any) => void
  setAnswers: (answers: Record<string, any>) => void
  reset: () => void
}

export const useWizard = create<WizardState>((set) => ({
  caseId: null,
  currentStepIndex: 0,
  taxpayerType: 'Individual',
  answers: {},
  setCaseId: (id) => set({ caseId: id }),
  setStep: (index) => set({ currentStepIndex: index }),
  setTaxpayerType: (type) => set({ taxpayerType: type }),
  setAnswer: (key, value) => set((s) => ({ answers: { ...s.answers, [key]: value } })),
  setAnswers: (answers) => set((s) => ({ answers: { ...s.answers, ...answers } })),
  reset: () => set({ caseId: null, currentStepIndex: 0, answers: {} }),
}))
