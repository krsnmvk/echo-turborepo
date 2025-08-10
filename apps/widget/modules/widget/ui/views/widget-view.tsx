'use client';

import { useAtomValue } from 'jotai';
import { screenAtom } from '../../atoms/widget-atom';
import WidgetAuthScreen from '../screens/widget-auth-screen';

type Props = {
  organizationId: string;
};

export default function WidgetView({ organizationId }: Props) {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    loading: <p>TODO: loading</p>,
    error: <p>TODO: error</p>,
    selection: <p>TODO: selection</p>,
    voice: <p>TODO: voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: inbox</p>,
    chat: <p>TODO: chat</p>,
    contact: <p>TODO: contact</p>,
  };

  return (
    <div className="min-h-screen min-w-screen w-full h-full flex flex-col border bg-muted rounded-xl overflow-hidden">
      {screenComponents[screen]}
    </div>
  );
}
