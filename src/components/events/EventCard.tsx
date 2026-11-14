import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AssociationEvent } from "@/content/types";
import { tx, fmtDate } from "@/lib/locale";
import { IllustrativeBadge } from "@/components/ui/Badge";

export function EventCard({ e, locale, past = false }: { e: AssociationEvent; locale: string; past?: boolean }) {
  const t = useTranslations("events");
  const d = new Date(e.start);
  return (
    <li className={`rounded-lg border border-line ${past ? "opacity-80" : ""}`}>
      <Link href={`/events/${e.slug}`} className="focus-ring group grid gap-5 p-5 sm:grid-cols-[5.5rem_1fr]">
        <time dateTime={e.start} className="flex flex-col rounded-md bg-paper p-3 text-center sm:h-fit"><span className="text-2xl font-semibold leading-none">{d.getDate()}</span><span className="mt-1 text-xs uppercase tracking-wider text-ink-soft">{fmtDate(e.start, locale, { month: "short" })}</span><span className="text-xs text-ink-soft">{d.getFullYear()}</span></time>
        <div><p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-green-deep">{t(`types.${e.type}`)}<IllustrativeBadge /></p>
          <h3 className="mt-1 text-lg font-semibold group-hover:text-blue">{tx(e.title, locale)}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tx(e.summary, locale)}</p>
          <p className="mt-2 text-sm text-ink-soft">{tx(e.location, locale)} · {fmtDate(e.start, locale, { hour: "2-digit", minute: "2-digit" })}{e.pricing ? ` · ${t("members")}: ${e.pricing.members === 0 ? t("free") : `€${e.pricing.members}`}` : ` · ${t("free")}`}</p></div>
      </Link>
    </li>
  );
}
