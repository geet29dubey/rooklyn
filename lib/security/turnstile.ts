const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string,
  secretKey: string,
  allowedHostnames: string,
  remoteIp?: string
): Promise<boolean> {
  const hostnames = new Set(
    allowedHostnames.split(",").map((host) => host.trim().toLowerCase()).filter(Boolean)
  );
  if (!token || token.length > 2048 || !secretKey || hostnames.size === 0) return false;

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean; action?: string; hostname?: string };
    return data.success === true && data.action === "contact" && hostnames.has(data.hostname?.toLowerCase() ?? "");
  } catch {
    return false;
  }
}
