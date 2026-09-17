"use client";

import { useTranslations } from "next-intl";
import { SOLUTIONS } from "@/config/site";

export function Marquee() {
  const t = useTranslations("solutions.items");
  const items = SOLUTIONS.map((s) => ({
    name: t(`${s.id}.name`),
    oneliner: t(`${s.id}.oneliner`),
  }));
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-hairline bg-gradient-to-r from-ink via-garnet-night to-ink py-4">
      <div className="no-scrollbar flex w-max animate-marquee-slow gap-10 motion-reduce:animate-none sm:animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[16px] sm:text-[20px]"
          >
            <span className="font-display text-porcelain">{item.name}</span>
            <span className="font-display italic text-champagne">
              {item.oneliner}
            </span>
            <span aria-hidden className="mx-2 text-text-3">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
