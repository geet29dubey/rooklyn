"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NAV_SECTIONS } from "@/config/site";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener("change", closeOnDesktop);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const panel = panelRef.current;
    const focusable = Array.from(panel?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    ) ?? []).filter((element) => element.getClientRects().length > 0);
    focusable?.[0]?.focus();

    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trap);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", trap);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className="fixed inset-x-0 top-0 z-[60] flex h-dvh flex-col overflow-y-auto overscroll-contain bg-night xl:hidden"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
    >
      <div className="flex min-h-16 shrink-0 items-center justify-between px-4 py-2">
        <NextLink
          href={`/${locale}`}
          onClick={onClose}
          scroll={false}
          onNavigate={() => window.scrollTo({ top: 0, behavior: "instant" })}
          aria-label="Rooklyn — home"
          className="flex max-w-[185px] items-center gap-2"
        >
          <RooklynMark size={36} />
          <span className="brand-wordmark font-display text-[19px] text-champagne">ROOKLYN</span>
        </NextLink>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-5 pb-5">
        <ul className="grid gap-2 pt-4 landscape-phone:grid-cols-2 landscape-phone:gap-x-6">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                onClick={onClose}
                className="font-display block min-h-[44px] py-2 text-[34px] leading-tight text-porcelain hover-fine:hover:text-champagne sm:text-[36px]"
              >
                {t(section.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-6">
          <LanguageSwitcher inline onNavigate={onClose} />
          <Link
            href="/#contact"
            onClick={onClose}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full bg-porcelain px-7 py-4 text-center text-[17px] font-bold text-night sm:text-[19px]"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-champagne" />
            {t("cta")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
