'use client';

import { getCountryFlagUrl } from '@/lib/get-country-flag-url';
import { getCountryFromTimezone } from '@/lib/get-country-from-timezone';
import { api } from '@workspace/backend/convex/_generated/api';
import ConversationStatusIcon from '@workspace/ui/components/conversation-status-icon';
import { DicebearAvatar } from '@workspace/ui/components/dicebear-avatar';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { cn } from '@workspace/ui/lib/utils';
import { usePaginatedQuery } from 'convex/react';
import { formatDistanceToNow } from 'date-fns';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
  ListIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { statusFilterAtom } from '../../atoms/dashboard-atom';
import { useInfiniteScroll } from '@workspace/ui/hooks/use-infinite-scroll';
import { InfiniteScrollTrigger } from '@workspace/ui/components/infinite-scroll-trigger';
import SkeletonConversations from './skeleton-conversations';

export default function ConversationsPanel() {
  const statusFilter = useAtomValue(statusFilterAtom);

  const setStatusFilter = useSetAtom(statusFilterAtom);

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: statusFilter === 'all' ? undefined : statusFilter },
    { initialNumItems: 10 }
  );

  const pathname = usePathname();

  const {
    canLoadMore,
    handleLoadMore,
    isExhausted,
    isLoadingFirstPage,
    isLoadingMore,
    topElementRef,
  } = useInfiniteScroll({
    loadMore: conversations.loadMore,
    status: conversations.status,
    loadSize: 10,
  });

  return (
    <div className="w-full h-full flex flex-col bg-background text-sidebar-foreground">
      <div className="flex gap-3.5 p-2 border-b flex-col">
        <Select
          defaultValue="all"
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(
              value as 'unresolved' | 'resolved' | 'escalated' | 'all'
            )
          }
        >
          <SelectTrigger className="h-8 shadow-none border-none p-1.5 ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="size-4" />
                <span className="text-xs">All</span>
              </div>
            </SelectItem>
            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <ArrowRightIcon className="size-4" />
                <span className="text-xs">Unresolved</span>
              </div>
            </SelectItem>
            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="size-4" />
                <span className="text-xs">Escalated</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <CheckIcon className="size-4" />
                <span className="text-xs">Resolved</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoadingFirstPage ? (
        <SkeletonConversations />
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex flex-col flex-1 w-full text-sm">
            {conversations.results.map((conversation) => {
              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== 'user';

              const country = getCountryFromTimezone(
                conversation.contactSession.metadata?.timezone
              );

              const countryFlagUrl = country?.code
                ? getCountryFlagUrl(country.code)
                : undefined;

              return (
                <Link
                  href={`conversations/${conversation._id}`}
                  key={conversation._id}
                  className={cn(
                    'relative flex leading-tight items-start gap-3 px-4 py-5 border-b text-sm hover:bg-accent hover:text-accent-foreground',
                    pathname === `conversations/${conversation._id}` &&
                      'text-accent-foreground bg-accent'
                  )}
                >
                  <div
                    className={cn(
                      '-translate-y-1/2 top-1/2 left-0 h-[64%] absolute w-1 rounded-r-full opacity-0 bg-neutral-300 transition-opacity',
                      pathname === `conversations/${conversation._id}` &&
                        'opacity-100'
                    )}
                  />
                  <DicebearAvatar
                    seed={conversation._id}
                    badgeImageUrl={countryFlagUrl}
                    size={40}
                    className="shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-bold">
                        {conversation.contactSession.name}
                      </span>
                      <span className="ml-auto text-muted-foreground text-xs shrink-0">
                        {formatDistanceToNow(conversation._creationTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex w-0 gap-1 items-center grow">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <p
                          className={cn(
                            'line-clamp-1 text-muted-foreground text-xs',
                            !isLastMessageFromOperator && 'font-bold text-black'
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </p>
                      </div>
                      <ConversationStatusIcon status={conversation.status} />
                    </div>
                  </div>
                </Link>
              );
            })}
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topElementRef}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
