const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const CLOUDFLARE_ALWAYS_PASS_TEST_SECRET =
  "1x0000000000000000000000000000000AA";

type TurnstileVerifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

export async function verifyTurnstile(
  token: string,
  secretKey: string,
  allowedHostnames: string,
  remoteIp?: string
): Promise<boolean> {
  const hostnames = new Set(
    allowedHostnames
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean)
  );

  if (!token || token.length > 2048 || !secretKey || hostnames.size === 0) {
    return false;
  }

  // Never accept Cloudflare's public dummy credentials in production.
  if (process.env.NODE_ENV === "production" && /^[123]x0+/.test(secretKey)) {
    return false;
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;

    if (data.success !== true) {
      return false;
    }

    /*
     * Cloudflare's official dummy credentials are intentionally synthetic.
     * In local development, when the exact always-pass test secret is used,
     * successful Siteverify validation is sufficient.
     *
     * Production NEVER takes this branch and still enforces hostname/action.
     */
    const usingOfficialDevelopmentTestSecret =
      process.env.NODE_ENV !== "production" &&
      secretKey === CLOUDFLARE_ALWAYS_PASS_TEST_SECRET;

    if (usingOfficialDevelopmentTestSecret) {
      return true;
    }

    const responseHostname =
      data.hostname?.trim().toLowerCase() ?? "";

    if (!hostnames.has(responseHostname)) {
      return false;
    }

    if (data.action !== "contact") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
