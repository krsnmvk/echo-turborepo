import { use } from 'react';
import WidgetView from '@/modules/widget/ui/views/widget-view';

type Props = {
  searchParams: Promise<{ organizationId: string }>;
};

export default function Home({ searchParams }: Props) {
  const { organizationId } = use(searchParams);

  return <WidgetView organizationId={organizationId} />;
}
