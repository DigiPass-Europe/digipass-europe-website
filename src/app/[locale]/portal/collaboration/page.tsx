import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
export default async function Collab() {
  const s = await requireAccess("portal/collaboration"); const t = await getTranslations("portal.collab");
  return (<div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1><p className="text-sm text-ink-soft">{t("text")}</p>
    <ul className="grid gap-4 md:grid-cols-3">{(t.raw("items") as [string, string, string][]).map(([h, p, wg]) => <li key={h} className="rounded-lg border border-line bg-white p-5"><span className="text-xs font-semibold text-green">{wg}</span><h2 className="mt-1 font-semibold">{h}</h2><p className="mt-2 text-sm text-ink-soft">{p}</p></li>)}</ul>
    <Panel title={t("post")}><DemoActionForm mode={s.mode} submitLabel={t("post")}><input placeholder="Title" className="focus-ring block w-full rounded-md border border-line px-3 py-2.5 text-sm" /><textarea rows={3} className="focus-ring mt-2 block w-full rounded-md border border-line px-3 py-2.5 text-sm" /></DemoActionForm></Panel></div>);
}
