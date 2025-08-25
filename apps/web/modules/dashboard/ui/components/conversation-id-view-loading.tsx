import {
  AIConversation,
  AIConversationContent,
} from '@workspace/ui/components/ai/conversation';
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from '@workspace/ui/components/ai/input';
import { Button } from '@workspace/ui/components/button';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { cn } from '@workspace/ui/lib/utils';
import { MoreHorizontalIcon } from 'lucide-react';

export default function ConversationIdViewLoading() {
  return (
    <div className="flex flex-col h-full bg-muted">
      <header className="flex items-center justify-between bg-background p-2.5 border-b">
        <Button type="button" disabled variant="ghost" size="sm">
          <MoreHorizontalIcon />
        </Button>
      </header>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
          {Array.from({ length: 8 }, (_, i) => {
            const isUser = i % 2 == 0;

            const widths = ['w-48', 'w-60', 'w-70'];

            const width = widths[i % widths.length];

            return (
              <div
                className={cn(
                  'group flex items-end justify-end [&>div]:max-w-[80%] gap-2 py-2 w-full',
                  isUser ? 'is-user' : 'is-assistant flex-row-reverse'
                )}
                key={i}
              >
                <Skeleton
                  className={`h-9 ${width} rounded-lg bg-neutral-200`}
                />
                <Skeleton className="rounded-full size-8 bg-neutral-200" />
              </div>
            );
          })}
        </AIConversationContent>
      </AIConversation>
      <div className="p-2">
        <AIInput>
          <AIInputTextarea
            disabled
            placeholder="TYpe your response as an operator..."
          />
          <AIInputToolbar>
            <AIInputTools />
            <AIInputSubmit type="submit" disabled status="ready" />
          </AIInputToolbar>
        </AIInput>
      </div>
    </div>
  );
}
