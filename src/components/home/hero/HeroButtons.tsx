'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { cn } from '@/lib/utils';

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.35);

  return (
    <Link href={href} className="group relative inline-flex">
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-base font-semibold text-white',
          'bg-gradient-to-r from-primary to-secondary shadow-xl shadow-primary/30',
          'transition-shadow duration-300 group-hover:shadow-primary/50',
        )}
        whileTap={{ scale: 0.97 }}
        style={{ transition: 'transform 0.25s ease-out' }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </motion.span>
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-flex">
      <motion.span
        className={cn(
          'flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4',
          'text-base font-semibold text-white backdrop-blur-md',
          'transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08]',
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <Play className="h-4 w-4 fill-white/80 text-white/80" />
        {children}
      </motion.span>
    </Link>
  );
}

export function HeroButtons() {
  return (
    <motion.div
      className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.6 }}
    >
      <PrimaryButton href="#contact">Get a Free Quote</PrimaryButton>
      <SecondaryButton href="#portfolio">See Live Projects</SecondaryButton>
    </motion.div>
  );
}
