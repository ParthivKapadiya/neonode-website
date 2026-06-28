import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { portfolioProjects } from '@/data/portfolio';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${slug}`,
    keywords: [project.industry, ...project.technologies, 'NeoNode portfolio'],
  });
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <PageHero
        label={project.isDemo ? `${project.industry} · Concept` : project.industry}
        title={project.title}
        description={project.description}
      />

      <section className="section-padding !pt-8">
        <div className="container-custom">
          <FadeIn>
            <div
              className={cn(
                'relative mb-12 aspect-[21/9] overflow-hidden rounded-2xl bg-gradient-to-br',
                project.gradient,
              )}
            />
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold text-white">Project Overview</h2>
              <p className="leading-relaxed text-muted">{project.longDescription}</p>

              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
                  Objective
                </p>
                <p className="text-sm leading-relaxed text-muted">{project.objective}</p>
              </div>

              <h3 className="mt-10 mb-4 text-xl font-semibold text-white">Key Features</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-6 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
                <div>
                  <p className="text-xs tracking-wider text-muted uppercase">Client</p>
                  <p className="mt-1 font-medium text-white">{project.client}</p>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-muted uppercase">Industry</p>
                  <p className="mt-1 font-medium text-white">{project.industry}</p>
                </div>
                <div>
                  <p className="text-xs tracking-wider text-muted uppercase">Type</p>
                  <p className="mt-1 font-medium text-white">
                    {project.isDemo ? 'Concept Showcase' : 'Live Client Project'}
                  </p>
                </div>
                {project.websiteUrl && (
                  <div>
                    <p className="text-xs tracking-wider text-muted uppercase">Live Site</p>
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      Visit website →
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-xs tracking-wider text-muted uppercase">Year</p>
                  <p className="mt-1 font-medium text-white">{project.year}</p>
                </div>
                <div>
                  <p className="mb-3 text-xs tracking-wider text-muted uppercase">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12">
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
