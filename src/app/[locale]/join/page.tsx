import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui/Section";
import { ApplicationWizard } from "@/components/join/ApplicationWizard";
import { feeTiers } from "@/content";

export const metadata: Metadata = { title: "Become a member" };

export default async function JoinPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ tier?: string }> }) {
  const { locale } = await params; setRequestLocale(locale);
  const { tier } = await searchParams; const t = await getTranslations("join");
  const initialTier = feeTiers.some((f) => f.id === tier) ? tier : undefined;
  return (
    <>
      <PageHero title={t("title")} lead={t("lead")} />
      <Section><ApplicationWizard initialTier={initialTier} /></Section>
    </>
  );
}
