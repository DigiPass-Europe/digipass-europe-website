import { getTranslations } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { Panel } from "@/components/portal/ui";
import { DemoActionForm } from "@/components/portal/DemoActionForm";
const field = "focus-ring mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm";
export default async function ProfilePage() {
  const s = await requireAccess("portal/profile"); const t = await getTranslations("portal.profile");
  return (
    <div className="space-y-6"><h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Panel title={t("title")}><DemoActionForm mode={s.mode} submitLabel={t("save")}><div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Name<input defaultValue={s.name} className={field} /></label><label className="text-sm font-medium">Email<input defaultValue={s.email} className={field} readOnly /></label>
        <label className="text-sm font-medium sm:col-span-2">{t("expertise")}<input defaultValue="traceability, data models" className={field} /></label>
        <fieldset className="sm:col-span-2"><legend className="text-sm font-medium">{t("visibility")}</legend><label className="mt-2 flex items-center gap-2 text-sm"><input type="radio" name="vis" defaultChecked />{t("visible")}</label><label className="mt-1 flex items-center gap-2 text-sm"><input type="radio" name="vis" />{t("hidden")}</label></fieldset></div></DemoActionForm></Panel>
      <Panel title={t("deleteTitle")}><p className="text-ink-soft">{t("deleteText")}</p><DemoActionForm mode={s.mode} submitLabel={t("deleteBtn")} variant="outline" /></Panel>
    </div>
  );
}
