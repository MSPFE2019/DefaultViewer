import { Link } from "react-router-dom";
import { Header } from "./Header";

/**
 * Recreates `scr_About`: static documentation describing the app's
 * environment scope, ownership/visibility rules, and security model.
 * Sourced from the original app's HTML web resource / About screen text.
 */
export function AboutScreen() {
  return (
    <div className="screen about-screen">
      <Header title="About" />
      <Link to="/main" className="icon-button home-button" aria-label="Main Screen">
        <span aria-hidden="true">🏠</span>
      </Link>
      <div className="about-content">
        <h2>About This App</h2>
        <p>
          This application displays Power Platform resources that are relevant to the signed-in user while
          maintaining proper governance and visibility controls. The same filtering logic is applied consistently
          across all supported workloads.
        </p>
        <hr />
        <h3>Environment Scope</h3>
        <p>
          Only resources that exist in the <strong>Default environment</strong> are shown. The app determines this
          by checking whether the environment display name contains the word <em>&ldquo;Default&rdquo;</em>.
        </p>
        <ul>
          <li>
            <strong>Power Apps</strong> – App Environment Display Name
          </li>
          <li>
            <strong>Power Automate Flows</strong> – Flow Environment Display Name
          </li>
          <li>
            <strong>Copilot Studio (PVA) Bots</strong> – Environment Display Name
          </li>
          <li>
            <strong>Power Pages Sites</strong> – Environment Display Name
          </li>
        </ul>
        <p>
          This approach aligns with Center of Excellence (CoE) best practices and helps focus on personal
          productivity assets commonly created in the Default environment.
        </p>
        <hr />
        <h3>Ownership and Visibility Rules</h3>
        <p>
          After confirming the resource is in the Default environment, the app evaluates ownership metadata. A
          resource is displayed if <strong>either</strong> of the following conditions is met:
        </p>
        <ul>
          <li>
            The resource owner&rsquo;s <strong>Department</strong> matches the current user&rsquo;s department
          </li>
          <li>
            The resource owner&rsquo;s <strong>Company</strong> matches the current user&rsquo;s company
          </li>
        </ul>
        <p>
          The current user&rsquo;s profile information is retrieved from Microsoft Entra ID (Azure AD) using the
          Office 365 Users connector (or demo data when running in mock mode).
        </p>
        <hr />
        <h3>Optional: User Domain-Based Filtering</h3>
        <p>
          This app also supports filtering by <strong>user email domain</strong> (for example:{" "}
          <em>contoso.com</em>) using the <code>userDomain</code> value. This option is useful in scenarios where
          the <em>Company</em> or <em>Department</em> fields are not populated or not reliable.
        </p>
        <p>
          If you are not using Company or Department-based filtering, you can replace the ownership filter with a
          domain-based comparison. See <code>matchesUserDomain</code> in{" "}
          <code>src/utils/filtering.ts</code>.
        </p>
        <hr />
        <h3>Workload-Specific Ownership Fields</h3>
        <table className="about-table">
          <thead>
            <tr>
              <th scope="col">Workload</th>
              <th scope="col">Ownership Fields Used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Power Apps</td>
              <td>App Department / App Company</td>
            </tr>
            <tr>
              <td>Power Automate Flows</td>
              <td>DerivedOwner.Department / DerivedOwner.Company</td>
            </tr>
            <tr>
              <td>Copilot Studio (PVA) Bots</td>
              <td>Bot Owner.Department / Bot Owner.Company</td>
            </tr>
            <tr>
              <td>Power Pages Sites</td>
              <td>Power Pages Owner.Department / Power Pages Owner.Company</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>Summary</h3>
        <p>
          <strong>In simple terms:</strong> this app shows only Power Platform resources that:
        </p>
        <ul>
          <li>Are located in the Default environment, and</li>
          <li>Are owned by someone in the same department, company, or email domain as the signed-in user, and</li>
          <li>Are accessible based on assigned CoE Starter Kit security roles</li>
        </ul>
      </div>
    </div>
  );
}
