'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { GuestAppState, GuestMessage, Lang } from '@/lib/types';
import { PROPERTIES } from '@/lib/properties';
import LangSelect from './LangSelect';
import WelcomeScreen from './WelcomeScreen';
import PropertySelect from './PropertySelect';
import ChatScreen from './ChatScreen';

const LANG_KEY = 'sh_guest_lang';
const PROP_KEY = 'sh_guest_prop';

const INITIAL: GuestAppState = {
  screen: 'lang-select',
  lang: 'vi',
  propId: null,
  messages: [],
  draft: '',
  generating: false,
};

export default function GuestApp() {
  const [s, setS] = useState<GuestAppState>(INITIAL);
  const typerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = (localStorage.getItem(LANG_KEY) as Lang) || null;
    const savedProp = localStorage.getItem(PROP_KEY) as 'cs1' | 'cs2' | null;
    if (savedLang) {
      // Already chose lang — skip to welcome
      setS(prev => ({ ...prev, lang: savedLang, propId: savedProp, screen: 'welcome' }));
      introRef.current = setTimeout(() => {
        setS(prev => prev.screen === 'welcome' ? { ...prev, screen: 'select' } : prev);
      }, 1800);
    }
    return () => {
      if (introRef.current) clearTimeout(introRef.current);
      if (typerRef.current) clearTimeout(typerRef.current);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [s.messages]);

  // ── typeOut ──
  const typeOut = useCallback((id: string, full: string) => {
    if (typerRef.current) clearTimeout(typerRef.current);
    const step = (i: number) => {
      const next = Math.min(full.length, i + Math.max(2, Math.round(full.length / 90)));
      setS(prev => ({
        ...prev,
        messages: prev.messages.map(m => m.id === id ? { ...m, displayText: full.slice(0, next) } : m),
      }));
      if (next < full.length) {
        typerRef.current = setTimeout(() => step(next), 16);
      } else {
        setS(prev => ({
          ...prev,
          generating: false,
          messages: prev.messages.map(m => m.id === id ? { ...m, text: full, displayText: full, typing: false } : m),
        }));
      }
    };
    step(0);
  }, []);

  // ── generate ──
  const generate = useCallback(async (guestText: string, propId: string) => {
    const botId = 'b' + Date.now();
    setS(prev => ({
      ...prev,
      generating: true,
      messages: [...prev.messages, { id: botId, role: 'bot', text: '', displayText: '', typing: true }],
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propId, message: guestText }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = await res.json() as { reply?: string };
      const reply = (data.reply || '').trim() || '…';
      typeOut(botId, reply);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Đã xảy ra lỗi. Vui lòng thử lại.';
      setS(prev => ({
        ...prev,
        generating: false,
        messages: prev.messages.map(m => m.id === botId ? { ...m, typing: false, displayText: msg, text: msg } : m),
      }));
    }
  }, [typeOut]);

  // ── send ──
  const send = useCallback(() => {
    setS(prev => {
      const text = (prev.draft || '').trim();
      if (!text || prev.generating || !prev.propId) return prev;
      const gid = 'g' + Date.now();
      const guestMsg: GuestMessage = { id: gid, role: 'guest', text, typing: false, displayText: text };
      setTimeout(() => generate(text, prev.propId!), 0);
      return { ...prev, messages: [...prev.messages, guestMsg], draft: '' };
    });
  }, [generate]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // ── handlers ──
  const selectLang = (lang: Lang) => {
    localStorage.setItem(LANG_KEY, lang);
    setS(prev => ({ ...prev, lang, screen: 'welcome' }));
    introRef.current = setTimeout(() => {
      setS(prev => prev.screen === 'welcome' ? { ...prev, screen: 'select' } : prev);
    }, 1800);
  };

  const selectProperty = (id: 'cs1' | 'cs2') => {
    localStorage.setItem(PROP_KEY, id);
    setS(prev => ({ ...prev, propId: id, messages: [], screen: 'chat' }));
  };

  const changeProperty = () => {
    setS(prev => ({ ...prev, screen: 'select', messages: [] }));
  };

  const curProp = PROPERTIES.find(p => p.id === s.propId) ?? PROPERTIES[0];

  if (s.screen === 'lang-select') return <LangSelect onSelect={selectLang} />;
  if (s.screen === 'welcome') return <WelcomeScreen lang={s.lang} />;
  if (s.screen === 'select') return <PropertySelect lang={s.lang} onSelect={selectProperty} />;

  return (
    <ChatScreen
      lang={s.lang}
      prop={curProp}
      messages={s.messages}
      draft={s.draft}
      generating={s.generating}
      scrollRef={scrollRef}
      onDraftChange={d => setS(prev => ({ ...prev, draft: d }))}
      onSend={send}
      onKey={onKey}
      onChangeProperty={changeProperty}
    />
  );
}
