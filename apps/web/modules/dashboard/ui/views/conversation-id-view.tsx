'use client';

import * as z from 'zod/v4';
import { api } from '@workspace/backend/convex/_generated/api';
import { Id } from '@workspace/backend/convex/_generated/dataModel';
import { Button } from '@workspace/ui/components/button';
import { useMutation, useQuery } from 'convex/react';
import { MoreHorizontal, Wand2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toUIMessages, useThreadMessages } from '@convex-dev/agent/react';
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from '@workspace/ui/components/ai/conversation';
import {
  AIInput,
  AIInputButton,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from '@workspace/ui/components/ai/input';
import {
  AIMessage,
  AIMessageContent,
} from '@workspace/ui/components/ai/message';
import { AIResponse } from '@workspace/ui/components/ai/response';
import { Form, FormField } from '@workspace/ui/components/form';
import { DicebearAvatar } from '@workspace/ui/components/dicebear-avatar';

type Props = {
  conversationId: Id<'conversations'>;
};

const formSchema = z.object({
  message: z.string().min(1),
});

export default function ConversationIdView({ conversationId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  const conversation = useQuery(api.private.conversations.getOne, {
    conversationId,
  });

  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : 'skip',
    { initialNumItems: 10 }
  );

  const createMessage = useMutation(api.private.messages.create);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createMessage({ conversationId, prompt: values.message });

      form.reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col h-full bg-muted">
      <header className="flex items-center justify-between bg-background p-2.5 border-b">
        <Button type="button" variant="ghost" size="sm">
          <MoreHorizontal />
        </Button>
      </header>
      <AIConversation className="max-h-[calc(100vh-180px)]">
        <AIConversationContent>
          {toUIMessages(messages.results ?? [])?.map((message) => (
            <AIMessage
              from={message.role === 'user' ? 'assistant' : 'user'}
              key={message.id}
            >
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
              {message.role === 'user' && (
                <DicebearAvatar
                  seed={conversation?.contactSessionId ?? 'user'}
                  size={32}
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
        <AIConversationScrollButton />
      </AIConversation>
      <div className="p-2">
        <Form {...form}>
          <AIInput onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={conversation?.status === 'resolved'}
              name="message"
              render={({ field }) => (
                <AIInputTextarea
                  disabled={
                    conversation?.status === 'resolved' ||
                    form.formState.isSubmitting
                  }
                  onChange={field.onChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();

                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder={
                    conversation?.status === 'resolved'
                      ? 'This conversation has been resolved'
                      : 'Type your messages...'
                  }
                  value={field.value}
                />
              )}
            />
            <AIInputToolbar>
              <AIInputTools>
                <AIInputButton type="button">
                  <Wand2Icon />
                  <span>Enhance</span>
                </AIInputButton>
              </AIInputTools>
              <AIInputSubmit
                type="submit"
                disabled={
                  conversation?.status === 'resolved' ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting
                }
                status="ready"
              />
            </AIInputToolbar>
          </AIInput>
        </Form>
      </div>
    </div>
  );
}
