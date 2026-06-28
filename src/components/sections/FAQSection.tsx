'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

export function FAQSection({ limit, showViewAll = true }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = limit ? faqItems.slice(0, limit) : faqItems;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          label="FAQ"
          title="Common"
          highlight="Questions"
          description="Everything you need to know about working with NeoNode Web Solution."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-primary/20">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={openId === item.id}
                >
                  <span className="font-medium text-white">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-muted transition-transform duration-300',
                      openId === item.id && 'rotate-180',
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        {showViewAll && limit && (
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all frequently asked questions
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
