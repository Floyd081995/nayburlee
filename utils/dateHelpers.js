/**
 * Formats a local date string to "28 May 2025 at 10:00" in a target timezone.
 * @param {string} localString - The local date string, e.g. "2025-05-28T10:00".
 * @param {string} timeZone - The IANA timezone string, e.g. "Africa/Johannesburg".
 * @returns {string} - Formatted local date/time string.
 */
export function formatToLocalDateTime(localString, timeZone = "Africa/Johannesburg") {
  if (!localString) return "";
  const date = new Date(localString);
  const dateStr = date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone,
  });
  const timeStr = date.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
  return `${dateStr} at ${timeStr}`;
}

/**
 * Formats a local date string to "28 May 2025" in a target timezone.
 */
export function formatToLocalDate(localString, timeZone = "Africa/Johannesburg", options = {}) {
  if (!localString) return "";
  const date = new Date(localString);
  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone,
    ...options,
  });
}