import type { BotRecord, FlowRecord, PortalRecord, PowerAppRecord, UserProfile } from "../types/models";

/**
 * Adapter contract for the Dataverse tables provided by the Power Platform
 * CoE Starter Kit. Implementations may talk to a live Dataverse connection
 * (via the Power Apps code app SDK) or return demo data for local
 * development. See src/services/index.ts for how a provider is selected,
 * and README.md ("Connecting to live Power Platform data") for how to
 * plug in the live implementation.
 */
export interface IDataverseProvider {
  getFlows(): Promise<FlowRecord[]>;
  getPowerApps(): Promise<PowerAppRecord[]>;
  getBots(): Promise<BotRecord[]>;
  getPortals(): Promise<PortalRecord[]>;
}

/**
 * Adapter contract for the current signed-in user's profile, sourced from
 * the Office 365 Users connector (`Office365Users.MyProfileV2()`) in the
 * original canvas app.
 */
export interface IUserProvider {
  getCurrentUser(): Promise<UserProfile>;
}

/** Thrown when a requested data mode has no registered provider. */
export class DataProviderConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataProviderConfigurationError";
  }
}
