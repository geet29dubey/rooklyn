import { type ComponentPropsWithoutRef } from "react";
import { buttonClasses } from "@/components/ui/Button";

type AnchorButtonProps = {
  variant?: "primary" | "secondary";
} & ComponentPropsWithoutRef<"a">;

export function AnchorButton({
  variant = "primary",
  className,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <a className={buttonClasses(variant, className)} {...props}>
      {variant === "primary" && (
        <span aria-hidden className="h-2 w-2 rounded-full bg-champagne shrink-0" />
      )}
      {children}
    </a>
  );
}
