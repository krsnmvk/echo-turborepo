import AuthLayout from '@/modules/auth/ui/layouts/auth-layout';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
