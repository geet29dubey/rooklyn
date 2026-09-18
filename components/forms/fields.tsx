import { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FieldWrap({
  label,
  htmlFor,
  error,
  optional,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-porcelain">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-text-3">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-[13px] text-error"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase =
  "min-h-[48px] w-full rounded-xl border border-hairline bg-card-2 px-4 text-[16px] text-porcelain placeholder:text-text-3 transition-colors focus-visible:border-champagne focus-visible:outline-none scroll-mt-28";

export const inputClass = (hasError?: boolean) =>
  cn(controlBase, hasError && "border-error");

export const selectClass = (hasError?: boolean) =>
  cn(controlBase, "appearance-none bg-no-repeat pr-10", hasError && "border-error");
