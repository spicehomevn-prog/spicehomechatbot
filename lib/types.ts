export type Screen = 'lang-select' | 'welcome' | 'select' | 'chat';
export type Lang = 'vi' | 'en';

export interface GuestProperty {
  id: 'cs1' | 'cs2';
  name: string;
  short: string;
  mono: string;
  address: string;
  context: string;
}

export interface GuestMessage {
  id: string;
  role: 'guest' | 'bot';
  text: string;
  typing: boolean;
  displayText: string;
}

export interface GuestAppState {
  screen: Screen;
  lang: Lang;
  propId: 'cs1' | 'cs2' | null;
  messages: GuestMessage[];
  draft: string;
  generating: boolean;
}

export interface ChatResponse {
  reply: string;
  language: string;
  error?: string;
}
