'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrandMark } from '@/components/ui/BrandMark';

interface AnimatedLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  glow?: boolean;
}

export function AnimatedLogo({
  size = 48,
  showText = false,
  className,
  glow = true,
}: AnimatedLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      {glow && (
        <motion.div
          className="absolute -inset-3 rounded-xl bg-gradient-to-r from-primary/30 to-cyan-400/20 blur-xl"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.div
        className="relative flex items-center"
        animate={{ rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BrandMark size={size} showText={showText} />
      </motion.div>
    </div>
  );
}
