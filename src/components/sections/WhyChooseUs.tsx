'use client';

import { whyChooseUs } from '@/data/content';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/animations/FadeIn';

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="container-custom">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader
              label="Why NeoNode"
              title="Your Success Is"
              highlight="Our Mission"
              description="We combine strategic thinking, exceptional design, and engineering excellence to deliver websites that perform as beautifully as they look."
              align="left"
              className="mb-0"
            />
          </div>

          <div className="space-y-6">
            {whyChooseUs.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="flex gap-5 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/20">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
