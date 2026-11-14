import { describe, it, expect } from "vitest";
import { workingGroups, feeTiers, events, news, memberOrgs, resources, extraServices } from "@/content";

describe("content model", () => {
  it("has ten working groups with mission, objectives, deliverables and open leadership", () => {
    expect(workingGroups).toHaveLength(10);
    for (const wg of workingGroups) {
      expect(wg.id).toMatch(/^wg(10|[1-9])$/);
      expect(wg.mission.en.length).toBeGreaterThan(40);
      expect(wg.objectives.length).toBeGreaterThanOrEqual(3);
      expect(wg.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(wg.leadership.map((l) => l.role)).toEqual(["chair", "vice-chair"]);
      expect(wg.leadership.every((l) => l.status === "open")).toBe(true);
    }
  });
  it("marks every fee tier as proposed and caps organisational votes at 4", () => {
    expect(feeTiers.every((t) => t.status === "proposed")).toBe(true);
    const strategic = feeTiers.find((t) => t.id === "strategic")!;
    expect(strategic.votes.en).toMatch(/4 votes maximum/);
  });
  it("marks all demo events, news, orgs and resources as illustrative", () => {
    expect([...events, ...news, ...memberOrgs, ...resources].every((x) => x.illustrative === true)).toBe(true);
  });
  it("proposes at least five extra services with all five explanations", () => {
    expect(extraServices.length).toBeGreaterThanOrEqual(5);
    for (const s of extraServices) for (const k of ["what", "who", "value", "how"] as const) expect(s[k].en.length).toBeGreaterThan(20);
  });
});
