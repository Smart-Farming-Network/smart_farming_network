import { prisma } from "@/libs/prisma";
import { AUTHOR_SELECT, ENUM_TO_CATEGORY, displayName } from "@/libs/community/serialize";
import { fail } from "@/libs/community/guard";

/** Tag tallying reads this many recent posts; enough until the feed is large. */
const TAG_SAMPLE = 500;
const TRENDING_LIMIT = 7;
const CONTRIBUTOR_LIMIT = 4;

/**
 * GET /api/community/stats
 *
 * Every number here is counted from the database. There are no seeded or
 * padded figures: an empty community reports zeros, and the UI hides the
 * counters until they mean something.
 */
export async function GET() {
  try {
    const visible = { status: { not: "HIDDEN" } };

    const [posts, comments, farmers, postAuthors, locations, tagRows, topCommenters, byCategory] = await Promise.all([
      prisma.communityPost.count({ where: visible }),
      prisma.communityComment.count({ where: visible }),
      prisma.user.count({ where: { role: "FARMER" } }),
      prisma.communityPost.groupBy({ by: ["authorId"], where: visible }),
      prisma.communityPost.findMany({ where: visible, select: { location: true }, distinct: ["location"] }),
      prisma.communityPost.findMany({
        where: visible,
        select: { tags: true },
        orderBy: { createdAt: "desc" },
        take: TAG_SAMPLE,
      }),
      prisma.communityComment.groupBy({
        by: ["authorId"],
        where: visible,
        _count: { authorId: true },
        orderBy: { _count: { authorId: "desc" } },
        take: CONTRIBUTOR_LIMIT,
      }),
      prisma.communityPost.groupBy({ by: ["category"], where: visible, _count: { category: true } }),
    ]);

    // Sidebar filter counts, keyed by the lowercase ids the UI uses.
    const categories = { all: posts };
    for (const row of byCategory) {
      const id = ENUM_TO_CATEGORY[row.category];
      if (id) categories[id] = row._count.category;
    }

    // Tag frequency: Postgres arrays cannot be grouped by element through
    // Prisma, so tally the sample in memory.
    const tally = new Map();
    for (const row of tagRows) {
      for (const tag of row.tags ?? []) {
        const key = tag.toLowerCase();
        const entry = tally.get(key) ?? { tag, posts: 0 };
        entry.posts += 1;
        tally.set(key, entry);
      }
    }

    const trending = [...tally.values()]
      .sort((a, b) => b.posts - a.posts || a.tag.localeCompare(b.tag))
      .slice(0, TRENDING_LIMIT);

    // Resolve contributor names in one query rather than per row.
    const contributorIds = topCommenters.map((row) => row.authorId);
    const contributorUsers = contributorIds.length
      ? await prisma.user.findMany({ where: { id: { in: contributorIds } }, select: AUTHOR_SELECT })
      : [];

    const byId = new Map(contributorUsers.map((u) => [u.id, u]));

    const contributors = topCommenters
      .map((row) => {
        const user = byId.get(row.authorId);
        if (!user) return null;
        return {
          name: displayName(user),
          answers: row._count.authorId,
          verified: user.verificationStatus === "APPROVED",
        };
      })
      .filter(Boolean);

    return Response.json({
      counts: {
        posts,
        comments,
        contributors: postAuthors.length,
        farmers,
        locations: locations.filter((row) => row.location?.trim()).length,
      },
      categories,
      trending,
      contributors,
    });
  } catch (error) {
    console.error("[community] failed to load stats", error);
    return fail(500, "Could not load community statistics.");
  }
}
