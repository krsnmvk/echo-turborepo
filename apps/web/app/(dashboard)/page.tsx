'use client';

import { useMutation, useQuery } from 'convex/react';
import { Button } from '@workspace/ui/components/button';
import { api } from '@workspace/backend/convex/_generated/api';
import { OrganizationSwitcher } from '@clerk/nextjs';

export default function Page() {
  const users = useQuery(api.public.users.getMany);
  const create = useMutation(api.public.users.create);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World/web</h1>
        <OrganizationSwitcher hidePersonal />
        <Button type="button" onClick={() => create()} size="sm">
          Create Users
        </Button>
      </div>
    </div>
  );
}
