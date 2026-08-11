# Power Platform Default Environment Viewer — Code App

A React + TypeScript + Vite recreation of the `DefaultViewer` canvas app as a
[Power Apps code app](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/).
It provides the same read-only visibility into Power Platform resources
created in the **Default environment**, sourced from the **Power Platform
CoE Starter Kit** Dataverse tables, while enforcing the same governance and
least-privilege scoping rules as the original canvas app.

## What this app shows

Three screens, matching the original canvas app:

- **Loading** — a brief "Scanning Default Environment...Standby" splash screen.
- **Main** — a tabbed inventory view (Flows / Power Apps / Copilot Studio
  Agents / Power Pages), each rendered as an accessible data grid, with a
  Reload button and a running total for the selected tab.
- **About** — a description of the environment-scoping and ownership rules
  the app applies.

### Filtering rules (unchanged from the original app)

A resource is shown only if **both**:

1. Its environment display name contains the word **"Default"**.
2. The resource owner's **Department** matches the signed-in user's
   department, **or** the owner's **Company** matches the signed-in user's
   company.

See `src/utils/filtering.ts` for the implementation and
`src/utils/filtering.test.ts` for unit tests. An optional email-domain-based
filter (`matchesUserDomain`) is also included, matching the original app's
"Optional: User Domain-Based Filtering" guidance.

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later (v22 recommended)
- npm 10+
- To run against real data and deploy: [Power Platform CLI](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction) (`pac`), and
  a Power Platform environment with:
  - Power Apps code apps enabled
  - Dataverse and the **Power Platform CoE Starter Kit** installed
  - The **Office 365 Users** connector available

## Local development (demo/mock data)

By default the app runs entirely on static, in-memory demo data — no Power
Platform connection required. This is the fastest way to explore the UI or
run the test suite.

```bash
cd code-app
npm install
npm run dev
```

Open the printed local URL in your browser. Copy `.env.example` to `.env.local`
if you want to be explicit about the data mode (`VITE_DATA_MODE=mock` is the
default even without a `.env` file).

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite dev server. |
| `npm run build` | Type-checks (`tsc -b`) and builds a production bundle to `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint. |
| `npm test` | Runs the Vitest unit/component test suite once. |
| `npm run test:watch` | Runs Vitest in watch mode. |

## Project structure

```
code-app/
├── src/
│   ├── components/     # Presentational React components (screens + grid)
│   ├── hooks/          # useCurrentUser, useResourceData (state + data access)
│   ├── services/       # Data adapter layer (mock + live provider registry)
│   ├── types/          # Shared TypeScript models
│   ├── utils/          # Filtering + formatting helpers (unit tested)
│   ├── App.tsx          # Screen routing (Loading → Main → About)
│   ├── PowerProvider.tsx # Initializes the Power Apps code app SDK
│   └── main.tsx
├── power.config.json    # Generated locally by `pac code init` (git-ignored)
└── .power/              # Generated locally by the PAC CLI (git-ignored)
```

## Connecting to live Power Platform data

The app never calls Dataverse or the Office 365 Users connector directly from
UI code. All data access goes through the adapter interfaces in
`src/services/types.ts` (`IDataverseProvider`, `IUserProvider`), selected at
runtime by `src/services/index.ts` based on the `VITE_DATA_MODE` environment
variable:

- `VITE_DATA_MODE=mock` (default) — uses `src/services/mockProviders.ts`.
- `VITE_DATA_MODE=live` — expects a real provider to have been registered via
  `setDataverseProvider(...)` / `setUserProvider(...)` during app start-up.

To wire up real CoE Starter Kit data:

1. Initialize the code app once against your Power Platform environment:

   ```bash
   pac auth create
   pac env select --environment <your-environment-id>
   pac code init --displayname "Power Platform Default Environment Viewer"
   ```

2. Generate typed Dataverse services for the CoE Starter Kit tables used by
   this app:

   ```bash
   pac code add-data-source -a dataverse -t admin_flow
   pac code add-data-source -a dataverse -t admin_app
   pac code add-data-source -a dataverse -t admin_pva
   pac code add-data-source -a dataverse -t admin_portal
   pac code add-data-source -a dataverse -t admin_environment
   pac code add-data-source -a dataverse -t admin_maker
   ```

   This creates `src/generated/models/*` and `src/generated/services/*`
   (do not edit these files directly).

3. Add a small bootstrap module (for example `src/liveProviders.ts`) that
   implements `IDataverseProvider`/`IUserProvider` using the generated
   services (`AdminFlowService.getAll()`, etc., mapping each Dataverse row to
   the shapes in `src/types/models.ts`), then register it before the app
   renders:

   ```ts
   // src/liveProviders.ts (not included by default — see step 3 above)
   import { setDataverseProvider, setUserProvider } from "./services";
   // ... build providers from the generated Dataverse services ...
   setDataverseProvider(liveDataverseProvider);
   setUserProvider(liveUserProvider);
   ```

   Import this module once, early, in `src/main.tsx`.

4. Set `VITE_DATA_MODE=live` (e.g. in `.env.local`) and run/deploy as usual.

This keeps the live Dataverse/connector integration fully isolated behind a
small, documented seam, so the rest of the app (screens, filtering, tests)
never needs to know which mode is active.

## Running as a Power Apps code app

```bash
npm run dev        # in one terminal
pac code run       # in another terminal, from this folder
```

Open the **Local Play** URL from the `pac code run` output in the same
browser profile as your Power Platform tenant so the code app SDK can
authenticate.

## Deployment

```bash
npm run build
pac code push
```

Then, in [make.powerapps.com](https://make.powerapps.com), share the app with
the same users/security groups and Dataverse security roles documented in the
top-level [README.md](../README.md) (for example `PPCOE_DefaultEnvViewerRole`).

## Accessibility

- Tabs use the ARIA `tablist`/`tab`/`tabpanel` pattern with roving
  left/right arrow-key navigation.
- Data grids are real `<table>` elements with `<caption>`, column headers
  (`<th scope="col">`), and an accessible region label.
- Errors are announced via `role="alert"`; loading/empty states are
  communicated in the grid body instead of relying on color alone.
- All interactive controls have visible focus outlines and accessible
  names (`aria-label`) matching the original canvas app's
  `AccessibleLabel` properties.

## Tests

Unit and component tests (Vitest + Testing Library) cover:

- The Default-environment and department/company filtering rules
  (`src/utils/filtering.test.ts`).
- Date/boolean formatting helpers (`src/utils/format.test.ts`).
- The data grid's loading/empty/populated states (`src/components/ResourceTable.test.tsx`).
- Tab selection, including keyboard navigation (`src/components/TabSelector.test.tsx`).
- End-to-end screen navigation (Loading → Main → About → Main) and demo-data
  filtering behavior (`src/App.test.tsx`).

Run them with `npm test`.

## Limitations

- The live Dataverse/Office 365 Users integration is intentionally left as a
  documented extension point (step 3 above) rather than shipped code, since
  it depends on PAC CLI-generated services tied to a specific Power Platform
  environment and cannot be exercised in this repository's build/test
  environment.
- Demo/mock data is illustrative only and does not represent real tenant
  data.
