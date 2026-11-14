import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { canAccess, type Role } from "@/lib/auth/roles";

const ITEMS: { key: string; href: string; area: string }[] = [
  { key: "dashboard", href: "/portal", area: "portal" }, { key: "profile", href: "/portal/profile", area: "portal/profile" },
  { key: "membership", href: "/portal/membership", area: "portal/membership" }, { key: "workingGroups", href: "/portal/working-groups", area: "portal/working-groups" },
  { key: "events", href: "/portal/events", area: "portal/events" }, { key: "documents", href: "/portal/documents", area: "portal/documents" },
  { key: "collaboration", href: "/portal/collaboration", area: "portal/collaboration" }, { key: "organisation", href: "/portal/organisation", area: "portal/organisation" },
  { key: "admin", href: "/portal/admin", area: "portal/admin" },
];
export function PortalNav({ role }: { role: Role }) {
  const t = useTranslations("portal.nav");
  return (
    <nav aria-label="Portal" className="flex gap-1 overflow-x-auto lg:flex-col">
      {ITEMS.filter((i) => canAccess(role, i.area)).map((i) => <Link key={i.key} href={i.href} className="focus-ring flex-none rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-paper hover:text-ink">{t(i.key as "dashboard")}</Link>)}
    </nav>
  );
}
