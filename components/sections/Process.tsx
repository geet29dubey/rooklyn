"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

export function Process() {
  const t = useTranslations("process");

  const steps = [1, 2, 3, 4].map((n) => ({
    number: String(n).padStart(2, "0"),
    title: t(`step${n}Title`),
    duration: t(`step${n}Duration`),
    body: t(`step${n}Body`),
  }));

  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-hairline bg-night-2 py-section-mobile sm:py-section-tablet md:py-section landscape-phone:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(42,92,170,0.15),transparent_68%)]"
      />
      <div className="site-container relative">
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

        <ol className="grid gap-4 md:grid-cols-2 md:gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.title} as="li" delay={i * 0.06}>
              <article className="relative h-full min-h-[250px] overflow-hidden rounded-[20px] border border-porcelain/[0.12] bg-night/70 p-6 shadow-[0_24px_70px_-52px_rgba(0,0,0,0.95)] sm:p-8 lg:min-h-[280px] lg:p-9">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent"
                />
                <span
                  aria-hidden
                  className="font-display absolute -bottom-7 right-4 text-[118px] font-semibold leading-none text-porcelain/[0.025] sm:text-[150px]"
                >
                  {step.number}
                </span>

                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-apricot/45 bg-apricot/[0.08] px-2 font-sans text-[14px] font-bold tracking-[0.16em] text-apricot">
                    {step.number}
                  </span>
                  <span className="rounded-full border border-hairline bg-card/45 px-3 py-1.5 text-[16px] font-semibold text-text-2 sm:text-[17px]">
                    {step.duration}
                  </span>
                </div>

                <div className="relative mt-7 max-w-[34rem]">
                  <h3 className="text-[28px] sm:text-[30px]">{step.title}</h3>
                  <p className="mt-3 text-[19px] leading-[1.6] text-text-2 sm:text-[20px] lg:text-[21px]">
                    {step.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="absolute bottom-6 left-6 h-1.5 w-1.5 rotate-45 bg-lagoon sm:bottom-8 sm:left-8"
                />
              </article>
            </FadeIn>
          ))}
        </ol>

        <p className="mt-6 text-[17px] text-text-3 sm:text-[18px]">{t("note")}</p>
      </div>
    </section>
  );
}
