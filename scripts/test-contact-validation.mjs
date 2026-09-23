import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidPhone, toE164 } from "../lib/leads/phone.ts";
import { verifyTurnstile } from "../lib/security/turnstile.ts";

test("phone validation accepts formatted numbers and rejects invalid input", () => {
  for (const value of ["+34 612 345 678", "612 345 678", "+1 (415) 555-2671"]) {
    assert.equal(isValidPhone(value), true, value);
  }
  for (const value of ["", "+34", "abc123456789", "+34 612a345678", "123456", "+34 (612 345 678", "++34612345678"]) {
    assert.equal(isValidPhone(value), false, value);
  }
  assert.equal(toE164("612 345 678"), "+34612345678");
  assert.equal(toE164("+1 (415) 555-2671"), "+14155552671");
});

test("Turnstile accepts only a verified contact token from an allowed hostname", async () => {
  const originalFetch = globalThis.fetch;
  let result = { success: true, action: "contact", hostname: "rooklyn.co" };
  let calls = 0;
  try {
    globalThis.fetch = async (_url, options) => {
      calls++;
      assert.equal(_url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
      assert.equal(options.body.get("secret"), "test-secret");
      assert.equal(options.body.get("response"), "test-token");
      return new Response(JSON.stringify(result), { status: 200 });
    };
    assert.equal(await verifyTurnstile("test-token", "test-secret", "rooklyn.co"), true);
    assert.equal(await verifyTurnstile("test-token", "test-secret", "other.example"), false);
    result = { ...result, action: "signup" };
    assert.equal(await verifyTurnstile("test-token", "test-secret", "rooklyn.co"), false);
    result = { ...result, action: "contact", success: false };
    assert.equal(await verifyTurnstile("test-token", "test-secret", "rooklyn.co"), false);
    const callsBeforeEmptyToken = calls;
    assert.equal(await verifyTurnstile("", "test-secret", "rooklyn.co"), false);
    assert.equal(calls, callsBeforeEmptyToken);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("official Turnstile test credentials are restricted to non-production", async () => {
  const originalFetch = globalThis.fetch;
  const originalNodeEnv = process.env.NODE_ENV;
  const dummySecret = "1x0000000000000000000000000000000AA";
  let result = { success: true, hostname: "dummy.example", action: "" };
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls++;
      return Response.json(result);
    };
    process.env.NODE_ENV = "development";
    assert.equal(await verifyTurnstile("test-token", dummySecret, "localhost"), true);
    assert.equal(await verifyTurnstile("test-token", "other-secret", "localhost"), false);
    result.success = false;
    assert.equal(await verifyTurnstile("test-token", dummySecret, "localhost"), false);

    process.env.NODE_ENV = "production";
    result = { success: true, hostname: "rooklyn.co", action: "contact" };
    const callsBeforeDummy = calls;
    assert.equal(await verifyTurnstile("test-token", dummySecret, "rooklyn.co"), false);
    assert.equal(calls, callsBeforeDummy);
    assert.equal(await verifyTurnstile("test-token", "other-secret", "rooklyn.co,www.rooklyn.co"), true);
    result.hostname = "www.rooklyn.co";
    assert.equal(await verifyTurnstile("test-token", "other-secret", "rooklyn.co,www.rooklyn.co"), true);
    result.hostname = "attacker.example";
    assert.equal(await verifyTurnstile("test-token", "other-secret", "rooklyn.co"), false);
    result = { success: true, hostname: "rooklyn.co", action: "signup" };
    assert.equal(await verifyTurnstile("test-token", "other-secret", "rooklyn.co"), false);
    result = { success: false, hostname: "rooklyn.co", action: "contact" };
    assert.equal(await verifyTurnstile("test-token", "other-secret", "rooklyn.co"), false);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
  }
});

test("Turnstile fails closed on unavailable or malformed Siteverify responses", async () => {
  const originalFetch = globalThis.fetch;
  try {
    for (const response of [
      () => new Response("unavailable", { status: 503 }),
      () => new Response("not JSON"),
      () => Response.json(null),
      () => Response.json({ success: "true", hostname: "rooklyn.co", action: "contact" }),
      () => { throw new Error("Network unavailable"); },
    ]) {
      globalThis.fetch = async () => response();
      assert.equal(await verifyTurnstile("test-token", "test-secret", "rooklyn.co"), false);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
