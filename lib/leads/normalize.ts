import type { LeadInput } from "@/lib/leads/schema";

export type NormalizedLead = {
  submission_id: string;
  source: "Rooklyn Website";
  submitted_at: string;
  locale: string;
  contact: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    preferred_language: string;
  };
  company: {
    name: string;
    website: string;
    industry: string;
    size: string;
    country: string;
  };
  needs: {
    automation_interest: string;
    monthly_enquiries: string;
    timeline: string;
    heard_about_us: string;
  };
  consent: {
    privacy_accepted: boolean;
    privacy_accepted_at: string;
    marketing_opt_in: boolean;
  };
  tracking: {
    page_url: string;
    referrer: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
  };
  tags: string[];
};

function splitName(fullName: string): { first: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ");
  return { first, last };
}

/**
 * Formats a phone number to a loose E.164 shape. This is a light
 * best-effort normalisation (strip everything but digits and a leading
 * +, default to the Spain country code when none is given) — a full
 * libphonenumber validation can replace this later if needed.
 */
function toE164(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (hasPlus) return `+${digits}`;
  if (digits.startsWith("34") && digits.length > 9) return `+${digits}`;
  return `+34${digits}`;
}

export function normalizeLead(input: LeadInput, submittedAtIso: string): NormalizedLead {
  const { first, last } = splitName(input.fullName);

  const tags = [
    "website-lead",
    `lang-${input.locale}`,
    `interest-${input.automationInterests.replace(/_/g, "-")}`,
    `industry-${input.industry.replace(/_/g, "-")}`,
    `size-${input.companySize.replace(/_/g, "-")}`,
  ];
  if (input.timeline) tags.push(`timeline-${input.timeline.replace(/_/g, "-")}`);
  if (input.marketingOptIn) tags.push("marketing-opt-in");

  return {
    submission_id: input.submissionId,
    source: "Rooklyn Website",
    submitted_at: submittedAtIso,
    locale: input.locale,
    contact: {
      first_name: first,
      last_name: last,
      email: input.workEmail.toLowerCase(),
      phone: toE164(input.phone),
      preferred_language: input.preferredLanguage,
    },
    company: {
      name: input.companyName,
      website: input.website ?? "",
      industry: input.industry,
      size: input.companySize,
      country: input.country,
    },
    needs: {
      automation_interest: input.automationInterests,
      monthly_enquiries: input.monthlyEnquiries ?? "",
      timeline: input.timeline ?? "",
      heard_about_us: input.heardAboutUs ?? "",
    },
    consent: {
      privacy_accepted: input.privacyAccepted,
      privacy_accepted_at: submittedAtIso,
      marketing_opt_in: input.marketingOptIn,
    },
    tracking: {
      page_url: input.pageUrl ?? "",
      referrer: input.referrer ?? "",
      utm_source: input.utmSource ?? "",
      utm_medium: input.utmMedium ?? "",
      utm_campaign: input.utmCampaign ?? "",
      utm_term: input.utmTerm ?? "",
      utm_content: input.utmContent ?? "",
    },
    tags,
  };
}
