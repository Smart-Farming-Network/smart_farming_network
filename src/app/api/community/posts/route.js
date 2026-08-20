import { prisma } from "@/libs/prisma";
import { AUTHOR_SELECT, CATEGORY_TO_ENUM, serializePost } from "@/libs/community/serialize";
import { fail, requireViewer, throttled, tooMany, viewer } from "@/libs/community/guard";
import { validatePost } from "@/libs/community/validate";

const MAX_LIMIT = 20;
const COMMENTS_PER_POST = 20;

/**
 * GET /api/community/posts
 *   ?page= &limit= &category= &q= &sort=recent|trending|unanswered &saved=1
 *
 * Anonymous readers get the feed with likedByMe/saved false. HIDDEN posts are
 * never returned; FLAGGED ones stay visible until an admin acts on the report.
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user = await viewer();

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(searchParams.get("limit") || 6)));
  const sort = searchParams.get("sort") || "recent";
  const category = (searchParams.get("category") || "").toLowerCase();
  const q = (searchParams.get("q") || "").trim();
  const savedOnly = searchParams.get("saved") === "1";

  if (savedOnly && !user?.id) {
    return Response.json({ data: [], meta: { total: 0, page: 1, lastPage: 1 } });
  }

  const where = { status: { not: "HIDDEN" } };

  if (CATEGORY_TO_ENUM[category]) where.category = CATEGORY_TO_ENUM[category];
  if (savedOnly) where.saves = { some: { userId: user.id } };

  if (q) {
    where.OR = [
      { content: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { tags: { has: q } },
      { author: { profile: { firstName: { contains: q, mode: "insensitive" } } } },
      { author: { profile: { lastName: { contains: q, mode: "insensitive" } } } },
    ];
  }

  // "trending" and "unanswered" both rank on engagement, which Prisma can only
  // order by via relation counts — hence _count rather than a raw score.
  const orderBy =
    sort === "trending"
      ? [{ likes: { _count: "desc" } }, { comments: { _count: "desc" } }, { createdAt: "desc" }]
      : sort === "unanswered"
        ? [{ comments: { _count: "asc" } }, { createdAt: "desc" }]
        : [{ createdAt: "desc" }];

  try {
    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: { select: AUTHOR_SELECT },
          _count: { select: { likes: true, comments: true } },
          comments: {
            where: { status: { not: "HIDDEN" } },
            orderBy: { createdAt: "asc" },
            take: COMMENTS_PER_POST,
            include: { author: { select: AUTHOR_SELECT } },
          },
          // Presence of the viewer's own row is what drives likedByMe / saved.
          likes: user?.id ? { where: { userId: user.id }, select: { id: true } } : false,
          saves: user?.id ? { where: { userId: user.id }, select: { id: true } } : false,
        },
      }),
      prisma.communityPost.count({ where }),
    ]);

    return Response.json({
      data: posts.map((post) => serializePost(post, user?.id)),
      meta: { total, page, lastPage: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    console.error("[community] failed to list posts", error);
    return fail(500, "Could not load the community feed right now.");
  }
}

/** POST /api/community/posts — create a post as the signed-in farmer. */
export async function POST(req) {
  const { user, response } = await requireViewer();
  if (response) return response;

  let body;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request body.");
  }

  const result = validatePost(body);
  if (!result.ok) return fail(422, "Please check your post.", { fields: result.errors });

  try {
    if (await throttled("post", user.id)) return tooMany("post");

    const created = await prisma.communityPost.create({
      data: { ...result.data, authorId: user.id },
      include: {
        author: { select: AUTHOR_SELECT },
        _count: { select: { likes: true, comments: true } },
        comments: true,
      },
    });

    return Response.json(serializePost(created, user.id), { status: 201 });
  } catch (error) {
    console.error("[community] failed to create post", error);
    return fail(500, "Could not publish your post right now.");
  }
}
