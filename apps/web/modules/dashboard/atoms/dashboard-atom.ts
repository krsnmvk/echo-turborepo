import { Doc } from '@workspace/backend/convex/_generated/dataModel';
import { atomWithStorage } from 'jotai/utils';

export const statusFilterAtom = atomWithStorage<
  Doc<'conversations'>['status'] | 'all'
>('echo-turborepo', 'all');
