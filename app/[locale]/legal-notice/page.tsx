import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { LegalLayout } from "@/components/legal/LegalLayout";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.legalNotice" });
  return { title: t("title") };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const page = await getTranslations({ locale, namespace: "legal.legalNotice" });

  const sections = page.raw("sections") as { heading: string; body: string }[];

  return (
    <LegalLayout
      title={page("title")}
      lastUpdated="September 2026"
      lastUpdatedLabel={t("lastUpdated")}
      devNote={t("devNote")}
      backHomeLabel={t("backHome")}
      sections={sections}
    />
  );
}
