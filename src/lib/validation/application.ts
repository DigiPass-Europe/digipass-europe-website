import { z } from "zod";
import { feeTiers } from "@/content/membership";

export const EU27 = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE"] as const;
export const requiresVat = (country: string) => (EU27 as readonly string[]).includes(country.toUpperCase());

const tierIds = feeTiers.map((t) => t.id) as [string, ...string[]];

export const applicantSchema = z.object({
  firstName: z.string().min(1).max(100), lastName: z.string().min(1).max(100),
  email: z.string().email(), position: z.string().min(1).max(150), organisation: z.string().max(200).optional().or(z.literal("")),
  country: z.string().length(2), profile: z.string().min(10).max(2000), interests: z.array(z.string()).max(20),
});

export const organisationSchema = z.object({
  name: z.string().min(1).max(200), website: z.string().url().or(z.literal("")), type: z.string().min(1),
  employees: z.enum(["1-9", "10-49", "50-249", "250+"]), country: z.string().length(2), vat: z.string().max(20),
  mainContact: z.string().min(1).max(200), representatives: z.string().max(2000), description: z.string().min(10).max(1500), logoName: z.string().max(200),
});

export const applicationSchema = z.object({
  tier: z.enum(tierIds), kind: z.enum(["individual", "organisational", "supporter"]),
  applicant: applicantSchema, organisation: organisationSchema.optional(),
  workingGroups: z.array(z.string().regex(/^wg(10|[1-9])$/)).max(10),
  consents: z.object({ conditions: z.literal(true), privacy: z.literal(true), statutes: z.literal(true) }),
}).superRefine((v, ctx) => {
  if (v.kind === "organisational") {
    if (!v.organisation) ctx.addIssue({ code: "custom", path: ["organisation"], message: "Organisation details are required." });
    else if (requiresVat(v.organisation.country) && !v.organisation.vat.trim()) ctx.addIssue({ code: "custom", path: ["organisation", "vat"], message: "VAT number is required for organisations established in the EU." });
  }
});
export type Application = z.infer<typeof applicationSchema>;
