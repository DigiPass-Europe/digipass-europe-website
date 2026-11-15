import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section, SectionHead } from "@/components/ui/Section";
import { services, extraServices } from "@/content";
import { tx } from "@/lib/locale";

export const metadata: Metadata = { title: "Activities & projects" };

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("activities");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section id="programmes">
        <SectionHead title={t("programmesTitle")} />
        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} id={s.id} className="flex gap-5 rounded-lg border border-line p-6">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-ink text-sm font-semibold text-paper">{s.code}</span>
              <div><h3 className="text-lg font-semibold">{tx(s.name, locale)}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{tx(s.summary, locale)}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">{s.features.map((f, i) => <li key={i} className="rounded-sm bg-paper px-2 py-0.5 text-xs text-ink-soft">{tx(f, locale)}</li>)}</ul>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-green-deep">{t(`access.${s.access}`)}</p></div>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="paper" id="distinctive">
        <SectionHead title={t("extraTitle")} lead={t("extraLead")} />
        <div className="mt-10 space-y-5">
          {[...extraServices].sort((a, b) => a.priority - b.priority).map((s) => (
            <article key={s.id} className="rounded-lg border border-line bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-semibold">{tx(s.name, locale)}</h3><div className="flex gap-2 text-xs"><span className="rounded-sm bg-paper px-2 py-1">{t("priority")} {s.priority}</span><span className="rounded-sm bg-blue/10 px-2 py-1 text-blue">{t(`accessExtra.${s.access}`)}</span></div></div>
              <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {(["what", "who", "value", "how"] as const).map((k) => <div key={k}><dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{t(k)}</dt><dd className="mt-1 leading-relaxed">{tx(s[k], locale)}</dd></div>)}
              </dl>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div><SectionHead title={t("projectsTitle")} lead={t("projectsText")} /></div>
          <div><SectionHead title={t("businessTitle")} lead={t("businessText")} /><a href="https://github.com/Belouettar/digipass-europe-website/blob/main/docs/BUSINESS-MODEL.md" className="mt-4 inline-block text-sm font-medium text-blue hover:underline">{t("businessLink")} →</a></div>
        </div>
      </Section>
    </>
  );
}
