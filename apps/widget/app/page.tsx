'use client';

import { Button } from '@workspace/ui/components/button';
import { useVapi } from '@/modules/widget/hooks/use-vapi';

export default function Page() {
  const {
    endtCall,
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    transcript,
  } = useVapi();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World/widget</h1>
        <Button type="button" onClick={() => startCall()} size="sm">
          Start Call
        </Button>
        <Button
          type="button"
          onClick={() => endtCall()}
          variant="destructive"
          size="sm"
        >
          End Call
        </Button>

        <span>isConnected {`${isConnected}`}</span>
        <span>isConnecting {`${isConnecting}`}</span>
        <span>isSpeaking {`${isSpeaking}`}</span>

        {JSON.stringify(transcript, null, 2)}
      </div>
    </div>
  );
}
