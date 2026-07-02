'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cardHover, hoverLift } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium';
}

export function HoverLift({ children, className, intensity = 'medium' }: HoverLiftProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={intensity === 'subtle' ? hoverLift : cardHover}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn('rounded-2xl border border-border bg-card/50', className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card/50 transition-[colors,box-shadow] duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5',
        className,
      )}
      whileHover={cardHover}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
