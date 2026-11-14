import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { IllustrativeBadge, MembersOnlyBadge } from "@/components/ui/Badge";
import { workingGroups, getWorkingGroup, resources, events } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => workingGroups.map((w) => ({ locale, slug: w.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params; const wg = getWorkingGroup(slug);
  return { title: wg ? `${wg.code} · ${tx(wg.name, locale)}` : "Working group" };
}

export default async function WorkingGroupPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const wg = getWorkingGroup(slug); if (!wg) notFound();
  const t = await getTranslations("wg"); const c = await getTranslations("common");
  const pubs = resources.filter((r) => r.workingGroup === wg.id);
  const wgEvents = events.filter((e) => e.workingGroups.includes(wg.id) && new Date(e.start) > new Date()).slice(0, 3);
  const related = workingGroups.filter((w) => w.id !== wg.id && events.some((e) => e.workingGroups.includes(w.id) && e.workingGroups.includes(wg.id))).slice(0, 3);
  const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">{children}</h2>;
  return (
    <>
      <div className="bg-ink text-paper"><div className="container-x py-14 sm:py-18">
        <Link href="/working-groups" className="text-sm text-paper/70 hover:text-white">← {t("viewAll")}</Link>
        <p className="mt-6 text-sm font-semibold text-[#7fd4a6]">{wg.code}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{tx(wg.name, locale)}</h1>
        <p className="mt-4 text-lg italic text-paper/80">{tx(wg.tagline, locale)}</p>
      </div></div>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div><H>{t("mission")}</H><p className="mt-3 text-lg leading-relaxed">{tx(wg.mission, locale)}</p></div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div><H>{t("objectives")}</H><ul className="mt-3 space-y-2 text-sm leading-relaxed">{wg.objectives.map((o, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />{tx(o, locale)}</li>)}</ul></div>
              <div><H>{t("deliverables")}</H><ul className="mt-3 space-y-2 text-sm leading-relaxed">{wg.deliverables.map((o, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-green" />{tx(o, locale)}</li>)}</ul></div>
            </div>
            <div><H>{t("activities")}</H><ul className="mt-3 grid gap-3 sm:grid-cols-2">{wg.activities.map((a, i) => <li key={i} className="rounded-lg bg-paper p-4 text-sm">{tx(a, locale)}</li>)}</ul></div>
            {wg.sectors && <div><H>{t("sectors")}</H><ul className="mt-3 flex flex-wrap gap-2">{wg.sectors.map((s, i) => <li key={i} className="rounded-full border border-line px-3 py-1 text-sm">{tx(s, locale)}</li>)}</ul></div>}
            <div><H>{t("projects")}</H><ul className="mt-3 divide-y divide-line border-y border-line">{wg.projects.map((p, i) => <li key={i} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><span>{tx(p.title, locale)}</span><span className="flex items-center gap-2"><span className={`rounded-sm px-2 py-0.5 text-xs ${p.status === "active" ? "bg-green/10 text-green-deep" : "bg-paper text-ink-soft"}`}>{t(`status.${p.status}`)}</span><IllustrativeBadge /></span></li>)}</ul></div>
            <div><H>{t("publications")}</H>{pubs.length ? <ul className="mt-3 divide-y divide-line border-y border-line">{pubs.map((r) => <li key={r.id} className="py-3"><p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-ink-soft">{r.type.replace("-", " ")}{r.membersOnly && <MembersOnlyBadge />}<IllustrativeBadge /></p><p className="mt-1 text-sm font-medium">{tx(r.title, locale)}</p></li>)}</ul> : <p className="mt-3 text-sm text-ink-soft">{t("noPubs")}</p>}</div>
          </div>
          <aside className="space-y-8 lg:col-span-4">
            <div className="rounded-lg border border-line p-5"><H>{t("leadership")}</H>
              <ul className="mt-3 space-y-3">{wg.leadership.map((l) => <li key={l.role} className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-ink/30 text-ink-soft" aria-hidden="true">?</span><span><span className="block text-sm font-medium">{l.role === "chair" ? t("chair") : t("viceChair")}</span><span className="block text-xs text-green">{c("open")} · {c("openDesc")}</span></span></li>)}</ul>
              <Link href="/login" className="mt-4 inline-block text-sm font-medium text-blue hover:underline">{t("leadInterest")} →</Link></div>
            <div className="rounded-lg border border-line p-5"><H>{t("members")}</H><p className="mt-3 text-sm text-ink-soft">{t("membersNote")}</p></div>
            <div className="rounded-lg border border-line p-5"><H>{t("meetings")}</H><ul className="mt-3 space-y-3 text-sm">{[...wg.meetings.map((m) => ({ date: m.date, title: tx(m.title, locale), mode: t(`mode.${m.mode}`), href: null as string | null })), ...wgEvents.map((e) => ({ date: e.start, title: tx(e.title, locale), mode: e.online ? t("mode.online") : tx(e.location, locale), href: `/events/${e.slug}` }))].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4).map((m, i) => <li key={i}><time className="block text-xs text-ink-soft">{fmtDate(m.date, locale, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</time>{m.href ? <Link href={m.href} className="font-medium hover:text-blue">{m.title}</Link> : <span className="font-medium">{m.title}</span>}<span className="ml-2 text-xs text-ink-soft">{m.mode}</span> <IllustrativeBadge /></li>)}</ul></div>
            <div className="rounded-lg bg-paper p-5"><H>{t("join")}</H><p className="mt-3 text-sm leading-relaxed text-ink-soft">{t("joinText")}</p><div className="mt-4 flex flex-col gap-2"><ButtonLink href="/join" variant="green">{t("join")}</ButtonLink><ButtonLink href="/contact" variant="outline">{t("propose")}</ButtonLink></div></div>
            {related.length > 0 && <div><H>{t("related")}</H><ul className="mt-3 space-y-2 text-sm">{related.map((r) => <li key={r.id}><Link href={`/working-groups/${r.slug}`} className="hover:text-blue">{r.code} · {tx(r.name, locale)}</Link></li>)}</ul></div>}
          </aside>
        </div>
      </Section>
    </>
  );
}
