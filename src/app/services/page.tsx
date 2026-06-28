import { createMetadata } from '@/lib/metadata';
import { serviceSchema } from '@/lib/structured-data';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/data/services';
import { getIcon } from '@/lib/icons';
import { Check } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Web Development Services',
  description:
    'Business websites, e-commerce, landing pages, custom web apps, SEO, and maintenance — built with Next.js and TypeScript by NeoNode Web Solution, Rajkot.',
  path: '/services',
  keywords: [
    'website development services Rajkot',
    'business website design',
    'e-commerce development India',
    'SEO services Gujarat',
  ],
});

const servicesWithIcons = services.map((s) => ({ ...s, Icon: getIcon(s.icon) }));

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema()) }}
      />
      <PageHero
        label="Services"
        title="Web development services that solve real business problems"
        description="Every service starts with your challenge — not a template. We build with Next.js and TypeScript for speed, SEO, and long-term maintainability."
      />

      <section className="section-padding">
        <div className="container-custom space-y-12">
          {servicesWithIcons.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.04}>
              <article
                id={service.id}
                className="scroll-mt-28 rounded-2xl border border-border bg-card/50 p-6 md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
                      <service.Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {service.benefits.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                        <p className="mb-1 text-xs font-semibold tracking-widest text-red-400 uppercase">
                          The Problem
                        </p>
                        <p className="text-sm leading-relaxed text-muted">{service.problem}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <p className="mb-1 text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                          Our Solution
                        </p>
                        <p className="text-sm leading-relaxed text-muted">{service.solution}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">
                      Included
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
