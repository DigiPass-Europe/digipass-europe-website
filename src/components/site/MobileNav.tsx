"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV } from "./nav";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-line"
      >
        <span className="sr-only">{open ? t("close") : t("menu")}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M4 4l14 14M18 4L4 18" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
        </svg>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full z-40 border-t border-line bg-white shadow-lg">
          <nav className="container-x flex flex-col py-4">
            {NAV.map((item) => (
              <Link key={item.key} href={item.href} onClick={() => setOpen(false)} className="focus-ring rounded px-2 py-3 text-base text-ink hover:bg-paper">
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Link href="/join" onClick={() => setOpen(false)} className="focus-ring inline-flex h-11 items-center rounded-md bg-blue px-5 text-sm font-semibold text-white">
                  {t("join")}
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="focus-ring inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-medium">
                  {t("login")}
                </Link>
              </div>
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
