'use client';
import type { GuestMessage, Lang } from '@/lib/types';

const AC = '#C4773B';

const SEARCH_LABEL: Record<string, string> = {
  vi: 'Tìm kiếm trên Google',
  en: 'Search on Google',
  zh: '在 Google 上搜索',
  ja: 'Google で検索',
  ko: 'Google에서 검색',
};

function linkify(text: string): React.ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: AC, textDecoration: 'underline', wordBreak: 'break-all' }}>{part}</a>
      : part
  );
}

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
        <>
          <div className="bubble bubbleBot" style={{ display: 'inline-block', maxWidth: '100%', background: '#fff', border: `1px solid #E8E4DC`, padding: '12px 16px', fontSize: 14, lineHeight: 1.65, color: '#2C2C2A', borderRadius: 18, borderBottomLeftRadius: 4 }}>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{linkify(m.displayText)}</div>
          </div>
          {m.searchQuery && !m.typing && (
            <div style={{ marginTop: 8 }}>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(m.searchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fff', border: `1px solid ${AC}`, color: AC, fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif', borderRadius: 20, textDecoration: 'none', transition: 'background .15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(196,119,59,.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                {SEARCH_LABEL[lang] ?? SEARCH_LABEL.en}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
