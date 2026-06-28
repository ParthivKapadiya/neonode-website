'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/ui/BrandMark';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SESSION_KEY = 'neonode-loaded';

export function LoadingScreen() {
  const reduced = useReducedMotion();
  const [isLoading, setIsLoading] = useState(
    () => !reduced && sessionStorage.getItem(SESSION_KEY) !== '1',
  );

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <BrandMark size={96} />
          </motion.div>

          <div className="h-0.5 w-28 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
