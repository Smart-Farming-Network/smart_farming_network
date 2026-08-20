import { CATEGORY_TO_ENUM } from "./serialize";

export const LIMITS = {
  contentMin: 10,
  contentMax: 1200,
  commentMin: 2,
  commentMax: 800,
  locationMax: 80,
  tagMax: 30,
  tagCount: 4,
  noteMax: 500,
};

/**
 * Strips control characters (keeping newlines) and collapses runaway blank
 * lines. `[^\P{Cc}\n]` reads as "control characters other than newline".
 */
function clean(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[^\P{Cc}\n]/gu, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

/**
 * Tags become search terms and URL fragments, so keep them to letters and
 * digits. Returns a de-duplicated, capped list.
 */
function cleanTags(input) {
  const raw = Array.isArray(input) ? input : String(input ?? "").split(/[,#\s]+/);

  const seen = new Set();
  const tags = [];

  for (const entry of raw) {
    const tag = String(entry ?? "")
      .replace(/[^\p{L}\p{N}]/gu, "")
      .slice(0, LIMITS.tagMax);

    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;

    seen.add(key);
    tags.push(tag);

    if (tags.length >= LIMITS.tagCount) break;
  }

  return tags;
}

export function validatePost(body) {
  const errors = {};

  const content = clean(body?.content);
  const location = clean(body?.location);
  const category = String(body?.category ?? "").toLowerCase();

  if (content.length < LIMITS.contentMin) {
    errors.content = `Please write at least ${LIMITS.contentMin} characters.`;
  } else if (content.length > LIMITS.contentMax) {
    errors.content = `Posts are limited to ${LIMITS.contentMax} characters.`;
  }

  if (!location) {
    errors.location = "Tell other farmers where you are posting from.";
  } else if (location.length > LIMITS.locationMax) {
    errors.location = "That location is too long.";
  }

  if (!CATEGORY_TO_ENUM[category]) {
    errors.category = "Choose a valid post type.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      content,
      location,
      category: CATEGORY_TO_ENUM[category],
      tags: cleanTags(body?.tags),
    },
  };
}

export function validateComment(body) {
  const content = clean(body?.content);

  if (content.length < LIMITS.commentMin) {
    return { ok: false, errors: { content: "Write a reply first." } };
  }

  if (content.length > LIMITS.commentMax) {
    return { ok: false, errors: { content: `Replies are limited to ${LIMITS.commentMax} characters.` } };
  }

  return { ok: true, data: { content } };
}

const REPORT_REASONS = new Set(["spam", "misleading-advice", "abusive", "off-topic", "other"]);

export function validateReport(body) {
  const reason = String(body?.reason ?? "").toLowerCase();
  const note = clean(body?.note).slice(0, LIMITS.noteMax);

  if (!REPORT_REASONS.has(reason)) {
    return { ok: false, errors: { reason: "Choose why you are reporting this." } };
  }

  const postId = typeof body?.postId === "string" ? body.postId : null;
  const commentId = typeof body?.commentId === "string" ? body.commentId : null;

  if (!postId && !commentId) {
    return { ok: false, errors: { target: "Nothing to report." } };
  }

  return { ok: true, data: { reason, note: note || null, postId, commentId } };
}
