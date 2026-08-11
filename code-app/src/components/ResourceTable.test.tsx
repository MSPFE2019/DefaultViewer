import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResourceTable } from "./ResourceTable";

interface Row {
  id: string;
  name: string;
}

const columns = [{ key: "name", header: "Name", render: (row: Row) => row.name }];

describe("ResourceTable", () => {
  it("shows the loading state", () => {
    render(<ResourceTable caption="Test" columns={columns} rows={[]} getRowId={(r) => r.id} loading />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("shows the 'No Data Found' empty state", () => {
    render(<ResourceTable caption="Test" columns={columns} rows={[]} getRowId={(r) => r.id} />);
    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("renders rows", () => {
    const rows: Row[] = [{ id: "1", name: "Alpha" }, { id: "2", name: "Beta" }];
    render(<ResourceTable caption="Test" columns={columns} rows={rows} getRowId={(r) => r.id} />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("exposes an accessible region with the caption as its label", () => {
    render(<ResourceTable caption="List of Flows" columns={columns} rows={[]} getRowId={(r) => r.id} />);
    expect(screen.getByRole("region", { name: "List of Flows" })).toBeInTheDocument();
  });
});
