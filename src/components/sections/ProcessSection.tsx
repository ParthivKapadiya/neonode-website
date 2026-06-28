'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/data/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/animations/FadeIn';

export function ProcessSection() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="container-custom">
        <SectionHeader
          label="Our Process"
          title="From Idea to"
          highlight="Launch"
          description="A proven, transparent workflow that keeps you informed and involved at every stage of your project."
        />

        <div className="relative">
          <div className="absolute top-0 left-8 hidden h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent lg:block" />

          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                  <div className="flex items-center gap-4 lg:w-48 lg:shrink-0">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white shadow-lg shadow-primary/20">
                      {step.step}
                    </div>
                    <span className="text-sm font-medium text-primary lg:hidden">
                      {step.duration}
                    </span>
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/20 lg:p-8">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <span className="hidden text-sm text-muted lg:block">{step.duration}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-white transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            Learn More About Our Process
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
