/** Formats an ISO date string the way the canvas app's date columns display. */
export function formatDate(value: string | undefined | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

/** Formats a boolean as the "Yes"/"No" text used throughout the original app's columns. */
export function formatYesNo(value: boolean | undefined | null): string {
  return value ? "Yes" : "No";
}
