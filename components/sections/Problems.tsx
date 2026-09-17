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
    <section id="problems" className="py-section-mobile md:py-section">
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

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.title} as="li" delay={i * 0.05}>
              <div className="h-full rounded-[20px] border border-hairline bg-card p-7">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-garnet/10 text-garnet">
                  <item.Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-[15px] text-text-2">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-6">
          <div className="relative overflow-hidden rounded-[24px] border border-hairline bg-garnet-deep p-10 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-garnet-glow"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10px] rounded-[16px] border border-porcelain/[0.12]"
            />
            <p className="font-display relative max-w-2xl text-[28px] italic text-champagne sm:text-[36px]">
              {t("closing")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
