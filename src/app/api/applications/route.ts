import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation/application";
import { storeRow } from "@/lib/db";

export async function POST(req: Request) {
  const parsed = applicationSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid", issues: parsed.error.flatten() }, { status: 400 });
  const a = parsed.data;
  const result = await storeRow("applications", {
    kind: a.kind, tier: a.tier, applicant: a.applicant, organisation: a.organisation ?? null,
    working_groups: a.workingGroups, consents: a.consents, status: "submitted",
  });
  // Email notification (confirmation to applicant, alert to Board) is wired in docs/INTEGRATIONS.md; not sent in demo mode.
  return NextResponse.json(result, { status: result.error ? 500 : 200 });
}
