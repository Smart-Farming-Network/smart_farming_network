/**
 * Human-friendly relative time ("3 minutes ago").
 * Used by the community feed for posts/comments created in the browser —
 * seeded content ships with a static display string instead, so nothing
 * time-dependent is rendered during server-side rendering.
 */
export function timeAgo(isoDate) {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));

  if (seconds < 45) return "Just now";

  const units = [
    { limit: 60, size: 1, label: "second" },
    { limit: 3600, size: 60, label: "minute" },
    { limit: 86400, size: 3600, label: "hour" },
    { limit: 604800, size: 86400, label: "day" },
    { limit: 2629800, size: 604800, label: "week" },
    { limit: 31557600, size: 2629800, label: "month" },
    { limit: Infinity, size: 31557600, label: "year" },
  ];

  const unit = units.find((u) => seconds < u.limit);
  const value = Math.max(1, Math.floor(seconds / unit.size));

  return `${value} ${unit.label}${value === 1 ? "" : "s"} ago`;
}
