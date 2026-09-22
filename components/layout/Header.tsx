"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_SECTIONS } from "@/config/site";

export function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-transparent"
        style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
      >
        <div className="site-container-wide">
          <div className="flex h-[66px] items-center justify-between rounded-full border border-porcelain/[0.12] bg-night/90 px-4 shadow-[0_18px_55px_-32px_rgba(0,0,0,0.9)] backdrop-blur-xl landscape-phone:h-[52px] md:h-[72px] md:px-5 xl:grid xl:min-h-[86px] xl:grid-cols-[1fr_auto_1fr] xl:gap-6 xl:px-7">
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3"
              aria-label="Rooklyn — home"
            >
              <RooklynMark size={42} className="h-9 w-9 md:h-[42px] md:w-[42px]" />
              <span className="brand-wordmark font-display text-[19px] text-champagne md:text-[22px]">
                ROOKLYN
              </span>
            </Link>

            <nav
              className="hidden items-center gap-6 xl:flex 2xl:gap-9"
              aria-label="Primary"
            >
              {NAV_SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`/#${section.id}`}
                  className="whitespace-nowrap text-[20px] font-medium text-porcelain/90 transition-colors hover-fine:hover:text-porcelain 2xl:text-[21px]"
                >
                  {t(section.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-4 xl:justify-self-end">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              <Link
                href="/#contact"
                className="hidden min-h-[56px] items-center gap-2 rounded-full bg-porcelain px-7 text-[18px] font-bold text-night xl:inline-flex"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-apricot"
                />
                {t("cta")}
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={t("menu")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline xl:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
