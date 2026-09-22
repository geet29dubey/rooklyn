import type { NormalizedLead } from "@/lib/leads/normalize";

/** Flat fields for GHL Inbound Webhook workflow triggers. */
export function toGhlWorkflowFields(lead: NormalizedLead) {
  let leadPage = "";
  try {
    leadPage = new URL(lead.tracking.page_url).hostname;
  } catch {
    // A missing page URL should not prevent an otherwise valid lead.
  }

  const countryCode = lead.company.country;
  const country = countryCode === "OTHER"
    ? "Other"
    : new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ?? countryCode;

  return {
    first_name: lead.contact.first_name,
    last_name: lead.contact.last_name,
    full_name: [lead.contact.first_name, lead.contact.last_name].filter(Boolean).join(" "),
    email: lead.contact.email,
    phone: lead.contact.phone,
    company_name: lead.company.name,
    country,
    industry: lead.company.industry,
    company_size: lead.company.size,
    automation_interest: lead.needs.automation_interest,
    monthly_enquiries: lead.needs.monthly_enquiries,
    preferred_timeline: lead.needs.timeline,
    preferred_language: lead.contact.preferred_language,
    privacy_consent: lead.consent.privacy_accepted,
    marketing_consent: lead.consent.marketing_opt_in,
    lead_source: lead.source.toLowerCase().replace(/\s+/g, "_"),
    lead_page: leadPage,
    form_type: "agency_contact",
    page_language: lead.locale,
  };
}
