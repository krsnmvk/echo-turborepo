import { Agent } from '@convex-dev/agent';
import { components } from '../../../_generated/api';
import { google } from '@ai-sdk/google';

export const supportAgent = new Agent(components.agent, {
  chat: google.chat('gemini-2.5-pro'),
  instructions:
    'You are a customer support agent. Use "resoveConversation" tool when user express finalization of the conversation. Use "escalateConversation" tool when user express frustration, or request a human explicitly',
});
