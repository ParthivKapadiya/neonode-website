'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { portfolioProjects, portfolioCategories, industryExpertise } from '@/data/portfolio';
import type { PortfolioProject, PortfolioCategory } from '@/types';
import { cn } from '@/lib/utils';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  MagneticLink,
  ParallaxLayer,
} from '@/components/animations';
import { ProjectPreviewMockup, ProjectPreviewHover } from '@/components/home/ProjectPreviewMockup';
import { motion, AnimatePresence } from 'framer-motion';

/** Must be a static string so Tailwind can detect the arbitrary easing utility. */
const SITE_EASE = 'ease-[cubic-bezier(0.21,0.47,0.32,0.98)]';

function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-card/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5',
        SITE_EASE,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110 group-hover:opacity-0',
            SITE_EASE,
            project.gradient,
          )}
        />

        <div
          className={cn(
            'absolute inset-0 scale-105 opacity-100 transition-all duration-700 group-hover:scale-100',
            SITE_EASE,
          )}
        >
          <div className="absolute inset-0 p-4 md:p-6">
            <ProjectPreviewMockup project={project} />
          </div>
        </div>

        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90',
            SITE_EASE,
          )}
        />

        <ProjectPreviewHover project={project} />

        <div
          className={cn(
            'relative z-[5] flex h-full flex-col justify-between p-6 md:p-8 transition-opacity duration-300 group-hover:opacity-0',
            SITE_EASE,
          )}
        >
          <div className="flex flex-wrap gap-2">
            <span
              className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
              style={{ backgroundColor: `${project.accentColor}25` }}
            >
              {project.industry}
            </span>
            {project.isDemo && (
              <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
                Concept Project
              </span>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white md:text-3xl">{project.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              {project.description}
            </p>
          </div>
        </div>

        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'absolute top-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110',
              SITE_EASE,
            )}
            aria-label={`Visit ${project.title}`}
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </a>
        )}
      </div>

      <div className="p-6 md:p-8">
        <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">
          Key Features
        </p>
        <ul className="mb-5 grid gap-2 sm:grid-cols-2">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-white/70">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-muted ring-1 ring-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/portfolio/${project.slug}`}
          className={cn(
            'mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            SITE_EASE,
          )}
        >
          View case study <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const filtered =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const hasProjects = filtered.length > 0;

  return (
    <SectionTransition id="portfolio" className="section-padding section-padding-spacious overflow-hidden" parallax>
      <ParallaxLayer speed={0.2} />
      <div className="container-custom relative">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionReveal
            className="mb-0"
            align="left"
            label="Portfolio"
            title={
              <>
                Work that speaks{' '}
                <span className="gradient-text">for itself</span>
              </>
            }
            description="Live projects built for real businesses — hover to preview desktop and mobile layouts."
          />
          <MagneticLink
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Start your project <ArrowUpRight className="h-4 w-4" />
          </MagneticLink>
        </div>

        <div className="mb-10 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-none md:mb-12 md:flex-wrap md:overflow-visible md:pb-0">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium transition-all md:shrink md:py-2',
                activeCategory === cat.id
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : 'border-border bg-card/40 text-muted hover:border-white/15 hover:text-white',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {hasProjects ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <StaggerContainer className="grid gap-8 lg:grid-cols-2" staggerDelay={0.12}>
                {filtered.map((project) => (
                  <StaggerItem key={project.slug}>
                    <PortfolioCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center"
            >
              <p className="text-lg font-medium text-white">
                {portfolioCategories.find((c) => c.id === activeCategory)?.label} projects
                coming soon
              </p>
              <p className="mt-2 text-sm text-muted">
                We build for this industry — yours could be our next showcase.
              </p>
              <MagneticLink
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Discuss your project <ArrowUpRight className="h-4 w-4" />
              </MagneticLink>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16">
          <p className="mb-6 text-center text-xs font-semibold tracking-widest text-muted uppercase">
            Industries we build for
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industryExpertise.map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => setActiveCategory(item.category)}
                className={cn(
                  'rounded-xl border px-4 py-3 text-left transition-all',
                  activeCategory === item.category
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border bg-card/30 hover:border-white/15',
                )}
              >
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
