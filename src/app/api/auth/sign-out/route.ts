import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/auth/supabase-server";
import { hasSupabaseAuth } from "@/lib/auth/session";

export async function POST(req: Request) {
  const locale = req.headers.get("referer")?.match(/\/(en|fr)\//)?.[1] ?? "en";
  if (hasSupabaseAuth()) { const supabase = await supabaseServer(); await supabase.auth.signOut(); }
  return NextResponse.redirect(new URL(`/${locale}`, req.url), 303);
}
