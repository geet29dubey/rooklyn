import assert from "node:assert/strict";
import { test } from "node:test";
import { toGhlWorkflowFields } from "../lib/leads/ghl-workflow.ts";

test("GHL workflow fields follow each submitted lead and consent choice", () => {
  const lead = {
    source: "Rooklyn Website",
    locale: "it",
    contact: {
      first_name: "Giulia",
      last_name: "Rossi",
      email: "giulia@example.net",
      phone: "+393331112222",
      preferred_language: "es",
    },
    company: {
      name: "Rossi Impianti",
      country: "IT",
      industry: "hvac_home_services",
      size: "11_50",
    },
    needs: {
      automation_interest: "appointment_booking",
      monthly_enquiries: "500_2000",
      timeline: "1_3_months",
    },
    consent: { privacy_accepted: true, marketing_opt_in: false },
    tracking: { page_url: "https://example.net/it#contact" },
  };

  assert.deepEqual(toGhlWorkflowFields(lead), {
    first_name: "Giulia",
    last_name: "Rossi",
    full_name: "Giulia Rossi",
    email: "giulia@example.net",
    phone: "+393331112222",
    company_name: "Rossi Impianti",
    country: "Italy",
    industry: "hvac_home_services",
    company_size: "11_50",
    automation_interest: "appointment_booking",
    monthly_enquiries: "500_2000",
    preferred_timeline: "1_3_months",
    preferred_language: "es",
    privacy_consent: true,
    marketing_consent: false,
    lead_source: "rooklyn_website",
    lead_page: "example.net",
    form_type: "agency_contact",
    page_language: "it",
  });

  const changed = toGhlWorkflowFields({
    ...lead,
    locale: "en",
    contact: { ...lead.contact, first_name: "Noah", last_name: "", preferred_language: "en" },
    company: { ...lead.company, name: "North Studio", country: "GB" },
    needs: { ...lead.needs, automation_interest: "crm_automation", monthly_enquiries: "" },
    consent: { privacy_accepted: true, marketing_opt_in: true },
    tracking: { page_url: "https://another.example/en#contact" },
  });
  assert.equal(changed.full_name, "Noah");
  assert.equal(changed.first_name, "Noah");
  assert.equal(changed.last_name, "");
  assert.equal(changed.company_name, "North Studio");
  assert.equal(changed.country, "United Kingdom");
  assert.equal(changed.automation_interest, "crm_automation");
  assert.equal(changed.monthly_enquiries, "");
  assert.equal(changed.marketing_consent, true);
  assert.equal(changed.lead_page, "another.example");
  assert.equal(changed.page_language, "en");
});
