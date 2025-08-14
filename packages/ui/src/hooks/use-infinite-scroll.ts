import { useCallback, useEffect, useRef } from 'react';

type Props = {
  status: 'CanLoadMore' | 'LoadingMore' | 'Exhausted' | 'LoadingFirstPage';
  loadMore: (numItems: number) => void;
  loadSize?: number;
  observerEnabled?: boolean;
};

export function useInfiniteScroll({
  loadMore,
  status,
  loadSize = 10,
  observerEnabled = true,
}: Props) {
  const topElementRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if (status === 'CanLoadMore') {
      loadMore(loadSize);
    }
  }, [status, loadMore, loadSize]);

  useEffect(() => {
    const topElement = topElementRef.current;

    if (!(topElement && observerEnabled)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) handleLoadMore();
      },
      { threshold: 0.1 }
    );

    observer?.observe(topElement);

    return () => {
      observer?.disconnect();
    };
  }, [handleLoadMore, observerEnabled]);

  return {
    topElementRef,
    handleLoadMore,
    canLoadMore: status === 'CanLoadMore',
    isExhausted: status === 'Exhausted',
    isLoadingFirstPage: status === 'LoadingFirstPage',
    isLoadingMore: status === 'LoadingMore',
  };
}
