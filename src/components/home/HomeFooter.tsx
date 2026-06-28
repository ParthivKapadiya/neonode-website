'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from 'lucide-react';
import { footerLinks, siteConfig } from '@/config/site';
import { AnimatedLogo } from '@/components/home/shared/AnimatedLogo';
import { homeNavSections } from '@/data/home';

const socialLinks = [
  { icon: Share2, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: MessageCircle, href: siteConfig.social.whatsapp, label: 'WhatsApp' },
  { icon: Globe, href: siteConfig.social.linkedin, label: 'LinkedIn' },
];

export function HomeFooter() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border bg-[#030303]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-custom pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block">
              <AnimatedLogo size={52} showText />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              NeoNode Web Solution builds high-performance websites and web applications for
              businesses in Rajkot and worldwide. Real projects. Direct developer access. Results
              you can measure.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-all hover:border-primary/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-2"
          >
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {homeNavSections.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {footerLinks.company.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4"
          >
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-white uppercase">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.phone}
              </a>
              <p className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.address.city}, {siteConfig.address.state}, {siteConfig.address.country}
              </p>
              <p className="flex items-center gap-2 text-sm text-muted">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.businessHours.weekdays}
              </p>
              <p className="pl-6 text-xs text-muted">{siteConfig.businessHours.sunday}</p>
            </div>

            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-1 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
            >
              Get free consultation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-white"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
