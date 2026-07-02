'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { pricingEstimatorDefaults } from '@/data/home';
import {
  SectionTransition,
  SectionReveal,
  FadeIn,
  MagneticLink,
} from '@/components/animations';
import { cn } from '@/lib/utils';

const pageOptions = [
  { value: 3, label: '3–5 pages' },
  { value: 8, label: '6–10 pages' },
  { value: 15, label: '11–20 pages' },
  { value: 25, label: '20+ pages' },
];

const featureOptions = [
  { id: 'cms', label: 'CMS / Content Management' },
  { id: 'ecommerce', label: 'E-commerce Store' },
  { id: 'booking', label: 'Booking System' },
  { id: 'multilingual', label: 'Multi-language' },
  { id: 'animations', label: 'Premium Animations' },
  { id: 'seo', label: 'Advanced SEO Package' },
] as const;

type FeatureId = (typeof featureOptions)[number]['id'];

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingEstimatorSection() {
  const [pages, setPages] = useState(8);
  const [features, setFeatures] = useState<FeatureId[]>([]);

  const estimate = useMemo(() => {
    const { basePrice, pagePrice, featurePrices } = pricingEstimatorDefaults;
    const pageCost = pages * pagePrice;
    const featureCost = features.reduce(
      (sum, f) => sum + (featurePrices[f as keyof typeof featurePrices] ?? 0),
      0,
    );
    const low = basePrice + pageCost + featureCost;
    const high = Math.round(low * 1.35);
    return { low, high };
  }, [pages, features]);

  const toggleFeature = (id: FeatureId) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <SectionTransition className="section-padding section-padding-spacious bg-surface/30 overflow-hidden">
      <div className="container-custom">
        <SectionReveal
          label="Pricing Estimator"
          title={
            <>
              Ballpark your{' '}
              <span className="gradient-text">project investment</span>
            </>
          }
          description="Adjust pages and features to get an estimated range. Every project gets a custom quote after our free consultation."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="left">
            <div className="space-y-8 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Number of pages
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pageOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPages(opt.value)}
                      className={cn(
                        'rounded-xl border px-3 py-2.5 text-xs font-medium transition-all',
                        pages === opt.value
                          ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-border bg-surface/50 text-muted hover:border-white/15',
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-white">
                  Additional features
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {featureOptions.map((feat) => (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={cn(
                        'rounded-xl border px-4 py-3 text-left text-xs transition-all',
                        features.includes(feat.id)
                          ? 'border-secondary/50 bg-secondary/10 text-white'
                          : 'border-border bg-surface/50 text-muted hover:border-white/15',
                      )}
                    >
                      {feat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-8 md:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Calculator className="h-7 w-7" />
              </div>
              <p className="text-sm text-muted">Estimated project range</p>
              <motion.div
                key={`${estimate.low}-${estimate.high}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-4xl font-bold text-white md:text-5xl"
              >
                {formatINR(estimate.low)} – {formatINR(estimate.high)}
              </motion.div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                This is a starting estimate based on scope. Final pricing depends on design
                complexity, integrations, and timeline. We provide a fixed quote after our
                discovery call — no hidden fees.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {['Free consultation included', 'Fixed quote before work begins', 'Flexible payment milestones'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <MagneticLink
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-sm font-semibold text-white"
              >
                Get your exact quote
                <ArrowRight className="h-4 w-4" />
              </MagneticLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionTransition>
  );
}
