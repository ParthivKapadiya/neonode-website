import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/data/content';
import { portfolioProjects } from '@/data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/process',
    '/pricing',
    '/faq',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const portfolioPages = portfolioProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages];
}
