'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutGrid, MessageCircle } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { EASE_OUT } from '@/lib/motion';
import { siteConfig } from '@/config/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.3);

  return (
    <Link href={href} className="group relative inline-flex w-full sm:w-auto">
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-7 py-3.5',
          'text-[0.9375rem] font-semibold text-white sm:w-auto sm:px-8 sm:py-4 sm:text-base',
          'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25',
          'transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/35',
        )}
        whileTap={{ scale: 0.98 }}
        style={{ transition: 'transform 0.25s ease-out' }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </motion.span>
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-flex w-full sm:w-auto">
      <motion.span
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-7 py-3.5',
          'text-[0.9375rem] font-semibold text-white/90 backdrop-blur-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base',
          'transition-all duration-300 group-hover:border-white/22 group-hover:bg-white/[0.06] group-hover:text-white',
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <LayoutGrid className="h-4 w-4 text-white/50 transition-colors group-hover:text-white/70" />
        {children}
      </motion.span>
    </Link>
  );
}

export function HeroButtons() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mt-8 sm:mt-9"
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: reduced ? 0 : 0.56, ease: EASE_OUT }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <PrimaryButton href="#contact">Get a Free Quote</PrimaryButton>
        <SecondaryButton href="#portfolio">See Live Work</SecondaryButton>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        <span>Prefer WhatsApp?</span>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-emerald-400/90 transition-colors hover:text-emerald-400"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Message us directly
        </a>
      </p>
    </motion.div>
  );
}
