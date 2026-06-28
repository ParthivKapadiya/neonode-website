import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  size?: number;
  showText?: boolean;
  className?: string;
  imageClassName?: string;
}

export function BrandMark({
  size = 48,
  showText = false,
  className,
  imageClassName,
}: BrandMarkProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src="/logo.png"
        alt={`${siteConfig.name} logo`}
        width={size}
        height={size}
        className={cn('h-auto shrink-0 object-contain', imageClassName)}
        style={{ height: size, width: 'auto' }}
        priority
      />
      {showText && (
        <div className="min-w-0 leading-tight">
          <span className="block text-sm font-bold tracking-tight text-white sm:text-base">
            {siteConfig.shortName}
          </span>
          <span className="block text-[11px] text-muted sm:text-xs">Web Solution</span>
        </div>
      )}
    </div>
  );
}
