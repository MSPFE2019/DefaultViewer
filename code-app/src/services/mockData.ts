/**
 * Demo/mock data for the Default Environment Viewer.
 *
 * This module stands in for the CoE Starter Kit Dataverse tables and the
 * Office 365 Users connector when the app is run outside of a Power
 * Platform environment that has the CoE Starter Kit installed (for example
 * local development, automated tests, or a quick demo).
 *
 * See src/services/dataverseAdapter.ts and src/services/userService.ts for
 * how this data is selected and how to wire up the real connections.
 */
import type { BotRecord, FlowRecord, PortalRecord, PowerAppRecord, UserProfile } from "../types/models";

export const mockCurrentUser: UserProfile = {
  fullName: "Alex Johnson",
  department: "Engineering",
  companyName: "Contoso Corporation",
  mail: "alex.johnson@contoso.com",
  userDomain: "contoso.com",
};

export const mockFlows: FlowRecord[] = [
  {
    id: "flow-1",
    displayName: "New Hire Onboarding Notification",
    environmentDisplayName: "Default-Contoso Corporation",
    flowState: "Started",
    flowDescription: "Notifies HR and IT when a new hire record is created.",
    flowModifiedOn: "2024-11-02T14:30:00Z",
    flowMakerDisplayName: "Alex Johnson",
    flowConnections: "Office 365 Outlook, SharePoint",
    derivedOwner: { displayName: "Alex Johnson", department: "Engineering", company: "Contoso Corporation", userEmail: "alex.johnson@contoso.com" },
  },
  {
    id: "flow-2",
    displayName: "Expense Approval Reminder",
    environmentDisplayName: "Default-Contoso Corporation",
    flowState: "Started",
    flowDescription: "Sends a reminder for pending expense approvals older than 3 days.",
    flowModifiedOn: "2024-10-18T09:12:00Z",
    flowMakerDisplayName: "Alex Johnson",
    flowConnections: "Dataverse, Teams",
    derivedOwner: { displayName: "Alex Johnson", department: "Engineering", company: "Contoso Corporation", userEmail: "alex.johnson@contoso.com" },
  },
  {
    id: "flow-3",
    displayName: "Marketing Campaign Sync",
    environmentDisplayName: "Sandbox-Marketing",
    flowState: "Started",
    flowDescription: "Not in the Default environment, should be filtered out.",
    flowModifiedOn: "2024-09-01T09:12:00Z",
    flowMakerDisplayName: "Priya Patel",
    flowConnections: "Dynamics 365 Marketing",
    derivedOwner: { displayName: "Priya Patel", department: "Marketing", company: "Contoso Corporation", userEmail: "priya.patel@contoso.com" },
  },
  {
    id: "flow-4",
    displayName: "Finance Month-End Report",
    environmentDisplayName: "Default-Contoso Corporation",
    flowState: "Suspended",
    flowDescription: "Owned by Finance; should be filtered out for Engineering users.",
    flowModifiedOn: "2024-08-11T09:12:00Z",
    flowMakerDisplayName: "Jamie Lee",
    flowConnections: "SQL Server",
    derivedOwner: { displayName: "Jamie Lee", department: "Finance", company: "Fabrikam Inc.", userEmail: "jamie.lee@fabrikam.com" },
  },
];

export const mockPowerApps: PowerAppRecord[] = [
  {
    id: "app-1",
    displayName: "Team Vacation Tracker",
    appEnvironmentDisplayName: "Default-Contoso Corporation",
    appType: "Canvas",
    appDescription: "Tracks team PTO requests and approvals.",
    appCreatedOn: "2024-06-14T00:00:00Z",
    appOwnerDisplayName: "Alex Johnson",
    usesPremiumApi: "No",
    appDepartment: "Engineering",
    appCompany: "Contoso Corporation",
  },
  {
    id: "app-2",
    displayName: "IT Asset Tracker",
    appEnvironmentDisplayName: "Default-Contoso Corporation",
    appType: "Canvas",
    appDescription: "Personal productivity app for tracking IT equipment.",
    appCreatedOn: "2024-07-02T00:00:00Z",
    appOwnerDisplayName: "Alex Johnson",
    usesPremiumApi: "Yes",
    appDepartment: "Engineering",
    appCompany: "Contoso Corporation",
  },
  {
    id: "app-3",
    displayName: "HR Policy Lookup",
    appEnvironmentDisplayName: "Production",
    appType: "Canvas",
    appDescription: "Not in the Default environment, should be filtered out.",
    appCreatedOn: "2024-05-20T00:00:00Z",
    appOwnerDisplayName: "Priya Patel",
    usesPremiumApi: "No",
    appDepartment: "HR",
    appCompany: "Contoso Corporation",
  },
];

export const mockBots: BotRecord[] = [
  {
    id: "bot-1",
    botDisplayName: "IT Helpdesk Assistant",
    environmentDisplayName: "Default-Contoso Corporation",
    botDescription: "Answers common IT support questions.",
    botState: "Published",
    botCreatedOn: "2024-04-11T00:00:00Z",
    conversationsLastMonth: 128,
    botOwner: { displayName: "Alex Johnson", department: "Engineering", company: "Contoso Corporation", userEmail: "alex.johnson@contoso.com" },
  },
  {
    id: "bot-2",
    botDisplayName: "Sales FAQ Bot",
    environmentDisplayName: "Sandbox-Sales",
    botDescription: "Not in the Default environment, should be filtered out.",
    botState: "Draft",
    botCreatedOn: "2024-03-02T00:00:00Z",
    conversationsLastMonth: 4,
    botOwner: { displayName: "Sam Reyes", department: "Sales", company: "Contoso Corporation", userEmail: "sam.reyes@contoso.com" },
  },
];

export const mockPortals: PortalRecord[] = [
  {
    id: "portal-1",
    portalDisplayName: "Engineering Knowledge Base",
    environmentDisplayName: "Default-Contoso Corporation",
    portalWebsiteName: "eng-kb",
    externalIdentitiesEnabled: true,
    authOpenRegistrationEnabled: false,
    authLocalRegistrationEnabled: false,
    authLocalAuthenticationEnabled: true,
    authInvitationEnabled: true,
    portalOwner: { displayName: "Alex Johnson", department: "Engineering", company: "Contoso Corporation", userEmail: "alex.johnson@contoso.com" },
  },
  {
    id: "portal-2",
    portalDisplayName: "Customer Community",
    environmentDisplayName: "Production",
    portalWebsiteName: "customer-community",
    externalIdentitiesEnabled: true,
    authOpenRegistrationEnabled: true,
    authLocalRegistrationEnabled: true,
    authLocalAuthenticationEnabled: true,
    authInvitationEnabled: false,
    portalOwner: { displayName: "Priya Patel", department: "Marketing", company: "Contoso Corporation", userEmail: "priya.patel@contoso.com" },
  },
];
