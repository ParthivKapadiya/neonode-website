'use client';

import { technologies } from '@/data/home';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '@/components/animations';

export function TechnologiesSection() {
  return (
    <SectionTransition className="section-padding overflow-hidden" parallax>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" />
      <div className="container-custom relative">
        <SectionReveal
          label="Tech Stack"
          title={
            <>
              Technologies <span className="gradient-text">we use</span>
            </>
          }
          description="The same stack used by Vercel, Netflix, and top startups — chosen for speed, SEO, and long-term maintainability."
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.06}>
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20">
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top left, ${tech.color}15, transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="text-lg font-bold"
                      style={{ color: tech.color === '#ffffff' ? '#fff' : tech.color }}
                    >
                      {tech.name}
                    </span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted uppercase">
                      {tech.category}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{tech.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionTransition>
  );
}
