'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { defaultTransition, VIEWPORT_DEFAULT } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface AnimatedProgressBarProps {
  label: string;
  value: number;
  max?: number;
  className?: string;
  delay?: number;
}

export function AnimatedProgressBar({
  label,
  value,
  max = 100,
  className,
  delay = 0,
}: AnimatedProgressBarProps) {
  const reduced = useReducedMotion();
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-white">{value}{max === 100 ? '%' : ''}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        {reduced ? (
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${percent}%` }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={VIEWPORT_DEFAULT}
            transition={{ duration: 1.2, delay, ease: defaultTransition.ease }}
          />
        )}
      </div>
    </div>
  );
}
