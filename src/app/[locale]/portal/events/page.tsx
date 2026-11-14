import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { demoRegistrations } from "@/lib/db/demo";
import { events } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import type { Role } from "@/lib/auth/roles";
export default async function PortalEvents({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const s = await requireAccess("portal/events"); const t = await getTranslations("portal.events");
  const regs = demoRegistrations[s.role as Exclude<Role, "visitor">];
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1>
    <Panel title={t("registered")} action={<Link href="/events" className="text-xs text-blue hover:underline">{t("browse")}</Link>}><ul className="divide-y divide-line">{regs.map((slug) => { const e = events.find((x) => x.slug === slug)!; return <li key={slug} className="flex justify-between gap-3 py-3"><Link href={`/events/${e.slug}`} className="hover:text-blue">{tx(e.title, locale)}</Link><span className="flex-none text-xs text-ink-soft">{fmtDate(e.start, locale)} · <span className="text-green">{t("ticket")}</span></span></li>; })}</ul></Panel></div>);
}
