import type { NormalizedLead } from "@/lib/leads/normalize";
import { GHL_FIELD_MAP } from "@/config/ghl-field-map";

export type GhlConfig =
  | {
      mode: "inbound_webhook";
      inboundWebhookUrl: string;
    }
  | {
      mode: "api";
      apiBase: string;
      apiToken: string;
      locationId: string;
      pipelineId?: string;
      pipelineStageId?: string;
    };

export function resolveGhlConfig(env: {
  GHL_MODE?: string;
  GHL_INBOUND_WEBHOOK_URL?: string;
  GHL_API_BASE?: string;
  GHL_API_TOKEN?: string;
  GHL_LOCATION_ID?: string;
  GHL_PIPELINE_ID?: string;
  GHL_PIPELINE_STAGE_ID?: string;
}): GhlConfig | null {
  const mode = env.GHL_MODE ?? "inbound_webhook";

  if (mode === "api") {
    if (!env.GHL_API_BASE || !env.GHL_API_TOKEN || !env.GHL_LOCATION_ID) {
      return null;
    }
    return {
      mode: "api",
      apiBase: env.GHL_API_BASE,
      apiToken: env.GHL_API_TOKEN,
      locationId: env.GHL_LOCATION_ID,
      pipelineId: env.GHL_PIPELINE_ID,
      pipelineStageId: env.GHL_PIPELINE_STAGE_ID,
    };
  }

  if (!env.GHL_INBOUND_WEBHOOK_URL) return null;
  return { mode: "inbound_webhook", inboundWebhookUrl: env.GHL_INBOUND_WEBHOOK_URL };
}

async function withRetry(
  fn: () => Promise<Response>,
  attempts = 2
): Promise<{ ok: boolean; error?: string }> {
  let lastError: string | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const res = await fn();
      if (res.ok) return { ok: true };
      lastError = `GHL responded ${res.status}`;
    } catch (err) {
      lastError = err instanceof Error ? err.message : "unknown error";
    }
    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
    }
  }
  // TODO: add dead-letter storage (Cloudflare Queue or KV binding) for
  // deliveries that exhaust retries, so failed leads can be replayed.
  return { ok: false, error: lastError };
}

/** Mode A: post the normalised payload to a GHL Inbound Webhook workflow. */
async function sendViaInboundWebhook(
  lead: NormalizedLead,
  config: Extract<GhlConfig, { mode: "inbound_webhook" }>
) {
  return withRetry(() =>
    fetch(config.inboundWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": lead.submission_id,
      },
      body: JSON.stringify(lead),
    })
  );
}

// TODO: verify against current GHL API docs before going live.
async function upsertContact(
  lead: NormalizedLead,
  config: Extract<GhlConfig, { mode: "api" }>
) {
  const cf = GHL_FIELD_MAP.customFields;

  const payload = {
    locationId: config.locationId,
    firstName: lead.contact.first_name,
    lastName: lead.contact.last_name,
    email: lead.contact.email,
    phone: lead.contact.phone,
    companyName: lead.company.name,
    website: lead.company.website,
    country: lead.company.country,
    source: lead.source,
    tags: lead.tags,
    customFields: [
      { id: cf.industry, value: lead.company.industry },
      { id: cf.companySize, value: lead.company.size },
      { id: cf.automationInterests, value: lead.needs.automation_interest },
      { id: cf.monthlyEnquiries, value: lead.needs.monthly_enquiries },
      { id: cf.timeline, value: lead.needs.timeline },
      { id: cf.preferredLanguage, value: lead.contact.preferred_language },
      { id: cf.heardAboutUs, value: lead.needs.heard_about_us },
      { id: cf.privacyConsentAt, value: lead.consent.privacy_accepted_at },
      { id: cf.marketingOptIn, value: String(lead.consent.marketing_opt_in) },
      { id: cf.utmSource, value: lead.tracking.utm_source },
      { id: cf.utmMedium, value: lead.tracking.utm_medium },
      { id: cf.utmCampaign, value: lead.tracking.utm_campaign },
      { id: cf.utmTerm, value: lead.tracking.utm_term },
      { id: cf.utmContent, value: lead.tracking.utm_content },
      { id: cf.pageUrl, value: lead.tracking.page_url },
      { id: cf.referrer, value: lead.tracking.referrer },
    ],
  };

  return fetch(`${config.apiBase}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
      Version: "2021-07-28", // TODO: verify against current GHL API docs
      "Idempotency-Key": lead.submission_id,
    },
    body: JSON.stringify(payload),
  });
}

// TODO: verify against current GHL API docs before going live.
async function createOpportunity(
  lead: NormalizedLead,
  contactId: string,
  config: Extract<GhlConfig, { mode: "api" }>
) {
  if (!config.pipelineId || !config.pipelineStageId) return;
  await fetch(`${config.apiBase}/opportunities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: JSON.stringify({
      pipelineId: config.pipelineId,
      pipelineStageId: config.pipelineStageId,
      locationId: config.locationId,
      contactId,
      name: `${lead.company.name} — ${lead.needs.automation_interest}`,
      source: lead.source,
    }),
  });
}

async function sendViaApi(lead: NormalizedLead, config: Extract<GhlConfig, { mode: "api" }>) {
  return withRetry(async () => {
    const res = await upsertContact(lead, config);
    if (res.ok) {
      try {
        const data = (await res.clone().json()) as { contact?: { id?: string } };
        const contactId = data.contact?.id;
        if (contactId) {
          await createOpportunity(lead, contactId, config);
        }
      } catch {
        // Contact was upserted but the response shape was unexpected;
        // the opportunity is a best-effort follow-up only.
      }
    }
    return res;
  });
}

export async function sendToGhl(
  lead: NormalizedLead,
  config: GhlConfig
): Promise<{ ok: boolean; error?: string }> {
  if (config.mode === "api") return sendViaApi(lead, config);
  return sendViaInboundWebhook(lead, config);
}
