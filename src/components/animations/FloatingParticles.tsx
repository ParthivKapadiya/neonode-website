'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PARTICLE_COUNT = 10;

export function FloatingParticles() {
  const reduced = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: 2 + (i % 3),
        duration: 8 + (i % 6) * 2,
        delay: (i % 5) * 0.8,
        opacity: 0.15 + (i % 4) * 0.08,
      })),
    [],
  );

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/60"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.id % 2 === 0 ? 12 : -12, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
