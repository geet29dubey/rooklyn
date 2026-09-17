// Posts a sample lead payload to a locally running /api/lead endpoint.
// Usage: npm run test:lead (with `npm run dev` or `npm run preview`
// already running in another terminal).
const target = process.env.TEST_LEAD_URL ?? "http://localhost:3000/api/lead";

const payload = {
  fullName: "Ada Test",
  workEmail: "ada@example.com",
  phone: "+34600000000",
  jobTitle: "Operations Manager",
  companyName: "Example Clinic",
  website: "https://example.com",
  industry: "healthcare",
  companySize: "11_50",
  country: "ES",
  automationInterests: ["whatsapp_agent", "followups_reminders"],
  channels: ["whatsapp", "instagram"],
  monthlyEnquiries: "100_500",
  currentTools: "Google Calendar, Excel",
  challenge: "We miss too many WhatsApp messages outside opening hours.",
  timeline: "within_1_month",
  preferredLanguage: "en",
  heardAboutUs: "google",
  privacyAccepted: true,
  marketingOptIn: false,
  website_url: "",
  turnstileToken: "test-token",
  submissionId: crypto.randomUUID(),
  locale: "en",
  pageUrl: "http://localhost:3000/en#contact",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  submittedAt: new Date().toISOString(),
};

const res = await fetch(target, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

console.log(res.status, await res.text());
