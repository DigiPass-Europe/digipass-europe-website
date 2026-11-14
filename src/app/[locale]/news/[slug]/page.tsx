import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { IllustrativeBadge } from "@/components/ui/Badge";
import { news, getNews, resources } from "@/content";
import { tx, fmtDate } from "@/lib/locale";
import { routing } from "@/i18n/routing";

export function generateStaticParams() { return routing.locales.flatMap((locale) => news.map((n) => ({ locale, slug: n.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params; const n = getNews(slug); return { title: n ? tx(n.title, locale) : "News" };
}

export default async function NewsArticle({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params; setRequestLocale(locale);
  const n = getNews(slug); if (!n) notFound();
  const t = await getTranslations("news");
  const related = resources.filter((r) => n.related?.includes(r.id));
  return (
    <article className="container-x py-14">
      <Link href="/news" className="text-sm text-ink-soft hover:text-ink">← {t("back")}</Link>
      <header className="mx-auto mt-8 max-w-3xl">
        <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-green-deep">{t(`categories.${n.category}`)}<IllustrativeBadge /></p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{tx(n.title, locale)}</h1>
        <p className="mt-5 text-lg text-ink-soft">{tx(n.excerpt, locale)}</p>
        <p className="mt-5 text-sm text-ink-soft"><time dateTime={n.date}>{fmtDate(n.date, locale)}</time> · {t("by")} {tx(n.author, locale)}</p>
      </header>
      <div className="mx-auto mt-10 max-w-3xl space-y-5 text-lg leading-relaxed">{n.body.map((p, i) => <p key={i}>{tx(p, locale)}</p>)}</div>
      <footer className="mx-auto mt-12 max-w-3xl border-t border-line pt-6">
        <p className="text-xs uppercase tracking-wider text-ink-soft">{t("tags")}</p><ul className="mt-2 flex flex-wrap gap-2">{n.tags.map((tag) => <li key={tag} className="rounded-sm bg-paper px-2 py-0.5 text-xs">{tag}</li>)}</ul>
        {related.length > 0 && <><p className="mt-6 text-xs uppercase tracking-wider text-ink-soft">{t("related")}</p><ul className="mt-2 text-sm">{related.map((r) => <li key={r.id}>{tx(r.title, locale)}</li>)}</ul></>}
      </footer>
    </article>
  );
}
