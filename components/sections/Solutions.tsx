"use client";

import { useTranslations } from "next-intl";
import { Check, MessageCircle, Target, LayoutGrid, BellRing, Wand2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnchorButton } from "@/components/ui/AnchorButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { SOLUTIONS, type SolutionId } from "@/config/site";
import { cn } from "@/lib/utils";

const ICONS: Record<SolutionId, typeof MessageCircle> = {
  whatsapp_agent: MessageCircle,
  lead_qualification: Target,
  crm_automation: LayoutGrid,
  followups_reminders: BellRing,
  custom_automations: Wand2,
};

const ACCENT_CLASSES: Record<string, { bg: string; text: string }> = {
  lagoon: { bg: "bg-lagoon/12", text: "text-lagoon" },
  champagne: { bg: "bg-champagne/12", text: "text-champagne" },
};

export function Solutions() {
  const t = useTranslations("solutions");

  return (
    <section id="solutions" className="py-section-mobile sm:py-section-tablet md:py-section landscape-phone:py-10">
      <div className="site-container">
        <SectionHeader
          number="02"
          eyebrow={t("eyebrow")}
          title={
            <>
              {t("titlePre")}{" "}
              <span className="font-display italic text-champagne">
                {t("titleItalic")}
              </span>
            </>
          }
          intro={t("intro")}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {SOLUTIONS.slice(0, 4).map((solution, i) => {
            const Icon = ICONS[solution.id];
            const accent = ACCENT_CLASSES[solution.accent];
            return (
              <FadeIn key={solution.id} delay={i * 0.05}>
                <SolutionCard
                  Icon={Icon}
                  accent={accent}
                  base={`items.${solution.id}`}
                  t={t}
                />
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-5">
          <CustomCard t={t} />
        </FadeIn>
      </div>
    </section>
  );
}

function SolutionCard({
  Icon,
  accent,
  base,
  t,
}: {
  Icon: typeof MessageCircle;
  accent: { bg: string; text: string };
  base: string;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="relative h-full rounded-[20px] border border-hairline bg-card p-7 sm:p-8">
      <div
        aria-hidden
        className="absolute inset-[10px] rounded-[12px] border border-porcelain/[0.06]"
      />
      <div className="relative">
        <div
          className={cn(
            "mb-5 flex h-11 w-11 items-center justify-center rounded-xl",
            accent.bg,
            accent.text
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3>{t(`${base}.name`)}</h3>
        <p className="eyebrow mt-3 !text-[15px] tracking-[0.16em] text-text-3">
          {t("solvesLabel")}: {t(`${base}.solves`)}
        </p>
        <p className="mt-4 text-[19px] leading-[1.6] text-text-3 sm:text-[20px] lg:text-[21px]">{t(`${base}.description`)}</p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {[1, 2, 3].map((n) => (
            <li key={n} className="flex items-start gap-2.5 text-[18px] text-text-2 sm:text-[19px] lg:text-[20px]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
              {t(`${base}.feature${n}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CustomCard({ t }: { t: ReturnType<typeof useTranslations> }) {
  const base = "items.custom_automations";
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-hairline bg-card p-8 sm:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mint-glow" />
      <div aria-hidden className="absolute left-0 top-0 h-[3px] w-20 bg-champagne" />
      <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-lagoon/12 text-lagoon">
            <Wand2 className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h3>{t(`${base}.name`)}</h3>
          <p className="mt-4 max-w-md text-[19px] leading-[1.6] text-text-3 sm:text-[20px] lg:text-[21px]">
            {t(`${base}.description`)}
          </p>
          <AnchorButton
            href="#contact"
            variant="primary"
            className="mt-6"
            onClick={() => {
              try {
                sessionStorage.setItem(
                  "rooklyn-preselect-interest",
                  "custom_automations"
                );
              } catch {
                // sessionStorage unavailable (private mode) - form just
                // won't pre-select, which is a harmless fallback.
              }
            }}
          >
            {t("customCta")}
          </AnchorButton>
        </div>
        <ul className="flex flex-col gap-3">
          {[1, 2, 3].map((n) => (
            <li
              key={n}
              className="flex items-start gap-3 rounded-2xl border border-porcelain/[0.1] bg-white/[0.03] p-4 text-[18px] text-text-2 sm:text-[19px] lg:text-[20px]"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
              {t(`${base}.feature${n}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
