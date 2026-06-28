'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { portfolioProjects, portfolioCategories } from '@/data/portfolio';
import type { PortfolioCategory } from '@/types';
import { cn } from '@/lib/utils';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const filtered =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Live Projects & Concept Showcases"
        description="Two live client websites in production, plus industry-specific concept builds that demonstrate how we design for restaurants, healthcare, real estate, and more."
      />

      <section className="section-padding !pt-8">
        <div className="container-custom">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {portfolioCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                    : 'border border-border text-muted hover:border-primary/30 hover:text-white',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105',
                        project.gradient,
                      )}
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                        <ExternalLink className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {project.industry}
                      </span>
                      {project.isDemo && (
                        <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                          Concept
                        </span>
                      )}
                      <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted">{project.description}</p>
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
