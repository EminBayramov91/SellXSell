import { ANSWER_OPTIONS, getProgressLabel, QUIZ_TRANSITION_COPY, type AnswerValue, type Question } from '../../data/diagnostic'
import styles from './QuizSection.module.css'

interface QuizSectionProps {
  activeQuestion: number
  currentQuestion: Question
  progressPercentage: number
  selectedAnswer: AnswerValue | null
  onAnswer: (value: AnswerValue) => void
}

export default function QuizSection({
  activeQuestion,
  currentQuestion,
  progressPercentage,
  selectedAnswer,
  onAnswer,
}: QuizSectionProps) {
  return (
    <section className={styles.screen}>
      <article className={styles.card}>
        <header className={styles.meta}>
          <p className={styles.label}>{getProgressLabel(activeQuestion)}</p>
          <div aria-hidden="true" className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
          </div>
          <p className={styles.transition}>{QUIZ_TRANSITION_COPY}</p>
        </header>

        <section>
          <h2 className={styles.prompt}>{currentQuestion.prompt}</h2>
        </section>

        <div aria-label="Diagnostic answers" className={styles.answerGrid} role="group">
          {ANSWER_OPTIONS.map((option) => {
            const isSelected = selectedAnswer === option.value
            const isMuted = selectedAnswer !== null && !isSelected
            const className = [styles.answerButton, isSelected && styles.answerButtonSelected, isMuted && styles.answerButtonMuted]
              .filter(Boolean)
              .join(' ')

            return (
              <button className={className} key={option.label} onClick={() => onAnswer(option.value)} type="button">
                {option.label}
              </button>
            )
          })}
        </div>
      </article>
    </section>
  )
}
