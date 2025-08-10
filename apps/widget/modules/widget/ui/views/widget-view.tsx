import WidgetFooter from '../components/widget-footer';
import WidgetHeader from '../components/widget-header';

type Props = {
  organizationId: string;
};

export default function WidgetView({ organizationId }: Props) {
  return (
    <div className="min-h-screen min-w-screen w-full h-full flex flex-col border bg-muted rounded-xl overflow-hidden">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <h3 className="text-3xl">Hi There! 👋</h3>
          <p className="text-lg">How can we help today?</p>
        </div>
      </WidgetHeader>
      <main className="flex flex-1">main: {organizationId}</main>
      <WidgetFooter />
    </div>
  );
}
