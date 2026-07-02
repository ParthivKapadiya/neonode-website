'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_OUT, LOADING_HOLD_MS } from '@/lib/motion';

const LOADING_HOLD_S = LOADING_HOLD_MS / 1000;

export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [isLoading, setIsLoading] = useState(
    () => !reduced && sessionStorage.getItem('neonode-loaded') !== '1',
  );

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem('neonode-loaded', '1');
      setIsLoading(false);
    }, LOADING_HOLD_MS);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <BrandMark size={96} />
          </motion.div>

          <div className="h-0.5 w-28 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: LOADING_HOLD_S, ease: EASE_OUT }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
