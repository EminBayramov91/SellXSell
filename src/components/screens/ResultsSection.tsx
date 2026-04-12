import ScoreRing from '../ScoreRing'
import {
  CATEGORY_LABELS,
  CTA_COPY,
  PRIMARY_CTA_URL,
  RED_NEXT_STEPS,
  SECONDARY_CTA_URL,
  WHY_THIS_MATTERS,
  type CalculatedDiagnostic,
} from '../../data/diagnostic'
import styles from './ResultsSection.module.css'

interface ResultsSectionProps {
  diagnostic: CalculatedDiagnostic
}

function snapshotTone(state: CalculatedDiagnostic['state']) {
  if (state === 'green') {
    return '#22C55E'
  }

  if (state === 'yellow') {
    return '#FACC15'
  }

  return '#EF4444'
}

export default function ResultsSection({ diagnostic }: ResultsSectionProps) {
  const headlineClass =
    diagnostic.state === 'green'
      ? styles.headlineGreen
      : diagnostic.state === 'yellow'
        ? styles.headlineYellow
        : styles.headlineRed

  return (
    <section className={styles.screen} id="results">
      <div className={styles.container}>
        <section className={styles.left}>
          <header className={styles.resultsHeader}>
            <ScoreRing color={snapshotTone(diagnostic.state)} score={diagnostic.roundedScore} />
            <h2 className={`${styles.headline} ${headlineClass}`}>{diagnostic.content.headline}</h2>
          </header>

          <article className={styles.snapshotBlock} id="snapshot">
            <p>
              DEAL STATUS: <span id="status">{diagnostic.content.dealStatus}</span>
            </p>
            <p>CONFIDENCE: {diagnostic.roundedScore}%</p>
            <p>FORECAST IMPACT: {diagnostic.content.forecastImpact}</p>
            <p>RECOMMENDATION: {diagnostic.content.recommendation}</p>
          </article>

          <article className={styles.copyBlock} id="summary">
            <p className={styles.bodyCopy}>{diagnostic.content.summary}</p>
          </article>

          <article className={styles.copyBlock} id="forecast">
            <p className={styles.bodyCopy}>{diagnostic.content.forecast}</p>
          </article>
        </section>

        <aside className={styles.right}>
          <p className={styles.categoryScores} id="categoryScores">
            {CATEGORY_LABELS.icp}: {diagnostic.categoryScores.icp}% | {CATEGORY_LABELS.meddic}: {diagnostic.categoryScores.meddic}% |{' '}
            {CATEGORY_LABELS.internal}: {diagnostic.categoryScores.internal}%
          </p>

          <ul className={styles.actionList} id="actions">
            {diagnostic.content.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>

          {diagnostic.state === 'red' && (
            <section className={styles.nextStepsBlock}>
              <p className={styles.label}>{RED_NEXT_STEPS.heading}</p>
              {RED_NEXT_STEPS.body.map((line) => (
                <p className={styles.bodyCopy} key={line}>
                  {line}
                </p>
              ))}
            </section>
          )}
        </aside>

        <section className={styles.full}>
          <div className={styles.risksBlock}>
            <p className={styles.label}>TOP RISKS</p>
            <ul className={styles.riskList} id="risks">
              {diagnostic.content.risks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </div>

          <article className={styles.whyBlock}>
            {WHY_THIS_MATTERS.map((line) => (
              <p className={styles.bodyCopy} key={line}>
                {line}
              </p>
            ))}
          </article>

          <div className={styles.shockLine}>{diagnostic.content.shock}</div>

          <section className={styles.ctaPanel}>
            <h2 className={styles.ctaHeadline}>{CTA_COPY.heading}</h2>
            <div className={styles.ctaCopy}>
              {CTA_COPY.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className={styles.ctaValueStack}>
              {CTA_COPY.valueStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.ctaPrice}>{CTA_COPY.price}</div>

            <div className={styles.ctaButtons}>
              <a className={styles.primaryLink} href={PRIMARY_CTA_URL} rel="noreferrer" target="_blank">
                {CTA_COPY.primaryLabel}
              </a>
              <p className={styles.secondaryCopy}>{CTA_COPY.secondaryIntro}</p>
              <a className={styles.secondaryLink} href={SECONDARY_CTA_URL} rel="noreferrer" target="_blank">
                {CTA_COPY.secondaryLabel}
              </a>
            </div>
          </section>
        </section>
      </div>
    </section>
  )
}
