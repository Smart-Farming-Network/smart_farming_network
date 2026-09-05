'use client';

/**
 * Thin client for /api/community/*. Every call resolves to { ok, data, error }
 * so callers never have to branch on exceptions versus HTTP status.
 */
async function request(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      ...options,
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: payload?.error || "Something went wrong. Please try again.",
        fields: payload?.fields || null,
      };
    }

    return { ok: true, status: res.status, data: payload };
  } catch {
    return { ok: false, status: 0, error: "You appear to be offline. Check your connection and try again." };
  }
}

export function fetchPosts({ page = 1, limit = 6, category = "all", q = "", sort = "recent", savedOnly = false } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), sort });

  if (category && category !== "all") params.set("category", category);
  if (q.trim()) params.set("q", q.trim());
  if (savedOnly) params.set("saved", "1");

  return request(`/api/community/posts?${params.toString()}`);
}

export function fetchStats() {
  return request("/api/community/stats");
}

export function createPost(body) {
  return request("/api/community/posts", { method: "POST", body: JSON.stringify(body) });
}

export function deletePost(id) {
  return request(`/api/community/posts/${id}`, { method: "DELETE" });
}

export function createComment(postId, content) {
  return request(`/api/community/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function toggleLike(postId) {
  return request(`/api/community/posts/${postId}/like`, { method: "POST" });
}

export function toggleSave(postId) {
  return request(`/api/community/posts/${postId}/save`, { method: "POST" });
}

export function reportContent({ postId, commentId, reason, note }) {
  return request("/api/community/reports", {
    method: "POST",
    body: JSON.stringify({ postId, commentId, reason, note }),
  });
}
