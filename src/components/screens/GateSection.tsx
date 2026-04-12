import { type FormEvent, type RefObject } from 'react'
import styles from './GateSection.module.css'

interface GateSectionProps {
  email: string
  sendingResults: boolean
  formRef: RefObject<HTMLFormElement | null>
  onEmailChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
}

export default function GateSection({
  email,
  sendingResults,
  formRef,
  onEmailChange,
  onSubmit,
}: GateSectionProps) {
  return (
    <section className={styles.screen}>
      <article className={styles.card} id="emailGate">
        <h2 className={styles.title}>Get Your Results</h2>
        <form className={styles.form} onSubmit={onSubmit} ref={formRef}>
          <label className={styles.visuallyHidden} htmlFor="userEmail">
            Email
          </label>
          <input
            autoComplete="email"
            className={styles.input}
            id="userEmail"
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <button className={styles.button} disabled={sendingResults} id="unlockBtn" type="submit">
            See My Score
          </button>
        </form>
      </article>
    </section>
  )
}
