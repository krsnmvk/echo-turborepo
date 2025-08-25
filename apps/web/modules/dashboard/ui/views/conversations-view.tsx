import Image from 'next/image';

export default function ConversationsView() {
  return (
    <div className="flex h-full flex-1 gap-y-4 flex-col bg-muted">
      <div className="flex flex-1 items-center justify-center gap-x-2">
        <Image src="/logo.svg" alt="Logo" height={40} width={40} />
        <h2 className="font-semibold text-xl">Echo</h2>
      </div>
    </div>
  );
}
