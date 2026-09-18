import { z } from "zod";
import {
  AUTOMATION_INTERESTS,
  COMPANY_SIZES,
  CONTACT_LANGUAGES,
  COUNTRIES_OTHER,
  COUNTRIES_PRIORITY,
  HEARD_ABOUT,
  INDUSTRIES,
  MONTHLY_ENQUIRIES,
  TIMELINES,
} from "@/config/site";

const countryCodes = [...COUNTRIES_PRIORITY, ...COUNTRIES_OTHER] as [
  string,
  ...string[],
];

/**
 * Single source of truth for the lead form. Shared by the client form
 * (React Hook Form + zodResolver) and the /api/lead server route, so
 * client and server validation can never drift apart.
 */
export const leadSchema = z.object({
  // Group 1: about you
  fullName: z.string().trim().min(2).max(120),
  workEmail: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().min(6).max(24),

  // Group 2: about your business
  companyName: z.string().trim().min(1).max(160),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\/.+\..+/i.test(value),
      "Invalid URL"
    ),
  industry: z.enum(INDUSTRIES as unknown as [string, ...string[]]),
  companySize: z.enum(COMPANY_SIZES as unknown as [string, ...string[]]),
  country: z.enum(countryCodes),

  // Group 3: what you need
  automationInterests: z.enum(
    AUTOMATION_INTERESTS as unknown as [string, ...string[]]
  ),
  monthlyEnquiries: z
    .enum(MONTHLY_ENQUIRIES as unknown as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  timeline: z
    .enum(TIMELINES as unknown as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  preferredLanguage: z.enum(CONTACT_LANGUAGES as unknown as [string, ...string[]]),
  heardAboutUs: z
    .enum(HEARD_ABOUT as unknown as [string, ...string[]])
    .optional()
    .or(z.literal("")),

  // Group 4: consent
  privacyAccepted: z.literal(true),
  marketingOptIn: z.boolean().default(false),

  // Spam protection
  website_url: z.string().max(0).optional().or(z.literal("")), // honeypot
  turnstileToken: z.string().min(1),

  // Hidden tracking fields
  submissionId: z.string().uuid(),
  locale: z.enum(["en", "es", "it"]),
  pageUrl: z.string().max(500).optional().or(z.literal("")),
  referrer: z.string().max(500).optional().or(z.literal("")),
  utmSource: z.string().max(200).optional().or(z.literal("")),
  utmMedium: z.string().max(200).optional().or(z.literal("")),
  utmCampaign: z.string().max(200).optional().or(z.literal("")),
  utmTerm: z.string().max(200).optional().or(z.literal("")),
  utmContent: z.string().max(200).optional().or(z.literal("")),
  submittedAt: z.string().max(50).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Fields the client form owns; the honeypot and Turnstile token are added
// by the form component itself and hidden fields are populated on submit,
// so the resolver only needs the visible fields.
export const leadFormSchema = leadSchema.omit({
  submissionId: true,
  pageUrl: true,
  referrer: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  utmTerm: true,
  utmContent: true,
  submittedAt: true,
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
