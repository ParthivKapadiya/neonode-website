export const trustedBusinesses = [
  {
    name: 'Patel Family Clinic',
    industry: 'Healthcare',
    location: 'Rajkot, Gujarat',
    result: 'Live site — patelfamilyclinic.com',
  },
  {
    name: 'AuctionXI Platform',
    industry: 'SaaS · Live Auctions',
    location: 'Custom Web Application',
    result: 'Real-time bidding system deployed',
  },
  {
    name: 'Restaurants & Hospitality',
    industry: 'Concept Showcase',
    location: 'Saffron Table',
    result: 'Menu, reservations & gallery',
  },
  {
    name: 'Fitness & Wellness',
    industry: 'Concept Showcase',
    location: 'IronPulse Fitness',
    result: 'Memberships & class booking',
  },
];

export const technologies = [
  {
    name: 'Next.js',
    category: 'Framework',
    description: 'Server-rendered React for blazing performance and SEO.',
    color: '#ffffff',
  },
  {
    name: 'React',
    category: 'Library',
    description: 'Component-driven UI built for interactive experiences.',
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    description: 'Type-safe code that scales with your business.',
    color: '#3178C6',
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    description: 'Robust backend APIs and server-side logic.',
    color: '#68A063',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Reliable relational data storage at any scale.',
    color: '#336791',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    description: 'Utility-first CSS for pixel-perfect responsive design.',
    color: '#06B6D4',
  },
  {
    name: 'Framer Motion',
    category: 'Animation',
    description: 'Production-grade motion design and micro-interactions.',
    color: '#BB4BD9',
  },
  {
    name: 'Vercel',
    category: 'Deployment',
    description: 'Edge-optimized hosting with global CDN delivery.',
    color: '#ffffff',
  },
];

export const homeTestimonials = [
  {
    id: '1',
    name: 'Dr. Hiren K. Patel',
    role: 'Family & Emergency Physician',
    company: 'Patel Family Clinic',
    content:
      'NeoNode understood what a healthcare website needs — warmth, clarity, and trust. Patients now find our services online, book via WhatsApp, and the site reflects the care we have provided Rajkot families since 1981.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Platform Owner',
    role: 'Founder',
    company: 'AuctionXI',
    content:
      'Building a live auction platform is complex — real-time bidding, user roles, admin controls. NeoNode handled every technical challenge and delivered a system that works flawlessly on event day.',
    rating: 5,
  },
];

export const homeNavSections = [
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const industryOptions = [
  { value: 'business', label: 'Business / Corporate' },
  { value: 'restaurant', label: 'Restaurant / Food' },
  { value: 'healthcare', label: 'Healthcare / Medical' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'gym', label: 'Gym / Fitness' },
  { value: 'education', label: 'Education / Training' },
  { value: 'saas', label: 'SaaS / Technology' },
  { value: 'ecommerce', label: 'E-commerce / Retail' },
  { value: 'other', label: 'Other' },
];

export const timelineOptions = [
  { value: 'asap', label: 'ASAP — within 4 weeks' },
  { value: '1-2-months', label: '1–2 months' },
  { value: '2-3-months', label: '2–3 months' },
  { value: '3-plus-months', label: '3+ months — flexible timeline' },
  { value: 'exploring', label: 'Just exploring options' },
];

export const guaranteeItems = [
  {
    icon: 'ShieldCheck',
    title: 'Quality Promise',
    description:
      'Every site we deliver is tested across devices, optimized for speed, and built with clean, maintainable code you can rely on long after launch.',
  },
  {
    icon: 'Clock',
    title: 'On-Time Delivery',
    description:
      'We set realistic timelines upfront and communicate proactively. If we commit to a date, we work to meet it — with weekly progress updates along the way.',
  },
  {
    icon: 'MessageSquare',
    title: 'Direct Communication',
    description:
      'No middlemen or ticket queues. You work directly with the developers building your project via WhatsApp, email, or video call.',
  },
  {
    icon: 'RefreshCw',
    title: 'Post-Launch Support',
    description:
      'Every project includes post-launch support. We fix issues, help with content updates, and ensure your site performs from day one.',
  },
];

export const beforeAfterMetrics = {
  before: {
    label: 'Typical outdated site',
    loadTime: '4.8s',
    mobileScore: '52',
    seoScore: '61',
    conversion: '1.2%',
  },
  after: {
    label: 'NeoNode-built site',
    loadTime: '1.1s',
    mobileScore: '98',
    seoScore: '100',
    conversion: '3.8%',
  },
};

export const pricingEstimatorDefaults = {
  basePrice: 1500,
  pagePrice: 250,
  featurePrices: {
    cms: 400,
    ecommerce: 1200,
    booking: 600,
    multilingual: 500,
    animations: 350,
    seo: 300,
  },
};
