import { NextResponse } from "next/server";
import { supabaseServer, siteUrl } from "@/lib/auth/supabase-server";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "");
  const locale = req.headers.get("referer")?.match(/\/(en|fr)\//)?.[1] ?? "en";
  if (!email) return NextResponse.redirect(new URL(`/${locale}/login?error=missing`, req.url), 303);
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${siteUrl()}/api/auth/callback?next=/${locale}/portal`, shouldCreateUser: false } });
  return NextResponse.redirect(new URL(`/${locale}/login?${error ? "error=invalid" : "sent=1"}`, req.url), 303);
}
