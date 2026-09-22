import type { NormalizedLead } from "@/lib/leads/normalize";

export type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

export function isEmailConfigured(
  config: Partial<EmailConfig>
): config is EmailConfig {
  return Boolean(config.apiKey && config.to && config.from);
}

function renderText(lead: NormalizedLead): string {
  return [
    `New lead from the Rooklyn website (${lead.locale})`,
    "",
    `Name: ${lead.contact.first_name} ${lead.contact.last_name}`,
    `Email: ${lead.contact.email}`,
    `Phone: ${lead.contact.phone}`,
    "",
    `Company: ${lead.company.name}`,
    `Website: ${lead.company.website}`,
    `Industry: ${lead.company.industry}`,
    `Size: ${lead.company.size}`,
    `Country: ${lead.company.country}`,
    "",
    `Interested in: ${lead.needs.automation_interest}`,
    `Monthly enquiries: ${lead.needs.monthly_enquiries}`,
    `Timeline: ${lead.needs.timeline}`,
    `Heard about us via: ${lead.needs.heard_about_us}`,
    "",
    `Marketing opt-in: ${lead.consent.marketing_opt_in ? "yes" : "no"}`,
    `Submission ID: ${lead.submission_id}`,
    `Page: ${lead.tracking.page_url}`,
  ].join("\n");
}

/**
 * Sends the internal lead notification via the Resend REST API (works
 * over plain `fetch`, so it runs on the Workers runtime without the
 * Resend Node SDK or SMTP).
 */
export async function sendLeadEmail(
  lead: NormalizedLead,
  config: EmailConfig
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": lead.submission_id,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: lead.contact.email,
        subject: `New lead: ${lead.company.name} (${lead.locale.toUpperCase()})`,
        text: renderText(lead),
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `Resend responded ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown error" };
  }
}
