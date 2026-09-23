"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { RooklynMark } from "@/components/logo/RooklynMark";
import { Button } from "@/components/ui/Button";
import { Turnstile, type TurnstileHandle } from "@/components/forms/Turnstile";
import { FieldWrap, inputClass, selectClass } from "@/components/forms/fields";
import { leadFormSchema, type LeadFormInput } from "@/lib/leads/schema";
import { fullLegalPath } from "@/lib/legal/routes";
import {
  AUTOMATION_INTERESTS,
  COMPANY_SIZES,
  COUNTRIES_OTHER,
  COUNTRIES_PRIORITY,
  INDUSTRIES,
  MONTHLY_ENQUIRIES,
  TIMELINES,
} from "@/config/site";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORAGE_KEY = "rooklyn-utm";

function captureUtmAndTracking() {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "", utmTerm: "", utmContent: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  let hasAny = false;
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      fromUrl[key] = value;
      hasAny = true;
    }
  }
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }
  const merged = hasAny ? fromUrl : stored;
  if (hasAny) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // Session storage unavailable - UTMs simply won't persist across
      // navigations, which only affects attribution, not submission.
    }
  }
  return {
    utmSource: merged.utm_source ?? "",
    utmMedium: merged.utm_medium ?? "",
    utmCampaign: merged.utm_campaign ?? "",
    utmTerm: merged.utm_term ?? "",
    utmContent: merged.utm_content ?? "",
  };
}

