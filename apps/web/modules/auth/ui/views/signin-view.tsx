import { SignIn } from '@clerk/nextjs';

export default function SigninView() {
  return <SignIn routing="hash" />;
}
