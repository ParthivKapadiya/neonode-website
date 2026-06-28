'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/10 to-transparent blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Premium Web Development Agency
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              We Build Websites That{' '}
              <span className="gradient-text">Drive Results</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              NeoNode Web Solution partners with ambitious businesses to create stunning,
              high-performance websites and web applications that convert visitors into loyal
              customers.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg" magnetic>
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                2+ Projects Delivered
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                100% Client Satisfaction
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Based in Rajkot, India
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.6} className="mx-auto mt-20 max-w-5xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-border glass p-1"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-hidden rounded-xl bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted">neodeweb.dev — preview</span>
              </div>
              <div className="relative aspect-[16/9] bg-gradient-to-br from-surface via-card to-surface p-8">
                <div className="grid h-full grid-cols-12 gap-4">
                  <div className="col-span-3 space-y-3">
                    <div className="h-8 rounded-lg bg-white/5" />
                    <div className="h-4 w-3/4 rounded bg-white/5" />
                    <div className="h-4 w-1/2 rounded bg-white/5" />
                    <div className="mt-6 space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-3 rounded bg-white/5" />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-9 space-y-4">
                    <div className="h-32 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20" />
                    <div className="grid grid-cols-3 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-20 rounded-lg bg-white/5" />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-16 rounded-lg bg-white/5" />
                      <div className="h-16 rounded-lg bg-white/5" />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute right-8 bottom-8 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-medium text-white shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Launch Ready ✓
                </motion.div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
