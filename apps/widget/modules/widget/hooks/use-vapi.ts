import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

type TranscriptMessage = {
  role: 'user' | 'assistant';
  text: string;
};

export function useVapi() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi('d407645c-4a4e-4e6a-a4e0-6f492b93db1b');

    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on('call-end', () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      setIsSpeaking(false);
    });

    vapiInstance.on('error', (error) => {
      console.log('VAPI_ERROR', error);
      setIsConnecting(false);
    });

    vapiInstance.on('message', (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === 'user' ? 'user' : 'assistant',
            text: message.transcript,
          },
        ]);
      }
    });

    return () => vapiInstance?.stop();
  }, []);

  function startCall() {
    setIsConnecting(true);

    if (vapi) {
      vapi.start('f246dc60-6990-486a-9258-6e8b405b1462');
    }
  }

  function endtCall() {
    if (vapi) {
      vapi.stop();
    }
  }

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endtCall,
  };
}
