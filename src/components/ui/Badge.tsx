import { useTranslations } from "next-intl";

export function IllustrativeBadge({ className = "" }: { className?: string }) {
  const t = useTranslations("common");
  return (
    <span className={`inline-flex items-center rounded-sm border border-gold/70 bg-gold/15 px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a4a00] ${className}`}>
      {t("illustrative")}
    </span>
  );
}
export function MembersOnlyBadge() {
  const t = useTranslations("common");
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-ink px-1.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-paper">
      <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true" fill="currentColor"><path d="M2 4V3a2.5 2.5 0 015 0v1h1v7H1V4h1zm1 0h3V3a1.5 1.5 0 00-3 0v1z"/></svg>
      {t("membersOnly")}
    </span>
  );
}
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-sm bg-paper px-2 py-0.5 text-xs text-ink-soft">{children}</span>;
}
