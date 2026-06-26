'use client';
import type { Lang } from '@/lib/types';
import { PROPERTIES } from '@/lib/properties';

const AC = '#C4773B';

const T = {
  vi: { heading: 'Bạn đang ở cơ sở nào?', sub: 'Chọn để bắt đầu trò chuyện với trợ lý ảo' },
  en: { heading: 'Which property are you staying at?', sub: 'Tap to start chatting with our virtual assistant' },
};

export default function PropertySelect({ lang, onSelect }: { lang: Lang; onSelect: (id: 'cs1' | 'cs2') => void }) {
  const t = T[lang];
  return (
    <div className="fullh" style={{ background: '#FAFAF8', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ background: '#1A1A18', padding: '28px 24px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <img src="/logo/mark-reverse.svg" alt="SpiceHome" style={{ width: 28, height: 28 }} />
          <span style={{ font: '500 11px Inter, sans-serif', letterSpacing: '.2em', textTransform: 'uppercase', color: AC }}>SpiceHome</span>
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>{t.heading}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{t.sub}</div>
      </div>

      {/* Property cards */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, padding: '32px 20px', maxWidth: 560, width: '100%', margin: '0 auto', alignItems: 'stretch' }}>
        {PROPERTIES.map((prop, i) => (
          <div
            key={prop.id}
            onClick={() => onSelect(prop.id)}
            className="propcard lfade2"
            style={{
              cursor: 'pointer', background: '#fff', border: '1px solid #E8E4DC',
              padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 18,
              boxShadow: '0 4px 24px rgba(26,26,24,.08)',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {/* Monogram */}
            <div style={{ width: 52, height: 52, borderRadius: 999, background: AC, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 18px Inter, sans-serif', flex: 'none' }}>
              {prop.mono}
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A18', marginBottom: 4 }}>{prop.name}</div>
              <div style={{ fontSize: 12.5, color: '#7A7A72', lineHeight: 1.4 }}>📍 {prop.address}</div>
            </div>
            {/* Arrow */}
            <div style={{ fontSize: 20, color: AC, flex: 'none' }}>›</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '0 20px 28px', fontSize: 12, color: '#9C9384' }}>
        SpiceHome · Phú Nhuận, TP.HCM
      </div>
    </div>
  );
}
