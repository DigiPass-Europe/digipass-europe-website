import { describe, it, expect } from "vitest";
import { requiresVat, applicationSchema } from "../validation/application";

const base = {
  tier: "sme-small", kind: "organisational" as const,
  applicant: { firstName: "A", lastName: "B", email: "a@b.eu", position: "CTO", organisation: "X", country: "DE", profile: "Engineer with ten years in product data.", interests: ["wg2"] },
  organisation: { name: "X GmbH", website: "https://x.de", type: "sme", employees: "10-49", country: "DE", vat: "", mainContact: "A B", representatives: "", description: "We make things.", logoName: "" },
  workingGroups: ["wg2"], consents: { conditions: true, privacy: true, statutes: true },
};

describe("requiresVat", () => {
  it("is true for EU member states and false otherwise", () => {
    expect(requiresVat("DE")).toBe(true); expect(requiresVat("FR")).toBe(true);
    expect(requiresVat("CH")).toBe(false); expect(requiresVat("GB")).toBe(false);
  });
});

describe("applicationSchema", () => {
  it("rejects an EU organisation without VAT number", () => {
    const r = applicationSchema.safeParse(base);
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.success ? "" : r.error.flatten())).toMatch(/vat/i);
  });
  it("accepts a non-EU organisation without VAT", () => {
    const r = applicationSchema.safeParse({ ...base, organisation: { ...base.organisation, country: "CH" } });
    expect(r.success).toBe(true);
  });
  it("never requires VAT or organisation block for individuals", () => {
    const r = applicationSchema.safeParse({ ...base, kind: "individual", tier: "full-individual", organisation: undefined });
    expect(r.success).toBe(true);
  });
  it("requires all three consents", () => {
    const r = applicationSchema.safeParse({ ...base, organisation: { ...base.organisation, vat: "DE123456789" }, consents: { conditions: true, privacy: false, statutes: true } });
    expect(r.success).toBe(false);
  });
});
