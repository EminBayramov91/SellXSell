import type { AnswerValue, DiagnosticStage } from '../data/diagnostic'

export interface DiagnosticSession {
  stage: DiagnosticStage
  answers: AnswerValue[]
  activeQuestion: number
  email: string
}

const STORAGE_KEY = 'sellxsell-diagnostic-session'

export const defaultSession: DiagnosticSession = {
  stage: 'hero',
  answers: [],
  activeQuestion: 0,
  email: '',
}

export function loadSession(): DiagnosticSession {
  if (typeof window === 'undefined') {
    return defaultSession
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return defaultSession
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DiagnosticSession>
    const answers = Array.isArray(parsed.answers)
      ? parsed.answers.filter((value): value is AnswerValue => value === 0 || value === 1 || value === 2)
      : []
    const stage =
      parsed.stage === 'quiz' || parsed.stage === 'gate' || parsed.stage === 'results'
        ? parsed.stage
        : 'hero'
    const activeQuestion =
      typeof parsed.activeQuestion === 'number' && parsed.activeQuestion >= 0
        ? Math.min(parsed.activeQuestion, answers.length)
        : answers.length

    return {
      stage,
      answers,
      activeQuestion,
      email: typeof parsed.email === 'string' ? parsed.email : '',
    }
  } catch {
    return defaultSession
  }
}

export function saveSession(session: DiagnosticSession) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
