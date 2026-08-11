import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("navigates from the loading screen to the main screen and shows demo data", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Scanning Default Environment/i)).toBeInTheDocument();

    await waitFor(
      () => expect(screen.getByRole("heading", { name: /Power Platform COE Default Environment Viewer/i })).toBeInTheDocument(),
      { timeout: 3000 },
    );

    // Flows tab is selected by default; mock data includes a visible flow for the demo user.
    await waitFor(() => expect(screen.getByText("New Hire Onboarding Notification")).toBeInTheDocument());
    // Records outside the Default environment / owner's department-company are filtered out.
    expect(screen.queryByText("Marketing Campaign Sync")).not.toBeInTheDocument();
  });

  it("switches tabs and updates the visible data grid", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/main"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("New Hire Onboarding Notification")).toBeInTheDocument());

    await user.click(screen.getByRole("tab", { name: "Power Apps" }));

    await waitFor(() => expect(screen.getByText("Team Vacation Tracker")).toBeInTheDocument());
  });

  it("navigates to the About screen and back to Main", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/main"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("New Hire Onboarding Notification")).toBeInTheDocument());

    await user.click(screen.getByRole("link", { name: "About the App" }));
    expect(await screen.findByText("About This App")).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Main Screen" }));
    await waitFor(() => expect(screen.getByText("New Hire Onboarding Notification")).toBeInTheDocument());
  });
});
