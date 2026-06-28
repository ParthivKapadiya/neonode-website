import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { blogPosts } from '@/data/content';
import { formatDate } from '@/lib/utils';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <PageHero label={post.category} title={post.title} description={post.excerpt} />

      <section className="section-padding !pt-8">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="mb-8 flex items-center gap-4 text-sm text-muted">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <div
              className={cn(
                'mb-10 aspect-[21/9] rounded-2xl bg-gradient-to-br',
                post.gradient,
              )}
            />

            <article className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted">{post.content}</p>
              <p className="mt-6 text-muted leading-relaxed">
                At NeoNode Web Solution, we believe that staying informed about the latest web
                development trends and best practices is essential to delivering exceptional
                results for our clients. Whether you&apos;re planning a new website or optimizing
                an existing one, our team is here to help you navigate the digital landscape
                with confidence.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Ready to take your web presence to the next level?{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  Get in touch
                </Link>{' '}
                for a free consultation and discover how we can help your business grow.
              </p>
            </article>

            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
