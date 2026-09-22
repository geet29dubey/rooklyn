export const NAV_SECTIONS = [
  { id: "problems", key: "problems" },
  { id: "solutions", key: "solutions" },
  { id: "process", key: "process" },
  { id: "benefits", key: "benefits" },
  { id: "contact", key: "contact" },
] as const;

export const SOLUTIONS = [
  { id: "whatsapp_agent", accent: "lagoon" },
  { id: "lead_qualification", accent: "champagne" },
  { id: "crm_automation", accent: "lagoon" },
  { id: "followups_reminders", accent: "champagne" },
  { id: "custom_automations", accent: "lagoon" },
] as const;

export type SolutionId = (typeof SOLUTIONS)[number]["id"];

export const AUTOMATION_INTERESTS = [
  "whatsapp_agent",
  "lead_qualification",
  "crm_automation",
  "followups_reminders",
  "custom_automations",
  "appointment_booking",
  "customer_support",
] as const;

export const INDUSTRIES = [
  "healthcare",
  "beauty_wellness",
  "real_estate",
  "hvac_home_services",
  "fitness_studios",
  "education",
  "hospitality",
  "professional_services",
  "ecommerce",
  "other",
] as const;

export const COMPANY_SIZES = ["solo", "2_10", "11_50", "51_200", "200_plus"] as const;

export const COUNTRIES_PRIORITY = ["ES", "IT", "GB"] as const;

export const COUNTRIES_OTHER = [
  "FR", "DE", "PT", "US", "MX", "AR", "CO", "CL", "BR", "NL", "BE", "IE",
  "CH", "AT", "SE", "NO", "DK", "PL", "GR", "TR", "AE", "SA", "CA", "AU",
  "NZ", "IN", "OTHER",
] as const;

export const MONTHLY_ENQUIRIES = ["lt_100", "100_500", "500_2000", "gt_2000"] as const;

export const TIMELINES = ["asap", "within_1_month", "1_3_months", "exploring"] as const;

export const CONTACT_LANGUAGES = ["en", "es", "it"] as const;

export const HEARD_ABOUT = ["google", "linkedin", "instagram", "referral", "other"] as const;
