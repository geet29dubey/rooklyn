"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function Process() {
  const t = useTranslations("process");

  const steps = [1, 2, 3, 4].map((n) => ({
    numeral: t(`step${n}Numeral`),
    title: t(`step${n}Title`),
    duration: t(`step${n}Duration`),
    body: t(`step${n}Body`),
  }));

  return (
    <section id="process" className="py-section-mobile md:py-section">
      <div className="container max-w-container">
        <SectionHeader
          number="03"
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

        <ol className="relative flex flex-col gap-10 pl-8 md:grid md:grid-cols-4 md:gap-6 md:pl-0">
          <div
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-px bg-hairline md:left-0 md:right-0 md:top-[13px] md:h-px md:w-auto"
          />
          {steps.map((step, i) => (
            <FadeIn key={step.title} as="li" delay={i * 0.08} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-1 h-[7px] w-[7px] rotate-45 bg-garnet md:left-1/2 md:top-[10px] md:-translate-x-1/2"
              />
              <p className="font-display text-[32px] italic leading-none text-champagne md:text-[40px]">
                {step.numeral}
              </p>
              <h3 className="mt-3">{step.title}</h3>
              <span className="mt-2 inline-block rounded-full border border-hairline px-3 py-1 text-[11px] text-text-3">
                {step.duration}
              </span>
              <p className="mt-3 text-[15px] text-text-2">{step.body}</p>
            </FadeIn>
          ))}
        </ol>

        <p className="mt-10 text-[13px] text-text-3">{t("note")}</p>
      </div>
    </section>
  );
}
