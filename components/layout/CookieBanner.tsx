"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "rooklyn-cookie-consent";

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("rooklyn:consent", { detail: consent }));
  } catch {
    // Storage unavailable (private mode, blocked) - consent won't persist,
    // but the visitor can still proceed.
  }
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);

    function onOpenSettings() {
      setVisible(true);
      setCustomizing(true);
    }
    window.addEventListener("rooklyn:open-cookie-settings", onOpenSettings);
    return () =>
      window.removeEventListener("rooklyn:open-cookie-settings", onOpenSettings);
  }, []);

  if (!visible) return null;

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  }

  function rejectAll() {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setVisible(false);
  }

  function saveCustom() {
    saveConsent({ necessary: true, analytics, marketing });
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="dialog"
      aria-label={t("title")}
    >
      <div className="mx-auto max-w-container px-0 sm:px-5 sm:pb-5">
        <div className="border-t border-hairline bg-card sm:rounded-2xl sm:border landscape-phone:max-h-[35vh] landscape-phone:overflow-y-auto">
          <div className="container max-w-container flex flex-col gap-4 py-5 landscape:flex-row landscape:items-center landscape:justify-between landscape-phone:flex-row landscape-phone:items-center landscape-phone:gap-4 landscape-phone:py-3 md:flex-row md:items-center md:gap-6">
            <div className="flex-1">
              <p className="text-[14px] text-text-2">
                {t("message")}{" "}
                <Link
                  href="/cookie-policy"
                  className="text-champagne underline underline-offset-2"
                >
                  {t("learnMore")}
                </Link>
              </p>

              {customizing && (
                <div className="mt-4 flex flex-col gap-3">
                  <label className="flex min-h-[44px] items-center justify-between gap-3 text-[13px]">
                    <span>{t("necessary")}</span>
                    <input type="checkbox" checked disabled className="h-5 w-5" />
                  </label>
                  <label className="flex min-h-[44px] items-center justify-between gap-3 text-[13px]">
                    <span>{t("analytics")}</span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-5 w-5"
                    />
                  </label>
                  <label className="flex min-h-[44px] items-center justify-between gap-3 text-[13px]">
                    <span>{t("marketing")}</span>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="h-5 w-5"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {customizing ? (
                <button
                  type="button"
                  onClick={saveCustom}
                  className={cn(buttonClasses("primary"), "flex-1 sm:flex-none")}
                >
                  {t("savePreferences")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className={cn(buttonClasses("secondary"), "flex-1 sm:flex-none")}
                >
                  {t("customize")}
                </button>
              )}
              <button
                type="button"
                onClick={rejectAll}
                className={cn(buttonClasses("secondary"), "flex-1 sm:flex-none")}
              >
                {t("rejectAll")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className={cn(buttonClasses("primary"), "flex-1 sm:flex-none")}
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
