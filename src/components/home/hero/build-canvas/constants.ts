import type { CSSProperties } from 'react';

export const PHASES = [
  { id: 'blueprint', label: 'Blueprint', sub: 'Strategy & wireframes', color: '#22d3ee' },
  { id: 'structure', label: 'Structure', sub: 'React components', color: '#a78bfa' },
  { id: 'style', label: 'Style', sub: 'Brand & tokens', color: '#3b82f6' },
  { id: 'launch', label: 'Launch', sub: 'Ship & optimize', color: '#34d399' },
] as const;

export const LOOP_MS = 11000;

export const SLOTS = {
  nav: { top: 5.5, left: 5, w: 90, h: 7.5 },
  hero: { top: 16, left: 5, w: 58, h: 30 },
  heroAside: { top: 16, left: 66, w: 29, h: 30 },
  card1: { top: 50, left: 5, w: 28, h: 24 },
  card2: { top: 50, left: 36, w: 28, h: 24 },
  card3: { top: 50, left: 67, w: 28, h: 24 },
  cta: { top: 78, left: 5, w: 32, h: 7 },
} as const;

export type SlotKey = keyof typeof SLOTS;

export function slotStyle(key: SlotKey): CSSProperties {
  const s = SLOTS[key];
  return {
    top: `${s.top}%`,
    left: `${s.left}%`,
    width: `${s.w}%`,
    height: `${s.h}%`,
  };
}

export function phaseWeights(progress: number) {
  const w = (start: number, peak: number, end: number) => {
    if (progress <= start || progress >= end) return 0;
    if (progress <= peak) return (progress - start) / (peak - start);
    return 1 - (progress - peak) / (end - peak);
  };

  return {
    blueprint: w(0, 0.1, 0.32),
    structure: w(0.18, 0.38, 0.58),
    style: w(0.44, 0.58, 0.76),
    launch: progress < 0.62 ? 0 : Math.min(1, (progress - 0.62) / 0.22),
  };
}

export function autoPlayProgress(elapsed: number, total: number) {
  const t = (elapsed % total) / total;
  if (t < 0.22) return (t / 0.22) * 0.28;
  if (t < 0.48) return 0.28 + ((t - 0.22) / 0.26) * 0.24;
  if (t < 0.72) return 0.52 + ((t - 0.48) / 0.24) * 0.22;
  if (t < 0.9) return 0.74 + ((t - 0.72) / 0.18) * 0.26;
  return 1;
}

export function activePhaseIndex(progress: number) {
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}
