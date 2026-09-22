"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnchorButton } from "@/components/ui/AnchorButton";
import { FadeIn } from "@/components/motion/FadeIn";

export function Benefits() {
  const t = useTranslations("benefits");
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const tiles = [1, 2, 3, 4].map((n) => ({
    figure: t(`tile${n}Figure`),
    label: t(`tile${n}Label`),
    body: t(`tile${n}Body`),
  }));

  const outcomes = [1, 2, 3, 4, 5, 6].map((n) => t(`outcome${n}`));

  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-section-mobile sm:py-section-tablet md:py-section landscape-phone:py-10"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-8%] h-[360px] w-[360px] rounded-full bg-lagoon/[0.12] blur-[110px] md:h-[480px] md:w-[480px]" />
        <div className="absolute bottom-[-15%] left-[-8%] h-[320px] w-[320px] rounded-full bg-garnet/20 blur-[100px] md:h-[420px] md:w-[420px]" />
      </div>

      <div className="site-container relative">
        <SectionHeader
          number="04"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titlePre")}{" "}
              <span className="font-display italic text-champagne">
                {t("titleItalic")}
              </span>
            </>
          }
          intro={t("intro")}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <FadeIn key={tile.label} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-7">
                <p
                  className="font-display flex min-h-16 items-start bg-gradient-to-br from-champagne to-champagne-light bg-clip-text text-[clamp(2rem,3.3vw,2.65rem)] leading-[1.04] text-transparent sm:min-h-[6.25rem] lg:min-h-[6.75rem]"
                >
                  {tile.figure}
                </p>
                <p className="mt-2 text-[18px] font-semibold leading-6 text-porcelain sm:text-[19px]">
                  {tile.label}
                </p>
                <p className="mt-1.5 text-[19px] leading-[1.6] text-text-3 sm:text-[20px] lg:text-[21px]">{tile.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
          {outcomes.map((outcome, i) => (
            <FadeIn key={outcome} delay={i * 0.03}>
              <div className="flex items-start gap-3 text-[18px] text-text-2 sm:text-[19px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                {outcome}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12">
          <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9">
            <span className="eyebrow !text-[15px] tracking-[0.16em] text-text-3">
              {t("caseLabel")}
            </span>
            <h3 className="mt-3">{t("caseTitle")}</h3>
            <p className="mt-2 max-w-2xl text-[19px] text-text-3 sm:text-[20px] lg:text-[21px]">{t("caseBody")}</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-[16px] sm:text-[17px]">
                <span className="text-text-3 line-through">{t("caseBefore1")}</span>
                <span aria-hidden>→</span>
                <span className="text-lagoon">{t("caseAfter1")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-[16px] sm:text-[17px]">
                <span className="text-text-3 line-through">{t("caseBefore2")}</span>
                <span aria-hidden>→</span>
                <span className="text-lagoon">{t("caseAfter2")}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 flex flex-col gap-3.5 sm:flex-row">
          <AnchorButton href="#contact" variant="primary" className="w-full sm:w-auto">
            {t("ctaPrimary")}
          </AnchorButton>
          {whatsapp && (
            <AnchorButton
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </AnchorButton>
          )}
        </div>
      </div>
    </section>
  );
}
