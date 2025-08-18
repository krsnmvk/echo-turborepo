'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from '../../atoms/widget-atom';
import WidgetHeader from '../components/widget-header';
import { ArrowLeftIcon, TriangleAlertIcon } from 'lucide-react';
import WidgetFooter from '../components/widget-footer';
import { Button } from '@workspace/ui/components/button';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { formatDistanceToNow } from 'date-fns';
import ConversationStatusIcon from '@workspace/ui/components/conversation-status-icon';
import { useInfiniteScroll } from '@workspace/ui/hooks/use-infinite-scroll';
import { InfiniteScrollTrigger } from '@workspace/ui/components/infinite-scroll-trigger';

export default function WidgetInboxScreen() {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId!)
  );

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId
      ? {
          contactSessionId,
        }
      : 'skip',
    {
      initialNumItems: 10,
    }
  );

  const { canLoadMore, handleLoadMore, isLoadingMore, topElementRef } =
    useInfiniteScroll({
      loadMore: conversations.loadMore,
      status: conversations.status,
      loadSize: 10,
    });

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            onClick={() => setScreen('selection')}
            className="group"
            variant="transparent"
          >
            <ArrowLeftIcon
              className="-ms-0.5 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
            Inbox
          </Button>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-4 p-4 overflow-y-hidden">
        {conversations.results.length > 0 &&
          conversations.results.map((conversation) => (
            <Button
              type="button"
              onClick={() => {
                setConversationId(conversation._id);
                setScreen('chat');
              }}
              variant="outline"
              className="h-20 w-full justify-between"
              key={conversation._id}
            >
              <div className="flex flex-col overflow-hidden justify-start gap-4 w-full">
                <div className="flex items-center justify-between gap-x-2">
                  <span className="text-muted-foreground text-xs">Chat</span>
                  <span className="text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(conversation._creationTime))}
                  </span>
                </div>
                <div className="flex w-full items justify-between gap-x-2">
                  <p className="truncate text-sm">
                    {conversation.lastMessage?.text}
                  </p>
                  <ConversationStatusIcon status={conversation.status} />
                </div>
              </div>
            </Button>
          ))}
        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          ref={topElementRef}
        />
      </div>
      <WidgetFooter />
    </>
  );
}
