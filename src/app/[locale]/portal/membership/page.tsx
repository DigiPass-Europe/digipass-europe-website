import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel, Stat } from "@/components/portal/ui";
import { demoMembership } from "@/lib/db/demo";
import { feeTiers } from "@/content";
import { tx, fmtDate, fmtEur } from "@/lib/locale";
import type { Role } from "@/lib/auth/roles";
export default async function MembershipPortal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const s = await requireAccess("portal/membership"); const t = await getTranslations("portal.membership");
  const m = demoMembership[s.role as Exclude<Role, "visitor">];
  return (
    <div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat label={t("category")} value={m.category} /><Stat label={t("tier")} value={tx(feeTiers.find((f) => f.id === m.tier)!.name, locale)} /><Stat label={t("votes")} value={String(m.votes)} /><Stat label={t("since")} value={fmtDate(m.since, locale)} sub={`${t("renewal")}: ${m.renewal === "—" ? "—" : fmtDate(m.renewal, locale)}`} /></div>
      <Panel title={t("invoices")}>{m.invoices.length ? <table className="w-full text-sm"><thead className="text-left text-xs uppercase tracking-wider text-ink-soft"><tr><th className="py-2">{t("invoice")}</th><th>Date</th><th>{t("amount")}</th><th>Status</th><th></th></tr></thead><tbody className="divide-y divide-line">{m.invoices.map((i) => <tr key={i.id}><td className="py-2 font-medium">{i.id}</td><td>{fmtDate(i.date, locale)}</td><td>{fmtEur(i.amount, locale)}</td><td>{i.paid ? <span className="text-green">{t("paid")}</span> : <span className="text-[#5a4a00]">{t("open")}</span>}</td><td className="text-right text-ink-soft">{t("download")}</td></tr>)}</tbody></table> : <p className="text-ink-soft">—</p>}<p className="mt-4 text-xs text-ink-soft">{t("renewalNotice")}</p></Panel>
    </div>
  );
}
