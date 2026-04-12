import { HERO_COPY } from '../../data/diagnostic'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  onStart: () => void
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className={styles.screen}>
      <div className={styles.content}>
        <header className={styles.copy}>
          <h1 className={styles.title}>{HERO_COPY.heading}</h1>
          <div className={styles.introGroup}>
            {HERO_COPY.intro.map((paragraph) => (
              <p className={styles.intro} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <button className={styles.cta} onClick={onStart} type="button">
            {HERO_COPY.primaryCtaLabel}
          </button>
        </header>
      </div>
    </section>
  )
}
