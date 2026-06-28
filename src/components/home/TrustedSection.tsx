'use client';

import { Building2, HeartPulse, Gavel, Store } from 'lucide-react';
import { trustedBusinesses } from '@/data/home';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  FadeIn,
} from '@/components/animations';

const icons = [HeartPulse, Gavel, Store, Building2];

export function TrustedSection() {
  return (
    <SectionTransition id="trusted" className="border-y border-border bg-surface/40 py-16 md:py-20">
      <div className="container-custom">
        <SectionReveal
          title={
            <>
              Trusted by businesses in{' '}
              <span className="gradient-text">healthcare, tech & commerce</span>
            </>
          }
          description="Real clients with live websites — not stock logos. We build for industries where trust and performance matter most."
          label="Who We Work With"
        />

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustedBusinesses.map((business, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <StaggerItem key={business.name}>
                <HoverLift intensity="subtle">
                  <div className="group h-full rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/30 hover:bg-card/70">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-white">{business.name}</h3>
                    <p className="mt-1 text-sm text-muted">{business.industry}</p>
                    <p className="mt-2 text-xs text-primary/80">{business.result}</p>
                  </div>
                </HoverLift>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn
          delay={0.3}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-10"
        >
          {[
            'Direct developer access',
            'SEO built in',
            'Mobile-first design',
            'Post-launch support',
            'Based in Rajkot, Gujarat',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </FadeIn>
      </div>
    </SectionTransition>
  );
}
