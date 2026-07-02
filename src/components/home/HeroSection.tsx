'use client';

import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { HeroInteractiveBackground } from './hero/HeroInteractiveBackground';
import { HeroHeadline } from './hero/HeroHeadline';
import { HeroButtons } from './hero/HeroButtons';
import { HeroDeviceMockups } from './hero/HeroDeviceMockups';
import { HeroScrollIndicator } from './hero/HeroScrollIndicator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const trustBadges = [
  { label: 'Live: patelfamilyclinic.com', color: 'bg-emerald-400' },
  { label: '95+ Lighthouse target', color: 'bg-primary' },
  { label: 'Free consultation · 24hr reply', color: 'bg-secondary' },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  const copyY = useTransform(smoothScroll, [0, 1], [0, reduced ? 0 : 80]);
  const copyOpacity = useTransform(smoothScroll, [0, 0.6], [1, reduced ? 1 : 0.3]);
  const mockupY = useTransform(smoothScroll, [0, 1], [0, reduced ? 0 : -40]);
  const mockupScale = useTransform(smoothScroll, [0, 0.5], [1, reduced ? 1 : 0.95]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <HeroInteractiveBackground />

      <div className="container-custom relative z-10 w-full pt-28 pb-32 lg:pt-32 lg:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="order-1 lg:order-none"
            style={{ y: copyY, opacity: copyOpacity }}
          >
            <HeroHeadline />
            <HeroButtons />

            <motion.div
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {trustBadges.map((item, i) => (
                <motion.span
                  key={item.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05 + i * 0.08 }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                  {item.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="order-2 lg:order-none"
            style={{ y: mockupY, scale: mockupScale }}
          >
            <HeroDeviceMockups />
          </motion.div>
        </div>
      </div>

      <HeroScrollIndicator />
    </section>
  );
}
