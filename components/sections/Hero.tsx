"use client";

import { useTranslations } from "next-intl";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { AnchorButton } from "@/components/ui/AnchorButton";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-[-10%] h-[380px] w-[380px] rounded-full bg-garnet/25 blur-[110px] animate-drift md:h-[520px] md:w-[520px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[340px] w-[340px] rounded-full bg-lagoon/[0.14] blur-[100px] animate-drift md:h-[460px] md:w-[460px]" />
      </div>

      <div className="container relative max-w-container">
        <div className="grid items-center gap-14 md:grid-cols-[56%_1fr] md:gap-10">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>

            <h1 className="mt-5">
              {t("h1Pre")}{" "}
              <span className="relative inline-block font-display italic text-champagne">
                {t("h1Italic")}
                <svg
                  aria-hidden
                  viewBox="0 0 300 14"
                  className="absolute -bottom-2 left-0 w-full text-champagne/80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 6 L96 6 L104 10 L198 10 L206 6 L298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[17px] leading-[1.6] text-porcelain md:text-[18px]">
              {t("subheadline")}
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <AnchorButton href="#solutions" variant="primary" className="w-full sm:w-auto">
                {t("ctaPrimary")}
              </AnchorButton>
              <AnchorButton href="#contact" variant="secondary" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </AnchorButton>
            </div>

            <p className="mt-6 text-[13px] tracking-wide text-text-3">{t("trust")}</p>

            <div className="mt-9 flex items-center gap-3 border-t border-hairline pt-6">
              <span aria-hidden className="h-[3px] w-6 shrink-0 bg-champagne" />
              <p className="font-display text-[16px] italic text-champagne">
                {t("brandProposition")}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,#1D323F,#0D1923_75%)]"
              />
              <div
                aria-hidden
                className="absolute inset-[6%] rounded-full border border-champagne/35"
              />
              <div
                aria-hidden
                className="absolute inset-[16%] rounded-full border border-porcelain/[0.08]"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lagoon animate-orbit sm:block"
              />
              <RooklynMark size={104} className="relative" />
            </div>

            <div className="grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-3 md:absolute md:static md:grid-cols-1 md:gap-4">
              {[t("card1"), t("card2"), t("card3")].map((label, i) => (
                <div
                  key={label}
                  className="animate-bob rounded-2xl border border-hairline bg-card/80 px-4 py-3 text-center text-[13px] text-text-2 backdrop-blur-sm sm:text-left"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
