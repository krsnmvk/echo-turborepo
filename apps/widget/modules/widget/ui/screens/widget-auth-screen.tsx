'use client';

import * as z from 'zod/v4';
import WidgetHeader from '../components/widget-header';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@workspace/ui/components/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { useMutation } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { Doc } from '@workspace/backend/convex/_generated/dataModel';

const formScema = z.object({
  name: z
    .string({ error: 'Name is required.' })
    .min(3, { error: 'Name must be at leaast 3 characters.' }),
  email: z.email({ error: 'Invalid email address.' }),
});

export default function WidgetAuthScreen() {
  const form = useForm<z.infer<typeof formScema>>({
    resolver: zodResolver(formScema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const createContactSession = useMutation(api.public.contactSessions.create);
  const organizationId = '123';

  async function onSubmit(values: z.infer<typeof formScema>) {
    if (!organizationId) return;

    const metadata: Doc<'contactSessions'>['metadata'] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(','),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      cookieEnable: navigator.cookieEnabled,
      referrer: document.referrer || 'direct',
      currentUrl: window.location.href,
    };

    const contactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });

    console.log(contactSessionId);
  }

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <h3 className="text-3xl">Hi There! 👋</h3>
          <p className="text-lg">How can we help today?</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1 gap-y-4 p-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. jhon doe"
                    className="h-10 bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jhon.doe@example.com"
                    className="h-10 bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="lg">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
