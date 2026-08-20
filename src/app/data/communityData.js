/**
 * Static configuration for the Farmers' Community UI.
 *
 * Everything here is presentation config — labels, icons, house rules. All
 * community content (posts, replies, trending tags, contributor rankings and
 * counters) comes from the database via /api/community/*. Nothing on this page
 * is seeded, padded or illustrative: an empty community shows as empty.
 */

export const CATEGORIES = [
  { id: "all", label: "All Posts", icon: "fas fa-layer-group", color: "#28a745" },
  { id: "question", label: "Questions", icon: "fas fa-question-circle", color: "#0d6efd" },
  { id: "experience", label: "Experiences", icon: "fas fa-seedling", color: "#28a745" },
  { id: "challenge", label: "Challenges", icon: "fas fa-bug", color: "#dc3545" },
  { id: "tip", label: "Tips & Advice", icon: "fas fa-lightbulb", color: "#fd7e14" },
  { id: "market", label: "Market Talk", icon: "fas fa-chart-line", color: "#6f42c1" },
];

export const CATEGORY_META = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {});

export const SORT_OPTIONS = [
  { id: "recent", label: "Most Recent" },
  { id: "trending", label: "Trending" },
  { id: "unanswered", label: "Unanswered" },
];

/** Must stay in step with REPORT_REASONS in src/libs/community/validate.js. */
export const REPORT_REASONS = [
  { id: "misleading-advice", label: "Misleading or unsafe advice" },
  { id: "spam", label: "Spam or fake agro-dealer" },
  { id: "abusive", label: "Abusive or disrespectful" },
  { id: "off-topic", label: "Off topic" },
  { id: "other", label: "Something else" },
];

export const COMMUNITY_GUIDELINES = [
  "Share real farm experiences — wins and losses both teach.",
  "Ask specific questions: crop, stage, location and what you already tried.",
  "No spam, fake agro-dealers or unverified chemical claims.",
  "Respect fellow farmers. Disagree with the practice, not the person.",
];

/**
 * Chemical and pest advice from other farmers can cost a season if it is wrong,
 * so the feed states this plainly rather than implying the network vouches for
 * every reply.
 */
export const ADVICE_DISCLAIMER =
  "Advice here comes from fellow farmers, not from SFN. Confirm chemical, dosage and pest treatments with a qualified agronomist or your local extension officer before applying them.";
