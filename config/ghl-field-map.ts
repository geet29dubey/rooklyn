/**
 * Mapping from the normalised lead payload (see lib/leads/normalize.ts) to
 * GoHighLevel (HighLevel / LeadConnector) contact fields. Standard fields
 * use GHL's built-in property names; custom fields carry placeholder IDs
 * that must be replaced with the real custom field IDs from the GHL
 * sub-account before go-live. See docs/GHL-SETUP.md.
 */
export const GHL_FIELD_MAP = {
  standard: {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phone: "phone",
    companyName: "companyName",
    website: "website",
    country: "country",
    source: "source",
  },
  // TODO: verify against current GHL API docs before going live —
  // replace every [GHL_CF_*] placeholder with the real custom field ID
  // created in the GHL sub-account.
  customFields: {
    industry: "[GHL_CF_INDUSTRY]",
    companySize: "[GHL_CF_COMPANY_SIZE]",
    automationInterests: "[GHL_CF_AUTOMATION_INTERESTS]",
    monthlyEnquiries: "[GHL_CF_MONTHLY_ENQUIRIES]",
    timeline: "[GHL_CF_TIMELINE]",
    preferredLanguage: "[GHL_CF_PREFERRED_LANGUAGE]",
    heardAboutUs: "[GHL_CF_HEARD_ABOUT_US]",
    privacyConsentAt: "[GHL_CF_PRIVACY_CONSENT_AT]",
    marketingOptIn: "[GHL_CF_MARKETING_OPT_IN]",
    utmSource: "[GHL_CF_UTM_SOURCE]",
    utmMedium: "[GHL_CF_UTM_MEDIUM]",
    utmCampaign: "[GHL_CF_UTM_CAMPAIGN]",
    utmTerm: "[GHL_CF_UTM_TERM]",
    utmContent: "[GHL_CF_UTM_CONTENT]",
    pageUrl: "[GHL_CF_PAGE_URL]",
    referrer: "[GHL_CF_REFERRER]",
  },
} as const;
