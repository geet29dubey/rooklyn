# Rooklyn — marketing website

A premium, multilingual (EN/ES/IT) marketing site for Rooklyn, an AI
automation agency, built with Next.js 16 (App Router), Tailwind CSS and
next-intl, and deployed to **Cloudflare Workers** via OpenNext.

## Stack

- Next.js 16 + TypeScript, App Router
- Tailwind CSS with the Rooklyn brand tokens
- next-intl for `/en`, `/es`, `/it` routing
- React Hook Form + Zod for the lead form
- Framer Motion for subtle, reduced-motion-aware animation
- Cloudflare Workers via `@opennextjs/cloudflare` + Wrangler

## Local development

In PowerShell, from the project directory:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000/en` (or `/es` or `/it`). The contact form shows a
localized thank-you message after a successful submission. Plain `next dev`
reads server variables from `.env.local`. To test a successful submission
locally, add `TURNSTILE_HOSTNAMES=localhost` and the existing
`TURNSTILE_SECRET_KEY` to that ignored file. Add `GHL_INBOUND_WEBHOOK_URL` there
only if you intend the test lead to reach GHL. Without the Turnstile secret,
the lead endpoint rejects submissions.

For the Cloudflare runtime preview below, copy `.dev.vars.example` to
`.dev.vars` and set the same secret there. Both local files are gitignored.

## Testing in the real Workers runtime

```bash
npm run preview
```

This builds with the OpenNext Cloudflare adapter and runs the Worker
locally with `wrangler dev`, so bindings, headers and the rate limiter
behave exactly as they will in production.

## Deploying

```bash
npm run deploy
```

Builds with OpenNext and deploys with Wrangler. In CI, connect the GitHub
repository to **Cloudflare Workers Builds** with:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`

Pull requests get preview deployments automatically.

### Secrets

Set on Cloudflare with `wrangler secret put NAME`, or in the dashboard
under **Workers & Pages → rooklyn-web → Settings → Variables**:

`RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`,
`TURNSTILE_SECRET_KEY`, `GHL_INBOUND_WEBHOOK_URL` (or the `GHL_API_*`
secrets if using API mode), `LEAD_WEBHOOK_URL` (optional).

Turnstile also requires `TURNSTILE_HOSTNAMES`: a comma-separated list of the
exact frontend hostnames accepted by the widget for this deployment. Set only
the production hostname(s) in production (`rooklyn.co` is configured in
`wrangler.jsonc`); use `localhost,127.0.0.1` locally.
The contact form uses the site key in `.env.example` and verifies the token's
`contact` action and hostname on the server. A missing secret or hostname
configuration makes the lead endpoint return 503 rather than accepting an
unverified submission.

### Build variables

`NEXT_PUBLIC_*` variables are inlined into the client bundle at **build**
time, so they must be set as Workers Builds variables (or exported in the
shell before `npm run deploy`), not only as runtime secrets. See
`.env.example` for the full list.

### Custom domain

The production Worker hostname is `rooklyn.co`.

## Connecting GoHighLevel

The lead form works end-to-end without GHL connected (it still validates
and sends the internal email notification; the GHL destination is skipped
silently). See [`docs/GHL-SETUP.md`](docs/GHL-SETUP.md) for the full setup
guide, and `/config/ghl-field-map.ts` for the field mapping.

## Project structure

```
app/[locale]/          Localised pages (home, legal pages), layout, OG image
app/api/lead/           Lead intake API route (the only dynamic route)
components/             UI, layout, sections, forms, logo, motion
config/                 Site navigation/options, GHL field map
i18n/                   next-intl routing, navigation, request config
lib/leads/               Schema, normalisation, dispatcher, destinations
lib/security/turnstile.ts  Server-side Turnstile verification
lib/cloudflare/env.ts   Typed access to Cloudflare bindings/secrets
messages/                en.json, es.json, it.json - all site copy
docs/GHL-SETUP.md       GoHighLevel connection guide
```

## Notes

- Every OpenNext/Wrangler setting is marked `// verify against the current
  OpenNext Cloudflare docs` since the adapter evolves quickly.
- All pages are statically pre-rendered per locale; only `/api/lead` is
  dynamic. No ISR/R2 incremental cache is configured (see
  `open-next.config.ts` for where to add it if that changes).
- Legal pages are templates with `[bracketed placeholders]` - review with
  a legal professional before publishing, per the note shown on each page
  in development.
