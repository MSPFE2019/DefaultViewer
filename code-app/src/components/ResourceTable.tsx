import type { ReactNode } from "react";

export interface ResourceColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface ResourceTableProps<T> {
  caption: string;
  columns: ResourceColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  loading?: boolean;
}

/**
 * Generic, accessible data grid used for every tab on the Main screen
 * (Flows, Power Apps, Copilot Studio Agents, Power Pages). Recreates the
 * behavior of the canvas app's `Table` control, including its
 * "No Data Found" empty state.
 */
export function ResourceTable<T>({ caption, columns, rows, getRowId, loading }: ResourceTableProps<T>) {
  return (
    <div className="resource-table-wrapper" role="region" aria-label={caption}>
      <table className="resource-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="resource-table-status">
                Loading…
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="resource-table-status">
                No Data Found
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowId(row)}>
                {columns.map((column) => (
                  <td key={column.key} data-label={column.header}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
