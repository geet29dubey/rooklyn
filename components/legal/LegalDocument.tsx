import { getTranslations, setRequestLocale } from "next-intl/server";
import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CookieSettingsLink } from "@/components/legal/CookieSettingsLink";
import { routing, type Locale } from "@/i18n/routing";
import { fullLegalPath, type LegalKind } from "@/lib/legal/routes";
import { translated } from "@/lib/legal/translated";
import spanish from "@/lib/legal/es.json";

type LegalBlock =
  | { type: "p" | "h1" | "h2" | "h3" | "listItem"; text: string }
  | { type: "table"; rows: string[][] };

const titles: Record<Locale, Record<LegalKind, string>> = {
  en: { privacy: "Privacy Policy", cookies: "Cookie Policy", notice: "Legal Notice" },
  es: { privacy: "Política de Privacidad", cookies: "Política de Cookies", notice: "Aviso Legal" },
  it: { privacy: "Informativa sulla Privacy", cookies: "Cookie Policy", notice: "Note Legali" },
};

function linkify(value: string) {
  return value.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!part.startsWith("http")) return part;
    const url = part.replace(/[.,;)]$/, "");
    const suffix = part.slice(url.length);
    return (
      <span key={`${url}-${index}`}>
        <a href={url} className="text-champagne underline underline-offset-2 break-all">{url}</a>
        {suffix}
      </span>
    );
  });
}

export async function legalMetadata(locale: Locale, kind: LegalKind): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rooklyn.co";
  const languages = Object.fromEntries(
    routing.locales.map((language) => [language, `${siteUrl}${fullLegalPath(language, kind)}`]),
  );
  return {
    title: titles[locale][kind],
    alternates: {
      canonical: `${siteUrl}${fullLegalPath(locale, kind)}`,
      languages: { ...languages, "x-default": `${siteUrl}${fullLegalPath("en", kind)}` },
    },
  };
}

export async function LegalDocument({
  locale,
  kind,
  servedLocale,
}: {
  locale: Locale;
  kind: LegalKind;
  servedLocale: Locale;
}) {
  if (locale !== servedLocale) permanentRedirect(fullLegalPath(locale, kind));
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const blocks = spanish[kind] as LegalBlock[];
  const document = locale === "es" ? null : translated[locale][kind];

  return (
    <article className="py-section-mobile sm:py-section-tablet md:py-section">
      <div className="site-container-wide max-w-[960px]">
        <h1 className="text-[2.7rem] leading-tight sm:text-[3.5rem]">{titles[locale][kind]}</h1>
        <p className="mt-3 text-[15px] text-text-2 sm:text-[16px]">
          {t("lastUpdated")}: {locale === "es" ? "21 de septiembre de 2026" : locale === "it" ? "21 settembre 2026" : "21 September 2026"}
        </p>

        {document ? (
          <div className="mt-10 space-y-9">
            <p className="text-[17px] leading-relaxed text-text-2 sm:text-[18px]">{linkify(document.intro)}</p>
            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.7rem] leading-tight sm:text-[2rem]">{section.heading}</h2>
                <div className="mt-4 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-none text-[16px] leading-[1.75] text-text-2 sm:text-[17px]">{linkify(paragraph)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {blocks.slice(2).map((block, index) => {
              if (block.type === "table") {
                return (
                  <div key={index} className="overflow-x-auto rounded-xl border border-hairline">
                    <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-relaxed text-text-2">
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-b border-hairline last:border-0">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className={`px-4 py-3 align-top ${cellIndex === 0 ? "font-semibold text-porcelain" : ""}`}>{linkify(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.type === "h1") return <h2 key={index} className="!mt-10 text-[1.7rem] leading-tight sm:text-[2rem]">{block.text}</h2>;
              if (block.type === "h2") return <h3 key={index} className="!mt-7 text-[1.4rem] leading-tight">{block.text}</h3>;
              if (block.type === "h3") return <h4 key={index} className="!mt-6 text-[1.25rem] font-semibold">{block.text}</h4>;
              if (block.type === "listItem") return <p key={index} className="max-w-none pl-5 text-[16px] leading-[1.75] text-text-2 before:-ml-5 before:mr-3 before:content-['•'] sm:text-[17px]">{linkify(block.text)}</p>;
              return <p key={index} className="max-w-none text-[16px] leading-[1.75] text-text-2 sm:text-[17px]">{linkify(block.text)}</p>;
            })}
          </div>
        )}

        {kind === "cookies" && <CookieSettingsLink label={t("cookieSettingsLink")} />}
        <Link href="/" className="mt-12 inline-block text-[16px] text-champagne underline underline-offset-2">
          {t("backHome")}
        </Link>
      </div>
    </article>
  );
}
