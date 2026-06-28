import Link from 'next/link';
import { Check } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { pricingPlans } from '@/data/content';
import { cn } from '@/lib/utils';

export const metadata = createMetadata({
  title: 'Pricing',
  description:
    'Transparent web development pricing packages for businesses of all sizes. Starter, Professional, and Enterprise plans available.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title="Clear pricing, no surprises"
        description="Starting packages for business websites in INR. Every project gets a custom quote after our free consultation."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={plan.id} delay={i * 0.1}>
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300',
                    plan.highlighted
                      ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-xl shadow-primary/10'
                      : 'border-border bg-card/50 hover:border-primary/20',
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-2 text-sm text-muted">{plan.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-sm text-muted">{plan.period}</span>
                    <div className="text-4xl font-bold text-white">{plan.price}</div>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={cn(
                      'block rounded-xl py-3 text-center text-sm font-medium transition-all',
                      plan.highlighted
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40'
                        : 'border border-border text-white hover:border-primary/50 hover:bg-primary/5',
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="mt-12 text-center text-sm text-muted">
              All prices are starting estimates. Final pricing depends on project scope and
              requirements.{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>{' '}
              for a custom quote.
            </p>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
