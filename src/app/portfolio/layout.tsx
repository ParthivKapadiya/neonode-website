import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Portfolio',
  description:
    'Explore NeoNode Web Solution portfolio — live client websites for healthcare and tech, plus concept showcases for restaurants, gyms, real estate, and more.',
  path: '/portfolio',
  keywords: [
    'web development portfolio Rajkot',
    'healthcare website design',
    'restaurant website Gujarat',
    'NeoNode projects',
    ...['Next.js', 'TypeScript', 'Tailwind CSS'],
  ],
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
