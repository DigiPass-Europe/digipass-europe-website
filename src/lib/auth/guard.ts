import "server-only";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getSession, type Session } from "./session";
import { canAccess } from "./roles";

/** Server-side guard for portal pages. Redirects to /login when not signed in, to /portal when signed in but not allowed. */
export async function requireAccess(area: string): Promise<Session> {
  const session = await getSession(); const locale = await getLocale();
  if (!session) redirect({ href: { pathname: "/login", query: { next: `/${area}` } }, locale });
  if (!canAccess(session!.role, area)) redirect({ href: "/portal", locale });
  return session!;
}
