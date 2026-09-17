"use client";

import { useTranslations } from "next-intl";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { Chip } from "@/components/ui/Chip";
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
        <div className="absolute -top-20 right-[-10%] h-[420px] w-[420px] rounded-full bg-garnet/30 blur-[110px] animate-drift md:h-[560px] md:w-[560px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[360px] w-[360px] rounded-full bg-lagoon/25 blur-[100px] animate-drift md:h-[480px] md:w-[480px]" />
        <div className="absolute right-0 top-1/3 hidden h-[400px] w-[400px] rounded-full bg-atlantic/20 blur-[110px] md:block" />
      </div>

      <div className="container relative max-w-container">
        <div className="grid items-center gap-14 md:grid-cols-[55%_1fr] md:gap-10">
          <div>
            <div className="mb-7 flex flex-wrap gap-2.5">
              <Chip dotClassName="bg-lagoon">{t("chip1")}</Chip>
              <Chip dotClassName="bg-atlantic">{t("chip2")}</Chip>
              <Chip dotClassName="bg-champagne">{t("chip3")}</Chip>
            </div>

            <h1>
              {t("h1Pre")}{" "}
              <span className="relative inline-block font-display italic text-champagne">
                {t("h1Italic")}
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 w-full text-champagne/70"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 60 2, 120 10, 180 5 C 220 2, 260 8, 298 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-[17px] text-text-2 md:text-[18px]">
              {t("subheadline")}
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <AnchorButton href="#contact" variant="primary" className="w-full sm:w-auto">
                {t("ctaPrimary")}
              </AnchorButton>
              <AnchorButton href="#process" variant="secondary" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </AnchorButton>
            </div>

            <p className="mt-6 text-[13px] text-text-3">{t("trust")}</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="relative flex h-[200px] w-[200px] items-center justify-center sm:h-[220px] sm:w-[220px] md:h-[240px] md:w-[240px]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,#22364B,#0B131C_75%)] shadow-[0_0_80px_-10px_rgba(158,42,69,0.45)]"
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
                className="absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-garnet animate-orbit sm:block"
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
