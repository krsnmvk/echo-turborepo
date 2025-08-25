import ConversationIdView from '@/modules/dashboard/ui/views/conversation-id-view';
import { Id } from '@workspace/backend/convex/_generated/dataModel';
import { use } from 'react';

type Props = {
  params: Promise<{ conversationId: Id<'conversations'> }>;
};

export default function Page({ params }: Props) {
  const { conversationId } = use(params);

  return <ConversationIdView conversationId={conversationId} />;
}
