import { prisma } from "@/libs/prisma";
import { AUTHOR_SELECT, serializeComment } from "@/libs/community/serialize";
import { fail, requireViewer, throttled, tooMany } from "@/libs/community/guard";
import { validateComment } from "@/libs/community/validate";

/** POST /api/community/posts/:id/comments — reply to a post. */
export async function POST(req, { params }) {
  const { user, response } = await requireViewer();
  if (response) return response;

  const { id } = await params;

  let body;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const result = validateComment(body);
  if (!result.ok) return fail(422, "Please check your reply.", { fields: result.errors });

  try {
    const post = await prisma.communityPost.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!post || post.status === "HIDDEN") return fail(404, "That post is no longer available.");

    if (await throttled("comment", user.id)) return tooMany("comment");

    const comment = await prisma.communityComment.create({
      data: { postId: id, authorId: user.id, content: result.data.content },
      include: { author: { select: AUTHOR_SELECT } },
    });

    return Response.json(serializeComment(comment, user.id), { status: 201 });
  } catch (error) {
    console.error("[community] failed to add comment", error);
    return fail(500, "Could not post your reply right now.");
  }
}
