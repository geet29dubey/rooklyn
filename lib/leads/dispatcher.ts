import type { NormalizedLead } from "@/lib/leads/normalize";
import { isEmailConfigured, sendLeadEmail } from "@/lib/leads/destinations/email";
import { resolveGhlConfig, sendToGhl } from "@/lib/leads/destinations/ghl";
import { isWebhookConfigured, sendToWebhook } from "@/lib/leads/destinations/webhook";

type DispatcherEnv = CloudflareEnv;

export type DispatchResult = {
  emailSent: boolean;
};

/**
 * Sends the internal notification email inline (the visitor's success
 * response waits on it), then hands GHL and the optional generic webhook
 * to the caller's `waitUntil` so they keep retrying in the background
 * after the response has already gone out.
 */
export async function dispatchLead(
  lead: NormalizedLead,
  env: DispatcherEnv,
  waitUntil: (promise: Promise<unknown>) => void
): Promise<DispatchResult> {
  const emailConfig = {
    apiKey: env.RESEND_API_KEY,
    to: env.LEAD_EMAIL_TO,
    from: env.LEAD_EMAIL_FROM,
  };

  let emailSent = false;
  if (isEmailConfigured(emailConfig)) {
    const result = await sendLeadEmail(lead, emailConfig);
    emailSent = result.ok;
    if (!result.ok) {
      console.error("Lead email notification failed", result.error);
    }
  } else {
    console.log("Email destination disabled");
  }

  const ghlConfig = resolveGhlConfig(env);
  if (ghlConfig) {
    waitUntil(
      sendToGhl(lead, ghlConfig).then((result) => {
        if (!result.ok) console.error("GHL destination failed", result.error);
      })
    );
  } else {
    console.log("GHL destination disabled");
  }

  if (isWebhookConfigured(env.LEAD_WEBHOOK_URL)) {
    waitUntil(
      sendToWebhook(lead, env.LEAD_WEBHOOK_URL).then((result) => {
        if (!result.ok) console.error("Generic webhook destination failed", result.error);
      })
    );
  } else {
    console.log("Generic webhook destination disabled");
  }

  return { emailSent };
}
