import type { ReactNode } from "react";
export const Panel = ({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) => (
  <section className="rounded-lg border border-line bg-white p-5"><div className="flex items-start justify-between gap-3"><h2 className="font-semibold">{title}</h2>{action}</div><div className="mt-3 text-sm">{children}</div></section>
);
export const Stat = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <div className="rounded-lg border border-line bg-white p-5"><p className="text-xs uppercase tracking-wider text-ink-soft">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p>{sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}</div>
);
