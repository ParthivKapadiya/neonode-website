'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { homeTestimonials } from '@/data/home';
import { SectionTransition, SectionReveal, FadeIn } from '@/components/animations';
import { defaultTransition } from '@/lib/motion';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonial = homeTestimonials[current];

  const next = () => setCurrent((p) => (p + 1) % homeTestimonials.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + homeTestimonials.length) % homeTestimonials.length);

  return (
    <SectionTransition className="section-padding">
      <div className="container-custom">
        <SectionReveal
          label="Client Reviews"
          title={
            <>
              What our clients <span className="gradient-text">say</span>
            </>
          }
          description="Real feedback from real projects — Patel Family Clinic and AuctionXI."
        />

        <FadeIn delay={0.15}>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/5 md:p-12">
              <Quote className="mb-6 h-10 w-10 text-primary/30" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={defaultTransition}
                >
                  <div className="mb-6 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-muted">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {homeTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={prev}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary/50 hover:text-white"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={next}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary/50 hover:text-white"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionTransition>
  );
}
