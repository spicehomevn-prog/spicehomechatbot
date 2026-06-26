'use client';
import type { Lang } from '@/lib/types';

const AC = '#C4773B';

export default function LangSelect({ onSelect }: { onSelect: (lang: Lang) => void }) {
  return (
    <div style={{ height: '100vh', minHeight: 580, background: '#1A1A18', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', maxWidth: 420, width: '100%' }}>

        {/* Icon */}
        <div className="lfade1" style={{ position: 'relative', width: 76, height: 76, margin: '0 auto 32px' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `1px solid rgba(196,119,59,.4)`, animation: 'ring 2.8s ease-out infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `1px solid rgba(196,119,59,.4)`, animation: 'ring 2.8s ease-out 1.4s infinite' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: AC, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, animation: 'breathe 2.8s ease-in-out infinite' }}>✦</div>
        </div>

        {/* SpiceHome label */}
        <div className="lfade1" style={{ font: '500 11px Inter, sans-serif', letterSpacing: '.22em', textTransform: 'uppercase', color: AC, marginBottom: 18 }}>SpiceHome</div>

        {/* Bilingual heading */}
        <div className="lfade2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>
          Chọn ngôn ngữ
        </div>
        <div className="lfade2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 20, color: 'rgba(255,255,255,.55)', marginBottom: 10 }}>
          Choose language
        </div>
        <div className="lfade2" style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', marginBottom: 40, letterSpacing: '.04em' }}>
          Ngôn ngữ giao diện · Interface language
        </div>

        {/* Language buttons */}
        <div className="lfade3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSelect('vi')}
            className="langcard"
            style={{
              cursor: 'pointer', border: `1px solid rgba(196,119,59,.35)`,
              background: 'rgba(196,119,59,.08)', color: '#fff',
              padding: '20px 36px', minWidth: 160,
              fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 4px 20px rgba(0,0,0,.3)',
            }}
          >
            <span style={{ fontSize: 26 }}>🇻🇳</span>
            <span>Tiếng Việt</span>
          </button>

          <button
            onClick={() => onSelect('en')}
            className="langcard"
            style={{
              cursor: 'pointer', border: `1px solid rgba(196,119,59,.35)`,
              background: 'rgba(196,119,59,.08)', color: '#fff',
              padding: '20px 36px', minWidth: 160,
              fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 4px 20px rgba(0,0,0,.3)',
            }}
          >
            <span style={{ fontSize: 26 }}>🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        <div className="lfade3" style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', marginTop: 44 }}>
          SpiceHome · 124 &amp; 128/4/3 Trần Hữu Trang, Phú Nhuận
        </div>
      </div>
    </div>
  );
}
