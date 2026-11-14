import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const hasSupabase = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

let admin: SupabaseClient | null = null;
/** Server-side client with the service role. Only call after hasSupabase(). */
export function adminClient(): SupabaseClient {
  if (!admin) admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  return admin;
}

export type StoreResult = { stored: boolean; mode: "live" | "demo"; id?: string; error?: string };

/** Insert a row if a database is configured; otherwise report demo mode honestly. */
export async function storeRow(table: string, row: Record<string, unknown>): Promise<StoreResult> {
  if (!hasSupabase()) return { stored: false, mode: "demo" };
  const { data, error } = await adminClient().from(table).insert(row).select("id").single();
  if (error) return { stored: false, mode: "live", error: error.message };
  return { stored: true, mode: "live", id: data.id as string };
}
