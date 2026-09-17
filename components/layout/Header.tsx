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
        className="sticky top-0 z-40 w-full"
        style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
      >
        <div className="container max-w-container">
          <div className="flex h-14 items-center justify-between rounded-full border border-hairline bg-[rgba(11,19,28,0.72)] pl-3 pr-2 backdrop-blur-md landscape-phone:h-[52px] md:h-16 md:pl-4 md:pr-3">
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3"
              aria-label="Rooklyn — home"
            >
              <RooklynMark size={28} />
              <span className="font-display hidden text-[15px] tracking-[0.22em] text-champagne sm:inline md:text-[16px] md:tracking-[0.3em]">
                ROOKLYN
              </span>
            </Link>

            <nav
              className="hidden items-center gap-7 lg:flex"
              aria-label="Primary"
            >
              {NAV_SECTIONS.map((section) => (
                <Link
                  key={section.id}
                  href={`/#${section.id}`}
                  className="text-[14px] text-text-2 transition-colors hover-fine:hover:text-porcelain"
                >
                  {t(section.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              <Link
                href="/#contact"
                className="hidden min-h-[44px] items-center gap-2 rounded-full bg-porcelain px-5 text-[14px] font-semibold text-night lg:inline-flex"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline lg:hidden"
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
