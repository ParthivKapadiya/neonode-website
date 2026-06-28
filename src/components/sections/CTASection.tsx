'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';

export function CTASection() {
  const whatsappUrl = getWhatsAppUrl('Hi NeoNode, I would like to discuss a web project.');

  return (
    <section className="section-padding" aria-labelledby="cta-heading">
      <div className="container-custom">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-8 text-center md:p-14 lg:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-1/2 -right-1/4 h-[320px] w-[320px] rounded-full bg-primary/15 blur-[80px]" />
              <div className="absolute -bottom-1/2 -left-1/4 h-[320px] w-[320px] rounded-full bg-secondary/15 blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h2 id="cta-heading" className="section-title">
                Ready to build your{' '}
                <span className="gradient-text">next website?</span>
              </h2>
              <p className="section-lead mx-auto mt-4">
                Free 30-minute consultation. Tell us about your business and we will respond
                within 24 hours with a clear plan and quote — no pressure, no obligations.
              </p>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <Button href="/contact" size="lg" magnetic className="w-full sm:w-auto">
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href={whatsappUrl} variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted">
                {siteConfig.email} · {siteConfig.phone} · {siteConfig.address.city},{' '}
                {siteConfig.address.state}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
