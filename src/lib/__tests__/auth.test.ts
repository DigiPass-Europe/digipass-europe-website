import { describe, it, expect } from "vitest";
import { canAccess, ROLES } from "../auth/roles";

describe("role-based access", () => {
  it("admin-only areas reject chairs and members", () => {
    expect(canAccess("wg-chair", "portal/admin")).toBe(false);
    expect(canAccess("member", "portal/admin")).toBe(false);
    expect(canAccess("admin", "portal/admin")).toBe(true);
  });
  it("working-group tools open to participants, chairs and admins but not visitors", () => {
    expect(canAccess("member", "portal/working-groups")).toBe(true);
    expect(canAccess("visitor", "portal/working-groups")).toBe(false);
    expect(canAccess("wg-chair", "portal/working-groups/manage")).toBe(true);
    expect(canAccess("member", "portal/working-groups/manage")).toBe(false);
  });
  it("organisation dashboard needs an org admin or admin", () => {
    expect(canAccess("org-admin", "portal/organisation")).toBe(true);
    expect(canAccess("member", "portal/organisation")).toBe(false);
  });
  it("defines the five roles from the brief", () => {
    expect(ROLES).toEqual(["visitor", "member", "wg-chair", "org-admin", "admin"]);
  });
});
