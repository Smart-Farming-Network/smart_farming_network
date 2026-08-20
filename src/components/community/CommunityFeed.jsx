'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import CommunityRail from "./CommunityRail";
import CommunitySidebar from "./CommunitySidebar";
import PostCard from "./PostCard";
import PostComposer from "./PostComposer";
import styles from "@/components/styles/Community.module.css";
import { ADVICE_DISCLAIMER, CATEGORIES, SORT_OPTIONS } from "@/app/data/communityData";
import {
  createComment,
  createPost,
  deletePost,
  fetchPosts,
  fetchStats,
  reportContent,
  toggleLike,
  toggleSave,
} from "./api";

const PAGE_SIZE = 6;
const SEARCH_DEBOUNCE_MS = 350;

export default function CommunityFeed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, lastPage: 1, total: 0 });
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [savedOnly, setSavedOnly] = useState(false);
  const [toast, setToast] = useState("");

  // Guards against a slow first page landing after a newer filter has been applied.
  const requestId = useRef(0);
  const toastTimer = useRef(null);

  const flash = useCallback((message) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3200);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
  }, []);

  /* -------------------------- search debouncing -------------------------- */
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  /* ------------------------------ load feed ------------------------------ */
  const loadFeed = useCallback(async () => {
    const id = ++requestId.current;

    setLoading(true);
    setError("");

    const result = await fetchPosts({
      page: 1,
      limit: PAGE_SIZE,
      category,
      q: debouncedQuery,
      sort,
      savedOnly,
    });

    if (id !== requestId.current) return; // a newer request has taken over

    if (!result.ok) {
      setError(result.error);
      setPosts([]);
    } else {
      setPosts(result.data.data);
      setMeta(result.data.meta);
    }

    setLoading(false);
  }, [category, debouncedQuery, sort, savedOnly]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const loadStats = useCallback(async () => {
    const result = await fetchStats();
    if (result.ok) setStats(result.data);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  async function handleLoadMore() {
    if (loadingMore || meta.page >= meta.lastPage) return;

    setLoadingMore(true);

    const result = await fetchPosts({
      page: meta.page + 1,
      limit: PAGE_SIZE,
      category,
      q: debouncedQuery,
      sort,
      savedOnly,
    });

    if (result.ok) {
      // De-duplicate: a post created between page loads can shift paging.
      setPosts((prev) => {
        const seen = new Set(prev.map((post) => post.id));
        return [...prev, ...result.data.data.filter((post) => !seen.has(post.id))];
      });
      setMeta(result.data.meta);
    } else {
      flash(result.error);
    }

    setLoadingMore(false);
  }

  /* ------------------------------ mutations ------------------------------ */
  function patchPost(id, patch) {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, ...patch } : post)));
  }

  async function handleToggleLike(id) {
    if (!currentUser.signedIn) return flash("Sign in to mark a post as helpful.");

    const post = posts.find((p) => p.id === id);
    if (!post) return;

    // Optimistic, then reconciled with the server's authoritative count.
    patchPost(id, { likedByMe: !post.likedByMe, likes: post.likes + (post.likedByMe ? -1 : 1) });

    const result = await toggleLike(id);

    if (!result.ok) {
      patchPost(id, { likedByMe: post.likedByMe, likes: post.likes });
      flash(result.error);
      return;
    }

    patchPost(id, { likedByMe: result.data.active, likes: result.data.total });
  }

  async function handleToggleSave(id) {
    if (!currentUser.signedIn) return flash("Sign in to save posts.");

    const post = posts.find((p) => p.id === id);
    if (!post) return;

    patchPost(id, { saved: !post.saved });

    const result = await toggleSave(id);

    if (!result.ok) {
      patchPost(id, { saved: post.saved });
      flash(result.error);
      return;
    }

    patchPost(id, { saved: result.data.active });
    flash(result.data.active ? "Saved to your posts" : "Removed from saved posts");

    // The saved filter is a server query, so drop the row when it no longer matches.
    if (savedOnly && !result.data.active) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    }
  }

  async function handleAddComment(id, content) {
    if (!currentUser.signedIn) return flash("Sign in to reply.");

    const result = await createComment(id, content);

    if (!result.ok) {
      flash(result.error);
      return false;
    }

    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, comments: [...post.comments, result.data] } : post))
    );

    return true;
  }

  async function handlePublish(payload) {
    const result = await createPost(payload);

    if (!result.ok) {
      flash(result.fields ? Object.values(result.fields)[0] : result.error);
      return false;
    }

    // Reset to a view where the new post is actually visible.
    setCategory("all");
    setSavedOnly(false);
    setQuery("");
    setSort("recent");
    setPosts((prev) => [result.data, ...prev]);
    setMeta((prev) => ({ ...prev, total: prev.total + 1 }));
    loadStats();
    flash("Your post is live in the community");

    return true;
  }

  async function handleDelete(id) {
    const result = await deletePost(id);

    if (!result.ok) {
      flash(result.error);
      return;
    }

    setPosts((prev) => prev.filter((post) => post.id !== id));
    setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    loadStats();
    flash("Post removed");
  }

  async function handleReport({ postId, commentId, reason, note }) {
    const result = await reportContent({ postId, commentId, reason, note });

    if (!result.ok) {
      flash(result.error);
      return false;
    }

    flash("Thank you — this has been sent to the moderators.");
    return true;
  }

  async function handleShare(post) {
    const url = `${window.location.origin}/community#${post.id}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: `${post.author.name} on SFN Community`, text: post.content.slice(0, 120), url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flash("Post link copied");
    } catch {
      flash("Could not share this post");
    }
  }

  function handleSelectTag(tag) {
    setQuery(tag);
    setSavedOnly(false);
    setCategory("all");
    window.scrollTo({ top: 260, behavior: "smooth" });
  }

  function handleSelectCategory(next) {
    setCategory(next);
    setSavedOnly(false);
  }

  /* -------------------------------- render -------------------------------- */
  const counts = stats?.categories ?? {};
  const hasActivity = (stats?.counts?.posts ?? 0) > 0;

  const activeFilterLabel = savedOnly
    ? "Saved posts"
    : CATEGORIES.find((item) => item.id === category)?.label ?? "All Posts";

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroEyebrow}>
            <i aria-hidden="true" className="fas fa-users" /> SFN Farmers&apos; Community
          </span>

          <h1 className={styles.heroTitle}>
            Farming is hard alone.
            <br />
            It is easier together.
          </h1>

          <p className={styles.heroText}>
            Ask questions, share what worked on your farm this season, talk through the challenges, and learn from
            farmers across Nigeria who are solving the same problems you are.
          </p>

          {/* Counters appear only once there is real activity to count. */}
          {hasActivity && (
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stats.counts.posts.toLocaleString()}</span>
                <span className={styles.heroStatLabel}>Discussions</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stats.counts.comments.toLocaleString()}</span>
                <span className={styles.heroStatLabel}>Replies</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stats.counts.contributors.toLocaleString()}</span>
                <span className={styles.heroStatLabel}>Farmers posting</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>{stats.counts.locations.toLocaleString()}</span>
                <span className={styles.heroStatLabel}>Locations</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------ CONTENT ------------------------------ */}
      <div className={`container ${styles.shell}`}>
        <div className="row g-3 g-lg-4">
          {/* LEFT — topics (desktop only) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <CommunitySidebar
              activeCategory={savedOnly ? null : category}
              counts={counts}
              savedOnly={savedOnly}
              signedIn={currentUser.signedIn}
              onSelectCategory={handleSelectCategory}
              onShowSaved={() => setSavedOnly(true)}
            />
          </aside>

          {/* CENTRE — composer + filters + feed */}
          <main className="col-12 col-lg-6">
            <PostComposer currentUser={currentUser} onPublish={handlePublish} />

            {/* Mobile topic rail */}
            <div className={`${styles.topicRail} d-lg-none mt-3`}>
              {CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.id)}
                  className={`${styles.topicChip} ${!savedOnly && category === item.id ? styles.topicChipActive : ""}`}
                >
                  <i aria-hidden="true" className={item.icon} style={{ marginRight: 6 }} />
                  {item.label}
                </button>
              ))}
              {currentUser.signedIn && (
                <button
                  type="button"
                  onClick={() => setSavedOnly(true)}
                  className={`${styles.topicChip} ${savedOnly ? styles.topicChipActive : ""}`}
                >
                  <i aria-hidden="true" className="fas fa-bookmark" style={{ marginRight: 6 }} />
                  Saved
                </button>
              )}
            </div>

            {/* Search + sort */}
            <div className={`${styles.card} ${styles.cardPad} mt-3`}>
              <div className="d-flex flex-wrap gap-2">
                <div className={styles.searchWrap}>
                  <i aria-hidden="true" className="fas fa-search" />
                  <input
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts, farmers, crops or tags…"
                    aria-label="Search the community"
                  />
                </div>

                <select
                  className={styles.sortSelect}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort posts"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className={`${styles.hint} mb-0 mt-2`}>
                {loading ? (
                  "Loading posts…"
                ) : (
                  <>
                    Showing <strong>{posts.length}</strong> of <strong>{meta.total}</strong>{" "}
                    {meta.total === 1 ? "post" : "posts"} in <strong>{activeFilterLabel}</strong>
                    {debouncedQuery.trim() && (
                      <>
                        {" "}
                        for “{debouncedQuery.trim()}”{" "}
                        <button type="button" className={styles.commentMetaBtn} onClick={() => setQuery("")}>
                          clear
                        </button>
                      </>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* Advice disclaimer — kept above the feed, not buried in the footer. */}
            <p className={`${styles.disclaimer} mt-3`}>
              <i aria-hidden="true" className="fas fa-info-circle" /> {ADVICE_DISCLAIMER}
            </p>

            {/* Feed */}
            <div className="d-flex flex-column gap-3 mt-3">
              {loading && (
                <div className={`${styles.card} ${styles.empty}`}>
                  <span className="spinner-border text-success" role="status" aria-label="Loading posts" />
                </div>
              )}

              {!loading && error && (
                <div className={`${styles.card} ${styles.empty}`}>
                  <span className={styles.emptyIcon}>
                    <i aria-hidden="true" className="fas fa-exclamation-triangle" />
                  </span>
                  <h3 className="fw-bold h5">Could not load the feed</h3>
                  <p className={`${styles.hint} mb-3`}>{error}</p>
                  <button type="button" className={styles.primaryBtn} onClick={loadFeed}>
                    Try again
                  </button>
                </div>
              )}

              {!loading &&
                !error &&
                posts.map((post) => (
                  <div key={post.id} id={post.id}>
                    <PostCard
                      post={post}
                      currentUser={currentUser}
                      onToggleLike={handleToggleLike}
                      onToggleSave={handleToggleSave}
                      onAddComment={handleAddComment}
                      onShare={handleShare}
                      onSelectTag={handleSelectTag}
                      onReport={handleReport}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}

              {!loading && !error && posts.length === 0 && (
                <div className={`${styles.card} ${styles.empty}`}>
                  <span className={styles.emptyIcon}>
                    <i aria-hidden="true" className="fas fa-seedling" />
                  </span>

                  {savedOnly ? (
                    <>
                      <h3 className="fw-bold h5">No saved posts yet</h3>
                      <p className={`${styles.hint} mb-3`}>
                        Tap the bookmark on any post to keep it here for later.
                      </p>
                    </>
                  ) : debouncedQuery.trim() || category !== "all" ? (
                    <>
                      <h3 className="fw-bold h5">Nothing matches this filter</h3>
                      <p className={`${styles.hint} mb-3`}>Try another topic or clear your search.</p>
                    </>
                  ) : (
                    <>
                      <h3 className="fw-bold h5">This community is just starting</h3>
                      <p className={`${styles.hint} mb-3`}>
                        No one has posted yet. Ask the question you need answered, or share what happened on your farm
                        this season — the first post is what gets a community going.
                      </p>
                    </>
                  )}

                  {(savedOnly || debouncedQuery.trim() || category !== "all") && (
                    <button
                      type="button"
                      className={styles.primaryBtn}
                      onClick={() => {
                        setSavedOnly(false);
                        setCategory("all");
                        setQuery("");
                      }}
                    >
                      Show all posts
                    </button>
                  )}
                </div>
              )}
            </div>

            {!loading && !error && meta.page < meta.lastPage && (
              <div className="text-center mt-4">
                <button type="button" className={styles.ghostBtn} onClick={handleLoadMore} disabled={loadingMore}>
                  {loadingMore ? "Loading…" : "Load more posts"}
                </button>
              </div>
            )}
          </main>

          {/* RIGHT — trending / contributors */}
          <aside className="col-12 col-lg-3">
            <CommunityRail stats={stats} onSelectTag={handleSelectTag} />
          </aside>
        </div>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}
    </>
  );
}
