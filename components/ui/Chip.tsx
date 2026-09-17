import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  dotClassName,
  className,
}: {
  children: ReactNode;
  dotClassName?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.02] px-4 py-2 text-[13px] text-text-2",
        className
      )}
    >
      {dotClassName && (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 rounded-full", dotClassName)}
        />
      )}
      {children}
    </span>
  );
}

export function ToggleChip({
  selected,
  label,
  onToggle,
  id,
}: {
  selected: boolean;
  label: string;
  onToggle: () => void;
  id: string;
}) {
  return (
    <button
      type="button"
      id={id}
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "min-h-[44px] rounded-full border px-4 py-2 text-[14px] transition-colors",
        selected
          ? "border-champagne bg-champagne/10 text-champagne"
          : "border-hairline text-text-2 hover-fine:hover:border-champagne/50"
      )}
    >
      {label}
    </button>
  );
}
