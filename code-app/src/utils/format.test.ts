import { describe, expect, it } from "vitest";
import { formatDate, formatYesNo } from "../utils/format";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2024-06-14T00:00:00Z")).toMatch(/2024/);
  });

  it("returns an empty string for blank input", () => {
    expect(formatDate(undefined)).toBe("");
    expect(formatDate(null)).toBe("");
    expect(formatDate("")).toBe("");
  });

  it("returns the original string for invalid dates", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("formatYesNo", () => {
  it("formats booleans as Yes/No", () => {
    expect(formatYesNo(true)).toBe("Yes");
    expect(formatYesNo(false)).toBe("No");
    expect(formatYesNo(undefined)).toBe("No");
  });
});
