export const siteConfig = {
  name: 'NeoNode Web Solution',
  shortName: 'NeoNode',
  tagline: 'Premium Web Development Agency · Rajkot, Gujarat',
  description:
    'NeoNode Web Solution builds fast, SEO-optimized websites and custom web applications for businesses in Rajkot and worldwide. Next.js, TypeScript, direct developer access, free consultation.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://neonodewebsolution.com',
  email: 'contact.neonode@gmail.com',
  phone: '+91 8488834762',
  whatsapp: '918488834762',
  whatsappUrl: 'https://wa.me/918488834762',
  address: {
    street: 'Gayatrinagar',
    city: 'Rajkot',
    state: 'Gujarat',
    zip: '360001',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/neonodeweb',
    instagramHandle: '@neonodeweb',
    whatsapp: 'https://wa.me/918488834762',
    linkedin: 'https://linkedin.com/company/neonode-web-solution',
  },
  assets: {
    instagramQr: '/instagram-qr.png',
  },
  businessHours: {
    weekdays: 'Mon – Sat: 10:00 AM – 7:00 PM IST',
    sunday: 'Sunday: By appointment only',
    response: 'We respond to all inquiries within 24 hours',
  },
  keywords: [
    'web development Rajkot',
    'website design Gujarat',
    'Next.js developer India',
    'business website Rajkot',
    'custom web application',
    'SEO optimization',
    'healthcare website design',
    'restaurant website',
    'real estate website',
    'NeoNode Web Solution',
  ],
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/process' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Business Websites', href: '/services#business-websites' },
    { label: 'E-commerce', href: '/services#e-commerce' },
    { label: 'Custom Applications', href: '/services#custom-web-applications' },
    { label: 'SEO Optimization', href: '/services#seo-optimization' },
    { label: 'Website Maintenance', href: '/services#website-maintenance' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ],
} as const;
