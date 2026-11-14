"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("locale");
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`} role="group" aria-label={t("switch")}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-1 text-line">|</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale ? "true" : undefined}
            className={`focus-ring rounded px-1.5 py-1 uppercase tracking-wide ${l === locale ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
