import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/Section";
import { IllustrativeBadge } from "@/components/ui/Badge";
import { news } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = { title: "News" };
type SP = Record<string, string | string[] | undefined>;

export default async function NewsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SP> }) {
  const { locale } = await params; setRequestLocale(locale);
  const sp = await searchParams; const t = await getTranslations("news");
  const cat = typeof sp.category === "string" ? sp.category : undefined;
  const cats = Object.keys(t.raw("categories") as Record<string, string>);
  const items = news.filter((n) => !cat || n.category === cat).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section>
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          <Link href="/news" className={`rounded-full border px-3 py-1.5 text-sm ${!cat ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{t("all")}</Link>
          {cats.map((c) => <Link key={c} href={{ pathname: "/news", query: { category: c } }} className={`rounded-full border px-3 py-1.5 text-sm ${cat === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>{t(`categories.${c}`)}</Link>)}
        </nav>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((n) => (
            <li key={n.slug}><Link href={`/news/${n.slug}`} className="focus-ring group flex h-full flex-col rounded-lg border border-line p-6 transition hover:border-blue">
              <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-green-deep">{t(`categories.${n.category}`)}<IllustrativeBadge /></p>
              <h2 className="mt-3 text-lg font-semibold leading-snug group-hover:text-blue">{tx(n.title, locale)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{tx(n.excerpt, locale)}</p>
              <p className="mt-4 text-xs text-ink-soft"><time dateTime={n.date}>{fmtDate(n.date, locale)}</time> · {tx(n.author, locale)}</p>
            </Link></li>
          ))}
        </ul>
      </Section>
    </>
  );
}
