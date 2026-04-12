import emailjs from '@emailjs/browser'

import { CTA_LINKS, type DiagnosticState, type LeadFormValues } from '../data/diagnostic'

export interface DiagnosticEmailPayload {
  lead: LeadFormValues
  score: number
  state: DiagnosticState
  headline: string
  executiveSummary: string
  forecastImplication: string
  executiveAction: string[]
  topRisks: string[]
  urgency: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
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
    user_email: payload.lead.workEmail,
    first_name: payload.lead.firstName,
    company_name: payload.lead.companyName,
    role: payload.lead.role,
    pipeline_status: payload.lead.pipelineStatus,
    arr_range: payload.lead.arrRange,
    score: payload.score,
    status: payload.state.toUpperCase(),
    headline: payload.headline,
    executive_summary: payload.executiveSummary,
    forecast_implication: payload.forecastImplication,
    executive_action: payload.executiveAction.join(' | '),
    top_risks: payload.topRisks.join(' | '),
    urgency: payload.urgency,
    primary_cta_label: payload.primaryCtaLabel,
    primary_cta_url: CTA_LINKS.primary,
    secondary_cta_label: payload.secondaryCtaLabel,
    secondary_cta_url: CTA_LINKS.secondary,
  }
}

export async function sendDiagnosticEmails(payload: DiagnosticEmailPayload) {
  if (
    !emailConfigurationReady ||
    !serviceId ||
    !publicKey ||
    !userTemplateId ||
    !ownerTemplateId ||
    !payload.lead.workEmail
  ) {
    return
  }

  const templateParams = buildTemplateParams(payload)

  await Promise.all([
    emailjs.send(serviceId, userTemplateId, templateParams, { publicKey }),
    emailjs.send(serviceId, ownerTemplateId, templateParams, { publicKey }),
  ])
}
