'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import { faqItems } from '@/data/content';
import { cn } from '@/lib/utils';
import {
  SectionTransition,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MagneticLink,
} from '@/components/animations';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('1');
  const items = faqItems.slice(0, 6);

  return (
    <SectionTransition id="faq" className="section-padding section-padding-compact bg-surface/30">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left" className="lg:sticky lg:top-28 lg:self-start">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Common <span className="gradient-text">questions</span>
            </h2>
            <p className="section-lead mt-4">
              Pricing, timelines, and how we work — answered upfront so you can decide with
              confidence.
            </p>
            <MagneticLink
              href="#contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"
            >
              Still have questions? Get in touch →
            </MagneticLink>
          </FadeIn>

          <StaggerContainer className="space-y-3" staggerDelay={0.05}>
            {items.map((item) => {
              const panelId = `faq-panel-${item.id}`;
              const isOpen = openId === item.id;

              return (
                <StaggerItem key={item.id}>
                  <div
                    className={cn(
                      'overflow-hidden rounded-2xl border transition-all duration-300',
                      isOpen
                        ? 'border-primary/30 bg-card/70 shadow-lg shadow-primary/5'
                        : 'border-border bg-card/40 hover:border-white/10',
                    )}
                  >
                    <button
                      type="button"
                      id={`faq-trigger-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex min-h-11 w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                    >
                      <span className="font-medium text-white">{item.question}</span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5"
                      >
                        <Plus className="h-4 w-4 text-muted" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={`faq-trigger-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE_OUT }}
                        >
                          <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6 md:pb-6">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </SectionTransition>
  );
}
