import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/prisma";

/** JSON error helper — API routes must never redirect the way authGuard does. */
export function fail(status, message, extra = {}) {
  return Response.json({ error: message, ...extra }, { status });
}

/** Returns the session user, or null for anonymous readers. */
export async function viewer() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

/** Returns the session user or a 401 response — never both. */
export async function requireViewer() {
  const user = await viewer();
  if (!user?.id) {
    return { user: null, response: fail(401, "Sign in to take part in the community.") };
  }
  return { user, response: null };
}

export function isAdmin(user) {
  return user?.role === "ADMIN";
}

/**
 * Write throttle backed by the database rather than process memory, so it still
 * holds when the app runs across several serverless instances.
 */
const THROTTLE = {
  post: { windowMs: 10 * 60 * 1000, max: 5 },
  comment: { windowMs: 5 * 60 * 1000, max: 15 },
  report: { windowMs: 10 * 60 * 1000, max: 10 },
};

export async function throttled(kind, userId) {
  const rule = THROTTLE[kind];
  if (!rule) return false;

  const since = new Date(Date.now() - rule.windowMs);
  const where = { createdAt: { gte: since } };

  const recent =
    kind === "post"
      ? await prisma.communityPost.count({ where: { ...where, authorId: userId } })
      : kind === "comment"
        ? await prisma.communityComment.count({ where: { ...where, authorId: userId } })
        : await prisma.communityReport.count({ where: { ...where, reporterId: userId } });

  return recent >= rule.max;
}

export function tooMany(kind) {
  const minutes = Math.round(THROTTLE[kind].windowMs / 60000);
  return fail(429, `You have hit the limit for now — please wait a few minutes before trying again. (Max ${THROTTLE[kind].max} per ${minutes} minutes.)`);
}
