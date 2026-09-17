"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle, ShieldCheck, Clock3, CalendarCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";

export function Contact() {
  const t = useTranslations("contact");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section id="contact" className="py-section-mobile md:py-section">
      <div className="container max-w-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-6 items-center rounded-full bg-garnet/20 px-2.5 text-[11px] font-bold tracking-widest text-garnet border border-garnet/30">
                05
              </span>
              <span className="eyebrow">{t("eyebrow")}</span>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <h2>
              {t("titlePre")}{" "}
              <span className="font-display italic text-champagne">{t("titleItalic")}</span>
            </h2>
            <p className="mt-5 max-w-md text-[17px] text-text-2">{t("intro")}</p>

            <ul className="mt-8 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[14px] text-text-2">
                <Clock3 className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                {t("reassurance1")}
              </li>
              <li className="flex items-center gap-3 text-[14px] text-text-2">
                <CalendarCheck className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                {t("reassurance2")}
              </li>
              <li className="flex items-center gap-3 text-[14px] text-text-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                {t("reassurance3")}
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-[14px] text-porcelain hover-fine:hover:text-champagne"
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
                  className="flex items-center gap-2.5 text-[14px] text-porcelain hover-fine:hover:text-champagne"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {t("whatsappLabel")}
                </a>
              )}
            </div>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
