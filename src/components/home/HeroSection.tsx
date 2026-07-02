'use client';

import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { HeroInteractiveBackground } from './hero/HeroInteractiveBackground';
import { HeroCopyColumn } from './hero/HeroCopyColumn';
import { HeroSearchSimulator } from './hero/HeroSearchSimulator';
import { HeroScrollIndicator } from './hero/HeroScrollIndicator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 42,
    restDelta: 0.001,
  });

  const copyY = useTransform(smoothScroll, [0, 1], [0, reduced ? 0 : 56]);
  const copyOpacity = useTransform(smoothScroll, [0, 0.5], [1, reduced ? 1 : 0.25]);
  const visualY = useTransform(smoothScroll, [0, 1], [0, reduced ? 0 : -36]);
  const visualScale = useTransform(smoothScroll, [0, 0.65], [1, reduced ? 1 : 0.96]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      <HeroInteractiveBackground />

      <div className="container-custom relative z-10 w-full pt-28 pb-28 sm:pb-32 lg:pt-32 lg:pb-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <motion.div className="order-1 lg:order-none" style={{ y: copyY, opacity: copyOpacity }}>
            <HeroCopyColumn />
          </motion.div>

          <motion.div
            className="order-2 lg:order-none"
            style={{ y: visualY, scale: visualScale }}
          >
            <HeroSearchSimulator />
          </motion.div>
        </div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
}
