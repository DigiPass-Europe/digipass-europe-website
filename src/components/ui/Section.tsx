import type { ReactNode } from "react";

export function Section({ children, className = "", tone = "white", id }: { children: ReactNode; className?: string; tone?: "white" | "paper" | "ink"; id?: string }) {
  const bg = tone === "paper" ? "bg-paper" : tone === "ink" ? "bg-ink text-paper" : "bg-white";
  return <section id={id} className={`${bg} py-16 sm:py-20 lg:py-24 ${className}`}><div className="container-x">{children}</div></section>;
}
export function SectionHead({ eyebrow, title, lead, align = "left" }: { eyebrow?: string; title: string; lead?: string; align?: "left" | "center" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p>}
    </div>
  );
}
export function PageHero({ eyebrow, title, lead, children, tone = "paper" }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode; tone?: "paper" | "ink" }) {
  return (
    <div className={tone === "ink" ? "bg-ink text-paper" : "bg-paper"}>
      <div className="container-x py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <p className={`eyebrow ${tone === "ink" ? "text-[#7fd4a6]" : ""}`}>{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          {lead && <p className={`mt-5 text-lg leading-relaxed sm:text-xl ${tone === "ink" ? "text-paper/80" : "text-ink-soft"}`}>{lead}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
