'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/config/site';
import { homeNavSections } from '@/data/home';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { AnimatedLogo } from '@/components/home/shared/AnimatedLogo';

function isActive(pathname: string, href: string) {
  if (href.startsWith('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function Header() {
  const scrolled = useScrolled(20);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === '/';

  const links = isHome
    ? homeNavSections.map((s) => ({ href: `#${s.id}`, label: s.label }))
    : [...navLinks];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-[#050505]/85 py-3 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent py-4 md:py-5',
      )}
    >
      <div className="container-custom flex items-center justify-between gap-4">
        <Link href="/" className="group shrink-0" aria-label={`${siteConfig.name} home`}>
          <AnimatedLogo size={48} showText glow={scrolled} />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                  active ? 'text-white' : 'text-muted hover:text-white',
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-primary/60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={isHome ? '#contact' : '/contact'} size="sm" magnetic>
            Get Free Quote
          </Button>
        </div>

        <button
          type="button"
          className="touch-target flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 top-[68px] z-40 border-t border-white/5 bg-[#050505]/98 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <nav className="container-custom flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block min-h-11 rounded-xl px-4 py-3 text-base font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 px-4">
                <Link
                  href={isHome ? '#contact' : '/contact'}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white"
                >
                  Get Free Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
