import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { IllustrativeBadge } from "@/components/ui/Badge";
import { RegisterForm } from "@/components/events/RegisterForm";
import { events, getEvent, workingGroups } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { routing } from "@/i18n/routing";

export function generateStaticParams() { return routing.locales.flatMap((locale) => events.map((e) => ({ locale, slug: e.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params; const e = getEvent(slug); return { title: e ? tx(e.title, locale) : "Event" };
}

export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const e = getEvent(slug); if (!e) notFound();
  const t = await getTranslations("events");
  const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">{children}</h2>;
  return (
    <>
      <div className="bg-paper"><div className="container-x py-14">
        <Link href="/events" className="text-sm text-ink-soft hover:text-ink">← {t("back")}</Link>
        <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-deep">{t(`types.${e.type}`)}<IllustrativeBadge /></p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{tx(e.title, locale)}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{tx(e.summary, locale)}</p>
      </div></div>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <p className="text-lg leading-relaxed">{tx(e.description, locale)}</p>
            <div><H>{t("speakers")}</H>{e.speakers.length ? <ul className="mt-3 space-y-2">{e.speakers.map((s, i) => <li key={i} className="flex items-center gap-3"><span className="h-10 w-10 rounded-full bg-paper" aria-hidden="true" /><span><span className="block text-sm font-medium">{s.name}</span><span className="block text-xs text-ink-soft">{tx(s.role, locale)}</span></span></li>)}</ul> : <p className="mt-3 text-sm text-ink-soft">{t("speakersTbc")}</p>}</div>
            <div><H>{t("audience")}</H><p className="mt-3 text-sm">{tx(e.audience, locale)}</p></div>
            <div><H>{t("wgs")}</H><ul className="mt-3 flex flex-wrap gap-2">{e.workingGroups.map((id) => { const w = workingGroups.find((x) => x.id === id)!; return <li key={id}><Link href={`/working-groups/${w.slug}`} className="rounded-full border border-line px-3 py-1 text-sm hover:border-blue hover:text-blue">{w.code}</Link></li>; })}</ul></div>
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <dl className="divide-y divide-line rounded-lg border border-line text-sm">
              <div className="p-4"><dt className="text-xs uppercase tracking-wider text-ink-soft">{t("when")}</dt><dd className="mt-1 font-medium">{fmtDate(e.start, locale, { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}{e.end && ` – ${fmtDate(e.end, locale, new Date(e.end).toDateString() === new Date(e.start).toDateString() ? { hour: "2-digit", minute: "2-digit" } : { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}`}</dd></div>
              <div className="p-4"><dt className="text-xs uppercase tracking-wider text-ink-soft">{t("where")}</dt><dd className="mt-1 font-medium">{tx(e.location, locale)}{e.online && ` · ${t("online")}`}</dd></div>
              <div className="p-4"><dt className="text-xs uppercase tracking-wider text-ink-soft">{t("pricing")}</dt><dd className="mt-1 font-medium">{e.pricing ? `${t("members")}: ${e.pricing.members === 0 ? t("free") : `€${e.pricing.members}`} · ${t("nonMembers")}: €${e.pricing.nonMembers}` : t("free")}</dd></div>
            </dl>
            <div className="rounded-lg bg-paper p-5"><h2 className="font-semibold">{t("registerTitle")}</h2><div className="mt-4"><RegisterForm slug={e.slug} /></div></div>
          </aside>
        </div>
      </Section>
    </>
  );
}
