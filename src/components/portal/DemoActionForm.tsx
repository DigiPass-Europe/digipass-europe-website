"use client";
import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

/** Wraps portal actions: in live mode posts to `action`; in demo mode shows the honest notice instead. */
export function DemoActionForm({ children, submitLabel, mode, variant = "primary", action }: { children?: ReactNode; submitLabel: string; mode: "demo" | "live"; variant?: "primary" | "outline" | "green"; action?: string }) {
  const t = useTranslations("portal.admin"); const [shown, setShown] = useState(false);
  return (
    <form className="mt-2" action={mode === "live" ? action : undefined} method={mode === "live" ? "post" : undefined} onSubmit={(e) => { if (mode === "demo") { e.preventDefault(); setShown(true); } }}>
      {children}<div className="mt-4 flex items-center gap-4"><Button type="submit" variant={variant}>{submitLabel}</Button>{shown && <p role="status" className="text-xs text-[#5a4a00]">{t("demoAction")}</p>}</div>
    </form>
  );
}
