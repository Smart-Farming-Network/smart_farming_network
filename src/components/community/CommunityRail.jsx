'use client';

import Link from "next/link";
import FarmerAvatar from "./FarmerAvatar";
import styles from "@/components/styles/Community.module.css";

/**
 * Right-hand rail. Trending tags and contributor rankings are computed from the
 * database in /api/community/stats — each card hides itself when there is not
 * yet enough real activity to rank, rather than showing placeholder entries.
 */
export default function CommunityRail({ stats, onSelectTag }) {
  const trending = stats?.trending ?? [];
  const contributors = stats?.contributors ?? [];

  return (
    <div className={styles.sticky}>
      {trending.length > 0 && (
        <div className={`${styles.card} ${styles.cardPad}`}>
          <h2 className={styles.cardTitle}>
            <i aria-hidden="true" className="fas fa-fire" /> Most Used Tags
          </h2>

          <div className="d-flex flex-wrap gap-2">
            {trending.map((topic) => (
              <button
                key={topic.tag}
                type="button"
                className={`${styles.tag} ${styles.tagBtn}`}
                onClick={() => onSelectTag(topic.tag)}
                title={`${topic.posts} ${topic.posts === 1 ? "post" : "posts"}`}
              >
                #{topic.tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {contributors.length > 0 && (
        <div className={`${styles.card} ${styles.cardPad} ${trending.length > 0 ? "mt-3" : ""}`}>
          <h2 className={styles.cardTitle}>
            <i aria-hidden="true" className="fas fa-users" /> Most Helpful Farmers
          </h2>

          {contributors.map((farmer) => (
            <div key={farmer.name} className={styles.rankRow}>
              <FarmerAvatar name={farmer.name} size={38} verified={farmer.verified} />
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <p className={styles.rankName}>{farmer.name}</p>
                <p className={styles.rankMeta}>
                  {farmer.answers} {farmer.answers === 1 ? "reply" : "replies"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Always present: real SFN services, no invented events. */}
      <div className={`${styles.card} ${styles.cardPad} ${trending.length > 0 || contributors.length > 0 ? "mt-3" : ""}`}>
        <h2 className={styles.cardTitle}>
          <i aria-hidden="true" className="fas fa-tractor" /> Beyond The Feed
        </h2>

        <p className={`${styles.hint} mb-3`}>
          The community answers questions. These SFN services do the work alongside it.
        </p>

        <div className="d-flex flex-column gap-2">
          <Link href="/services" className={`${styles.ghostBtn} text-center`}>
            Training &amp; advisory
          </Link>
          <Link href="/market-place" className={`${styles.ghostBtn} text-center`}>
            Buy &amp; sell in the marketplace
          </Link>
          <Link href="/contact" className={`${styles.ghostBtn} text-center`}>
            Talk to the SFN team
          </Link>
        </div>
      </div>
    </div>
  );
}
