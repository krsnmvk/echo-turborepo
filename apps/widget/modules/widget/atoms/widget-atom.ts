import { atom } from 'jotai';

const WIDGET_SCREENS = [
  'loading',
  'error',
  'selection',
  'voice',
  'auth',
  'inbox',
  'chat',
  'contact',
] as const;

const CONTACT_SESSION_KEY = 'echo_contact_session' as const;

type WidgetScreen = (typeof WIDGET_SCREENS)[number];

export const screenAtom = atom<WidgetScreen>('loading');
