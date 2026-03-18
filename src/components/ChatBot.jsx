'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const IMG = '/assets/img/edna.jpg';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm Edna 👋 your Smart Farming Network assistant. I can help with farming tips, the SFN platform, market insights, and more. How can I help you today?",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ─────────────────────────────────────────────── */
  /*  Shared panel colors (reused in the tail)       */
  const panelBg     = 'rgba(15, 15, 15, 0.55)';
  const tailBg      = 'rgba(0, 0, 0, 0.45)';   // matches input footer
  const borderColor = 'rgba(255,255,255,0.18)';
  /* ─────────────────────────────────────────────── */

  return (
    <>
      {/* ══════════════════════════════════════════ */}
      {/*  CHAT PANEL  (wrapper keeps tail aligned)  */}
      {/* ══════════════════════════════════════════ */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '94px',   /* sits just above the 62px button + 20px bottom gap + 12px tail */
            right: '20px',
            width: '360px',
            zIndex: 999999,
          }}
        >
          {/* ── Speech-bubble tail (arrow pointing down-right toward button) ── */}
          <div
            style={{
              position: 'absolute',
              bottom: -9,
              right: 22,       /* aligns over the centre of the 62px button */
              width: 18,
              height: 18,
              background: tailBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              transform: 'rotate(45deg)',
              borderRight: `1px solid ${borderColor}`,
              borderBottom: `1px solid ${borderColor}`,
              zIndex: 1,       /* behind the panel (panel is z:2) */
            }}
          />

          {/* ── Main panel ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '520px',
              background: panelBg,
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '20px',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 14px',
                background: 'rgba(22, 80, 32, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${borderColor}`,
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', width: 42, height: 42, flexShrink: 0 }}>
                <Image
                  src={IMG}
                  alt="Edna"
                  fill
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2.5px solid rgba(255,255,255,0.65)',
                  }}
                />
                {/* Online dot */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 1,
                    right: 1,
                    width: 10,
                    height: 10,
                    background: '#4caf50',
                    borderRadius: '50%',
                    border: '2px solid #165020',
                    display: 'block',
                  }}
                />
              </div>

              {/* Name / status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Edna
                </div>
                <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 11.5 }}>
                  SFN AI Assistant · Online
                </div>
              </div>

              {/* ── Close button ── */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  /* Reset any inherited Bootstrap styles */
                  all: 'unset',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  minWidth: 30,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  lineHeight: 1,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.32)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
              >
                ✕
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.15) transparent',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: 8,
                  }}
                >
                  {/* Edna avatar beside assistant bubbles */}
                  {msg.role === 'assistant' && (
                    <div style={{ position: 'relative', width: 26, height: 26, flexShrink: 0 }}>
                      <Image
                        src={IMG}
                        alt="Edna"
                        fill
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'rgba(28, 110, 46, 0.80)'
                          : 'rgba(255, 255, 255, 0.14)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.18)'}`,
                      borderRadius:
                        msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      padding: '10px 13px',
                      maxWidth: '78%',
                      color: '#fff',
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ position: 'relative', width: 26, height: 26, flexShrink: 0 }}>
                    <Image src={IMG} alt="Edna" fill style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: `1px solid rgba(255,255,255,0.18)`,
                      borderRadius: '18px 18px 18px 4px',
                      padding: '12px 16px',
                      display: 'flex',
                      gap: 5,
                      alignItems: 'center',
                    }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        style={{
                          width: 7,
                          height: 7,
                          background: 'rgba(255,255,255,0.7)',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'sfn-bounce 1.2s infinite',
                          animationDelay: `${d * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input bar ── */}
            <div
              style={{
                padding: '10px 11px',
                background: 'rgba(0,0,0,0.45)',
                borderTop: `1px solid ${borderColor}`,
                display: 'flex',
                gap: 8,
                alignItems: 'flex-end',
                flexShrink: 0,
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Edna anything about farming..."
                rows={1}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.10)',
                  border: `1px solid rgba(255,255,255,0.22)`,
                  borderRadius: 13,
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: 13.5,
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.4,
                  maxHeight: 96,
                  overflowY: 'auto',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  all: 'unset',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background:
                    loading || !input.trim()
                      ? 'rgba(28,100,40,0.3)'
                      : 'rgba(28,120,46,0.9)',
                  border: `1px solid rgba(255,255,255,0.2)`,
                  color: '#fff',
                  fontSize: 16,
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/*  FLOATING TOGGLE BUTTON                    */}
      {/* ══════════════════════════════════════════ */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Chat with Edna"
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 62,
          height: 62,
          borderRadius: '50%',
          border: '3px solid #2e7d32',
          background: '#fff',
          cursor: 'pointer',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          zIndex: 999999,
          display: 'block',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
        }}
      >
        <Image
          src={IMG}
          alt="Chat with Edna"
          width={62}
          height={62}
          style={{ objectFit: 'cover', display: 'block' }}
        />
      </button>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes sfn-bounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.45; }
          40%            { transform: translateY(-5px); opacity: 1;    }
        }
      `}</style>
    </>
  );
}
