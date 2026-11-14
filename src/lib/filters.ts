import type { AssociationEvent, MemberOrg } from "@/content/types";

export function splitEvents<T extends Pick<AssociationEvent, "start" | "end">>(items: T[], now: Date) {
  const n = now.getTime();
  const upcoming = items.filter((e) => new Date(e.end ?? e.start).getTime() >= n).sort((a, b) => a.start.localeCompare(b.start));
  const past = items.filter((e) => new Date(e.end ?? e.start).getTime() < n).sort((a, b) => b.start.localeCompare(a.start));
  return { upcoming, past };
}

export type MemberFilter = { country?: string; type?: string; wg?: string; expertise?: string; sector?: string; q?: string };

export function filterMembers(items: MemberOrg[], f: MemberFilter) {
  const q = f.q?.trim().toLowerCase();
  return items.filter((m) =>
    m.published &&
    (!f.country || m.country === f.country) &&
    (!f.type || m.type === f.type) &&
    (!f.wg || m.workingGroups.includes(f.wg)) &&
    (!f.sector || m.sectors.includes(f.sector)) &&
    (!f.expertise || m.expertise.some((e) => e.toLowerCase().includes(f.expertise!.toLowerCase()))) &&
    (!q || m.name.toLowerCase().includes(q) || m.expertise.join(" ").toLowerCase().includes(q)),
  );
}
