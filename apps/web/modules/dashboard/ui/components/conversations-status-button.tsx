import { Doc } from '@workspace/backend/convex/_generated/dataModel';
import { Button } from '@workspace/ui/components/button';
import { Hint } from '@workspace/ui/components/hint';
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from 'lucide-react';

type Props = {
  status: Doc<'conversations'>['status'];
  onClick: () => void;
  disabled?: boolean;
};

export default function ConversationsStatusButton({
  onClick,
  status,
  disabled,
}: Props) {
  if (status === 'resolved') {
    return (
      <Hint text="Mark as unresolved">
        <Button
          type="button"
          onClick={onClick}
          disabled={disabled}
          variant="tertiary"
          size="sm"
        >
          <CheckIcon />
          <span>Resolved</span>
        </Button>
      </Hint>
    );
  }

  if (status === 'escalated') {
    return (
      <Hint text="Mark as resolved">
        <Button
          type="button"
          onClick={onClick}
          disabled={disabled}
          variant="warning"
          size="sm"
        >
          <ArrowUpIcon />
          <span>Escalated</span>
        </Button>
      </Hint>
    );
  }

  return (
    <Hint text="Mark as resolved">
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        variant="destructive"
        size="sm"
      >
        <ArrowRightIcon />
        <span>Unresolved</span>
      </Button>
    </Hint>
  );
}
