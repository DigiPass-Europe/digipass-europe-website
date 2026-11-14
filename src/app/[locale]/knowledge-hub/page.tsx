import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero, Section } from "@/components/ui/Section";
import { IllustrativeBadge, MembersOnlyBadge } from "@/components/ui/Badge";
import { FilterBar } from "@/components/directory/FilterBar";
import { resources, workingGroups } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "Knowledge hub" };
type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function KnowledgeHubPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }) {
  const { locale } = await params; setRequestLocale(locale);
  const sp = await searchParams; const t = await getTranslations("knowledge");
  const type = one(sp.type), wg = one(sp.wg), q = one(sp.q)?.toLowerCase();
  const results = resources.filter((r) => (!type || r.type === type) && (!wg || r.workingGroup === wg) && (!q || tx(r.title, locale).toLowerCase().includes(q) || tx(r.summary, locale).toLowerCase().includes(q))).sort((a, b) => b.date.localeCompare(a.date));
  const types = Object.keys(t.raw("types") as Record<string, string>);
  const filters = [
    { name: "type", label: t("type"), options: types.map((k) => ({ value: k, label: t(`types.${k}`) })) },
    { name: "wg", label: t("wg"), options: workingGroups.map((w) => ({ value: w.id, label: `${w.code} · ${tx(w.name, locale)}` })) },
  ];
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section>
        <Suspense><FilterBar filters={filters} searchLabel={t("search")} resetLabel={t("all")} allLabel={t("all")} /></Suspense>
        <p className="mt-6 text-sm text-ink-soft" role="status">{t("results", { count: results.length })}</p>
        {results.length ? (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {results.map((r) => { const w = workingGroups.find((x) => x.id === r.workingGroup); return (
              <li key={r.id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div><p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-soft">{t(`types.${r.type}`)}{w && <span>· {w.code}</span>}<span>· {fmtDate(r.date, locale)}</span>{r.membersOnly && <MembersOnlyBadge />}<IllustrativeBadge /></p>
                  <h2 className="mt-1 font-semibold">{tx(r.title, locale)}</h2><p className="mt-1 text-sm text-ink-soft">{tx(r.summary, locale)}</p></div>
                {r.membersOnly ? <Link href="/login" className="focus-ring inline-flex h-10 items-center rounded-md border border-line px-4 text-sm hover:bg-paper">{t("loginToOpen")}</Link> : <span className="inline-flex h-10 items-center rounded-md border border-dashed border-line px-4 text-sm text-ink-soft">{t("open")} · PDF</span>}
              </li>); })}
          </ul>
        ) : <p className="mt-6 rounded-lg bg-paper p-6 text-sm text-ink-soft">{t("none")}</p>}
      </Section>
      <Section tone="ink"><div className="max-w-2xl"><p className="eyebrow text-[#7fd4a6]">A</p><h2 className="mt-3 text-2xl font-semibold">{t("observatoryTitle")}</h2><p className="mt-3 text-paper/80">{t("observatoryText")}</p><Link href="/activities#observatory" className="mt-4 inline-block text-sm font-medium text-[#7fd4a6] hover:underline">{t("observatoryLink")} →</Link></div></Section>
    </>
  );
}
