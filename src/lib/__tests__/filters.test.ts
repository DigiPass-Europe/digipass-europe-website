import { describe, it, expect } from "vitest";
import { splitEvents, filterMembers } from "../filters";
import type { MemberOrg } from "@/content/types";

describe("splitEvents", () => {
  it("splits by date relative to now and sorts upcoming ascending, past descending", () => {
    const now = new Date("2026-11-14T12:00:00Z");
    const items = [
      { slug: "a", start: "2026-11-20T10:00:00Z" },
      { slug: "b", start: "2026-11-01T10:00:00Z" },
      { slug: "c", start: "2026-12-05T10:00:00Z" },
      { slug: "d", start: "2026-11-13T10:00:00Z", end: "2026-11-15T10:00:00Z" }, // running now → upcoming
      { slug: "e", start: "2026-10-01T10:00:00Z" },
    ];
    const { upcoming, past } = splitEvents(items, now);
    expect(upcoming.map((e) => e.slug)).toEqual(["d", "a", "c"]);
    expect(past.map((e) => e.slug)).toEqual(["b", "e"]);
  });
});

const org = (o: Partial<MemberOrg>): MemberOrg => ({
  id: "x", name: "X", country: "AT", type: "sme", website: "#", description: { en: "", fr: "" }, expertise: [], sectors: [], workingGroups: [], tier: "sme-small", published: true, illustrative: true, ...o,
});

describe("filterMembers", () => {
  const items = [
    org({ id: "1", country: "AT", type: "sme", workingGroups: ["wg1"] }),
    org({ id: "2", country: "AT", type: "university", workingGroups: ["wg1"] }),
    org({ id: "3", country: "DE", type: "sme", workingGroups: ["wg1", "wg2"] }),
    org({ id: "4", country: "AT", type: "sme", workingGroups: ["wg2"], published: false }),
  ];
  it("AND-combines country, type and working group", () => {
    expect(filterMembers(items, { country: "AT", type: "sme", wg: "wg1" }).map((m) => m.id)).toEqual(["1"]);
    expect(filterMembers(items, { wg: "wg1" }).map((m) => m.id)).toEqual(["1", "2", "3"]);
  });
  it("never returns unpublished members", () => {
    expect(filterMembers(items, {}).map((m) => m.id)).not.toContain("4");
  });
});
