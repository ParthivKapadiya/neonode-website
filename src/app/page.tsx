import {
  HeroSection,
  TrustedSection,
  ServicesSection,
  BeforeAfterSection,
  WhyChooseSection,
  PortfolioSection,
  ProcessSection,
  PricingEstimatorSection,
  TechnologiesSection,
  GuaranteeSection,
  StatisticsSection,
  TestimonialsSection,
  FAQSection,
  HomeContactSection,
  HomeFooter,
} from '@/components/home';
import { faqSchema } from '@/lib/structured-data';
import { faqItems } from '@/data/content';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />
      <HeroSection />
      <TrustedSection />
      <ServicesSection />
      <BeforeAfterSection />
      <WhyChooseSection />
      <PortfolioSection />
      <ProcessSection />
      <PricingEstimatorSection />
      <TechnologiesSection />
      <GuaranteeSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <HomeContactSection />
      <HomeFooter />
    </>
  );
}
