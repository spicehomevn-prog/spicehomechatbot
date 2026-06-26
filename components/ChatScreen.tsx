'use client';
import { useEffect, useRef } from 'react';
import type { GuestMessage, GuestProperty, Lang } from '@/lib/types';
import MessageBubble from './MessageBubble';

const AC = '#C4773B';

const T = {
  vi: {
    placeholder: 'Hỏi chúng mình bất cứ điều gì…',
    send: 'Gửi',
    generating: 'Đang soạn…',
    change: 'Đổi nhà',
    empty: 'Hỏi chúng mình về WiFi, nhận phòng, quán ăn, tiện ích hay bất kỳ điều gì bạn cần 😊',
  },
  en: {
    placeholder: 'Ask us anything…',
    send: 'Send',
    generating: 'Typing…',
    change: 'Change',
    empty: 'Ask us about WiFi, check-in, local food spots, facilities, or anything you need 😊',
  },
};

interface Props {
  lang: Lang;
  prop: GuestProperty;
  messages: GuestMessage[];
  draft: string;
  generating: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  onDraftChange: (v: string) => void;
  onSend: () => void;
  onKey: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChangeProperty: () => void;
}

export default function ChatScreen({ lang, prop, messages, draft, generating, scrollRef, onDraftChange, onSend, onKey, onChangeProperty }: Props) {
  const t = T[lang];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 130) + 'px';
  }, [draft]);

  const sendBg = generating ? '#C9B6A2' : AC;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#FAFAF8', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#1A1A18', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `2px solid ${AC}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: AC, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <img src="/logo/mark-reverse.svg" alt="SpiceHome" style={{ width: 22, height: 22 }} />
          </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{prop.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 1 }}>SpiceHome · Trợ lý ảo 24/7</div>
        </div>
        <div
          onClick={onChangeProperty}
          className="hov"
          style={{ cursor: 'pointer', border: '1px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.7)', padding: '6px 12px', font: '500 11px Inter, sans-serif', transition: 'all .15s', flex: 'none' }}
        >
          {t.change}
        </div>
      </div>

      {/* Message list */}
      <div
        ref={scrollRef}
        className="scroll"
        style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', maxWidth: 340, padding: '40px 0' }}>
            <div style={{ width: 52, height: 52, borderRadius: 999, background: `rgba(196,119,59,.1)`, border: `1px solid rgba(196,119,59,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                <img src="/logo/mark.svg" alt="SpiceHome" style={{ width: 32, height: 32 }} />
              </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#1A1A18', marginBottom: 8 }}>SpiceHome</div>
            <div style={{ fontSize: 13, color: '#7A7A72', lineHeight: 1.6 }}>{t.empty}</div>
          </div>
        ) : (
          messages.map(m => <MessageBubble key={m.id} m={m} lang={lang} />)
        )}
      </div>

      {/* Composer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #E8E4DC', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={e => onDraftChange(e.target.value)}
            onKeyDown={onKey}
            placeholder={t.placeholder}
            rows={1}
            style={{ flex: 1, minHeight: 44, maxHeight: 130, border: '1px solid #E8E4DC', background: '#FAFAF8', padding: '11px 13px', fontSize: 14, lineHeight: 1.5, color: '#2C2C2A', resize: 'none', overflow: 'auto', borderRadius: 22, fontFamily: 'Inter, sans-serif' }}
          />
          <div
            onClick={onSend}
            className="hovd"
            style={{ cursor: 'pointer', background: sendBg, color: '#fff', width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flex: 'none', transition: 'background .2s' }}
          >
            ›
          </div>
        </div>
      </div>
    </div>
  );
}
