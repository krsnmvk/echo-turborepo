'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  errorMessageAtom,
  organizationIdAtom,
  screenAtom,
} from '../../atoms/widget-atom';
import WidgetHeader from '../components/widget-header';
import {
  ArrowLeft,
  ArrowLeftIcon,
  MenuIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { api } from '@workspace/backend/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function WidgetChatScreen() {
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId!)
  );

  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const getConversations = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { contactSessionId, conversationId }
      : 'skip'
  );

  function onBack() {
    setConversationId(null);
    setScreen('selection');
  }

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={onBack}
            className="group"
            variant="transparent"
          >
            <ArrowLeftIcon
              className="-ms-0.5 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
            Chat
          </Button>
          <Button type="button" variant="transparent" size="icon">
            <MenuIcon />
          </Button>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-4 p-4">
        {JSON.stringify(getConversations, null, 2)}
      </div>
    </>
  );
}
