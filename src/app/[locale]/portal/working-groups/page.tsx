import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
import { demoWgs } from "@/lib/db/demo";
import { workingGroups } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import type { Role } from "@/lib/auth/roles";
export default async function PortalWgs({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const s = await requireAccess("portal/working-groups"); const t = await getTranslations("portal.wg");
  const mine = demoWgs[s.role as Exclude<Role, "visitor">];
  return (
    <div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Panel title={t("mine")}><ul className="divide-y divide-line">{mine.map((x) => { const w = workingGroups.find((g) => g.id === x.id)!; const next = w.meetings[0]; return <li key={x.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><Link href={`/working-groups/${w.slug}`} className="font-medium hover:text-blue">{w.code} · {tx(w.name, locale)}</Link><p className="text-xs text-ink-soft">{x.role} · {t("nextMeeting")}: {next ? fmtDate(next.date, locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</p></div><div className="flex gap-2 text-xs">{x.role === "chair" && <Link href="/portal/working-groups/manage" className="rounded-md bg-blue px-3 py-1.5 text-white">{t("manage")}</Link>}<span className="rounded-md border border-line px-3 py-1.5 text-ink-soft">{t("minutes")}</span></div></li>; })}</ul></Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={t("join")}><DemoActionForm mode={s.mode} submitLabel={t("join")}><select className="focus-ring mt-1 block w-full rounded-md border border-line px-3 py-2.5 text-sm">{workingGroups.filter((w) => !mine.some((m) => m.id === w.id)).map((w) => <option key={w.id}>{w.code} · {tx(w.name, locale)}</option>)}</select></DemoActionForm></Panel>
        <Panel title={t("leadership")}><DemoActionForm mode={s.mode} submitLabel={t("leadership")} variant="outline"><textarea rows={3} className="focus-ring mt-1 block w-full rounded-md border border-line px-3 py-2.5 text-sm" placeholder="…" /></DemoActionForm></Panel>
      </div>
      <Panel title={t("propose")}><DemoActionForm mode={s.mode} submitLabel={t("propose")} variant="outline"><textarea rows={4} className="focus-ring mt-1 block w-full rounded-md border border-line px-3 py-2.5 text-sm" placeholder="Scope, expected members, first deliverables" /></DemoActionForm></Panel>
    </div>
  );
}
