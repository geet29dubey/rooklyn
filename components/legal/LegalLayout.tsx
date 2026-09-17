import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type LegalSection = { heading: string; body: string };

export function LegalLayout({
  title,
  lastUpdated,
  lastUpdatedLabel,
  devNote,
  backHomeLabel,
  sections,
  extra,
}: {
  title: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  devNote: string;
  backHomeLabel: string;
  sections: LegalSection[];
  extra?: ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <article className="py-section-mobile md:py-section">
      <div className="mx-auto max-w-[720px] px-5">
        {isDev && (
          <p className="mb-8 rounded-xl border border-champagne/30 bg-champagne/10 p-4 text-[13px] text-champagne">
            {devNote}
          </p>
        )}

        <h1 className="text-[2.25rem] md:text-[2.75rem]">{title}</h1>
        <p className="mt-2 text-[13px] text-text-3">
          {lastUpdatedLabel}: {lastUpdated}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-2">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {extra}

        <Link
          href="/"
          className="mt-12 inline-block text-[14px] text-champagne underline underline-offset-2"
        >
          {backHomeLabel}
        </Link>
      </div>
    </article>
  );
}
