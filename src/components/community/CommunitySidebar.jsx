'use client';

import styles from "@/components/styles/Community.module.css";
import { CATEGORIES, COMMUNITY_GUIDELINES } from "@/app/data/communityData";

export default function CommunitySidebar({
  activeCategory,
  counts,
  savedOnly,
  signedIn,
  onSelectCategory,
  onShowSaved,
}) {
  return (
    <div className={styles.sticky}>
      {/* TOPICS */}
      <nav className={`${styles.card} ${styles.cardPad}`} aria-label="Community topics">
        <h2 className={styles.cardTitle}>
          <i aria-hidden="true" className="fas fa-filter" /> Browse Topics
        </h2>

        <ul className={styles.topicList}>
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`${styles.topicBtn} ${activeCategory === category.id ? styles.topicBtnActive : ""}`}
              >
                <i
                  aria-hidden="true"
                  className={category.icon}
                  style={activeCategory === category.id ? { color: category.color } : undefined}
                />
                {category.label}
                {/* Counts come from the database; omitted until stats have loaded. */}
                {typeof counts[category.id] === "number" && (
                  <span className={styles.topicCount}>{counts[category.id]}</span>
                )}
              </button>
            </li>
          ))}

          {signedIn && (
            <li>
              <button
                type="button"
                onClick={onShowSaved}
                className={`${styles.topicBtn} ${savedOnly ? styles.topicBtnActive : ""}`}
              >
                <i aria-hidden="true" className="fas fa-bookmark" />
                Saved Posts
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* GUIDELINES */}
      <div className={`${styles.card} ${styles.cardPad} mt-3`}>
        <h2 className={styles.cardTitle}>
          <i aria-hidden="true" className="fas fa-leaf" /> House Rules
        </h2>
        <ul className={styles.guideList}>
          {COMMUNITY_GUIDELINES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className={`${styles.hint} mb-0 mt-2`}>
          Seen something that breaks these? Use the <i aria-hidden="true" className="fas fa-flag" /> report action on
          the post.
        </p>
      </div>
    </div>
  );
}
