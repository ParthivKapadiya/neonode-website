import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description:
      'Professional multi-page websites for local businesses that need to be found on Google and convert visitors into calls and inquiries.',
    problem:
      'Your business relies on word-of-mouth, but new customers search online first. An outdated or missing website means they choose a competitor before you get a chance.',
    solution:
      'We build a fast, mobile-first business website with clear service pages, trust signals, contact forms, and WhatsApp integration — optimized for local SEO in Rajkot and beyond.',
    icon: 'Building2',
    benefits: ['More phone & WhatsApp inquiries', 'Professional credibility', 'Found on Google locally'],
    features: ['Custom homepage & service pages', 'Contact & inquiry forms', 'Google Analytics setup', 'WhatsApp click-to-chat'],
  },
  {
    id: 'corporate-websites',
    title: 'Corporate Websites',
    description:
      'Structured corporate sites for companies that need brand consistency, team pages, and investor-ready presentation at scale.',
    problem:
      'As your company grows, a single-page site cannot communicate your full offering. Departments share outdated PDFs and your brand looks inconsistent online.',
    solution:
      'We architect a multi-page corporate website with clear information hierarchy, team and leadership pages, careers section, and CMS-ready structure for your marketing team.',
    icon: 'Briefcase',
    benefits: ['Enterprise-grade credibility', 'Scalable content structure', 'Consistent brand presence'],
    features: ['Multi-page architecture', 'Team & leadership profiles', 'News / updates section', 'Brand-aligned design system'],
  },
  {
    id: 'portfolio-websites',
    title: 'Portfolio Websites',
    description:
      'Showcase websites for interior designers, photographers, architects, and creatives whose work must impress before the first conversation.',
    problem:
      'Your best work lives on Instagram or in PDFs. Potential clients cannot browse projects properly, and you lose high-value leads to competitors with polished online portfolios.',
    solution:
      'We design gallery-driven portfolio sites with project case studies, category filters, and contact flows that turn admiration into booked consultations.',
    icon: 'Palette',
    benefits: ['Work presented at its best', 'Higher-value client inquiries', 'Memorable brand identity'],
    features: ['Project gallery & case studies', 'Category filtering', 'Lightbox media viewer', 'Consultation booking CTA'],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description:
      'Single-purpose pages built for ad campaigns, product launches, and lead generation — every pixel focused on one conversion goal.',
    problem:
      'Sending paid traffic to your homepage wastes ad spend. Visitors get distracted by navigation and leave without taking action.',
    solution:
      'We build focused landing pages with a single CTA, social proof, benefit-driven copy, and conversion tracking — ready for Google Ads and Meta campaigns.',
    icon: 'Rocket',
    benefits: ['Higher campaign ROI', 'Faster launch (2–3 weeks)', 'Clear conversion tracking'],
    features: ['Single CTA focus', 'A/B-test ready layout', 'Meta & Google pixel setup', 'Mobile-first design'],
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description:
      'Online stores with product catalogs, secure checkout, and order workflows — built to handle real sales from day one.',
    problem:
      'Selling through WhatsApp and Instagram DMs does not scale. You need inventory tracking, payment collection, and a professional storefront customers trust.',
    solution:
      'We build e-commerce websites with product management, cart and checkout, payment gateway integration, and order notification flows tailored to your business.',
    icon: 'ShoppingCart',
    benefits: ['Sell 24/7 online', 'Automated order handling', 'Professional checkout experience'],
    features: ['Product catalog & categories', 'Razorpay / Stripe integration', 'Order email notifications', 'Mobile shopping experience'],
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Applications',
    description:
      'Bespoke platforms — dashboards, booking systems, SaaS products, and real-time apps — architected for your exact workflow.',
    problem:
      'Off-the-shelf software forces you to change how you work. You need a system built around your process, users, and data.',
    solution:
      'We design and develop custom web applications with authentication, role-based access, APIs, and real-time features — like the live auction platform we built for AuctionXI.',
    icon: 'Code2',
    benefits: ['Workflow automation', 'Real-time capabilities', 'Scales with your business'],
    features: ['User auth & role management', 'REST / WebSocket APIs', 'Admin dashboards', 'PostgreSQL database'],
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    description:
      'Ongoing updates, security patches, and content changes so your site stays fast, secure, and current without pulling you away from your business.',
    problem:
      'Websites break, plugins get outdated, and content goes stale. Without regular maintenance, performance drops and security risks grow silently.',
    solution:
      'We offer monthly maintenance plans covering security updates, content changes, uptime monitoring, and priority support from the team that built your site.',
    icon: 'Shield',
    benefits: ['Always secure & updated', 'No technical headaches', 'Priority support access'],
    features: ['Security & dependency updates', 'Content & image updates', 'Monthly performance check', 'Priority WhatsApp support'],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description:
      'Technical and on-page SEO that helps customers find you on Google — schema markup, meta tags, sitemaps, and Core Web Vitals included.',
    problem:
      'You invested in a website but it does not appear when people search for your services in Rajkot or your target city. Organic traffic stays at zero.',
    solution:
      'We audit your site, fix technical SEO issues, implement schema markup, optimize page titles and content structure, and improve Core Web Vitals for better rankings.',
    icon: 'Search',
    benefits: ['More organic traffic', 'Local search visibility', 'Long-term lead growth'],
    features: ['Technical SEO audit', 'Schema & meta optimization', 'Sitemap & robots setup', 'Core Web Vitals improvement'],
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description:
      'Speed optimization that cuts load times and targets 95+ Lighthouse scores — because every second of delay costs you customers.',
    problem:
      'Your site takes 4–6 seconds to load on mobile. Visitors leave before seeing your offer, and Google ranks you lower because of poor performance scores.',
    solution:
      'We profile your site, optimize images, implement lazy loading, reduce JavaScript bundle size, and configure CDN caching to deliver sub-2-second load times.',
    icon: 'Zap',
    benefits: ['Faster page loads', 'Better Google rankings', 'Lower bounce rates'],
    features: ['Lighthouse audit & fixes', 'Image & font optimization', 'Code splitting & lazy load', 'CDN & caching setup'],
  },
];

export const serviceOptions = services.map((s) => ({
  value: s.id,
  label: s.title,
}));
