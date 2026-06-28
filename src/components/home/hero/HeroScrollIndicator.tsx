'use client';

import { motion } from 'framer-motion';

export function HeroScrollIndicator() {
  return (
    <motion.a
      href="#trusted"
      className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      aria-label="Scroll to explore"
    >
      <motion.span
        className="text-[10px] font-medium tracking-[0.25em] text-muted uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll to explore
      </motion.span>
      <motion.div
        className="relative flex h-12 w-7 items-start justify-center rounded-full border border-white/15 bg-white/[0.03] p-2 backdrop-blur-sm"
        animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(59,130,246,0.4)', 'rgba(255,255,255,0.1)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-gradient-to-b from-primary to-secondary"
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.a>
  );
}
