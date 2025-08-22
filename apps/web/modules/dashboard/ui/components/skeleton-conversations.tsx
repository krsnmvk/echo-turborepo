import { Skeleton } from '@workspace/ui/components/skeleton';

export default function SkeletonConversations() {
  return (
    <div className="flex flex-col min-h-0 gap-2 flex-1 overflow-hidden">
      <div className="relative flex flex-col w-full min-w-0 p-2">
        <div className="space-y-2 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="flex items-start rounded-lg p-4" key={i}>
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="min-h-0 flex-1">
                <div className="w-full flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12 ml-auto shrink-0" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
