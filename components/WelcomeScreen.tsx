'use client';
import type { Lang } from '@/lib/types';

const AC = '#C4773B';
const TINT = 'rgba(196,119,59,.4)';

const T = {
  vi: { sub: 'Xin chào! Chào mừng bạn đến với', title: 'SpiceHome', tag: 'Trợ lý ảo 24/7 — luôn sẵn sàng hỗ trợ bạn.' },
  en: { sub: 'Welcome to', title: 'SpiceHome', tag: '24/7 Virtual Assistant — always here to help.' },
};

export default function WelcomeScreen({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="fullh" style={{ minHeight: 560, background: '#1A1A18', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        <div className="lfade1" style={{ position: 'relative', width: 84, height: 84, margin: '0 auto 32px' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `1px solid ${TINT}`, animation: 'ring 2.8s ease-out infinite' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `1px solid ${TINT}`, animation: 'ring 2.8s ease-out 1.4s infinite' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: AC, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 2.8s ease-in-out infinite' }}>
            <img src="/logo/mark-reverse.svg" alt="SpiceHome" style={{ width: 46, height: 46 }} />
          </div>
        </div>
        <div className="lfade2" style={{ font: '500 11px Inter, sans-serif', letterSpacing: '.22em', textTransform: 'uppercase', color: AC, marginBottom: 14 }}>SpiceHome</div>
        <div className="lfade2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, color: 'rgba(255,255,255,.6)', marginBottom: 6 }}>{t.sub}</div>
        <div className="lfade2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: '#fff', lineHeight: 1.2, marginBottom: 14 }}>{t.title}</div>
        <div className="lfade3" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.52)', lineHeight: 1.6, marginBottom: 32 }}>{t.tag}</div>
        <div className="lfade3" style={{ position: 'relative', width: 180, height: 2, background: 'rgba(255,255,255,.1)', margin: '0 auto', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', top: 0, width: '42%', height: '100%', background: AC, animation: 'flow 1.6s cubic-bezier(.45,0,.25,1) infinite' }} />
        </div>
      </div>
    </div>
  );
}
