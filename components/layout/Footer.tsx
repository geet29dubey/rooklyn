import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("footer");

  const links = [
    { href: "/privacy-policy", label: t("privacyPolicy") },
    { href: "/cookie-policy", label: t("cookiePolicy") },
    { href: "/data-protection", label: t("dataProtection") },
    { href: "/legal-notice", label: t("legalNotice") },
  ] as const;

  return (
    <footer className="border-t border-hairline bg-night-2">
      <div className="container max-w-container flex flex-col gap-8 py-12 md:py-14">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <Link href="/" className="flex items-center gap-3">
            <RooklynMark size={26} />
            <span className="font-display text-[15px] tracking-[0.28em] text-champagne">
              ROOKLYN
            </span>
          </Link>
          <p className="font-display italic text-champagne text-[16px]">
            {t("tagline")}
          </p>
          <LanguageSwitcher />
        </div>

        <div className="h-px bg-hairline" />

        <div className="flex flex-col items-center gap-4 text-center text-[13px] text-text-3 md:flex-row md:justify-between md:text-left">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 md:justify-end">
            {links.map((link, i) => (
              <li key={link.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>·</span>}
                <Link
                  href={link.href}
                  className="min-h-[44px] py-2 inline-flex items-center hover-fine:hover:text-porcelain"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
