import { BrandMark } from '@/components/ui/BrandMark';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 48, showText = true, className }: LogoProps) {
  return (
    <BrandMark
      size={size}
      showText={showText}
      className={cn('transition-transform duration-300 group-hover:scale-[1.02]', className)}
    />
  );
}
