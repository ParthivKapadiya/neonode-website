import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface InstagramFollowProps {
  className?: string;
  compact?: boolean;
}

export function InstagramFollow({ className, compact = false }: InstagramFollowProps) {
  return (
    <a
      href={siteConfig.social.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/30',
        compact && 'flex-col text-center sm:flex-row sm:text-left',
        className,
      )}
      aria-label={`Follow NeoNode on Instagram ${siteConfig.social.instagramHandle}`}
    >
      <div className="relative shrink-0 overflow-hidden rounded-xl bg-white p-1.5">
        <Image
          src={siteConfig.assets.instagramQr}
          alt={`Scan to follow ${siteConfig.social.instagramHandle} on Instagram`}
          width={compact ? 72 : 88}
          height={compact ? 72 : 88}
          className="rounded-lg"
        />
      </div>
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">Instagram</p>
        <p className="mt-1 text-sm font-semibold text-white">{siteConfig.social.instagramHandle}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Scan the QR code or tap to follow project updates and web tips.
        </p>
      </div>
    </a>
  );
}
