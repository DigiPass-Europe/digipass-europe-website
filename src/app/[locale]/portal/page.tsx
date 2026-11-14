import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAccess } from "@/lib/auth/guard";
import { Panel, Stat } from "@/components/portal/ui";
import { demoMembership, demoWgs, demoRegistrations } from "@/lib/db/demo";
import { workingGroups, events, resources, feeTiers } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import type { Role } from "@/lib/auth/roles";

export default async function Dashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const s = await requireAccess("portal"); const t = await getTranslations("portal");
  const r = s.role as Exclude<Role, "visitor">; const m = demoMembership[r]; const wgs = demoWgs[r]; const regs = demoRegistrations[r];
  const meetings = workingGroups.filter((w) => wgs.some((x) => x.id === w.id)).flatMap((w) => w.meetings.map((mt) => ({ ...mt, wg: w.code }))).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("welcome", { name: s.name })}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label={t("cards.status")} value={t(`status.${m.status}`)} sub={tx(feeTiers.find((f) => f.id === m.tier)!.name, locale)} />
        <Stat label={t("cards.renewal")} value={m.renewal === "—" ? "—" : fmtDate(m.renewal, locale)} />
        <Stat label={t("cards.wgs")} value={String(wgs.length)} sub={wgs.map((w) => workingGroups.find((x) => x.id === w.id)!.code).join(" · ")} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title={t("cards.meetings")}><ul className="divide-y divide-line">{meetings.map((mt, i) => <li key={i} className="flex justify-between gap-3 py-2"><span><span className="text-xs text-green">{mt.wg}</span> · {tx(mt.title, locale)}</span><time className="flex-none text-ink-soft">{fmtDate(mt.date, locale, { day: "numeric", month: "short" })}</time></li>)}</ul></Panel>
        <Panel title={t("cards.registrations")} action={<Link href="/portal/events" className="text-xs text-blue hover:underline">→</Link>}><ul className="divide-y divide-line">{regs.map((slug) => { const e = events.find((x) => x.slug === slug)!; return <li key={slug} className="flex justify-between gap-3 py-2"><span>{tx(e.title, locale)}</span><time className="flex-none text-ink-soft">{fmtDate(e.start, locale, { day: "numeric", month: "short" })}</time></li>; })}</ul></Panel>
        <Panel title={t("cards.documents")} action={<Link href="/portal/documents" className="text-xs text-blue hover:underline">→</Link>}><ul className="divide-y divide-line">{resources.filter((x) => x.membersOnly).slice(0, 3).map((x) => <li key={x.id} className="py-2">{tx(x.title, locale)}</li>)}</ul></Panel>
        <Panel title={t("cards.collab")} action={<Link href="/portal/collaboration" className="text-xs text-blue hover:underline">→</Link>}><ul className="divide-y divide-line">{(t.raw("collab.items") as [string, string, string][]).map(([h, , wg]) => <li key={h} className="py-2"><span className="text-xs text-green">{wg}</span> · {h}</li>)}</ul></Panel>
        <Panel title={t("cards.notifications")}><p className="text-ink-soft">— </p></Panel>
        <Panel title={t("cards.newsletter")}><label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Monthly newsletter</label><label className="mt-1 flex items-center gap-2"><input type="checkbox" defaultChecked /> Regulatory alerts (WG1)</label></Panel>
      </div>
    </div>
  );
}
