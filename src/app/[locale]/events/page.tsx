import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section, SectionHead } from "@/components/ui/Section";
import { EventCard } from "@/components/events/EventCard";
import { events } from "@/content";
import { splitEvents } from "@/lib/filters";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("events");
  const { upcoming, past } = splitEvents(events, new Date());
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section><SectionHead title={t("upcoming")} />{upcoming.length ? <ul className="mt-8 grid gap-4 lg:grid-cols-2">{upcoming.map((e) => <EventCard key={e.slug} e={e} locale={locale} />)}</ul> : <p className="mt-6 text-ink-soft">{t("noUpcoming")}</p>}</Section>
      {past.length > 0 && <Section tone="paper"><SectionHead title={t("past")} /><ul className="mt-8 grid gap-4 lg:grid-cols-2">{past.map((e) => <EventCard key={e.slug} e={e} locale={locale} past />)}</ul></Section>}
    </>
  );
}
