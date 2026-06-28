'use client';

import { trustItems } from '@/data/content';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

export function TrustSection() {
  return (
    <section className="section-padding border-y border-border bg-surface/30">
      <div className="container-custom">
        <SectionHeader
          label="Why Trust Us"
          title="Built on"
          highlight="Excellence"
          description="Every project we deliver is backed by proven expertise, modern technology, and an unwavering commitment to quality."
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <div className="group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
