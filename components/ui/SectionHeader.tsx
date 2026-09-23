import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  number: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "split" | "center";
  className?: string;
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  intro,
  align = "split",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-11 md:mb-16 xl:mb-12", className)}>
      <div className="mb-5 flex items-center gap-3 xl:mb-4">
        <span className="flex h-6 items-center rounded-full bg-champagne/12 px-2.5 text-[11px] font-bold tracking-widest text-champagne border border-champagne/25">
          {number}
        </span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <div
        className={cn(
          "flex flex-col gap-5 md:gap-8 xl:gap-6",
          align === "split" && "md:flex-row md:items-end md:justify-between"
        )}
      >
        <h2 className="max-w-[var(--container-text)]">{title}</h2>
        {intro && (
          <p className="max-w-[34rem] text-[19px] leading-[1.55] text-text-2 sm:text-[20px] md:max-w-[500px] md:text-right lg:text-[22px] xl:text-[19px]">
            {intro}
          </p>
        )}
      </div>
      <div className="hairline-divider mt-8 md:mt-10 xl:mt-8" />
    </div>
  );
}
