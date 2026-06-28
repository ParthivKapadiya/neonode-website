/** Shared design tokens — keep visual language consistent across components */
export const radius = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  full: 'rounded-full',
} as const;

export const shadow = {
  card: 'shadow-lg shadow-black/20',
  cardHover: 'shadow-xl shadow-primary/5',
  glow: 'shadow-lg shadow-primary/25',
} as const;

export const cardBase =
  'rounded-2xl border border-border bg-card/50 backdrop-blur-sm';

export const touchTarget = 'min-h-11 min-w-11';
