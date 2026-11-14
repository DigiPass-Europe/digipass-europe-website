export const ROLES = ["visitor", "member", "wg-chair", "org-admin", "admin"] as const;
export type Role = (typeof ROLES)[number];

/** Area → roles allowed. Longest matching prefix wins. */
const ACL: [string, Role[]][] = [
  ["portal/admin", ["admin"]],
  ["portal/working-groups/manage", ["wg-chair", "admin"]],
  ["portal/organisation", ["org-admin", "admin"]],
  ["portal", ["member", "wg-chair", "org-admin", "admin"]],
];

export function canAccess(role: Role, area: string): boolean {
  const match = ACL.filter(([p]) => area === p || area.startsWith(p + "/")).sort((a, b) => b[0].length - a[0].length)[0];
  return match ? match[1].includes(role) : true;
}
