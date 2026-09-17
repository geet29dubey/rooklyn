import type { NormalizedLead } from "@/lib/leads/normalize";

export function isWebhookConfigured(url: string | undefined): url is string {
  return Boolean(url);
}

/**
 * Optional generic webhook destination (Zapier, Make, n8n, ...). Posts
 * the same normalised payload every other destination receives.
 */
export async function sendToWebhook(
  lead: NormalizedLead,
  url: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": lead.submission_id,
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      return { ok: false, error: `Webhook responded ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown error" };
  }
}
