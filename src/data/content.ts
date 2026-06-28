import type { Testimonial, FAQItem, ProcessStep, PricingPlan, BlogPost, Statistic, TrustItem } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Hiren K. Patel',
    role: 'Family & Emergency Physician',
    company: 'Patel Family Clinic',
    content:
      'NeoNode delivered a website that truly represents our clinic — professional, warm, and easy for patients to navigate. Online inquiries increased significantly within the first month of launch.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Platform Owner',
    role: 'Founder',
    company: 'AuctionXI',
    content:
      'The custom auction platform NeoNode built handles real-time bidding flawlessly. Their technical expertise and attention to detail made complex requirements feel effortless.',
    rating: 5,
  },
];

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How much does a website cost?',
    answer:
      'Business websites start from ₹40,000. Landing pages from ₹20,000. E-commerce and custom applications are quoted based on scope. We provide a fixed quote after our free consultation — no hidden fees. Use the pricing estimator on our homepage for a ballpark range.',
  },
  {
    id: '2',
    question: 'How long will my project take?',
    answer:
      'Landing pages: 2–3 weeks. Business websites (5–10 pages): 4–6 weeks. E-commerce stores: 6–10 weeks. Custom web applications: 8–16 weeks. We share a detailed timeline in your project proposal before work begins.',
  },
  {
    id: '3',
    question: 'Do you offer website maintenance after launch?',
    answer:
      'Yes. Every project includes 30–60 days of post-launch support for bug fixes and minor adjustments. We also offer monthly maintenance plans (from ₹5,000/month) covering security updates, content changes, performance checks, and priority WhatsApp support.',
  },
  {
    id: '4',
    question: 'Do you provide hosting?',
    answer:
      'We deploy websites on Vercel (recommended for Next.js sites) or your preferred hosting provider. Domain registration and hosting costs are separate from development fees — typically ₹1,000–3,000/year for domains and ₹0–2,000/month for hosting on Vercel’s free or pro tier. We handle the full setup for you.',
  },
  {
    id: '5',
    question: 'Is SEO included in every project?',
    answer:
      'Basic SEO is included: meta titles, descriptions, schema markup, sitemap, robots.txt, and Core Web Vitals optimization. Advanced SEO packages (keyword research, content strategy, local SEO campaigns) are available as add-ons starting from ₹15,000.',
  },
  {
    id: '6',
    question: 'What support do I get after the site goes live?',
    answer:
      'You get direct WhatsApp and email access to your developer. Post-launch support covers bug fixes, broken links, and minor content updates. For ongoing changes, our maintenance plans include monthly content updates and security patches.',
  },
  {
    id: '7',
    question: 'What payment methods and terms do you accept?',
    answer:
      'We accept bank transfer (NEFT/IMPS/UPI), Razorpay, and PayPal for international clients. Standard terms: 40% upfront to begin, 40% at design approval, 20% before launch. For smaller projects under ₹50,000, we offer 50/50 split.',
  },
  {
    id: '8',
    question: 'What is your development process?',
    answer:
      'Five phases: (1) Discovery call — free, 30 minutes. (2) Strategy & proposal with fixed pricing. (3) Design mockups for your approval. (4) Development with weekly staging links. (5) Launch, QA, analytics setup, and handover documentation. You approve each phase before we proceed.',
  },
  {
    id: '9',
    question: 'Do you work with clients outside Rajkot?',
    answer:
      'Yes. We are based in Rajkot, Gujarat, and serve clients across India and internationally. Communication via WhatsApp, email, and video call. We have delivered projects for clients who never visited our office — remote collaboration is our default.',
  },
  {
    id: '10',
    question: 'Can I see examples of your work?',
    answer:
      'Yes. Visit our Portfolio page for live client projects (patelfamilyclinic.com, AuctionXI platform) and concept showcases across restaurants, gyms, dental clinics, real estate, education, travel, and construction. Concept projects demonstrate our design capability for your industry.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery Call',
    description:
      'We learn about your business, goals, target audience, and competitors. You share any existing branding, content, or inspiration. This call is free and takes 30–45 minutes.',
    duration: 'Week 1',
  },
  {
    step: 2,
    title: 'Strategy & Scope',
    description:
      'We define page structure, user flows, technical approach, and a fixed project timeline with milestones. You receive a clear proposal with deliverables and pricing.',
    duration: 'Week 1–2',
  },
  {
    step: 3,
    title: 'Design',
    description:
      'We create visual mockups for key pages — homepage, services, contact — aligned with your brand. You review and approve before any code is written.',
    duration: '2–3 weeks',
  },
  {
    step: 4,
    title: 'Development',
    description:
      'We build your site with clean TypeScript code, responsive layouts, SEO setup, and performance optimization. You get staging links to review progress weekly.',
    duration: '3–8 weeks',
  },
  {
    step: 5,
    title: 'Launch & Support',
    description:
      'We deploy to production, run final QA across devices, set up analytics, and provide post-launch support. You receive documentation and training for content updates.',
    duration: '1 week+',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small businesses ready to establish a professional online presence.',
    price: '₹40,000',
    period: 'starting at',
    features: [
      'Up to 5 custom pages',
      'Responsive mobile design',
      'Contact form & WhatsApp',
      'Basic SEO setup',
      'Google Analytics',
      '30 days post-launch support',
    ],
    cta: 'Get Started',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses that need custom design and advanced features.',
    price: '₹1,20,000',
    period: 'starting at',
    highlighted: true,
    features: [
      'Up to 15 custom pages',
      'Custom UI/UX design',
      'CMS for content updates',
      'Advanced SEO optimization',
      'Performance optimization',
      'Blog setup',
      '60 days post-launch support',
    ],
    cta: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For custom web applications, integrations, and dedicated support.',
    price: 'Custom',
    period: 'tailored pricing',
    features: [
      'Custom web application',
      'Real-time features & APIs',
      'Third-party integrations',
      'Dedicated developer',
      'Priority support SLA',
      'Ongoing maintenance plan',
      'Quarterly performance reviews',
    ],
    cta: 'Contact Us',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-nextjs-is-the-future-of-web-development',
    title: 'Why Next.js Is the Future of High-Performance Web Development',
    excerpt:
      'Discover how Next.js delivers superior performance, SEO capabilities, and developer experience for modern business websites.',
    content:
      'Next.js has emerged as the leading framework for production web applications. With server-side rendering, static generation, and edge computing capabilities, it enables businesses to deliver lightning-fast experiences that rank well in search engines and convert visitors into customers.',
    category: 'Technology',
    author: 'NeoNode Team',
    date: '2025-05-15',
    readTime: '6 min read',
    gradient: 'from-blue-950 to-indigo-950',
  },
  {
    slug: 'conversion-focused-landing-page-design',
    title: '7 Principles of Conversion-Focused Landing Page Design',
    excerpt:
      'Learn the design principles that turn landing page visitors into qualified leads and paying customers.',
    content:
      'A beautiful landing page means nothing if it does not convert. We break down the seven essential principles — from above-the-fold clarity to social proof placement — that consistently drive higher conversion rates for our clients.',
    category: 'Design',
    author: 'NeoNode Team',
    date: '2025-04-28',
    readTime: '8 min read',
    gradient: 'from-purple-950 to-violet-950',
  },
  {
    slug: 'website-performance-impact-on-revenue',
    title: 'How Website Performance Directly Impacts Your Revenue',
    excerpt:
      'Every second of load time costs you customers. Here is the data-backed case for investing in performance optimization.',
    content:
      'Studies show that a one-second delay in page load time can reduce conversions by 7%. We explore the direct correlation between Core Web Vitals, user experience, and revenue — and share actionable steps to improve your site speed.',
    category: 'Performance',
    author: 'NeoNode Team',
    date: '2025-03-10',
    readTime: '5 min read',
    gradient: 'from-emerald-950 to-teal-950',
  },
];

