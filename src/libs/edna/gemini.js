const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

function buildBody(system, contents, cfg) {
  return {
    systemInstruction: { parts: [{ text: system }] },
    contents,
    generationConfig: {
      maxOutputTokens: cfg.maxOutputTokens,
      temperature: 0.6,
      // Short chat answers don't need hidden reasoning tokens eating the output budget (and the bill). Gemini 3 models take a level, not a budget.
      thinkingConfig: { thinkingLevel: cfg.thinkingLevel },
    },
  };
}

async function open(model, body, cfg, signal) {
  return fetch(`${BASE}/${model}:streamGenerateContent?alt=sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.apiKey },
    body: JSON.stringify(body),
    signal,
  });
}

// Opens a streaming response, retrying once on the fallback model for transient errors.
export async function openGeminiStream(system, contents, cfg) {
  const body = buildBody(system, contents, cfg);
  const signal = AbortSignal.timeout(cfg.timeoutMs);
  let res = await open(cfg.model, body, cfg, signal);
  if (!res.ok && RETRYABLE.has(res.status) && cfg.fallbackModel && cfg.fallbackModel !== cfg.model) {
    console.warn(`[edna] ${cfg.model} returned ${res.status}, falling back to ${cfg.fallbackModel}`);
    res = await open(cfg.fallbackModel, body, cfg, signal);
  }
  return res;
}

// Converts Gemini's SSE stream into a plain text ReadableStream.
export function sseToTextStream(upstream, onDone) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  let usage = null;
  let blocked = false;

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      let sent = false;
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            let json;
            try { json = JSON.parse(line.slice(5)); } catch { continue; }
            if (json.usageMetadata) usage = json.usageMetadata;
            const cand = json.candidates?.[0];
            if (cand?.finishReason === 'SAFETY' || json.promptFeedback?.blockReason) blocked = true;
            const text = cand?.content?.parts?.map((p) => p.text || '').join('') || '';
            if (text) { sent = true; controller.enqueue(encoder.encode(text)); }
          }
        }
        if (!sent) {
          controller.enqueue(encoder.encode(
            blocked
              ? "I can't help with that one, but I'm happy to talk farming or SFN!"
              : "I couldn't come up with an answer. Could you rephrase your question?"
          ));
        }
      } catch (err) {
        console.error('[edna] stream error:', err?.message);
        if (!sent) controller.enqueue(encoder.encode('Sorry, I lost my connection. Please try again.'));
      } finally {
        controller.close();
        onDone?.(usage);
      }
    },
  });
}
