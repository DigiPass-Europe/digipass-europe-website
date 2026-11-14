"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/forms/DemoNotice";
const field = "focus-ring mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm";

export function RegisterForm({ slug }: { slug: string }) {
  const t = useTranslations("events");
  const [state, setState] = useState<"idle" | "sending" | "demo" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, slug }) });
    const json = await res.json().catch(() => ({}));
    setState(!res.ok ? "error" : json.stored ? "sent" : "demo");
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="text-sm font-medium">{t("name")}<input name="name" required className={field} /></label>
      <label className="text-sm font-medium">{t("email")}<input name="email" type="email" required className={field} /></label>
      <label className="text-sm font-medium">{t("organisation")}<input name="organisation" className={field} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="member" />{t("memberQ")}</label>
      <label className="flex items-start gap-2 text-sm text-ink-soft"><input type="checkbox" name="consent" required className="mt-1" />{t("consent")}</label>
      <Button type="submit" variant="green" disabled={state === "sending"}>{t("register")}</Button>
      <DemoNotice shown={state === "demo"} />{state === "sent" && <p role="status" className="text-sm text-green">✓</p>}{state === "error" && <p role="alert" className="text-sm text-red-700">Error</p>}
    </form>
  );
}
