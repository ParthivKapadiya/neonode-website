import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { createMetadata } from '@/lib/metadata';
import {
  combineSchemas,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '@/lib/structured-data';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ClientLoadingScreen } from '@/components/layout/ClientLoadingScreen';
import { Analytics } from '@/components/analytics/Analytics';
import { FloatingGradient } from '@/components/animations/FloatingGradient';
import { FloatingParticles } from '@/components/animations/FloatingParticles';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = combineSchemas(
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
  );

  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <ClientLoadingScreen />
        <ScrollProgress />
        <FloatingGradient />
        <FloatingParticles />
        <div className="noise-overlay" aria-hidden="true" />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <ConditionalFooter />
        <BackToTop />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
