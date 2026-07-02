'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { defaultTransition } from '@/lib/motion';
import { siteConfig } from '@/config/site';
import { HERO_TRUST_PILLS } from './copy';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function HeroTrustStrip() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mt-8 border-t border-white/[0.06] pt-7 sm:mt-9"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay: reduced ? 0 : 0.68 }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03]">
          <Clock className="h-4 w-4 text-primary/70" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-white/90">{siteConfig.businessHours.response}</p>
          <p className="mt-0.5 text-xs text-muted">{siteConfig.businessHours.weekdays}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {HERO_TRUST_PILLS.map(({ label, accent }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] py-1 pr-3 pl-1.5"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-semibold tracking-wide text-muted uppercase sm:text-[11px]">
              {label}
            </span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
