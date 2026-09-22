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
      <label htmlFor={htmlFor} className="text-[17px] font-bold text-lagoon sm:text-[19px]">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-text-3">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-[16px] text-error"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase =
  "min-h-[54px] w-full rounded-[10px] border border-hairline bg-card-2 px-3.5 text-[18px] sm:text-[19px] text-porcelain placeholder:text-text-3 transition-[border-color,background-color] focus-visible:border-apricot focus-visible:bg-night-2 focus-visible:outline-none scroll-mt-28";

export const inputClass = (hasError?: boolean) =>
  cn(controlBase, hasError && "border-error");

export const selectClass = (hasError?: boolean) =>
  cn(controlBase, "appearance-none bg-no-repeat pr-10", hasError && "border-error");
