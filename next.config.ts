import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Plain `next dev` does not need workerd: the app already falls back to
// process.env for local bindings. Opt into the Cloudflare binding shim only
// when explicitly testing it. This also avoids workerd SQLite SHM failures
// when the checkout lives on a Windows-mounted drive under WSL.
if (process.env.CLOUDFLARE_DEV === "1") {
  initOpenNextCloudflareForDev();
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Cloudflare Web Analytics + Turnstile + self only. Marketing/analytics
    // domains beyond Cloudflare should be appended here only after consent.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://static.cloudflareinsights.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
      "frame-src https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Cloudflare's OpenNext adapter needs unoptimized images; a custom
  // Cloudflare Images loader can be wired in later.
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/politica-privacidad", destination: "/es/politica-privacidad", permanent: true },
      { source: "/politica-cookies", destination: "/es/politica-cookies", permanent: true },
      { source: "/aviso-legal", destination: "/es/aviso-legal", permanent: true },
      { source: "/privacy-policy", destination: "/en/privacy-policy", permanent: true },
      { source: "/cookie-policy", destination: "/en/cookie-policy", permanent: true },
      { source: "/Legal-notice", destination: "/en/legal-notice", permanent: true },
      { source: "/legal-notice", destination: "/en/legal-notice", permanent: true },
      { source: "/informativa-sulla-privacy", destination: "/it/informativa-sulla-privacy", permanent: true },
      { source: "/note-legali", destination: "/it/note-legali", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
