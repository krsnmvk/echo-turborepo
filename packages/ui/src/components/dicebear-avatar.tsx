'use client';

import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { glass } from '@dicebear/collection';
import { Avatar, AvatarImage } from '@workspace/ui/components/avatar';
import { cn } from '@workspace/ui/lib/utils';

type Props = {
  seed: string;
  size?: number;
  imageUrl?: string;
  badgeImageUrl?: string;
  className?: string;
  badgeClassName?: string;
};

export function DicebearAvatar({
  seed,
  badgeClassName,
  badgeImageUrl,
  className,
  imageUrl,
  size = 32,
}: Props) {
  const avatarSrc = useMemo(() => {
    if (imageUrl) return imageUrl;

    const avatar = createAvatar(glass, {
      seed,
      size,
    });

    return avatar.toDataUri();
  }, [seed, size]);

  const badgeSIze = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn('border', className)}
        style={{ width: size, height: size }}
      >
        <AvatarImage alt="Image" src={avatarSrc} />
      </Avatar>
      {badgeImageUrl && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full flex items-center justify-center bg-background border-background overflow-hidden',
            badgeClassName
          )}
          style={{
            width: badgeSIze,
            height: badgeSIze,
            transform: 'translate(15%,15%)',
          }}
        >
          <img
            src={badgeImageUrl}
            alt="Badge"
            width={badgeSIze}
            height={badgeSIze}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
