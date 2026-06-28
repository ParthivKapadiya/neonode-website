import Link from 'next/link';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { footerLinks, siteConfig } from '@/config/site';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="container-custom section-padding !pb-10 !pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-5 inline-block" aria-label={`${siteConfig.name} home`}>
              <Logo size={52} showText />
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-muted">
              Rajkot-based web development team building fast, conversion-focused websites for
              businesses in India and worldwide.
            </p>
            <div className="space-y-2.5 text-sm text-muted">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-h-11 items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex min-h-11 items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <p className="flex min-h-11 items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.address.city}, {siteConfig.address.state}
              </p>
              <p className="flex min-h-11 items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {siteConfig.businessHours.weekdays}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Company
            </h3>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Services
            </h3>
            <ul className="space-y-1">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Legal
            </h3>
            <ul className="space-y-1">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="mb-2 text-sm font-medium text-white">Free consultation</p>
              <p className="mb-3 text-xs text-muted">Response within 24 hours</p>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Get a quote
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 text-sm text-muted transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 text-sm text-muted transition-colors hover:text-white"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 text-sm text-muted transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
