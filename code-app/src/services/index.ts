import { mockDataverseProvider, mockUserProvider } from "./mockProviders";
import { DataProviderConfigurationError, type IDataverseProvider, type IUserProvider } from "./types";

/**
 * Data mode controls which provider implementation is used:
 *  - "mock" (default): static demo data, safe to run anywhere, used in tests.
 *  - "live": expects a real provider to have been registered via
 *    `setDataverseProvider` / `setUserProvider`, typically from a small
 *    bootstrap module that wires up PAC CLI-generated Dataverse services.
 *
 * Configure with the VITE_DATA_MODE environment variable (see README.md,
 * "Connecting to live Power Platform data").
 */
export type DataMode = "mock" | "live";

export function getDataMode(): DataMode {
  const configured = (import.meta.env.VITE_DATA_MODE ?? "mock").toLowerCase();
  return configured === "live" ? "live" : "mock";
}

let liveDataverseProvider: IDataverseProvider | undefined;
let liveUserProvider: IUserProvider | undefined;

/**
 * Registers a live Dataverse provider (e.g. one built on top of PAC
 * CLI-generated services). Call this once during app start-up, before any
 * component requests data, when running with VITE_DATA_MODE=live.
 */
export function setDataverseProvider(provider: IDataverseProvider): void {
  liveDataverseProvider = provider;
}

/** Registers a live user-profile provider (e.g. Office 365 Users connector). */
export function setUserProvider(provider: IUserProvider): void {
  liveUserProvider = provider;
}

export function getDataverseProvider(): IDataverseProvider {
  if (getDataMode() === "mock") return mockDataverseProvider;
  if (!liveDataverseProvider) {
    throw new DataProviderConfigurationError(
      "VITE_DATA_MODE is set to 'live' but no live Dataverse provider has been registered. " +
        "Call setDataverseProvider(...) during app start-up, or set VITE_DATA_MODE=mock to use demo data. " +
        "See README.md > 'Connecting to live Power Platform data'.",
    );
  }
  return liveDataverseProvider;
}

export function getUserProvider(): IUserProvider {
  if (getDataMode() === "mock") return mockUserProvider;
  if (!liveUserProvider) {
    throw new DataProviderConfigurationError(
      "VITE_DATA_MODE is set to 'live' but no live user provider has been registered. " +
        "Call setUserProvider(...) during app start-up, or set VITE_DATA_MODE=mock to use demo data. " +
        "See README.md > 'Connecting to live Power Platform data'.",
    );
  }
  return liveUserProvider;
}

export type { IDataverseProvider, IUserProvider } from "./types";
export { DataProviderConfigurationError } from "./types";
