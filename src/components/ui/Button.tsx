import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Variant = "primary" | "green" | "outline" | "outline-light" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-[#002a80]",
  green: "bg-green text-white hover:bg-green-deep",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-paper",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-white/5",
  ghost: "text-blue hover:underline px-0",
};
const base = "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition";

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
