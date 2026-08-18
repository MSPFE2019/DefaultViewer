import type { OwnerRef, UserProfile } from "../types/models";

/**
 * Mirrors the canvas app's environment scoping rule:
 *   ("Default" in 'Environment Display Name')
 *
 * A resource is only in-scope if its environment display name contains
 * the word "Default" (case-insensitive containment, matching Power Fx's
 * `in` operator which is case-insensitive by default).
 */
export function isDefaultEnvironment(environmentDisplayName: string | undefined | null): boolean {
  if (!environmentDisplayName) return false;
  return environmentDisplayName.toLowerCase().includes("default");
}

/**
 * Mirrors the canvas app's ownership rule:
 *   (Owner.Department = userdept || Owner.Company = usercompany)
 *
 * A resource is visible if the owner's department OR company matches the
 * signed-in user's department/company. Comparisons are case-insensitive
 * and blank/undefined values never match (Power Fx would also require the
 * text to actually be equal, not just both blank).
 */
export function matchesOwner(owner: OwnerRef | undefined | null, user: UserProfile | undefined | null): boolean {
  if (!owner || !user) return false;
  const departmentMatches =
    !!owner.department && !!user.department && owner.department.toLowerCase() === user.department.toLowerCase();
  const companyMatches =
    !!owner.company && !!user.companyName && owner.company.toLowerCase() === user.companyName.toLowerCase();
  return departmentMatches || companyMatches;
}

/**
 * Optional alternative scoping rule documented in the original app's
 * About screen and README:
 *   userdomain in DerivedOwner.UserEmail
 *
 * Useful when Company/Department fields are not populated or reliable.
 */
export function matchesUserDomain(owner: OwnerRef | undefined | null, userDomain: string | undefined | null): boolean {
  if (!owner?.userEmail || !userDomain) return false;
  return owner.userEmail.toLowerCase().includes(userDomain.toLowerCase());
}

/** Combines the environment + ownership rules used throughout the app. */
export function isVisibleToUser(
  environmentDisplayName: string | undefined | null,
  owner: OwnerRef | undefined | null,
  user: UserProfile | undefined | null,
): boolean {
  return isDefaultEnvironment(environmentDisplayName) && matchesOwner(owner, user);
}
