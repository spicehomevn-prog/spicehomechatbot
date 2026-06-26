'use client';
import type { GuestMessage, Lang } from '@/lib/types';

const AC = '#C4773B';

interface Props {
  m: GuestMessage;
  lang: Lang;
}

export default function MessageBubble({ m, lang }: Props) {
  const thinking = m.typing && !m.displayText;

  if (m.role === 'guest') {
    return (
      <div className="msg" style={{ alignSelf: 'flex-end', maxWidth: '82%' }}>
        <div className="bubble bubbleGuest" style={{ background: '#1A1A18', color: '#fff', padding: '12px 16px', fontSize: 14, lineHeight: 1.55, borderRadius: 18, borderBottomRightRadius: 4 }}>
          <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
        </div>
      </div>
    );
  }

  // Bot bubble
  return (
    <div className="msg" style={{ alignSelf: 'flex-start', maxWidth: '88%', width: '100%' }}>
      {/* Bot label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: 999, background: AC, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <img src="/logo/mark-reverse.svg" alt="" style={{ width: 14, height: 14 }} />
        </div>
        <span style={{ font: '500 11px Inter, sans-serif', letterSpacing: '.1em', textTransform: 'uppercase', color: AC }}>SpiceHome</span>
      </div>

      {thinking ? (
        <div style={{ display: 'inline-flex', gap: 5, padding: '14px 18px', background: '#fff', border: '1px solid #E8E4DC', borderRadius: 18, borderBottomLeftRadius: 4, alignItems: 'center' }}>
          <span className="tdot" /><span className="tdot" /><span className="tdot" />
        </div>
      ) : (
        <div className="bubble bubbleBot" style={{ display: 'inline-block', maxWidth: '100%', background: '#fff', border: `1px solid #E8E4DC`, padding: '12px 16px', fontSize: 14, lineHeight: 1.65, color: '#2C2C2A', borderRadius: 18, borderBottomLeftRadius: 4 }}>
          <div style={{ whiteSpace: 'pre-wrap' }}>{m.displayText}</div>
        </div>
      )}
    </div>
  );
}
