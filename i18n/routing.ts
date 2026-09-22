import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "it"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
  },
});
