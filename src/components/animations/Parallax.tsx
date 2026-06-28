'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function Parallax({
  children,
  className,
  speed = 0.4,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = direction === 'up' ? [speed * 60, speed * -60] : [speed * -60, speed * 60];
  const y = useTransform(scrollYProgress, [0, 1], range);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  className?: string;
  speed?: number;
}

export function ParallaxLayer({ className, speed = 0.3 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.4]);

  return (
    <div ref={ref} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {!reduced && (
        <motion.div
          style={{ y, opacity }}
          className="absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"
        />
      )}
    </div>
  );
}
