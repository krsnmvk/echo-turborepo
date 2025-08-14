import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';

type Props = {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export function InfiniteScrollTrigger({
  canLoadMore,
  isLoadingMore,
  onLoadMore,
  className,
  loadMoreText = 'Load more',
  noMoreText = 'No more items',
  ref,
}: Props) {
  let text = loadMoreText;

  if (isLoadingMore) {
    text = 'Loading...';
  } else if (!canLoadMore) {
    text = noMoreText;
  }

  return (
    <div className={cn('w-full flex justify-center py-2', className)} ref={ref}>
      <Button
        type="button"
        onClick={onLoadMore}
        disabled={!canLoadMore || isLoadingMore}
        variant="ghost"
        size="sm"
      >
        {text}
      </Button>
    </div>
  );
}
