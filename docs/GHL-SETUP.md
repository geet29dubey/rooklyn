# Connecting GoHighLevel (GHL)

The website works fully without GHL connected: the contact form still
validates, notifies the team by email, and the GHL destination is skipped
silently (`"GHL destination disabled"` in the Workers Logs). Follow these
steps whenever you're ready to wire up GHL workflows.

## 1. Create the custom fields in GHL

In your GHL sub-account, go to **Settings → Custom Fields** and create one
custom field per row below (the type matters for how GHL displays and
filters the field):

| Field | Type |
|---|---|
| Job title | Text |
| Industry | Text or dropdown |
| Company size | Text or dropdown |
| Automation interests | Text (comma-separated) or multi-select |
| Channels | Text (comma-separated) or multi-select |
| Monthly enquiries | Text or dropdown |
| Current tools | Text |
| Challenge | Large text |
| Timeline | Text or dropdown |
| Preferred language | Text |
| Heard about us | Text |
| Privacy consent at | Date |
| Marketing opt-in | Checkbox |
| UTM source / medium / campaign / term / content | Text |
| Page URL | Text |
| Referrer | Text |

## 2. Paste the field IDs into the map

Each custom field has an ID (visible in the field's settings, or via the
GHL API). Open `/config/ghl-field-map.ts` and replace every
`[GHL_CF_...]` placeholder with the real ID.

## 3. Create the Inbound Webhook workflow (recommended starting point)

1. In GHL, go to **Automation → Workflows → Create Workflow**.
2. Add an **Inbound Webhook** trigger. GHL gives you a unique URL.
3. Inside the workflow, map the incoming JSON fields (see the payload
   shape in `lib/leads/normalize.ts`) to the contact's standard and custom
   fields, and add any branching (e.g. tag-based routing, notifications,
   pipeline creation) you need.
4. Copy the webhook URL into `GHL_INBOUND_WEBHOOK_URL`.

If you'd rather integrate directly against the GHL API (upsert contact,
create an opportunity, add a note) instead of a workflow, set
`GHL_MODE=api` and fill in `GHL_API_BASE`, `GHL_API_TOKEN`,
`GHL_LOCATION_ID`, and optionally `GHL_PIPELINE_ID` /
`GHL_PIPELINE_STAGE_ID`. The API adapter lives in
`lib/leads/destinations/ghl.ts` - review the `// TODO: verify against
current GHL API docs before going live` markers before switching modes.

## 4. Set the environment variables

- Locally: copy `.dev.vars.example` to `.dev.vars` and fill in the values.
- On Cloudflare: `wrangler secret put GHL_INBOUND_WEBHOOK_URL` (and the
  other secrets), or add them in the Cloudflare dashboard under
  **Workers & Pages → your worker → Settings → Variables**.
- `GHL_MODE` is a non-secret variable, already set in `wrangler.jsonc`.

## 5. Send a test lead

```bash
npm run test:lead
```

This posts a sample payload to your local `/api/lead` endpoint (make sure
`npm run dev` or `npm run preview` is running) so you can confirm the lead
arrives in GHL with the right fields and tags before going live.
