'use client';

import styles from "@/components/styles/Community.module.css";

/* Deterministic palette so a farmer keeps the same avatar colour everywhere. */
const PALETTE = [
  "#1e7e34",
  "#0d6efd",
  "#6f42c1",
  "#d63384",
  "#fd7e14",
  "#0f766e",
  "#b45309",
  "#4c5f7a",
];

function hashOf(value = "") {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
}

export function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`;
}

export default function FarmerAvatar({ name, size = 44, verified = false }) {
  const background = PALETTE[hashOf(name) % PALETTE.length];

  return (
    <span className={styles.avatarWrap}>
      <span
        className={styles.avatar}
        style={{
          width: size,
          height: size,
          background,
          fontSize: Math.max(11, Math.round(size * 0.36)),
        }}
        aria-hidden="true"
      >
        {initialsOf(name)}
      </span>

      {verified && (
        <span className={styles.verifiedTick} title="Verified farmer">
          <i aria-hidden="true" className="fas fa-check-circle" />
        </span>
      )}

      <span className="visually-hidden">{name}</span>
    </span>
  );
}
