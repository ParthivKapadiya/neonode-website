import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14 lg:mb-16',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        align === 'left' && 'max-w-2xl text-left',
        className,
      )}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">
        {highlight ? (
          <>
            {title} <span className="gradient-text">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && <p className="section-lead mt-4">{description}</p>}
    </div>
  );
}
