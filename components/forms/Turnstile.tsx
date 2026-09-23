"use client";

import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from "react";
import { useLocale } from "next-intl";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          language?: string;
          size?: "normal" | "compact";
          action?: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        script.remove();
        reject(new Error("Failed to load Turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

export const Turnstile = forwardRef<TurnstileHandle, {
  onToken: (token: string) => void;
  onError?: () => void;
  className?: string;
}>(({ onToken, onError, className }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const locale = useLocale();
  const id = useId();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    },
  }), []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!siteKey || (process.env.NODE_ENV === "production" && /^[123]x0+/.test(siteKey))) {
      onTokenRef.current("");
      onErrorRef.current?.();
      return;
    }
    let cancelled = false;

    loadTurnstileScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      const isSmall =
        typeof window !== "undefined" && window.innerWidth < 400;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "dark",
        language: locale,
        size: isSmall ? "compact" : "normal",
        callback: (token) => onTokenRef.current(token),
        "expired-callback": () => {
          onTokenRef.current("");
          onErrorRef.current?.();
        },
        "error-callback": () => {
          onTokenRef.current("");
          onErrorRef.current?.();
        },
      });
    }).catch(() => {
      onTokenRef.current("");
      onErrorRef.current?.();
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, locale]);

  return <div ref={containerRef} id={`turnstile-${id}`} className={className} />;
});
Turnstile.displayName = "Turnstile";
