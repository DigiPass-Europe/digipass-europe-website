import type { Localized } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export const tx = (v: Localized | undefined, locale: string): string =>
  v ? (v[locale as Locale] ?? v.en) : "";

export const fmtDate = (iso: string, locale: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", opts).format(new Date(iso));

export const fmtEur = (n: number, locale: string) =>
  n === 0 ? (locale === "fr" ? "Gratuit" : "Free")
  : new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
