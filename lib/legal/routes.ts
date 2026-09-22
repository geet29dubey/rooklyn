import type { Locale } from "@/i18n/routing";

export type LegalKind = "privacy" | "cookies" | "notice";

export const legalPaths: Record<Locale, Record<LegalKind, string>> = {
  en: {
    privacy: "/privacy-policy",
    cookies: "/cookie-policy",
    notice: "/legal-notice",
  },
  es: {
    privacy: "/politica-privacidad",
    cookies: "/politica-cookies",
    notice: "/aviso-legal",
  },
  it: {
    privacy: "/informativa-sulla-privacy",
    cookies: "/cookie-policy",
    notice: "/note-legali",
  },
};

export function legalPath(locale: Locale, kind: LegalKind) {
  return legalPaths[locale][kind];
}

export function fullLegalPath(locale: Locale, kind: LegalKind) {
  return `/${locale}${legalPath(locale, kind)}`;
}
