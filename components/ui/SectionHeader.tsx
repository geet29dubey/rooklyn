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
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-3 mb-5">
        <span className="flex h-6 items-center rounded-full bg-champagne/12 px-2.5 text-[11px] font-bold tracking-widest text-champagne border border-champagne/25">
          {number}
        </span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <div
        className={cn(
          "flex flex-col gap-6",
          align === "split" && "md:flex-row md:items-end md:justify-between"
        )}
      >
        <h2 className="max-w-xl">{title}</h2>
        {intro && (
          <p className="text-text-2 text-[17px] md:max-w-sm md:text-right">
            {intro}
          </p>
        )}
      </div>
      <div className="hairline-divider mt-10" />
    </div>
  );
}
