/** Illustrative portal data per demo persona. Mirrors the Supabase schema in supabase/migrations. */
import type { Role } from "@/lib/auth/roles";

export const demoMembership: Record<Exclude<Role, "visitor">, { category: string; tier: string; votes: number; since: string; renewal: string; status: "active" | "pending" | "expired"; invoices: { id: string; date: string; amount: number; paid: boolean }[] }> = {
  member: { category: "Ordinary member — individual", tier: "full-individual", votes: 1, since: "2026-09-01", renewal: "2027-01-01", status: "active", invoices: [{ id: "INV-2026-0042", date: "2026-09-05", amount: 50, paid: true }] },
  "wg-chair": { category: "Ordinary member — legal entity", tier: "sme-medium", votes: 3, since: "2026-09-01", renewal: "2027-01-01", status: "active", invoices: [{ id: "INV-2026-0017", date: "2026-09-03", amount: 500, paid: true }] },
  "org-admin": { category: "Ordinary member — legal entity", tier: "large", votes: 4, since: "2026-09-01", renewal: "2027-01-01", status: "active", invoices: [{ id: "INV-2026-0003", date: "2026-09-02", amount: 1000, paid: true }, { id: "INV-2027-0003", date: "2026-12-01", amount: 3000, paid: false }] },
  admin: { category: "General Secretary", tier: "full-individual", votes: 1, since: "2026-09-01", renewal: "—", status: "active", invoices: [] },
};
export const demoWgs: Record<Exclude<Role, "visitor">, { id: string; role: "participant" | "chair" | "vice-chair" }[]> = {
  member: [{ id: "wg4", role: "participant" }, { id: "wg7", role: "participant" }],
  "wg-chair": [{ id: "wg2", role: "chair" }, { id: "wg10", role: "participant" }],
  "org-admin": [{ id: "wg4", role: "participant" }, { id: "wg2", role: "participant" }],
  admin: [{ id: "wg1", role: "participant" }],
};
export const demoRegistrations: Record<Exclude<Role, "visitor">, string[]> = {
  member: ["webinar-espr-delegated-acts-what-changes-in-2027"], "wg-chair": ["workshop-interoperability-identifiers-and-resolvers", "european-dpp-conference-2027"],
  "org-admin": ["european-dpp-conference-2027"], admin: ["european-dpp-conference-2027", "roundtable-recyclers-data-access"],
};
export const demoApplications = [
  { id: "APP-2026-031", applicant: "[Applicant A]", org: "[Machinery SME, CZ]", tier: "sme-small", submitted: "2026-11-02", endorsements: 2, boardEndorsement: true, status: "ready" },
  { id: "APP-2026-032", applicant: "[Applicant B]", org: "—", tier: "full-individual", submitted: "2026-11-06", endorsements: 1, boardEndorsement: false, status: "awaiting-endorsement" },
  { id: "APP-2026-033", applicant: "[Applicant C]", org: "[University, FI]", tier: "university", submitted: "2026-11-11", endorsements: 0, boardEndorsement: false, status: "awaiting-endorsement" },
];
export const demoReps = [{ name: "[Representative 1]", email: "rep1@example.eu", voting: true }, { name: "[Representative 2]", email: "rep2@example.eu", voting: false }, { name: "[Representative 3]", email: "rep3@example.eu", voting: false }];
