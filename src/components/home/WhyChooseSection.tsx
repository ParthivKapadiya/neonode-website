'use client';

import { whyChooseUs } from '@/data/content';
import { getIcon } from '@/lib/icons';
import { AnimatedLogo } from '@/components/home/shared/AnimatedLogo';
import {
  SectionTransition,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
} from '@/components/animations';

export function WhyChooseSection() {
  return (
    <SectionTransition className="section-padding bg-surface/30">
      <div className="container-custom">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn direction="left">
            <span className="mb-4 inline-block rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-secondary uppercase">
              Why NeoNode
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Your success is our{' '}
              <span className="gradient-text">mission</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We are not a template shop. Every site is custom-built with Next.js and TypeScript —
              you work directly with the developer, and we target measurable outcomes: speed,
              search rankings, and inquiries.
            </p>
            <HoverLift intensity="subtle" className="mt-10">
              <div className="flex items-center gap-6 rounded-2xl border border-border bg-card/50 p-6">
                <AnimatedLogo size={56} />
                <div>
                  <p className="font-semibold text-white">NeoNode Web Solution</p>
                  <p className="text-sm text-muted">Rajkot, Gujarat · Serving clients worldwide</p>
                </div>
              </div>
            </HoverLift>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {whyChooseUs.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <StaggerItem key={item.title}>
                  <HoverLift intensity="subtle">
                    <div className="flex gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/20 hover:bg-card/70">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                      </div>
                    </div>
                  </HoverLift>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </SectionTransition>
  );
}
