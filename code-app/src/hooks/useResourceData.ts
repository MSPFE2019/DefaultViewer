import { useCallback, useEffect, useState } from "react";
import { getDataverseProvider } from "../services";
import type { BotRecord, FlowRecord, PortalRecord, PowerAppRecord } from "../types/models";

export interface ResourceData {
  flows: FlowRecord[];
  powerApps: PowerAppRecord[];
  bots: BotRecord[];
  portals: PortalRecord[];
}

export interface UseResourceDataResult extends ResourceData {
  loading: boolean;
  error: string | null;
  /** Reloads every data source, equivalent to the canvas app's "Reload" button. */
  reload: () => Promise<void>;
}

const EMPTY: ResourceData = { flows: [], powerApps: [], bots: [], portals: [] };

/**
 * Loads all four CoE Starter Kit inventories used by the app (Flows,
 * PowerApps Apps, PVA Bots, Power Pages Sites). Equivalent to the
 * `Concurrent(Refresh(Flows), Refresh('PowerApps Apps'), ...)` call
 * wired to `btn_Reload` in the original canvas app.
 */
export function useResourceData(): UseResourceDataResult {
  const [data, setData] = useState<ResourceData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = getDataverseProvider();
      const [flows, powerApps, bots, portals] = await Promise.all([
        provider.getFlows(),
        provider.getPowerApps(),
        provider.getBots(),
        provider.getPortals(),
      ]);
      setData({ flows, powerApps, bots, portals });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Power Platform inventory data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const provider = getDataverseProvider();
        const [flows, powerApps, bots, portals] = await Promise.all([
          provider.getFlows(),
          provider.getPowerApps(),
          provider.getBots(),
          provider.getPortals(),
        ]);
        if (!cancelled) setData({ flows, powerApps, bots, portals });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load Power Platform inventory data.");
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

  return { ...data, loading, error, reload };
}
