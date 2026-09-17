// verify against the current OpenNext Cloudflare docs
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // No ISR/on-demand revalidation is used (all pages are pre-rendered
  // statically), so no incremental cache (R2/KV) is configured.
  // TODO: if ISR is added later, wire up the R2 incremental cache here,
  // e.g. `incrementalCache: r2IncrementalCache`.
});
