"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { legalPaths, type LegalKind } from "@/lib/legal/routes";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
};

export function LanguageSwitcher({
  compact = false,
  dropUp = false,
  inline = false,
  onNavigate,
}: {
  compact?: boolean;
  dropUp?: boolean;
  inline?: boolean;
  onNavigate?: () => void;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  }

  function equivalentPath(next: Locale) {
    const kind = (Object.keys(legalPaths[locale]) as LegalKind[]).find(
      (key) => Object.values(legalPaths).some((paths) => paths[key] === pathname)
    );
    return kind ? legalPaths[next][kind] : pathname;
  }

  return (
    <>
      <div role="group" aria-label="Languages" className={cn("grid grid-cols-3 gap-2", !inline && "md:hidden")}>
        {locales.map((language) => (
          <Link
            key={language}
            href={equivalentPath(language)}
            locale={language}
            onClick={onNavigate}
            aria-current={language === locale ? "true" : undefined}
            className={cn(
              "flex min-h-12 items-center justify-center rounded-full border border-hairline px-3 text-[16px] text-text-2",
              language === locale && "text-champagne"
            )}
          >
            {LABELS[language]}
          </Link>
        ))}
      </div>
      <div
        ref={rootRef}
        className={cn("relative", inline ? "hidden" : "hidden md:block")}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            rootRef.current?.querySelector("button")?.focus();
          }
        }}
      >
        <button
          type="button"
          aria-label={`Language: ${LABELS[locale]}`}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => {
            setOpen((value) => window.matchMedia("(hover: hover) and (pointer: fine)").matches ? true : !value);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => {
                optionRefs.current[event.key === "ArrowDown" ? 0 : locales.length - 1]?.focus();
              });
            }
          }}
          className={cn(
            "flex w-full items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-4 text-[17px] font-medium text-porcelain/90 transition-colors hover-fine:hover:border-champagne/40",
            compact ? "h-10" : "h-11 xl:h-[46px]"
          )}
        >
          <Globe aria-hidden className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
          <span className="uppercase">{LABELS[locale]}</span>
          <svg aria-hidden viewBox="0 0 10 6" className="ml-auto h-1.5 w-2.5 shrink-0 text-text-3">
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            id={listId}
            role="group"
            aria-label="Languages"
            className={cn(
              "absolute right-0 z-50 min-w-[180px] w-full",
              dropUp ? "bottom-full pb-2" : "top-full pt-2"
            )}
          >
            <div className="overflow-hidden rounded-2xl border border-hairline bg-card p-1 shadow-[0_18px_55px_-32px_rgba(0,0,0,0.9)]">
              {locales.map((language, index) => (
                <button
                  key={language}
                  ref={(element) => { optionRefs.current[index] = element; }}
                  type="button"
                  aria-current={language === locale ? "true" : undefined}
                  onClick={() => switchTo(language)}
                  className={cn(
                    "block min-h-11 w-full rounded-xl px-3 text-left text-[17px] text-text-2 transition-colors hover-fine:hover:bg-white/[0.06] hover-fine:hover:text-porcelain focus-visible:bg-white/[0.06]",
                    language === locale && "text-champagne"
                  )}
                >
                  {LABELS[language]}
                </button>
              ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
