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
