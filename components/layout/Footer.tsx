import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { CookieSettingsLink } from "@/components/legal/CookieSettingsLink";
import type { Locale } from "@/i18n/routing";
import { legalPath } from "@/lib/legal/routes";

export function Footer() {
  const t = useTranslations("footer");
  const legal = useTranslations("legal");
  const locale = useLocale() as Locale;

  const links = [
    { href: legalPath(locale, "privacy"), label: t("privacyPolicy") },
    { href: legalPath(locale, "cookies"), label: t("cookiePolicy") },
    { href: legalPath(locale, "notice"), label: t("legalNotice") },
  ] as const;

  return (
    <footer className="border-t border-hairline bg-night-2">
      <div className="site-container-wide flex flex-col gap-8 py-12 md:py-14 xl:gap-2 xl:pt-11 xl:pb-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-2 md:items-start xl:gap-1">
            <Link href="/" className="flex items-center gap-3">
              <RooklynMark size={42} className="h-9 w-9 md:h-[42px] md:w-[42px]" />
              <span className="brand-wordmark font-display text-[19px] text-champagne md:text-[22px]">
                ROOKLYN
              </span>
            </Link>
            <p className="font-display text-[18px] italic text-champagne md:text-[20px] xl:text-[16px]">
              {t("tagline")}
            </p>
          </div>
          <LanguageSwitcher dropUp />
        </div>

        <div className="h-px bg-hairline" />

        <div className="flex flex-col items-center gap-4 text-center text-[14px] text-text-3 md:flex-row md:justify-between md:text-left xl:text-[15px]">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 md:justify-end">
            {links.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>·</span>}
                <Link
                  href={link.href}
                  className="min-h-[44px] py-2 xl:min-h-7 xl:py-0 inline-flex items-center hover-fine:hover:text-porcelain"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden>·</span>
              <CookieSettingsLink label={legal("cookieSettingsLink")} className="inline-flex min-h-[44px] items-center py-2 xl:min-h-7 xl:py-0 text-text-3 hover-fine:hover:text-porcelain" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
