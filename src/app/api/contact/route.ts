import { NextResponse } from "next/server";
import { z } from "zod";
import { storeRow } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1).max(200), email: z.string().email(), organisation: z.string().max(200).optional().or(z.literal("")),
  subject: z.string().min(1).max(100), message: z.string().min(1).max(5000), consent: z.literal("on"),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid", issues: parsed.error.flatten() }, { status: 400 });
  const result = await storeRow("contact_messages", { ...parsed.data, consent: true });
  return NextResponse.json(result, { status: result.error ? 500 : 200 });
}
