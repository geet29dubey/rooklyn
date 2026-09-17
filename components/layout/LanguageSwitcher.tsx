"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-[13px] font-semibold tracking-wide",
        compact && "gap-0.5"
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-text-3 px-1">·</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-current={locale === l ? "true" : undefined}
            className={cn(
              "min-h-[32px] px-1.5 uppercase transition-colors",
              locale === l
                ? "text-champagne"
                : "text-text-3 hover-fine:hover:text-porcelain"
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
