import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary";
  asChild?: boolean;
} & ComponentPropsWithoutRef<"button">;

const base =
  "inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-7 py-4 text-center text-[17px] font-bold leading-snug sm:text-[19px] xl:min-h-[48px] xl:px-6 xl:py-3 xl:text-[16px] transition-all duration-200 focus-visible:outline-champagne disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-porcelain text-night hover-fine:hover:-translate-y-0.5 hover-fine:hover:shadow-[0_6px_20px_-8px_rgba(244,241,235,0.3)]",
  secondary:
    "bg-transparent text-porcelain border border-[rgba(184,192,197,0.28)] hover-fine:hover:bg-card",
};

export function buttonClasses(
  variant: "primary" | "secondary" = "primary",
  className?: string
) {
  return cn(base, variants[variant], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-apricot shrink-0"
          />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
