'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hover = true, glass = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6 md:p-8',
        glass && 'glass',
        !glass && 'bg-card border border-border',
        className,
      )}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  return (
    <motion.div
      className={cn('rounded-2xl glass p-6 md:p-8', className)}
      whileHover={{
        rotateX: 2,
        rotateY: -2,
        y: -6,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}
