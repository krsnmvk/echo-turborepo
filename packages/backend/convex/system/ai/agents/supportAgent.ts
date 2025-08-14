import { Agent } from '@convex-dev/agent';
import { components } from '../../../_generated/api';
import { google } from '@ai-sdk/google';

export const supportAgent = new Agent(components.agent, {
  chat: google.chat('gemini-2.5-pro'),
  instructions: 'You are a customer support agent',
});
