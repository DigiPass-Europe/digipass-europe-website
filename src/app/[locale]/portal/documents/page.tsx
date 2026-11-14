import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { resources, workingGroups } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
export default async function PortalDocs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; await requireAccess("portal/documents"); const t = await getTranslations("portal.docs");
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1><p className="text-sm text-ink-soft">{t("text")}</p>
    <Panel title={t("title")}><ul className="divide-y divide-line">{resources.filter((r) => r.membersOnly).map((r) => <li key={r.id} className="flex justify-between gap-3 py-3"><span>{tx(r.title, locale)}<span className="ml-2 text-xs text-ink-soft">{workingGroups.find((w) => w.id === r.workingGroup)?.code}</span></span><span className="flex-none text-xs text-ink-soft">{fmtDate(r.date, locale)} · PDF</span></li>)}</ul></Panel></div>);
}
