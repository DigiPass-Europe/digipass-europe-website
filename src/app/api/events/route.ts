import { NextResponse } from "next/server";
import { z } from "zod";
import { storeRow } from "@/lib/db";
import { getEvent } from "@/content";

const schema = z.object({ slug: z.string(), name: z.string().min(1).max(200), email: z.string().email(), organisation: z.string().max(200).optional().or(z.literal("")), member: z.literal("on").optional(), consent: z.literal("on") });

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!getEvent(parsed.data.slug)) return NextResponse.json({ error: "unknown event" }, { status: 404 });
  const { member, consent, ...rest } = parsed.data;
  const result = await storeRow("event_registrations", { ...rest, is_member: member === "on", consent: consent === "on" });
  return NextResponse.json(result, { status: result.error ? 500 : 200 });
}
