"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
};

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-3 text-[13px] font-medium text-text-2 transition-colors hover-fine:hover:border-champagne/40",
        compact ? "h-9" : "h-10"
      )}
    >
      <Globe
        aria-hidden
        className="h-4 w-4 shrink-0 text-champagne"
        strokeWidth={1.5}
      />
      <select
        aria-label="Language"
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        className="min-h-[32px] appearance-none bg-transparent pr-5 uppercase tracking-wide text-porcelain focus-visible:outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="bg-card text-porcelain">
            {LABELS[l]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 10 6"
        className="pointer-events-none absolute right-3 h-1.5 w-2.5 text-text-3"
      >
        <path
          d="M1 1l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
