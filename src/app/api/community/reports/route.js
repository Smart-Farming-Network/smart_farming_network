import { prisma } from "@/libs/prisma";
import { fail, isAdmin, requireViewer, throttled, tooMany } from "@/libs/community/guard";
import { validateReport } from "@/libs/community/validate";

/** How many open reports it takes to auto-flag content for admin review. */
const AUTO_FLAG_AT = 2;

/**
 * POST /api/community/reports — report a post or a comment.
 * Body: { postId? , commentId? , reason, note? }
 */
export async function POST(req) {
  const { user, response } = await requireViewer();
  if (response) return response;

  let body;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const result = validateReport(body);
  if (!result.ok) return fail(422, "Please check your report.", { fields: result.errors });

  const { postId, commentId, reason, note } = result.data;

  try {
    if (await throttled("report", user.id)) return tooMany("report");

    // Confirm the target exists before recording anything against it.
    if (postId) {
      const exists = await prisma.communityPost.findUnique({ where: { id: postId }, select: { id: true } });
      if (!exists) return fail(404, "That post no longer exists.");
    }

    if (commentId) {
      const exists = await prisma.communityComment.findUnique({ where: { id: commentId }, select: { id: true } });
      if (!exists) return fail(404, "That reply no longer exists.");
    }

    await prisma.communityReport.create({
      data: { reporterId: user.id, postId, commentId, reason, note },
    });

    // Enough independent reports flags the content for review. It stays visible
    // until an admin decides — reporting must not become a heckler's veto.
    const target = postId ? { postId } : { commentId };
    const openReports = await prisma.communityReport.groupBy({
      by: ["reporterId"],
      where: { ...target, resolvedAt: null },
    });

    if (openReports.length >= AUTO_FLAG_AT) {
      if (postId) {
        await prisma.communityPost.updateMany({
          where: { id: postId, status: "VISIBLE" },
          data: { status: "FLAGGED" },
        });
      } else {
        await prisma.communityComment.updateMany({
          where: { id: commentId, status: "VISIBLE" },
          data: { status: "FLAGGED" },
        });
      }
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[community] failed to record report", error);
    return fail(500, "Could not send that report right now.");
  }
}

/** GET /api/community/reports — admin moderation queue (open reports first). */
export async function GET() {
  const { user, response } = await requireViewer();
  if (response) return response;
  if (!isAdmin(user)) return fail(403, "Moderation is restricted to admins.");

  try {
    const reports = await prisma.communityReport.findMany({
      where: { resolvedAt: null },
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        reporter: { select: { email: true } },
        post: { select: { id: true, content: true, status: true, location: true } },
        comment: { select: { id: true, content: true, status: true, postId: true } },
      },
    });

    return Response.json({ data: reports, meta: { total: reports.length } });
  } catch (error) {
    console.error("[community] failed to load reports", error);
    return fail(500, "Could not load the moderation queue.");
  }
}
