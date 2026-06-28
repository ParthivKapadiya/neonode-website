'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

export function PortfolioPreview() {
  const featured = portfolioProjects.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          label="Portfolio"
          title="Work That"
          highlight="Speaks"
          description="Explore a selection of projects where strategy, design, and technology come together to deliver measurable business impact."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.15}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105',
                      project.gradient,
                    )}
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {project.industry}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                      <ExternalLink className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-white/5 px-2 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View Full Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
