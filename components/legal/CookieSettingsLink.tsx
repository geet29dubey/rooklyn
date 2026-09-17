"use client";

export function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("rooklyn:open-cookie-settings"))}
      className="mt-2 text-[14px] text-champagne underline underline-offset-2"
    >
      {label}
    </button>
  );
}
