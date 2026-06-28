'use client';

import { processSteps } from '@/data/content';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  FadeIn,
} from '@/components/animations';
import { motion } from 'framer-motion';

export function ProcessSection() {
  const totalWeeks = ['Week 1', 'Week 1–2', '2–3 wks', '3–8 wks', 'Launch'];

  return (
    <SectionTransition id="process" className="section-padding bg-surface/30">
      <div className="container-custom">
        <SectionReveal
          label="Development Process"
          title={
            <>
              From first call to{' '}
              <span className="gradient-text">live site</span>
            </>
          }
          description="Five clear phases with fixed milestones. You approve each stage before we move forward — no surprises, no scope creep."
        />

        <FadeIn delay={0.1} className="mx-auto mb-14 max-w-4xl">
          <div className="relative hidden md:block">
            <div className="absolute top-5 right-8 left-8 h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/30" />
            <div className="relative flex justify-between">
              {processSteps.map((step, i) => (
                <div key={step.step} className="flex flex-col items-center">
                  <motion.div
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-card text-xs font-bold text-primary"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                  >
                    {step.step}
                  </motion.div>
                  <p className="mt-2 max-w-[80px] text-center text-[10px] font-medium text-white">
                    {step.title.split(' ')[0]}
                  </p>
                  <p className="mt-0.5 text-center text-[9px] text-muted">{totalWeeks[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute top-0 left-8 hidden h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent md:block" />

          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
            {processSteps.map((step) => (
              <StaggerItem key={step.step}>
                <div className="relative flex gap-6 md:gap-10">
                  <div className="relative z-10 flex shrink-0 flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white shadow-xl shadow-primary/25 transition-transform duration-300 hover:scale-105">
                      {String(step.step).padStart(2, '0')}
                    </div>
                  </div>
                  <HoverLift intensity="subtle" className="flex-1">
                    <div className="rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/20 md:p-8">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{step.description}</p>
                    </div>
                  </HoverLift>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </SectionTransition>
  );
}
