import { CommunityCategory } from "@/generated/prisma";

/**
 * Maps between the API's enum categories and the lowercase ids the UI uses.
 * Keep these two in sync with CATEGORIES in src/app/data/communityData.js.
 */
export const CATEGORY_TO_ENUM = {
  question: CommunityCategory.QUESTION,
  experience: CommunityCategory.EXPERIENCE,
  challenge: CommunityCategory.CHALLENGE,
  tip: CommunityCategory.TIP,
  market: CommunityCategory.MARKET,
};

export const ENUM_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_TO_ENUM).map(([id, value]) => [value, id])
);

/** Fields every author lookup needs — used as a Prisma `select`. */
export const AUTHOR_SELECT = {
  id: true,
  email: true,
  role: true,
  verificationStatus: true,
  profile: { select: { firstName: true, lastName: true } },
};

/**
 * A farmer's display name. Falls back to the local part of their email so a
 * profile that has not been completed yet still renders something sensible.
 */
export function displayName(user) {
  const first = user?.profile?.firstName?.trim() || "";
  const last = user?.profile?.lastName?.trim() || "";
  const full = `${first} ${last}`.trim();

  if (full) return full;
  return user?.email?.split("@")[0] || "Farmer";
}

const ROLE_LABELS = {
  FARMER: "Farmer",
  INVESTOR: "Investor",
  ADMIN: "SFN Team",
  USER: "SFN Member",
};

/**
 * The verified tick reflects an APPROVED verification only — never the role on
 * its own. Verification is a paid SFN service, so it must not be implied.
 */
export function serializeAuthor(user, location) {
  return {
    name: displayName(user),
    location: location ?? "",
    role: ROLE_LABELS[user?.role] || "SFN Member",
    verified: user?.verificationStatus === "APPROVED",
    crops: null,
  };
}

export function serializeComment(comment, viewerId) {
  return {
    id: comment.id,
    mine: viewerId ? comment.authorId === viewerId : false,
    author: {
      name: displayName(comment.author),
      location: "",
      verified: comment.author?.verificationStatus === "APPROVED",
    },
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
  };
}

/**
 * Shapes a post row for the feed. `viewerId` decides likedByMe/saved, so the
 * same row serializes differently per viewer — do not cache this across users.
 */
export function serializePost(post, viewerId) {
  return {
    id: post.id,
    author: serializeAuthor(post.author, post.location),
    category: ENUM_TO_CATEGORY[post.category] || "experience",
    content: post.content,
    tags: post.tags ?? [],
    image: post.image,
    createdAt: post.createdAt.toISOString(),
    likes: post._count?.likes ?? 0,
    mine: viewerId ? post.authorId === viewerId : false,
    likedByMe: viewerId ? (post.likes?.length ?? 0) > 0 : false,
    saved: viewerId ? (post.saves?.length ?? 0) > 0 : false,
    flagged: post.status === "FLAGGED",
    comments: (post.comments ?? []).map((comment) => serializeComment(comment, viewerId)),
  };
}
