'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-primary to-secondary"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
