"use client";

export function CookieSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("rooklyn:open-cookie-settings"))}
      className={className ?? "mt-2 text-[14px] text-champagne underline underline-offset-2"}
    >
      {label}
    </button>
  );
}
