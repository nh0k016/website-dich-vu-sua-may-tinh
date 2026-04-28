'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/lib/config';

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  const phone = SITE_CONFIG.phone.replace(/\./g, '');
  const zaloUrl = SITE_CONFIG.social.zalo;

  return (
    <>
      <style>{`
        @keyframes ring {
          0%   { transform: rotate(0deg) scale(1); }
          10%  { transform: rotate(-12deg) scale(1.1); }
          20%  { transform: rotate(12deg) scale(1.1); }
          30%  { transform: rotate(-10deg) scale(1.05); }
          40%  { transform: rotate(10deg) scale(1.05); }
          50%  { transform: rotate(-6deg); }
          60%  { transform: rotate(6deg); }
          70%  { transform: rotate(-3deg); }
          80%  { transform: rotate(3deg); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .float-ring {
          animation: ring 2.5s ease-in-out infinite;
        }
        .float-ring:hover {
          animation: none;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: pulse-ring 1.8s ease-out infinite;
        }
        .zalo-pulse::before { background: rgba(0, 106, 255, 0.4); }
        .phone-pulse::before { background: rgba(22, 163, 74, 0.4); }

        .fab-item {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .fab-label {
          transition: all 0.25s ease;
          white-space: nowrap;
        }
      `}</style>

      {/* Wrapper cố định góc phải dưới */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

        {/* Nút Zalo */}
        <div
          className="fab-item flex items-center gap-3"
          style={{
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
            pointerEvents: expanded ? 'auto' : 'none',
            transitionDelay: expanded ? '0.05s' : '0s',
          }}
        >
          <span className="fab-label bg-white text-slate-700 text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-100">
            Chat Zalo
          </span>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Zalo"
            className="pulse-ring zalo-pulse relative flex items-center justify-center w-13 h-13 rounded-full shadow-xl"
            style={{ width: 52, height: 52, background: '#006AFF' }}
          >
            {/* Zalo icon SVG */}
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <text x="4" y="36" fontSize="30" fontWeight="bold" fill="white" fontFamily="Arial">Z</text>
            </svg>
          </a>
        </div>

        {/* Nút Hotline */}
        <div
          className="fab-item flex items-center gap-3"
          style={{
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
            pointerEvents: expanded ? 'auto' : 'none',
            transitionDelay: expanded ? '0s' : '0s',
          }}
        >
          <span className="fab-label bg-white text-slate-700 text-sm font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-100">
            {SITE_CONFIG.phone}
          </span>
          <a
            href={`tel:${phone}`}
            aria-label="Gọi Hotline"
            className="pulse-ring phone-pulse float-ring relative flex items-center justify-center rounded-full shadow-xl"
            style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
          >
            {/* Phone icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
          </a>
        </div>

        {/* Nút Toggle chính */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-label="Liên hệ"
          className="relative flex items-center justify-center rounded-full shadow-2xl focus:outline-none"
          style={{
            width: 58,
            height: 58,
            background: expanded
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #0891b2, #1d4ed8)',
            transition: 'background 0.3s ease',
          }}
        >
          {/* Phone handset / X icon */}
          {expanded ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.25 1.01l-2.32 2.2z"/>
            </svg>
          )}

          {/* Ripple khi đóng */}
          {!expanded && (
            <>
              <span className="absolute inset-0 rounded-full" style={{ background: 'rgba(8,145,178,0.4)', animation: 'pulse-ring 2s ease-out infinite' }} />
              <span className="absolute inset-0 rounded-full" style={{ background: 'rgba(29,78,216,0.25)', animation: 'pulse-ring 2s ease-out 0.6s infinite' }} />
            </>
          )}
        </button>

      </div>
    </>
  );
}
