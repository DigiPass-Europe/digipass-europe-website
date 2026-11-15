import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section, SectionHead } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FeeTable } from "@/components/membership/FeeTable";
import { BenefitsMatrix } from "@/components/membership/BenefitsMatrix";
import { feeTiers, admissionSteps, site } from "@/content";
import { tx } from "@/lib/locale";

export const metadata: Metadata = { title: "Membership" };

export default async function MembershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const t = await getTranslations("membership");
  const individual = feeTiers.filter((f) => f.kind !== "organisational");
  const organisational = feeTiers.filter((f) => f.kind === "organisational");
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")}><div className="mt-8"><ButtonLink href="/join" variant="green">{t("cta")}</ButtonLink></div></PageHero>
      <Section>
        <div className="rounded-lg border border-gold bg-gold/10 p-5 text-sm leading-relaxed text-[#4a3d00]">{t("proposedBanner")}</div>
        <div className="mt-14"><SectionHead title={t("categoriesTitle")} lead={t("categoriesLead")} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{(t.raw("categories") as [string, string][]).map(([h, p]) => <div key={h} className="rounded-lg border border-line p-5"><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{p}</p></div>)}</div></div>
      </Section>
      <Section tone="paper" id="fees">
        <SectionHead title={t("individualTitle")} />
        <div className="mt-8"><FeeTable tiers={individual} locale={locale} caption={t("individualTitle")} /></div>
        <p className="mt-3 text-xs text-ink-soft">{t("supporterNote")}</p>
        <div className="mt-14"><SectionHead title={t("organisationalTitle")} /></div>
        <div className="mt-8"><FeeTable tiers={organisational} locale={locale} caption={t("organisationalTitle")} /></div>
        <p className="mt-4 max-w-3xl text-sm text-ink-soft">{t("feesInclude")}</p>
      </Section>
      <Section id="benefits">
        <SectionHead title={t("benefitsTitle")} lead={t("benefitsLead")} />
        <div className="mt-8"><BenefitsMatrix locale={locale} /></div>
      </Section>
      <Section tone="paper" id="admission">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHead title={t("howTitle")} lead={t("howLead")} /><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/join" variant="green">{t("cta")}</ButtonLink></div><p className="mt-6 text-sm text-ink-soft">{t("questions")} <a className="text-blue hover:underline" href={`mailto:${site.membershipEmail}`}>{site.membershipEmail}</a></p></div>
          <ol className="space-y-4 lg:col-span-7">{admissionSteps.map((s, i) => <li key={i} className="flex gap-4 rounded-lg border border-line bg-white p-5"><span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">{i + 1}</span><p className="text-sm leading-relaxed">{tx(s, locale)}</p></li>)}</ol>
        </div>
      </Section>
    </>
  );
}
