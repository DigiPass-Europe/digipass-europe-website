import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel, Stat } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
import { demoApplications } from "@/lib/db/demo";
import { feeTiers, memberOrgs } from "@/content";
import { tx } from "@/lib/locale";
export default async function Admin({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const s = await requireAccess("portal/admin"); const t = await getTranslations("portal.admin");
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1>
    <div className="grid gap-4 sm:grid-cols-3"><Stat label={t("queue")} value={String(demoApplications.length)} /><Stat label={t("members")} value={String(memberOrgs.length)} /><Stat label={t("events")} value="—" /></div>
    <Panel title={t("queue")}><ul className="divide-y divide-line">{demoApplications.map((a) => <li key={a.id} className="grid gap-3 py-4 md:grid-cols-[1fr_auto] md:items-center"><div><p className="font-medium">{a.id} · {a.applicant}{a.org !== "—" && ` · ${a.org}`}</p><p className="text-xs text-ink-soft">{tx(feeTiers.find((f) => f.id === a.tier)!.name, locale)} · {a.submitted} · {t("endorsements")}: {a.endorsements}/2{a.boardEndorsement ? " ✓ Board" : ""}</p></div>
      <div className="flex gap-2">{a.status === "ready" ? <><DemoActionForm mode={s.mode} submitLabel={t("approve")} variant="green" /><DemoActionForm mode={s.mode} submitLabel={t("reject")} variant="outline" /></> : <DemoActionForm mode={s.mode} submitLabel={t("endorse")} variant="outline" />}</div></li>)}</ul></Panel>
    <Panel title={t("content")}><p className="text-ink-soft">{t("contentText")}</p></Panel></div>);
}
