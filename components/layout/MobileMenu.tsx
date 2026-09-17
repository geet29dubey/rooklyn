"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
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
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", trap);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-50 bg-night lg:hidden"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <RooklynMark size={28} />
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex h-[calc(100%-72px)] flex-col justify-between overflow-y-auto px-6 pb-8 landscape-phone:h-auto">
        <ul className="grid gap-2 pt-4 landscape-phone:grid-cols-2 landscape-phone:gap-x-6">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <Link
                href={`/#${section.id}`}
                onClick={onClose}
                className="font-display block min-h-[44px] py-2 text-3xl text-porcelain hover-fine:hover:text-champagne"
              >
                {t(section.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6 pt-8">
          <LanguageSwitcher />
          <Link
            href="/#contact"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-porcelain px-6 py-3.5 text-[15px] font-semibold text-night"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-apricot" />
            {t("cta")}
          </Link>
        </div>
      </nav>
    </div>
  );
}
