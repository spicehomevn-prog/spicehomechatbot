import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SpiceHome — Trợ lý ảo 24/7';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1A1A18', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, background: '#C4773B', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 100px' }}>
          <div style={{ width: 90, height: 90, borderRadius: 999, background: '#C4773B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, color: '#fff', marginBottom: 36, boxShadow: '0 0 0 16px rgba(196,119,59,0.12)' }}>✦</div>
          <div style={{ fontSize: 20, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4773B', marginBottom: 18, display: 'flex' }}>SpiceHome · Virtual Assistant</div>
          <div style={{ fontSize: 68, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', lineHeight: 1.15, marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Trợ Lý Ảo 24/7</div>
          <div style={{ width: 64, height: 2, background: '#C4773B', marginBottom: 24, display: 'flex' }} />
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.58)', textAlign: 'center', display: 'flex' }}>Hỏi chúng mình bất cứ điều gì · Ask us anything</div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'rgba(196,119,59,0.10)', borderTop: '1px solid rgba(196,119,59,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', display: 'flex' }}>124 &amp; 128/4/3 Trần Hữu Trang, Phú Nhuận, TP.HCM</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
