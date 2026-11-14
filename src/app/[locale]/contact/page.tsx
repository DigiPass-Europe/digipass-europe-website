import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("contact");
  const rows = [[t("general"), site.email], [t("membership"), site.membershipEmail], [t("press"), site.pressEmail]];
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <dl className="space-y-5 text-sm">
              {rows.map(([k, v]) => <div key={k} className="rule-top pt-4"><dt className="text-xs uppercase tracking-wider text-ink-soft">{k}</dt><dd className="mt-1"><a href={`mailto:${v}`} className="text-blue hover:underline">{v}</a></dd></div>)}
              <div className="rule-top pt-4"><dt className="text-xs uppercase tracking-wider text-ink-soft">{t("seat")}</dt><dd className="mt-1 leading-relaxed">DigiPass:Europe<br />{site.address}<br />{site.seat}</dd></div>
            </dl>
            <div className="mt-10 rounded-lg bg-paper p-5"><h2 className="font-semibold">{t("proposeTitle")}</h2><p className="mt-2 text-sm leading-relaxed text-ink-soft">{t("proposeText")}</p></div>
          </div>
          <div className="lg:col-span-8"><h2 className="text-xl font-semibold">{t("formTitle")}</h2><div className="mt-6"><ContactForm /></div></div>
        </div>
      </Section>
    </>
  );
}
