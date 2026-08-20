'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FarmerAvatar from "./FarmerAvatar";
import styles from "@/components/styles/Community.module.css";
import { CATEGORY_META, REPORT_REASONS } from "@/app/data/communityData";
import { timeAgo } from "@/libs/timeAgo";

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PostCard({
  post,
  currentUser,
  onToggleLike,
  onToggleSave,
  onAddComment,
  onShare,
  onSelectTag,
  onReport,
  onDelete,
}) {
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const category = CATEGORY_META[post.category] || CATEGORY_META.experience;
  const isSignedIn = Boolean(currentUser?.signedIn);
  const commentCount = post.comments.length;
  const isOwnPost = Boolean(post.mine);
  const canRemove = isOwnPost || Boolean(currentUser?.isAdmin);

  async function submitComment(event) {
    event.preventDefault();

    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);
    const ok = await onAddComment(post.id, text);
    setSending(false);

    if (ok) {
      setDraft("");
      setShowComments(true);
    }
  }

  async function submitReport(reason) {
    const target = reportTarget;
    setReportTarget(null);
    setMenuOpen(false);
    if (target) await onReport({ ...target, reason });
  }

  return (
    <article className={`${styles.post} ${post.flagged ? styles.postFlagged : ""}`}>
      {/* ---------------------------- AUTHOR ---------------------------- */}
      <header className={styles.postHead}>
        <FarmerAvatar name={post.author.name} verified={post.author.verified} size={46} />

        <div className={styles.postAuthor}>
          <h3 className={styles.authorName}>{post.author.name}</h3>

          <div className={styles.authorMeta}>
            {post.author.role && <span>{post.author.role}</span>}

            {post.author.location && (
              <span>
                <i aria-hidden="true" className="fas fa-map-marker-alt" />
                {post.author.location}
              </span>
            )}

            <span>{timeAgo(post.createdAt)}</span>
          </div>
        </div>

        <span
          className={styles.badge}
          style={{ background: hexToRgba(category.color, 0.12), color: category.color }}
        >
          <i aria-hidden="true" className={category.icon} />
          {category.label.replace(" & Advice", "")}
        </span>

        {isSignedIn && (
          <div className={styles.menuWrap}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Post actions"
            >
              <i aria-hidden="true" className="fas fa-ellipsis-h" />
            </button>

            {menuOpen && (
              <div className={styles.menu} role="menu">
                {!isOwnPost && (
                  <button
                    type="button"
                    className={styles.menuItem}
                    role="menuitem"
                    onClick={() => {
                      setReportTarget({ postId: post.id });
                      setMenuOpen(false);
                    }}
                  >
                    <i aria-hidden="true" className="fas fa-flag" /> Report post
                  </button>
                )}

                {canRemove && (
                  <button
                    type="button"
                    className={`${styles.menuItem} ${styles.menuItemDanger}`}
                    role="menuitem"
                    onClick={() => {
                      setConfirmingDelete(true);
                      setMenuOpen(false);
                    }}
                  >
                    <i aria-hidden="true" className="fas fa-trash" />
                    {isOwnPost ? " Delete my post" : " Hide as admin"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {post.flagged && (
        <p className={styles.flagNotice}>
          <i aria-hidden="true" className="fas fa-exclamation-triangle" /> This post has been reported and is awaiting
          moderator review.
        </p>
      )}

      {/* ----------------------------- BODY ----------------------------- */}
      <div className={styles.postBody}>
        <p className={styles.postText}>{post.content}</p>

        {post.tags?.length > 0 && (
          <div className={styles.tagRow}>
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.tag} ${styles.tagBtn}`}
                onClick={() => onSelectTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {post.image && (
        <div className={styles.postImage}>
          <Image src={post.image} alt="" fill sizes="(max-width: 991px) 100vw, 640px" />
        </div>
      )}

      {/* ------------------------ REPORT / DELETE ------------------------ */}
      {reportTarget && (
        <div className={styles.inlinePanel}>
          <p className={`${styles.hint} fw-bold mb-2`}>
            Why are you reporting this {reportTarget.commentId ? "reply" : "post"}?
          </p>
          <div className={styles.pickerRow}>
            {REPORT_REASONS.map((reason) => (
              <button
                key={reason.id}
                type="button"
                className={styles.pickerChip}
                onClick={() => submitReport(reason.id)}
              >
                {reason.label}
              </button>
            ))}
          </div>
          <button type="button" className={`${styles.commentMetaBtn} mt-2`} onClick={() => setReportTarget(null)}>
            Cancel
          </button>
        </div>
      )}

      {confirmingDelete && (
        <div className={styles.inlinePanel}>
          <p className={`${styles.hint} fw-bold mb-2`}>
            {isOwnPost
              ? "Delete this post permanently? Replies to it will be removed too."
              : "Hide this post from the feed for moderator review?"}
          </p>
          <div className="d-flex gap-2">
            <button
              type="button"
              className={styles.dangerBtn}
              onClick={() => {
                setConfirmingDelete(false);
                onDelete(post.id);
              }}
            >
              {isOwnPost ? "Yes, delete it" : "Yes, hide it"}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={() => setConfirmingDelete(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* --------------------------- REACTIONS --------------------------- */}
      <div className={styles.actionBar}>
        <button
          type="button"
          className={`${styles.action} ${post.likedByMe ? styles.actionLiked : ""}`}
          onClick={() => onToggleLike(post.id)}
          aria-pressed={post.likedByMe}
        >
          <i aria-hidden="true" className={post.likedByMe ? "fas fa-heart" : "far fa-heart"} />
          <span className={styles.actionCount}>{post.likes}</span>
          <span className="d-none d-sm-inline">Helpful</span>
        </button>

        <button
          type="button"
          className={`${styles.action} ${showComments ? styles.actionOn : ""}`}
          onClick={() => setShowComments((prev) => !prev)}
          aria-expanded={showComments}
        >
          <i aria-hidden="true" className="fas fa-comment-dots" />
          <span className={styles.actionCount}>{commentCount}</span>
          <span className="d-none d-sm-inline">{post.category === "question" ? "Answers" : "Replies"}</span>
        </button>

        <button
          type="button"
          className={`${styles.action} ${post.saved ? styles.actionOn : ""}`}
          onClick={() => onToggleSave(post.id)}
          aria-pressed={post.saved}
        >
          <i aria-hidden="true" className={post.saved ? "fas fa-bookmark" : "far fa-bookmark"} />
          <span className="d-none d-sm-inline">{post.saved ? "Saved" : "Save"}</span>
        </button>

        <button type="button" className={styles.action} onClick={() => onShare(post)}>
          <i aria-hidden="true" className="fas fa-share" />
          <span className="d-none d-sm-inline">Share</span>
        </button>
      </div>

      {/* --------------------------- COMMENTS --------------------------- */}
      {showComments && (
        <div className={styles.commentBlock}>
          {isSignedIn ? (
            <form className={styles.commentForm} onSubmit={submitComment}>
              <FarmerAvatar name={currentUser.name} size={34} verified={currentUser.verified} />
              <textarea
                className={styles.commentInput}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  post.category === "question"
                    ? `Answer ${post.author.name.split(" ")[0]}…`
                    : `Reply to ${post.author.name.split(" ")[0]}…`
                }
              />
              <button type="submit" className={styles.primaryBtn} disabled={!draft.trim() || sending}>
                <i aria-hidden="true" className="fas fa-paper-plane" />
                <span className="d-none d-md-inline">{sending ? "Sending…" : "Send"}</span>
              </button>
            </form>
          ) : (
            <p className={`${styles.hint} mb-3`}>
              <Link href="/login" className="fw-bold text-success">
                Sign in
              </Link>{" "}
              to reply to {post.author.name.split(" ")[0]}.
            </p>
          )}

          {commentCount === 0 ? (
            <p className={`${styles.hint} mb-0`}>
              {post.category === "question"
                ? "No answers yet — be the first farmer to help."
                : "No replies yet. Start the conversation."}
            </p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <FarmerAvatar name={comment.author.name} size={34} verified={comment.author.verified} />
                <div>
                  <div className={styles.commentBubble}>
                    <div className={styles.commentName}>{comment.author.name}</div>
                    <p className={styles.commentText}>{comment.content}</p>
                  </div>
                  <div className={styles.commentMeta}>
                    <span>{timeAgo(comment.createdAt)}</span>
                    {isSignedIn && !comment.mine && (
                      <button
                        type="button"
                        className={styles.commentMetaBtn}
                        onClick={() => setReportTarget({ commentId: comment.id })}
                      >
                        Report
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </article>
  );
}
