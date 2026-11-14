import { useTranslations } from "next-intl";
import type { FeeTier } from "@/content/types";
import { tx, fmtEur } from "@/lib/locale";

export function FeeTable({ tiers, locale, caption }: { tiers: FeeTier[]; locale: string; caption: string }) {
  const t = useTranslations("membership"); const c = useTranslations("common");
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[40rem] text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-paper text-left text-xs uppercase tracking-wider text-ink-soft">
          <tr><th className="px-4 py-3 font-semibold">{t("colTier")}</th><th className="px-4 py-3 font-semibold">{t("colFee")}</th><th className="px-4 py-3 font-semibold">{t("colCategory")}</th><th className="px-4 py-3 font-semibold">{t("colVotes")}</th></tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tiers.map((tier) => (
            <tr key={tier.id} className={tier.kind === "supporter" ? "bg-paper/50" : ""}>
              <td className="px-4 py-4 align-top font-medium">{tx(tier.name, locale)}{tier.note && <p className="mt-1 text-xs font-normal text-ink-soft">{tx(tier.note, locale)}</p>}</td>
              <td className="px-4 py-4 align-top"><span className="text-lg font-semibold tabular-nums">{fmtEur(tier.fee, locale)}</span><span className="mt-1 block text-[0.65rem] uppercase tracking-wider text-[#5a4a00]">{c("proposed")}</span></td>
              <td className="px-4 py-4 align-top text-ink-soft">{tx(tier.statutoryCategory, locale)}</td>
              <td className="px-4 py-4 align-top text-ink-soft">{tx(tier.votes, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
