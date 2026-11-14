import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const cols = [
    { title: t("association"), links: [["/about", n("about")], ["/about#governance", t("governance")], ["/about#statutes", t("statutes")], ["/contact", n("contact")]] },
    { title: t("participate"), links: [["/membership", n("membership")], ["/join", n("join")], ["/working-groups", n("workingGroups")], ["/events", n("events")]] },
    { title: t("resources"), links: [["/knowledge-hub", n("knowledge")], ["/activities", n("activities")], ["/news", n("news")], ["/members", n("members")]] },
  ];
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo dark height={28} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/80">{t("tagline")}</p>
          <p className="mt-6 text-xs leading-relaxed text-paper/60">{t("legal")}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-paper/60">{c.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map(([href, label]) => (
                  <li key={href}><Link href={href} className="focus-ring rounded text-paper/90 hover:text-white">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-paper/60">{t("newsletter")}</h2>
          <p className="mt-4 text-sm text-paper/80">{t("newsletterText")}</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DigiPass:Europe · Wiener Neustadt, Austria · {t("rights")}</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">{t("privacy")}</Link>
            <Link href="/imprint" className="hover:text-white">{t("imprint")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
