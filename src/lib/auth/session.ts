import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createServerClient } from "@supabase/ssr";
import type { Role } from "./roles";

export type Session = { mode: "demo" | "live"; role: Role; name: string; email: string; organisation?: string; userId?: string };

const DEMO_COOKIE = "dp_demo_session";
const secret = () => process.env.SESSION_SECRET ?? "digipass-demo-secret-change-me";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

export const hasSupabaseAuth = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const DEMO_PERSONAS: Record<Exclude<Role, "visitor">, Omit<Session, "mode">> = {
  member: { role: "member", name: "Demo member", email: "member@example.eu", organisation: "[Textile SME, PT]" },
  "wg-chair": { role: "wg-chair", name: "Demo chair (WG2)", email: "chair@example.eu", organisation: "[DPP software provider, NL]" },
  "org-admin": { role: "org-admin", name: "Demo organisation admin", email: "orgadmin@example.eu", organisation: "[Battery manufacturer, AT]" },
  admin: { role: "admin", name: "Demo Secretariat", email: "secretariat@example.eu" },
};

export function encodeDemo(role: Exclude<Role, "visitor">) { const p = `${role}.${Date.now()}`; return `${p}.${sign(p)}`; }
function decodeDemo(raw?: string): Session | null {
  if (!raw) return null; const [role, ts, sig] = raw.split("."); const p = `${role}.${ts}`;
  const expected = sign(p); if (!sig || sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const persona = DEMO_PERSONAS[role as Exclude<Role, "visitor">]; return persona ? { mode: "demo", ...persona } : null;
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  if (hasSupabaseAuth()) {
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { cookies: { getAll: () => jar.getAll(), setAll: () => {} } });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("full_name, role, organisation_id").eq("id", user.id).single();
      return { mode: "live", role: (profile?.role as Role) ?? "member", name: profile?.full_name ?? user.email ?? "", email: user.email ?? "", userId: user.id };
    }
    return null;
  }
  return decodeDemo(jar.get(DEMO_COOKIE)?.value);
}
export const DEMO_COOKIE_NAME = DEMO_COOKIE;
