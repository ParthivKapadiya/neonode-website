'use client';

import { statistics } from '@/data/content';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FadeIn } from '@/components/animations/FadeIn';

export function Statistics() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
      <div className="container-custom">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="mt-2 text-sm text-muted md:text-base">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
