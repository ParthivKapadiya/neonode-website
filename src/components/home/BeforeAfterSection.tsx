'use client';

import { useState } from 'react';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { beforeAfterMetrics } from '@/data/home';
import {
  SectionTransition,
  SectionReveal,
  FadeIn,
  MagneticLink,
} from '@/components/animations';

function MockSite({ variant }: { variant: 'before' | 'after' }) {
  const isAfter = variant === 'after';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${
        isAfter ? 'border-primary/30 bg-[#0a0f1a]' : 'border-white/10 bg-[#1a1a1a]'
      }`}
    >
      <div className={`flex items-center gap-2 border-b px-4 py-2.5 ${isAfter ? 'border-white/5 bg-[#080c14]' : 'border-white/5 bg-[#111]'}`}>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
        </div>
        <div className="mx-auto h-5 flex-1 max-w-[140px] rounded bg-white/5" />
      </div>
      <div className="p-4">
        {isAfter ? (
          <>
            <div className="mb-2 inline-flex rounded-full bg-primary/15 px-2 py-0.5 text-[8px] text-primary">
              Premium Web Agency
            </div>
            <div className="mb-1 h-3 w-3/4 rounded bg-white/90" />
            <div className="mb-3 h-2 w-1/2 rounded bg-white/40" />
            <div className="mb-3 flex gap-1.5">
              <div className="h-5 w-16 rounded-md bg-gradient-to-r from-primary to-secondary" />
              <div className="h-5 w-14 rounded-md border border-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-md border border-white/5 bg-white/[0.03] p-2">
                  <div className="mb-1 h-1.5 w-full rounded bg-white/20" />
                  <div className="h-1 w-2/3 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 h-2 w-1/3 rounded bg-white/20" />
            <div className="mb-1 h-3 w-full rounded bg-white/15" />
            <div className="mb-3 h-2 w-2/3 rounded bg-white/10" />
            <div className="mb-3 h-16 w-full rounded bg-white/5" />
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded bg-white/8" />
              <div className="h-1.5 w-4/5 rounded bg-white/8" />
              <div className="h-1.5 w-3/5 rounded bg-white/8" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [slider, setSlider] = useState(55);
  const { before, after } = beforeAfterMetrics;

  return (
    <SectionTransition className="section-padding overflow-hidden">
      <div className="container-custom">
        <SectionReveal
          label="The Difference"
          title={
            <>
              Before vs after a{' '}
              <span className="gradient-text">NeoNode build</span>
            </>
          }
          description="Speed, mobile experience, and conversion potential — side by side. These are typical benchmarks we target for every project."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card/50">
              <div className="absolute inset-0 flex">
                <div className="relative h-full overflow-hidden" style={{ width: `${slider}%` }}>
                  <div className="absolute inset-0 p-6">
                    <p className="mb-3 text-xs font-medium text-red-400/80 uppercase tracking-widest">
                      {before.label}
                    </p>
                    <MockSite variant="before" />
                  </div>
                </div>
                <div className="relative h-full flex-1 overflow-hidden">
                  <div className="absolute inset-0 p-6">
                    <p className="mb-3 text-xs font-medium text-emerald-400/80 uppercase tracking-widest">
                      {after.label}
                    </p>
                    <MockSite variant="after" />
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={20}
                max={80}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
                className="absolute inset-x-0 bottom-4 z-10 mx-auto w-[calc(100%-3rem)] cursor-ew-resize accent-primary"
                aria-label="Compare before and after"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="space-y-4">
              {[
                { label: 'Load Time', before: before.loadTime, after: after.loadTime, improved: true },
                { label: 'Mobile Score', before: before.mobileScore, after: after.mobileScore, improved: true },
                { label: 'SEO Score', before: before.seoScore, after: after.seoScore, improved: true },
                { label: 'Conversion Rate', before: before.conversion, after: after.conversion, improved: true },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/40 px-5 py-4"
                >
                  <span className="text-sm text-muted">{metric.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-red-400/70 line-through">
                      <TrendingDown className="h-3.5 w-3.5" />
                      {metric.before}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {metric.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <MagneticLink
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20"
            >
              Get a free site audit
              <ArrowRight className="h-4 w-4" />
            </MagneticLink>
          </FadeIn>
        </div>
      </div>
    </SectionTransition>
  );
}
