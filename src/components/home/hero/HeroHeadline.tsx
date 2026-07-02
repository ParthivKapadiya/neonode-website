'use client';

import { motion } from 'framer-motion';
import { EASE_OUT, defaultTransition } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const lineTransition = (delay: number, reduced: boolean) => ({
  duration: reduced ? 0 : 0.75,
  delay: reduced ? 0 : delay,
  ease: EASE_OUT,
});

export function HeroHeadline() {
  const reduced = useReducedMotion();

  return (
    <div>
      <motion.div
        className="mb-7 flex flex-wrap items-center gap-2.5"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={lineTransition(0.06, reduced)}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5">
          <span className="text-[10px] font-semibold tracking-wide text-primary sm:text-[11px]">
            SEO-first web development
          </span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase sm:text-[11px]">
          Rajkot · Worldwide
        </span>
      </motion.div>

      <h1 className="text-[2.125rem] leading-[1.04] font-bold tracking-[-0.035em] min-[375px]:text-[2.375rem] sm:text-5xl md:text-[3.35rem] xl:text-[4.1rem]">
        <span className="block overflow-hidden pb-[0.05em]">
          <motion.span
            className="block text-white"
            initial={reduced ? false : { y: '115%' }}
            animate={{ y: 0 }}
            transition={lineTransition(0.14, reduced)}
          >
            Your customers
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.05em]">
          <motion.span
            className="block text-white"
            initial={reduced ? false : { y: '115%' }}
            animate={{ y: 0 }}
            transition={lineTransition(0.24, reduced)}
          >
            are already
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            className="block gradient-text"
            initial={reduced ? false : { y: '115%' }}
            animate={{ y: 0 }}
            transition={lineTransition(0.34, reduced)}
          >
            searching.
          </motion.span>
        </span>
      </h1>

      <motion.p
        className="mt-6 max-w-[36ch] text-base leading-relaxed text-muted sm:mt-7 sm:text-lg"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...defaultTransition, delay: reduced ? 0 : 0.48 }}
      >
        NeoNode builds fast, mobile-ready websites that rank on Google — so the people
        looking for your services find <span className="font-medium text-white/90">you</span>, not
        your competitor.
      </motion.p>
    </div>
  );
}
