import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Supabase client for route handlers and server actions; writes auth cookies on the response. */
export async function supabaseServer() {
  const jar = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => { for (const { name, value, options } of list) jar.set(name, value, options); },
    },
  });
}
export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
