import { Button } from '@workspace/ui/components/button';
import { HomeIcon, InboxIcon } from 'lucide-react';

export default function WidgetFooter() {
  return (
    <footer className="w-full flex items-center justify-center border-t bg-background">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-14 flex-1 rounded-none"
      >
        <HomeIcon className="size-4 text-primary" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-14 flex-1 rounded-none"
      >
        <InboxIcon className="size-4 text-primary" />
      </Button>
    </footer>
  );
}
