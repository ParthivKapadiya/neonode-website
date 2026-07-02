'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const SCROLL_SPRING = { stiffness: 300, damping: 40 };

export function ScrollProgress() {
  const progress = useScrollProgress();
  const raw = useMotionValue(progress);
  const smooth = useSpring(raw, SCROLL_SPRING);
  const width = useTransform(smooth, (v) => `${v}%`);

  useEffect(() => {
    raw.set(progress);
  }, [progress, raw]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-primary to-secondary"
      style={{ width }}
      aria-hidden="true"
    />
  );
}
