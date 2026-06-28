'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

export function ServicesSection() {
  const featured = services.slice(0, 6);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          label="Our Services"
          title="Solutions"
          highlight="That Scale"
          description="From elegant business websites to complex web applications, we deliver digital products tailored to your goals."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-white transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
