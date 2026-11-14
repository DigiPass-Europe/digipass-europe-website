"use client";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type FilterDef = { name: string; label: string; options: { value: string; label: string }[] };

/** URL-driven filters: every change updates the query string so results are shareable and server-rendered. */
export function FilterBar({ filters, searchLabel, resetLabel, allLabel }: { filters: FilterDef[]; searchLabel: string; resetLabel: string; allLabel: string }) {
  const router = useRouter(); const pathname = usePathname(); const sp = useSearchParams();
  const [pending, start] = useTransition();
  function set(name: string, value: string) {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(name, value); else next.delete(name);
    start(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  }
  const field = "focus-ring h-11 w-full rounded-md border border-line bg-white px-3 text-sm";
  return (
    <form className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-${Math.min(filters.length + 2, 6)} ${pending ? "opacity-70" : ""}`} onSubmit={(e) => e.preventDefault()} role="search">
      <label className="text-xs font-medium uppercase tracking-wider text-ink-soft">{searchLabel}<input type="search" defaultValue={sp.get("q") ?? ""} onChange={(e) => set("q", e.target.value)} className={`${field} mt-1 normal-case tracking-normal`} /></label>
      {filters.map((f) => (
        <label key={f.name} className="text-xs font-medium uppercase tracking-wider text-ink-soft">{f.label}
          <select value={sp.get(f.name) ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`${field} mt-1 normal-case tracking-normal`}>
            <option value="">{allLabel}</option>{f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select></label>
      ))}
      <div className="flex items-end"><button type="button" onClick={() => start(() => router.replace(pathname, { scroll: false }))} className="focus-ring h-11 rounded-md border border-line px-4 text-sm hover:bg-paper">{resetLabel}</button></div>
    </form>
  );
}
