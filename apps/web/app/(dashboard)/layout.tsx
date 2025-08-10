import DashboardLayout from '../../modules/dashboard/ui/layouts/dashboard-layout';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
