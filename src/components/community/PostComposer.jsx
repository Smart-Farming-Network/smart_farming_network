'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import FarmerAvatar from "./FarmerAvatar";
import styles from "@/components/styles/Community.module.css";
import { CATEGORIES } from "@/app/data/communityData";

const POST_TYPES = CATEGORIES.filter((c) => c.id !== "all");
const MAX_LENGTH = 1200;

export default function PostComposer({ currentUser, onPublish }) {
  const [open, setOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [category, setCategory] = useState("experience");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState(currentUser?.location || "");
  const [tagText, setTagText] = useState("");
  const textareaRef = useRef(null);

  const isSignedIn = Boolean(currentUser?.signedIn);
  const canPublish = content.trim().length >= 10 && location.trim().length > 0;

  function expand() {
    setOpen(true);
    // Focus after the textarea is in the tree.
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function reset() {
    setOpen(false);
    setContent("");
    setTagText("");
    setCategory("experience");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canPublish || publishing) return;

    const tags = tagText
      .split(/[,#\s]+/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 4);

    setPublishing(true);

    const published = await onPublish({
      category,
      content: content.trim().slice(0, MAX_LENGTH),
      location: location.trim(),
      tags,
    });

    setPublishing(false);

    // Keep the draft on failure so a farmer never loses what they typed.
    if (published) reset();
  }

  /* ---------- Signed-out state: show the value, then ask for sign-in ---------- */
  if (!isSignedIn) {
    return (
      <div className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.composerRow}>
          <span className={styles.avatar} style={{ width: 44, height: 44, background: "#9aa8a0", fontSize: 15 }}>
            <i aria-hidden="true" className="fas fa-user" />
          </span>
          <div className="flex-grow-1">
            <p className="mb-1 fw-bold" style={{ fontSize: "0.95rem" }}>
              Join the conversation
            </p>
            <p className={`${styles.hint} mb-3`}>
              Sign in to post your harvest results, ask the community a question, or answer a fellow farmer.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link href="/login" className={styles.primaryBtn}>
                <i aria-hidden="true" className="fas fa-paper-plane" /> Sign in to post
              </Link>
              <Link href="/register" className={styles.ghostBtn}>
                Create a farmer account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------- Collapsed trigger ---------------------------- */
  if (!open) {
    return (
      <div className={`${styles.card} ${styles.cardPad}`}>
        <div className={styles.composerRow}>
          <FarmerAvatar name={currentUser.name} verified={currentUser.verified} />
          <button type="button" className={styles.composerTrigger} onClick={expand}>
            Share something with the community, {currentUser.name.split(" ")[0]}…
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-3">
          {POST_TYPES.slice(0, 4).map((type) => (
            <button
              key={type.id}
              type="button"
              className={styles.pickerChip}
              onClick={() => {
                setCategory(type.id);
                expand();
              }}
            >
              <i aria-hidden="true" className={type.icon} style={{ color: type.color, marginRight: 6 }} />
              {type.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------------------- Expanded composer ---------------------------- */
  return (
    <form className={`${styles.card} ${styles.cardPad}`} onSubmit={handleSubmit}>
      <div className={styles.composerRow}>
        <FarmerAvatar name={currentUser.name} verified={currentUser.verified} />
        <div className="flex-grow-1">
          <p className="mb-0 fw-bold" style={{ fontSize: "0.95rem" }}>
            {currentUser.name}
          </p>
          <p className={`${styles.hint} mb-0`}>Posting to the Farmers&apos; Community</p>
        </div>
        <button type="button" className="btn btn-sm btn-link text-muted p-0" onClick={reset} aria-label="Close composer">
          <i aria-hidden="true" className="fas fa-times" />
        </button>
      </div>

      <div className="mt-3">
        <label className={`${styles.hint} fw-bold d-block mb-2`}>What kind of post is this?</label>
        <div className={styles.pickerRow}>
          {POST_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setCategory(type.id)}
              className={`${styles.pickerChip} ${category === type.id ? styles.pickerChipActive : ""}`}
            >
              <i aria-hidden="true" className={type.icon} style={{ marginRight: 6 }} />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <textarea
          ref={textareaRef}
          className={styles.composerArea}
          value={content}
          maxLength={MAX_LENGTH}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            category === "question"
              ? "Ask your question. Include the crop, growth stage, your location and what you have already tried…"
              : "Share what happened on your farm — what you did, what changed, and what other farmers should know…"
          }
        />
        <div className="d-flex justify-content-between align-items-center mt-1">
          <span className={styles.hint}>Minimum 10 characters</span>
          <span className={styles.hint}>
            {content.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className="row g-2 mt-2">
        <div className="col-12 col-sm-6">
          <label className={`${styles.hint} fw-bold d-block mb-1`}>
            <i aria-hidden="true" className="fas fa-map-marker-alt me-1" /> Location
          </label>
          <input
            className={styles.textInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Makurdi, Benue"
          />
        </div>
        <div className="col-12 col-sm-6">
          <label className={`${styles.hint} fw-bold d-block mb-1`}>
            <i aria-hidden="true" className="fas fa-hashtag me-1" /> Tags (up to 4)
          </label>
          <input
            className={styles.textInput}
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
            placeholder="MaizeFarming, SoilHealth"
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">
        <button type="button" className={styles.ghostBtn} onClick={reset}>
          Cancel
        </button>
        <button type="submit" className={styles.primaryBtn} disabled={!canPublish || publishing}>
          <i aria-hidden="true" className="fas fa-paper-plane" />
          {publishing ? " Posting…" : " Post to community"}
        </button>
      </div>
    </form>
  );
}
