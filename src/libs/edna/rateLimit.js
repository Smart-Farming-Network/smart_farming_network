// Limiter: per-visitor minute window, per-visitor daily quota, and a global daily budget.
// On Vercel (serverless) counters live in Upstash Redis so they are shared across instances.
// Without Redis env vars it falls back to per-instance memory (fine for local dev only).
const minuteHits = new Map();
const dayUsage = new Map();
let global = { day: '', count: 0 };

const today = () => new Date().toISOString().slice(0, 10);

function prune(now) {
  if (minuteHits.size < 5000 && dayUsage.size < 5000) return;
  for (const [k, hits] of minuteHits) if (!hits.some((t) => now - t < 60_000)) minuteHits.delete(k);
  const d = today();
  for (const [k, v] of dayUsage) if (v.day !== d) dayUsage.delete(k);
}

function checkLimitsMemory(key, { perMinuteLimit, perDayLimit, dailyGlobalLimit }) {
  const now = Date.now();
  const day = today();
  prune(now);

  if (global.day !== day) global = { day, count: 0 };
  if (global.count >= dailyGlobalLimit) return { ok: false, reason: 'budget' };

  const hits = (minuteHits.get(key) || []).filter((t) => now - t < 60_000);
  if (hits.length >= perMinuteLimit) {
    return { ok: false, reason: 'rate', retryAfter: Math.ceil((60_000 - (now - hits[0])) / 1000) };
  }

  const usage = dayUsage.get(key);
  const used = usage && usage.day === day ? usage.count : 0;
  if (used >= perDayLimit) return { ok: false, reason: 'daily' };

  hits.push(now);
  minuteHits.set(key, hits);
  dayUsage.set(key, { day, count: used + 1 });
  global.count += 1;
  return { ok: true, remainingToday: perDayLimit - used - 1 };
}

// ── Redis (Upstash REST) ────────────────────────────────────────────────────
const redisUrl = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

async function pipeline(commands) {
  const res = await fetch(`${redisUrl()}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(2500),
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return (await res.json()).map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

async function checkLimitsRedis(key, { perMinuteLimit, perDayLimit, dailyGlobalLimit }) {
  const now = Date.now();
  const day = today();
  const minute = Math.floor(now / 60_000);
  const mKey = `edna:m:${key}:${minute}`;
  const dKey = `edna:d:${day}:${key}`;
  const gKey = `edna:g:${day}`;

  const [minuteCount] = await pipeline([['INCR', mKey], ['EXPIRE', mKey, 70]]);
  if (minuteCount > perMinuteLimit) {
    return { ok: false, reason: 'rate', retryAfter: Math.max(1, 60 - Math.floor((now % 60_000) / 1000)) };
  }

  const [dayCount, globalCount] = await pipeline([
    ['INCR', dKey], ['INCR', gKey], ['EXPIRE', dKey, 90000], ['EXPIRE', gKey, 90000],
  ]);
  if (globalCount > dailyGlobalLimit) return { ok: false, reason: 'budget' };
  if (dayCount > perDayLimit) return { ok: false, reason: 'daily' };
  return { ok: true, remainingToday: perDayLimit - dayCount };
}

export async function checkLimits(key, limits) {
  if (redisUrl() && redisToken()) {
    try {
      return await checkLimitsRedis(key, limits);
    } catch (err) {
      console.error('[edna] Redis limiter failed, using in-memory fallback:', err.message);
    }
  } else if (process.env.VERCEL) {
    console.warn('[edna] No Redis configured on Vercel: rate limits are per-instance and weak.');
  }
  return checkLimitsMemory(key, limits);
}
