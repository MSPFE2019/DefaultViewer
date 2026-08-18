import { describe, expect, it } from "vitest";
import { isDefaultEnvironment, isVisibleToUser, matchesOwner, matchesUserDomain } from "../utils/filtering";
import type { OwnerRef, UserProfile } from "../types/models";

const user: UserProfile = {
  fullName: "Alex Johnson",
  department: "Engineering",
  companyName: "Contoso Corporation",
  mail: "alex.johnson@contoso.com",
  userDomain: "contoso.com",
};

describe("isDefaultEnvironment", () => {
  it("returns true when the environment display name contains 'Default'", () => {
    expect(isDefaultEnvironment("Default-Contoso Corporation")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isDefaultEnvironment("my-default-env")).toBe(true);
  });

  it("returns false for other environments", () => {
    expect(isDefaultEnvironment("Production")).toBe(false);
  });

  it("returns false for blank/undefined values", () => {
    expect(isDefaultEnvironment(undefined)).toBe(false);
    expect(isDefaultEnvironment("")).toBe(false);
  });
});

describe("matchesOwner", () => {
  it("matches on department", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "Engineering", company: "Fabrikam" };
    expect(matchesOwner(owner, user)).toBe(true);
  });

  it("matches on company", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "Sales", company: "Contoso Corporation" };
    expect(matchesOwner(owner, user)).toBe(true);
  });

  it("does not match when neither department nor company match", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "Sales", company: "Fabrikam" };
    expect(matchesOwner(owner, user)).toBe(false);
  });

  it("is case-insensitive", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "ENGINEERING", company: "Fabrikam" };
    expect(matchesOwner(owner, user)).toBe(true);
  });

  it("returns false when owner or user is missing", () => {
    expect(matchesOwner(undefined, user)).toBe(false);
    expect(matchesOwner({ displayName: "Jamie", department: "Engineering", company: "" }, undefined)).toBe(false);
  });
});

describe("matchesUserDomain", () => {
  it("matches when the owner's email contains the user's domain", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "", company: "", userEmail: "jamie@contoso.com" };
    expect(matchesUserDomain(owner, "contoso.com")).toBe(true);
  });

  it("does not match a different domain", () => {
    const owner: OwnerRef = { displayName: "Jamie", department: "", company: "", userEmail: "jamie@fabrikam.com" };
    expect(matchesUserDomain(owner, "contoso.com")).toBe(false);
  });
});

describe("isVisibleToUser", () => {
  const owner: OwnerRef = { displayName: "Jamie", department: "Engineering", company: "Fabrikam" };

  it("requires both the Default environment and an owner match", () => {
    expect(isVisibleToUser("Default-Contoso Corporation", owner, user)).toBe(true);
    expect(isVisibleToUser("Production", owner, user)).toBe(false);
    expect(isVisibleToUser("Default-Contoso Corporation", { displayName: "x", department: "Sales", company: "Fabrikam" }, user)).toBe(false);
  });
});