export function LeadForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "es" | "it";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workEmail: "",
      phone: "+34",
      companyName: "",
      automationInterests: "" as unknown as LeadFormInput["automationInterests"],
      preferredLanguage: locale,
      locale,
      privacyAccepted: false as unknown as true,
      marketingOptIn: false,
      website_url: "",
      turnstileToken: "",
    },
  });

  useEffect(() => {
    setValue("locale", locale, {
      shouldValidate: true,
    });
  }, [locale, setValue]);

  useEffect(() => {
    try {
      const preselect = sessionStorage.getItem("rooklyn-preselect-interest");
      if (preselect) {
        setValue("automationInterests", preselect as LeadFormInput["automationInterests"]);
        sessionStorage.removeItem("rooklyn-preselect-interest");
        document.getElementById("contact")?.scrollIntoView({ block: "start" });
      }
    } catch {
      // sessionStorage unavailable - no pre-selection, form still works.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countries = useMemo(
    () => [...COUNTRIES_PRIORITY, ...COUNTRIES_OTHER],
    []
  );

  async function onSubmit(values: LeadFormInput) {
    setStatus("sending");
    try {
      const tracking = captureUtmAndTracking();
      const payload = {
        ...values,
        submissionId: crypto.randomUUID(),
        locale,
        pageUrl: window.location.href,
        referrer: document.referrer,
        submittedAt: new Date().toISOString(),
        ...tracking,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 403) setTurnstileFailed(true);
      if (!res.ok) throw new Error("Request failed");
      setSubmittedName(values.firstName);
      setStatus("success");
    } catch {
      setStatus("error");
      setValue("turnstileToken", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      turnstileRef.current?.reset();
    }
  }

  function onInvalid(formErrors: FieldErrors<LeadFormInput>) {
    // A validation error is different from a server/API failure.
    // Keep the generic "Something went wrong" box hidden and show/focus
    // the actual field error instead.
    setStatus("idle");

    const firstError = Object.keys(formErrors)[0] as keyof LeadFormInput | undefined;

    if (firstError === "turnstileToken") {
      requestAnimationFrame(() =>
        document
          .getElementById("turnstile-error")
          ?.scrollIntoView({ block: "center" })
      );
    } else if (firstError) {
      setFocus(firstError);
    }
  }

  const bookingUrl = process.env.NEXT_PUBLIC_GHL_BOOKING_URL;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

  if (status === "success") {
    return (
      <div className="rounded-[24px] border border-hairline bg-card p-8 text-center sm:p-12">
        <RooklynMark size={48} className="mx-auto" />
        <h3 className="mt-6">{t("successTitle", { name: submittedName })}</h3>
        <p className="mt-2 text-text-2">{t("successBody")}</p>
        <div className="mt-8 flex flex-col items-center gap-4">
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-porcelain px-7 py-4 text-center text-[17px] font-bold text-night sm:text-[19px]"
            >
              <span aria-hidden className="h-2 w-2 rounded-full bg-champagne" />
              {t("successBook")}
            </a>
          )}
          <a href="#top" className="text-[16px] text-text-2 underline underline-offset-2">
            {t("backToTop")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="rounded-[22px] border border-porcelain/[0.13] bg-card/75 p-5 shadow-[0_32px_90px_-62px_rgba(0,0,0,0.95)] backdrop-blur-sm sm:p-7 lg:p-8"
    >
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-3.5">
          <legend className="eyebrow mb-1">{t("groupAboutYou")}</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldWrap label={t("fields.firstName")} htmlFor="firstName" error={errors.firstName && t("errors.firstName")}>
              <input
                id="firstName"
                autoComplete="given-name"
                required
                className={inputClass(!!errors.firstName)}
                {...register("firstName")}
              />
            </FieldWrap>

            <FieldWrap label={t("fields.lastName")} htmlFor="lastName" error={errors.lastName && t("errors.lastName")}>
              <input
                id="lastName"
                autoComplete="family-name"
                required
                className={inputClass(!!errors.lastName)}
                {...register("lastName")}
              />
            </FieldWrap>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldWrap label={t("fields.workEmail")} htmlFor="workEmail" error={errors.workEmail && t("errors.email")}>
              <input
                id="workEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className={inputClass(!!errors.workEmail)}
                {...register("workEmail")}
              />
            </FieldWrap>

            <FieldWrap label={t("fields.phone")} htmlFor="phone" error={errors.phone && t("errors.phone")}>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                maxLength={32}
                className={inputClass(!!errors.phone)}
                {...register("phone")}
              />
            </FieldWrap>
          </div>
        </fieldset>

        <fieldset className="grid gap-3.5 sm:grid-cols-2">
          <legend className="sr-only">{t("groupAboutBusiness")}</legend>

          <FieldWrap label={t("fields.companyName")} htmlFor="companyName" error={errors.companyName && t("errors.companyName")}>
            <input
              id="companyName"
              autoComplete="organization"
              className={inputClass(!!errors.companyName)}
              {...register("companyName")}
            />
          </FieldWrap>

          <FieldWrap label={t("fields.country")} htmlFor="country" error={errors.country && t("errors.country")}>
            <select
              id="country"
              autoComplete="country-name"
              className={selectClass(!!errors.country)}
              defaultValue=""
              {...register("country")}
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {countries.map((id) => (
                <option key={id} value={id}>
                  {t(`options.country.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label={t("fields.industry")} htmlFor="industry" error={errors.industry && t("errors.industry")}>
            <select id="industry" className={selectClass(!!errors.industry)} defaultValue="" {...register("industry")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {INDUSTRIES.map((id) => (
                <option key={id} value={id}>
                  {t(`options.industry.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label={t("fields.companySize")} htmlFor="companySize" error={errors.companySize && t("errors.companySize")}>
            <select id="companySize" className={selectClass(!!errors.companySize)} defaultValue="" {...register("companySize")}>
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {COMPANY_SIZES.map((id) => (
                <option key={id} value={id}>
                  {t(`options.companySize.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>
        </fieldset>

        <fieldset className="grid gap-3.5 sm:grid-cols-2">
          <legend className="sr-only">{t("groupWhatYouNeed")}</legend>

          <FieldWrap
            label={t("fields.automationInterests")}
            htmlFor="automationInterests"
            error={errors.automationInterests && t("errors.automationInterests")}
            className="sm:col-span-2"
          >
            <select
              id="automationInterests"
              className={selectClass(!!errors.automationInterests)}
              defaultValue=""
              {...register("automationInterests")}
            >
              <option value="" disabled>
                {t("selectPlaceholder")}
              </option>
              {AUTOMATION_INTERESTS.map((id) => (
                <option key={id} value={id}>
                  {t(`options.automationInterests.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label={t("fields.monthlyEnquiries")} htmlFor="monthlyEnquiries" optional>
            <select id="monthlyEnquiries" className={selectClass()} defaultValue="" {...register("monthlyEnquiries")}>
              <option value="">{t("selectPlaceholder")}</option>
              {MONTHLY_ENQUIRIES.map((id) => (
                <option key={id} value={id}>
                  {t(`options.monthlyEnquiries.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label={t("fields.timeline")} htmlFor="timeline" optional>
            <select id="timeline" className={selectClass()} defaultValue="" {...register("timeline")}>
              <option value="">{t("selectPlaceholder")}</option>
              {TIMELINES.map((id) => (
                <option key={id} value={id}>
                  {t(`options.timeline.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap label={t("fields.preferredLanguage")} htmlFor="preferredLanguage" className="sm:col-span-2">
            <select id="preferredLanguage" className={selectClass()} {...register("preferredLanguage")}>
              {(["en", "es", "it"] as const).map((id) => (
                <option key={id} value={id}>
                  {t(`options.preferredLanguage.${id}`)}
                </option>
              ))}
            </select>
          </FieldWrap>
        </fieldset>

        <fieldset className="flex flex-col gap-3.5">
          <legend className="sr-only">{t("groupConsent")}</legend>

          <label className="flex items-start gap-3 text-[17px] text-text-2 sm:text-[19px]">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-champagne"
              {...register("privacyAccepted")}
            />
            <span>
              {t("consentPrivacyPre")}{" "}
              <a href={fullLegalPath(locale, "privacy")} target="_blank" className="text-champagne underline underline-offset-2">
                {t("consentPrivacyLink")}
              </a>{" "}
              {t("consentPrivacyPost")}
            </span>
          </label>
          {errors.privacyAccepted && (
            <p role="alert" className="text-[16px] text-error">
              {t("errors.consentRequired")}
            </p>
          )}

          <label className="flex items-start gap-3 text-[17px] text-text-2 sm:text-[19px]">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-champagne"
              {...register("marketingOptIn")}
            />
            <span>{t("consentMarketing")}</span>
          </label>

          <input type="hidden" {...register("locale")} />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url">Leave this field empty</label>
            <input id="website_url" tabIndex={-1} autoComplete="off" {...register("website_url")} />
          </div>

          {/* Register Turnstile explicitly with React Hook Form.
              The visual widget writes its token into this hidden field via setValue(). */}
          <input type="hidden" {...register("turnstileToken")} />

          <Turnstile
            ref={turnstileRef}
            onToken={(token) => {
              setValue("turnstileToken", token, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });

              if (token) {
                setTurnstileFailed(false);
              }
            }}
            onError={() => {
              setTurnstileFailed(true);
              setValue("turnstileToken", "", {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            className="max-[399px]:scale-90 max-[399px]:origin-left"
          />
          {(errors.turnstileToken || turnstileFailed) && (
            <p id="turnstile-error" role="alert" className="text-[16px] text-error">
              {t("errors.turnstile")}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t("sending") : t("submit")}
          </Button>

          <p className="text-[16px] leading-relaxed text-text-3">{t("privacyNotice")}</p>
        </fieldset>

        {status === "error" && (
          <div role="alert" className="rounded-xl border border-error/40 bg-error/10 p-4 text-[16px] text-error">
            <p className="font-semibold">{t("errorTitle")}</p>
            <p className="mt-1">{t("errorBody", { email: contactEmail })}</p>
          </div>
        )}
      </div>
    </form>
  );
}
