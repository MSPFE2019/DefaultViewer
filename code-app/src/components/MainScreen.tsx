import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser, useResourceData } from "../hooks";
import { formatDate, formatYesNo } from "../utils/format";
import { isVisibleToUser } from "../utils/filtering";
import { TAB_ITEMS, type BotRecord, type FlowRecord, type PortalRecord, type PowerAppRecord, type TabKey } from "../types/models";
import { ErrorBanner } from "./ErrorBanner";
import { Header } from "./Header";
import { ResourceTable, type ResourceColumn } from "./ResourceTable";
import { TabSelector } from "./TabSelector";

const APP_NAME = "Power Platform COE Default Environment Viewer";

const flowColumns: ResourceColumn<FlowRecord>[] = [
  { key: "displayName", header: "Display Name", render: (r) => r.displayName },
  { key: "flowModifiedOn", header: "Flow Modified On", render: (r) => formatDate(r.flowModifiedOn) },
  { key: "flowState", header: "Flow State", render: (r) => r.flowState },
  { key: "flowDescription", header: "Flow Description", render: (r) => r.flowDescription },
  { key: "flowMakerDisplayName", header: "Flow Maker Display Name", render: (r) => r.flowMakerDisplayName },
  { key: "flowConnections", header: "Flow Connections", render: (r) => r.flowConnections },
];

const powerAppColumns: ResourceColumn<PowerAppRecord>[] = [
  { key: "displayName", header: "App Display Name", render: (r) => r.displayName },
  { key: "appType", header: "App Type", render: (r) => r.appType },
  { key: "appDescription", header: "App Description", render: (r) => r.appDescription },
  { key: "appOwnerDisplayName", header: "App Owner Display Name", render: (r) => r.appOwnerDisplayName },
  { key: "appCreatedOn", header: "App Created On", render: (r) => formatDate(r.appCreatedOn) },
  { key: "usesPremiumApi", header: "Uses Premium API", render: (r) => r.usesPremiumApi },
];

const botColumns: ResourceColumn<BotRecord>[] = [
  { key: "botDisplayName", header: "Bot Display Name", render: (r) => r.botDisplayName },
  { key: "botDescription", header: "Bot Description", render: (r) => r.botDescription },
  { key: "botOwner", header: "Bot Owner", render: (r) => r.botOwner.displayName },
  { key: "botState", header: "Bot State", render: (r) => r.botState },
  { key: "botCreatedOn", header: "Bot Created On", render: (r) => formatDate(r.botCreatedOn) },
  { key: "conversationsLastMonth", header: "Conversations (Last Month)", render: (r) => r.conversationsLastMonth },
];

const portalColumns: ResourceColumn<PortalRecord>[] = [
  { key: "portalDisplayName", header: "Power Pages Display Name", render: (r) => r.portalDisplayName },
  { key: "portalOwner", header: "Power Pages Owner", render: (r) => r.portalOwner.displayName },
  { key: "portalWebsiteName", header: "Power Pages Website Name", render: (r) => r.portalWebsiteName },
  { key: "externalIdentitiesEnabled", header: "External Identities Enabled", render: (r) => formatYesNo(r.externalIdentitiesEnabled) },
  { key: "authOpenRegistrationEnabled", header: "Auth Open Registration Enabled", render: (r) => formatYesNo(r.authOpenRegistrationEnabled) },
  { key: "authLocalRegistrationEnabled", header: "Auth Local Registration Enabled", render: (r) => formatYesNo(r.authLocalRegistrationEnabled) },
  { key: "authLocalAuthenticationEnabled", header: "Auth Local Authentication Enabled", render: (r) => formatYesNo(r.authLocalAuthenticationEnabled) },
  { key: "authInvitationEnabled", header: "Auth Invitation Enabled", render: (r) => formatYesNo(r.authInvitationEnabled) },
];

/**
 * Recreates `scr_Main`: the tabbed inventory view with a Reload button, a
 * running total for the selected tab, and a link to the About screen.
 */
export function MainScreen() {
  const [selectedTab, setSelectedTab] = useState<TabKey>(TAB_ITEMS[0]);
  const { user, error: userError } = useCurrentUser();
  const { flows, powerApps, bots, portals, loading, error, reload } = useResourceData();

  const visibleFlows = useMemo(
    () => flows.filter((f) => isVisibleToUser(f.environmentDisplayName, f.derivedOwner, user)),
    [flows, user],
  );
  const visiblePowerApps = useMemo(
    () =>
      powerApps.filter((a) =>
        isVisibleToUser(a.appEnvironmentDisplayName, { displayName: a.appOwnerDisplayName, department: a.appDepartment, company: a.appCompany }, user),
      ),
    [powerApps, user],
  );
  const visibleBots = useMemo(
    () => bots.filter((b) => isVisibleToUser(b.environmentDisplayName, b.botOwner, user)),
    [bots, user],
  );
  const visiblePortals = useMemo(
    () => portals.filter((p) => isVisibleToUser(p.environmentDisplayName, p.portalOwner, user)),
    [portals, user],
  );

  const totalsByTab: Record<TabKey, number> = {
    Flows: visibleFlows.length,
    "Power Apps": visiblePowerApps.length,
    "Copilot Studio Agent": visibleBots.length,
    "Power Pages": visiblePortals.length,
  };

  return (
    <div className="screen main-screen">
      <Header title={APP_NAME} />
      <div className="main-toolbar">
        <TabSelector items={TAB_ITEMS} selected={selectedTab} onSelect={setSelectedTab} />
        <span className="totals-text" aria-live="polite">
          Total number of {selectedTab} : {totalsByTab[selectedTab]}
        </span>
        <button type="button" className="icon-button" aria-label="Reload Data" onClick={() => reload()} disabled={loading}>
          <span aria-hidden="true">⟳</span>
        </button>
      </div>

      {(error || userError) && <ErrorBanner message={error ?? userError ?? "Unknown error"} />}

      <div className="tab-panels">
        <div
          id="panel-Flows"
          role="tabpanel"
          aria-labelledby="tab-Flows"
          hidden={selectedTab !== "Flows"}
        >
          <ResourceTable
            caption="List of Flows"
            columns={flowColumns}
            rows={visibleFlows}
            getRowId={(r) => r.id}
            loading={loading}
          />
        </div>
        <div
          id="panel-Power Apps"
          role="tabpanel"
          aria-labelledby="tab-Power Apps"
          hidden={selectedTab !== "Power Apps"}
        >
          <ResourceTable
            caption="List of Power Apps"
            columns={powerAppColumns}
            rows={visiblePowerApps}
            getRowId={(r) => r.id}
            loading={loading}
          />
        </div>
        <div
          id="panel-Copilot Studio Agent"
          role="tabpanel"
          aria-labelledby="tab-Copilot Studio Agent"
          hidden={selectedTab !== "Copilot Studio Agent"}
        >
          <ResourceTable
            caption="List of Copilot Studio Agents"
            columns={botColumns}
            rows={visibleBots}
            getRowId={(r) => r.id}
            loading={loading}
          />
        </div>
        <div
          id="panel-Power Pages"
          role="tabpanel"
          aria-labelledby="tab-Power Pages"
          hidden={selectedTab !== "Power Pages"}
        >
          <ResourceTable
            caption="List of Power Pages"
            columns={portalColumns}
            rows={visiblePortals}
            getRowId={(r) => r.id}
            loading={loading}
          />
        </div>
      </div>

      <Link to="/about" className="icon-button info-button" aria-label="About the App">
        <span aria-hidden="true">ⓘ</span>
      </Link>
    </div>
  );
}
