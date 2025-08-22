import ConversationsLayout from '@/modules/dashboard/ui/layouts/conversations-layout';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <ConversationsLayout>{children}</ConversationsLayout>;
}
