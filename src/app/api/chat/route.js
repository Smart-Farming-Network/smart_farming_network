import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { getEdnaConfig } from '@/libs/edna/config';
import { EDNA_SYSTEM_PROMPT } from '@/libs/edna/prompt';
import { checkLimits } from '@/libs/edna/rateLimit';
import { openGeminiStream, sseToTextStream } from '@/libs/edna/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (message, status, extra = {}, headers = {}) =>
  Response.json({ message, ...extra }, { status, headers });

async function visitorKey(req) {
  const session = await getServerSession(authOptions).catch(() => null);
  if (session?.user?.id) return `u:${session.user.id}`;
  const fwd = req.headers.get('x-forwarded-for');
  const ip = fwd?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  return `ip:${ip}`;
}

export async function POST(req) {
  const cfg = getEdnaConfig();

  if (!cfg.enabled || !cfg.apiKey) {
    if (cfg.enabled) console.error('[edna] GEMINI_API_KEY is not set');
    return json("Edna is taking a short break. Please check back soon!", 503, { code: 'disabled' });
  }

  let body;
  try { body = await req.json(); } catch { return json('Invalid request.', 400); }
  if (!Array.isArray(body?.messages)) return json('Invalid request.', 400);

  // Keep only real conversation turns, trim, cap length and history, and make sure we end on a user turn.
  const turns = body.messages
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, cfg.maxInputChars) }))
    .slice(-cfg.maxHistoryMessages);
  while (turns.length && turns[0].role !== 'user') turns.shift(); // Gemini needs the first turn to be the user's

  const last = turns[turns.length - 1];
  if (!last || last.role !== 'user') return json('Please type a question for Edna.', 400);
  if (body.messages[body.messages.length - 1]?.content?.length > cfg.maxInputChars) {
    return json(`Please keep your message under ${cfg.maxInputChars} characters.`, 400, { code: 'too_long' });
  }

  const limit = await checkLimits(await visitorKey(req), cfg);
  if (!limit.ok) {
    const messages = {
      rate: "You're chatting fast! Give me a moment and try again.",
      daily: "You've reached today's chat limit with Edna. Come back tomorrow, or reach us through the Contact page.",
      budget: 'Edna is very busy today. Please try again tomorrow or contact us directly.',
    };
    return json(messages[limit.reason], 429, { code: limit.reason }, limit.retryAfter ? { 'Retry-After': String(limit.retryAfter) } : {});
  }

  const contents = turns.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let upstream;
  try {
    upstream = await openGeminiStream(EDNA_SYSTEM_PROMPT, contents, cfg);
  } catch (err) {
    console.error('[edna] upstream failed:', err?.name, err?.message);
    return json('Edna is having trouble connecting. Please try again shortly.', 502, { code: 'upstream' });
  }

  if (!upstream.ok) {
    console.error('[edna] Gemini error', upstream.status, (await upstream.text()).slice(0, 300));
    const busy = upstream.status === 429 || upstream.status === 503;
    return json(
      busy ? 'Edna is a bit overloaded right now. Please try again in a moment.' : 'Edna is having trouble connecting. Please try again shortly.',
      busy ? 503 : 502,
      { code: 'upstream' }
    );
  }

  const stream = sseToTextStream(upstream, (usage) => {
    if (usage) console.info(`[edna] tokens in=${usage.promptTokenCount} out=${usage.candidatesTokenCount}`);
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no',
      ...(limit.remainingToday !== undefined && { 'X-Edna-Remaining': String(limit.remainingToday) }),
    },
  });
}
