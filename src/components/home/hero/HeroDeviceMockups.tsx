'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { EASE_OUT } from '@/lib/motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroFloatingCards } from './HeroFloatingElements';

function LaptopScreen() {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#08080a]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1526] to-[#060a12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,130,246,0.2),transparent_50%)]" />

      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-secondary" />
          <span className="text-[10px] font-bold text-white">NeoNode</span>
        </div>
        <div className="flex gap-3">
          {['Work', 'Services', 'Contact'].map((item) => (
            <span key={item} className="text-[8px] text-white/35">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pt-1">
        <div className="mb-2 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[7px] text-primary">
          Rajkot · Gujarat · Worldwide
        </div>
        <p className="max-w-[180px] text-sm leading-tight font-bold text-white">
          Websites that{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            win clients
          </span>
        </p>
        <div className="mt-3 flex gap-1.5">
          <div className="rounded-md bg-gradient-to-r from-primary to-secondary px-2.5 py-1 text-[7px] font-medium text-white">
            Free Quote
          </div>
          <div className="rounded-md border border-white/10 px-2.5 py-1 text-[7px] text-white/50">
            Portfolio
          </div>
        </div>
      </div>

      <div className="absolute right-3 bottom-3 left-3 grid grid-cols-3 gap-1.5">
        {[
          { label: 'Performance', val: '99+' },
          { label: 'SEO Ready', val: '100%' },
          { label: 'Mobile', val: 'First' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/5 bg-white/[0.03] p-2 backdrop-blur-sm"
          >
            <p className="text-[7px] text-white/40">{item.label}</p>
            <p className="text-[9px] font-bold text-white">{item.val}</p>
          </div>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
      />
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-[#08080a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] to-[#050505]" />
      <div className="flex justify-center pt-2">
        <div className="h-1 w-8 rounded-full bg-white/20" />
      </div>
      <div className="px-3 pt-3">
        <div className="mb-2 h-5 w-5 rounded-md bg-gradient-to-br from-primary to-secondary" />
        <p className="text-[9px] leading-tight font-bold text-white">
          Premium
          <br />
          <span className="text-primary">Websites</span>
        </p>
        <div className="mt-2 space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 rounded-md bg-white/[0.04]" />
          ))}
        </div>
        <div className="mt-2 rounded-md bg-primary/80 py-1 text-center text-[7px] font-medium text-white">
          Contact Us
        </div>
      </div>
    </div>
  );
}

export function HeroDeviceMockups() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    rotateX.set((y - 0.5) * -10);
    rotateY.set((x - 0.5) * 14);
  }, [x, y, rotateX, rotateY, reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.9, ease: EASE_OUT }}
      style={{ perspective: 1200 }}
    >
      <HeroFloatingCards />

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-t-xl border border-white/10 bg-[#1a1a1c] shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-2 border-b border-white/5 bg-[#111113] px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="mx-auto flex h-6 w-48 items-center rounded-md bg-white/[0.04] px-3">
                <span className="truncate text-[10px] text-muted">neonodewebsolution.com</span>
              </div>
            </div>
            <LaptopScreen />
          </div>

          <div className="relative mx-auto h-3 w-[105%] -translate-x-[2.5%] rounded-b-lg bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1c] shadow-lg">
            <div className="absolute top-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-b-md bg-[#3a3a3e]" />
          </div>
        </div>

        <motion.div
          className="absolute -right-2 -bottom-6 z-30 w-[28%] min-w-[90px] max-w-[120px] sm:-right-4 sm:-bottom-8 lg:-right-8"
          initial={{ opacity: 0, y: 30, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="overflow-hidden rounded-[1.25rem] border-[3px] border-[#2a2a2e] bg-[#1a1a1c] shadow-2xl shadow-black/50"
          >
            <div className="aspect-[9/19]">
              <PhoneScreen />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
