'use client';

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useMutation,
  useQuery,
} from 'convex/react';
import { Button } from '@workspace/ui/components/button';
import { api } from '@workspace/backend/convex/_generated/api';
import {} from 'convex/react';
import { Loader2Icon } from 'lucide-react';

export default function Page() {
  const users = useQuery(api.users.getMany);
  const create = useMutation(api.users.create);

  return (
    <>
      <AuthLoading>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2Icon className="size-10 animate-spin" />
          </div>
        </div>
      </AuthLoading>
      <Authenticated>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello World/widget</h1>
            <Button type="button" onClick={() => create()} size="sm">
              Create Users
            </Button>
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-svh">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Must be login/widget</h1>
          </div>
        </div>
      </Unauthenticated>
    </>
  );
}
