import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { hasSupabaseAuth, DEMO_PERSONAS } from "@/lib/auth/session";
import { demoLogin } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Member login" };

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("login");
  const live = hasSupabaseAuth();
  const field = "focus-ring mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm";
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-lg border border-line p-6">
            {live ? (
              <form className="grid gap-4" action="/api/auth/sign-in" method="post">
                <label className="text-sm font-medium">{t("email")}<input name="email" type="email" required className={field} /></label>
                <label className="text-sm font-medium">{t("password")}<input name="password" type="password" className={field} /></label>
                <button className="focus-ring h-11 rounded-md bg-blue text-sm font-semibold text-white">{t("signIn")}</button>
                <button formAction="/api/auth/magic-link" className="text-sm text-blue hover:underline">{t("magic")}</button>
                <p className="text-xs text-ink-soft">{t("liveNote")}</p>
              </form>
            ) : (
              <>
                <p className="eyebrow">{t("demoTitle")}</p><p className="mt-2 text-sm leading-relaxed text-ink-soft">{t("demoText")}</p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft">{t("demoAs")}</p>
                <div className="mt-2 grid gap-2">
                  {(Object.keys(DEMO_PERSONAS) as (keyof typeof DEMO_PERSONAS)[]).map((r) => (
                    <form key={r} action={demoLogin}><input type="hidden" name="role" value={r} /><button className="focus-ring flex h-11 w-full items-center justify-between rounded-md border border-line px-4 text-sm hover:border-blue hover:text-blue">{t(`roles.${r}`)}<span aria-hidden="true">→</span></button></form>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="rounded-lg bg-paper p-6"><p className="font-semibold">{t("notMember")}</p><ButtonLink href="/join" variant="green" className="mt-4">{t("apply")}</ButtonLink></div>
        </div>
      </Section>
    </>
  );
}
