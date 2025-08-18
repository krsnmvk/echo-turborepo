'use client';

import { useAtomValue } from 'jotai';
import { screenAtom } from '../../atoms/widget-atom';
import WidgetAuthScreen from '../screens/widget-auth-screen';
import WidgetErrorScreen from '../screens/widget-error-screen';
import WidgetLoadingScreen from '../screens/widget-loading-screen';
import WidgetSelectionScreen from '../screens/widget-selection-screen';
import WidgetChatScreen from '../screens/widget-chat-screen';
import WidgetInboxScreen from '../screens/widget-inbox-screen';

type Props = {
  organizationId: string;
};

export default function WidgetView({ organizationId }: Props) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    selection: <WidgetSelectionScreen />,
    voice: <p>TODO: voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <p>TODO: contact</p>,
  };

  return (
    <div className="min-h-screen min-w-screen w-full h-full flex flex-col border bg-muted rounded-xl overflow-hidden">
      {screenComponents[screen]}
    </div>
  );
}
