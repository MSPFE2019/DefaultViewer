import { getContext } from "@microsoft/power-apps/app";
import { useEffect, type ReactNode } from "react";

interface PowerProviderProps {
  children: ReactNode;
}

/**
 * Initializes the Power Apps code app SDK (auth/context/host bridge) as
 * soon as the app mounts by requesting the app/host/user context. Safe to
 * run outside of Power Platform (e.g. local dev, tests) — initialization
 * failures are logged but do not block rendering, since the app can still
 * run fully in mock data mode (see README.md).
 */
export function PowerProvider({ children }: PowerProviderProps) {
  useEffect(() => {
    getContext()
      .then(() => console.info("Power Platform SDK initialized successfully"))
      .catch((error) => {
        console.warn("Power Platform SDK initialization skipped/failed (expected outside of Power Platform):", error);
      });
  }, []);

  return <>{children}</>;
}
