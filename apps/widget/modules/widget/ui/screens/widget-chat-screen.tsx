'use client';

import * as z from 'zod/v4';
import { useThreadMessages, toUIMessages } from '@convex-dev/agent/react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  contactSessionIdAtomFamily,
  conversationIdAtom,
  organizationIdAtom,
  screenAtom,
} from '../../atoms/widget-atom';
import WidgetHeader from '../components/widget-header';
import { ArrowLeftIcon, MenuIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { api } from '@workspace/backend/convex/_generated/api';
import { useAction, useQuery } from 'convex/react';
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
import {
  AIMessage,
  AIMessageContent,
} from '@workspace/ui/components/ai/message';
import { AIResponse } from '@workspace/ui/components/ai/response';
import {} from '@workspace/ui/components/ai/suggestion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@workspace/ui/components/form';

const formSchema = z.object({
  message: z
    .string({ error: 'Message is required' })
    .min(1, { error: 'Message must be at least 1 characters long.' }),
});

export default function WidgetChatScreen() {
  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId!)
  );

  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const conversations = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? { contactSessionId, conversationId }
      : 'skip'
  );

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversations?.threadId && contactSessionId
      ? {
          threadId: conversations.threadId,
          contactSessionId,
        }
      : 'skip',
    {
      initialNumItems: 10,
    }
  );

  function onBack() {
    setConversationId(null);
    setScreen('selection');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  const createMessage = useAction(api.public.messages.create);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!conversations || !contactSessionId) return;

    form.reset();

    await createMessage({
      threadId: conversations.threadId,
      prompt: values.message,
      contactSessionId,
    });
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
      <AIConversation>
        <AIConversationContent>
          {toUIMessages(messages.results ?? [])?.map((message) => (
            <AIMessage
              from={message.role === 'user' ? 'user' : 'assistant'}
              key={message.id}
            >
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>
            </AIMessage>
          ))}
        </AIConversationContent>
      </AIConversation>
      <Form {...form}>
        <AIInput onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            disabled={conversations?.status === 'resolved'}
            name="message"
            render={({ field }) => (
              <AIInputTextarea
                disabled={conversations?.status === 'resolved'}
                onChange={field.onChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();

                    form.handleSubmit(onSubmit)();
                  }
                }}
                placeholder={
                  conversations?.status === 'resolved'
                    ? 'This conversation has been resolved'
                    : 'Type your messages...'
                }
                value={field.value}
              />
            )}
          />
          <AIInputToolbar>
            <AIInputTools />
            <AIInputSubmit
              type="submit"
              disabled={
                conversations?.status === 'resolved' || !form.formState.isValid
              }
              status="ready"
            />
          </AIInputToolbar>
        </AIInput>
      </Form>
    </>
  );
}
