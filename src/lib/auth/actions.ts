"use server";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { DEMO_COOKIE_NAME, encodeDemo, hasSupabaseAuth } from "./session";
import { supabaseServer } from "./supabase-server";
import type { Role } from "./roles";

export async function demoLogin(formData: FormData) {
  const role = String(formData.get("role")) as Exclude<Role, "visitor">;
  if (!["member", "wg-chair", "org-admin", "admin"].includes(role)) return;
  (await cookies()).set(DEMO_COOKIE_NAME, encodeDemo(role), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  redirect({ href: "/portal", locale: await getLocale() });
}
export async function logout() {
  if (hasSupabaseAuth()) { const supabase = await supabaseServer(); await supabase.auth.signOut(); }
  (await cookies()).delete(DEMO_COOKIE_NAME);
  redirect({ href: "/", locale: await getLocale() });
}
