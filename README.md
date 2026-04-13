# Power Platform Default Environment Viewer

## Overview

This app provides read-only visibility into Power Platform resources created in the
**Default environment**, while enforcing governance, least-privilege access,
and consistent scoping rules.

The app is delivered as a **Power Platform managed solution** and is designed to
work **exclusively with the Power Platform CoE Starter Kit**.

---

## Installation Requirement (Important)

✅ **This solution must be installed in the same environment where the Power Platform CoE Starter Kit is deployed.**

The app reads data directly from **CoE Starter Kit Dataverse tables**, including
inventory for:

- Power Apps  
- Power Automate Flows  
- Copilot Studio (PVA) Bots  
- Power Pages Sites  

Installing this solution in any other environment is **not supported** and will
result in missing data or permission errors.

---

## Deployment Instructions (Managed Solution)

### Prerequisites

Before importing the solution, ensure the following are in place:

- Power Platform CoE Starter Kit is fully installed and operational
- Target environment is the **CoE Starter Kit environment**
- User performing the import has:
  - **Environment Admin** or **System Administrator** role
- Required connections used by the solution are available
- Dataverse database is present in the environment

---

### Step 1: Download the Managed Solution

Obtain the managed solution package (`.zip`) from the release location
(GitHub Releases, internal repo, or deployment pipeline).

✅ Only **managed** solutions are supported for deployment.

---

### Step 2: Import the Managed Solution

1. Go to **Power Apps**  
   https://make.powerapps.com

2. Select the **CoE Starter Kit environment**

3. Navigate to  
   **Solutions → Import solution**

4. Upload the managed solution `.zip` file

5. Follow the import wizard:
   - Review solution details
   - Confirm connections (if prompted)
   - Accept default values unless otherwise documented

6. Complete the import

✅ When finished, the solution status should show **Installed**.

---

### Step 3: Assign Security Roles

Access to the app and underlying data is controlled through Dataverse security roles.

#### Custom Viewer Role (Recommended)

Assign the following role to end users:

**`PPCOE_DefaultEnvViewerRole`**

This role provides **read-only access** to the CoE Starter Kit tables used by the app.

#### Alternative

You may also assign any of the **default security roles included with the CoE Starter Kit**
that provide appropriate read access, depending on your governance model.

✅ **Least‑privilege access is strongly recommended.**

---

### Step 4: Share the App

1. Open the imported solution
2. Locate the canvas app
3. Select **Share**
4. Share with:
   - Individual users, or
   - Security groups
5. Ensure users also have the required **Dataverse security role**

---

### Step 5: Validate Deployment

After deployment, validate that:

- The app loads without errors
- Resources are displayed only from the **Default environment**
- Filtering behaves as expected:
  - Department / Company filtering, or
  - Optional user domain filtering
- Users without proper roles cannot access data

---

## Environment Scope

Only resources that exist in the **Default environment** are shown.

The app determines this by checking whether the environment display name contains
the word **“Default”**.

The following fields are used per workload:

- **Power Apps** – App Environment Display Name
- **Power Automate Flows** – Flow Environment Display Name
- **Copilot Studio (PVA) Bots** – Environment Display Name
- **Power Pages Sites** – Environment Display Name

---

## Ownership and Visibility Rules

A resource is displayed if **either** of the following conditions is met:

- The resource owner’s **Department** matches the signed-in user’s department  
- The resource owner’s **Company** matches the signed-in user’s company  

User profile values are retrieved from **Microsoft Entra ID (Azure AD)** using the
**Office 365 Users** connector.

---

## Optional: User Domain-Based Filtering

When Company or Department fields are not reliable, the app supports filtering
by **user email domain**.

### Example

```powerfx
userdomain in DerivedOwner.UserEmail
``
