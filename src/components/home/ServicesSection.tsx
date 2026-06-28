'use client';

import Link from 'next/link';
import { ArrowUpRight, Check, type LucideIcon } from 'lucide-react';
import { services } from '@/data/services';
import { getIcon } from '@/lib/icons';
import {
  SectionTransition,
  SectionReveal,
  StaggerContainer,
  StaggerItem,
  ParallaxLayer,
} from '@/components/animations';
import { motion } from 'framer-motion';

function ServiceCard({
  service,
  Icon,
}: {
  service: (typeof services)[number];
  Icon: LucideIcon;
}) {
  return (
    <article className="group relative h-full">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-secondary/40 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-8 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/5">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:ring-primary/40">
            <Icon className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">{service.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted">{service.description}</p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {service.benefits.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary"
              >
                {benefit}
              </span>
            ))}
          </div>

          <ul className="space-y-2 border-t border-border pt-4">
            {service.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/65">
                <Check className="h-3 w-3 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="mt-6 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Get a quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const featured = services.slice(0, 6);

  return (
    <SectionTransition id="services" className="section-padding overflow-hidden" parallax>
      <ParallaxLayer speed={0.25} />
      <div className="container-custom relative">
        <SectionReveal
          label="What We Build"
          title={
            <>
              Websites that turn visitors into{' '}
              <span className="gradient-text">customers</span>
            </>
          }
          description="From local business sites in Rajkot to custom SaaS platforms — every project is built for speed, search visibility, and conversions."
        />

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
          {featured.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} Icon={Icon} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionTransition>
  );
}
