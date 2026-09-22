import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { fullLegalPath, type LegalKind } from "@/lib/legal/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rooklyn.co";
const LEGAL_KINDS: LegalKind[] = ["privacy", "cookies", "notice"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const homeLanguages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`]),
  );
  homeLanguages["x-default"] = `${SITE_URL}/${routing.defaultLocale}`;
  for (const locale of routing.locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    });
  }

  for (const kind of LEGAL_KINDS) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${SITE_URL}${fullLegalPath(locale, kind)}`;
    }
    languages["x-default"] = `${SITE_URL}${fullLegalPath(routing.defaultLocale, kind)}`;

    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${fullLegalPath(locale, kind)}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.4,
        alternates: { languages },
      });
    }
  }

  return entries;
}
