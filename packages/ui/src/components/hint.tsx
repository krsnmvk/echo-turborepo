'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import {} from '@workspace/ui/components/button';

type Props = {
  text: string;
  children: Readonly<React.ReactNode>;
  slide?: 'top' | 'bottom' | 'right' | 'left';
  align?: 'center' | 'start' | 'end';
};

export function Hint({
  children,
  text,
  align = 'center',
  slide = 'top',
}: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
