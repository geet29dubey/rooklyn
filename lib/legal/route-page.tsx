import type { Metadata } from "next";
import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";
import type { Locale } from "@/i18n/routing";
import type { LegalKind } from "./routes";

type Props = { params: Promise<{ locale: Locale }> };

export function createLegalRoute(kind: LegalKind, servedLocale: Locale | "en-or-it") {
  return {
    async metadata({ params }: Props): Promise<Metadata> {
      return legalMetadata((await params).locale, kind);
    },
    async Page({ params }: Props) {
      const { locale } = await params;
      const target = servedLocale === "en-or-it" && locale === "it" ? "it" : servedLocale === "en-or-it" ? "en" : servedLocale;
      return <LegalDocument locale={locale} kind={kind} servedLocale={target} />;
    },
  };
}
