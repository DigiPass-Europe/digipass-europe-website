import { describe, it, expect } from "vitest";
import en from "../../../messages/en.json";
import fr from "../../../messages/fr.json";

function keys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object"
      ? keys(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`],
  );
}

describe("message catalogues", () => {
  it("en and fr have identical key sets", () => {
    const a = keys(en).sort();
    const b = keys(fr).sort();
    expect(b).toEqual(a);
  });
});
