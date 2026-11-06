// Central Edna configuration. Everything tunable comes from env vars with safe defaults.
const int = (value, fallback) => {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export function getEdnaConfig() {
  return {
    enabled: process.env.EDNA_ENABLED !== 'false',
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.EDNA_MODEL || 'gemini-3.5-flash',
    fallbackModel: process.env.EDNA_FALLBACK_MODEL || 'gemini-3.5-flash-lite',
    thinkingLevel: process.env.EDNA_THINKING_LEVEL || 'minimal',
    maxInputChars: int(process.env.EDNA_MAX_INPUT_CHARS, 1000),
    maxHistoryMessages: int(process.env.EDNA_MAX_HISTORY_MESSAGES, 12),
    maxOutputTokens: int(process.env.EDNA_MAX_OUTPUT_TOKENS, 700),
    perMinuteLimit: int(process.env.EDNA_RATE_LIMIT_PER_MINUTE, 6),
    perDayLimit: int(process.env.EDNA_RATE_LIMIT_PER_DAY, 60),
    dailyGlobalLimit: int(process.env.EDNA_DAILY_GLOBAL_LIMIT, 3000),
    timeoutMs: int(process.env.EDNA_TIMEOUT_MS, 25000),
  };
}
