import { createMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/structured-data';
import { faqItems } from '@/data/content';
import { PageHero } from '@/components/ui/PageHero';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata = createMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about NeoNode Web Solution services, process, pricing, and support.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services, process, and what it's like to work with us."
      />
      <FAQSection showViewAll={false} />
      <CTASection />
    </>
  );
}
