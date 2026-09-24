import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { leadSchema } from "@/lib/leads/schema";
import { normalizeLead } from "@/lib/leads/normalize";
import { dispatchLead } from "@/lib/leads/dispatcher";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { getEnv, getWaitUntil } from "@/lib/cloudflare/env";

export async function POST(request: Request) {
  const env = getEnv();
  const waitUntil = getWaitUntil();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const lead = parsed.data;

  // Honeypot: a real visitor never fills this hidden field. Silently
  // report success so a bot doesn't learn the check exists.
  if (lead.website_url) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";

  if (env.LEAD_RATE_LIMITER) {
    const { success } = await env.LEAD_RATE_LIMITER.limit({ key: ip });
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  if (process.env.NODE_ENV === "production") {
    let cfEnv: CloudflareEnv | undefined;
    try {
      cfEnv = getCloudflareContext().env as unknown as CloudflareEnv;
    } catch {
      // No Cloudflare context: report binding presence without logging the error.
    }
    console.info({
      cfSecret: Boolean(cfEnv?.TURNSTILE_SECRET_KEY),
      cfHostnames: Boolean(cfEnv?.TURNSTILE_HOSTNAMES),
      processSecret: Boolean(process.env.TURNSTILE_SECRET_KEY),
      processHostnames: Boolean(process.env.TURNSTILE_HOSTNAMES),
    });
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;
  const turnstileHostnames = env.TURNSTILE_HOSTNAMES || process.env.TURNSTILE_HOSTNAMES;
  if (!turnstileSecret || !turnstileHostnames) {
    const missing = [];
    if (!turnstileSecret) missing.push("TURNSTILE_SECRET_KEY");
    if (!turnstileHostnames) missing.push("TURNSTILE_HOSTNAMES");
    return NextResponse.json(
      { error: "Turnstile is not configured", missing },
      { status: 503 }
    );
  }
  const verified = await verifyTurnstile(
    lead.turnstileToken,
    turnstileSecret,
    turnstileHostnames,
    ip === "unknown" ? undefined : ip
  );
  if (!verified) {
    return NextResponse.json({ error: "Turnstile verification failed" }, { status: 403 });
  }

  const submittedAt = new Date().toISOString();
  const normalized = normalizeLead(lead, submittedAt);

  const { emailSent } = await dispatchLead(normalized, env, waitUntil);

  // The visitor sees success once the lead is validated and at least one
  // destination (email) has been attempted; GHL and the generic webhook
  // keep retrying in the background via waitUntil.
  return NextResponse.json({ ok: true, emailSent });
}