export const statistics: Statistic[] = [
  { value: 2, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 95, suffix: '+', label: 'Lighthouse Score Target' },
  { value: 24, suffix: 'hr', label: 'Response Time' },
];

export const trustItems: TrustItem[] = [
  {
    icon: 'Zap',
    title: 'Fast Delivery',
    description: 'Realistic timelines with weekly progress updates — no endless delays.',
  },
  {
    icon: 'Search',
    title: 'SEO Built In',
    description: 'Schema markup, meta tags, and Core Web Vitals optimization from day one.',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile First',
    description: 'Designed for phones first — where most of your customers will find you.',
  },
  {
    icon: 'Cpu',
    title: 'Modern Stack',
    description: 'Next.js, TypeScript, and PostgreSQL — the same tools used by top tech companies.',
  },
  {
    icon: 'Layers',
    title: 'Scalable Code',
    description: 'Clean architecture that grows with your business, not against it.',
  },
  {
    icon: 'Code2',
    title: 'Clean Code',
    description: 'Readable, documented TypeScript your future team can maintain.',
  },
  {
    icon: 'Headphones',
    title: 'Direct Support',
    description: 'WhatsApp and email access to the developer who built your site.',
  },
  {
    icon: 'Eye',
    title: 'Transparent Process',
    description: 'Staging links, weekly updates, and no hidden scope creep.',
  },
];

export const whyChooseUs = [
  {
    title: 'You Talk to the Developer',
    description:
      'No account managers relaying messages. When you contact NeoNode, you speak directly with the person writing your code — faster decisions, clearer communication.',
    icon: 'Users',
  },
  {
    title: 'Built for Results, Not Just Looks',
    description:
      'Every design choice serves a purpose: faster load times, clearer CTAs, better search rankings. We measure success by inquiries and conversions, not just aesthetics.',
    icon: 'Target',
  },
  {
    title: '95+ Lighthouse Scores',
    description:
      'Performance is non-negotiable. Our sites target 95+ on Google Lighthouse for speed, SEO, and accessibility — because slow sites lose customers.',
    icon: 'Gauge',
  },
  {
    title: 'Real Projects, Real Proof',
    description:
      'Patel Family Clinic and AuctionXI are live, working products — not mockups. We let our work speak for itself.',
    icon: 'Award',
  },
];

export const budgetOptions = [
  { value: 'under-50k', label: 'Under ₹50,000' },
  { value: '50k-1L', label: '₹50,000 – ₹1,00,000' },
  { value: '1L-3L', label: '₹1,00,000 – ₹3,00,000' },
  { value: '3L-5L', label: '₹3,00,000 – ₹5,00,000' },
  { value: '5L-plus', label: '₹5,00,000+' },
  { value: 'not-sure', label: 'Not sure yet — need guidance' },
];
