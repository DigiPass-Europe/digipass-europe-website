import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero, Section } from "@/components/ui/Section";
import { IllustrativeBadge } from "@/components/ui/Badge";
import { FilterBar } from "@/components/directory/FilterBar";
import { memberOrgs, countries, orgTypeLabels, workingGroups } from "@/content";
import { filterMembers } from "@/lib/filters";
import { tx } from "@/lib/locale";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "Members directory" };
type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function MembersPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }) {
  const { locale } = await params; setRequestLocale(locale);
  const sp = await searchParams; const t = await getTranslations("directory");
  const f = { country: one(sp.country), type: one(sp.type), wg: one(sp.wg), sector: one(sp.sector), q: one(sp.q) };
  const results = filterMembers(memberOrgs, f);
  const sectors = [...new Set(memberOrgs.flatMap((m) => m.sectors))].sort();
  const filters = [
    { name: "country", label: t("country"), options: Object.keys(countries).sort().map((c) => ({ value: c, label: tx(countries[c], locale) })) },
    { name: "type", label: t("type"), options: Object.keys(orgTypeLabels).map((c) => ({ value: c, label: tx(orgTypeLabels[c], locale) })) },
    { name: "sector", label: t("sector"), options: sectors.map((s) => ({ value: s, label: s })) },
    { name: "wg", label: t("wg"), options: workingGroups.map((w) => ({ value: w.id, label: `${w.code} · ${tx(w.name, locale)}` })) },
  ];
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section>
        <Suspense><FilterBar filters={filters} searchLabel={t("search")} resetLabel={t("reset")} allLabel={t("all")} /></Suspense>
        <p className="mt-6 text-sm text-ink-soft" role="status">{t("results", { count: results.length })}</p>
        {results.length ? (
          <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((m) => (
              <li key={m.id} className="flex flex-col rounded-lg border border-line p-5">
                <div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded bg-paper text-xs font-semibold text-ink-soft" aria-hidden="true">{m.country}</div><IllustrativeBadge /></div>
                <h2 className="mt-3 font-semibold">{m.name}</h2>
                <p className="text-sm text-ink-soft">{tx(orgTypeLabels[m.type], locale)} · {tx(countries[m.country], locale)}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{tx(m.description, locale)}</p>
                <dl className="mt-4 space-y-2 text-xs">
                  <div><dt className="inline font-semibold uppercase tracking-wider text-ink-soft">{t("expertise")}: </dt><dd className="inline">{m.expertise.join(", ")}</dd></div>
                  <div><dt className="inline font-semibold uppercase tracking-wider text-ink-soft">{t("sectors")}: </dt><dd className="inline">{m.sectors.join(", ")}</dd></div>
                </dl>
                <ul className="mt-4 flex flex-wrap gap-1.5">{m.workingGroups.map((id) => { const w = workingGroups.find((x) => x.id === id)!; return <li key={id}><Link href={`/working-groups/${w.slug}`} className="rounded-sm bg-blue/10 px-2 py-0.5 text-xs text-blue hover:bg-blue/20">{w.code}</Link></li>; })}</ul>
              </li>
            ))}
          </ul>
        ) : <p className="mt-6 rounded-lg bg-paper p-6 text-sm text-ink-soft">{t("none")}</p>}
        <p className="mt-8 text-xs text-ink-soft">{t("privacy")}</p>
      </Section>
      <Section tone="paper"><div className="max-w-2xl"><h2 className="text-2xl font-semibold">{t("expertsTitle")}</h2><p className="mt-3 text-ink-soft">{t("expertsText")}</p></div></Section>
    </>
  );
}
