import { prisma } from "@/libs/prisma";
import { fail, isAdmin, requireViewer } from "@/libs/community/guard";

/**
 * DELETE /api/community/posts/:id
 * A farmer can remove their own post; an admin can remove any post. Admin
 * removals are soft (status HIDDEN) so the row survives for moderation review.
 */
export async function DELETE(_req, { params }) {
  const { user, response } = await requireViewer();
  if (response) return response;

  const { id } = await params;

  try {
    const post = await prisma.communityPost.findUnique({
      where: { id },
      select: { id: true, authorId: true },
    });

    if (!post) return fail(404, "That post no longer exists.");

    const owns = post.authorId === user.id;
    if (!owns && !isAdmin(user)) return fail(403, "You can only remove your own posts.");

    if (owns) {
      await prisma.communityPost.delete({ where: { id } });
      return Response.json({ ok: true, removed: "deleted" });
    }

    await prisma.communityPost.update({ where: { id }, data: { status: "HIDDEN" } });
    return Response.json({ ok: true, removed: "hidden" });
  } catch (error) {
    console.error("[community] failed to delete post", error);
    return fail(500, "Could not remove that post right now.");
  }
}

/**
 * PATCH /api/community/posts/:id — admin moderation only.
 * Body: { status: "VISIBLE" | "FLAGGED" | "HIDDEN" }
 */
const STATUSES = new Set(["VISIBLE", "FLAGGED", "HIDDEN"]);

export async function PATCH(req, { params }) {
  const { user, response } = await requireViewer();
  if (response) return response;
  if (!isAdmin(user)) return fail(403, "Moderation is restricted to admins.");

  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const status = String(body?.status ?? "").toUpperCase();
  if (!STATUSES.has(status)) return fail(422, "Unknown moderation status.");

  try {
    await prisma.communityPost.update({ where: { id }, data: { status } });

    // Clearing a post also resolves its outstanding reports.
    if (status === "VISIBLE") {
      await prisma.communityReport.updateMany({
        where: { postId: id, resolvedAt: null },
        data: { resolvedAt: new Date() },
      });
    }

    return Response.json({ ok: true, status });
  } catch (error) {
    console.error("[community] failed to moderate post", error);
    return fail(500, "Could not update that post right now.");
  }
}
