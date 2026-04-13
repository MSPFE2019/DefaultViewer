# About This App

This application displays Power Platform resources that are relevant to the
signed-in user while maintaining proper governance and visibility controls.
The same filtering logic is applied consistently across all supported workloads.

---

## Environment Scope

Only resources that exist in the **Default environment** are shown.
The app determines this by checking whether the environment display name
contains the word **“Default”**.

The following fields are used per workload:

- **Power Apps** – App Environment Display Name
- **Power Automate Flows** – Flow Environment Display Name
- **Copilot Studio (PVA) Bots** – Environment Display Name
- **Power Pages Sites** – Environment Display Name

This approach aligns with Center of Excellence (CoE) best practices and helps
focus on personal productivity assets commonly created in the Default environment.

---

## Ownership and Visibility Rules

After confirming the resource is in the Default environment, the app evaluates
ownership metadata.

A resource is displayed if **either** of the following conditions is met:

- The resource owner’s **Department** matches the current user’s department  
- The resource owner’s **Company** matches the current user’s company  

The current user’s profile information is retrieved from **Microsoft Entra ID
(Azure AD)** using the **Office 365 Users** connector.

---

## Optional: User Domain‑Based Filtering

This app also supports filtering by **user email domain**
(for example: `microsoft.com`) using the `userdomain` value.

This option is useful when the **Company** or **Department** fields are not
populated or are unreliable.

If you are not using Company or Department-based filtering, you can replace the
ownership filter in each gallery with a domain-based comparison.

### Example

```powerfx
userdomain in DerivedOwner.UserEmail
