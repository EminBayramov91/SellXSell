export type DiagnosticStage = 'hero' | 'quiz' | 'gate' | 'results'
export type CategoryKey = 'icp' | 'meddic' | 'internal'
export type DiagnosticState = 'green' | 'yellow' | 'red'
export type AnswerValue = 0 | 1 | 2

export interface Question {
  id: number
  category: CategoryKey
  prompt: string
}

export interface ResultStateContent {
  headline: string
  dealStatus: string
  forecastImpact: string
  recommendation: string
  summary: string
  forecast: string
  actions: string[]
  shock: string
  executiveRecommendations: string[]
  risks: string[]
}

export type CategoryScores = Record<CategoryKey, number>

export interface CalculatedDiagnostic {
  roundedScore: number
  state: DiagnosticState
  categoryScores: CategoryScores
  content: ResultStateContent
}

export const OWNER_EMAIL = 'shelley@sellxsell.com'
export const PRIMARY_CTA_URL =
  import.meta.env.VITE_PRIMARY_CTA_URL ?? 'https://buy.stripe.com/6oUaEQ4rD1kP8Sr3bCa7C00'
export const SECONDARY_CTA_URL =
  import.meta.env.VITE_SECONDARY_CTA_URL ??
  'mailto:shelley@sellxsell.com?subject=Book%2030-Minute%20Pressure%20Test'

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  icp: 'ICP',
  meddic: 'MEDDIC',
  internal: 'INTERNAL ALIGNMENT',
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'icp',
    prompt: 'Is this opportunity a true fit with your Ideal Customer Profile?',
  },
  {
    id: 2,
    category: 'icp',
    prompt:
      'Is this consistent with deals your team has actually closed — not deals that felt close?',
  },
  {
    id: 3,
    category: 'icp',
    prompt: 'Did this opportunity originate from a repeatable, qualified demand source?',
  },
  {
    id: 4,
    category: 'meddic',
    prompt: 'Is there a quantified business case that justifies this purchase?',
  },
  {
    id: 5,
    category: 'meddic',
    prompt: 'Does your team have direct access to the economic buyer?',
  },
  {
    id: 6,
    category: 'meddic',
    prompt: 'Are the decision criteria explicitly defined and confirmed?',
  },
  {
    id: 7,
    category: 'meddic',
    prompt: 'Is the decision process fully mapped — with no unknown steps?',
  },
  {
    id: 8,
    category: 'meddic',
    prompt: 'Is there a clear and urgent business problem driving this deal?',
  },
  {
    id: 9,
    category: 'meddic',
    prompt: 'Does your team have a real champion actively driving this forward?',
  },
  {
    id: 10,
    category: 'meddic',
    prompt:
      'Does your team fully understand the competitive landscape and its position in it?',
  },
  {
    id: 11,
    category: 'internal',
    prompt:
      'Does your leadership team have a clear, evidence-based reason this deal will close?',
  },
  {
    id: 12,
    category: 'internal',
    prompt: 'Is this deal in your forecast because of evidence — not rep belief?',
  },
  {
    id: 13,
    category: 'internal',
    prompt:
      'Could your leadership team defend this deal in a board-level forecast review today?',
  },
]

export const ANSWER_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: 'YES', value: 2 },
  { label: 'PARTIAL', value: 1 },
  { label: 'NO', value: 0 },
]

export const HERO_COPY = {
  heading: "YOUR FORECAST LOOKS REAL. IT ISN'T.",
  intro: [
    'Most pipelines are built on deals that will not close.',
    'This diagnostic shows you what is real, what is at risk, and what should be removed from your forecast.',
  ],
  primaryCtaLabel: "SHOW ME WHAT'S REAL IN MY PIPELINE →",
}

export const QUIZ_TRANSITION_COPY =
  'Answer each question as if you were defending this deal in a Board forecast call.'

export const WHY_THIS_MATTERS = [
  'This is where forecasts break.',
  'Deals like this create confidence in pipeline reviews and miss at quarter end.',
]

export const CTA_COPY = {
  heading: 'Validate your next two quarters of forecast',
  body: [
    'Bring your forecasted deals across the next two quarters.',
    'We will show you what is real, what is at risk, and what should be removed from your forecast.',
  ],
  valueStack: [
    'Full pipeline diagnostic across your forecast for the next two quarters',
    'Deep analysis across ICP, MEDDIC, and internal alignment',
    'Identification of what is real, what is at risk, and what should be removed from your forecast',
    'Clear executive recommendation on what to commit, remove, and rebuild',
    'Up to 3 team members included in the session',
  ],
  price: '$1,800',
  primaryLabel: 'RUN FULL PIPELINE DIAGNOSTIC →',
  secondaryIntro: 'Still not ready? Pressure test your top 3 deals in a 30-minute session first.',
  secondaryLabel: 'BOOK 30-MINUTE PRESSURE TEST →',
}

