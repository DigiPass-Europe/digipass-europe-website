"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "./DemoNotice";

const field = "focus-ring mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm";

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, setState] = useState<"idle" | "sending" | "demo" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const json = await res.json().catch(() => ({}));
    setState(!res.ok ? "error" : json.stored ? "sent" : "demo");
  }
  const subjects = t.raw("subjects") as string[];
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium">{t("name")}<input name="name" required className={field} /></label>
      <label className="text-sm font-medium">{t("email")}<input name="email" type="email" required className={field} /></label>
      <label className="text-sm font-medium">{t("organisation")}<input name="organisation" className={field} /></label>
      <label className="text-sm font-medium">{t("subject")}<select name="subject" className={field}>{subjects.map((s) => <option key={s}>{s}</option>)}</select></label>
      <label className="text-sm font-medium sm:col-span-2">{t("message")}<textarea name="message" required rows={6} className={field} /></label>
      <label className="flex items-start gap-2 text-sm text-ink-soft sm:col-span-2"><input type="checkbox" name="consent" required className="mt-1" />{t("consent")}</label>
      <div className="sm:col-span-2"><Button type="submit" disabled={state === "sending"}>{t("send")}</Button></div>
      <div className="sm:col-span-2"><DemoNotice shown={state === "demo"} />{state === "sent" && <p role="status" className="text-sm text-green">✓</p>}{state === "error" && <p role="alert" className="text-sm text-red-700">Error</p>}</div>
    </form>
  );
}
