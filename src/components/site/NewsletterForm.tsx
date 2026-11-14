"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const c = useTranslations("common");
  const [state, setState] = useState<"idle" | "demo">("idle");
  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => { e.preventDefault(); setState("demo"); }}
    >
      <label htmlFor="nl-email" className="sr-only">{t("emailPlaceholder")}</label>
      <input id="nl-email" type="email" required placeholder={t("emailPlaceholder")}
        className="focus-ring h-11 flex-1 rounded-md border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-paper/50" />
      <button type="submit" className="focus-ring h-11 rounded-md bg-green px-4 text-sm font-semibold text-white hover:bg-green-deep">{t("subscribe")}</button>
      {state === "demo" && <p role="status" className="basis-full text-xs text-gold">{c("demoNotice")}</p>}
    </form>
  );
}
