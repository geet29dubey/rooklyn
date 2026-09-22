"use client";

import { useTranslations } from "next-intl";
import { Check, Clock3, Send } from "lucide-react";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { AnchorButton } from "@/components/ui/AnchorButton";

export function Hero() {
  const t = useTranslations("hero");
  const activityCards = [
    {
      label: t("card1"),
      Icon: Check,
      position: "left-1 top-[16%] sm:left-[2%] sm:top-[14%]",
      iconClass: "bg-lagoon/20 text-lagoon",
    },
    {
      label: t("card2"),
      Icon: Send,
      position: "right-0 top-[48%] sm:right-[1%]",
      iconClass: "bg-atlantic/20 text-porcelain",
    },
    {
      label: t("card3"),
      Icon: Clock3,
      position: "bottom-[13%] left-[4%] sm:bottom-[12%] sm:left-[7%]",
      iconClass: "bg-champagne/15 text-champagne",
    },
  ];

  return (
    <section className="home-hero relative overflow-hidden pb-16 pt-10 sm:pt-14 md:pb-[100px] md:pt-20 lg:pt-[164px] xl:flex xl:min-h-[calc(100svh-102px)] xl:items-center xl:pb-[110px] xl:pt-[208px] landscape-phone:pb-10 landscape-phone:pt-6">
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-[-10%] h-[380px] w-[380px] rounded-full bg-garnet/25 blur-[110px] animate-drift md:h-[520px] md:w-[520px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[340px] w-[340px] rounded-full bg-lagoon/[0.14] blur-[100px] animate-drift md:h-[460px] md:w-[460px]" />
      </div>

      <div className="site-container-wide hero-container relative">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-[clamp(3rem,4vw,4.5rem)]">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>

            <h1 className="mt-5 hero-headline">
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

            <p className="mt-6 max-w-[620px] text-[20px] font-medium leading-[1.55] text-porcelain sm:text-[22px] lg:text-[24px]">
              {t("subheadline")}
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <AnchorButton href="https://clima.rooklyn.co" variant="primary" className="w-full sm:w-auto">
                {t("ctaPrimary")}
              </AnchorButton>
              <AnchorButton href="#contact" variant="secondary" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </AnchorButton>
            </div>

            <p className="mt-3 text-[17px] font-medium leading-relaxed text-text-2 sm:text-[18px]">
              {t("demoMicrocopy")}
            </p>

            <p className="mt-6 text-[17px] font-medium leading-relaxed tracking-wide text-text-2 sm:text-[18px] lg:text-[20px]">{t("trust")}</p>

            <div className="mt-9 flex items-center gap-3 border-t border-hairline pt-6">
              <span aria-hidden className="h-[3px] w-6 shrink-0 bg-champagne" />
              <p className="font-display text-[21px] italic leading-snug text-champagne sm:text-[24px] lg:text-[26px]">
                {t("brandProposition")}
              </p>
            </div>
          </div>

          <div className="relative mx-auto flex h-[410px] w-full max-w-[600px] items-center justify-center sm:h-[480px] md:h-[540px] lg:-translate-y-8 xl:h-[580px] xl:max-w-[640px] xl:-translate-y-12 landscape-phone:h-[390px]">
            <div className="relative flex h-[290px] w-[290px] items-center justify-center [--orbit-radius:120px] sm:h-[350px] sm:w-[350px] sm:[--orbit-radius:148px] md:h-[400px] md:w-[400px] md:[--orbit-radius:172px] lg:h-[440px] lg:w-[440px] lg:[--orbit-radius:192px] xl:h-[500px] xl:w-[500px] xl:[--orbit-radius:220px]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,#1B3650,#0B131C_72%)] shadow-[0_40px_120px_-48px_rgba(42,92,170,0.8)]"
              />
              <div
                aria-hidden
                className="absolute inset-[5%] rounded-full border border-champagne/45"
              />
              <div
                aria-hidden
                className="absolute inset-[15%] rounded-full border border-porcelain/[0.09]"
              />
              <div
                aria-hidden
                className="absolute inset-[28%] rounded-full border border-atlantic/25"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lagoon shadow-[0_0_20px_rgba(143,211,193,0.75)] animate-orbit sm:block"
              />
              <RooklynMark
                size={270}
                className="relative h-[158px] w-[158px] sm:h-[192px] sm:w-[192px] md:h-[218px] md:w-[218px] lg:h-[240px] lg:w-[240px] xl:h-[270px] xl:w-[270px]"
              />
            </div>

            {activityCards.map(({ label, Icon, position, iconClass }, i) => {
              const [headline, ...detailParts] = label.split(" · ");
              const detail = detailParts.join(" · ");

              return (
                <div
                  key={label}
                  className={`absolute ${position} flex w-fit max-w-[min(15rem,78vw)] animate-bob items-center gap-2.5 rounded-2xl border border-porcelain/[0.14] bg-card/95 px-3 py-2.5 text-left shadow-[0_16px_45px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md sm:max-w-[17rem] sm:px-3.5`}
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[16px] font-semibold text-porcelain sm:text-[17px]">
                      {headline}
                    </span>
                    {detail && (
                      <span className="mt-0.5 block text-[13px] text-text-3 sm:text-[14px]">
                        {detail}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
