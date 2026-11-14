import type { ReactNode } from "react";
export function Card({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  return <Tag className={`rounded-lg border border-line bg-white p-6 ${className}`}>{children}</Tag>;
}
