import { useEffect, useState } from "react";
import { getUserProvider } from "../services";
import type { UserProfile } from "../types/models";

export interface UseCurrentUserResult {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

/**
 * Loads the signed-in user's profile (department, company, email domain),
 * equivalent to the App-level formulas in the original canvas app:
 *   username = User().FullName
 *   userdept = Office365Users.MyProfileV2().department
 *   usercompany = Office365Users.MyProfileV2().companyName
 *   userdomain = Last(Split(Office365Users.MyProfileV2().mail, "@"))
 */
export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const profile = await getUserProvider().getCurrentUser();
        if (!cancelled) setUser(profile);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load the current user's profile.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading, error };
}
