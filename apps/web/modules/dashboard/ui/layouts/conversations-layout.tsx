import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import ConversationsPanel from '../components/conversations-panel';

export default function ConversationsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
      <ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} className="h-full">
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
