'use client';

import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import AuthLayout from '../layouts/auth-layout';
import SigninView from '../views/signin-view';

export default function AuthGuard({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <h1>Loading...</h1>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SigninView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
}
