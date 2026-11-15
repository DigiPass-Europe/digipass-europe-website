import { setRequestLocale } from "next-intl/server";
import { PageHero, Section } from "@/components/ui/Section";
import { site } from "@/content";
import { tx } from "@/lib/locale";
export default async function Imprint({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; setRequestLocale(locale); const fr = locale === "fr";
  return (<><PageHero title={fr ? "Mentions légales" : "Legal notice"} /><Section><dl className="max-w-2xl space-y-4 text-sm">
    <div><dt className="text-xs uppercase tracking-wider text-ink-soft">{fr ? "Éditeur" : "Publisher"}</dt><dd className="mt-1">DigiPass:Europe — {tx(site.legalForm, locale)}</dd></div>
    <div><dt className="text-xs uppercase tracking-wider text-ink-soft">{fr ? "Siège" : "Registered office"}</dt><dd className="mt-1">{site.address}, {site.seat}</dd></div>
    <div><dt className="text-xs uppercase tracking-wider text-ink-soft">{fr ? "Registre des associations (ZVR)" : "Register of associations (ZVR)"}</dt><dd className="mt-1">{site.register}</dd></div>
    <div><dt className="text-xs uppercase tracking-wider text-ink-soft">{fr ? "Représentation" : "Representation"}</dt><dd className="mt-1">{fr ? "Le·la Président·e — nom à publier après élection." : "The President — name to be published after election."}</dd></div>
    <div><dt className="text-xs uppercase tracking-wider text-ink-soft">Contact</dt><dd className="mt-1"><a className="text-blue" href={`mailto:${site.email}`}>{site.email}</a> · {site.url}</dd></div>
  </dl></Section></>);
}
