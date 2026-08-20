import { prisma } from "@/libs/prisma";
import { fail, requireViewer } from "@/libs/community/guard";

/**
 * POST /api/community/posts/:id/like — idempotent toggle.
 * The unique [postId, userId] index is what makes a double-tap safe: we either
 * delete the existing row or create the missing one, never stack duplicates.
 */
export async function POST(_req, { params }) {
  const { user, response } = await requireViewer();
  if (response) return response;

  const { id } = await params;

  try {
    const post = await prisma.communityPost.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!post || post.status === "HIDDEN") return fail(404, "That post is no longer available.");

    const existing = await prisma.communityPostLike.findUnique({
      where: { postId_userId: { postId: id, userId: user.id } },
      select: { id: true },
    });

    if (existing) {
      await prisma.communityPostLike.delete({ where: { id: existing.id } });
    } else {
      await prisma.communityPostLike.create({ data: { postId: id, userId: user.id } });
    }

    const total = await prisma.communityPostLike.count({ where: { postId: id } });

    return Response.json({ active: !existing, total });
  } catch (error) {
    console.error("[community] failed to toggle like", error);
    return fail(500, "Could not save that action right now.");
  }
}
