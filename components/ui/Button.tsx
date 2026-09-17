import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary";
  asChild?: boolean;
} & ComponentPropsWithoutRef<"button">;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold whitespace-nowrap transition-all duration-200 min-h-[44px] focus-visible:outline-champagne disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-porcelain text-night hover-fine:hover:-translate-y-0.5 hover-fine:hover:shadow-[0_10px_30px_-10px_rgba(242,238,232,0.35)]",
  secondary:
    "bg-transparent text-porcelain border border-[rgba(242,238,232,.3)] hover-fine:hover:border-champagne",
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
