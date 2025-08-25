import { createTool } from '@convex-dev/agent';
import * as z from 'zod';
import { internal } from '../../_generated/api';
import { supportAgent } from '../ai/agents/supportAgent';

export const escalateConversation = createTool({
  description: 'Resolve a escalated',

  args: z.object({}),

  handler: async (ctx) => {
    if (!ctx.threadId) {
      return 'Missing thread ID';
    }

    await ctx.runMutation(internal.system.conversations.escalate, {
      threadId: ctx.threadId,
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: 'assistant',
        content: 'Conversation escalated to a human operator',
      },
    });

    return 'Conversation escalated to a human operator';
  },
});
