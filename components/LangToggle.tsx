'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/types';

const AC = '#C4773B';

const LANGS: { id: Lang; flag: string; label: string }[] = [
  { id: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
  { id: 'en', flag: '🇬🇧', label: 'English' },
  { id: 'zh', flag: '🇨🇳', label: '中文' },
  { id: 'ja', flag: '🇯🇵', label: '日本語' },
  { id: 'ko', flag: '🇰🇷', label: '한국어' },
];

const CODE: Record<Lang, string> = { vi: 'VI', en: 'EN', zh: '中', ja: 'JP', ko: 'KR' };

interface Props {
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  theme?: 'dark' | 'light';
}

export default function LangToggle({ lang, onChangeLang, theme = 'light' }: Props) {
  const [open, setOpen] = useState(false);
  const cur = LANGS.find(l => l.id === lang) ?? LANGS[0];

  const isDark = theme === 'dark';
  const btnBg   = isDark ? 'rgba(255,255,255,.08)' : 'rgba(26,26,24,.05)';
  const btnBdr  = isDark ? 'rgba(255,255,255,.15)' : '#E8E4DC';
  const txtCol  = isDark ? '#fff' : '#2C2C2A';
  const dropBg  = isDark ? '#272724' : '#fff';
  const dropBdr = isDark ? 'rgba(255,255,255,.1)' : '#E8E4DC';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          cursor: 'pointer', background: btnBg, border: `1px solid ${btnBdr}`,
          color: txtCol, padding: '6px 9px', display: 'flex', alignItems: 'center', gap: 5,
          font: '500 12px Inter, sans-serif', fontFamily: 'Inter, sans-serif',
        }}
      >
        <span style={{ fontSize: 15, lineHeight: 1 }}>{cur.flag}</span>
        <span>{CODE[lang]}</span>
        <span style={{ fontSize: 9, opacity: .5, marginLeft: 1 }}>▾</span>
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: dropBg, border: `1px solid ${dropBdr}`,
            boxShadow: '0 8px 28px rgba(0,0,0,.22)', zIndex: 99, minWidth: 148,
          }}>
            {LANGS.map(l => (
              <button
                key={l.id}
                onClick={() => { onChangeLang(l.id); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  width: '100%', padding: '10px 14px', cursor: 'pointer',
                  background: l.id === lang ? `rgba(196,119,59,.1)` : 'transparent',
                  color: l.id === lang ? AC : (isDark ? 'rgba(255,255,255,.85)' : '#2C2C2A'),
                  font: `${l.id === lang ? 600 : 400} 13px Inter, sans-serif`,
                  fontFamily: 'Inter, sans-serif', border: 'none', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 17 }}>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
