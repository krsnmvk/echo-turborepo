'use client';

import { useAtomValue } from 'jotai';
import { errorMessageAtom } from '../../atoms/widget-atom';
import WidgetHeader from '../components/widget-header';
import { TriangleAlertIcon } from 'lucide-react';

export default function WidgetErrorScreen() {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <h3 className="text-3xl">Hi There! 👋</h3>
          <p className="text-lg">How can we help today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <TriangleAlertIcon />
        <span className="text-sm">
          {errorMessage || 'Invalid configuration'}
        </span>
      </div>
    </>
  );
}
