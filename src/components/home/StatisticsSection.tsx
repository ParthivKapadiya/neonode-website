'use client';

import { statistics } from '@/data/content';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  SectionTransition,
  StaggerContainer,
  StaggerItem,
  AnimatedProgressBar,
  FadeIn,
} from '@/components/animations';

const performanceMetrics = [
  { label: 'Performance Score', value: 95 },
  { label: 'SEO Optimization', value: 100 },
  { label: 'Accessibility', value: 98 },
  { label: 'Best Practices', value: 97 },
];

export function StatisticsSection() {
  return (
    <SectionTransition className="overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10" />
      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {statistics.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="mt-2 text-sm text-muted md:text-base">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mx-auto mt-16 max-w-2xl">
          <p className="mb-6 text-center text-sm font-medium tracking-widest text-muted uppercase">
            Quality Benchmarks
          </p>
          <div className="space-y-4 rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm md:p-8">
            {performanceMetrics.map((metric, i) => (
              <AnimatedProgressBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionTransition>
  );
}
