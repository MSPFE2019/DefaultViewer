/**
 * Shared domain types for the Default Environment Viewer.
 *
 * These mirror the Dataverse tables provided by the Power Platform
 * CoE Starter Kit that the original canvas app read from:
 *   - admin_flow    (Flows)
 *   - admin_app     (PowerApps Apps)
 *   - admin_pva     (PVA Bots / Copilot Studio agents)
 *   - admin_portal  (Power Pages Sites)
 *
 * In "live" data mode these shapes are produced by the generated
 * Dataverse services (see src/services/dataverseAdapter.ts). In "mock"
 * data mode they are produced by src/services/mockData.ts.
 */

/** A person/owner reference used for department/company based filtering. */
export interface OwnerRef {
  displayName: string;
  department: string;
  company: string;
  userEmail?: string;
}

export interface FlowRecord {
  id: string;
  displayName: string;
  environmentDisplayName: string;
  flowState: string;
  flowDescription: string;
  flowModifiedOn: string;
  flowMakerDisplayName: string;
  flowConnections: string;
  derivedOwner: OwnerRef;
}

export interface PowerAppRecord {
  id: string;
  displayName: string;
  appEnvironmentDisplayName: string;
  appType: string;
  appDescription: string;
  appCreatedOn: string;
  appOwnerDisplayName: string;
  usesPremiumApi: string;
  appDepartment: string;
  appCompany: string;
}

export interface BotRecord {
  id: string;
  botDisplayName: string;
  environmentDisplayName: string;
  botDescription: string;
  botState: string;
  botCreatedOn: string;
  conversationsLastMonth: number;
  botOwner: OwnerRef;
}

export interface PortalRecord {
  id: string;
  portalDisplayName: string;
  environmentDisplayName: string;
  portalWebsiteName: string;
  externalIdentitiesEnabled: boolean;
  authOpenRegistrationEnabled: boolean;
  authLocalRegistrationEnabled: boolean;
  authLocalAuthenticationEnabled: boolean;
  authInvitationEnabled: boolean;
  portalOwner: OwnerRef;
}

/** Current user's profile, sourced from Office 365 Users in the original app. */
export interface UserProfile {
  fullName: string;
  department: string;
  companyName: string;
  mail: string;
  /** Everything after the "@" in the user's email address. */
  userDomain: string;
}

export type TabKey = "Flows" | "Power Apps" | "Copilot Studio Agent" | "Power Pages";

export const TAB_ITEMS: TabKey[] = ["Flows", "Power Apps", "Copilot Studio Agent", "Power Pages"];
