import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { NAV } from "./nav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

export function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x relative flex h-18 items-center justify-between gap-6">
        <Link href="/" className="focus-ring flex items-center rounded" aria-label="DigiPass:Europe — home">
          <Logo height={26} />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} className="focus-ring rounded px-2.5 py-2 text-[0.9rem] text-ink-soft transition hover:text-ink">
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <LocaleSwitcher />
          <Link href="/login" className="focus-ring rounded px-2 py-2 text-sm text-ink-soft hover:text-ink">
            {t("login")}
          </Link>
          <Link href="/join" className="focus-ring inline-flex h-10 items-center rounded-md bg-blue px-4 text-sm font-semibold text-white transition hover:bg-[#002a80]">
            {t("join")}
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
