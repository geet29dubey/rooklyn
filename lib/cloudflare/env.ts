import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Typed access to Cloudflare bindings and secrets. Falls back to
 * `process.env` when no Cloudflare context is available (e.g. during a
 * plain `next build` type-check), which keeps local tooling working.
 */
export function getEnv(): CloudflareEnv {
  try {
    return getCloudflareContext().env as unknown as CloudflareEnv;
  } catch {
    return process.env as unknown as CloudflareEnv;
  }
}

export function getWaitUntil(): (promise: Promise<unknown>) => void {
  try {
    const context = getCloudflareContext();
    return (promise) => context.ctx.waitUntil(promise);
  } catch {
    // Local `next dev` without the Cloudflare dev binding shim: run inline.
    return (promise) => {
      void promise;
    };
  }
}
