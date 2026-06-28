export interface Service {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  icon: string;
  features: string[];
  benefits: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  objective: string;
  category: PortfolioCategory;
  industry: string;
  technologies: string[];
  features: string[];
  gradient: string;
  accentColor: string;
  year: number;
  client: string;
  websiteUrl?: string;
  previewImage?: string;
  isDemo?: boolean;
}

export type PortfolioCategory =
  | 'all'
  | 'business'
  | 'restaurant'
  | 'healthcare'
  | 'real-estate'
  | 'gym'
  | 'education'
  | 'saas'
  | 'ecommerce';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  gradient: string;
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface BrandStory {
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  approach: { title: string; description: string }[];
  trustPoints: string[];
}
