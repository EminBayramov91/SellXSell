import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'

import styles from './App.module.css'
import GateSection from './components/screens/GateSection'
import HeroSection from './components/screens/HeroSection'
import QuizSection from './components/screens/QuizSection'
import ResultsSection from './components/screens/ResultsSection'
import {
  type AnswerValue,
  type DiagnosticStage,
  calculateDiagnostic,
  OWNER_EMAIL,
  QUESTIONS,
} from './data/diagnostic'
import { sendDiagnosticEmails } from './lib/email'
import { clearSession, loadSession, saveSession } from './lib/storage'

function App() {
  const [initialSession] = useState(() => loadSession())
  const [stage, setStage] = useState<DiagnosticStage>(initialSession.stage)
  const [answers, setAnswers] = useState<AnswerValue[]>(initialSession.answers)
  const [activeQuestion, setActiveQuestion] = useState<number>(initialSession.activeQuestion)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerValue | null>(null)
  const [email, setEmail] = useState(initialSession.email)
  const [sendingResults, setSendingResults] = useState(false)

  const answerTimeoutRef = useRef<number | null>(null)
  const ownerBypassRef = useRef(false)
  const gateFormRef = useRef<HTMLFormElement | null>(null)

  const currentQuestion = QUESTIONS[activeQuestion]
  const diagnostic = answers.length === QUESTIONS.length ? calculateDiagnostic(answers) : null

  useEffect(() => {
    saveSession({
      stage,
      answers,
      activeQuestion,
      email,
    })
  }, [stage, answers, activeQuestion, email])

  useEffect(() => {
    document.body.dataset.stage = stage
    window.scrollTo({ top: 0 })

    return () => {
      delete document.body.dataset.stage
    }
  }, [stage])

  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current !== null) {
        window.clearTimeout(answerTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if ((stage === 'gate' || stage === 'results') && !diagnostic) {
      setStage('hero')
      setAnswers([])
      setActiveQuestion(0)
    }
  }, [diagnostic, stage])

  const progressPercentage = ((activeQuestion + (stage !== 'quiz' ? 1 : 0)) / QUESTIONS.length) * 100

  const handleStart = () => {
    if (answerTimeoutRef.current !== null) {
      window.clearTimeout(answerTimeoutRef.current)
      answerTimeoutRef.current = null
    }

    clearSession()
    setAnswers([])
    setActiveQuestion(0)
    setSelectedAnswer(null)
    setEmail('')
    setStage('quiz')
  }

  const handleAnswer = (value: AnswerValue) => {
    if (selectedAnswer !== null) {
      return
    }

    setSelectedAnswer(value)

    answerTimeoutRef.current = window.setTimeout(() => {
      setAnswers((previousAnswers) => [...previousAnswers, value])
      const nextQuestion = activeQuestion + 1

      if (nextQuestion < QUESTIONS.length) {
        setActiveQuestion(nextQuestion)
      } else {
        setStage('gate')
      }

      setSelectedAnswer(null)
    }, 200)
  }

  const unlockResults = useCallback(async (nextEmail: string) => {
    if (!diagnostic) {
      return
    }

    const trimmedEmail = nextEmail.trim()

    setEmail(trimmedEmail)
    setStage('results')
    setSendingResults(true)

    try {
      await sendDiagnosticEmails({
        email: trimmedEmail,
        score: diagnostic.roundedScore,
        state: diagnostic.state,
        dealStatus: diagnostic.content.dealStatus,
        forecastImpact: diagnostic.content.forecastImpact,
        recommendation: diagnostic.content.recommendation,
        categoryScores: diagnostic.categoryScores,
        risks: diagnostic.content.risks,
        actions: diagnostic.content.actions,
        executiveRecommendations: diagnostic.content.executiveRecommendations,
      })
    } catch (error) {
      console.error('Failed to send diagnostic emails.', error)
    } finally {
      setSendingResults(false)
    }
  }, [diagnostic])

  useEffect(() => {
    if (stage !== 'gate') {
      ownerBypassRef.current = false
      return
    }

    if (!diagnostic || ownerBypassRef.current || email.trim().toLowerCase() !== OWNER_EMAIL) {
      return
    }

    ownerBypassRef.current = true
    void unlockResults(email)
  }, [diagnostic, email, stage, unlockResults])

  const handleUnlockResults = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!gateFormRef.current?.reportValidity()) {
      return
    }

    await unlockResults(email)
  }

  return (
    <main className={styles.shell}>
      {stage === 'hero' && <HeroSection onStart={handleStart} />}

      {stage === 'quiz' && currentQuestion && (
        <QuizSection
          activeQuestion={activeQuestion}
          currentQuestion={currentQuestion}
          onAnswer={handleAnswer}
          progressPercentage={progressPercentage}
          selectedAnswer={selectedAnswer}
        />
      )}

      {stage === 'gate' && diagnostic && (
        <GateSection
          email={email}
          formRef={gateFormRef}
          onEmailChange={setEmail}
          onSubmit={handleUnlockResults}
          sendingResults={sendingResults}
        />
      )}

      {stage === 'results' && diagnostic && <ResultsSection diagnostic={diagnostic} />}
    </main>
  )
}

export default App
