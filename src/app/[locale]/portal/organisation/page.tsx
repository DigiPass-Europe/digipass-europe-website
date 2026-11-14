import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel, Stat } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
import { demoReps, demoMembership } from "@/lib/db/demo";
export default async function OrgDashboard() {
  const s = await requireAccess("portal/organisation"); const t = await getTranslations("portal.org"); const m = demoMembership["org-admin"];
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1><p className="text-sm text-ink-soft">{s.organisation}</p>
    <div className="grid gap-4 sm:grid-cols-3"><Stat label={t("voting")} value={`${m.votes} ${t("votes")}`} sub="§ 10 g" /><Stat label={t("seats")} value="3" sub="§ 5 c" /><Stat label={t("reps")} value={String(demoReps.length)} /></div>
    <Panel title={t("reps")}><ul className="divide-y divide-line">{demoReps.map((r) => <li key={r.email} className="flex justify-between py-2"><span>{r.name} <span className="text-ink-soft">· {r.email}</span></span>{r.voting && <span className="text-xs text-blue">{t("voting")}</span>}</li>)}</ul><DemoActionForm mode={s.mode} submitLabel={t("addRep")} variant="outline"><input placeholder="name@organisation.eu" className="focus-ring block w-full rounded-md border border-line px-3 py-2.5 text-sm" /></DemoActionForm></Panel>
    <Panel title={t("profile")}><DemoActionForm mode={s.mode} submitLabel={t("edit")} variant="outline"><textarea rows={3} defaultValue="Illustrative profile of a large battery manufacturer." className="focus-ring block w-full rounded-md border border-line px-3 py-2.5 text-sm" /></DemoActionForm></Panel></div>);
}
