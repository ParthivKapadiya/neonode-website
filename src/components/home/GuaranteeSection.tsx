'use client';

import { guaranteeItems } from '@/data/home';
import { getIcon } from '@/lib/icons';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  HoverLift,
} from '@/components/animations';

export function GuaranteeSection() {
  return (
    <SectionTransition className="section-padding section-padding-compact overflow-hidden">
      <div className="container-custom">
        <SectionReveal
          label="Our Guarantee"
          title={
            <>
              A promise you can{' '}
              <span className="gradient-text">hold us to</span>
            </>
          }
          description="We are a small, focused team — your project gets our full attention, and we stand behind every delivery."
        />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {guaranteeItems.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <HoverLift intensity="subtle">
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/25">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary ring-1 ring-primary/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </article>
                </HoverLift>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionTransition>
  );
}
