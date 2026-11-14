import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/auth/supabase-server";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? ""); const password = String(form.get("password") ?? "");
  const locale = req.headers.get("referer")?.match(/\/(en|fr)\//)?.[1] ?? "en";
  if (!email || !password) return NextResponse.redirect(new URL(`/${locale}/login?error=missing`, req.url), 303);
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return NextResponse.redirect(new URL(`/${locale}/login?error=invalid`, req.url), 303);
  return NextResponse.redirect(new URL(`/${locale}/portal`, req.url), 303);
}
