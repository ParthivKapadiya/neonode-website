'use client';

import { motion } from 'framer-motion';
import { HERO_INLINE_STATS } from './copy';
import { EASE_OUT } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroStatsRow() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6"
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: reduced ? 0 : 0.58, ease: EASE_OUT }}
    >
      {HERO_INLINE_STATS.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-2">
          <span className="text-xl font-bold tabular-nums text-white sm:text-2xl">{stat.value}</span>
          <span className="text-[11px] font-medium tracking-wide text-muted uppercase">{stat.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
