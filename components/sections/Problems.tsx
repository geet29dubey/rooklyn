"use client";

import { useTranslations } from "next-intl";
import { AlertCircle, Clock, CalendarX, Shuffle, Filter, Repeat } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";

const ICONS = [Clock, AlertCircle, CalendarX, Shuffle, Filter, Repeat];

export function Problems() {
  const t = useTranslations("problems");

  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`item${n}Title`),
    body: t(`item${n}Body`),
    Icon: ICONS[n - 1],
  }));

  return (
    <section id="problems" className="py-section-mobile sm:py-section-tablet md:py-section">
      <div className="container max-w-container">
        <SectionHeader
          number="01"
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

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <FadeIn key={item.title} as="li" delay={i * 0.05}>
              <div className="h-full min-h-[200px] rounded-2xl border border-hairline bg-card p-7 sm:p-8 transition-[transform,border-color] duration-300 hover-fine:hover:-translate-y-0.5 hover-fine:hover:border-[rgba(184,192,197,0.24)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-garnet/15 text-error">
                  <item.Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-[15px] text-text-2">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-6">
          <div className="relative overflow-hidden rounded-[20px] border border-hairline bg-night-2 p-10 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-garnet-glow"
            />
            <div aria-hidden className="absolute left-0 top-0 h-[3px] w-20 bg-champagne" />
            <div aria-hidden className="absolute left-0 top-0 h-20 w-[3px] bg-champagne" />
            <p className="font-display relative max-w-2xl text-[26px] italic text-champagne sm:text-[32px]">
              {t("closing")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
