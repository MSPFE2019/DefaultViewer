import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TabSelector } from "./TabSelector";
import { TAB_ITEMS } from "../types/models";

describe("TabSelector", () => {
  it("marks the selected tab with aria-selected", () => {
    render(<TabSelector items={TAB_ITEMS} selected="Flows" onSelect={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Flows" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Power Apps" })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onSelect when a tab is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TabSelector items={TAB_ITEMS} selected="Flows" onSelect={onSelect} />);
    await user.click(screen.getByRole("tab", { name: "Power Apps" }));
    expect(onSelect).toHaveBeenCalledWith("Power Apps");
  });

  it("supports arrow-key navigation between tabs", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TabSelector items={TAB_ITEMS} selected="Flows" onSelect={onSelect} />);
    screen.getByRole("tab", { name: "Flows" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onSelect).toHaveBeenCalledWith("Power Apps");
  });
});
