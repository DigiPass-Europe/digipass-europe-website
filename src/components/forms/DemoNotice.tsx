import { useTranslations } from "next-intl";
export function DemoNotice({ shown }: { shown: boolean }) {
  const c = useTranslations("common");
  if (!shown) return null;
  return <p role="status" className="rounded-md border border-gold bg-gold/10 px-4 py-3 text-sm text-[#4a3d00]">{c("demoNotice")}</p>;
}
