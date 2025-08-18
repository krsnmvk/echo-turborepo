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
import { Button } from '@workspace/ui/components/button';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { useTransition } from 'react';
import WidgetFooter from '../components/widget-footer';

export default function WidgetSelectionScreen() {
  const [isPending, startTransition] = useTransition();

  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId!)
  );

  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const createConversation = useMutation(api.public.conversations.create);

  function handleNewConversation() {
    startTransition(async () => {
      if (!organizationId) {
        setScreen('error');
        setErrorMessage('Missing organization ID');
        return;
      }

      if (!contactSessionId) {
        setScreen('auth');
        return;
      }

      try {
        const conversationId = await createConversation({
          contactSessionId,
          organizationId,
        });

        setConversationId(conversationId);
        setScreen('chat');
      } catch {
        setScreen('auth');
      }
    });
  }

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <h3 className="text-3xl">Hi There! 👋</h3>
          <p className="text-lg">How can we help today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-4 p-4 overflow-y-hidden">
        <Button
          type="button"
          onClick={handleNewConversation}
          disabled={isPending}
          variant="outline"
          className="h-16 w-full justify-between"
        >
          <div className="flex items-center gap-x-2">
            <MessageSquare />
            <span>Start Chat</span>
          </div>
          <ChevronRight />
        </Button>
      </div>
      <WidgetFooter />
    </>
  );
}
