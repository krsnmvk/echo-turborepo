import { Id } from '@workspace/backend/convex/_generated/dataModel';
import { atom } from 'jotai';
import { atomFamily, atomWithStorage } from 'jotai/utils';

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

export const organizationIdAtom = atom<string | null>(null);

export const errorMessageAtom = atom<string | null>(null);

export const loadingMessageAtom = atom<string | null>(null);

export const contactSessionIdAtomFamily = atomFamily((organizationId: string) =>
  atomWithStorage<Id<'contactSessions'> | null>(
    `${CONTACT_SESSION_KEY}_${organizationId}`,
    null
  )
);
