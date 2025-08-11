import { Loader } from 'lucide-react';
import WidgetHeader from '../components/widget-header';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  contactSessionIdAtomFamily,
  errorMessageAtom,
  loadingMessageAtom,
  organizationIdAtom,
  screenAtom,
} from '../../atoms/widget-atom';
import { useAction, useMutation } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';

type InitStep = 'org' | 'settings' | 'vapi' | 'session' | 'done';

export default function WidgetLoadingScreen({
  organizationId,
}: {
  organizationId: string | null;
}) {
  const [step, setStep] = useState<InitStep>('org');
  const [sessionValid, setSessionValid] = useState(false);

  const loadingMessage = useAtomValue(loadingMessageAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId!)
  );

  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setScreen = useSetAtom(screenAtom);

  const validateOrganization = useAction(api.public.organizations.validate);

  useEffect(() => {
    if (step !== 'org') return;

    setLoadingMessage('Finding organization ID...');

    if (!organizationId) {
      setErrorMessage('Organization ID is required');
      setScreen('error');
      return;
    }

    setLoadingMessage('Verifying organization...');

    validateOrganization({ organizationId: organizationId! })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);
          setStep('session');
        } else {
          setErrorMessage(result.reason || 'Invalid configuration');
          setScreen('error');
        }
      })
      .catch(() => {
        setErrorMessage('Unable verify organization');
        setScreen('error');
      });
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setStep,
    validateOrganization,
    setOrganizationId,
    setLoadingMessage,
  ]);

  const validateContactSession = useMutation(
    api.public.contactSessions.validate
  );

  useEffect(() => {
    if (step !== 'session') return;

    setLoadingMessage('Finding contact session ID...');

    if (!contactSessionId) {
      setSessionValid(false);
      setStep('done');
      return;
    }

    setLoadingMessage('Validation contact session...');

    validateContactSession({ contactSessionId })
      .then((result) => {
        setSessionValid(result.valid);
        setStep('done');
      })
      .catch(() => {
        setSessionValid(false);
        setStep('settings');
      });
  }, [step, setSessionValid, setLoadingMessage, setStep]);

  useEffect(() => {
    if (step !== 'done') return;

    const hasValidSession = contactSessionId && sessionValid;

    setScreen(hasValidSession ? 'selection' : 'auth');
  }, [step, contactSessionId, setSessionValid, sessionValid]);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <h3 className="text-3xl">Hi There! 👋</h3>
          <p className="text-lg">How can we help today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <Loader className="animate-spin" />
        <span className="text-sm">{loadingMessage || 'Loading...'}</span>
      </div>
    </>
  );
}
