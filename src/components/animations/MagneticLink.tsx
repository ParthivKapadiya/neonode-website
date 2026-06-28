'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.3,
}: MagneticLinkProps) {
  const reduced = useReducedMotion();
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);

  if (reduced) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className="inline-flex">
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn('inline-flex', className)}
        whileTap={{ scale: 0.97 }}
        style={{ transition: 'transform 0.2s ease-out' }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
