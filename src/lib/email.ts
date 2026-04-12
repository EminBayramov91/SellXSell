import emailjs from '@emailjs/browser'

import {
  type CategoryKey,
  type DiagnosticState,
  CATEGORY_LABELS,
  CTA_COPY,
  OWNER_EMAIL,
  PRIMARY_CTA_URL,
  SECONDARY_CTA_URL,
} from '../data/diagnostic'

export interface DiagnosticEmailPayload {
  email: string
  score: number
  state: DiagnosticState
  dealStatus: string
  forecastImpact: string
  recommendation: string
  categoryScores: Record<CategoryKey, number>
  risks: string[]
  actions: string[]
  executiveRecommendations: string[]
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const userTemplateId = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID
const ownerTemplateId = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID

export const emailConfigurationReady = Boolean(
  serviceId && publicKey && userTemplateId && ownerTemplateId,
)

function buildTemplateParams(payload: DiagnosticEmailPayload) {
  return {
    user_email: payload.email,
    owner_email: OWNER_EMAIL,
    score: payload.score,
    status: payload.state.toUpperCase(),
    deal_status: payload.dealStatus,
    forecast_impact: payload.forecastImpact,
    recommendation: payload.recommendation,
    icp: payload.categoryScores.icp,
    meddic: payload.categoryScores.meddic,
    internal: payload.categoryScores.internal,
    category_scores: `${CATEGORY_LABELS.icp}: ${payload.categoryScores.icp}% | ${CATEGORY_LABELS.meddic}: ${payload.categoryScores.meddic}% | ${CATEGORY_LABELS.internal}: ${payload.categoryScores.internal}%`,
    risks: payload.risks.join(' | '),
    actions: payload.actions.join(' | '),
    executive_recommendations: payload.executiveRecommendations.join(' | '),
    primary_cta_label: CTA_COPY.primaryLabel,
    primary_cta_url: PRIMARY_CTA_URL,
    secondary_cta_label: CTA_COPY.secondaryLabel,
    secondary_cta_url: SECONDARY_CTA_URL,
  }
}

export async function sendDiagnosticEmails(payload: DiagnosticEmailPayload) {
  if (!emailConfigurationReady || !serviceId || !publicKey || !userTemplateId || !ownerTemplateId) {
    return
  }

  const templateParams = buildTemplateParams(payload)

  await Promise.all([
    emailjs.send(serviceId, userTemplateId, templateParams, { publicKey }),
    emailjs.send(serviceId, ownerTemplateId, templateParams, { publicKey }),
  ])
}
