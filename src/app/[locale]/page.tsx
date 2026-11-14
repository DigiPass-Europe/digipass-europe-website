import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHead } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IllustrativeBadge, MembersOnlyBadge } from "@/components/ui/Badge";
import { EcosystemDiagram } from "@/components/home/EcosystemDiagram";
import { mission, whyDpp, activities, workingGroups, events, resources, memberOrgs, news, countries, orgTypeLabels } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { splitEvents } from "@/lib/filters";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const { upcoming } = splitEvents(events, new Date());
  const pubs = [...resources].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const orgs = memberOrgs.filter((m) => m.published).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <svg className="absolute -right-24 top-1/2 h-[140%] w-auto -translate-y-1/2 opacity-[0.08]" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="3 7" />
            {Array.from({ length: 12 }).map((_, k) => { const a = (k * Math.PI) / 6; return <rect key={k} x={200 + 150 * Math.cos(a) - 9} y={200 + 150 * Math.sin(a) - 9} width="18" height="18" rx="3" fill="#fff" />; })}
          </svg>
        </div>
        <div className="container-x relative grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-32">
          <div className="lg:col-span-8">
            <p className="eyebrow text-[#7fd4a6]">{t("heroEyebrow")}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{tx(mission.headline, locale)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80 sm:text-xl">{tx(mission.supporting, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/join" variant="green">{t("heroCta")}</ButtonLink>
              <ButtonLink href="/working-groups" variant="outline-light">{t("heroSecondary")}</ButtonLink>
            </div>
          </div>
          <div className="hidden lg:col-span-4 lg:block">
            <img src="/brand/symbol-dark.svg" alt="" className="ml-auto w-64" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHead eyebrow={t("introEyebrow")} title={t("introTitle")} /></div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-soft">{t("introText")}</p>
            <p className="mt-5 leading-relaxed text-ink-soft">{tx(mission.role, locale)}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[["10", t("wgEyebrow")], ["EU + intl.", "Scope"], ["EN · FR", "Languages"], ["Non-profit", "Verein, AT"]].map(([v, l]) => (
                <div key={l} className="rule-top pt-4"><dt className="text-2xl font-semibold tracking-tight">{v}</dt><dd className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{l}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Why DPP */}
      <Section tone="paper">
        <SectionHead eyebrow={t("whyEyebrow")} title={t("whyTitle")} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {whyDpp.map((w, i) => (
            <div key={i} className="bg-white p-7">
              <span className="text-sm font-semibold text-green">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{tx(w.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tx(w.text, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={t("missionEyebrow")} title={t("missionTitle")} lead={tx(mission.purpose, locale)} />
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-7">
            {activities.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />{tx(a, locale)}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Ecosystem */}
      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHead eyebrow={t("ecosystemEyebrow")} title={t("ecosystemTitle")} lead={t("ecosystemLead")} /></div>
          <div className="rounded-lg border border-line bg-white p-4 sm:p-8 lg:col-span-7"><EcosystemDiagram labels={t.raw("actors") as string[]} centre={t("ecosystemCentre")} /></div>
        </div>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHead eyebrow={t("benefitsEyebrow")} title={t("benefitsTitle")} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("benefits") as [string, string][]).map(([h, p]) => (
            <div key={h} className="rule-top pt-6"><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{p}</p></div>
          ))}
        </div>
        <div className="mt-10"><ButtonLink href="/membership" variant="outline">{t("ctaSecondary")}</ButtonLink></div>
      </Section>

      {/* Working groups */}
      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl"><p className="eyebrow text-[#7fd4a6]">{t("wgEyebrow")}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("wgTitle")}</h2><p className="mt-4 text-paper/75">{t("wgLead")}</p></div>
          <ButtonLink href="/working-groups" variant="outline-light">{t("wgAll")}</ButtonLink>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {workingGroups.map((wg) => (
            <li key={wg.id} className="bg-ink">
              <Link href={`/working-groups/${wg.slug}`} className="focus-ring block h-full p-5 transition hover:bg-white/5">
                <span className="text-xs font-semibold text-[#7fd4a6]">{wg.code}</span>
                <span className="mt-2 block text-sm font-medium leading-snug">{tx(wg.name, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Events + publications */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="flex items-end justify-between gap-4"><SectionHead eyebrow={t("eventsEyebrow")} title={t("eventsTitle")} /><Link href="/events" className="text-sm font-medium text-blue hover:underline">{t("eventsAll")} →</Link></div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {upcoming.slice(0, 3).map((e) => (
                <li key={e.slug} className="py-4">
                  <Link href={`/events/${e.slug}`} className="focus-ring group grid gap-1 rounded sm:grid-cols-[7rem_1fr]">
                    <time dateTime={e.start} className="text-sm text-ink-soft">{fmtDate(e.start, locale, { day: "numeric", month: "short", year: "numeric" })}</time>
                    <span><span className="font-medium group-hover:text-blue">{tx(e.title, locale)}</span> <IllustrativeBadge className="ml-2 align-middle" /><span className="mt-1 block text-sm text-ink-soft">{tx(e.location, locale)}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-end justify-between gap-4"><SectionHead eyebrow={t("pubsEyebrow")} title={t("pubsTitle")} /><Link href="/knowledge-hub" className="text-sm font-medium text-blue hover:underline">{t("pubsAll")} →</Link></div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {pubs.map((r) => (
                <li key={r.id} className="py-4">
                  <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-soft">{r.type.replace("-", " ")} {r.membersOnly && <MembersOnlyBadge />}<IllustrativeBadge /></p>
                  <p className="mt-1 font-medium">{tx(r.title, locale)}</p>
                  <p className="mt-1 text-sm text-ink-soft">{tx(r.summary, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Members */}
      <Section tone="paper">
        <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow={t("membersEyebrow")} title={t("membersTitle")} lead={t("membersNote")} /><ButtonLink href="/members" variant="outline">{t("membersAll")}</ButtonLink></div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orgs.map((m) => (
            <li key={m.id} className="rounded-lg border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-3"><div className="flex h-10 w-10 items-center justify-center rounded bg-paper text-xs font-semibold text-ink-soft">{m.country}</div><IllustrativeBadge /></div>
              <p className="mt-3 font-medium">{m.name}</p>
              <p className="text-sm text-ink-soft">{tx(orgTypeLabels[m.type], locale)} · {tx(countries[m.country], locale)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Calls + news */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={t("callsEyebrow")} title={t("callsTitle")} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {(t.raw("calls") as [string, string, string][]).map(([h, p, href]) => (
                <li key={h} className="rounded-lg border border-line p-5"><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm text-ink-soft">{p}</p><Link href={href} className="mt-4 inline-block text-sm font-medium text-blue hover:underline">→</Link></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="flex items-end justify-between gap-4"><SectionHead eyebrow={t("newsEyebrow")} title="" /><Link href="/news" className="text-sm font-medium text-blue hover:underline">{t("newsAll")} →</Link></div>
            <ul className="-mt-6 divide-y divide-line">
              {latestNews.map((n) => (
                <li key={n.slug} className="py-4"><Link href={`/news/${n.slug}`} className="group block"><time className="text-xs text-ink-soft">{fmtDate(n.date, locale)}</time><p className="mt-1 font-medium group-hover:text-blue">{tx(n.title, locale)}</p></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-blue text-white">
        <div className="container-x flex flex-col items-start gap-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("ctaTitle")}</h2><p className="mt-3 text-white/80">{t("ctaText")}</p></div>
          <div className="flex flex-wrap gap-3"><ButtonLink href="/join" className="bg-white text-blue hover:bg-paper">{t("ctaButton")}</ButtonLink><ButtonLink href="/membership" variant="outline-light">{t("ctaSecondary")}</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
