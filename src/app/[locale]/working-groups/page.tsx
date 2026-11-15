import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHero, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { workingGroups } from "@/content";
import { tx } from "@/lib/locale";

export const metadata: Metadata = { title: "Working groups" };

export default async function WorkingGroupsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("wg"); const c = await getTranslations("common");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} tone="ink"><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/join" variant="green">{c("learnMore")}: {t("join")}</ButtonLink><ButtonLink href="/contact" variant="outline-light">{t("propose")}</ButtonLink></div></PageHero>
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {workingGroups.map((wg) => (
            <li key={wg.id}>
              <Link href={`/working-groups/${wg.slug}`} className="focus-ring group flex h-full flex-col rounded-lg border border-line p-6 transition hover:border-blue hover:shadow-sm">
                <div className="flex items-center justify-between"><span className="text-xs font-semibold text-green">{wg.code}</span><span className="text-xs text-ink-soft">{wg.leadership.length} × {c("open")}</span></div>
                <h2 className="mt-3 text-xl font-semibold group-hover:text-blue">{tx(wg.name, locale)}</h2>
                <p className="mt-1 text-sm italic text-ink-soft">{tx(wg.tagline, locale)}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{tx(wg.mission, locale)}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">{wg.deliverables.slice(0, 3).map((d, i) => <li key={i} className="rounded-sm bg-paper px-2 py-0.5 text-xs text-ink-soft">{tx(d, locale).replace(/\.$/, "")}</li>)}</ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
