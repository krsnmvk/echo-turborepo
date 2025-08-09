'use client';

import { useMutation, useQuery } from 'convex/react';
import { Button } from '@workspace/ui/components/button';
import { api } from '@workspace/backend/convex/_generated/api';

export default function Page() {
  const users = useQuery(api.users.getMany);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World/web</h1>
        <Button
          type="button"
          onClick={() => {
            useMutation(api.users.create);
          }}
          size="sm"
        >
          Create Users
        </Button>
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  );
}
