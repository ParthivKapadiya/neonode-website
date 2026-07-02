'use client';

import { useCallback, useRef } from 'react';
import { useMotionValue, animate, type MotionValue } from 'framer-motion';

type MagneticRef = React.RefObject<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement | null>;

export function useMagneticEffect(strength = 0.3): {
  ref: MagneticRef;
  x: MotionValue<number>;
  y: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
} {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left - rect.width / 2) * strength;
      const offsetY = (e.clientY - rect.top - rect.height / 2) * strength;

      x.set(offsetX);
      y.set(offsetY);
    },
    [strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
  }, [x, y]);

  return { ref, x, y, handleMouseMove, handleMouseLeave };
}
