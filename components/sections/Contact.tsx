"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle, ShieldCheck, Clock3, CalendarCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";

export function Contact() {
  const t = useTranslations("contact");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-section-mobile sm:py-section-tablet md:pb-[128px] md:pt-[110px] landscape-phone:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-[-12rem] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(17,122,109,0.15),transparent_70%)]"
      />
      <div className="site-container relative">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-[clamp(5rem,6vw,6.25rem)]">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-champagne/12 px-2.5 text-[11px] font-bold tracking-widest text-champagne border border-champagne/25">
                05
              </span>
              <span className="eyebrow">{t("eyebrow")}</span>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <h2 className="lg:text-[clamp(3.5rem,4.2vw,4.75rem)] lg:leading-[1.05]">
              {t("titlePre")}{" "}
              <span className="font-display italic text-champagne">{t("titleItalic")}</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[19px] leading-[1.6] text-text-2 sm:text-[21px]">{t("intro")}</p>

            <ul className="mt-7 flex max-w-[31rem] flex-col gap-2.5 border-l border-champagne/30 pl-4">
              <li className="flex items-center gap-3 text-[17px] text-text-2 sm:text-[19px]">
                <Clock3 className="h-4 w-4 shrink-0 text-apricot" strokeWidth={1.5} />
                {t("reassurance1")}
              </li>
              <li className="flex items-center gap-3 text-[17px] text-text-2 sm:text-[19px]">
                <CalendarCheck className="h-4 w-4 shrink-0 text-apricot" strokeWidth={1.5} />
                {t("reassurance2")}
              </li>
              <li className="flex items-center gap-3 text-[17px] text-text-2 sm:text-[19px]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-apricot" strokeWidth={1.5} />
                {t("reassurance3")}
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-[18px] text-porcelain hover-fine:hover:text-champagne sm:text-[19px]"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span className="break-all">{email}</span>
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[18px] text-porcelain hover-fine:hover:text-champagne sm:text-[19px]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {t("whatsappLabel")}
                </a>
              )}
            </div>
          </div>

          <div className="w-full max-w-[680px]">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
