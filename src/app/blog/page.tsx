import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { blogPosts } from '@/data/content';
import { cn } from '@/lib/utils';

export const metadata = createMetadata({
  title: 'Blog',
  description:
    'Insights on web development, design, performance, and digital strategy from the NeoNode Web Solution team.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Blog"
        title="Insights & Resources"
        description="Expert perspectives on web development, design trends, performance optimization, and digital strategy."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className={cn(
                      'aspect-[16/10] bg-gradient-to-br',
                      post.gradient,
                    )}
                  />
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
