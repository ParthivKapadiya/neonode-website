export const SEARCH_QUERIES = [
  'family clinic rajkot',
  'restaurant website design',
  'web developer gujarat',
  'business website near me',
] as const;

export const SEARCH_RESULT = {
  url: 'yourbusiness.com',
  title: 'Your Business — Trusted Local Service',
  description:
    'Professional website built for speed, mobile, and Google. Book online, find services, and reach customers searching right now.',
  tags: ['Organic', 'Mobile-friendly', 'Fast'],
} as const;

export const HERO_INLINE_STATS = [
  { value: '95+', label: 'Lighthouse' },
  { value: '24hr', label: 'Response' },
  { value: '2–4wk', label: 'Delivery' },
] as const;

export const HERO_TRUST_PILLS = [
  { label: 'Core Web Vitals', accent: '#34d399' },
  { label: 'Schema markup', accent: '#3b82f6' },
  { label: 'Mobile-first', accent: '#a78bfa' },
] as const;