export const RED_NEXT_STEPS = {
  heading: 'WHAT TO DO NEXT',
  body: [
    'Bring your forecasted deals across the next two quarters.',
    'We will show you what is real, what is at risk, and what should be removed from your forecast.',
    'This is not an outlier.',
    'This is how your pipeline is behaving.',
  ],
}

export const RESULT_CONTENT: Record<DiagnosticState, ResultStateContent> = {
  green: {
    headline: 'THIS DEAL IS REAL',
    dealStatus: 'REAL',
    forecastImpact: 'COMMITTABLE',
    recommendation: 'COMMIT',
    summary:
      'This opportunity is qualified, validated, and aligned across stakeholders. It represents a defensible position in your forecast.',
    forecast: 'This is a deal you can confidently commit.',
    actions: [
      'Maintain direct access to the economic buyer',
      'Protect the decision process and timeline',
      'Eliminate late-stage risk before it appears',
    ],
    shock:
      'If this deal matters to your number, validate it before it turns into a late-quarter surprise.',
    executiveRecommendations: [
      'Commit with discipline — maintain inspection cadence weekly',
      'Secure written confirmation of decision criteria and timeline',
      'Preempt competitive disruption with executive alignment call',
    ],
    risks: [
      'Late-stage scope expansion',
      'Competitive disruption',
      'Internal deprioritization',
    ],
  },
  yellow: {
    headline: 'THIS DEAL IS AT RISK',
    dealStatus: 'AT RISK',
    forecastImpact: 'OVERSTATED',
    recommendation: 'DO NOT COMMIT',
    summary:
      'This deal is being carried as real, but key qualification gaps remain. Without intervention, it will slip or stall.',
    forecast: 'This deal is overstated in the forecast and cannot be relied on.',
    actions: [
      'Re-engage the economic buyer now',
      'Pressure test the decision process live',
      'Tie the timeline to a real business consequence',
    ],
    shock: 'If this deal is in your forecast today, your number is already at risk.',
    executiveRecommendations: [
      'Do not commit — reclassify as upside until buyer is engaged',
      'Force decision path clarity within 5 business days',
      'Escalate to executive sponsor to anchor timeline to consequence',
    ],
    risks: [
      'Economic buyer not fully engaged',
      'Decision process incomplete',
      'Timeline not tied to consequence',
    ],
  },
  red: {
    headline: 'THIS DEAL WILL NOT CLOSE',
    dealStatus: 'WILL NOT CLOSE',
    forecastImpact: 'DISTORTING',
    recommendation: 'REMOVE',
    summary:
      'This opportunity lacks the qualification required to progress. It should not be treated as a viable deal.',
    forecast: 'This deal is distorting your forecast and should be removed immediately.',
    actions: [
      'Remove it from the committed forecast now',
      'Reallocate effort to qualified opportunities',
      'Rebuild pipeline from validated demand sources',
    ],
    shock: 'If multiple deals look like this, your pipeline is not weak — it is misclassified.',
    executiveRecommendations: [
      'Remove from forecast immediately',
      'Reallocate resources to ICP-qualified opportunities',
      'Rebuild pipeline using validated demand sources only',
    ],
    risks: [
      'No economic buyer',
      'No validated business case',
      'No defined decision path',
    ],
  },
}

export function getProgressLabel(questionIndex: number): string {
  const question = QUESTIONS[questionIndex]
  return `${CATEGORY_LABELS[question.category]} — Question ${questionIndex + 1} of ${QUESTIONS.length}`
}

export function getResultState(score: number): DiagnosticState {
  if (score > 75) {
    return 'green'
  }

  if (score >= 50) {
    return 'yellow'
  }

  return 'red'
}

export function calculateDiagnostic(answers: AnswerValue[]): CalculatedDiagnostic {
  const totals: Record<CategoryKey, { sum: number; count: number }> = {
    icp: { sum: 0, count: 0 },
    meddic: { sum: 0, count: 0 },
    internal: { sum: 0, count: 0 },
  }

  QUESTIONS.forEach((question, index) => {
    const answer = answers[index] ?? 0
    totals[question.category].sum += answer
    totals[question.category].count += 1
  })

  const icpAvg = totals.icp.sum / totals.icp.count
  const meddicAvg = totals.meddic.sum / totals.meddic.count
  const internalAvg = totals.internal.sum / totals.internal.count

  const score = ((icpAvg * 0.2 + meddicAvg * 0.6 + internalAvg * 0.2) / 2) * 100
  const roundedScore = Math.round(score)
  const categoryScores: CategoryScores = {
    icp: Math.round((icpAvg / 2) * 100),
    meddic: Math.round((meddicAvg / 2) * 100),
    internal: Math.round((internalAvg / 2) * 100),
  }
  const state = getResultState(score)

  return {
    roundedScore,
    state,
    categoryScores,
    content: RESULT_CONTENT[state],
  }
}
