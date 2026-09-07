import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Uses the default in-memory incremental cache so a first-time deploy does not
// require an R2 bucket. Add an R2 override here when persistent ISR caching is
// needed.
export default defineCloudflareConfig({});
