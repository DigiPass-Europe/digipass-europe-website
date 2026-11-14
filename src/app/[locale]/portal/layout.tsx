import { getTranslations, setRequestLocale } from "next-intl/server";
import { requireAccess } from "@/lib/auth/guard";
import { logout } from "@/lib/auth/actions";
import { PortalNav } from "@/components/portal/PortalNav";

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const session = await requireAccess("portal");
  const t = await getTranslations("portal"); const l = await getTranslations("login");
  return (
    <div className="bg-paper/40">
      {session.mode === "demo" && <div className="border-b border-gold bg-gold/15 text-center text-xs text-[#4a3d00]"><div className="container-x py-2">{t("demoBanner", { role: l(`roles.${session.role as "member"}`) })}</div></div>}
      <div className="container-x grid gap-8 py-10 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="rounded-lg border border-line bg-white p-4">
            <p className="text-xs uppercase tracking-wider text-ink-soft">{t("title")}</p><p className="mt-1 font-semibold">{session.name}</p><p className="text-xs text-ink-soft">{session.email}</p>
            <div className="mt-4 border-t border-line pt-4"><PortalNav role={session.role} /></div>
            <form action={logout} className="mt-4 border-t border-line pt-4"><button className="focus-ring text-sm text-ink-soft hover:text-ink">{t("logout")}</button></form>
          </div>
        </aside>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
