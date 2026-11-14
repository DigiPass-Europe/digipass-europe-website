import { useTranslations } from "next-intl";
import { benefits } from "@/content";
import { tx } from "@/lib/locale";

const Check = ({ on }: { on: boolean }) => on
  ? <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="9" fill="#1E8A5A" /><path d="M5 9.5l2.5 2.5L13 6.5" stroke="#fff" strokeWidth="2" fill="none" /></svg>
  : <span aria-hidden="true" className="block h-[2px] w-3 bg-line" />;

export function BenefitsMatrix({ locale }: { locale: string }) {
  const t = useTranslations("membership");
  const cols: [string, keyof (typeof benefits)[number]][] = [[t("colAll"), "all"], [t("colFull"), "fullIndividual"], [t("colOrg"), "organisational"], [t("colStrategic"), "strategic"]];
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[44rem] text-sm">
        <thead className="bg-paper text-xs uppercase tracking-wider text-ink-soft">
          <tr><th className="px-4 py-3 text-left font-semibold">{t("benefitsTitle")}</th>{cols.map(([l]) => <th key={l} className="px-3 py-3 text-center font-semibold">{l}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">
          {benefits.map((b, i) => (
            <tr key={i} className={b.governance ? "bg-blue/[0.04]" : ""}>
              <td className="px-4 py-3">{tx(b.benefit, locale)}{b.governance && <span className="ml-2 inline-block rounded-sm bg-blue px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-white" title={t("governanceMark")}>§</span>}</td>
              {cols.map(([l, k]) => <td key={l} className="px-3 py-3"><span className="sr-only">{b[k] ? "yes" : "no"}</span><div className="flex justify-center"><Check on={Boolean(b[k])} /></div></td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line bg-paper px-4 py-2 text-xs text-ink-soft"><span className="mr-1 inline-block rounded-sm bg-blue px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">§</span>{t("governanceMark")}</p>
    </div>
  );
}
