import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section, SectionHead } from "@/components/ui/Section";
import { mission, activities, bodies, transparency, admissionSteps, membershipTermination, workingGroups, site } from "@/content";
import { tx } from "@/lib/locale";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "About us" };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("about"); const c = await getTranslations("common");
  return (
    <>
      <PageHero eyebrow="DigiPass:Europe" title={t("title")} lead={t("lead")} />
      <Section id="mission">
        <SectionHead eyebrow={t("missionTitle")} title={tx(mission.alt, locale)} />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {[["purposeTitle", mission.purpose], ["roleTitle", mission.role], ["scopeTitle", mission.scope]].map(([k, v]) => (
            <div key={k as string} className="rule-top pt-5"><h3 className="font-semibold">{t(k as "purposeTitle")}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{tx(v as typeof mission.purpose, locale)}</p></div>
          ))}
        </div>
      </Section>
      <Section tone="paper" id="objectives">
        <SectionHead title={t("objectivesTitle")} lead={t("objectivesLead")} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, i) => <li key={i} className="flex gap-4 rounded-lg border border-line bg-white p-5 text-sm leading-relaxed"><span className="font-semibold text-green">{String(i + 1).padStart(2, "0")}</span>{tx(a, locale)}</li>)}
        </ol>
      </Section>
      <Section id="governance">
        <SectionHead title={t("governanceTitle")} lead={t("governanceLead")} />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {bodies.map((b) => (
            <article key={b.id} id={b.id} className="rounded-lg border border-line p-6">
              <h3 className="text-lg font-semibold">{tx(b.name, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tx(b.summary, locale)}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">{b.points.map((p, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 flex-none rounded-full bg-blue" />{tx(p, locale)}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-paper p-6"><h3 className="font-semibold">{t("boardTitle")}</h3><p className="mt-2 text-sm text-ink-soft">{t("boardNote")}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">{["President", "First Vice-President", "Vice-President", "Finance Officer", "Secretary", "Board member"].map((r) => <li key={r} className="rounded border border-dashed border-line bg-white px-3 py-2"><span className="block text-xs text-ink-soft">{r}</span><span className="text-xs font-medium text-green">{c("open")}</span></li>)}</ul></div>
          <div className="rounded-lg bg-paper p-6"><h3 className="font-semibold">{t("wgLeadershipTitle")}</h3><p className="mt-2 text-sm text-ink-soft">{t("wgLeadershipNote")}</p>
            <ul className="mt-4 space-y-1 text-sm">{workingGroups.map((w) => <li key={w.id} className="flex justify-between gap-4 border-b border-line py-1.5"><Link href={`/working-groups/${w.slug}`} className="hover:text-blue">{w.code} · {tx(w.name, locale)}</Link><span className="flex-none text-xs text-green">{c("open")}</span></li>)}</ul></div>
        </div>
      </Section>
      <Section tone="paper" id="statutes">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><SectionHead title={t("statutesTitle")} lead={t("statutesText")} /><p className="mt-6 inline-flex items-center gap-2 rounded-md border border-dashed border-ink/30 px-4 py-2 text-sm text-ink-soft">{t("statutesDownload")}</p></div>
          <div><SectionHead title={t("conditionsTitle")} lead={t("conditionsLead")} />
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-soft">{t("admissionTitle")}</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-soft">{admissionSteps.map((s, i) => <li key={i}>{tx(s, locale)}</li>)}</ol>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-soft">{t("terminationTitle")}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">{membershipTermination.map((s, i) => <li key={i}>{tx(s, locale)}</li>)}</ul></div>
        </div>
      </Section>
      <Section id="transparency">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><SectionHead title={t("transparencyTitle")} lead={t("transparencyLead")} /><ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-soft">{transparency.map((s, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green" />{tx(s, locale)}</li>)}</ul></div>
          <div><SectionHead title={t("reportsTitle")} lead={t("reportsText")} />
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-ink-soft">{t("contactTitle")}</h3>
            <address className="mt-2 not-italic text-sm leading-relaxed text-ink-soft">DigiPass:Europe<br />{site.address}<br />{site.seat}<br />{site.register}<br /><a className="text-blue hover:underline" href={`mailto:${site.email}`}>{site.email}</a></address></div>
        </div>
      </Section>
    </>
  );
}
