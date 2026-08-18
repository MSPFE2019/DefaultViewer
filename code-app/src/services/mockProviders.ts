import { mockBots, mockCurrentUser, mockFlows, mockPortals, mockPowerApps } from "./mockData";
import type { IDataverseProvider, IUserProvider } from "./types";

/** Simulates realistic network latency so loading states are visible in the demo. */
function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Demo/mock implementation of {@link IDataverseProvider}. Returns static,
 * clearly-labelled sample data so the app can run and be tested without a
 * connection to a real Power Platform environment.
 */
export const mockDataverseProvider: IDataverseProvider = {
  getFlows: () => delay(mockFlows),
  getPowerApps: () => delay(mockPowerApps),
  getBots: () => delay(mockBots),
  getPortals: () => delay(mockPortals),
};

/** Demo/mock implementation of {@link IUserProvider}. */
export const mockUserProvider: IUserProvider = {
  getCurrentUser: () => delay(mockCurrentUser, 150),
};
