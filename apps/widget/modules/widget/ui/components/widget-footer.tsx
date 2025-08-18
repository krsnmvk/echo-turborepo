import { Button } from '@workspace/ui/components/button';
import { useAtomValue, useSetAtom } from 'jotai';
import { HomeIcon, InboxIcon } from 'lucide-react';
import { screenAtom } from '../../atoms/widget-atom';
import { cn } from '@workspace/ui/lib/utils';

export default function WidgetFooter() {
  const screen = useAtomValue(screenAtom);
  const setScreen = useSetAtom(screenAtom);

  return (
    <footer className="w-full flex items-center justify-center border-t bg-background">
      <Button
        type="button"
        onClick={() => setScreen('selection')}
        variant="ghost"
        size="icon"
        className="h-14 flex-1 rounded-none"
      >
        <HomeIcon
          className={cn('size-4', screen === 'selection' && 'text-primary')}
        />
      </Button>
      <Button
        type="button"
        onClick={() => setScreen('inbox')}
        variant="ghost"
        size="icon"
        className="h-14 flex-1 rounded-none"
      >
        <InboxIcon
          className={cn('size-4', screen === 'inbox' && 'text-primary')}
        />
      </Button>
    </footer>
  );
}
