'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroInteractiveBackground() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();

  const spotX = useSpring(50, { stiffness: 60, damping: 20 });
  const spotY = useSpring(50, { stiffness: 60, damping: 20 });
  const left = useTransform(spotX, (v) => `${v}%`);
  const top = useTransform(spotY, (v) => `${v}%`);

  useEffect(() => {
    spotX.set(x * 100);
    spotY.set(y * 100);
  }, [x, y, spotX, spotY]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(124,58,237,0.12),transparent_55%)]" />

      {!reduced && (
        <motion.div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[100px]"
          style={{
            left,
            top,
            background:
              'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)',
          }}
        />
      )}

      {[
        { className: 'left-[8%] top-[18%] h-80 w-80 bg-primary/25', dx: 40, dy: -30, dur: 20 },
        { className: 'right-[6%] top-[22%] h-96 w-96 bg-secondary/20', dx: -35, dy: 25, dur: 24 },
        { className: 'bottom-[12%] left-[35%] h-72 w-72 bg-cyan-500/15', dx: 25, dy: -20, dur: 18 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${orb.className}`}
          animate={
            reduced
              ? undefined
              : { x: [0, orb.dx, 0], y: [0, orb.dy, 0], scale: [1, 1.12, 1] }
          }
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 10%, transparent 75%)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_75%)]" />
    </div>
  );
}
